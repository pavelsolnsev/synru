<script lang="ts" setup>
interface Props {
  title: string
  subtitle: string
  button?: string
  link?: string
}

defineProps<Props>();
</script>

<template>
  <MSection class="s-dodemba-tg">
    <div class="s-dodemba-tg__body">
      <div class="s-dodemba-tg__left">
        <AImg
          src="/img/dod_emba/tg_pt1_lg.webp"
          alt="bg"
          class="s-dodemba-tg__bg s-dodemba-tg__bg_lg"
        />
        <AImg
          src="/img/dod_emba/tg_pt1_md.webp"
          alt="bg"
          class="s-dodemba-tg__bg s-dodemba-tg__bg_md"
        />
        <AImg
          src="/img/dod_emba/tg_pt1_sm.webp"
          alt="bg"
          class="s-dodemba-tg__bg s-dodemba-tg__bg_sm"
        />
        <div
          class="s-dodemba-tg__title"
          v-html="title"
        />
        <div
          class="s-dodemba-tg__subtitle"
          v-html="subtitle"
        />
        <AButton
          v-if="link && button"
          :to="link"
          external
          class="s-dodemba-tg__button"
        >
          <span>{{ button }}</span>
          <ASvgMono
            name="arrow_outward"
            class="s-dodemba-tg__button-icon"
          />
        </AButton>
      </div>
      <div class="s-dodemba-tg__right">
        <AImg
          src="/img/dod_emba/tg_pt2_lg.webp"
          alt="bg"
          class="s-dodemba-tg__bg s-dodemba-tg__bg_lg"
        />
        <AImg
          src="/img/dod_emba/tg_pt2_md.webp"
          alt="bg"
          class="s-dodemba-tg__bg s-dodemba-tg__bg_md"
        />
        <AImg
          src="/img/dod_emba/tg_pt2_sm.webp"
          alt="bg"
          class="s-dodemba-tg__bg s-dodemba-tg__bg_sm"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaTg.scss';
</style>
