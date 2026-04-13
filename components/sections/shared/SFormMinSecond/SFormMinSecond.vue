<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  formMail?: boolean;
  btn: string;
  actionParams?: { param: string }[];
}

const {
  title,
  subtitle = '',
  formMail,
  btn,
  actionParams = [],
} = defineProps<Props>();
</script>

<template>
  <MSectionSecond class="s-form-min-second">
    <MFormMinSecond
      :title
      :subtitle
      :form-mail
      :btn
      :action-params
    />
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SFormMinSecond.scss';
</style>

