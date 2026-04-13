<script setup lang="ts">
import type { BreadcrumbItem } from '~/types';

interface Props {
  showBreadcrumbs?: boolean;
  routeName?: string;
  entity?: { name?: string; short_name?: string; }
  breadcrumbs?: BreadcrumbItem[];
}

const {
  showBreadcrumbs = true,
  routeName = '',
  entity = {},
  breadcrumbs: propsBreadcrumbs = [],
} = defineProps<Props>();

const breadcrumbs = propsBreadcrumbs?.length
  ? propsBreadcrumbs
  : generateBreadcrumbs({ routeName, entity });

const slots = useSlots();
</script>

<template>
  <div class="s-cols__main">
    <div
      v-if="slots.top || showBreadcrumbs"
      class="s-cols__top"
    >
      <MBreadcrumbs
        v-if="showBreadcrumbs"
        :breadcrumbs
      />
      <slot name="top" />
    </div>
    <div
      v-if="slots.bottom"
      class="s-cols__bottom"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SEduWrapper.scss';

.s-cols__main {
  padding: 0;
  margin: 0;
}
</style>
