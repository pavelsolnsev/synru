<script setup lang="ts">
import ButtonImage from '~/assets/images/admission_committee/header_btn.webp';
import { ROUTES } from '~/constants';
</script>

<template>
  <NuxtLink
    :to="ROUTES.ADMISSION_COMMITTEE"
    class="a-priemnaya-komissiya"
    itemprop="url"
  >
    <span class="a-priemnaya-komissiya__img">
      <AImg
        :src="ButtonImage"
        alt="syn_logo"
      />
    </span>
    <span class="a-font_m-m a-priemnaya-komissiya__text">
      Приёмная комиссия
      <ASvgMono
        type="colors"
        name="arrow-right-top"
      />
    </span>
  </NuxtLink>
</template>

<style lang='scss' scoped>
@import './APriemnayaKomissiya.scss';
</style>
