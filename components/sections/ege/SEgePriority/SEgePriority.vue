import { synergyApi } from '~/utils/mediaCdn';
<script lang="ts" setup>
const data = {
  title: 'Приоритетное поступление ',
  subtitle: 'По&nbsp;результатам сдачи экзаменов лучшие ученики получают приоритетное поступление на&nbsp;программы университета и&nbsp;колледжа',
  imageLg: synergyApi('uploads/content/ege/priority_bg_lg.webp'),
  imageSm: synergyApi('uploads/content/ege/priority_bg_sm.webp'),
};
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-priority"
  >
    <div class="s-ege-priority__body">
      <picture
        class="s-ege-priority__bg"
      >
        <source
          media="(min-width: 1200px)"
          :srcset="data.imageLg"
        >
        <AImg
          :src="data.imageSm"
          :alt="data.title"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <h2
        class="s-ege-priority__title a-font_h3"
        v-html="data.title"
      />
      <div
        class="s-ege-priority__subtitle"
        v-html="data.subtitle"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgePriority';
</style>
