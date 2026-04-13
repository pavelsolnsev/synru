<script setup lang="ts">
interface Props {
  src: string,
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="m-modal-inline"
  >
    <AImg
      :src
      alt=""
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<style lang="scss" scoped>
.m-modal-inline {
  overflow: auto;
  display: flex;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  margin: 0 auto;
  padding: var(--padding_def);
  border-radius: var(--border-radius_def);
  background-color: var(--a-color_grey_10);
  text-align: center;
  color:  var(--a-color_white);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

:global(.--modal-m-modal-inline .m-modal-content) {
  display: flex;
  flex-direction: column;
}
</style>
