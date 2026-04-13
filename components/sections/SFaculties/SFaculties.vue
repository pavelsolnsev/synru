<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { KEYS, ROUTES } from '~/constants';
import { FACULTY_FILTER_OPTION_HELP_FORM, NOT_FREE_FACULTY_ID } from '~/constants/common';
import declensionOfNumber from '~/utils/declensionOfNumber';
import type { FacultiesResponse, FacultyResponseIncluded, FacultyWithProgram, DirectionResponseData } from '~/types';
import type { LevelResource, FormResource } from '~/types/entities';
import type { Level } from '~/components/molecules/MLevelFilterSlider/MLevelFilterSlider.vue';
import type { Format } from '~/components/molecules/MFormatFilterSelect/MFormatFilterSelect.vue';
import type { ProgramCard } from '~/types/ProgramCard';

interface Props {
  title?: string;
  titleBanner?: string;
  subtitleBanner?: string;
  showSubtitleBanner?: boolean;
  btnTextBanner?: string;
  imageHover?: boolean;
  imgBanner?: string;
  imgMdBanner?: string;
  imgLgBanner?: string;
  formTitle?: string;
  bannerTags?: { tag: string }[]
  actionParams?: { param: string }[]
  entity?: {
    id?: string,
    name?: string,
    url?: string,
  };
  routeName: string;
}

interface FilterState {
  currentState: keyof FilterState['states'] | null;
  states: {
    [key: string]: {
      onStateChanged(): void;
    };
  };
  onStateChanged(): void;
  changeTo(newState: keyof FilterState['states']): void;
  resetFilter(): void;
}

const facultiesList = ref(null);
const isLargeScreen = useMediaQuery('(min-width: 1200px)', { ssrWidth: 768 });
const LARGE_SCREEN_ITEMS = 9;
const SMALL_SCREEN_ITEMS = 5;
const INCREMENT_STEPS = 6;
const defaultVisibleLength = computed(() => (isLargeScreen.value ? LARGE_SCREEN_ITEMS : SMALL_SCREEN_ITEMS));
const visibleLength = ref(0);

watchEffect(() => {
  visibleLength.value = defaultVisibleLength.value;
});

const {
  title = '',
  entity = {},
  routeName,
} = defineProps<Props>();

export interface FacultyItem {
  id: string;
  title: string;
  count: string;
  image: string;
  imageSm?: string;
  link?: string;
  isNew?: boolean;
  formTitle?: string;
  direction: number;
  levelIds: number[];
  formIds: number[];
  rank: number;
}

const directionTranslationMap: Record<string, string> = {
  'Техническое': 'Технические',
  'Гуманитарное': 'Гуманитарные',
  'Медицинское': 'Медицинские',
  'Творческое': 'Творческие',
  'Экономическое': 'Экономические',
};

const needPreselectLevel = ['ordinatura', 'level', 'professions'].includes(routeName);

