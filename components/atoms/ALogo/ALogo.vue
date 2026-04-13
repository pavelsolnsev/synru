<script setup lang="ts">
import Logo from '~/assets/images/logo/logo-new.svg?url';
import LogoMin from '~/assets/images/logo/logo-min.svg?url';

const { useLogoMin = false } = defineProps<{
  useLogoMin?: boolean;
}>();
</script>
<template>
  <AImg
    :src="Logo"
    class="a-logo"
    :class="{
      'a-logo-common': useLogoMin,
    }"
    alt="Демо образовательный портал"
    width="200"
    height="28"
    decoding="async"
    itemprop="logo"
  />
  <AImg
    v-if="useLogoMin"
    :src="LogoMin"
    class="a-logo a-logo-min"
    alt="Демо образовательный портал"
    width="200"
    height="28"
    decoding="async"
    itemprop="logo"
  />
</template>

<style lang="scss" scoped>
.a-logo-common {
  display: block;
}

.a-logo-min {
  display: none;
}

@media (max-width: 767px) {
  .a-logo-common {
    display: none;
  }

  .a-logo-min {
    display: block;
  }
}
</style>
