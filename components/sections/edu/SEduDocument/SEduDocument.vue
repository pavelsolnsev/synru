<script setup lang="ts">
import type { CategoryResponse, DocumentsResponse, DocumentEntity } from '~/types/entities';
import generateCategoryBreadcrumbs from '~/utils/article/generateCategoryBreadcrumbs';

interface Props {
  entity?: DocumentEntity | null;
  routeName?: string;
}

const {
  entity = null,
  routeName = '',
} = defineProps<Props>();

const { data: documentData } = await useFetch<DocumentsResponse>(`/api/documents/${entity?.id}`, {
  query: {
    include: 'categories',
  },
});

const documentCategoryId = getDocumentCategoryId(documentData.value);

const { data: categoryData } = await useFetch<CategoryResponse>(`/api/categories/${documentCategoryId}`, {
  query: {
    include: 'ancestors',
    'filter[published]': true,
  },
});

const breadcrumbs = [
  ...generateCategoryBreadcrumbs({ routeName, entityId: documentCategoryId, categories: categoryData.value }),
  { title: entity?.name ?? '', link: '' },
];

function getDocumentCategoryId(res: DocumentsResponse | null) {
  if (!res || !res.included) return '';

  const categoryId = res.included[0]?.id;

  return categoryId;
}
</script>

<template>
  <SEduWrapper :breadcrumbs>
    <template #top>
      <SDocumentShow
        :title="entity?.name"
        :description="entity?.description"
        :link="entity?.link"
      />
    </template>
    <template #bottom>
      <SEduWrapperBottom />
    </template>
  </SEduWrapper>
</template>
