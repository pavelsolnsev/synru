<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  link?: string;
}

const {
  title = '',
  description = '',
  link = '',
} = defineProps<Props>();
</script>

<template>
  <MSection
    :title
    class="s-discipline"
    title-h1
    title-class="a-font_h3"
  >
    <div
      class="s-discipline__content"
    >
      <slot name="description">
        <div v-html="description" />
      </slot>
    </div>

    <div
      v-if="link"
      class="s-discipline__content-pdf"
    >
      <iframe
        :src="link"
        width="100%"
        height="100%"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDocumentShow.scss';
</style>
