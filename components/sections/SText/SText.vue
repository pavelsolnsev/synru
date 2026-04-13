<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  id?: string;
  description?: {
    title: string;
    text: string;
  }[];
}

const {
  id = '',
  title = '',
  subtitle = '',
  description = [],
} = defineProps<Props>();
</script>

<template>
  <MSection
    v-if="description.length"
    :id
    class="s-text scroll-margin-top"
    :title
  >
    <div
      v-if="subtitle"
      class="s-text__subtitle a-font_h5"
      v-html="subtitle"
    />
    <div class="s-text__list">
      <MCardText
        v-for="item in description"
        :key="item.title"
        :title="item.title"
        :text="item.text"
      />
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SText.scss';
</style>

