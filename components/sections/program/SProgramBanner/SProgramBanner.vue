<script setup lang="ts">
import { KEYS } from '~/constants';
import type { ProgramEntity } from '~/types';
import type { ProgramInfoResponse } from '../SProgramIntro/SProgramIntro.vue';

interface Props {
  title?: string;
  description?: string;
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  hasEntity?: boolean;
  entity?: ProgramEntity | null;
}

const {
  entity = null,
  title = '',
  description = '',
  imageLg = '',
  imageMd = '',
  imageSm = '',
} = defineProps<Props>();

/**
 * Кеширование запроса аналогично SProgramIntro
 */
const query = {
  'include': 'faculty.customFieldValues,level,forms',
};

const { data: rawData } = await useFetch<ProgramInfoResponse>(`/api/programs/getProgramById/${entity?.id}`, {
  key: `${KEYS.PROGRAM}${entity?.id}${JSON.stringify(query)}`,
  query,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

    return data ? data : undefined;
  },
  deep: false,
  watch: false,
});

const NOT_SHOW_SECTION_PROGRAM_ID = ['196', '111', '100', '75', '192', '234'];

const SECOND_HIGHEST_LEVEL_SLUG = 'second_highest';
const programLevelSlug = getProgramLevelSlug(rawData.value);
const programId = entity?.id ? String(entity.id) : '';
const isShowSection = programLevelSlug === SECOND_HIGHEST_LEVEL_SLUG && !NOT_SHOW_SECTION_PROGRAM_ID.includes(programId);

function getProgramLevelSlug(data: ProgramInfoResponse | null) {
  if (!data) return null;

  const level = data.included.find((item) =>item.type === 'levels');

  if (level) return level.attributes.slug;
}
</script>

<template>
  <SBanner
    v-if="isShowSection"
    title-class="a-font_h3"
    :title
    :description
    :image-lg
    :image-md
    :image-sm
  >
    <div class="s_banner__years a-font_h5">
      <span>4,5 года</span>
      <ASvgMono name="simple-arrow" />
      <span>3 года</span>
    </div>
  </SBanner>
</template>

<style lang="scss" scoped>
@import './SProgramBanner.scss';
</style>
