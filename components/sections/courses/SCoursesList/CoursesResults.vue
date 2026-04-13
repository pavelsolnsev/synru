<script setup lang="ts">
import type { ProgramCard } from '~/types/ProgramCard';
import type { CourseData } from '~/utils/transformCoursesFilterData';

const STEP = 12;

const { cards, bigCard = false, initialCardCount = STEP, sortByPrice = false } = defineProps<{
  bigCard?: boolean,
  cards: ProgramCard[] | CourseData[],
  initialCardCount?: number,
  sortByPrice?: boolean
}>();

const showCardsCount = ref(initialCardCount);

const sortedCards = computed(() => {
  if (!sortByPrice) {
    return cards;
  }
  return [...cards].sort((a, b) => {

    const hasPriceA = 'price' in a && a.price > 0;
    const hasPriceB = 'price' in b && b.price > 0;

    if (hasPriceA && !hasPriceB) {
      return -1;
    }
    if (!hasPriceA && hasPriceB) {
      return 1;
    }

    return 0;
  });
});

const cardsItemsToShow = computed(() => {
  return sortedCards.value.slice(0, showCardsCount.value);
});

const restCardsItemsToShow = computed(() => {
  return sortedCards.value
    .slice(showCardsCount.value)
    .filter((card) => card.type);
});

const showMoreButton = computed(() => restCardsItemsToShow.value.length > 0);

watch(() => cards, () => {
  showCardsCount.value = initialCardCount;
});

const toTop = () => {
  const header = document.querySelector('#header');
  const coursesContainer = document.getElementById('courses-container');

  if (!coursesContainer || !header) return;

  window.scrollTo({
    top: window.scrollY + coursesContainer.getBoundingClientRect().top - header.clientHeight - 42,
    behavior: 'smooth',
  });
};
</script>

<template>
  <div
    class="s-courses-list__grid"
    :bigCard
  >
    <template v-if="cardsItemsToShow.length">
      <template
        v-for="card in cardsItemsToShow"
        :key="card.id"
      >
        <slot :item="card" />
      </template>
      <template
        v-for="card in restCardsItemsToShow"
        :key="card.id"
      >
        <slot
          :item="card"
          :hide="true"
        />
      </template>
    </template>
    <span
      v-else
      class="s-cards-filter__inner-empty"
    >
      Подходящих результатов не найдено
    </span>
  </div>

  <div class="s-courses-list__more">
    <AButtonThird
      v-if="showMoreButton"
      class="s-courses-list__more-btn"
      size="lg_m"
      @click="showCardsCount += STEP"
    >
      <span>Показать еще ({{ restCardsItemsToShow.length }})</span>
    </AButtonThird>
    <AButtonThird
      v-show="!showMoreButton && cardsItemsToShow.length > STEP"
      class="s-courses-list__more-totop"
      size="lg_m"
      @click="toTop"
    >
      <span>К фильтрам курсов</span>
    </AButtonThird>
  </div>
</template>

<style lang="scss">
.s-courses-list__grid {
  position: relative;
  gap: scale(8);
  display: grid;

  @include tablet(min) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include desktop(min) {
    gap: scale(22) scale(20);
    grid-template-columns: repeat(3, 1fr);
  }
}

.s-courses-list__more {
  display: flex;
  justify-content: center;

  .a-btn {
    width: 100%;
    max-width: scale(255);
    margin-top: scale(24);

    @include desktop {
      max-width: scale(290);
      margin-top: scale(40);
    }
  }
}
</style>
