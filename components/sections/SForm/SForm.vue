<script setup lang="ts">
import type { FormBgColor, SectionConditionalGroup } from '~/types';
import { replaceYearInHTML } from '~/utils/replaceYearInHtml';

interface Tag {
  name: string;
  to?: string;
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
  routeName?: string;
  formClass?: string;
  noName?: boolean;
  btnBgColor?: 'red' | 'black' | 'white';
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number };
}

const {
  title = '',
  descClass = '',
  description = '',
  subtitle = '',
  text = '',
  tags = [],
  imageSm = '',
  imageMd = '',
  imageLg = '',
  bgColor = '',
  formTitle = '',
  titleClass = 'a-font_h3',
  formSubtitle = '',
  formMail = false,
  formBgColor,
  btnText = '',
  actionParams = [],
  routeName = '',
  formClass = '',
  noName = false,
  btnBgColor = 'red',
  conditionalGroup = [],
  entity,
} = defineProps<Props>();

const titleWithCurrentYear = title ? replaceYearInHTML(title) : '';
const subtitleWithCurrentYear = subtitle ? replaceYearInHTML(subtitle) : '';
const descriptionWithCurrentYear = description ? replaceYearInHTML(description) : '';

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>


<template>
  <MSection
    v-if="showSection"
    class="s-form"
    :class="formClass"
  >
    <div class="s-form__wrap">
      <div
        :class="[
          's-form__content',
          bgColor ? `s-form__content--bgColor-${bgColor}` : '',
        ]"
      >
        <h3
          class="s-form__title a-font_h4"
          v-html="titleWithCurrentYear"
        />

        <p
          v-if="subtitleWithCurrentYear"
          class="s-form__subtitle a-font_l-m"
          v-html="subtitleWithCurrentYear"
        />

        <div
          v-if="tags.length"
          class="s-form__tags"
        >
          <ATag
            v-for="(tag, index) in tags"
            :key="index"
            :text="tag.name"
            :variant="'blur'"
            :to="tag.to"
          />
        </div>

        <div
          v-if="$slots.tags"
          class="s-form__tags"
        >
          <slot name="tags" />
        </div>

        <div
          v-if="descriptionWithCurrentYear"
          :class="[descClass || 'a-font_h6', 's-form__desc']"
        >
          <slot name="description" />
          <span v-html="descriptionWithCurrentYear" />
        </div>

        <div
          v-if="text"
          class="s-form__text a-font_l-m"
          v-html="text"
        />

        <picture
          v-if="imageSm"
          class="s-form__image"
        >
          <source
            v-if="imageLg"
            media="(min-width: 1200px)"
            :srcset="imageLg"
          >
          <source
            v-if="imageMd"
            media="(min-width: 768px)"
            :srcset="imageMd"
          >
          <source :srcset="imageSm">
          <AImg
            :src="imageSm"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <slot name="presentation" />
      </div>

      <div class="s-form__form">
        <MForm
          :title="formTitle"
          :title-class
          :subtitle="formSubtitle"
          :subtitle-class="'a-font_h6'"
          :form-mail="formMail"
          :bg-color="formBgColor"
          :btn="btnText"
          :action-params
          :route-name
          :btn-bg-color
          :form-name="!noName"
        />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang="scss" src="./SForm.scss" />
