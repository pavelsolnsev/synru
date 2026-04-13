<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';
import CardImage01 from '~/assets/images/business_program/for_who/0-1.webp';
import CardImage02 from '~/assets/images/business_program/for_who/0-2.webp';
import CardImage11 from '~/assets/images/business_program/for_who/1-1.webp';
import CardImage12 from '~/assets/images/business_program/for_who/1-2.webp';
import CardImage21 from '~/assets/images/business_program/for_who/2-1.webp';
import CardImage22 from '~/assets/images/business_program/for_who/2-2.webp';
import CardImage31 from '~/assets/images/business_program/for_who/3-1.webp';
import CardImage32 from '~/assets/images/business_program/for_who/3-2.webp';

interface Props {
  entity: MbaProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const forWho = entity.customFields.mba_program_who || [];

const cardImagesMapping: Record<string, string[]> = {
  0: [CardImage01, CardImage02],
  1: [CardImage11, CardImage12],
  2: [CardImage21, CardImage22],
  3: [CardImage31, CardImage32],
};

const forWhoItems = forWho
  .filter((item) => Boolean(item.title))
  .map((item, index) => {
    return {
      title: item.title ?? '',
      value: item.percent ?? '',
      images: cardImagesMapping[index] ?? cardImagesMapping[0],
    };
  });
</script>

<template>
  <MSection
    v-if="forWhoItems.length"
    class="s-for-who"
    title="Для кого программа"
  >
    <div class="s-for-who__grid">
      <div
        v-for="item, index in forWhoItems"
        :key="index"
        class="s-for-who__card"
      >
        <div class="s-for-who__card-top">
          <ANum
            classes="a-font_l-m"
            :num="formatNumberWithLeadingZero(index + 1)"
          />
          <span
            class="s-for-who__card-precent a-font_l-m"
            v-html="item.value"
          />
          <span class="s-for-who__card-imgs">
            <AImg
              v-for="src in item.images"
              :key="src"
              :src
              alt="card"
            />
          </span>
        </div>

        <h6
          class="s-for-who__card-title a-font_h6"
          v-html="item.title"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaForWho.scss';
</style>
