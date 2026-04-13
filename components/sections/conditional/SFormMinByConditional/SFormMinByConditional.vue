<script setup lang="ts">
import type { Fonts, FormBgColor, SectionConditionalGroup } from '~/types';

interface Props {
  entity?: { id?: number };
  conditionalGroup?: SectionConditionalGroup[];
  title: string;
  titleClass?: Fonts;
  subtitle?: string;
  subtitleClass?: Fonts;
  bgColor?: FormBgColor;
  formMail?: boolean;
  btn: string;
  actionParams?: { param: string }[];
  showLogo?: boolean;
  routeName?: string;
}

const {
  entity = {},
  conditionalGroup = [],
  ...props
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <SFormMin
    v-if="showSection"
    v-bind="props"
  />
</template>