const { data: facultiesData, error } = await useFetch('/api/faculties/filter', {
  query: {
    key: KEYS.FACULTIES_FILTER_DATA,
    include: 'direction,programsCount,coursesCount,levels,forms',
    'fields[faculties]': 'id,slug,name,direction_id,preview_image,intro_image,rank,properties',
    'fields[directions]': 'id,name,rank',

    // 'fields[levels]': 'id,name,rank',
    // 'fields[forms]': 'id,name,rank',
    'filter[published]': true,
    'page[size]': 0,
    nolinks: 1,
  },
  deep: false,
  watch: false,
  transform(res: FacultiesResponse) {
    if (!res) return {};
    const directionsData: DirectionResponseData[] = [];
    const levelsData: LevelResource[] = [];
    const formsData: FormResource[] = [];

    res.included?.forEach((element: FacultyResponseIncluded) => {

      if (element.type === 'directions') {
        directionsData.push(element);
      }
      if (element.type === 'levels') {
        levelsData.push(element);
      }
      if (element.type === 'forms') {
        formsData.push(element);
      }
    });

    const actualDirection: Record<number, boolean> = {};

    const forms: Record<number, Format> = {};

    formsData
      .sort((a, b) => (a.attributes?.rank || 0) - (b.attributes?.rank || 0))
      .forEach((form) => {
        forms[+form.id] = {
          text: form.attributes?.short_name,
          value: form.id,
          disabled: false,
          popular: false,
        };
      });

    const levels: Record<number, Level> = {};

    levels[1000] = {
      text: 'Курсы',
      value: 1000,
      disabled: false,
      rank: 1000,
      count: 0,
    };

    levelsData
      .sort((a, b) => (a.attributes?.rank || 0) - (b.attributes?.rank || 0))
      .forEach((level) => {
        levels[+level.id] = {
          text: level.attributes?.name,
          value: +level.id,
          disabled: false,
          rank: level.attributes?.rank || 0,
          count: 0,
        };
      });

    const processedFaculties: FacultyItem[] = res.data
      .filter((faculty) => {
        if (!needPreselectLevel) return true;

        if (routeName === 'professions') return Number(faculty?.attributes?.courses_count) > 0;

        const levelIds: number[] = faculty.relationships.levels?.data?.reduce((acc: Record<number, number>, level: { id: string, type: 'levels' }) => {
          acc[Number(level.id)] = Number(level.id);
          return acc;
        }, {} as Record<number, number>);

        if (routeName === 'ordinatura') {
          const ordinaturaId = Number(Object.keys(levels).find((levelId) =>
            levels[Number(levelId)].text === 'Ординатура',
          ));

          return ordinaturaId in levelIds;
        }

        return entity.id ? Number(entity?.id) in levelIds : true;
      })
      .map((faculty: FacultyWithProgram) => {

        const attributes = faculty.attributes;
        const relationships = faculty.relationships;
        const directionId = Number(relationships.direction?.data?.id) || null;

        if (directionId && !actualDirection[directionId]) actualDirection[directionId] = true;

        const levelIds: number[] = relationships.levels?.data?.reduce((acc: number[], level: { id: string, type: 'levels' }) => {
          acc.push(Number(level.id));
          levels[Number(level.id)].count += 1;
          return acc;
        }, []);

        const formIds: number[] = relationships.forms?.data?.reduce((acc: number[], form: { id: string, type: 'forms' }) => {
          acc.push(Number(form.id));
          return acc;
        }, []);

        const programsCount = attributes.programs_count ?? 0;
        const coursesCount = attributes.courses_count ?? 0;
        const totalCount = programsCount + coursesCount;

        if (coursesCount) {
          levels[1000].count += 1;
          levelIds.push(1000);
        }

        return {
          id: faculty.id,
          title: attributes.properties?.advanced_name || attributes.name,
          count: declensionOfNumber(
            totalCount,
            ['специальность', 'специальности', 'специальностей'],
            true),
          image: attributes.preview_image,
          imageSm: attributes.intro_image,
          link: makeLink(faculty),
          rank: faculty.attributes.rank,
          formTitle: attributes.properties.form_title,
          direction: directionId,
          levelIds,
          formIds,
        } as FacultyItem;
      })
      .sort((a,b) => a.rank - b.rank);

    const directions = directionsData
      .filter((direction) => actualDirection[Number(direction.id)])
      .sort((a, b) => a.attributes.rank - b.attributes.rank)
      .map((direction: DirectionResponseData) => ({
        id: Number(direction.id),
        title: directionTranslationMap[direction.attributes.name] ?? direction.attributes.name,
        icon: 'faculty_' + direction.id,
        value: direction.id,
      }));

    return {
      faculties: processedFaculties,
      directions,
      forms,
      levels,
    };
  },
});

if (error.value) {
  console.error(error.value);
}

const { levels: levelsData = {}, forms: formatsData = {}, directions: directionsData = [] } = facultiesData.value || {};

const levels = ref(levelsData);
const filteredLevel = ref(getPreselectedLevel());
const levelFilterDisabled = ref(false);
const filteredFaculty = ref(null);

const formats = ref(formatsData);
const filteredFormat = ref<number | null>(null);
const formatFilterDisabled = ref(false);

const faculties = ref(generateFacultiesSelect({ initialLevel: filteredLevel.value }));

const directions = computed(() => {
  const relatedFaculties = facultiesData.value?.faculties?.filter((faculty) => {
    if (filteredLevel.value && !faculty.levelIds.includes(filteredLevel.value)) return false;

    if (filteredFormat.value && !faculty.formIds.includes(Number(filteredFormat.value))) return false;

    if (filteredFaculty.value && filteredFaculty.value !== faculty.id) return false;

    return true;
  }) || [];

  const directionSet = new Set(relatedFaculties.map((faculty) => faculty.direction));

  return directionsData.filter((direction) => directionSet.has(direction.id));
});

