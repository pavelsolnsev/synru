<script setup>
import { KEYS } from '~/constants';
import { useMediaQuery } from '@vueuse/core';
import { FACULTY_FILTER_OPTION_HELP_FORM } from '~/constants/common';

const PROGRAMS_PAGE_INITIAL_CARD_COUNT = 6;

const LARGE_SCREEN_ITEMS_COUNT = 9;
const SMALL_SCREEN_ITEMS_COUNT = 5;

const props = defineProps({
  trainingProgramsTitle: {
    type: String,
    default: '',
  },
  trainingProgramsTitleClass: {
    type: String,
    default: 'a-font_h2',
  },
  showTrainingProgramsTitle: {
    type: Boolean,
    default: true,
  },
  trainingProgramsText: {
    type: String,
    default: '',
  },
  actionParams: {
    type: Array,
    default: () => ([]),
  },
  entity: {
    type: Object,
    default: () => ({}),
  },
  hasEntity: {
    type: Boolean,
    default: false,
  },
  routeName: {
    type: String,
    required: true,
  },
});

const routeName = props.routeName?.startsWith('promo_') ? 'faculty' : props.routeName;

const levelFilterDisabled = ref(false);
const facultyFilterDisabled = ref(false);
const formatFilterDisabled = ref(false);
const resetTagsButtonDisabled = ref(false);
const resetFiltersButtonDisabled = ref(true);

const route = useRoute();
const levelQueryParam = +route.query['filter[level]'] || null;

const filteredLevel = ref(1);
const filteredFaculty = ref(null);
const filteredFormat = ref(null);
const filteredTag = ref(null);

const isLargeScreen = useMediaQuery('(min-width: 1200px)', { ssrWidth: 768 });
const itemsCount = computed(() => (isLargeScreen.value ? LARGE_SCREEN_ITEMS_COUNT : SMALL_SCREEN_ITEMS_COUNT));

const isMti = routeName === 'mti' || routeName === 'map';

const { data } = await useFetch(isMti ? '/api/getProgramFiltersDataMti' : '/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: isMti ? KEYS.PROGRAMS_FILTERS_DATA_MTI : KEYS.PROGRAMS_FILTERS_DATA,
});

const isArticlePage = routeName === 'education_article';

const {
  programs: cards = [],
  faculties: facultiesData = {},
  levels: levelsData = {},
  forms: formatsData = {},
  tags = {},
} = data.value || {};

