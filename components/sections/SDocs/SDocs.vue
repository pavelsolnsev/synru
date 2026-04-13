<script setup lang="ts">
import type { Fonts, FormBgColor } from '~/types';

interface DocItem {
  icon: string;
  title: string;
  image: string;
}

interface Props {
  title?: string;
  titleClass?: Fonts;
  subtitle?: string;
  text?: string;
  docs?: DocItem[];
  showForm?: boolean;
  formTitle?: string;
  formTitleClass?: Fonts;
  formSubtitle?: string;
  formSubtitleClass?: Fonts;
  formBgColor?: FormBgColor | [];
  formBtn?: string;
  formShowLogo?: boolean;
  formActionParams?: { param: string }[]
}

const {
  title,
  titleClass,
  subtitle,
  text,
  docs = [],
  showForm = false,
  formTitle,
  formTitleClass = 'a-font_h3',
  formSubtitle,
  formSubtitleClass = 'a-font_h6',
  formBgColor,
  formBtn = 'Подать заявку',
  formShowLogo = false,
  formActionParams = [],
} = defineProps<Props>();

const normalizedFormBgColor = typeof formBgColor === 'string' ? formBgColor : undefined;

const { openModal } = useModalStore();
</script>

<template>
  <MSection
    v-if="docs?.length"
    id="s-docs"
    class="s-docs scroll-margin-top"
    :class="[showForm && '--form']"
  >
    <div class="s-docs__item">
      <h2
        v-if="title"
        :class="[
          's-docs__item-title',
          titleClass || 'a-font_h2'
        ]"
        v-html="title"
      />
      <p
        v-if="subtitle"
        class="s-docs__item-subtitle a-font_h5"
        v-html="subtitle"
      />
      <p
        v-if="text"
        class="s-docs__item-text a-font_h6"
        v-html="text"
      />
    </div>

    <div
      class="s-docs__items"
      :class="[showForm && '--form']"
    >
      <div
        v-for="item in docs"
        :key="item.title"
        class="s-docs__item s-docs__item-doc"
        data-class="--docs-popup"
        @click="openModal('MModalIframe', {src: item.image})"
      >
        <ASvgMono name="simple-plus" />
        <AImg
          :src="item.icon"
          :alt="item.title"
          decoding="async"
          loading="lazy"
          width="105"
          height="109"
        />
        <span
          class="s-docs__link-text a-font_l-m"
          v-html="item.title"
        />
      </div>
    </div>

    <MFormMin
      v-if="showForm"
      :title="formTitle"
      :title-class="formTitleClass"
      :subtitle="formSubtitle"
      :subtitle-class="formSubtitleClass"
      :bg-color="normalizedFormBgColor"
      :btn="formBtn"
      :show-logo="formShowLogo"
      :action-params="formActionParams"
    />
  </MSection>
</template>

<style lang="scss" src="./SDocs.scss" scoped />