const filteredDirection = ref<number | undefined>(undefined);

const resetFiltersButtonDisabled = ref(true);

const filteredFaculties = computed(() => {
  return facultiesData.value?.faculties?.filter(isMatch) ?? [];
});

const facultiesWithHelpCards = shallowRef(addHelpCardsToFaculties({ cards: filteredFaculties.value, initialCardCount: defaultVisibleLength.value }));

watch(filteredFaculties, () => {
  facultiesWithHelpCards.value = addHelpCardsToFaculties({ cards: filteredFaculties.value, initialCardCount: defaultVisibleLength.value });
});

const visibleFaculties = computed(() => {
  return facultiesWithHelpCards.value.slice(0, visibleLength.value);
});

const restOfFaculties = computed(() => {
  return facultiesWithHelpCards.value.slice(visibleLength.value);
});

const remainingItems = computed(() => {
  const visibleCount = visibleFaculties.value.filter((faculty) => !isHelpCard(faculty)).length;
  return filteredFaculties.value.length - visibleCount;
});

const bannerClass = computed(() => {
  const length = visibleFaculties.value.length;

  if (length > 2){
    return '--more-than-2';
  }
  const classes = '--only-1';
  if (length === 2) {
    return classes + ' --only-2';
  } else {
    return classes;
  }
});

const facultyPopup = useTemplateRef('facultyPopup');
const popupData = ref({});

const { data } = await useFetch<{ programs: ProgramCard[] }>('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: KEYS.PROGRAMS_FILTERS_DATA,
});

const cards = ref<ProgramCard[]>(data.value?.programs || []);

const filterState: FilterState = {
  currentState: null,
  states: {
    initial: {
      onStateChanged() {
        filteredLevel.value = getPreselectedLevel();
        filteredFormat.value = null;
        filteredDirection.value = undefined;
        filteredFaculty.value = null;

        Object.values(formats.value)?.forEach((format) => {
          format.disabled = false;
        });

        Object.values(faculties.value).forEach((faculty) => {
          faculty.disabled = true;
        });

        filteredFaculties.value?.forEach((faculty) => {
          const facultyId = Number(faculty.id);

          faculties.value[facultyId]['disabled'] = false;
        });

        resetFiltersButtonDisabled.value = true;
      },
    },
    levelSelected: {
      onStateChanged() {
        filteredFormat.value = null;
        filteredFaculty.value = null;
        filteredDirection.value = undefined;

        Object.values(formats.value)?.forEach(
          (format) => (format.disabled = true),
        );

        Object.values(faculties.value).forEach(
          (faculty) => (faculty.disabled = true),
        );

        filteredFaculties.value?.forEach((faculty) => {
          if (isHelpCard(faculty)) return;

          if (Array.isArray(faculty.formIds)) {
            faculty.formIds?.forEach((formId) => {
              formats.value[formId]['disabled'] = false;
            });
          }

          const facultyId = Number(faculty.id);
          const findFaculty = faculties.value[facultyId];

          if (findFaculty) findFaculty['disabled'] = false;
        });
      },
    },
    formatSelected: {
      onStateChanged() {
        resetFiltersButtonDisabled.value = false;

        Object.values(faculties.value).forEach((faculty) => {
          faculty.disabled = true;
        });

        filteredFaculties.value?.forEach((faculty) => {
          const facultyId = Number(faculty.id);

          faculties.value[facultyId]['disabled'] = false;
        });
      },
    },
    directionSelected: {
      onStateChanged() {
        visibleLength.value = defaultVisibleLength.value;
        resetFiltersButtonDisabled.value = false;

        if (filteredFaculty.value) return;
        filteredFormat.value = null;
        filteredFaculty.value = null;
        Object.values(formats.value)?.forEach((format) => {
          format.disabled = false;
        });

        Object.values(faculties.value).forEach((faculty) => {
          faculty.disabled = true;
        });

        filteredFaculties.value?.forEach((faculty) => {
          const facultyId = Number(faculty.id);

          faculties.value[facultyId]['disabled'] = false;
        });
      },
    },
    facultySelected: {
      onStateChanged() {
        resetFiltersButtonDisabled.value = false;
        filteredFormat.value = null;

        Object.values(formats.value)?.forEach((format) => {
          format.disabled = true;
        });

        filteredFaculties.value?.forEach((faculty) => {
          if (isHelpCard(faculty)) return;

          if (Array.isArray(faculty.formIds)) {
            faculty.formIds?.forEach((formId) => {
              formats.value[formId]['disabled'] = false;
            });
          }
        });
      },
    },
  },
  onStateChanged() {
    if (import.meta.dev) {
      console.log(`filter state changed to ${this.currentState}`);
    }
  },
  changeTo(newState) {
    if (!this.states[newState]) return;

    this.currentState = newState;
    this.onStateChanged();

    if (this.states[newState]['onStateChanged']) {
      this.states[newState]['onStateChanged']();
    }
  },
  resetFilter() {
    this.changeTo('initial');
  },
};

