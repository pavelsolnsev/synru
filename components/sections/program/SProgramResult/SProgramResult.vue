<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import mapCustomFields from '~/utils/mapCustomFields';
import type { ProgramEntity } from '~/types';
import { useWindowSize } from '@vueuse/core';
import DocImage from '~/assets/images/program/result/doc.svg?url';
import { KEYS } from '~/constants';
import type { ProgramInfoResponse } from '../SProgramIntro/SProgramIntro.vue';

interface Props {
  entity: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const { openModal } = useModalStore();

/**
 * Запрос с кэшированием аналогично SProgramIntro
 */
const query = {
  'include': 'faculty.customFieldValues,level.customFieldValues,forms',
};

const { data: rawData } = await useFetch<ProgramInfoResponse>(`/api/programs/getProgramById/${entity?.id}`, {
  key: `${KEYS.PROGRAM}${entity?.id}${JSON.stringify(query)}`,
  query,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

    return data ? data : undefined;
  },
  deep: false,
  watch: false,
});

const data = transformRes(rawData.value);

function transformRes(res: ProgramInfoResponse | null) {
  let documents = [] as { title: string, link: string }[];

  if (!entity?.properties?.show_section_diploms) return documents;
  if (!res || !res.included.length) return documents;

  res.included.forEach((includedData) => {
    if (includedData.type !== 'levels') return;
    if (!includedData.attributes.custom_field_values) return;

    const { additional_documents = [] }: { additional_documents: { title: string, link: string }[] } = mapCustomFields(includedData.attributes.custom_field_values);

    documents = additional_documents;
  });

  return documents;
}
</script>

<template>
  <MSection
    v-if="data.length"
    class="s-result"
  >
    <div class="s-result__item">
      <h3 class="s-result__item-title a-font_h3">
        Что вы получите в&nbsp;результате обучения
      </h3>
      <p class="s-result__item-subtitle a-font_h5">
        Обучение проходит на&nbsp;основании государственной аккредитации.
      </p>
      <p class="s-result__item-text a-font_l">
        При&nbsp;успешном прохождении итоговой аттестации вы получите диплом государственного образца, подтверждающий
        ваши профессиональные компетенции.
      </p>
    </div>

    <div class="s-result__item">
      <swiper
        class="s-result__slider"
        effect="fade"
        :modules="[Pagination, Navigation, EffectFade]"
        :grab-cursor="true"
        :slides-per-view="1"
        :free-mode="false"
        :fade-effect="{crossFade: true}"
        :space-between="windowWidth / 360 * 12"
        :navigation="{
          nextEl: '.s-result__slider .swiper-button-next',
          prevEl: '.s-result__slider .swiper-button-prev'
        }"
        :pagination="{
          el: '.s-result__slider .swiper-pagination',
          type: 'fraction',
        }"
        :breakpoints=" {
          768: {
            spaceBetween: windowWidth / 768 * 12
          },
          1200: {
            spaceBetween: windowWidth / 1920 * 24
          },
        }"
      >
        <swiper-slide
          v-for="doc, index in data"
          :key="index"
        >
          <p
            class=" a-font_h6"
            v-html="doc.title"
          />
          <div class="s-result__item-image">
            <AImg
              :src="DocImage"
              loading="lazy"
              decoding="async"
            />
          </div>
          <AButtonSecond
            bg-color="transparent"
            @click="openModal('MModalInline', {src: doc.link})"
          >
            <span>Смотреть образец</span>
          </AButtonSecond>
        </swiper-slide>
        <div class="swiper-navigation">
          <div class="swiper-pagination a-font_l" />
          <div class="swiper-button-prev">
            <ASvgMono name="simple-arrow" />
          </div>
          <div class="swiper-button-next">
            <ASvgMono name="simple-arrow" />
          </div>
        </div>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
  @import './SProgramResult.scss';
</style>
