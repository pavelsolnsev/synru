<script setup lang="ts">
import toPascalCase from '~/utils/toPascalCase';
import redirectToHomepage from '~/utils/redirectToHomepage';
import type { ShallowRef } from 'vue';
import type { PageResource, PageAttributesObject } from '~/types/entities';
import type { FetchError } from 'ofetch';

const route = useRoute();

const path = ref(route.path);

const sections: ShallowRef<PageAttributesObject['sections']> = shallowRef([]);

const entity: Ref<PageAttributesObject['entity']> = ref(null);
const routeName = ref('');

const { data: pageData, error } = await useFetch<{ data: PageResource }, FetchError>(`/api/sections`, {
  deep: false,
  watch: false,
  immediate: true,
  query: {
    path: path.value,
  },
});

if (error.value && error.value?.statusCode === 404) {
  console.error(JSON.stringify({
    statusCode: 404,
    message: error.value.message,
    errorData: error.value.data?.data,
    path: path.value,
  }));

  await redirectToHomepage();
}

if (error.value) {
  throwFetchError({ error: error.value, path: path.value });
};

if (!pageData.value) {
  if (import.meta.client) {
    console.error(`No PageData, path:${path.value}`);
    window?.location?.reload();
  }
}

const entityClass = pageData.value?.data?.attributes?.entity_class;
const pageEntity = pageData.value?.data?.attributes?.entity;

if (entityClass && !pageEntity) {
  const message = `No PageEntityData, path: ${path.value}`;

  console.error(JSON.stringify({
    statusCode: 404,
    message,
  }));

  await redirectToHomepage();
}

sections.value = pageData.value?.data?.attributes?.sections ?? [];
entity.value = pageEntity ?? null;
routeName.value = pageData.value?.data?.attributes?.route_name ?? '';

const hasEntity = entity.value && Object.keys(entity.value).length > 0;
const entityProperties = hasEntity && entity.value?.properties;
const pageProperties = pageData.value?.data?.attributes?.properties;

const rawTitle = computed(() => {
  if (entityProperties && entityProperties.title) {
    return (entityProperties.title as string)?.replaceAll('  ', ' ');
  }

  if (pageProperties && pageProperties.title) {
    return pageProperties.title.replaceAll('  ', ' ');
  }

  if (hasEntity) {
    const title = entity.value?.name
      ?? entity.value?.title as string
      ?? '';

    return title.replaceAll('  ', ' ');
  }

  return pageData.value?.data?.attributes?.name
    ? pageData.value.data.attributes.name.replaceAll('  ', ' ')
    : 'Демо образовательного портала';
});

const seoTitle = computed(() => {
  if (rawTitle.value?.endsWith('-')) return (rawTitle.value as string).slice(0, -1);

  const suffix = ' | Демо / портфолио';
  if (rawTitle.value?.toLowerCase()?.includes('демо')) return rawTitle.value;

  return rawTitle.value + suffix;
});

const seoDescription = computed(() => {
  if (entityProperties && entityProperties.description) {
    return (entityProperties.description as string).replaceAll('  ', ' ');
  }

  if (pageProperties && pageProperties.description) {
    return pageProperties.description.replaceAll('  ', ' ');
  }

  if (hasEntity) {
    const title = entity.value?.name
      ?? entity.value?.title as string
      ?? '';

    return title.replaceAll('  ', ' ');
  }

  return pageData.value?.data?.attributes?.name
    ? pageData.value.data.attributes.name.replaceAll('  ', ' ')
    : '';
});

const { createdAt, updatedAt } = getPageDates(entity.value, pageData.value);

useSeoMeta({
  title: () => (seoTitle.value as string),
  description: () => (seoDescription.value as string),
});

type sectionItems = PageAttributesObject['sections'][number]['items'];

function getClearAttributes(items: sectionItems): Record<string, unknown> {

  const attributesObject = items instanceof Object && items !== null ? Object.fromEntries(
    Object.entries(items).filter(([, value]) => !!value),
  ) : {};

  attributesObject.hasEntity = false;

  attributesObject.pageName = pageData.value?.data?.attributes.name;

  attributesObject.routeName = toRaw(routeName.value);

  if (!entity.value) return attributesObject;

  const rawEntity = toRaw(entity.value);

  rawEntity.customFields = Object.hasOwn(rawEntity, 'custom_field_values') ? mapCustomFields(rawEntity.custom_field_values) : {};

  attributesObject.entity = rawEntity;
  attributesObject.hasEntity = true;

  return attributesObject;
}

function getPageDates(entity: PageAttributesObject['entity'], pageData: { data: PageResource } | null) {
  if (!pageData) return { createdAt: '', updatedAt: '' };

  const formatDate = (dateString: string) => {
    const [date, time] = dateString.split(' ');

    return `${date.split('.').reverse().join('-')} ${time}`;
  };

  const createdAt = entity?.created_at as string || pageData?.data?.attributes?.created_at;
  const updatedAt = entity?.updated_at as string || pageData?.data?.attributes?.updated_at;

  return {
    createdAt: createdAt ? formatDate(createdAt) : '',
    updatedAt: updatedAt ? formatDate(updatedAt) : '',
  };
}
</script>

<template>
  <template
    v-for="(section, idx) in sections"
    :key="`${section.key}_${idx}`"
  >
    <component
      :is="toPascalCase(section.key)"
      v-bind="getClearAttributes(section.items)"
    />
  </template>
  <div
    style="display: none"
    itemscope
    itemtype="https://schema.org/WebPage"
  >
    <meta
      v-if="createdAt"
      itemprop="datePublished"
      content="2013-08-14 09:38:00"
    >
    <meta
      v-if="updatedAt"
      itemprop="dateModified"
      content="2024-12-02 13:06:26"
    >
  </div>
</template>
