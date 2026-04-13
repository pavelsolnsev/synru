<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { ROUTES } from '~/constants';
import type { Nullable, RegionCityWithSlug } from '~/types';

interface Props {
  items: Record<string, RegionCityWithSlug>
}

const {
  items = {},
} = defineProps<Props>();

const letters = splitLetters(items);

const citiesDiv = templateRef('citiesDiv');
const citiesInnerDiv = templateRef('citiesInnerDiv');

const currentFocusLetter = ref<Nullable<string>>(null);

const { width: windowWidth } = useWindowSize();

const columnsCount = computed(() => {
  return Math.floor(windowWidth.value / citiesDiv.value.offsetWidth);
});

const dropdownCitiesList = computed<RegionCityWithSlug[]>(() => {
  const citiesByFocusLetter = items[currentFocusLetter.value ?? ''] ?? {};

  const otherCities = Object.keys(items).reduce((acc, letter) => {
    if (letter === currentFocusLetter.value) return acc;
    const cities = items[letter];

    acc.push(...Object.values(cities));
    return acc;
  }, [] as RegionCityWithSlug[]);

  return [
    ...Object.values(citiesByFocusLetter),
    ...otherCities,
  ];
});

function splitLetters(letters: Record<string, RegionCityWithSlug>) {
  const keys = Object.keys(letters);
  const middleIndex = Math.ceil(keys.length / 2);

  const firstHalfLetters = keys.slice(0, middleIndex);
  const secondHalfLetters = keys.slice(middleIndex);

  return [firstHalfLetters, secondHalfLetters];
}

function onLetterMouseEnter(event: MouseEvent, letter: string) {
  currentFocusLetter.value = letter;
  citiesInnerDiv.value.scrollTo({ top: 0 });

  const letterPosition = Math.floor(event.clientX / (windowWidth.value / columnsCount.value));

  citiesDiv.value.style.left = `${citiesDiv.value.offsetWidth * letterPosition}px`;
}

function onClickOutsideSection() {
  currentFocusLetter.value = null;
  citiesDiv.value.style.left = `0px`;
}
</script>

<template>
  <MSection
    v-if="letters.length"
    class="s-regions-letters"
    :class="{ '--inited': items }"
  >
    <div
      v-click-outside="onClickOutsideSection"
      class="s-regions-letters__inner"
    >
      <div class="s-regions-letters__lines">
        <div
          v-for="half,index in letters"
          :key="index"
          class="s-regions-letters__line a-font_xl-m"
        >
          <span
            v-for="letter in half"
            :key="letter"
            @mouseenter="onLetterMouseEnter($event, letter)"
            v-html="letter"
          />
        </div>
      </div>

      <div
        ref="citiesDiv"
        class="s-regions-letters__cities a-font_m-m"
        :class="{ '--visible': currentFocusLetter }"
      >
        <div
          ref="citiesInnerDiv"
          class="s-regions-letters__cities-inner"
        >
          <NuxtLink
            v-for="city in dropdownCitiesList"
            :key="city.key"
            :to="`${ROUTES.FILIALS}/${city.slug}`"
          >
            {{ city.value }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SRegionsLetters.scss';
</style>
