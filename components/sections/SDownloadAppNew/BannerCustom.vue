import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">

interface Props {
  customImgLg?: string;
  customImgMd?: string;
  customImgSm?: string;
}

const {
  customImgLg = synergyApi('uploads/content/s-download-app/guarantee_lg.webp'),
  customImgMd = synergyApi('uploads/content/s-download-app/guarantee_md.webp'),
  customImgSm = synergyApi('uploads/content/s-download-app/guarantee_sm.webp'),
} = defineProps<Props>();

const { openModal } = useModalStore();
</script>

<template>
  <div class="s-download-app-new__custom">
    <picture
      @click="openModal('MDAModal', {type: 'custom'})"
    >
      <source
        media="(min-width: 1200px)"
        :srcset="customImgLg"
      >
      <source
        media="(min-width: 768px)"
        :srcset="customImgMd"
      >
      <AImg
        :src="customImgSm"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>
</template>

<style lang="scss" scoped>
.s-download-app-new__custom {
  overflow: hidden;
  position: relative;
  z-index: 1;
  gap: scale(8);
  flex-direction: column;
  display: flex;
  height: scale(351);
  padding: var(--padding_def);
  border-radius: scale(16);
  background-color: var(--a-color_grey_40);
  cursor: pointer;
  text-align: center;
  color: var(--a-color_white);
  transition: var(--transition);
  &:hover { opacity: .8 }
  @include tablet() {
    min-height: scale(351);
    height: auto;
  }
  @include desktop(min) {
    gap: scale(20);
    height: scale(379);
    text-align: left;
  }

  &-title {
    max-width: scale(280);
    margin: auto auto 0;

    @include desktop(min) {
      max-width: scale(500);
      margin: 0;
    }
  }

  &-text {
    max-width: scale(280);
    margin: 0 auto;
    @include desktop(min) {
      margin: 0 0 auto;
      max-width: scale(450);
    }
  }

  picture {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
}
</style>
