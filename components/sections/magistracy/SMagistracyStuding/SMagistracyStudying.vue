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
  entity?: Entity & {
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

const standardImages = [
  { image: '/img/s-what-will/s-what-will-1.webp' },
  { image: '/img/s-what-will/s-what-will-3.webp' },
  { image: '/img/s-what-will/s-what-will-5.webp' },
  { image: '/img/s-what-will/s-what-will-6.webp' },
  { image: '/img/s-what-will/s-what-will-9.webp' },
];

const customFieldsTitle = props?.entity?.customFields?.['seo-what-will']?.at(0)?.title;
const customFieldsImages = props?.entity?.customFields?.['seo-what-will']?.at(0)?.images;

const title = customFieldsTitle || (props.title || 'Как проходит обучение');

const images = customFieldsImages && customFieldsImages.length
  ? customFieldsImages
  : (props.images || standardImages);
</script>

<template>
  <MSection
    class="s-magistracy-studying"
    :title
  >
    <div class="s-magistracy-studying__content">
      <div class="s-magistracy-studying__item">
        <AImg
          :src="images?.[0]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-magistracy-studying__item white">
        <p class="a-font_h4">Удалённый формат</p>
        <p class="a-font_l-m mobile-no-br">Сессии и защита диплома — онлайн из любой точки мира.</p>
        <div class="s-magistracy-studying__svg-wrap">
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
      <div class="s-magistracy-studying__item">
        <AImg
          :src="images?.[1]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-magistracy-studying__item">
        <p class="a-font_h4">Гарантия<br>трудоустройства</p>
        <p class="a-font_l-m white text">
          Уверенность в&nbsp;качестве нашего<br> образования мы
          подтверждаем<br>юридически&nbsp;— гарантия трудоустройства зафиксирована в&nbsp;договоре
        </p>
        <AImg
          class="s-magistracy-studying__gerb"
          src="/img/s-what-will/pack.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-magistracy-studying__item">
        <AImg
          :src="images?.[2]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-magistracy-studying__item">
        <AImg
          :src="images?.[3]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-magistracy-studying__item">
        <AImg
          :src="images?.[4]?.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="s-magistracy-studying__item special">
        <p class="s-magistracy-studying__spec-title">
          Учебное заведение использует собственную платформу
          для&nbsp;<span class="nobr">онлайн-обучения</span> с&nbsp;лекциями, вебинарами, виртуальными лабораториями
          и&nbsp;круглосуточным доступом к&nbsp;учебным материалам
        </p>
        <picture>
          <source
            class="s-magistracy-studying__bg"
            srcset="/img/s-what-will/s-what-will-8.webp"
            media="(min-width: 768px)"
          >
          <AImg
            class="s-magistracy-studying__bg"
            src="/img/s-what-will/s-what-will-10.webp"
          />
        </picture>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SMagistracyStudying.scss';
</style>
