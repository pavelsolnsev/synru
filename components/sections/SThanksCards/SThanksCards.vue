<script lang="ts" setup>
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

const { width: windowWidth } = useWindowSize();
const isDesktop = ref(windowWidth.value >= 1200);
const titleClass = ref(isDesktop.value ? 'a-font_banner' : 'a-font_slider');

watch(windowWidth, () => {
  isDesktop.value = windowWidth.value >= 1200;
  titleClass.value = isDesktop.value ? 'a-font_banner' : 'a-font_slider';
});


const cardsList = [{
  icon: 'simple-catalog-fill',
  text: 'Точная стоимость обучения',
  imgSm: synergyApi('uploads/content/s-thanks-banner/info-1-sm.webp'),
  imgLg: synergyApi('uploads/content/s-thanks-banner/info-1-lg.webp'),
}, {
  icon: 'simple-bookmark',
  text: 'Минимальные проходные баллы',
  imgSm: synergyApi('uploads/content/s-thanks-banner/info-2-sm.webp'),
  imgLg: synergyApi('uploads/content/s-thanks-banner/info-2-lg.webp'),
}, {
  icon: 'simple-emblem',
  text: 'Количество бюджетных мест',
  imgSm: synergyApi('uploads/content/s-thanks-banner/info-3-sm.webp'),
  imgLg: synergyApi('uploads/content/s-thanks-banner/info-3-lg.webp'),
}, {
  icon: 'simple-precent',
  text: 'Расчёт льготного кредита под&nbsp;3%',
  imgSm: synergyApi('uploads/content/s-thanks-banner/info-4-sm.webp'),
  imgLg: synergyApi('uploads/content/s-thanks-banner/info-4-lg.webp'),
}, {
  icon: 'simple-chats-square',
  text: 'Чат с&nbsp;куратором 24/7',
  imgSm: synergyApi('uploads/content/s-thanks-banner/info-5-sm.webp'),
  imgLg: synergyApi('uploads/content/s-thanks-banner/info-5-lg.webp'),
}, {
  icon: 'simple-doc',
  text: 'Заявление на&nbsp;поступление',
  imgSm: synergyApi('uploads/content/s-thanks-banner/info-6-sm.webp'),
  imgLg: synergyApi('uploads/content/s-thanks-banner/info-6-lg.webp'),
}];
</script>

<template>
  <div class="s-thanks-cards">
    <div
      class="s-thanks-cards__info"
      :class="titleClass"
    >
      Вся важная информация
      <NuxtLink
        target="_blank"
        :to="ROUTES.LK_REGISTRATION"
      >
        в&nbsp;личном кабинете
        <AImg
          :src="synergyApi('uploads/content/s-thanks-banner/call.webp')"
          decoding="async"
          alt=""
        />
        абитуриента
      </NuxtLink> демо-вуза
    </div>


    <div class="s-thanks-cards__list">
      <div
        v-for="item in cardsList"
        :key="item.text"
        class="s-thanks-cards__item"
      >
        <picture>
          <source
            media="(min-width: 1200px)"
            :srcset="item.imgLg"
          >
          <AImg
            :src="item.imgSm"
            decoding="async"
            alt=""
          />
        </picture>
        <h4
          class="s-thanks-cards__item-title a-font_h4"
          v-html="item.text"
        />
        <ASvgMono :name="item.icon" />
        <AButton
          v-if="isDesktop"
          size="lg"
          bg-color="red"
          class="a-font_l-m"
          target="_blank"
          :to="ROUTES.LK_REGISTRATION"
          :external="true"
        >
          Зарегистрироваться
        </AButton>
      </div>
    </div>

    <div
      class="s-thanks-cards__info"
      :class="titleClass"
    >
      Откройте ещё больше функций личного кабинета абитуриента!
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './SThanksCards.scss';
</style>
