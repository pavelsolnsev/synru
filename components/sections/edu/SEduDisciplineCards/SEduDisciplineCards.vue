<script setup lang="ts">
import type { DocumentsResponse, CategoryEntity, CategoryResponse, CategoryRelationshipsObject } from '~/types/entities';
import generateCategoryBreadcrumbs from '~/utils/article/generateCategoryBreadcrumbs';

interface Props {
  entity?: CategoryEntity | null;
  routeName?: string;
}

const {
  entity = null,
  routeName = '',
} = defineProps<Props>();

const DOCUMENT_ENTITY_TYPE = 'App\\Models\\Document';

const IS_CATEGORY_DOCUMENT = entity?.entity_type === DOCUMENT_ENTITY_TYPE;

const { data: categoryData } = await useFetch<CategoryResponse>(`/api/categories/${entity?.id}`, {
  query: {
    'include': 'children,parent,ancestors',
    'sort': '-rank,-id',
    'filter[published]': true,
  },
});

const breadcrumbs = generateCategoryBreadcrumbs({ routeName, entityId: entity?.id ?? '', categories: categoryData.value });

const categoriesData = formatCategory(categoryData.value);

const parentCategory = getParentsCategories(categoryData.value);

const documentCategoriesIds = Object.keys(categoriesData);

const { data: documentsData } = await useFetch<DocumentsResponse>('/api/documents', {
  query: {
    'filter[categories.id]': IS_CATEGORY_DOCUMENT ? String(entity?.id) : documentCategoriesIds.join(','),
    'include': 'categories',
    'sort': '-rank,-id',
    'page[size]': 0,
  },
});

const categoriesDemoKIM = addDocumentsToCategories(documentsData.value, categoriesData);

const categoryFull = IS_CATEGORY_DOCUMENT ? getDocuments(documentsData.value) : {};

function formatCategory(res: CategoryResponse | null) {
  if (!res || !res.included) return {};

  return res.included.reduce((acc, item) => {
    if (item.attributes.entity_type !== DOCUMENT_ENTITY_TYPE) return acc;

    const category = {
      title: item.attributes.name,
      btnLink: item.attributes.url,
      documents: [],
    } as Category;

    acc[item.id] = category;

    return acc;
  }, {} as CategoryData);
}

function getParentsCategories(res: CategoryResponse | null) {
  const parentCategory: { title: string; tagTitle: string; to: string } = { title: '', tagTitle: '', to: '' };

  const ADDITIONAL_TITLE = 'учебный период';

  if (!res || !res.included || Array.isArray(res.data)) return parentCategory;

  if (IS_CATEGORY_DOCUMENT) {
    const documentCategoryParentId = res.data.relationships?.parent?.data?.id;

    if (!documentCategoryParentId) return parentCategory;

    const findParentDocumentCategory = res.included?.find((item) => String(item.id) === String(documentCategoryParentId));

    if (!findParentDocumentCategory) return parentCategory;

    parentCategory['title'] = `${findParentDocumentCategory.attributes?.name}: ${ADDITIONAL_TITLE}`;
    parentCategory['to'] = findParentDocumentCategory.attributes?.url as string;

    const parentDocumentRelationship = findParentDocumentCategory.relationships as CategoryRelationshipsObject;
    const nextParentId = parentDocumentRelationship?.parent?.data?.id;

    if (!nextParentId) return parentCategory;

    const findNextParentCategory = res.included?.find((item) => String(item.id) === String(nextParentId));

    if (!findNextParentCategory) return parentCategory;

    parentCategory['tagTitle'] = findNextParentCategory.attributes.name;

    return parentCategory;
  }

  const parentId = res.data.relationships?.parent?.data?.id;

  if (!parentId) return parentCategory;

  const findParent = res.included?.find((item) => String(item.id) === String(parentId));

  if (!findParent) return parentCategory;

  parentCategory['title'] = `${entity?.name}: ${ADDITIONAL_TITLE}`;
  parentCategory['tagTitle'] = findParent.attributes.name;
  parentCategory['to'] = findParent.attributes.url as string;

  return parentCategory;
}

function addDocumentsToCategories(documentsRes: DocumentsResponse | null, categoriesData: CategoryData) {
  if (Object.keys(categoriesData).length === 0) return {};

  const categoriesWithDocuments = { ...categoriesData };

  if (!documentsRes || !Array.isArray(documentsRes.data)) return categoriesWithDocuments;

  documentsRes.data.forEach((document) => {
    const documentCategories = document.relationships?.categories?.data ?? [];

    documentCategories.forEach((category) => {
      const ext = document.attributes.link?.split('.')?.at(-1)?.toUpperCase();

      const doc = {
        title: document.attributes.name,
        to: document.attributes.url,
        ext,
      } as CategoryDocument;

      const categoryId = category.id;

      if (!categoriesWithDocuments[categoryId]) return;

      categoriesWithDocuments[categoryId].documents.push(doc);
    });
  });

  return categoriesWithDocuments;
}

function getDocuments(res: DocumentsResponse | null) {
  if (!res || !Array.isArray(res.data) || !res.included) return {};

  const documentsCategory = res.included[0] ?? {};

  const documents = res.data.map(({ attributes }) => {
    const ext = attributes.link.split('.')?.at(-1)?.toUpperCase();

    return {
      title: attributes.name,
      to: attributes.url,
      ext,
    };
  });

  return {
    title: documentsCategory.attributes?.name,
    description: documentsCategory.attributes?.description as string,
    documents,
  };
}

interface CategoryDocument {
  title: string;
  ext: string;
  to: string;
}

interface Category {
  title: string
  btnLink: string;
  documents: CategoryDocument[]
}
type CategoryData = Record<string, Category>;
</script>

<template>
  <SEduWrapper
    :breadcrumbs
  >
    <template #top>
      <SDisciplineCards
        v-for="value, key, index in categoriesDemoKIM"
        :key
        :btn-link="value.btnLink"
        :title="value.title"
        :items="value.documents"
        :title-h1="index === 0"
      />
      <SDisciplineCardsFull
        v-if="Object.keys(categoryFull).length"
        :title="categoryFull.title"
        :items="categoryFull.documents"
        :description="categoryFull.description"
        title-h1
      />
    </template>
    <template #bottom>
      <SCardTags
        v-if="Object.values(parentCategory).every(Boolean)"
        :title="parentCategory.title"
        :tags="[{title: parentCategory.tagTitle, to: parentCategory.to}]"
      />
      <SEduWrapperBottom />
      <SDisciplineArticle
        v-if="!IS_CATEGORY_DOCUMENT"
      />
    </template>
  </SEduWrapper>
</template>

<style lang="scss" scoped>
@import './SEduDisciplineCards.scss';
</style>
