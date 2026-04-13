<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  list?: string;
}

const {
  title = '',
  subtitle = '',
  list = '',
} = defineProps<Props>();
</script>

<template>
  <div class="m-card-list">
    <div class="m-card-list__head">
      <div
        class="m-card-list__title a-font_h5"
        v-html="title"
      />
      <div
        v-if="subtitle"
        class="m-card-list__title a-font_l-m"
        v-html="subtitle"
      />
    </div>
    <div
      v-if="list"
      class="m-card-list__list a-font_l-m"
      v-html="list"
    />
  </div>
</template>

<style lang='scss' scoped>
@import './MCardList.scss';
</style>
