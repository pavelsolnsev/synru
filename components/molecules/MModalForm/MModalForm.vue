<script setup lang="ts">
const props = defineProps<{
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  formName?: boolean,
  formPhone?: boolean,
  formMail?: boolean;
  btn?: string;
  actionParams?: { param: string }[],
  imageLg?: string;
  imageMd?: string;
  imageSm?: string;
  routeName?: string;
}>();

const hasImage = props.imageLg || props.imageMd || props.imageSm;
</script>

<template>
  <div
    class="m-modal-form"
    :class="{'--img': hasImage}"
  >
    <picture
      v-if="hasImage"
      class="m-modal-form__img"
    >
      <source
        v-if="props.imageLg"
        :srcset="props.imageLg"
        media="(min-width: 1200px)"
      >
      <source
        v-if="props.imageMd"
        :srcset="props.imageMd"
        media="(min-width: 768px)"
      >
      <AImg
        alt="dod"
        loading="lazy"
        decoding="async"
        :src="props.imageSm || props.imageMd || props.imageLg"
      />
    </picture>

    <component
      :is="formMail ? 'MFormWithEmail' : 'MForm'"
      v-bind="props"
      bg-color="grey_10"
    />

    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import './MModalForm.scss';
</style>
