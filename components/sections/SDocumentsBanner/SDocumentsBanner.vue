<script setup lang='ts'>
import type { SectionConditionalGroup } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  text?: string;
  entity?: { id: number, url: string }
}

const {
  conditionalGroup = [],
  entity,
  text = 'По&nbsp;окончании вы получите диплом о&nbsp;профессиональной переподготовке или&nbsp;именной сертификат, который действительно котируется на&nbsp;рынке труда и&nbsp;выгодно выделяет вас среди других соискателей',
} = defineProps<Props>();

const isChildDirection = entity?.url.includes('detiam');

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const modifiedText = isChildDirection ? 'По&nbsp;окончании обучения ребёнок получит сертификат, который можно добавить в&nbsp;портфолио: он пригодится при&nbsp;поступлении в&nbsp;профильный класс, колледж или&nbsp;вуз, а&nbsp;также при&nbsp;устройстве на&nbsp;стажировку или&nbsp;работу' : text;
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-documents-banner"
  >
    <h2 class="a-font_h3">Документ об обучении</h2>
    <p
      class="a-font_h6 s-documents-banner__text"
      v-html="modifiedText"
    />
    <picture>
      <source
        media="(min-width: 1200px)"
        srcset="/img/courses/document_lg.webp"
      >
      <source
        media="(min-width: 768px)"
        srcset="/img/courses/document_md.webp"
      >
      <AImg
        src="/img/courses/document_sm.webp"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </picture>
  </MSection>
</template>

<style scoped lang='scss'>
@import "./SDocumentsBanner.scss";
</style>
