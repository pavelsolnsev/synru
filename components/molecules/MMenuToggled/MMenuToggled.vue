<script setup lang="ts">
interface MenuItem {
  title: string,
  href: string,
  attributes?: { [key: string]: string },
}

const {
  title,
  href = '',
  target = null,
  items = [],
} = defineProps<{
  title: string,
  href?: string,
  target?: '_blank' | null,
  items?: MenuItem[],
}>();

const isOpened = ref(false);

const onToggleClick = () => {
  isOpened.value = !isOpened.value;
};

const onCloseClick = () => {
  isOpened.value = false;
};
</script>

<template>
  <div
    class="m-menu-toggled"
    :class="{'_opened': isOpened}"
  >
    <span class="m-menu-toggled__mainlink">
      <NuxtLink
        class="a-font_l-m"
        :to="href"
        :target="target"
      >
        <span v-html="title" />
      </NuxtLink>
      <button
        v-if="items.length"
        class="m-menu-toggled__mainlink-toggle"
        type="button"
        :aria-label="title"
        @click.prevent="onToggleClick"
      >
        <ASvgMono name="arr_down" />
      </button>
    </span>
    <template
      v-if="items.length"
    >
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        class="m-menu-toggled__link a-font_m"
        :to="item.href"
        v-bind="item.attributes"
      >
        <span v-html="item.title" />
      </NuxtLink>
      <button
        class="m-menu-toggled__close a-font_m"
        type="button"
        @click.prevent="onCloseClick"
      >
        Свернуть
      </button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './MMenuToggled.scss';
</style>
