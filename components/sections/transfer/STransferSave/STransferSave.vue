<script lang="ts" setup>
interface Props {
  title: string
  subtitle: string
  tags: {
    tag: string
  }[]
  btnText: string
  text: string
  imageLg: string
  imageMd: string
  imageSm: string
  routeName?: string
}

defineProps<Props>();
</script>

<template>
  <MSection
    class="s-transfer-save"
  >
    <div class="s-transfer-save__body">
      <div class="s-transfer-save__left">
        <div class="s-transfer-save__content">
          <div
            class="s-transfer-save__subtitle a-font_h5"
            v-html="subtitle"
          />
          <picture class="s-transfer-save__img-tablet">
            <source
              :srcset="imageMd"
              media="(min-width: 768px)"
            >
            <AImg
              :src="imageSm"
              :alt="title"
            />
          </picture>
          <ul class="s-transfer-save__tags">
            <li
              v-for="item in tags"
              :key="item.tag"
              class="s-transfer-save__tag"
            >
              {{ item.tag }}
            </li>
          </ul>
          <AButton
            class="s-transfer-save__btn"
            to="/thanks"
          >
            {{ btnText }}
          </AButton>
        </div>
        <AImg
          :src="imageLg"
          :alt="title"
          class="s-transfer-save__lg-bg"
        />
      </div>
      <div class="s-transfer-save__right">
        <div
          class="s-transfer-save__title a-font_h3"
          v-html="title"
        />
        <div
          class="s-transfer-save__text"
          v-html="text"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STransferSave';
</style>
