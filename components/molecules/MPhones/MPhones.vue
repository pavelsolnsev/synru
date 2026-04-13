<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const {
  phones,
  icon = true,
  iconName = 'phone-filled',
  showBtn = false,
} = defineProps<{
  icon?: boolean,
  iconName?: string,
  showBtn?: boolean,
  phones: string[],
}>();

const isMobileScreen = useMediaQuery('(max-width: 991px)');
</script>

<template>
  <div
    class="m-phones"
    :class="{'m-phones_mobile' : showBtn && isMobileScreen}"
  >
    <a
      v-for="phone in phones"
      :key="phone"
      class="m-phones__link"
      :href="`tel:${$phoneToLink(phone)}`"
      itemprop="telephone"
    >
      <ASvgMono
        v-if="showBtn || icon"
        :name="iconName"
      />
      {{ phone }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import './MPhones.scss';
</style>
