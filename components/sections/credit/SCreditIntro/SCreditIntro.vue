<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import type { SectionConditionalGroup, Fonts  } from '~/types';

interface Props {
  sectionClass?: string;
  title?: string;
  titleClass?: Fonts
  subtitle?: string;
  subtitleClass?: Fonts;
  bgImages?: { image: string }[]
  color: 'black' | 'white';
  showBreadcrumbs?: boolean;
  routeName?: string;
  entity?: { id?: number,   name?: string; short_name?: string; };
  conditionalGroup?: SectionConditionalGroup[];
}

const {
  sectionClass = '',
  title = 'Кредит на&nbsp;образование <br>с&nbsp;поддержкой государства',
  titleClass = 'a-font_h3',
  subtitle = 'Оплачивайте высшее и&nbsp;среднее образование в&nbsp;кредит, <br>а&nbsp;государство поможет вам его погасить',
  subtitleClass = 'a-font_m-m',
  bgImages = [],
  color = 'white',
  routeName = '',
  showBreadcrumbs = false,
  entity = {},
  conditionalGroup = [],
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const breadcrumbs = showBreadcrumbs
  ? generateBreadcrumbs({ routeName, entity })
  : [];

const { y } = useWindowScroll();

const textColorClass = color === 'white' ? 's-credit-intro-white' : 's-credit-intro-black';
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-credit-intro"
    :class="[textColorClass, y > 0 && '--scroll', sectionClass]"
  >
    <MBreadcrumbs :breadcrumbs />
    <h1
      class="s-credit-intro__title"
      :class="titleClass"
      v-html="title"
    />
    <p
      class="s-credit-intro__subtitle"
      :class="subtitleClass"
      v-html="subtitle"
    />
    <picture>
      <source
        v-if="bgImages[2]"
        :srcset="bgImages[2].image"
        media="(min-width: 1200px)"
      >
      <source
        v-if="bgImages[1]"
        :srcset="bgImages[1].image"
        media="(min-width: 768px)"
      >
      <AImg
        :src="bgImages[0]?.image"
        alt="credit"
      />
    </picture>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditIntro.scss';
</style>
