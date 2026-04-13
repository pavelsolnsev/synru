<script setup lang='ts'>
interface FormCustomFields {
  title: string;
  subtitle: string;
  description: string;
  tags: { name: string }[];
  imageLg: string;
  imageMd: string;
  imageSm: string;
  text: string;
  formTitle: string;
  formSubtitle: string;
  btnText: string;
  actionParams: { param: string }[];
}

interface Props {
  title?: string;
  titleClass?: string;
  subtitle?: string;
  subtitleClass?: string;
  tags: { name: string }[];
  btnText?: string;
  imageLg: string;
  imageSm: string;
  actionParams?: { param: string }[],
  entity: {
    customFields?: {
      [key: string]: Array<FormCustomFields>;
    };
  };
}

const props = defineProps<Props>();

const seoPresentation = props.entity.customFields?.['seo-presentation'].at(0);

const title = seoPresentation?.title || props.title;
const titleClass = props.titleClass || 'a-font_h2';
const subtitle = props.subtitle || seoPresentation?.subtitle;
const subtitleClass = props.subtitleClass || 'a-font_h6';
const tags = seoPresentation?.tags || props.tags;
</script>

<template>
  <SFormFullBg
    :title
    :title-class
    :subtitle
    :subtitle-class
    :tags
    :btn-text
    :image-lg
    :image-sm
    :action-params
  />
</template>

