<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import BgImageLg from '~/assets/images/s_result_docs/s_result_docs_lg.webp';
import BgImageMd from '~/assets/images/s_result_docs/s_result_docs_md.webp';
import BgImageSm from '~/assets/images/s_result_docs/s_result_docs_sm.webp';

interface Props {
  isResponsive?: boolean,
  title?: string;
  description?: string;
  docs?: Doc[];
  docButtonText?: string;
  hideForm?: boolean;
  hideBg?: boolean;
  formText?: string;
  formButtonText?: string;
  entity?: {
    customFields?: {
      'seo-result-docs'?: Array<{
        isResponsive?: false,
        title: string;
        description: string;
        docs: Doc[];
        docButtonText: string;
        hideForm: true;
        formText: null;
        formButtonText: null;
        hideBg: true;
      }>;
      [key: string]: unknown;
    };
  }
}

interface Doc {
  title: string;
  link: string;
  image: string;
}

const props = defineProps<Props>();

let {
  title = '',
  description = '',
  docs = [],
  docButtonText = '',
  hideForm = false,
  hideBg = false,
  formText = '',
  formButtonText = '',
  entity = {},
} = props;

if (entity?.customFields?.['seo-result-docs']) {
  title = entity.customFields?.['seo-result-docs'].at(0)?.title || (title || '');
  description = entity.customFields?.['seo-result-docs'].at(0)?.description || (description || '');
  docs = entity.customFields?.['seo-result-docs'].at(0)?.docs || (docs || []);
  docButtonText = entity.customFields?.['seo-result-docs'].at(0)?.docButtonText || (docButtonText || '');
  hideForm = entity.customFields?.['seo-result-docs'].at(0)?.hideForm || (hideForm || false);
  hideBg = entity.customFields?.['seo-result-docs'].at(0)?.hideBg || (hideBg || false);
  formText = entity.customFields?.['seo-result-docs'].at(0)?.formText || (formText || '');
  formButtonText = entity.customFields?.['seo-result-docs'].at(0)?.formButtonText || (formButtonText || '');
}

const { openModal } = useModalStore();

function openDoc(src: string) {
  if (!src) return;

  const component = isImage(src) ? 'MModalInline' : 'MModalIframe';
  openModal(component, {
    src: src
  });
}

function isImage(src: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(src);
}
</script>

<template>
  <component
    :is="isResponsive ? 'MSectionNewResponsive' : 'MSection'"
    class="s-result-docs"
    :class="{'--section-responsive': isResponsive}"
  >
    <div
      class="s-result-docs__banner"
      :class="{ '--dark': hideBg }"
    >
      <picture v-if="!hideBg">
        <source
          :srcset="BgImageLg"
          media="(min-width:1200px)"
        >
        <source
          :srcset="BgImageMd"
          media="(min-width:768px)"
        >
        <AImg
          :src="BgImageSm"
          alt="result-img"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-result-docs__desc">
        <h3
          class="a-font_h3"
          v-html="title"
        />
        <p
          class="a-font_h6"
          v-html="description"
        />
      </div>
    </div>

    <div
      class="s-result-docs__links"
      :class="docs.length === 1 ? 'single' : undefined"
    >
      <div
        v-for="doc in docs"
        :key="doc.link"
        class="s-result-docs__link"
        @click="openDoc(doc.link)"
      >
        <AImg
          alt="doc"
          decoding="async"
          :src="doc.image"
          loading="lazy"
        />
        <div
          class="s-result-docs__link-title a-font_xs"
          v-html="doc.title"
        />
        <ASvgMono name="simple-plus" />
      </div>
    </div>

    <div class="s-result-docs__item">
      <swiper
        class="s-result-docs__slider"
        :modules="[Pagination, Navigation, EffectFade]"
        :grab-cursor="true"
        :slides-per-view="1"
        :free-mode="false"
        effect="fade"
        :fade-effect="{crossFade: true}"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :pagination="{
          el: '.s-result-docs__slider .swiper-pagination',
          type: 'fraction',
        }"
      >
        <swiper-slide
          v-for="doc in docs"
          :key="doc.link"
        >
          <p
            class="s-result-docs__item-title a-font_h6"
            v-html="doc.title"
          />
          <div class="s-result-docs__item-image">
            <AImg
              :src="doc.image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <AButtonSecond
            bg-color="transparent"
            @click="openDoc(doc.link)"
          >
            <span v-html="docButtonText" />
          </AButtonSecond>
        </swiper-slide>
        <div class="swiper-navigation">
          <div class="swiper-pagination a-font_l" />
          <div class="swiper-button-prev">
            <ASvgMono name="simple-arrow" />
          </div>
          <div class="swiper-button-next">
            <ASvgMono name="simple-arrow" />
          </div>
        </div>
      </swiper>
    </div>

    <SFormMin
      v-if="!hideForm"
      title-class="a-font_h3"
      subtitle=""
      bg-color="red"
      show-logo
      :title="formText"
      :btn="formButtonText"
      :action-params="[
        {param: 'grcampaign=e_mail_chain_vpo'},
        {param: 'form=main_budget'},
        {param: 'target_name=ab_main'},

      ]"
    />
  </component>
</template>

<style lang="scss" scoped>
@import './SResultDocs.scss';
</style>
