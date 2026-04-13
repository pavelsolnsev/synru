<script setup lang='ts'>
import type { SectionConditionalGroup } from '~/types';

interface Entity {
  name?: string;
  short_name?: string;
}

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  title?: string;
  images?: { image: string }[];
  entity: Entity & {
    customFields?: {
      'seo-what-will': Array<{
        title: string;
        images: Array<{ image: string }>;
      }>;
    }
    id?: number;
  };
}

const props = defineProps<Props>();

const customFieldsTitle = props.entity?.customFields?.['seo-what-will']?.at(0)?.title;
const customFieldsImages = props.entity?.customFields?.['seo-what-will']?.at(0)?.images;

const title = customFieldsTitle || (props.title || 'Что будет в&nbsp;дистанционном колледже?');

const images = customFieldsImages && customFieldsImages.length
  ? customFieldsImages
  : (props.images || [{ image: '/img/s-what-will/s-what-will-1.webp' }, { image: '/img/s-what-will/s-what-will-3.webp' }, { image: '/img/s-what-will/s-what-will-5.webp' }, { image: '/img/s-what-will/s-what-will-6.webp' }, { image: '/img/s-what-will/s-what-will-7.webp' }]);

const showSection = needRenderSection({ conditionalGroup: props.conditionalGroup || [], data: { entityId: props.entity?.id } });
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-what-will"
    :title="title"
  >
    <div class="s-what-will__content">
      <div class="s-what-will__item">
        <AImg
          :src="images?.[0]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-what-will__item white">
        <p class="a-font_banner">120%</p>
        <p class="a-font_l-m">Практико-ориентированная подготовка</p>
        <AImg
          class="s-what-will__icon"
          src="/img/s-what-will/icon.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div class="s-what-will__svg-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 394 320"
          >
            <path
              stroke="#fff"
              stroke-dasharray="4 4"
              stroke-width="2"
              d="M131 458C-70 289-20 69 159 198S491 6 491 6m235 171C461 279 491 6 491 6m0 0c20-25 37-57 22-61-11-3-24 19-22 61Z"
            />
          </svg>
        </div>
      </div>
      <div class="s-what-will__item">
        <AImg
          :src="images?.[1]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-what-will__item">
        <p class="a-font_h4">Идёт приём документов на&nbsp;2025/26 учебный&nbsp;год</p>
        <p class="a-font_l-m white text">Практико-ориентированная подготовка</p>
        <AImg
          class="s-what-will__gerb"
          src="/img/s-what-will/gerb.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-what-will__item">
        <AImg
          :src="images?.[2]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-what-will__item">
        <AImg
          :src="images?.[3]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-what-will__item">
        <AImg
          :src="images?.[4]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-what-will__item">
        <p class="a-font_h4 title">Программы построены от&nbsp;запросов работодателей</p>
        <p class="a-font_l-m text">Практико-ориентированная подготовка</p>
        <AImg
          class="s-what-will__bg"
          src="/img/s-what-will/s-what-will-8.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SWhatWill.scss';
</style>