const filterState = {
  currentState: null,
  states: {
    initial: {
      onStateChanged() {
        enable('all');
        resetFilters('all');

        [levels.value, faculties.value, formats.value].forEach((entities) => {
          Object.values(entities).forEach(
            (entity) => (entity.disabled = false),
          );
        });
        filteredCards.value = [...cards];

        displayedTags.value = rearrangeTags(Object.values(tags).filter(
          (tag) => tag.type === 'MainPage',
        ), { routeName: routeName, levelId: null });

        preselectEntity(routeName);

        resetFiltersButtonDisabled.value = true;
      },
    },
    levelSelected: {
      onStateChanged() {
        levelTags[filteredLevel.value] = {};

        resetFilters('format');

        if (routeName !== 'faculty') {
          filteredFaculty.value = null;
        }
        if (routeName === 'college_medicine') {
          filteredFaculty.value = 20;
        }

        Object.values(faculties.value).forEach(
          (faculty) => (faculty.disabled = true),
        );

        Object.values(formats.value).forEach(
          (format) => (format.disabled = true),
        );

        if (routeName === 'faculty') {
          filteredFaculty.value = props.entity.id;
        }

        filteredCards.value = cards.filter((program) => {
          const matches = isMatch(program);

          if (matches) {
            Object.values(program.tags).forEach((tag) => {
              if (tag.type === 'LevelPage')
                levelTags[filteredLevel.value][tag.value] = tag;
            });

            if (program.faculty.value) {
              faculties.value[program.faculty.value]['disabled'] = false;
            }

            Object.keys(program.forms).forEach((formId) => {
              formats.value[formId]['disabled'] = false;
            });
          }

          return matches;
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: routeName === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
        });

        displayedTags.value = rearrangeTags(Object.values(levelTags[filteredLevel.value]), { routeName: routeName, levelId: filteredLevel.value });

        resetFiltersButtonDisabled.value = false;

        const levelHasSomeTag = displayedTags.value.findIndex((tag) => tag.value === filteredTag.value) !== -1;
        if (filteredTag.value && levelHasSomeTag) {
          filterState.changeTo('levelTagSelected');
        } else if (filteredTag.value) {
          resetTags();
        }
      },
    },
    facultySelected: {
      onStateChanged() {
        Object.values(levels.value).forEach(
          (level) => (level.disabled = true),
        );

        Object.values(formats.value).forEach(
          (format) => (format.disabled = true),
        );

        filteredCards.value = cards.filter((program) => {
          const matches = isMatch(program);

          if (matches) {
            if (program.level.value) {
              levels.value[program.level.value]['disabled'] = false;
            }

            Object.keys(program.forms).forEach((formId) => {
              formats.value[formId]['disabled'] = false;
            });
          }

          return matches;
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: routeName === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
        });

        filteredTag.value = null;

        resetFiltersButtonDisabled.value = false;

        displayedTags.value = displayedTags.value.filter((tag) => tag.text === 'Дистанционно');
      },
    },
    formatSelected: {
      onStateChanged() {
        filteredTag.value = null;

        Object.values(levels.value).forEach(
          (level) => (level.disabled = true),
        );

        Object.values(faculties.value).forEach(
          (faculty) => (faculty.disabled = true),
        );

        filteredCards.value = cards.filter((program) => {
          const matches = isMatch(program);

          if (matches) {

            if (program.level.value) {
              levels.value[program.level.value]['disabled'] = false;
            }

            if (program.faculty.value) {
              faculties.value[program.faculty.value]['disabled'] = false;
            }

          }
          return matches;
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: routeName === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
        });

        resetFiltersButtonDisabled.value = false;
      },
    },
    mainTagSelected: {
      onStateChanged() {
        resetFilters('faculty', 'format');

        filteredCards.value = cards.filter((program) => {
          return program.tags[filteredTag.value];
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: route === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
        });

        resetFiltersButtonDisabled.value = false;
      },
    },
    levelTagSelected: {
      onStateChanged() {
        resetFilters('faculty', 'format');

        filteredCards.value = cards.filter((program) => {
          return (
            program.level.value === filteredLevel.value &&
            program.tags[filteredTag.value]
          );
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: routeName === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
        });

        resetFiltersButtonDisabled.value = false;
      },
    },
  },
  onStateChanged() {
    if (import.meta.dev) {
      console.log(`filter state changed to ${this.currentState}`);
    }
  },
  dispatch(actionName, ...payload) {
    if (!this.states[this.currentState][actionName]) return;

    this.states[this.currentState][actionName](...payload);
  },
  async changeTo(newState) {
    if (!this.states[newState]) return;

    this.currentState = newState;
    this.onStateChanged();

    if (this.states[newState]['onStateChanged']) {
      await this.states[newState]['onStateChanged']();
    }
  },
  resetFilter() {
    this.changeTo('initial');
  },
};

const filteredCards = ref([...cards]);
const levelTags = {};
const levels = ref(levelsData);
const faculties = ref(facultiesData);
const formats = ref(formatsData);

const displayedTags = ref(rearrangeTags(Object.values(tags).filter(
  (tag) => tag.type === 'MainPage',
), { routeName: routeName, levelId: null }));

const showLevelSelect = !['level', 'ordinatura', 'college_medicine', 'college_new', 'college_lp', 'magistracy_new', 'distance_university', 'zao_university'].includes(routeName);

const showFacultySelect = !['faculty', 'ordinatura', 'college_medicine'].includes(routeName);
const showFormatSelect = !['ordinatura', 'magistracy_new', 'distance_university', 'zao_university'].includes(routeName);

const formActionParams = routeName === 'mti' ? 'form= pomogite_vybrat_programmu_mti' : 'form=pomogite_vybrat_programmu';

filterState.changeTo('initial');

onNuxtReady(() => {
  const needScroll = route.query['scroll'] === 'true';

  if (!needScroll) return;

  setTimeout(() => {
    const element = document.getElementById('program-list-block');

    if (element) {
      const { top, left } = element?.getBoundingClientRect();

      window.scrollTo({
        top: top + window.pageYOffset - 100,
        left: left,
        behavior: 'smooth',
      });
    }
  }, 300);
});

function enable(...args) {
  changeDisabledTo(false)(...args);
}

