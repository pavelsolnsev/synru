<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  formName?: boolean,
  formPhone?: boolean,
  formMail?: boolean,
  btn?: string,
  actionParams?: { param: string }[],
  imageLg?: string;
  imageMd?: string;
  imageSm?: string;
}

const {
  imageLg = '',
  imageMd = '',
  imageSm = '',
  ...props
} = defineProps<Props>();
</script>

<template>
  <MSectionSecond class="s-form-second">
    <picture
      class="s-form-second__img"
    >
      <source
        :srcset="imageLg"
        media="(min-width: 1200px)"
      >
      <source
        :srcset="imageMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="imageSm"
        alt="form"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <MFormSecond v-bind="props" />
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SFormSecond.scss';
</style>
