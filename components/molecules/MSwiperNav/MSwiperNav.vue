<script setup lang="ts">
const wrapper = ref(null);

defineExpose({ wrapper });
</script>

<template>
  <div
    ref="wrapper"
    class="swiper-navigation"
  >
    <button class="swiper-button-prev">
      <ASvgMono name="arr-slider-nav-prev" />
    </button>
    <button class="swiper-button-next">
      <ASvgMono name="arr-slider-nav-next" />
    </button>
  </div>
</template>
