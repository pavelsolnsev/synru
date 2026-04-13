<script setup lang="ts">
import { cources } from './SRecommendCourcesData';

const data = {
  title: 'Рекомендованные курсы по маркетингу',
};
</script>

<template>
  <MSection
    class="s-recommend-cources"
    title-class="a-font_h3"
    :title="data.title"
  >
    <div class="s-recommend-cources__inner">
      <template
        v-for="(item, index) in cources"
        :key="index"
      >
        <MCourceCard
          :href="item.href"
          :image="item.image"
          :title="item.title"
          :text="item.text"
        />
      </template>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SRecommendCources.scss';
</style>
