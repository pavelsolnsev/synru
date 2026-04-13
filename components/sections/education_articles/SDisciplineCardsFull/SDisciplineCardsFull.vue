<script setup lang="ts">
interface Props {
  title?: string;
  items?: { title?: string; ext?: string; to?: string }[]
  titleH1?: boolean;
  description?: string;
}

const {
  title,
  items = [],
  titleH1 = false,
} = defineProps<Props>();
</script>

<template>
  <MSection
    v-if="items?.length"
    :title
    :title-h1
    title-class="a-font_h3"
    class="s-discipline-types"
  >
    <ALinkFile
      v-for="item in items"
      :key="item.to"
      :title="item.title"
      :to="item.to"
      :ext="item.ext"
    />
    <div
      v-if="description"
      class="s-discipline-content a-font_l"
      v-html="description"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDisciplineCardsFull.scss';
</style>
