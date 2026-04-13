<script setup lang="ts">
import { DIPLOMAS } from '~/constants';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  img?: string;
  doc?: string;
  icons?: { name: string }[];
}

defineProps<Props>();

const { openModal } = useModalStore();
</script>

<template>
  <MSection
    class="s-benefits-docs"
  >
    <div class="s-benefits-docs__grid">
      <picture
        v-if="img"
        class="s-benefits-docs__img"
      >
        <AImg
          :src="img"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>

      <div
        v-if="doc"
        @click="openModal('MModalInline', {src: DIPLOMAS[doc as keyof typeof DIPLOMAS].file})"
        class="s-benefits-docs__doc"
      >
        <span
          class="a-font_l"
          v-html="DIPLOMAS[doc as keyof typeof DIPLOMAS].txt"
        />
        <AImg
          :src="DIPLOMAS[doc as keyof typeof DIPLOMAS].thumb"
          alt="document"
          loading="lazy"
          decoding="async"
        />
        <ASvgMono name="simple-plus" />
      </div>

      <div class="s-benefits-docs__text">
        <h2
          v-if="title"
          :class="[titleClass || 'a-font_h3', 's-benefits-docs__text-title']"
          v-html="title"
        />
        <div
          v-if="text"
          :class="[textClass || 'a-font_h6', 's-benefits-docs__text-text']"
        >
          <div
            v-html="text"
          />
          <span
            class="s-benefits-docs__text-icons"
          >
            <ASvgMono
              v-for="item in icons"
              :key="item.name"
              :name="item.name"
            />
          </span>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" src="./SBenefitsDocs.scss" scoped />
