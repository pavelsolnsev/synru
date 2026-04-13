<script setup lang='ts'>
import type { SectionConditionalGroup } from '~/types';

interface Entity {
  name?: string;
  short_name?: string;
}

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  title?: string;
  images: {
    picture: {
      [index: number]: {
        value: string
      }
    }[];
    title: string;
    text: string;
  }[];
  entity?: Entity & {
    customFields?: {
      'how_does_training': Array<{
        title: string;
        images: Array<{
          picture: {
            image: string;
          }[];
          title: string;
          text: string;
        }>;
      }>;
    }
    id?: number;
  };
}

const props = defineProps<Props>();

const customFieldsTitle = props.entity?.customFields?.['how_does_training']?.at(0)?.title;
const customFieldsImages = props.entity?.customFields?.['how_does_training']?.at(0)?.images;

const propsImages = props.images.map((item) => ({
  picture: item.picture.map((p) => ({ image: p[0].value })),
  title: item.title,
  text: item.text,
}));

const title = customFieldsTitle || (props.title || 'Как проходит обучение');

const items = customFieldsImages && customFieldsImages.length
  ? customFieldsImages
  : propsImages;

const showSection = needRenderSection({ conditionalGroup: props.conditionalGroup || [], data: { entityId: props.entity?.id } });
</script>

<template>
  <MSection
    v-if="showSection && items.length > 0"
    class="s-what-will"
    :title="title"
  >
    <div class="s-what-will__content">
      <div
        v-for="(item,idx) in items"
        :key="idx"
        class="s-what-will__item"
      >
        <p
          v-if="item.title"
          class="a-font_h4 title"
          v-html="item.title"
        />
        <p
          v-if="item.text"
          class="a-font_l-m text"
          v-html="item.text"
        />
        <picture>
          <source
            v-if="item.picture[2]"
            :srcset="item.picture[2].image"
            media="(min-width: 1200px)"
          >
          <source
            v-if="item.picture[1]"
            :srcset="item.picture[1].image"
            media="(min-width: 768px)"
          >
          <AImg
            v-if="item.picture[0]"
            :src="item.picture[0].image"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SWhatWillSeo.scss';
</style>