function resetFilters(...args) {
  const filters = {
    level() {
      filteredLevel.value = null;
    },
    faculty() {
      filteredFaculty.value = null;
    },
    format() {
      filteredFormat.value = null;
    },
    tag() {
      filteredTag.value = null;
    },
    all() {
      resetFilters('level', 'faculty', 'format', 'tag');
    },
  };

  args.forEach((filter) => {
    if (!Object.hasOwn(filters, filter)) return;

    filters[filter]();
  });
}

function isMatch(program) {
  if (filteredLevel.value && program.level.value !== filteredLevel.value) return false;

  if (filteredFaculty.value && program.faculty.value !== filteredFaculty.value) return false;

  if (filteredFormat.value && !program.forms[filteredFormat.value]) return false;

  return true;
}

function changeDisabledTo(state) {
  return function (...args) {
    const filters = {
      level() {
        levelFilterDisabled.value = state;
      },
      faculty() {
        facultyFilterDisabled.value = state;
      },
      format() {
        formatFilterDisabled.value = state;
      },
      reset() {
        resetTagsButtonDisabled.value = state;
      },
      all() {
        levelFilterDisabled.value = state;
        facultyFilterDisabled.value = state;
        formatFilterDisabled.value = state;
        resetTagsButtonDisabled.value = state;
      },
    };

    args.forEach((filter) => {
      if (!Object.hasOwn(filters, filter)) return;

      filters[filter]();
    });
  };
}

function preselectEntity(entity) {
  const preselectMap = {
    level() {
      filteredLevel.value = props.entity.id;
      filterState.changeTo('levelSelected');
    },
    faculty() {
      filteredFaculty.value = props.entity.id;

      Object.values(levels.value).forEach((level) => {
        level.disabled = true;
        level.count = 0;
      });

      filteredCards.value = cards.filter((program) => {
        const matches = isMatch(program);

        if (matches) {
          levels.value[program.level.value]['disabled'] = false;
          levels.value[program.level.value]['count'] += 1;
        }

        return matches;
      });

      const preselectedLevel = levelQueryParam
        ? Object.values(levels.value).find((level) => level.value === levelQueryParam) || 1
        : Object.values(levels.value).filter((level) => level.count).sort((a, b) => a.rank - b.rank)[0];

      if (preselectedLevel) {
        filteredLevel.value = preselectedLevel.value;
        filterState.changeTo('levelSelected');
      }
    },
    ordinatura() {
      const ordinaturaId = Object.keys(levelsData).find((levelId) =>
        levelsData[levelId].text === 'Ординатура',
      );

      filteredLevel.value = Number(ordinaturaId);
      filterState.changeTo('levelSelected');
    },

    college_medicine() {
      filteredLevel.value = 1;
      filterState.changeTo('levelSelected');
    },

    college_new() {
      filteredLevel.value = 1;
      filterState.changeTo('levelSelected');
    },

    college_lp() {
      filteredLevel.value = 1;
      filterState.changeTo('levelSelected');
    },

    magistracy_new() {
      filteredLevel.value = 4;
      filteredFormat.value = 6;
      filterState.changeTo('formatSelected');
    },

    education_article() {
      const {
        faculty,
        format,
        level,
      } = props.entity?.customFields?.article_filter[0] ?? {};

      filteredLevel.value = level ? Number(level) : 1;
      filteredFaculty.value = faculty ? Number(faculty) : null;
      filteredFormat.value = format ? Number(format) : null;

      filterState.changeTo('facultySelected');
    },

    distance_university() {
      const ONLINE_FORMAT_ID = 6;
      filteredFormat.value = ONLINE_FORMAT_ID;
      filteredCards.value = filteredCards.value.filter(program => program.type === 'programs' && program.forms[ONLINE_FORMAT_ID]);
    },

    zao_university() {
      const ZAO_FORMAT_ID = 2;
      filteredFormat.value = ZAO_FORMAT_ID;
      filteredCards.value = filteredCards.value.filter(program => program.type === 'programs' && program.forms[ZAO_FORMAT_ID]);
    },

    default() {
      filteredLevel.value = 1;
      filterState.changeTo('levelSelected');
    },
  };

  (Object.hasOwn(preselectMap, entity) ? preselectMap[entity] : preselectMap.default)();
}

