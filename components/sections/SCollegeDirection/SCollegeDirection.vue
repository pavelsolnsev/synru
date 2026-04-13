<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

interface Props {
  title: string
  cards: {
    title: string
    image: string
    programsCount: string
    link: string
  }[]
}

const props = defineProps<Props>();

const STEP_DESKTOP = 8;
const STEP_MOBILE = 6;

const isDesktop = useMediaQuery('(min-width: 1200px)');

const visibleCount = shallowRef(isDesktop.value ? STEP_DESKTOP : STEP_MOBILE);

const visibleCards = computed(() => {
  return props.cards.slice(0, visibleCount.value);
});

const remainingCount = computed(() => {
  return props.cards.length - visibleCount.value;
});

function showMore() {
  const step = isDesktop.value ? STEP_DESKTOP : STEP_MOBILE;

  visibleCount.value += step;
}

function getTitleWithCount(count: string) {
  return declensionOfNumber(+count, programForms, true);
}

const programForms = ['программа', 'программы', 'программ'];
</script>

<template>
  <MSection
    class="s-college-direction"
    :title="title"
  >
    <div class="s-college-direction__list">
      <NuxtLink
        v-for="card in visibleCards"
        :key="card.title"
        :to="card.link"
        class="s-college-direction__card"
      >
        <div class="s-college-direction__count a-font_xs-m">
          {{ getTitleWithCount(card.programsCount) }}
        </div>
        <div
          class="s-college-direction__title a-font_h5"
          v-html="card.title"
        />
        <img
          :src="card.image"
          :alt="card.title"
          class="s-college-direction__img"
        >
        <div class="s-college-direction__arrow">
          <ASvgMono name="arr-new" />
        </div>
      </NuxtLink>

      <div
        v-if="visibleCards.length % 4 !== 0"
        class="s-college-direction__plug"
      >
        <img
          src="/img/plug.webp"
          alt="plug"
        >
      </div>
    </div>

    <div
      v-if="remainingCount > 0"
      class="s-college-direction__show-more"
    >
      <AButtonThird
        size="lg_m"
        bg-color="light"
        rounding="circle"
        class="s-college-direction__btn"
        @click="showMore"
      >
        Показать ещё {{ remainingCount }}
      </AButtonThird>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCollegeDirection.scss';
</style>
