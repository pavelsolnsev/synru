<script setup>
import { KEYS, ROUTES } from '~/constants';
import { FACULTY_FILTER_OPTION_HELP_FORM } from '~/constants/common';

const INITIAL_CARD_COUNT = 6;

const props = defineProps({
  trainingProgramsTitle: {
    type: String,
    default: 'Выберите специальность',
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
  ids: {
    type: String,
    default: '',
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

const { data } = await useFetch('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: KEYS.PROGRAMS_FILTERS_DATA,
});

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
        if (routeName === 'seo-college' && props.entity.id === 1) {
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

        filteredCards.value = filteredCollegePrograms.filter((program) => {
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
          initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
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

        filteredCards.value = filteredCollegePrograms.filter((program) => {
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
          initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
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

        filteredCards.value = filteredCollegePrograms.filter((program) => {
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
          initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
        });

        resetFiltersButtonDisabled.value = false;
      },
    },
    mainTagSelected: {
      onStateChanged() {
        resetFilters('faculty', 'format');

        filteredCards.value = filteredCollegePrograms.filter((program) => {
          return program.tags[filteredTag.value];
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: route === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
        });

        resetFiltersButtonDisabled.value = false;
      },
    },
    levelTagSelected: {
      onStateChanged() {
        resetFilters('faculty', 'format');

        filteredCards.value = filteredCollegePrograms.filter((program) => {
          return (
            program.level.value === filteredLevel.value &&
            program.tags[filteredTag.value]
          );
        });

        filteredCards.value = addHelpCardsToPrograms({
          cards: filteredCards.value,
          initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
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

const ids = props.entity.customFields?.['seo-programs-list']?.at(0)?.ids || (props.ids || '');

const filteredCollegePrograms = ids ? [...cards.filter((card) => {
  return ids.split(' ').includes(card.id) && card.type === 'programs';
})] : cards;

const filteredCards = ref([...filteredCollegePrograms]);
const levelTags = {};
const levels = ref(levelsData);
const faculties = ref(facultiesData);
const formats = ref(formatsData);

const displayedTags = ref(rearrangeTags(Object.values(tags).filter(
  (tag) => tag.type === 'MainPage',
), { routeName: routeName, levelId: null }));

const collegeWithoutLevels = ['seo-college', 'land-college', 'seo-magistracy'].includes(routeName);
const collegeWithoutFaculties = ['seo-college', 'land-college', 'seo-magistracy'].includes(routeName);

const showLevelSelect = !(['level', 'ordinatura', 'college_medicine', 'college_new'].includes(routeName) || collegeWithoutLevels);
const showFacultySelect = !(['faculty', 'ordinatura', 'college_medicine'].includes(routeName) || collegeWithoutFaculties);
const showFormatSelect = !['ordinatura'].includes(routeName);

const hasOnline = shallowRef(false);

filterState.changeTo('initial');

onNuxtReady(() => {
  const needScroll = route.query['scroll'] === 'true';

  if (!needScroll) return;

  setTimeout(() => {
    const element = document.getElementById('program-list-block');

    if (element) {
      const { top, left } = element.getBoundingClientRect();

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

      filteredCards.value = filteredCollegePrograms.filter((program) => {
        const matches = isMatch(program);

        if (matches) {
          levels.value[program.level.value]['disabled'] = false;
          levels.value[program.level.value]['count'] += 1;
        }

        return matches;
      });

      filteredCards.value = addHelpCardsToPrograms({
        cards: filteredCards.value,
        initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
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

    default() {
      filteredLevel.value = routeName === 'seo-magistracy' ? 4 : 1;

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
    const filtered = filteredCollegePrograms.filter((program) => program.level.value === props.entity.id);

    return filtered.length;
  }

  if (routeName === 'faculty') {
    const filtered = filteredCollegePrograms.filter((program) => program.faculty.value === props.entity.id);

    return filtered.length;
  }

  if (routeName === 'ordinatura') {
    const ordinaturaId = Number(Object.keys(levelsData).find((levelId) =>
      levelsData[levelId].text === 'Ординатура',
    ));

    return filteredCollegePrograms.filter((program) => program.level.value === ordinaturaId).length;
  }

  return filteredCollegePrograms.length;
}

function resetTags() {
  filteredTag.value = null;
  if (!filteredLevel.value) {
    filteredCards.value = addHelpCardsToPrograms({
      cards: filteredCollegePrograms,
      initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
    });

  } else {
    resetFilters('faculty', 'format');

    filteredCards.value = filteredCollegePrograms.filter((program) => program.level.value === filteredLevel.value);
    filteredCards.value = addHelpCardsToPrograms({
      cards: filteredCards.value,
      initialCardCount: routeName === 'programmyi_obucheniya' ? INITIAL_CARD_COUNT : 9,
    });
  }
}

function isOnline(program) {
  const onlineId = Object.keys(formats.value).find((id) => formats.value[id]?.text?.match(/онлайн/i));

  if (program.forms?.[onlineId]) {
    hasOnline.value = true;
  }

  if (route.path.includes('college/online')) return false;
  return onlineId ? !!program.forms?.[onlineId] : false;
}

const { popupData, showPopup } = useProgramPopup(routeName);
</script>

<template>
  <div>
    <div id="program-list-block" />
    <MSection
      :title="trainingProgramsTitle"
      :nums="String(calculateProgramCount())"
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
        <div class="s-programs-list__level-slider-wrapper">
          <MLevelFilterSlider
            v-show="showLevelSelect"
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
          @selected="
            filterState.changeTo(
              filteredLevel ? 'levelTagSelected' : 'mainTagSelected')"
          @reset="resetTags()"
        />

        <ProgramResultsByLevel
          v-if="routeName === 'programmyi_obucheniya'"
          :levels
          :cards="filteredCards"
          :initial-card-count="INITIAL_CARD_COUNT"
          @enroll="(program) => showPopup(program)"
        />

        <ProgramResults
          v-else
          :cards="filteredCards"
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
                :is-online="isOnline(program)"
                :is-popular="program.isPopular"
                :is-partner="program.partner"
                :ico="program.direction_ico"
                :is-show-enroll="program.popup"
                :btn-text="route.path.includes(ROUTES.COLLEGE) || route.path.includes('/abiturientam/ad/college')? 'Выбрать' : 'Поступить'"
                @enroll="showPopup(program)"
              />
            </template>
            <template v-else>
              <MHelpChooseCard
                v-show="!hide"
                :text="program.text"
                :title="program.title"
                :description="program.description"
                :btn="program.btn"
                :action-params="[{param: 'form=pomogite_vybrat_programmu'}]"
                :route-name
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

    <SCoursesListPopup
      ref="coursePopup"
      v-bind="popupData"
      :route-name
    />

    <SProgramsListPopup
      ref="programPopup"
      v-bind="popupData"
      :action-params="[{param: 'form=postupi_short'}]"
      :route-name
    />

    <SSeoDistantPlatform v-if="hasOnline" />

    <MModalForm
      id="s-programs-list-fac-select"
      title="Оставьте контакты, мы вам поможем"
      btn="Отправить"
      form-phone
      :action-params="[{param: 'form=pomogite_vybrat_select_filtra'}]"
      :route-name
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../SProgramsList/SProgramsList.scss';
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