function rearrangeTags(levelTags, { routeName, levelId }) {
  const tagsOrderTemplate = {
    about: () => ['Дистанционно', 'Бизнес', 'IT', 'Международные', 'Медицина', 'Дизайн', 'Психология', 'Профессии с 0'],
    abiturientam: () => ['Дистанционно', 'Бизнес', 'IT', 'Международные', 'Медицина', 'Дизайн', 'Психология', 'Профессии с 0'],
    programmyi_obucheniya: () => ['Дистанционно', 'Бизнес', 'IT', 'Международные', 'Медицина', 'Дизайн', 'Психология', 'Профессии с 0'],
    'priemnaya_komissiya': () => ['Дистанционно', 'Бизнес', 'Международные', 'IT', 'Психология', 'Профессии с 0', 'Дизайн', 'Медицина'],
    'home-page': () => ['Дистанционно', 'Бизнес', 'Международные', 'IT', 'Психология', 'Профессии с 0', 'Дизайн', 'Медицина'],
    level: (levelId) => {
      const res = [];

      if (!levelsData[levelId]?.tags) return res;

      const popularTagIndex = levelTags.findIndex((tag) => tag.text === 'Популярные');

      for (const tagId of levelsData[levelId].tags) {
        const index = levelTags.findIndex((tag) => tag.value === tagId);

        if (index !== popularTagIndex && index !== -1) {
          res.push(levelTags[index].text);
        }
      }

      return res;
    },
    default: () => ['Дистанционно', 'Бизнес'],
  };

  const processedTags = [...levelTags];
  const result = [];

  const tagsOrder = levelId ? tagsOrderTemplate.level(levelId) : Object.hasOwn(tagsOrderTemplate, routeName) ? tagsOrderTemplate[routeName]() : tagsOrderTemplate.default();

  tagsOrder.forEach((tag) => {
    const index = processedTags.findIndex((tagItem) => tagItem.text === tag);
    if (index !== -1) {
      result.push(processedTags[index]);
      processedTags.splice(index, 1);
    }
  });
  return result.concat(processedTags.filter((tag) => tag.text !== 'Популярные'));
}

function calculateProgramCount() {
  if (routeName === 'level') {
    const filtered = cards.filter((program) => program.level.value === props.entity.id);

    return filtered.length;
  }

  if (routeName === 'faculty') {
    const filtered = cards.filter((program) => program.faculty.value === props.entity.id);

    return filtered.length;
  }

  if (routeName === 'ordinatura') {
    const ordinaturaId = Number(Object.keys(levelsData).find((levelId) =>
      levelsData[levelId].text === 'Ординатура',
    ));

    return cards.filter((program) => program.level.value === ordinaturaId).length;
  }

  if (routeName === 'magistracy_new') {
    const MAGISTRACY_ID = 4;
    const ONLINE_FORMAT_ID = 6;


    return cards.filter((program) => program.level.value === MAGISTRACY_ID && program.forms[ONLINE_FORMAT_ID]).length;
  }

  if (routeName === 'distance_university') {
    const ONLINE_FORMAT_ID = 6;
    return cards.filter((program) => program.type === 'programs' && program.forms[ONLINE_FORMAT_ID]).length;
  }

  if (routeName === 'zao_university') {
    const ZAO_FORMAT_ID = 2;
    return cards.filter((program) => program.type === 'programs' && program.forms[ZAO_FORMAT_ID]).length;
  }

  return cards.length;
}

function resetTags() {
  filteredTag.value = null;
  if (!filteredLevel.value) {
    filteredCards.value = addHelpCardsToPrograms({
      cards: cards,
      initialCardCount: routeName === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
    });

  } else {
    resetFilters('faculty', 'format');

    filteredCards.value = cards.filter((program) => program.level.value === filteredLevel.value);
    filteredCards.value = addHelpCardsToPrograms({
      cards: filteredCards.value,
      initialCardCount: routeName === 'programmyi_obucheniya' ? PROGRAMS_PAGE_INITIAL_CARD_COUNT : SMALL_SCREEN_ITEMS_COUNT,
    });
  }
}

const { popupData, showPopup } = useProgramPopup(routeName);
const renderPopups = shallowRef(false);

onMounted(() => { renderPopups.value = true; });
</script>

