<script setup lang="ts">
import { faqs } from './SFaqData';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  questionClass?: Fonts;
  answerClass?: Fonts;
  items?: Item[]
}

interface Item {
  name: string;
  faqItems: Array<[FaqItem, FaqItem]>;
}

interface FaqItem {
  name: 'answer' | 'question';
  value: string;
}

const {
  title = 'Часто задаваемые вопросы',
  answerClass = 'a-font_l-m',
  questionClass = 'a-font_h6',
  items = [],
} = defineProps<Props>();

const {
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});


let mapFaqItems = [];
if( items.length ) {
  mapFaqItems = items.map((faqItem, faqIndex) => {
    return {
      name: faqItem.name,
      items: faqItem.faqItems.map(([answer, question], itemIndex) => {
        return {
          title: { text: question.name === 'question' ? question.value : answer.value, className: questionClass },
          content: { text: answer.name === 'answer' ? answer.value : question.value, className: answerClass },
          icon: 'plus',
          isOpen: itemIndex === 0 ? true : false,
          itemKey: `${faqIndex}${itemIndex},`,
        };
      }),
    };
  });
} else {
  mapFaqItems = faqs.map((faqItem, faqIndex) => {
    return {
      name: faqItem.name,
      items: faqItem.items.map((item, idx) => {
        return {
          title: { text: item.question, className: questionClass },
          content: { text: item.answer, className: answerClass },
          icon: 'plus',
          isOpen: idx === 0 ? true : false,
          itemKey: `${faqIndex}${idx},`,
        };
      }),
    };
  });
}


const activeTab = ref(0);
</script>

<template>
  <MSectionNewResponsive
    v-if="mapFaqItems.length"
    class="s-faq m-tabs-js"
    :title
  >
    <div class="s-faq__nav sticky">
      <swiper v-bind="swiperConfig">
        <swiper-slide
          v-for="item,index in mapFaqItems"
          :key="item.name"
        >
          <MFilterTab
            :title="item.name"
            :active="activeTab === index"
            @click.stop="activeTab = index"
          />
        </swiper-slide>
      </swiper>
    </div>

    <div
      itemscope
      itemtype="https://schema.org/FAQPage"
      class="s-faq__tabs"
    >
      <div
        v-for="item, index in mapFaqItems"
        :key="item.name"
        class="s-faq__tab"
        :class="{'_is-active': activeTab === index }"
      >
        <MAccordion
          :items="item.items"
          schema="faq"
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SFaq.scss';
</style>
