<script setup lang="ts">
import { history } from './historyData';
import { useWindowSize } from '@vueuse/core';
import type { Nullable } from '~/types';

const activeAccordion = ref(0);

const contentIcons = ['simple-hat', 'simple-arrow'];

const { width: windowWidth } = useWindowSize();

let historyCardsNodeList: Nullable<NodeListOf<HTMLDivElement>> = null;

watch(windowWidth, () => {
  setBlockHeight();
});

onMounted(() => {
  historyCardsNodeList = document.querySelectorAll('.s-history .history-card');
  setBlockHeight();
});

function onAccordionClick(accordionIndex: number) {
  activeAccordion.value = accordionIndex;

  if (windowWidth.value > 1199 || !historyCardsNodeList?.length) return;

  const clickedBlock = historyCardsNodeList[accordionIndex];
  const previousBlock = clickedBlock.previousElementSibling;

  if (previousBlock) previousBlock.scrollIntoView();
}

function setBlockHeight() {
  if (!historyCardsNodeList?.length) return;

  if (windowWidth.value < 1200) {
    historyCardsNodeList.forEach((card) => {
      card.style.removeProperty('height');
    });
    return;
  }

  let maxCardHeight = 0;

  historyCardsNodeList.forEach((card, index) => {
    card.style.removeProperty('height');

    card.classList.add('--open');

    maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);

    if (index !== activeAccordion.value) card.classList.remove('--open');
  });

  historyCardsNodeList.forEach((card) => {
    card.style.height = `${maxCardHeight}px`;
  });
}
</script>

<template>
  <MSection
    class="s-history"
    title="История Университета"
  >
    <div class="s-history__wrap">
      <MAccordionItem
        v-for="item, index in history"
        :key="index"
        class="m-card-text history-card"
        :title="{text: item.title, className: 'a-font_h4'}"
        :is-open="activeAccordion === index"
        :item-key="`historyKey${index}`"
        @click="onAccordionClick(index)"
      >
        <ul>
          <li
            v-for="text in item.text"
            :key="text"
            class="a-font_l-m"
            v-html="text"
          />
        </ul>
        <div
          class="history-card__tags"
        >
          <div
            v-for="name in contentIcons"
            :key="name"
            class="m-card-text__icon"
          >
            <ASvgMono :name />
          </div>
        </div>
      </MAccordionItem>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SHistory.scss';
@import '../../../molecules/MCardText/MCardText.scss';
</style>