function makeLink(faculty: FacultyWithProgram) {
  if ((routeName === 'level' && entity?.id) || routeName === 'professions') {
    const additionalQueryParams = new URLSearchParams();

    additionalQueryParams.set('filter[level]', routeName === 'level' && entity.id ? entity.id : '1000');
    additionalQueryParams.set('scroll', 'true');

    return `${ROUTES.FACULTIES}/${faculty.attributes.slug}${additionalQueryParams.size ? '?' + additionalQueryParams.toString() : ''}`;
  }

  return `${ROUTES.FACULTIES}/${faculty.attributes.slug}`;
}

function isMatch(faculty: FacultyItem) {
  if (filteredLevel.value && !faculty.levelIds.includes(filteredLevel.value)) return false;

  if (filteredFormat.value && !faculty.formIds.includes(Number(filteredFormat.value))) return false;

  if (filteredDirection.value && faculty.direction !== Number(filteredDirection.value)) return false;

  if (filteredFaculty.value && filteredFaculty.value !== faculty.id) return false;

  return true;
}

function generateFacultiesSelect(data: { initialLevel: number }) {
  if (!Array.isArray(facultiesData.value?.faculties)) return {};

  const { initialLevel } = data;

  return facultiesData.value?.faculties?.reduce((acc, faculty) => {
    acc[Number(faculty.id)] = {
      disabled: faculty.levelIds?.includes(initialLevel) ? false : true,
      popular: false,
      value: faculty.id,
      text: faculty.title?.replaceAll('<br>', ''),
      rank: faculty.rank,
    };

    return acc;
  }, {} as { [key: number]: { value: string, text: string, disabled: boolean, popular: boolean, rank: number } });
}

async function showPopup(faculty: FacultyItem) {
  const facultyPrograms = cards.value?.filter((item) => item.faculty.value === +faculty.id);
  const facultyLevels = [...new Set(facultyPrograms?.map((item) => item.level.text))];
  const facultyForms = [...new Set(facultyPrograms?.flatMap((item) => Object.values(item.forms).map((form) => form.text)))];

  const triggers = [
    { title: 'Количество специальностей', content: faculty.count.split(' ')[0] },
    { title: 'Образовательный кредит', content: '3% с господдержкой' },
    { title: 'Уровни образования', content: facultyLevels.join(', ') },
    { title: 'Формы обучения', content: facultyForms },
    { title: 'Диплом', content: 'Диплом государственного образца' },
    { title: 'Карьера', content: 'Помощь с трудоустройством' },
  ];

  popupData.value = {};
  popupData.value = {
    name: faculty.title,
    slug: faculty.link,
    programs: facultyPrograms,
    levels: facultyLevels.filter((level) => level !== 'Курсы'),
    triggers,
    freeStart: faculty.id !== NOT_FREE_FACULTY_ID,
    formTitle: faculty.formTitle,
  };

  facultyPopup.value?.open();
}

function isHelpCard(card: HelpChooseCardWithFlag | FacultyItem): card is HelpChooseCardWithFlag {
  return (card as HelpChooseCardWithFlag).isHelpCard;
}

function getPreselectedLevel() {
  if (routeName === 'professions') return 1000;

  if (['branch', 'branches-new'].includes(routeName)) return 1;

  return (Number(entity?.id) || 1);
}

const renderPopups = shallowRef(false);

onMounted(() => {
  renderPopups.value = true;
});
</script>

