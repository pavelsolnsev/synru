<script setup lang="ts">
import type { TeacherCard } from '~/types';

const {
  name = '',
  image = '',
  text = '',
} = defineProps<TeacherCard>();
</script>

<template>
  <div class="m-teacher-modal">
    <div class="m-teacher-modal__wrap a-font_l-m">
      <picture class="m-teacher-modal__img">
        <AImg
          :src="image"
          :alt="name"
          width="128"
          height="172"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div
        class="m-teacher-modal__name a-font_h5"
        v-html="name"
      />
      <div
        class="m-teacher-modal__position"
        v-html="text"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-teacher-modal {
  padding: scale(12);
  background-color: var(--a-color_white);
  border-radius: scale(16);
  width: 100vw;
  max-width: scale(736);

  @include tablet {
    padding: scale(16);
  }

  @include desktop {
    padding: scale(24);
    max-width: scale(755);
    max-height: 100%;
  }

  &__wrap {
    display: grid;

    @include tablet {
      grid-template-columns: auto 1fr;
      column-gap: scale(16);
    }
    @include desktop {
      overflow: auto;
      grid-template-columns: 1fr auto;
      column-gap: scale(31);
    }
  }

  &__img {
    overflow: hidden;
    width: scale(126);
    height: scale(172);
    margin: 0 0 scale(16);
    border-radius: scale(8);
    background-color: var(--a-color_grey_10);
    @include tablet {
      grid-column: 1;
      grid-row: 1/4;
    }
    @include desktop {
      grid-column: 2;
      grid-row: 1/4;
      width: scale(200);
      height: scale(272);
      margin: 0;
      border-radius: scale(12);
    }
    img {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &__name {
    margin: 0 0 scale(8);
    @include tablet {
      grid-column: 2;
    }
    @include desktop {
      grid-column: 1;
      margin-bottom: scale(12);
    }
  }

  &__position {
    grid-column: 2;
    margin: 0 0 scale(16);
    color: var(--a-color_grey_80);
    @include desktop {
      grid-column: 1;
    }
    :deep() {
      ul {
        padding-left: scale(20);

        @include tablet(max) {
          padding-left: scale(16);
        }
        li {
          position: relative;
          list-style: outside;
          list-style-type: disc;
  
          &:not(:last-child) {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>