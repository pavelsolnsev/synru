<script setup lang="ts">
import { useScroll } from '@vueuse/core';

interface Props {
  table: string;
}

const { table = '' } = defineProps<Props>();

const tableContainerRef = useTemplateRef('tableContainerRef');
const tableRef = useTemplateRef('tableRef');

const { x, arrivedState } = useScroll(tableContainerRef, { behavior: 'smooth' });

const scrollLeftValue = ref(0);
const startX = ref(0);
const isScrolling = ref(false);

function startScroll(event: MouseEvent) {
  if (!tableContainerRef.value) return;
  isScrolling.value = true;
  startX.value = event.clientX - tableContainerRef.value?.offsetLeft;
  scrollLeftValue.value = tableContainerRef.value.scrollLeft;
}

function stopScroll() {
  isScrolling.value = false;
}

function onMouseMove(event: MouseEvent) {
  if (!isScrolling.value || !tableContainerRef.value) return;

  event.preventDefault();

  const x = event.clientX - tableContainerRef.value.offsetLeft;
  const scroll = (x - startX.value) * 2;

  tableContainerRef.value.scrollLeft = scrollLeftValue.value - scroll;
}
</script>

<template>
  <div
    ref="tableContainerRef"
    class="s-article-table"
    @mousedown="startScroll"
    @mouseup="stopScroll"
    @mouseleave="stopScroll"
    @mousemove="onMouseMove"
  >
    <div
      ref="tableRef"
      v-html="table"
    />
    <div
      class="s-article-table__navigation"
      :style="{
        width: tableRef?.scrollWidth ? `${tableRef?.scrollWidth}px` : undefined,
        height: tableRef?.scrollHeight ? `${tableRef?.scrollHeight}px` : undefined,
      }"
    >
      <div
        class="s-article-table__navigation__left"
        :class="{
          '--show': !arrivedState.left
        }"
      >
        <button
          v-if="!arrivedState.left"
          class="s-article-table__navigation__prev"
          @click="x = 0"
        >
          <ASvgMono name="arr-slider-nav-prev" />
        </button>
      </div>
      <div
        class="s-article-table__navigation__right"
        :class="{
          '--show': !arrivedState.right
        }"
      >
        <button
          v-if="!arrivedState.right"
          class="s-article-table__navigation__next"
          @click="x = tableRef?.scrollWidth ?? 1920"
        >
          <ASvgMono name="arr-slider-nav-next" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleTable.scss';
</style>
