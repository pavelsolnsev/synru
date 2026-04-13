<script setup lang="ts">
const {
  text = '',
  id = '',
  classes = '',
} = defineProps<{
  text?: string,
  id?: string,
  classes?: string,
}>();
</script>

<template>
  <p
    v-if="text"
    :id="id || undefined"
    :class="classes || undefined"
    v-html="text"
  />
</template>
