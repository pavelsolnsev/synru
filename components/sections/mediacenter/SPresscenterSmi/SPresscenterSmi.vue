<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import type { MediaMentionResponse } from '~/server/api/media-mentions';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const title = 'СМИ о нас';
const description = 'Публикации';
const SMI_IMAGE = synergyApi('uploads/images/mediacenter/smi/nivkova.png');
const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const PER_PAGE = 9;
const INITIAL_PAGE_NUMBER = 1;

const currentPage = shallowRef(INITIAL_PAGE_NUMBER);

const { data: rawMediaMentions, status } = await useFetch<MediaMentionResponse>('/api/media-mentions', {
  watch: [currentPage],
  query: {
    'page[size]': PER_PAGE,
    'page[number]': currentPage,
    'sort': '-published_at',
    'filter[published]': true,
  },
});

const showFetchMoreButton = computed(() => {
  if (!rawMediaMentions.value) return false;

  return currentPage.value < rawMediaMentions.value.meta?.last_page;
});

const mediaMentions = shallowRef(formatMediaMentions(rawMediaMentions.value));

watch(rawMediaMentions, () => {
  mediaMentions.value = [
    ...mediaMentions.value,
    ...formatMediaMentions(rawMediaMentions.value),
  ];
});

function formatMediaMentions(mediaMentions: MediaMentionResponse | null) {
  if (!mediaMentions) return [];

  return mediaMentions.data.map(({ attributes, id }) => {
    const date = attributes.published_at?.split(' ')?.at(0) ?? '';
    return {
      index: Number(id),
      href: attributes.url,
      title: attributes.title,
      date: date,
      source: attributes.source_name ?? '',
      text: attributes.annotation,
    };
  });
}
</script>

<template>
  <SPresscenterMain
    :title
    :description
    :breadcrumbs
    :pending="status === 'pending'"
  >
    <MSmiCard
      v-for="card in mediaMentions"
      :key="card.index"
      v-bind="card"
    />
    <template #bottom>
      <AButtonThird
        v-if="showFetchMoreButton"
        class="--more-btn"
        @click="currentPage +=1"
      >
        Показать ещё
      </AButtonThird>

      <MSmiContacts
        :image="SMI_IMAGE"
        show-tel
      />
    </template>
  </SPresscenterMain>
</template>

<style lang="scss" scoped>
@import './SPresscenterSmi.scss';
</style>
