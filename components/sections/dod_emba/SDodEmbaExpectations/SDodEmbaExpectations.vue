<script lang="ts" setup>
interface Props {
  title: string
  cards: {
    name: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection
    class="s-dodemba-expectations"
    :title="title"
  >
    <div class="s-dodemba-expectations__scroll-wrapper">
      <ul class="s-dodemba-expectations__body">
        <li
          v-for="(card, i) in cards"
          :key="card.name"
          class="s-dodemba-expectations__card"
        >
          <AImg
            src="/img/dod_emba/exp_card_bg.webp"
            class="s-dodemba-expectations__bg"
            alt="bg"
          />
          <div
            class="s-dodemba-expectations__top"
            v-html="card.name"
          />
          <div class="s-dodemba-expectations__bottom">
            <div class="s-dodemba-expectations__number">
              {{ formatNumberWithLeadingZero(i + 1) }}
            </div>
            <ASvgMono
              name="dodemba-exp"
              class="s-dodemba-expectations__icon"
            />
          </div>
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaExpectations.scss';
</style>
