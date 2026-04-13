<script setup lang="ts">
interface Props {
  title?: string;
  text?: string;
  tags?: { title: string; to: string; }[]
  titleH1?: boolean;
}

const {
  title = '',
  text = '',
  tags = [],
  titleH1 = false,
} = defineProps<Props>();
</script>

<template>
  <MSection
    v-if="tags?.length"
    class="s-card-tags"
    title-class="s-card-tags__title a-font_h3"
    :title
    :title-h1
  >
    <div
      class="s-card-tags__text a-font_xl-m"
      v-html="text"
    />
    <div class="s-card-tags__list">
      <ATag
        v-for="item in tags"
        :key="item.to"
        variant="primary"
        :text="item.title"
        :to="item.to"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCardTags.scss';
</style>