<template>
  <div>
    <div id="program-list-block" />
    <MSection
      :title="trainingProgramsTitle"
      :nums="String(calculateProgramCount())"
      :title-class="trainingProgramsTitleClass"
      class="s-programs-list"
    >
      <div class="s-training-programs__nav hidden">
        <div class="s-training-programs__nav-wrapper">
          <span class="s-training-programs__nav-item">
            <a
              class="s-training-programs__nav-link a-font_xl active"
              href="/?&amp;limit=12&amp;"
              onclick="return false"
            >Все</a>
          </span>
        </div>
      </div>
      <div
        id="program_container"
        class="s-programs-list__content"
      >
        <div
          v-show="showLevelSelect"
          class="s-programs-list__level-slider-wrapper"
        >
          <MLevelFilterSlider
            v-model="filteredLevel"
            :levels
            :disabled="levelFilterDisabled"
            @change="filterState.changeTo('levelSelected')"
          />
        </div>
        <div
          class="s-programs-list__selects"
          :class="[
            ['faculty'].includes(routeName)
              ? 's-programs-list__selects-single'
              : 's-programs-list__selects-cropped',
          ]"
        >
          <MFacultyFilterSelect
            v-show="showFacultySelect"
            v-model="filteredFaculty"
            show-help-option
            :faculties
            :disabled="facultyFilterDisabled"
            @change="filterState.changeTo('facultySelected')"
            @action="
              handleActionOption({action:FACULTY_FILTER_OPTION_HELP_FORM, actionData:'#s-programs-list-fac-select'})"
          />
          <MFormatFilterSelect
            v-show="showFormatSelect"
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
            class="s-programs-list__reset"
            @click="filterState.changeTo('initial')"
          >
            <span class="a-font_sm-m">Сбросить</span>
          </AButton>
        </div>

        <MProgramsTags
          v-if="!['faculty', 'ordinatura', 'college_medicine'].includes(routeName)"
          v-model="filteredTag"
          :is-disabled-reset-btn="resetTagsButtonDisabled"
          :tags="displayedTags"
          :reset-only="routeName === 'faculty'"
          class="s-programs-list__tags"
          :route-name
          @selected="
            filterState.changeTo(
              filteredLevel ? 'levelTagSelected' : 'mainTagSelected')"
          @reset="resetTags()"
        />

        <ProgramResultsByLevel
          v-if="routeName === 'programmyi_obucheniya'"
          :levels
          :cards="filteredCards"
          :initial-card-count="PROGRAMS_PAGE_INITIAL_CARD_COUNT"
          @enroll="(program) => showPopup(program)"
        />

        <ProgramResults
          v-else
          :cards="filteredCards"
          :initial-card-count="itemsCount"
        >
          <template #default="{ item: program, hide = false }">
            <template v-if="program.type">
              <component
                :is="checkIsLandingPage({page: routeName}) ? 'MSpecialtyCardLP' : 'MSpecialtyCard'"
                v-show="!hide"
                :id="program.id"
                :name="program.name"
                :faculty="program.faculty.text"
                :level="program.level.text"
                :place="program.place"
                :link="program.link"
                :is-new="program.new"
                :is-popular="program.isPopular"
                :is-partner="program.partner"
                :partner-logo="program.partnerLogo"
                :partner-text="program.partnerText"
                :partner-bonus="program.partnerBonus"
                :ico="program.direction_ico"
                :is-show-enroll="program.popup"
                :price="program.price"
                @enroll="showPopup(program)"
              />
            </template>
            <template v-else>
              <MHelpChooseCard
                v-show="!hide"
                :is-article-page
                :text="program.text"
                :title="program.title"
                :description="program.description"
                :btn="program.btn"
                :action-params="[{param: formActionParams}]"
                form-title="Оставьте контакты, мы вам поможем"
                form-btn="Отправить"
                form-id="programs"
                color-type="white"
              />
            </template>
          </template>
        </ProgramResults>
      </div>
    </MSection>

    <SProgramsListPopup
      v-if="renderPopups"
      ref="programPopup"
      v-bind="popupData"
      :action-params="props.actionParams"
      :route-name
    />

    <SCoursesListPopup
      v-if="renderPopups"
      ref="coursePopup"
      v-bind="popupData"
      :route-name
    />

    <MModalForm
      id="s-programs-list-fac-select"
      title="Оставьте контакты, мы вам поможем"
      btn="Отправить"
      form-phone
      :action-params="[{param: 'form=pomogite_vybrat_select_filtra'}]"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SProgramsList.scss';
</style>

<style lang="scss">
.s-programs-list__selects {
  .a-uikit-select {
    &__input {
      background-color: var(--a-color_grey_20);

      &._open {
        background-color: var(--a-color_white);
      }
    }
  }

  &:has(._open) {
    z-index: indexes("program-selects");
  }
}
#m-help-choose-card-form {
  @include desktop() {
    min-height: initial;
  }
}
</style>
