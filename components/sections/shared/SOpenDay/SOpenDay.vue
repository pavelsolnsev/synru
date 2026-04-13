<script setup lang="ts">
import type { Event } from '~/types';

interface Props {
  hiddenBanner?: boolean;
  title?: string;
  video?: string;
  tag?: string;
  image?: string;
  imageLg?: string;
  imageMd?: string;
  eventsTitle?: string;
  events?: Event[];
}

const {
  hiddenBanner = false,
  title = '',
  tag = '',
  video = '',
  image = '',
  imageMd = '',
  imageLg = '',
  events = [],
  eventsTitle = '',
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-open-day"
    :title
  >
    <MVideoCard
      v-if="!hiddenBanner"
      class="s-open-day__video"
      :image
      :image-md
      :image-lg
      :tag
      :video
    />
    <SEvents
      :title="eventsTitle"
      :events
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SOpenDay.scss';
</style>
