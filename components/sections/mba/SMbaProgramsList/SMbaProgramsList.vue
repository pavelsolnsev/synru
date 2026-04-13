<script setup>
import { transform } from './transformMbaProgramsFilterData';

const filteredTag = ref(null);
const popup = ref(null);
const popupData = ref({});

const { data } = await useFetch('/api/mba/getMbaProgramsFilterData', {
  watch: false,
  deep: false,
  transform,
});

const {
  programs: cards,
  tags,
} = data.value || { programs: [], tags: {} };

const filterTags = Object.values(tags);

const filteredCards = ref([...cards]);

const filterState = {
  currentState: null,
  states: {
    initial: {
      onStateChanged() {
        filteredTag.value = null;
        filteredCards.value = [...cards];
      },
    },
    tagSelected: {
      onStateChanged() {
        filteredCards.value = cards.filter((program) => {
          return Object.hasOwn(program.tags, filteredTag.value);
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

onMounted(() => {
  filterState.changeTo('initial');
});

function getFieldData(customFields, key) {
  if (!Array.isArray(customFields)) return null;
  const field = customFields.find(item => Object.hasOwn(item, key));
  return field ? field[key] : null;
}

function showPopup(program) {
  popupData.value = {};
  const isDirectorsProgram = program.name.includes('Директорский');

  const contentData = getFieldData(program.customFields, 'mba_program_content');
  const heroData = getFieldData(program.customFields, 'mba_program_hero');

  popupData.value = {
    name: program.name,
    slug: program.link,
    advantages: program.advantages,
    program: program.program,
    content: isDirectorsProgram ? (contentData?.[0] || {}) : {},
    heroCards: isDirectorsProgram ? (heroData?.[0]?.cards || []) : [],
  };

  popup.value.open();
}

function calculateProgramCount() {
  return cards.length;
}
</script>

<template>
  <MSection
    title="Программы обучения"
    :nums="String(calculateProgramCount())"
    class="s-programs-list"
  >
    <div
      id="program_container"
      class="s-programs-list__content"
    >
      <MProgramsTags
        v-if="filterTags.length"
        v-model="filteredTag"
        :tags="filterTags"
        class="s-programs-list__tags"
        @selected="
          filterState.changeTo(
            'tagSelected')"
        @reset="filterState.changeTo('initial')"
      />

      <ProgramResults :cards="filteredCards">
        <template #default="{ item: program, hide = false }">
          <MSpecialtyCard
            v-show="!hide"
            :id="program.id"
            :name="program.name"
            :level="Object.values(program.forms)[0]?.text"
            :place="program.place"
            :link="program.link"
            :is-new="program.new"
            :is-popular="program.isPopular"
            :is-partner="program.partner"
            :is-show-enroll="program.popup"
            @enroll="showPopup(program)"
          />
        </template>
      </ProgramResults>
    </div>
  </MSection>
  <SBsProgramsListPopup
    ref="popup"
    v-bind="popupData"
  />
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
</style>
