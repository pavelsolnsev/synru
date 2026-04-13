<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import DocumentImage from '~/assets/images/diplomas/thumb.webp';
import DarkDocumentImage from '~/assets/images/diplomas/thumb-dark.svg?url';

interface Props {
  documents?: Documents[];
  dark?: boolean;
}

interface Documents {
  title?: string;
  text?: string;
  image?: string;
  link: string;
  isDocs?: boolean;
}

const {
  documents = [],
  dark = false,
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

const { openModal } = useModalStore();

function openPopup(link: string) {
  if (!link) return;
  openModal('MModalInline', {
    src: link,
  });
}
</script>

<template>
  <div
    v-if="documents.length"
    class="s-license__slider swiper"
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="{ title, text, isDocs, link } in documents"
        :key="title || text"
      >
        <NuxtLink
          class="s-license__slide"
          target="_blank"
          :to="isDocs ? link : undefined"
          @click="!isDocs && openPopup(link)"
        >
          <div class="s-license__slide-left">
            <h5
              class="s-license__slide-title a-font_h5"
              v-html="title"
            />
            <div
              class="s-license__slide-text a-font_xl-m"
              v-html="text"
            />
          </div>
          <div class="s-license__slide-img">
            <AImg
              :src="dark ? DarkDocumentImage : DocumentImage"
              alt="document"
              loading="lazy"
              decoding="async"
            />
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MDocumentsSlider.scss';
</style>
