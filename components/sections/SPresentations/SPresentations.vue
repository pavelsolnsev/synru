<script setup>
import { Swiper } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';

const filteredLevel = ref(null);
const searchedValue = ref('');

const { data } = await useFetch('/api/getProgramFiltersData', {
  immediate: true,
  watch: false,
  deep: false,
});

const {
  programs: cards,
  levels: levelsData,
} = data.value;

const filteredCards = ref([...cards]);

const levels = ref(levelsData);

const cardsForDisplay = computed(() => {
  if (searchedValue.value) {
    return filteredCards.value.filter((card) => card.name.toLowerCase().includes(searchedValue.value.toLowerCase()));
  }

  return filteredCards.value;
});

const swiperConfig = {
  modules: [FreeMode],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
  observer: true,
  observeParents: true,
};

const filterState = {
  currentState: null,
  states: {
    initial: {
      onStateChanged() {
        filteredLevel.value = null;
        filteredCards.value = [...cards];
      },
    },
    levelSelected: {
      onStateChanged() {
        filteredCards.value = cards.filter(
          (program) => program.level.value === filteredLevel.value,
        );
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
};

onMounted(() => {
  filterState.changeTo('initial');
});

function onLevelSelect(level) {
  filteredLevel.value = level;
  filterState.changeTo('levelSelected');
}
</script>

<template>
  <MSection class="s-presentations">
    <!-- <MSearch v-model="searchedValue" /> -->

    <div class="s-presentations__levels sticky">
      <swiper
        v-bind="swiperConfig"
        slides-per-view="auto"
      >
        <template #wrapper-start>
          <MFilterTab
            v-for="{ text, value } in levels"
            :key="text"
            :title="text"
            :active="filteredLevel === value"
            class="s-presentations__levels-item swiper-slide"
            @click="onLevelSelect(value)"
          />
        </template>
      </swiper>
    </div>

    <div
      id="program_container"
      class="s-programs-list__content"
    >
      <ProgramResultsByLevel
        :levels
        :cards="cardsForDisplay"
        :show-level-popup="false"
        :show-presentation="true"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPresentations.scss';
</style>
