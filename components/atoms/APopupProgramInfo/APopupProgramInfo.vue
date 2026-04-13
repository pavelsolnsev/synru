<script setup lang="ts">
const programInfo: string[] = ['Диплом гос.образца', 'Бесплатное начало обучения', 'Гарантия трудоустройства'];
</script>

<template>
  <div class="a-popup-program-info">
    <div
      v-for="item, idx in programInfo"
      :key="item"
      class="a-popup-program-info__item"
    >
      <span class="a-font_xl-m">{{ item }}</span>
      <span class="a-popup-program-info__num">{{ formatNumberWithLeadingZero(idx+1) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './APopupProgramInfo.scss';
</style>
