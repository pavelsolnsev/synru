<script setup lang="ts">
interface Props {
  video: string,
  image: string,
  title?: string,
  text?: string,
  imageLg?: string,
  imageMd?: string,
  videoBg?: string,
  tag?: string,
}

const {
  video,
  image,
  title = '',
  text = '',
  imageLg = '',
  imageMd = '',
  videoBg = '',
  tag = '',
} = defineProps<Props>();

const { openModal } = useModalStore();

function onClickVideo(link: string) {
  if (!link) return;
  openModal('MModalIframe', {
    src: link,
  });
}
</script>

<template>
  <NuxtLink
    :to="video"
    :external="true"
    class="m-video-card"
    @click.prevent="onClickVideo(video)"
  >
    <div class="m-video-card__thumb">
      <picture
        class="m-banner-card__img"
      >
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
          class="m-video-card__img"
          decoding="async"
          loading="lazy"
          width="280"
          height="186"
        />
      </picture>
      <slot name="image" />
      <video
        v-if="videoBg"
        class="m-video-card__img lazy"
        playsinline
        muted
        loop
        preload="none"
        data-autoplay="true"
      >
        <source
          :data-src="videoBg"
          type="video/mp4"
        >
      </video>

      <ATag
        v-if="tag"
        :text="tag"
        variant="white"
        class="a-tag--blur"
      />

      <APlay
        v-if="video"
        class="m-video-card__play"
      />
    </div>

    <div
      v-if="title || text"
      class="m-video-card__desc a-font_m-m"
    >
      <span
        v-if="title"
        class="m-video-card__title"
        v-html="title"
      />
      <span
        v-if="text"
        class="m-video-card__text"
        v-html="text"
      />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@import './MVideoCard.scss';
</style>
