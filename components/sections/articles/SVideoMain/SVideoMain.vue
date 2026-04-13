import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const data = {
  title: 'Видеобиблиотека демо-вуза',
  description: 'Ваш личный гид по&nbsp;карьере, образованию и&nbsp;саморазвитию <br>от&nbsp;экспертов в&nbsp;своей области',
  image: {
    sm: synergyApi('uploads/content/s-video-main/sm.webp'),
    md: synergyApi('uploads/content/s-video-main/md.webp'),
    lg: synergyApi('uploads/content/s-video-main/lg.webp'),
  },
  tags: [
    {
      title: '1000+ видео',
      ico: synergyApi('uploads/content/s-video-main/tag-1.webp'),
    },
    {
      title: '200+ спикеров',
      ico: synergyApi('uploads/content/s-video-main/tag-2.webp'),
    },
  ],
};
</script>

<template>
  <div class="l-section s-video-main">
    <div class="l-section__inner">
      <h1
        class="s-video-main__title a-font_h2"
        v-html="data.title"
      />
      <div
        class="a-font_h6"
        v-html="data.description"
      />
      <div class="s-video-main__img">
        <picture v-if="data.image.sm">
          <source
            v-if="data.image.lg"
            media="(min-width: 1200px)"
            :srcset="data.image.lg"
          >
          <source
            v-if="data.image.md"
            media="(min-width: 768px)"
            :srcset="data.image.md"
          >
          <AImg
            :src="data.image.sm"
            :alt="data.title"
            decoding="async"
            loading="lazy"
            width="90"
            height="90"
          />
        </picture>
      </div>
      <div class="s-video-main__tags">
        <div
          v-for="(tag, index) in data.tags"
          :key="index"
          class="s-video-main__tag"
        >
          <picture v-if="tag.ico">
            <AImg
              :src="tag.ico"
              :alt="tag.title"
              decoding="async"
              loading="lazy"
              width="70"
              height="70"
            />
          </picture>
          <span
            class="a-font_xs-m"
            v-html="tag.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './SVideoMain.scss';
</style>
