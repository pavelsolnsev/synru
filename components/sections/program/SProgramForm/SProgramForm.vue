<script setup lang="ts">
import type { FormBgColor } from '~/types';
import DescriptionImage from '~/assets/icons/svg-mono/gerb.svg?url';

interface Props {
  title?: string;
  descClass?: string;
  description?: string;
  text?: string;
  tags?: { name: string }[];
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  bgColor?: string;
  formTitle?: string;
  formMail?: boolean;
  formBgColor?: FormBgColor;
  btnText?: string;
  action?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <SForm
    v-bind="props"
    :action-params="[
      {param: 'form=credit_request'},
      {param: action ?? ''}
    ]"
  >
    <template #description>
      <AImg
        :src="DescriptionImage"
        class="lazy"
        decoding="async"
        alt="gerb"
      />
    </template>
  </SForm>
</template>

<style lang="scss" scoped>
@import './SProgramForm.scss';
</style>
