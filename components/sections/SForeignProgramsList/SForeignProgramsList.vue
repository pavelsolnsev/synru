<script setup>
import { KEYS } from '~/constants';

const props = defineProps({
  trainingProgramsTitle: {
    type: String,
    default: '',
  },
  actionParams: {
    type: Array,
    default:() => ([]),
  },
  routeName: {
    type: String,
    required: true,
  },
});

const PLACES = {
  'Сербия': 1,
  'Китай': 2,
  'Дубай': 3,
  'Малайзия': 4,
  'Таиланд': 5,
  'Узбекистан': 6,
};

const { data } = await useFetch('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: KEYS.PROGRAMS_FILTERS_DATA,
});

const cards = data.value?.programs.filter((program) => props.routeName === 'kampus_v_dubae' ? program.place === 'Дубай' : program.place).map((program) => {
  program.tags = {
    [PLACES[program.place]]: {
      'value': PLACES[program.place],
      'text': program.place,
      'disabled': false,
      'type': 'PlaceTag',
    },
  };

  return program;
}) || [];

const filteredCards = ref([...cards]);

const {
  faculties: facultiesData,
  forms: formatsData,
} = data.value;

const facultyFilterDisabled = ref(false);
const formatFilterDisabled = ref(false);
const resetTagsButtonDisabled = ref(false);
const resetFiltersButtonDisabled = ref(true);

const filteredLevel = ref(null);
const filteredFaculty = ref(null);
const filteredFormat = ref(null);
const filteredTag = ref(null);

onMounted(() => {
  filterState.changeTo('initial');
});

const tags = Object.keys(PLACES).reduce((acc, place) => {
  return Object.assign(acc, { [PLACES[place]]: {
    'value': PLACES[place],
    'text': place,
    'disabled': false,
    'type': 'PlaceTag',
  } });
}, {});

const levelsData = data.value.levels;

Object.keys(levelsData).forEach((key) => {
  levelsData[key].disabled = true;
  levelsData[key].count = 0;

  for (const card of cards) {
    if (String(card.level.value) === key) {
      levelsData[key].disabled = false;
      levelsData[key].count += 1;
    }
  }
});

const displayedTags = ref(Object.values(tags));
const placeTags = {};
const levels = ref(levelsData);
const faculties = ref(facultiesData);
const formats = ref(formatsData);

const filterState = {
  currentState: null,
  states: {
    initial: {
      onStateChanged() {
        enable('all');
        resetFilters('all');

        [levels.value, faculties.value, formats.value].forEach((entities) => {
          Object.values(entities).forEach(
            (entity) => (entity.disabled = true),
          );
        });

        filteredCards.value = cards.filter((program) => {
          if (program.level.value) {
            levels.value[program.level.value]['disabled'] = false;
          }

          if (program.faculty.value) {
            faculties.value[program.faculty.value]['disabled'] = false;
          }

          Object.keys(program.forms).forEach((formId) => {
            formats.value[formId]['disabled'] = false;
          });

          return program;
        });

        resetFiltersButtonDisabled.value = true;
      },
    },
    levelSelected: {
      onStateChanged() {
        filteredTag.value = null;
        placeTags[filteredLevel.value] = {};

        Object.values(faculties.value).forEach(
          (faculty) => (faculty.disabled = true),
        );

        Object.values(formats.value).forEach(
          (format) => (format.disabled = true),
        );

        filteredCards.value = cards.filter((program) => {
          const matches = isMatch(program);

          if (matches) {
            Object.values(program.tags).forEach((tag) => {
              if (tag.type === 'PlaceTag')
                placeTags[filteredLevel.value][tag.value] = tag;
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

        resetFiltersButtonDisabled.value = false;
      },
    },
    facultySelected: {
      onStateChanged() {
        filteredTag.value = null;

        Object.values(levels.value).forEach(
          (level) => (level.disabled = true),
        );

        Object.values(formats.value).forEach(
          (format) => (format.disabled = true),
        );

        filteredCards.value = cards.filter((program) => {
          const matches = isMatch(program);

          if (matches) {
            console.log({ program });

            if (program.level.value) {
              levels.value[program.level.value]['disabled'] = false;
            }

            Object.keys(program.forms).forEach((formId) => {
              formats.value[formId]['disabled'] = false;
            });
          }

          return matches;
        });

        resetFiltersButtonDisabled.value = false;
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

        resetFiltersButtonDisabled.value = false;
      },
    },
    placeTagSelected: {
      onStateChanged() {
        enable('reset');
        resetFilters('level', 'faculty', 'format');

        filteredCards.value = cards.filter((program) => {
          return program.tags[filteredTag.value];
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

function disable(...args) {
  changeDisabledTo(true)(...args);
}

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

function changeDisabledTo(state) {
  return function (...args) {
    const filters = {
      faculty() {
        facultyFilterDisabled.value = state;
      },
      format() {
        formatFilterDisabled.value = state;
      },
      reset() {
        resetTagsButtonDisabled.value = state;
      },
    };

    args.forEach((filter) => {
      if (!Object.hasOwn(filters, filter)) return;

      filters[filter]();
    });
  };
}

function calculateProgramCount() {
  return cards.length;
}

function isMatch(program) {
  if (filteredLevel.value && program.level.value !== filteredLevel.value) return false;

  if (filteredFaculty.value && program.faculty.value !== filteredFaculty.value) return false;

  if (filteredFormat.value && !program.forms[filteredFormat.value]) return false;

  return true;
}

function resetTags() {
  filteredTag.value = null;
  if (!filteredLevel.value) {
    filteredCards.value = [...cards];
  } else {
    resetFilters('faculty', 'format');

    filteredCards.value = cards.filter((program) => program.level.value === filteredLevel.value);
  }
}

const { popupData, showPopup } = useProgramPopup(props.routeName);
</script>

<template>
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
          v-model="filteredLevel"
          :levels
          @change="filterState.changeTo('levelSelected')"
        />
      </div>
      <div
        class="s-programs-list__selects"
        :class="{
          's-programs-list__selects-cropped': ['level', 'ordinatura', 'faculty', 'zarubezhnoe_obrazovanie'].includes(routeName)
        }"
      >
        <MFacultyFilterSelect
          v-model="filteredFaculty"
          :faculties
          :disabled="facultyFilterDisabled"
          @change="filterState.changeTo('facultySelected')"
        />
        <MFormatFilterSelect
          v-model="filteredFormat"
          :formats
          :disabled="formatFilterDisabled"
          @change="filterState.changeTo('formatSelected')"
        />
        <AButton
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
        v-show="!['kampus_v_dubae'].includes(routeName)"
        v-model="filteredTag"
        :is-disabled-reset-btn="resetTagsButtonDisabled"
        :tags="displayedTags"
        class="s-programs-list__tags"
        @selected="
          filterState.changeTo('placeTagSelected')"
        @reset="resetTags()"
      />

      <ProgramResults :cards="filteredCards">
        <template #default="{ item: program, hide = false }">
          <MSpecialtyCard
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
            :ico="program.direction_ico"
            :is-show-enroll="program.popup"
            @enroll="showPopup(program)"
          />
        </template>
      </ProgramResults>
    </div>
  </MSection>

  <SCoursesListPopup
    ref="coursePopup"
    v-bind="popupData"
  />

  <SProgramsListPopup
    ref="programPopup"
    v-bind="popupData"
    :action-params="props.actionParams"
  />
</template>

<style lang="scss" scoped>
@import './../SProgramsList/SProgramsList.scss';
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
</style>
