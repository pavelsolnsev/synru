<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity, routeName = '' } = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const data = {
  ...(entity.customFields.mba_program_hero?.length ? entity.customFields.mba_program_hero[0] : {}),
  text: entity.annotation,
};

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

const { openModal } = useModalStore();

function openFormFirst() {
  openModal('MModalForm', {
    title: 'Заполните форму, мы перезвоним в&nbsp;ближайшее время и&nbsp;ответим на&nbsp;все вопросы',
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [{param: 'form=mba_pevyi_ekran'}],
    routeName: routeName,
  });
}

function openFormSecond() {
  openModal('MModalForm', {
    title: 'Скачайте презентацию программы',
    subtitle: 'Презентацию вы&nbsp;получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram',
    btn: 'Скачать',
    formName: true,
    formPhone: true,
    actionParams: [{param: 'form=mba_pevyi_ekran'}],
    routeName: routeName,
  });
}
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-hero"
  >
    <div class="s-mba-hero__inner">
      <MBreadcrumbs
        v-if="breadcrumbs.length"
        :breadcrumbs
      />

      <picture>
        <source
          v-if="data.imageLG"
          :srcset="data.imageLG"
          media="(min-width: 1200px)"
        >
        <source
          v-if="data.imageMD"
          :srcset="data.imageMD"
          media="(min-width: 768px)"
        >
        <AImg
          :src="data.imageSM"
          :alt="data.title"
          decoding="async"
        />
      </picture>
      <div class="s-mba-hero__content">
        <h1
          class="s-mba-hero__title a-font_banner"
          v-html="data.title"
        />
        <ul
          v-if="data.tags && data.tags.length"
          class="s-mba-hero__tags a-font_xl-m"
          :class="routeName === 'magistracy_new' ? 'column-revers' : undefined"
        >
          <li
            v-for="tag in data.tags"
            :key="tag.tag"
            v-html="tag.tag"
          />
        </ul>
        <p
          class="a-font_h6 s-mba-hero__text"
          v-html="data.text"
        />
        <div class="s-mba-hero__bottom">
          <AButton @click="openFormFirst()">
            Хочу консультацию
          </AButton>
          <AButton
            bg-color="white"
            @click="openFormSecond()"
          >
            Скачать презентацию
          </AButton>
        </div>
      </div>
    </div>

    <MMbaHeroCards
        v-if="data.cards && data.cards.length"
        :cards="data.cards"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaHero';
</style>
