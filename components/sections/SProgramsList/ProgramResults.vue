<script setup lang="ts">
import type { ProgramCard } from '~/types/ProgramCard';

const STEP = 9;

const { cards, bigCard = false, initialCardCount = STEP } = defineProps<{
  bigCard?: boolean,
  cards:  Array<ProgramCard | HelpChooseCardWithProgramLevel>,
  initialCardCount?: number,
}>();

const showCardsCount = ref(initialCardCount);

const cardsItemsToShow = computed(() => {
  return cards.slice(0, showCardsCount.value);
});

const restCardsItemsToShow = computed(() => {
  return cards
    .slice(showCardsCount.value)
    .filter((card) => !isHelpCard(card));
});

const showMoreButton = computed(() => restCardsItemsToShow.value.length > 0);

watch([() => cards, () => initialCardCount], () => {
  showCardsCount.value = initialCardCount;
});

const toTop = () => {
  const header = document.querySelector('#header');
  const programContainer = document.getElementById('program_container');

  if (!programContainer || !header) return;

  window.scrollTo({
    top: window.scrollY + programContainer.getBoundingClientRect().top - header.clientHeight - 42,
    behavior: 'smooth',
  });
};

function isHelpCard(card: HelpChooseCardWithProgramLevel | ProgramCard): card is HelpChooseCardWithProgramLevel {
  return Boolean((card as HelpChooseCardWithProgramLevel).isHelpCard);
}
</script>

<template>
  <div
    class="s-programs-list__inner"
    v-bind="$attrs"
    :class="{ '--big': bigCard }"
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

  <div class="s-programs-list__more">
    <AButtonThird
      v-if="showMoreButton"
      class="s-programs-list__btn"
      size="lg_m"
      @click="showCardsCount += STEP"
    >
      <span>Показать еще ({{ restCardsItemsToShow.length }})</span>
    </AButtonThird>
    <AButtonThird
      v-show="!showMoreButton && cardsItemsToShow.length > STEP"
      class="s-programs-list__totop"
      size="lg_m"
      @click="toTop"
    >
      <span>К фильтрам программ</span>
    </AButtonThird>
  </div>
</template>

<style lang="scss" scoped>
.s-programs-list__inner {
  display: grid;
  grid-gap: var(--gap_def);
  padding: scale(24) 0 0;

  @include tablet() {
    grid-template-columns: repeat(2, 1fr);
    padding: scale(16) 0 0;
  }

  @include desktop(min) {
    padding-top: 0;
    grid-template-columns: repeat(3, 1fr);
    padding: scale(32) 0 0;
  }
}

.s-programs-list__totop {
  display: block;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: rem(18) auto 0;

  @media (min-width: 1200px) {
    margin: rem(40) auto 0;
    width: rem(241);
  }

  @media (min-width: 574px) {
    width: rem(241);
  }
}
.s-programs-list__more {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: scale(24);

  @include desktop {
    margin-top: scale(40);
  }

  .a-btn {
    width: 100%;
    max-width: scale(255);

    @include desktop {
      max-width: scale(290);
    }
  }
}
</style>
