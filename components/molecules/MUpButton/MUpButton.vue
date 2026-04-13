<script setup lang="ts">
import { useWindowScroll , useThrottleFn } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'visible', value: boolean): void
}>();

const isVisible = ref(false);
const { y, arrivedState } = useWindowScroll();

const isScrollAtTop = computed(() => arrivedState.top);

const handleScroll = useThrottleFn((oldVal: number, newVal: number) => {
  isVisible.value = newVal > 2000 && oldVal < newVal;
  emit('visible', isVisible.value);
}, 200);

watch(y, handleScroll);

watch(isScrollAtTop, async () => {
  await nextTick();

  if (!isScrollAtTop.value) return;

  isVisible.value = false;
  emit('visible', isVisible.value);
});
</script>

<template>
  <AButton
    v-if="isVisible"
    size="lg"
    bg-color="white"
    class="m-up-button px-0"
    :class="{ '--visible': isVisible }"
    @click="y = 0"
  >
    <ASvgMono
      name="arr-go"
    />
  </AButton>
</template>

<style lang="scss" scoped>
@import './MUpButton.scss';
</style>
