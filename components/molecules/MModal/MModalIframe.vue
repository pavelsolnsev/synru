<script setup lang="ts">
const props = defineProps<{
  src: string,
  isVertical?: boolean,
}>();

const iframeRef = templateRef('iframeRef');
const sendPlayCommand = () => {
  if (iframeRef.value?.contentWindow && props.src.includes('embed')) {
    const message = JSON.stringify({ type: 'player:play', data: {} });
    iframeRef.value.contentWindow.postMessage(message, '*');
  }
};

const isDoc = !props.src.includes('embed') ? '--is-doc' : '';
</script>

<template>
  <div
    class="m-modal-iframe"
    :class="[
      {'vertical-video': isVertical},
      isDoc
    ]"
  >
    <iframe
      ref="iframeRef"
      allow="autoplay; fullscreen"
      scrolling="auto"
      autoplay="true"
      :src="src"
      @load="sendPlayCommand"
    />
  </div>
</template>

<style lang="scss" scoped>
.m-modal-iframe {
  display: flex;
  width: 100%;
  height: auto;
  max-height: 100%;
  margin: 0 auto;
  padding: var(--padding_def);
  border-radius: var(--border-radius_def);
  background-color: var(--a-color_grey_10);
  text-align: center;
  color:  var(--a-color_white);
  aspect-ratio: 16 / 9;
  @include desktop {
    width: rem(960);
  }
  iframe,
  video {
    overflow: hidden;
    display: block;
    width: 100%;
    height: auto;
    border-radius: scale(8);
  }
  video,
  iframe {
    object-fit: cover;
  }
  &.vertical-video {
    max-width: scale(560);
    aspect-ratio: 9 / 16;
    @include tablet(min) {
      width: auto;
      height: 76vh;
    }
    @include desktop {
      height: 80vh;
    }
    @media (min-width: $p_xl) and (orientation: portrait) {
      width: rem(560);
      max-width: unset;
      height: auto;
    }
  }

  &.--is-doc {
    height: 60vh;
    @include tablet(min) {
      height: 80vh;
    }
  }
}


</style>