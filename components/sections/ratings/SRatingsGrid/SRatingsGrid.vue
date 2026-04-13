<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { raitings as defaultRatings } from '~/components/sections/SInfoRatings/rationgs-data';

interface Props {
  title?: string;
  rating?: Rating[]
}

interface Rating {
  name: string;
  organization: string;
  logo: string;
  year: string;
  position: string | number;
  difference: string;
  articleLink?: string;
  image?: string;
}

const {
  title = '',
  rating: propsRatings = [],
} = defineProps<Props>();

const rating = propsRatings?.length
  ? propsRatings
  : defaultRatings;

const defaultImage = synergyApi('uploads/content/s-ratings/star.svg');
</script>

<template>
  <MSection
    v-if="rating.length"
    :title
  >
    <div class="ratings__list">
      <div class="ratings__list-wrap">
        <NuxtLink
          v-for="item in rating"
          :key="item.name"
          target="_blank"
          :to="item.articleLink"
        >
          <MRatingCard
            class="s-ratings__slide"
            :position="item.position"
            :organization="item.organization"
            :year="item.year"
            :image="item.image ?? defaultImage"
            :name="item.name"
          />
        </NuxtLink>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SRatingsGrid.scss';
</style>
