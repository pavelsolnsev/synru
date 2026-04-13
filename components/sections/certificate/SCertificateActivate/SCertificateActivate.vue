<script setup lang="ts">
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  firstDescr: string
  secondDescr: string
  bgImages: BgImage[]
  certAmount: string
  actionParams: { param: string }[];
}

defineProps<Props>();

const certCode = 'SYNVPO7';
const showCertFields = false;
</script>

<template>
  <MSection class="s-certificate-activate">
    <div class="s-certificate-activate__body">
      <ABgImages v-bind="{...bgImages[0]}" />
      <MFormCertActivate
        :title
        :cert-amount="certAmount"
        :cert-code="certCode"
        :action-params="actionParams"
        :show-cert-fields="showCertFields"
      />
      <div class="s-certificate-activate__info">
        <div
          class="s-certificate-activate__first-descr"
          v-html="firstDescr"
        />
        <div
          class="s-certificate-activate__second-descr"
          v-html="secondDescr"
        />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SCertificateActivate.scss';
</style>
