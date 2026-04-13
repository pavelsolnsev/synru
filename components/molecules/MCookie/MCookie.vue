<script setup lang="ts">
const accepted = useCookie('cookieAccepted', {
  'maxAge': 2592000,
  'path': '/',
},
);

function accept() {
  accepted.value = 'true';
}
</script>

<template>
  <div
    :class="{
      '--visible': !accepted,
    }"
    class="m-cookie"
  >
    <p class="m-cookie__text a-font_xs-m">
      Пользуясь нашим сайтом, вы соглашаетесь с&nbsp;тем, что мы используем
      <NuxtLink
        to="/"
      >
        cookies
      </NuxtLink>
    </p>
    <AButton
      bg-color="white"
      size="sm"
      class="m-cookie__btn"
      @click="accept"
    >
      Принять
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
@import './MCookie.scss';
</style>
