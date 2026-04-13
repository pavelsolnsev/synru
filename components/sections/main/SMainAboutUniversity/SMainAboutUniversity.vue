<script setup lang="ts">
import Logo from '~/assets/images/main/s_main_about_university/logo.svg?url';
import { Swiper } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import { ROUTES } from '~/constants';

interface Props {
  items?: [FacultiesQuantityItem, TextItem];
}

interface FacultiesQuantityItem {
  quantity: Array<{ count: number }>
  label: string;
}

interface TextItem {
  text: string;
  link: string;
}

const { items = [] } = defineProps<Props>();

const slides = items
  ? items.reduce((acc, item) => {
      if (isFacultiesQuantityItem(item)) {
        const facultiesCount = declensionOfNumber(item.quantity[0].count, item.label.split('|'), true);
        const text = `${facultiesCount}`;
        const link = ROUTES.FACULTIES;

        acc.push({ text, link });
        return acc;
      }
      const text = item.text;
      const link = item.link;

      acc.push({ text, link });
      return acc;
    },[] as { text: string, link: string }[])
  : [];

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

function isFacultiesQuantityItem(item: FacultiesQuantityItem | TextItem): item is FacultiesQuantityItem {
  return (item as FacultiesQuantityItem).quantity !== undefined;
}
</script>

<template>
  <MSection
    class="s-about-university"
  >
    <h3 class="s-about-university__title l-section__title a-font_h3">
      <AImg
        :src="Logo"
        alt="synergy"
        class="s-about-university__title-logo"
      />
      Демо-платформа для&nbsp;всех: школа, колледж, университет, <span style="white-space: nowrap;">бизнес-образование</span> и&nbsp;курсы.
      Получите востребованную специальность с&nbsp;гарантией трудоустройства.
    </h3>
    <div
      v-if="slides.length"
      class="s-about-university__cards"
    >
      <swiper v-bind="swiperConfig">
        <template #wrapper-start>
          <NuxtLink
            v-for="item in slides"
            :key="item.text"
            class="swiper-slide s-about-university__card"
            :to="item.link"
          >
            <span
              class="s-about-university__card-title a-font_xl-m"
              v-html="item.text"
            />
            <span class="s-about-university__card-num a-font_xs-m">
              <ASvgMono name="arrow_forward" />
            </span>
          </NuxtLink>
        </template>
      </swiper>
    </div>
    <MModalForm
      id="s-main-about-university__form"
      form-name
      form-phone
      :action-params="[
        {param: 'grcampaign=e_mail_chain_vpo'},
        {param: 'form=main_about'},
        {param: 'target_name=ab_main'},
      ]"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMainAboutUniversity.scss';
</style>
