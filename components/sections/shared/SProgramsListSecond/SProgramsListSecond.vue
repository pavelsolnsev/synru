<script setup lang="ts">
const props = defineProps({
  trainingProgramsTitle: {
    type: String,
    default: '',
  },
  showTrainingProgramsTitle: {
    type: Boolean,
    default: true,
  },
  trainingProgramsText: {
    type: String,
    default: '',
  },
  actionParams: {
    type: Array,
    default: () => ([]),
  },
  entity: {
    type: Object,
    default: () => ({}),
  },
  hasEntity: {
    type: Boolean,
    default: false,
  },
  routeName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <SProgramsList v-bind="props" />
</template>

<style lang="scss" scoped>
@import './SProgramsListSecond.scss';
</style>
