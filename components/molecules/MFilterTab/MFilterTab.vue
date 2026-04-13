<script setup lang="ts">
import { COMMON } from '~/constants';

interface Props {
  title: string;
  fontSize?: string;
  icon?: string;
  active?: boolean;
  iconFirst?: boolean;
}

const {
  title = '',
  fontSize = 'a-font_l-m',
  icon = '',
  active = false,
} = defineProps<Props>();

const isPopular = title === COMMON.POPULAR_TAG_NAME;
</script>

<template>
  <button
    class="m-filter-tab"
    :class="[
      fontSize,
      {
        '_is-active': active,
        '_icon': icon && !isPopular,
        '_icon-first': icon && iconFirst
      },
    ]"
  >
    <ASvgMono
      v-if="isPopular"
      class="popular-ico"
      :name="COMMON.POPULAR_TAG_ICON"
    />
    <ASvgMono
      v-else-if="icon"
      :name="icon"
    />
    <span v-html="title" />
  </button>
</template>

<style lang="scss" scoped>
@import './MFilterTab.scss';
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
