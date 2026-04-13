<script setup lang="ts">
interface Props {
  title: string;
  icon: string;
  active: boolean;
  to: string;
}

const {
  title = '',
  icon = '',
  active = false,
  to,
} = defineProps<Props>();
</script>

<template>
  <NuxtLink
    class="m-filter-tab a-font_l-m"
    :to
    :class="{
      '_is-active': active,
    }"
  >
    <span v-html="title" />
    <ASvgMono
      :name="icon"
    />
  </NuxtLink>
</template>

<style lang="scss" scoped>
@import './MFilterTabLink.scss';
</style>

<style lang="scss">
.m-filter-tab {
  .popular-ico {
    display: block;
    margin-left: 0;
  }

  .ico {
    width: scale(16);
    height: scale(16);
    margin-left: 0;
    color: var(--a-color_red);

    @include desktop(min) {
      width: scale(24);
      height: scale(24);
    }
  }
}
</style>
