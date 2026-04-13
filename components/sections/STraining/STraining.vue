<script setup lang="ts">
interface Card {
  classname?: string;
  title?: string;
  text?: string;
  ico?: string;
  imgSm?: string;
  imgLg?: string;
}

const {
  routeName = '',
  cards = [],
} = defineProps<{
  routeName?: string,
  cards: Card[],
}>();

const cardClass = (item: Card) => {
  let classname = '--has';
  if (item.title) classname += '-title';
  if (item.text) classname += '-text';
  if (item.ico) classname += '-ico';
  if (item.imgSm || item.imgLg) classname += '-img';
  return classname;
}

let currentCards = cards;

if (routeName === 'zao_university' && cards[1]) {
  const updatedCard = { 
    ...cards[1], 
    text: 'Учитесь онлайн и&nbsp;приезжайте в&nbsp;вуз всего 2&nbsp;раза в&nbsp;год для&nbsp;сдачи сессии' 
  };

  currentCards = [
    cards[0],
    updatedCard,
    ...cards.slice(2)
  ];
}

</script>

<template>
  <MSectionNewResponsive class="s-training">
    <div class="s-training__grid">
      <div
        v-for="(item, index) in currentCards"
        :key="item.title ?? index"
        class="s-training__item"
        :class="[item.classname, cardClass(item)]"
      >
        <div class="s-training__item-inner">
          <div
            v-if="item.title"
            v-html="item.title"
            class="s-training__item-title a-font_h4"
          />
          <div
            v-if="item.text"
            v-html="item.text"
            class="s-training__item-text a-font_h6"
          />
          <AImg
            v-if="item.ico"
            :src="item.ico"
            :alt="item.title ?? ''"
            class="s-training__item-ico"
          />
        </div>
        <picture v-if="item.imgSm || item.imgLg">
          <source
            v-if="item.imgLg"
            :srcset="item.imgLg"
            media="(min-width: 1200px)"
          >
          <AImg
            v-if="item.imgSm || item.imgLg"
            :src="item.imgSm || item.imgLg"
            :alt="item.title ?? ''"
          />
        </picture>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './STraining.scss';
</style>
