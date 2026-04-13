<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { BusinessProgramEntity } from '~/types';
import DefaultBgImageSm from '~/assets/images/program/intro/intro-sm.webp';
import DefaultBgImageMd from '~/assets/images/program/intro/intro-md.webp';
import DefaultBgImageLg from '~/assets/images/program/intro/intro-lg.webp';

interface Props {
  entity: BusinessProgramEntity;
  routeName: string;
}

const {
  entity,
  routeName,
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const {
  main_immediate_desktop,
  main_immediate_tablet,
  main_immediate_mobile,
} = entity.properties.images;

const imageLg = main_immediate_desktop ?? DefaultBgImageLg;
const imageMd = main_immediate_tablet || main_immediate_desktop || DefaultBgImageMd;
const imageSm = main_immediate_mobile || main_immediate_desktop || DefaultBgImageSm;

const {
  's-program-main': programMain = {},
} = mapBusinessProgramBlocks(entity.properties.blocks);

const programMainData = Array.isArray(programMain) ? {} : programMain;

const {
  time = '',
  subtype = '',
} = programMainData;

const format = entity.properties.attributes.format;

const trainingForms = Array.isArray(format)
  ? format.map(capitalizeFirstLetter)
  : [capitalizeFirstLetter(format)];

const triggers = [
  {
    title: 'Дата старта',
    text: subtype,
  },
  {
    title: 'Время',
    text: time,
  },
  {
    title: 'Форма обучения',
    tags: trainingForms,
  },
].filter((item) => Boolean(item.text || item.tags?.length));

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Подать заявку',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'grcampaign=e_mail_chain_vpo'},
      {param: 'form=bs-program'},
    ],
  });
}
</script>

<template>
  <MSection
    class="s-intro"
  >
    <div class="s-intro__desc">
      <div class="s-intro__desc-inner">
        <MBreadcrumbs :breadcrumbs />
        <h1
          class="a-font_h3 s-intro__title"
          v-html="entity?.name"
        />
        <AButton @click="openForm()">
          <span>Оставить заявку</span>
        </AButton>
      </div>
      <div class="s-intro__promo d-md-none">
        <picture class="s-intro__image">
          <AImg
            decoding="async"
            :src="imageSm"
            :alt="entity?.name"
          />
        </picture>
      </div>
    </div>

    <div class="s-intro__promo d-none d-md-block">
      <picture class="s-intro__image">
        <source
          media="(min-width: 1200px)"
          :srcset="imageLg"
        >
        <AImg
          decoding="async"
          :src="imageMd"
          :alt="entity?.name"
        />
      </picture>
    </div>

    <div class="s-intro__slider">
      <swiper :allow-touch-move="false">
        <swiper-slide
          v-for="slide in triggers"
          :key="slide.text"
          class="s-intro__info-item"
        >
          <div
            class="s-intro__info-item-title a-font_m-m"
            v-html="slide.title"
          />
          <div
            v-if="slide.text"
            class="s-intro__info-item-text a-font_m-m"
            v-html="slide.text"
          />
          <div
            v-if="slide.tags?.length"
            class="s-intro__info-item-tags"
          >
            <ATag
              v-for="text in slide.tags"
              :key="text"
              :text
              variant="black"
              font="a-font_xs-m"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SBusinessProgramIntro.scss';
</style>
