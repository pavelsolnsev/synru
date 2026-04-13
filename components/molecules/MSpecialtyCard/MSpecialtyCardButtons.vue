<script setup lang="ts">
interface Props {
  isShowEnroll?: boolean;
  link?: string;
  price?: string;
  ico?: string;
  btnText?: string;
  partnerLogo?: string;
}

const {
  isShowEnroll = false,
  link = '',
  price = '',
  btnText = 'Поступить',
} = defineProps<Props>();

const emits = defineEmits(['enroll']);
</script>

<template>
  <div class="specialty-card__bottom">
    <AButton
      v-if="isShowEnroll && !price"
      class="specialty-card__apply"
      size="md"
      data-src="#s-programs-list-popup"
      @click.prevent.stop="emits('enroll')"
    >
      <span v-html="btnText" />
    </AButton>
    <AButton
      v-if="price"
      class="specialty-card__apply"
      size="md"
      data-src="#s-programs-list-popup"
      :to="link"
    >
      <span v-html="btnText" />
    </AButton>
    <span
      v-if="price"
      class="specialty-card__price a-font_l-m"
      v-html="`${price} ₽`"
    />
    <AImg
      v-if="partnerLogo"
      class="specialty-card__partner-logo"
      :src="partnerLogo"
      decoding="async"
      loading="lazy"
    />
    <span
      v-if="ico && !partnerLogo"
      class="specialty-card__ico"
    >
      <ASvgMono :name="ico" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import './MSpecialtyCard.scss';
</style>
