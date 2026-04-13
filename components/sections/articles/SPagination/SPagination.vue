<script setup lang="ts">
interface Props {
  param: string;
  lastPage?: number;
  activePage?: number;
  disabled?: boolean;
}

type PaginationItem = number | 'separator';
type Pagination = Array<PaginationItem>;

const {
  param,
  lastPage: LAST_PAGE = 1,
  activePage: ACTIVE_PAGE = 1,
  disabled = false,
} = defineProps<Props>();

const PAGINATION_ITEMS_COUNT = 7;
const ITEMS_SEPARATOR = '...';

const pagination = computed<Pagination>(() => {
  if (LAST_PAGE <= PAGINATION_ITEMS_COUNT) {
    return Array.from({ length: LAST_PAGE }, (_, i) => (i + 1));
  }

  const FIRST_PAGE = 1;
  const SECOND_PAGE = 2;
  const THIRD_PAGE = 3;
  const FOURTH_PAGE = 4;
  const FIFTH_PAGE = 5;

  if (ACTIVE_PAGE <= THIRD_PAGE) {
    return [
      FIRST_PAGE,
      SECOND_PAGE,
      THIRD_PAGE,
      FOURTH_PAGE,
      'separator',
      LAST_PAGE - 1,
      LAST_PAGE,
    ];
  }

  if (ACTIVE_PAGE === FOURTH_PAGE) {
    return [
      FIRST_PAGE,
      SECOND_PAGE,
      THIRD_PAGE,
      FOURTH_PAGE,
      FIFTH_PAGE,
      'separator',
      LAST_PAGE,
    ];
  }

  if (ACTIVE_PAGE > FOURTH_PAGE && ACTIVE_PAGE < LAST_PAGE - 3) {
    return [
      FIRST_PAGE,
      'separator',
      ACTIVE_PAGE - 1,
      ACTIVE_PAGE,
      ACTIVE_PAGE + 1,
      'separator',
      LAST_PAGE,
    ];
  }

  if (ACTIVE_PAGE === LAST_PAGE - 3) {
    return [
      FIRST_PAGE,
      'separator',
      LAST_PAGE - 4,
      LAST_PAGE - 3,
      LAST_PAGE - 2,
      LAST_PAGE - 1,
      LAST_PAGE,
    ];
  }

  if (ACTIVE_PAGE >= LAST_PAGE - 3) {
    return [
      FIRST_PAGE,
      SECOND_PAGE,
      'separator',
      LAST_PAGE - 3,
      LAST_PAGE - 2,
      LAST_PAGE - 1,
      LAST_PAGE,
    ];
  }

  return [];
});

const route = useRoute();

function generateUrl(paginationNumber: PaginationItem) {
  const INITIAL_PAGE_NUMBER = 1;

  if (paginationNumber === INITIAL_PAGE_NUMBER) return route.path;

  const query = { ...route.query };

  query[param] = String(paginationNumber);

  return { query };
}

function isLink(paginationItem: PaginationItem) {
  if (paginationItem === 'separator') return false;

  return paginationItem !== ACTIVE_PAGE;
}
</script>

<template>
  <div
    class="s-pagination"
    :class="{ '--disabled': disabled }"
  >
    <template
      v-for="item in pagination"
      :key="item"
    >
      <NuxtLink
        v-if="isLink(item)"
        class="s-pagination__link"
        :to="generateUrl(item)"
      >
        {{ item }}
      </NuxtLink>

      <span
        v-else
        class="s-pagination__link"
        :class="{ '--active': item === ACTIVE_PAGE }"
      >
        {{ item === 'separator' ? ITEMS_SEPARATOR : item }}
      </span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './SPagination.scss';
</style>
