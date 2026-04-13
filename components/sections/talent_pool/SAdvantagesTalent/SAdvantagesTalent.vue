<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';

interface Props {
  title?: string;
  advantages?: advantagesItem[];
}

interface advantagesItem {
  title?: string;
  text?: string;
}

const { title = 'Преимущества целевого обучения', advantages = [] } = defineProps<Props>();
</script>

<template>
  <MSection
    v-if="advantages?.length"
    class="s-advantages-talent"
    :title
  >
    <div class="s-advantages-talent__grid">
      <div
        v-for="(item, idx) in advantages"
        :key="item.title"
        class="s-advantages-talent__card"
      >
        <picture>
          <source
            :srcset="synergyApi(`uploads/content/talent_pool/${idx}-lg.webp`)"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="synergyApi(`uploads/content/talent_pool/${idx}-md.webp`)"
            media="(min-width: 768px)"
          >
          <AImg
            :src="synergyApi(`uploads/content/talent_pool/${idx}-sm.webp`)"
            :alt="title"
            class="m-video-card__img"
            decoding="async"
            loading="lazy"
            width="290"
            height="480"
          />
        </picture>
        <div class="s-advantages-talent__card-inner">
          <h5
            class="s-advantages-talent__card-title a-font_h5"
            v-html="item.title"
          />
          <p
            class="s-advantages-talent__card-text a-font_xl-m"
            v-html="item.text"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdvantagesTalent.scss';
</style>
