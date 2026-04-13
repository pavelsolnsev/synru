<script setup lang="ts">
import PlaceholderImage from '~/assets/images/global/placeholder_card.svg?url';

interface Props {
  video: string;
  image: string;
  title?: string;
  text?: string;
  imageLg?: string;
  imageMd?: string;
  uploadDate?: string;
}

const {
  video,
  image,
  title = '',
  text = '',
  imageLg = '',
  imageMd = '',
  uploadDate = '',
} = defineProps<Props>();

const { openModal } = useModalStore();

function onClickVideo(link: string) {
  if (!link) return;
  openModal('MModalIframe', {
    src: link,
    isVertical: true,
  });
}
</script>

<template>
  <div
    class="m-video-card"
    itemscope
    itemtype="https://schema.org/VideoObject"
    @click.prevent="onClickVideo(video)"
  >
    <link
      itemprop="url"
      :href="video"
    >
    <link
      itemprop="embedUrl"
      :href="video"
    >
    <meta
      itemprop="duration"
      content="PT6M58S"
    >
    <meta
      itemprop="name"
      :content="title || text ? title || text : 'Rutube Video'"
    >
    <meta
      itemprop="thumbnail"
      :content="imageMd || imageLg || image || PlaceholderImage"
    >
    <link
      itemprop="thumbnailUrl"
      :href="imageMd || imageLg || image || PlaceholderImage"
    >
    <meta
      itemprop="isFamilyFriendly"
      content="true"
    >
    <meta
      itemprop="uploadDate"
      :content="uploadDate || new Date().toISOString()"
    >
    <meta
      itemprop="description"
      :content="`смотреть видео ${title}`"
    >
    <div class="m-video-card__thumb">
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
          v-if="imageLg || imageMd"
          :src="image"
          :alt="title"
          class="m-video-card__img"
          decoding="async"
          loading="lazy"
          width="290"
          height="480"
        />
        <AImg
          v-else
          :src="image || PlaceholderImage"
          :alt="title"
          :srcset="image"
          :data-srcset="image"
          itemprop="contentUrl"
          class="m-video-card__img lazy"
          decoding="async"
          loading="lazy"
          width="290"
          height="480"
        />
      </picture>

      <APlay class="m-video-card__play" />

      <meta
        itemprop="width"
        content="290"
      >
      <meta
        itemprop="height"
        content="480"
      >
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
  </div>
</template>

<style lang="scss" scoped>
@import './MVideoCardVertical.scss';
</style>