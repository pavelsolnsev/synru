<script setup lang="ts">
import type { Fonts } from '~/types';

interface Entity {
  name?: string;
  short_name?: string;
}

interface Props {
  title?: string;
  text?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
  items?: Item[];
  entity: Entity & {
    customFields?: {
      'seo-level-info': [
        {
          title: string,
          titleClass: string,
          text: null,
          imageLg: string,
          imageMd: string,
          image: string,
          items: Item[],
        },
      ],
      [key: string]: unknown;
    };
  }
}

interface Item {
  title?: string;
  text?: string;
  image?: string;
  imageLg?: string;
  imageMd?: string;
  className?: string;
}

const props = defineProps<Props>();

const text = props.entity.customFields?.['seo-level-info']?.at(0)?.text || (props.text || '');
const title = props.entity.customFields?.['seo-level-info']?.at(0)?.title || (props.title || '');
const titleClass = (props.entity.customFields?.['seo-level-info']?.at(0)?.titleClass || 'a-font_h4') as Fonts;
const imageLg = props.entity.customFields?.['seo-level-info']?.at(0)?.imageLg || (props.imageLg || '');
const imageMd = props.entity.customFields?.['seo-level-info']?.at(0)?.imageMd || (props.imageMd || '');
const image = props.entity.customFields?.['seo-level-info']?.at(0)?.image || (props.image || '');
const items = props.entity.customFields?.['seo-level-info']?.at(0)?.items || (props.items || []);
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        text-class="a-font_h6"
        tag-class="a-font_m-m"
        :title-class
        :title
        :text
        :is-responsive-title="true"
      >
        <picture>
          <source
            v-if="imageLg"
            :srcset="imageLg"
            media="(min-width: 1200px)"
          >
          <source
            v-if="imageMd"
            :srcset="imageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="image"
            :alt="title"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </MCardText>
      <div
        v-if="items.length"
        class="s-about__slider"
      >
        <div
          v-for="item in items"
          :key="item.title"
          class="swiper-slide"
        >
          <div
            class="s-about__card"
            :class="item.className"
          >
            <span
              class="s-about__card-title a-font_h5"
              v-html="item.title"
            />
            <span
              class="s-about__card-text a-font_s-m"
              v-html="item.text"
            />
            <picture class="s-about__card-img">
              <source
                v-if="item.imageLg"
                :srcset="item.imageLg"
                media="(min-width: 1200px)"
              >
              <source
                v-if="item.imageMd"
                :srcset="item.imageMd"
                media="(min-width: 768px)"
              >
              <AImg
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                decoding="async"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSeoLevelInfo.scss';
</style>
