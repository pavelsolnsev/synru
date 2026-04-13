<script setup lang="ts">
import BgImageLg from '~/assets/images/s-result-doc/s-result-doc-lg.webp';
import BgImageMd from '~/assets/images/s-result-doc/s-result-doc-md.webp';
import BgImageSm from '~/assets/images/s-result-doc/s-result-doc-sm.webp';

interface Props {
  title?: string;
  description?: string;
  docImg?: string;
  docTitle?: string;
  docLink?: string;
}

const {
  title,
  description,
  docImg,
  docTitle,
  docLink,
} = defineProps<Props>();

const { openModal } = useModalStore();

function openDoc(src: string) {
  if (!src) return;
  openModal('MModalInline', {
    src: src
  });
}
</script>

<template>
  <MSection
    class="s-result-doc"
  >
    <div class="s-result-doc__wrapper">
      <div class="s-result-doc__text">
        <picture
          class="s-result-doc__text__bg"
        >
          <source
            :srcset="BgImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="BgImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            alt="doc"
            decoding="async"
            loading="lazy"
            :src="BgImageSm"
          />
        </picture>

        <h3
          class="s-result-doc__text__title a-font_h3"
          v-html="title"
        />

        <h5
          class="s-result-doc__text__description a-font_h5"
          v-html="description"
        />
      </div>

      <div
        class="s-result-doc__item"
        @click="openDoc(docLink ?? '')"
      >
        <ASvgMono name="simple-plus" />

        <AImg
          class="s-result-doc__item__image"
          alt="doc"
          :src="docImg"
        />

        <div
          class="s-result-doc__item__text a-font_l-m"
          v-html="docTitle"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SResultDoc.scss';
</style>
