<script setup lang="ts">
import type { CourseEntity } from '~/types';
import { defaultPartnersLogos } from './partners-data';

interface Props {
  title?: string;
  description?: string;
  partners?: Partner[];
  entity?: CourseEntity;
}

interface Partner {
  image: string;
}

const {
  title = '',
  description = '',
  partners = [],
  entity = null,
} = defineProps<Props>();

const partners_logos = entity?.customFields?.partners ?? [];

const {
  external_id: externalId = null,
  price = 0,
  currency = '',
} = entity?.properties || {};

const hasPriceInfo = externalId && price && currency;

const elements = partners_logos || partners;


const slides = elements.length < 10
  ? duplicatePartnersToMinimumCount()
  : elements;

const part = Math.ceil(slides.length / 2);

function duplicatePartnersToMinimumCount() {
  if (!elements.length) return defaultPartnersLogos;

  const newSlides = [...elements];
  for (let k = 0; k < (Math.floor(10 / elements.length)); k++) {
    for (let i = 0; i < elements.length; i++) {
      newSlides.push(elements[i]);
    }
  }

  return newSlides;
}
</script>

<template>
  <MSection
    v-if="slides.length && !hasPriceInfo"
    class="s-partners"
    :title
  >
    <div
      v-if="description"
      class="s-partners__description a-font_m"
      v-html="description"
    />
    <div class="s-partners__sliders">
      <div
        class="s-partners__slider"
        :style="`--slide-count:${slides.slice(0, part).length}`"
      >
        <div
          v-for="{ image }, idx in slides.slice(0, part)"
          :key="image"
          class="s-partners__item"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>

      <div
        class="s-partners__slider"
        :style="`--slide-count:${slides.slice(part).length}`"
      >
        <div
          v-for="{ image }, idx in slides.slice(part)"
          :key="image"
          class="s-partners__item --toRight"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :alt="image"
            :src="image"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPartners.scss';
</style>
