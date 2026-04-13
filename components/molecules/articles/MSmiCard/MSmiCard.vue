<script setup lang="ts">
interface Props {
  index?: number,
  href?: string,
  title?: string,
  date?: string,
  source?: string,
  text?: string,
}

const {
  title = '',
  date = '',
  source = '',
  text = '',
} = defineProps<Props>();

const { openModal } = useModalStore();

function onClickSmi() {
  openModal('MSmiModal', {
    title: title,
    date: date,
    text: text,
  });
}
</script>

<template>
  <div
    class="media-about__item"
    @click.prevent="onClickSmi()"
  >
    <h5 class="a-font_h5 media-about__title">
      <span v-html="title" />
      <ASvgMono name="simple-arrow" />
    </h5>
    <div class="a-font_l">
      <span v-html="date" />
      <span v-if="source"> | </span>
      <span v-html="source" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MSmiCard.scss';
</style>
