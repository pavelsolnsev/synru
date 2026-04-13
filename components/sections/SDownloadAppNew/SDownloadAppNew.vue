<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  showProfBanner?: boolean;
  showAlternativeBanner?: boolean;
  showCustomBanner?: boolean;
  showProgrammsBanner?: boolean;
  customImgLg?: string;
  customImgMd?: string;
  customImgSm?: string;
  routeName?: string;
  entity?: { id?: number };
}

const {
  showProfBanner,
  showAlternativeBanner,
  showCustomBanner,
  entity,
} = defineProps<Props>();

const conditionalGroup: SectionConditionalGroup[] = [{
  conditional: '04/25/2026 12:00:00',
  conditionalType: 'beforeDate',
}];

const showDodBanner = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const componentLeft = showDodBanner ? 'BannerDod' : showProfBanner ? 'BannerProf' : 'BannerLka';

const componentRight = showAlternativeBanner
  ? 'BannerAlternative'
  : showCustomBanner
    ? 'BannerCustom'
    : 'BannerProgram';
</script>

<template>
  <MSectionNewResponsive class="s-download-app-new">
    <div class="s-download-app-new__grid">
      <component :is="componentLeft" />
      <component
        :is="componentRight"
        :custom-img-lg="customImgLg"
        :custom-img-md="customImgMd"
        :custom-img-sm="customImgSm"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" src="./SDownloadAppNew.scss" scoped />

