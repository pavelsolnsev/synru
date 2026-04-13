<script setup lang="ts">
import type { FormBgColor } from '~/types';

interface Tag {
  name: string;
  to?: string;
}

interface FormCustomFields {
  title: string;
  subtitle: string;
  description: string;
  tags: Tag[];
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
  subtitle?: string;
  descClass?: string;
  description?: string;
  text?: string;
  tags?: Tag[];
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  bgColor?: string;
  formTitle?: string;
  titleClass?: string;
  formSubtitle?: string;
  formMail?: boolean;
  formBgColor?: FormBgColor;
  btnText?: string;
  actionParams?: { param: string }[],
  customField?: string;
  entity: {
    customFields?: {
      [key: string]: Array<FormCustomFields>;
    };
  };
  routeName?: string;
}

const props = defineProps<Props>();

const formField = props.customField || '';

const title = getValue('title', formField) as string;
const descClass = getValue('descClass', formField) as string;
const description = getValue('description', formField) as string;
const subtitle = getValue('subtitle', formField) as string;
const text = getValue('text', formField) as string;
const tags = getValue('tags', formField) as Tag[];
const imageSm = getValue('imageSm', formField) as string;
const imageMd = getValue('imageMd', formField) as string;
const imageLg = getValue('imageLg', formField) as string;
const bgColor = getValue('bgColor', formField) as string;
const formTitle = getValue('formTitle', formField) as string;
const titleClass = getValue('titleClass', formField, 'a-font_h3') as string;
const formSubtitle = getValue('formSubtitle', formField) as string;
const formMail = getValue('formMail', formField, false) as boolean;
const formBgColor = getValue('formBgColor', formField, 'transparent') as FormBgColor;
const btnText = getValue('btnText', formField) as string;
const actionParams = getValue('actionParams', formField, []) as { param: string }[];

function getValue(fieldName: string, customFieldName: string, defaultValue: unknown = '') {
  if (!customFieldName) {
    return props[fieldName as keyof Props] || defaultValue;
  }

  const customFieldsObj = typeof props.entity.customFields !== 'undefined' ? props.entity?.customFields[customFieldName]?.at(0) : {};

  const fieldValue: unknown = typeof customFieldsObj !== 'undefined' && typeof customFieldsObj[fieldName as keyof typeof customFieldsObj] !== 'undefined' ? customFieldsObj[fieldName as keyof typeof customFieldsObj] : false;

  if (!fieldValue) {
    return props[fieldName as keyof Props] || defaultValue;
  }

  if (Array.isArray(fieldValue)) {
    return fieldValue.length ? fieldValue : (props[fieldName as keyof Props] || defaultValue);
  }

  return fieldValue;
}
</script>


<template>
  <SForm
    :title
    :desc-class
    :description
    :subtitle
    :text
    :tags
    :image-sm
    :image-md
    :image-lg
    :bg-color
    :form-title
    :title-class
    :form-subtitle
    :form-mail
    :form-bg-color
    :btn-text
    :action-params
    :route-name
  />
</template>
