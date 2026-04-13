<script setup lang="ts">
import FirstImageLG from '~/assets/images/m-help-choose-card/m-help-choose-card-first-lg.webp';
import FirstImageLGArticle from '~/assets/images/m-help-choose-card/m-help-choose-card-first-lg--article.webp';
import FirstImageMd from '~/assets/images/m-help-choose-card/m-help-choose-card-first-sm.webp';
import FirstImageSm from '~/assets/images/m-help-choose-card/m-help-choose-card-first-sm.webp';
import SecondImageLg from '~/assets/images/m-help-choose-card/m-help-choose-card-second-lg.webp';
import SecondImageMd from '~/assets/images/m-help-choose-card/m-help-choose-card-second-md.webp';
import SecondImageSm from '~/assets/images/m-help-choose-card/m-help-choose-card-second-sm.webp';

interface Props {
  title?: string;
  titleClass?: string;
  description?: string;
  descriptionClass?: string;
  text?: string;
  textClass?: string;
  btn?: string;
  formTitle?: string;
  formDescription?: string;
  formBtn?: string;
  actionParams?: { param: string }[]
  variant?: Variant;
  formId: string;
  routeName?: string;
  isArticlePage?: boolean;
  imgLg?: string;
  imgMd?: string;
  imgSm?: string;
  colorType?: 'black' | 'white';
}

type Variant = 'first' | 'second';

type Size = 'sm' | 'md' | 'lg';

const {
  title = '',
  titleClass = 'a-font_h4',
  description = '',
  descriptionClass = '',
  text = '',
  textClass = '',
  btn = 'Помогите выбрать',
  formTitle,
  formDescription = '',
  formBtn = 'Отправить',
  variant = 'first',
  actionParams = [],
  formId,
  routeName = '',
  isArticlePage = false,
  imgLg = '',
  imgMd = '',
  imgSm = '',
  colorType = 'black',
} = defineProps<Props>();

const imageLg = getImage({ customImage: imgLg, variant, size: 'lg' });
const imageMd = getImage({ customImage: imgMd, variant, size: 'md' });
const imageSm = getImage({ customImage: imgSm, variant, size: 'sm' });

const setDescriptionClass = 
  descriptionClass ?
  descriptionClass :
  variant === 'first' ? 
  'a-font_m-m' : 
  'a-font_s-m';

const setTextClass = 
  textClass ?
  textClass :
  variant === 'first' ? 
  'a-font_m-m' : 
  'a-font_s-m';

function getImage(data: { customImage: string, variant: Variant, size: Size }) {
  const {
    customImage,
    variant,
    size,
  } = data;

  const defaultImages: Record<Variant, Record<Size, string>> = {
    first: {
      lg: isArticlePage ? FirstImageLGArticle : FirstImageLG,
      md: FirstImageMd,
      sm: FirstImageSm,
    },
    second: {
      lg: SecondImageLg,
      md: SecondImageMd,
      sm: SecondImageSm,
    },
  };

  return customImage ? customImage : defaultImages[variant][size];
};

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: formTitle,
    subtitle: formDescription,
    btn: formBtn,
    formPhone: true,
    routeName: routeName,
    actionParams: actionParams,
  });
}
</script>

<template>
  <div
    class="m-help-choose-card"
    :class="[
      `${variant === 'first' ? '--first' : '--second'}`,
      `--color-${colorType}`,
      `${isArticlePage ? '--is-article-page': ''}`
    ]"
  >
    <div
      class="m-help-choose-card__title"
      :class="titleClass"
      v-html="title"
    />
    <div
      class="m-help-choose-card__description"
      :class="setDescriptionClass"
      v-html="description"
    />
    <div
      v-if="text"
      class="m-help-choose-card__text"
      :class="setTextClass"
      v-html="text"
    />
    <AButton
      size="md"
      :bg-color="colorType === 'black' ? 'red' : 'black'"
      @click="openForm()"
    >
      <span v-html="btn" />
    </AButton>
    <picture
      class="m-help-choose-card__img"
    >
      <source
        v-if="imageLg"
        :srcset="imageLg"
        media="(min-width: 1200px)"
      >
      <source
        v-if="imageMd"
        :srcset="imageMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="imageSm"
        :alt="title"
        decoding="async"
        loading="lazy"
      />
    </picture>
  </div>
</template>

<style lang="scss" scoped>
@import './MHelpChooseCard.scss';
</style>
