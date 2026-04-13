<script setup lang="ts">
interface Props {
  video: string,
  image?: string,
  title?: string,
  text?: string,
  fancybox?: string | null,
  tag?: string,
}

const {
  video,
  image,
  title = '',
  text = '',
  fancybox = '',
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
  <div class="m-article-video">
    <NuxtLink
      :to="video"
      :external="true"
      class="m-article-video__thumb"
      @click.prevent="onClickVideo(video)"
    >
      <picture>
        <AImg
          :src="image"
          :alt="title"
          decoding="async"
          loading="lazy"
          width="280"
          height="186"
        />
      </picture>
      <ATag
        v-if="tag"
        :text="tag"
        variant="white"
        class="a-tag--blur a-font_xs-m"
      />

      <APlay
        v-if="video"
        class="m-article-video__play"
      />
    </NuxtLink>

    <div
      v-if="title || text"
      class="m-article-video__desc"
    >
      <NuxtLink
        v-if="title"
        :to="video"
        :external="true"
        class="m-article-video__title a-font_h6"
        @click.prevent="onClickVideo(video)"
      >
        <span v-html="title" />
      </NuxtLink>
      <span
        v-if="text"
        class="m-article-video__text a-font_m"
        v-html="text"
      />

      <AShare
        :link="video"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MArticleVideo.scss';
</style>
