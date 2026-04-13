<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useIntersectionObserver } from '@vueuse/core';
import type { SectionConditionalGroup } from '~/types';
import ASvgMono from '~/components/atoms/ASvgMono/ASvgMono.vue';

interface Props {
  title?: string;
  text?: string;
  bgIcon?: boolean;
  items?: {
    title: string;
    text: string;
  }[];
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number, url: string }
}

const {
  title,
  text,
  bgIcon = false,
  items,
  conditionalGroup = [],
  entity,
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
const isChildDirection = entity?.url.includes('detiam');

const defaultsData = {
  adult: {
    title: 'Учитесь на&nbsp;современной образовательной платформе',
    text: 'Работает на всех устройствах',
    items: [{
      title: 'Удобство',
      text: 'Можно учиться в&nbsp;любом месте и&nbsp;в&nbsp;любое время, нужен только интернет',
    }, {
      title: 'Организация',
      text: 'Структурированные видеоуроки, задания и&nbsp;тесты для&nbsp;продуктивного обучения',
    }, {
      title: 'Практичность',
      text: 'Материал ориентирован на&nbsp;использование в&nbsp;реальных ситуациях и&nbsp;задачах',
    }],
  },
  child: {
    title: 'Обучение на&nbsp;современной образовательной платформе',
    text: 'Наша платформа работает на&nbsp;всех устройствах и&nbsp;даёт круглосуточный доступ к&nbsp;учебным материалам',
    items: [{
      title: 'Доступность',
      text: 'Можно учиться в&nbsp;любом месте и&nbsp;в&nbsp;удобное время',
    }, {
      title: 'Организация учебного материала',
      text: 'Программа разделена на&nbsp;модули и&nbsp;темы, в&nbsp;каждом разделе&nbsp;— <span class="nobr">онлайн-занятия,</span> вебинары и&nbsp;задания для&nbsp;продуктивного обучения',
    }, {
      title: 'Методологическая проработка',
      text: '70% программы обучения&nbsp;— практика: такой подход удерживает внимание детей, помогает быстрее развивать навыки и&nbsp;нарабатывать&nbsp;опыт',
    }],
  },
};

const data = isChildDirection ? defaultsData.child : defaultsData.adult;

const dataTitle = title ?? data.title;
const dataText = text ?? data.text;
const dataItems = items?.length ? items : data.items;

const {
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
});

const video = useTemplateRef<HTMLVideoElement>('video');
const isVisible = shallowRef(false);

useIntersectionObserver(
  video,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true;
    }
  },
  {
    threshold: 0.25,
    rootMargin: '200px',
  },
);
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-learn-platform"
  >
    <div class="s-learn-platform__text">
      <div
        v-if="bgIcon"
        class="s-learn-platform__bg-icon"
      >
        <ASvgMono name="simple-hat4" />
      </div>
      <h2
        class="a-font_h3"
        v-html="dataTitle"
      />
      <div class="s-learn-platform__devices">
        <ASvgMono name="simple-mobile" />
        <ASvgMono name="simple-desktop" />
        <span
          class="a-font_h6"
          v-html="dataText"
        />
      </div>
    </div>
    <div
      ref="video"
      class="s-learn-platform__image"
    >
      <video
        v-if="isVisible"
        autoplay
        loop
        muted
        poster="/img/courses/platform.webp"
      >
        <source
          :src="isVisible ? '/img/courses/lms-video.mp4' : ''"
          type="video/mp4"
        >
      </video>
    </div>
    <div class="s-learn-platform__swiper">
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="(item, idx) in dataItems"
          :key="item.title"
          class="s-learn-platform__slide"
        >
          <ANum
            classes="a-font_xl-m a-num--md --num"
            :num="formatNumberWithLeadingZero(idx + 1)"
          />
          <p
            class="a-font_h5"
            v-html="item.title"
          />
          <p
            class="a-font_xl-m s-learn-platform__slide-desc"
            v-html="item.text"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SLearnPlatform.scss';
</style>
