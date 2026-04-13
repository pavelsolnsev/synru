<script setup lang="ts">
const { SITE_KEY } = useRuntimeConfig().public;

const captchaScripts = computed(() => {
  if (!SITE_KEY) return [];
  return [{
    src: 'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload',
    defer: true,
  }];
});

useHead({
  script: captchaScripts,
});
</script>


<template>
  <SThanksHeader />
  <slot />
  <SFooter />
  <SFixedBottom />
  <SFormFeedback />
</template>
