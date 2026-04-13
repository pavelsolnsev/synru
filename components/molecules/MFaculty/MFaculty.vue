<script setup lang="ts">
interface Props {
  title?: string;
  count?: string;
  isNew?: boolean;
  image?: string;
  imageSm?: string;
  link?: string;
  hide?: boolean;
}

const {
  title = '',
  count = '',
  image = '',
  imageSm = '',
  isNew = false,
  link = '',
  hide = false,
} = defineProps<Props>();

const emits = defineEmits(['enroll']);
</script>

<template>
  <div
    v-show="!hide"
    class="m-faculty__wrap"
  >
    <NuxtLink
      :to="link"
      class="m-faculty"
    >
      <p
        class="m-faculty__title a-font_h5"
        v-html="title"
      />
      <div class="m-faculty__count a-font_m-m">{{ count }}</div>
      <div class="m-faculty__image">
        <template v-if="$slots.default">
          <slot />
        </template>
        <template v-if="image">
          <AImg
            :src="imageSm"
            :alt="title"
            loading="lazy"
            width="28"
            height="28"
            decoding="async"
          />
          <AImg
            :src="image"
            :alt="title"
            loading="lazy"
            width="132"
            height="132"
            decoding="async"
          />
        </template>
      </div>
    </NuxtLink>
    <AButton
      size="md"
      class="m-faculty__button"
      data-src="#s-faculty-list-popup"
      @click="emits('enroll')"
    >
      Поступить
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
@import './MFaculty.scss';
</style>
