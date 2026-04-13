<script setup lang='ts'>
import type { SectionConditionalGroup } from '~/types';

const slides1 = [{
  img: '/img/SInfoDod/image.webp',
}, {
  img: '/img/SInfoDod/image-1.webp',
}, {
  img: '/img/SInfoDod/img.webp',
}, {
  img: '/img/SInfoDod/image-2.webp',
}, {
  img: '/img/SInfoDod/image-3.webp',
}];

const slides2 = [{
  img: '/img/SInfoDod/image-4.webp',
}, {
  img: '/img/SInfoDod/image-5.webp',
}, {
  img: '/img/SInfoDod/image-6.webp',
}, {
  img: '/img/SInfoDod/image-7.webp',
}, {
  img: '/img/SInfoDod/image-8.webp',
}];

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: {
    id?: number;
  };
}

const {
  conditionalGroup = [],
  entity = {},
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-info-dod"
  >
    <h2 class="a-font_h3 s-info-dod__title">Совмещайте учёбу с&nbsp;активной&nbsp;студенческой жизнью</h2>
    <div class="s-info-dod__gallery">
      <div
        class="s-info-dod__gallery-item"
        :style="`--slide-count:${slides1.length}`"
      >
        <AImg
          v-for="img, idx in slides1"
          :key="img.img"
          :src="img.img"
          :style="`--n:${idx}`"
          decoding="async"
          loading="lazy"
        />
      </div>
      <div
        class="s-info-dod__gallery-item"
        :style="`--slide-count:${slides2.length}`"
      >
        <AImg
          v-for="img, idx in slides2"
          :key="img.img"
          :src="img.img"
          :style="`--n:${idx}`"
          class="--toRight"
          decoding="async"
          loading="lazy"
        />
      </div>
    </div>
    <div class="a-font_h6  s-info-dod__text">
      <p>
        Вы можете посещать <span class="nobr">бизнес-форумы,</span> хакатоны, спортивные секции, участвовать
        в&nbsp;волонтёрских проектах и&nbsp;КВН.
      </p>
      <p>
        Мы проводим более 50 мероприятий в&nbsp;год, направленных на&nbsp;ваше всестороннее развитие и&nbsp;нетворкиг.
      </p>
    </div>
    <picture>
      <source
        srcset="/img/SInfoDod/bg_lg.webp"
        media="(min-width: 1200px)"
      >
      <source
        srcset="/img/SInfoDod/bg_md.webp"
        media="(min-width: 768px)"
      >
      <AImg
        src="/img/SInfoDod/bg_sm.webp"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </picture>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SInfoDod.scss';
</style>
