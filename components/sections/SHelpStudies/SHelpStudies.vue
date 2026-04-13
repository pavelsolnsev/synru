<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SectionConditionalGroup } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number, properties?: { external_id?: string, price?: number, currency?: string } }
}

const {
  conditionalGroup = [],
  entity,
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const {
  external_id: externalId = null,
  price = 0,
  currency = '',
} = entity?.properties || {};

const hasPriceInfo = externalId && price && currency;

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

const items = [{
  title: 'Тьютор',
  desc: 'Ваш личный помощник и&nbsp;эксперт-разработчик',
  text: 'Помогает и&nbsp;проверяет домашние задания, подробнее разбирает темы модуля и&nbsp;всегда готов ответить на&nbsp;любой вопрос.',
  image: '/img/courses/help-1.webp',
},{
  title: 'Чат',
  desc: 'Общение с&nbsp;сокурсниками',
  text: 'В&nbsp;нём можно получить советы по&nbsp;выполнению работы от&nbsp;студентов или&nbsp;тьютора, делиться успехами и&nbsp;просто общаться.',
  image: '/img/courses/help-2.webp',
}];
</script>

<template>
  <MSection
    v-if="showSection && !hasPriceInfo"
    class="s-help-studies"
    title="Помощь в учёбе"
  >
    <Swiper v-bind="swiperConfig">
      <SwiperSlide
        v-for="item in items"
        :key="item.title"
        class="s-help-studies__slide"
      >
        <div class="s-help-studies__slide-head">
          <AImg
            :src="item.image"
            :alt="item.title"
            decoding="async"
            loading="lazy"
          />
          <p
            class="a-font_h4"
            v-html="item.title"
          />
          <p
            class="a-font_m-m s-help-studies__slide-desc"
            v-html="item.desc"
          />
        </div>
        <p
          class="a-font_xl-m s-help-studies__slide-text"
          v-html="item.text"
        />
      </SwiperSlide>
    </Swiper>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SHelpStudies.scss';
</style>
