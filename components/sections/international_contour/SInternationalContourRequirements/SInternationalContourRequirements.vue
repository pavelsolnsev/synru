import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const data = {
  title: 'Привезём и&nbsp;оформим иностранный персонал под&nbsp;ваши требования',
  cards: [
    {
      title: 'Соответствие законодательству',
      description: 'Оформляем документы и&nbsp;разрешения, соблюдаем все&nbsp;миграционные и&nbsp;трудовые требования',
    },
    {
      title: 'Полный цикл',
      description: 'Берём на&nbsp;себя все этапы работы: от&nbsp;поиска и&nbsp;проверки кандидатов до&nbsp;организации трансфера и&nbsp;выхода на&nbsp;работу',
    },
    {
      title: 'База сотрудников',
      description: 'Большая международная база кандидатов, готовых приступить к&nbsp;работе',
    },
  ],
  btnCard: {
    title: 'Имеем представительства, партнёров и&nbsp;собственные центры подготовки<br>в&nbsp;70<span class="plus">+</span> странах мира',
    description: 'Знаем все нюансы международного рекрутинга',
  },
  imgLeftLG: synergyApi('uploads/content/podbor/requirements_left_lg.webp'),
  imgLeftSM: synergyApi('uploads/content/podbor/requirements_left_sm.webp'),
  imgRightLG: synergyApi('uploads/content/podbor/requirements_right_lg.webp'),
  imgRightSM: synergyApi('uploads/content/podbor/requirements_right_sm.webp'),
};

const { openModal } = useModalStore();

const modalProps = {
  title: 'Заполните форму, свяжемся с&nbsp;вами в&nbsp;ближайшее время и&nbsp;ответим на&nbsp;все вопросы',
  actionParams: [
    {
      param: 'form=podbor_iz_za_rubezha',
    },
  ],
};
</script>

<template>
  <MSectionNewResponsive class="s-international-contour-requirements">
    <div class="s-international-contour-requirements__body">
      <div class="s-international-contour-requirements__left">
        <h2
          class="s-international-contour-requirements__title a-font_h4"
          v-html="data.title"
        />
        <picture class="s-international-contour-requirements__bg">
          <source
            media="(min-width: 1200px)"
            :srcset="data.imgLeftLG"
          >
          <AImg
            :src="data.imgLeftSM"
            :alt="data.title"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </div>
      <div class="s-international-contour-requirements__right">
        <div class="s-international-contour-requirements__cards">
          <div
            v-for="card in data.cards"
            :key="card.title"
            class="s-international-contour-requirements__card"
          >
            <div class="s-international-contour-requirements__card-top">
              <div class="a-font_slider-text">{{ card.title }}</div>
              <ASvgMono
                name="simple-check3"
                class="s-international-contour-requirements__icon"
              />
            </div>
            <div
              class="s-international-contour-requirements__card-bottom a-font_l-m"
              v-html="card.description "
            />
          </div>
        </div>
        <div class="s-international-contour-requirements__bottom-card">
          <picture class="s-international-contour-requirements__bg">
            <source
              media="(min-width: 1200px)"
              :srcset="data.imgRightLG"
            >
            <AImg
              :src="data.imgRightSM"
              :alt="data.btnCard.title"
              decoding="async"
              loading="lazy"
            />
          </picture>
          <div
            class="s-international-contour-requirements__bottom-card-title a-font_h5"
            v-html="data.btnCard.title"
          />
          <div class="s-international-contour-requirements__wrapper">
            <div class="s-international-contour-requirements__bottom-card-description">
              {{ data.btnCard.description }}
            </div>
            <AButton
              class="s-international-contour-requirements__btn"
              @click="openModal('MModalContourForm', modalProps)"
            >
              Получить консультацию
            </AButton>
          </div>
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SInternationalContourRequirements';
</style>


