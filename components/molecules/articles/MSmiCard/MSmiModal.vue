<script setup lang="ts">
import { SOCIAL } from '~/constants';

const props = defineProps<{
  title?: string,
  date?: string,
  text?: string,
}>();
</script>

<template>
  <div
    class="m-smi-modal"
  >
    <div>
      <div
        class="m-smi-modal__title a-font_h4"
        v-html="title"
      />
      <ATag
        v-if="date"
        :text="date"
        variant="white"
        class="a-tag--blur a-font_m-m"
      />
      <div
        v-if="text"
        class="m-smi-modal__text a-font_l-m"
      >
        <div v-html="text" />
      </div>
    </div>
    <div class="m-smi-modal__banner">
      <div class="m-smi-modal__banner-wrap">
        <span class="a-font_h5">Медиацентр</span>
        <ASvgMono name="play" />
      </div>
      <div class="m-smi-modal__banner-wrap">
        <span class="a-font_xl">Следите за&nbsp;обновлениями</span>
        <div class="m-smi-modal__banner-links">
          <NuxtLink
            :to="SOCIAL.VK"
            target="_blank"
          >
            <ASvgMono name="social-vk" />
          </NuxtLink>
          <NuxtLink
            :to="SOCIAL.RUTUBE"
            target="_blank"
          >
            <ASvgMono name="social-rutube" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-smi-modal {
  display: flex;
  flex-direction: column;
  gap: scale(16);
  padding: var(--layout-h-padding);
  background-color: var(--a-color_white);
  border-radius: scale(16);

  @include tablet(min) {
    flex-direction: row;
  }

  @include desktop {
    gap: scale(50);
    padding: scale(24);
  }

  &__title {
    margin-bottom: scale(24);

    @include tablet(min) {
      margin-bottom: scale(48);
    }
  }

  &__text {
    margin-top: scale(16);
    color: var(--a-color_grey_70);

    @include tablet(min) {
      margin-top: scale(24);
    }

    @include desktop {
      margin-top: scale(32);
    }

    a {
      color: var(--a-color_red);

      &:hover {
        color: var(--a-color_red_dark);
      }
    }

    :deep() {
      a {
        color: var(--a-color_red);

        &:hover {
          color: var(--a-color_red_dark);
        }
      }
    }
  }

  .a-tag {
    border-color: var(--a-color_grey_60);
    color: var(--a-color_grey_100);
  }

  &__banner {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: scale(180);
    padding: var(--padding_def);
    color: var(--a-color_white);
    background-color: var(--a-color_red);
    border-radius: scale(12);

    @include tablet(min) {
      height: auto;
      min-height: scale(238);
      min-width: scale(284);
    }

    @include desktop {
      min-width: scale(562);
      min-height: scale(292);
    }

    &-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-links {
      display: grid;
      gap: scale(4);
      grid-template-columns: 1fr 1fr;
    }

    .ico {
      width: scale(20);
      height: scale(18);
      padding: scale(4);
      color: var(--a-color_dark);
      background-color: var(--a-color_white);
      border-radius: scale(4);

      @include tablet(min) {
        width: scale(24);
        height: scale(24);
      }

      @include desktop {
        width: scale(40);
        height: scale(36);
        padding: scale(6) scale(9);
        border-radius: scale(8);
      }

      &.ico-mono-play {
        color: var(--a-color_red);
      }
    }
  }
}
</style>