<script setup lang="ts">
interface Props {
  title: string;
  firstItem?: string;
}

const {
  title,
  firstItem,
} = defineProps<Props>();
</script>

<template>
  <MSection
    id="scredit"
    class="s-credit s-credit-cost"
    title-class="a-font_h3"
    :title
  >
    <MCreditCost :first-item />
  </MSection>
</template>

<style lang="scss" scoped>
@import '../SCredit/SCredit.scss';
</style>
