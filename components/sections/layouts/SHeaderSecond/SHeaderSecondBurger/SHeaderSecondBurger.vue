<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';

const { width: windowWidth } = useWindowSize();

const isAsideNavMenu = ref(false);
const activeBurgerMenu = ref<null | number>(null);
const mounted = ref(false);

watch(activeBurgerMenu, () => {
  if (!activeBurgerMenu.value) isAsideNavMenu.value = false;
});

onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div
    :key="`${mounted}`"
    class="s-header-second-burger"
  >
    <template v-if="windowWidth >= 1200">
      <SSecondBurgerDesktop />
    </template>

    <template v-else-if="windowWidth <= 1199 && windowWidth >=768">
      <SSecondBurgerTablet />
    </template>

    <template v-else>
      <SSecondBurgerMobile />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderSecondBurger.scss';
</style>
