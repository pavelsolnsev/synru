<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';
import DefaultBgImageSm from '~/assets/images/program/intro/intro-sm.webp';
import DefaultBgImageMd from '~/assets/images/program/intro/intro-md.webp';
import DefaultBgImageLg from '~/assets/images/program/intro/intro-lg.webp';

interface Props {
  routeName: string;
  entity: MbaProgramEntity;
}

const {
  entity,
  routeName,
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const imageLg = entity.image_url || DefaultBgImageLg;
const imageMd = entity.image_url || DefaultBgImageMd;
const imageSm = entity.image_url || DefaultBgImageSm;

const dates = entity.customFields.mba_programs_dates_start[0];

const { data: forms } = await useFetch(`/api/mba/${entity.id}/forms`, {
  transform: (data) => {
    return Array.isArray(data?.data) && data.data.length > 0 ? data?.data.map((form) => form.attributes.short_name) : [];
  },
  deep: false,
  watch: false,
  key: 'mba-forms' + entity.id,
});

const triggers = [
  {
    title: 'Дата старта',
    text: dates.date_from ? formatDate(dates.date_from) : '',
  },
  {
    title: 'Время',
    text: dates.time_from?.endsWith(':00:00') ? dates.time_from.slice(0, -3) : dates.time_from,
  },
  {
    title: 'Форма обучения',
    tags: forms.value,
  },
].filter((item) => Boolean(item.text || item.tags?.length));

const { openModal } = useModalStore();

function openIntroModal() {
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

function formatDate (dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  return `${date.getDate()} ${months[date.getMonth()]}`;
};

useSeoMeta({
  ogImage: imageSm,
});
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
        <AButton @click="openIntroModal()">
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
          :key="slide.title"
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
@import './SMbaProgramIntro.scss';
</style>
