<script setup lang="ts">
interface Props {
  title?: string;
  bthHref?: string;
  btnText?: string;
}

const {
  title = '',
  bthHref = '',
  btnText = '',
} = defineProps<Props>();
</script>

<template>
  <div class="m-mediacenter-block">
    <div
      class="m-mediacenter-block__title a-font_h3"
      v-html="title"
    />
    <div class="m-mediacenter-block__content">
      <slot />
    </div>

    <AButton
      v-if="bthHref"
      :to="bthHref"
      size="md"
    >
      <div class="m-mediacenter-block__btn">
        <span v-html="btnText" />
      </div>
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
@import './MMediacenterBlock.scss';
</style>