<template>
  <MSection
    v-if="facultiesData?.faculties?.length"
    class="s-faculties"
    :title
    :nums="String(facultiesData?.faculties.length)"
  >
    <div class="s-faculties__level-slider-wrapper">
      <MLevelFilterSlider
        v-if="!needPreselectLevel"
        v-model="filteredLevel"
        :levels
        :words="['факультет', 'факультета', 'факультетов']"
        :disabled="levelFilterDisabled"
        @change="filterState.changeTo('levelSelected')"
      />
    </div>
    <div class="s-faculties__selects s-faculties__selects-single">
      <MFacultyFilterSelect
        v-if="routeName !== 'ordinatura'"
        v-model="filteredFaculty"
        show-help-option
        :faculties
        @change="filterState.changeTo('facultySelected')"
        @action="
          handleActionOption({ action: FACULTY_FILTER_OPTION_HELP_FORM, actionData: '#s-faculties-fac-select' })
        "
      />
      <MFormatFilterSelect
        v-if="routeName !== 'ordinatura'"
        v-model="filteredFormat"
        :formats
        :disabled="formatFilterDisabled"
        @change="filterState.changeTo('formatSelected')"
      />
      <AButton
        v-if="!['ordinatura'].includes(routeName)"
        rounding="rect"
        size="md"
        :disabled="resetFiltersButtonDisabled"
        class="s-faculties-list__reset"
        @click="filterState.changeTo('initial')"
      >
        <span class="a-font_sm-m">Сбросить</span>
      </AButton>
    </div>
    <MFiltersTabsSlider
      v-if="routeName !== 'ordinatura'"
      v-model="filteredDirection"
      show-help-tab
      help-form-title="Поможем подобрать факультет"
      help-form-subtitle="Заполните форму, и&nbsp;мы свяжемся с&nbsp;вами, чтобы провести <span class='--free-red'>бесплатную</span> профориентацию и&nbsp;ответить на&nbsp;все вопросы"
      class="s-faculties__filters sticky"
      :tabs="directions"
      :help-form-action-params="[{param: 'form=pomogite_vibrat_fac_top'}]"
      @change="filterState.changeTo('directionSelected')"
    />

    <div class="s-faculties__wrapper">
      <div
        ref="facultiesList"
        :class="bannerClass"
        class="s-faculties__list"
      >
        <template
          v-for="(item, index) in visibleFaculties"
          :key="index"
        >
          <MHelpChooseCard
            v-if="isHelpCard(item)"
            variant="second"
            form-title="Оставьте контакты, мы вам поможем"
            form-btn="Отправить"
            form-id="faculty"
            :text="item.text"
            :btn="item.btn"
            :description="item.description"
            :title="item.title"
            :action-params="[{param: 'form=pomogite_vibrat_fac'}]"
            color-type="white"
          />
          <MFaculty
            v-else
            :title="item.title"
            :count="item.count"
            :is-new="false"
            :image="item.image"
            :image-sm="item.imageSm"
            :link="item.link"
            @enroll="showPopup(item)"
          />
        </template>

        <template
          v-for="(item, index) in restOfFaculties"
          :key="index"
        >
          <MFaculty
            v-if="!isHelpCard(item)"
            :key="index"
            :hide="true"
            :title="item.title"
            :count="item.count"
            :is-new="false"
            :image="item.image"
            :image-sm="item.imageSm"
            :link="item.link"
            @enroll="showPopup(item)"
          />
        </template>
      </div>

      <div
        v-if="remainingItems > 0"
        class="s-faculties__more"
      >
        <AButtonThird
          class="s-faculties__more-btn"
          size="lg_m"
          data
          @click="visibleLength += INCREMENT_STEPS"
        >
          Показать еще ({{ remainingItems }})
        </AButtonThird>
      </div>
    </div>
  </MSection>

  <SFacultyListPopup
    v-if="renderPopups"
    ref="facultyPopup"
    v-bind="popupData"
    :action-params="[{param: 'form=postupi_faculty'}]"
  />

  <MModalForm
    id="s-faculties-fac-select"
    title="Оставьте контакты, мы вам поможем"
    btn="Отправить"
    form-phone
    :action-params="[{param: 'form=pomogite_vybrat_fac_select_filtra'}]"
  />
</template>

<style lang="scss" scoped>
@import './SFaculties.scss';
</style>
