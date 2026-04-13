<script setup lang="ts">
const {
  tags = [],
  tagFont = 'a-font_m-m',
  img = '',
  imgLg = '',
  imgMd = '',
  subtitle = '',
  formTitle = '',
  actionParams = [],
} = defineProps<{
  title: string,
  btnText: string,
  tags?: { tag: string }[],
  tagFont?: string,
  img?: string,
  imgLg?: string,
  imgMd?: string,
  subtitle?: string,
  formTitle?: string;
  actionParams?: { param: string }[],
}>();

const { openModal } = useModalStore();

function openPopup() {
  openModal('MModalForm', {
    formName: true,
    formPhone: true,
    title: "formTitle",
    actionParams: actionParams,
  });
}
</script>

<template>
  <div class="m-credit-banner">
    <div
      v-if="tags.length"
      class="m-credit-banner__tags"
    >
      <ATag
        v-for="item in tags"
        :key="item.tag"
        :text="item.tag"
        :font="tagFont"
        variant="white"
        class="a-tag--blur"
      />
    </div>

    <picture
      v-if="img"
      class="m-credit-banner__picture"
    >
      <source
        v-if="imgLg"
        :srcset="imgLg"
        media="(min-width: 1200px)"
      >
      <source
        v-if="imgMd"
        :srcset="imgMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="img"
        :alt="title"
        decoding="async"
        loading="lazy"
      />
    </picture>

    <div class="m-credit-banner__inner">
      <div class="m-credit-banner__desc">
        <div
          class="m-credit-banner__title a-font_h5"
          v-html="title"
        />
        <div
          class="m-credit-banner__subtitle a-font_m-m"
          v-html="subtitle"
        />

        <AButton
          size="lg"
          bg-color="black"
          class="--quiz-popup-opener"
          @click.prevent="openPopup()"
        >
          {{ btnText }}
        </AButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MCreditBanner.scss';
</style>
