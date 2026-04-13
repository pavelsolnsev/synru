<script setup lang="ts">
defineProps<{
  zIndex: number,
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div
    :style="{ zIndex }"
    class="m-modal-wrapper"
    @click.self="emit('close')"
  >


    <div class="m-modal-content">
      <button
        class="m-modal-close"
        title="Закрыть"
        @click="emit('close')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          tabindex="-1"
        >
          <path d="M20 20L4 4m16 0L4 20"></path>
        </svg>
      </button>

      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  padding: scale(180) 0 scale(48);
  background-color: rgba(var(--a-color_grey_40_rgb), .8);
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  @include desktop {
    padding-top: scale(166);
    padding-right: var(--scroll-width);
  }
}

.m-modal-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  @include desktop {
    width: auto;
    max-width: calc(var(--layout-width) - #{scale(200)});
    height: auto;
  }
}

.m-modal-close {
  position: absolute;
  left: 0;
  top: scale(-55);
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  margin: 0;
  padding: 0;
  width: scale(44);
  height: scale(44);
  margin: 0 auto;
  border: 0;
  border-radius: scale(8);
  color: var(--a-color_dark);
  background: var(--a-color_grey_20);
  pointer-events: all;
  cursor: pointer;
  transition: all 0.15s ease;
  --f-button-svg-stroke-width: 2;
  z-index: 40;
  @include desktop {
    left: auto;
    top: 0;
    right: scale(-68);
    width: scale(60);
    height: scale(60);
    margin: 0;
  }

  svg {
    width: scale(12);
    height: scale(12);
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: opacity 0.15s ease;
    transform: none;
    filter: none;
    pointer-events: none;
    @include desktop {
      width: scale(16);
      height: scale(16);
    }
  }
}

@media (hover: hover) {
  .m-modal-close:hover:not([disabled]) {
    background-color: var(--a-color_grey_10);
  }
}
</style>
