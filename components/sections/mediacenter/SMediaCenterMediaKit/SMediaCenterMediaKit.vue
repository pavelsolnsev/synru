<script setup lang="ts">
import { mediaKit } from './sMediaCenterMediaKitData';

interface Props {
  title?: string;
}

const {
  title = 'Медиакит',
} = defineProps<Props>();
</script>

<template>
  <MMediacenterBlock
    :title
    class="media-kit"
  >
    <div
      v-for="item in mediaKit"
      :key="item.png"
      class="media-kit__item"
    >
      <AImg
        :src="item.svg"
        alt="mediakit"
      />
      <div class="media-kit__links">
        <a
          :href="item.png"
          class="a-font_l-m"
          download
          target="_blank"
        >
          <span>.png</span>
          <ASvgMono name="download" />
        </a>
        <a
          :href="item.svg"
          class="a-font_l-m"
          download
          target="_blank"
        >
          <span>.svg</span>
          <ASvgMono name="download" />
        </a>
      </div>
    </div>
    <p class="a-font_m">
      Использование логотипов (символики) Университета разрешается для&nbsp;добросовестного использования по&nbsp;лицензии: <a
        href="https://creativecommons.org/licenses/by/4.0/deed.ru"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >Creative Commons Attribution 4.0 International</a>
    </p>
    <p class="a-font_m">
      The use of the University’s logos (symbols) is permitted for fair use under the terms of the <a
        href="https://creativecommons.org/licenses/by/4.0/deed.en"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >Creative Commons Attribution 4.0 International License</a>
    </p>
  </MMediacenterBlock>
</template>

<style lang="scss" scoped>
@import './SMediaCenterMediaKit.scss';
</style>
