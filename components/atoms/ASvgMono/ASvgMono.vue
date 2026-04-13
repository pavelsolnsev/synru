<script setup lang="ts">
interface Props {
  name: string;
  modClass?: string;
  type?: string;
}

const { name, modClass = '', type = 'mono' } = defineProps<Props>();

const icon = defineAsyncComponent(async () => {
  try {
    return await import(`../../../assets/icons/svg-${type}/${name}.svg`);
  } catch (err) {
    console.error(err);
    return await import(`../../../assets/icons/svg-mono/simple-university.svg`);
  }
},
);
</script>

<template>
  <component
    :is="icon"
    :class="`ico icon-sprite ico-${type}-${name}${modClass}`"
  />
</template>
