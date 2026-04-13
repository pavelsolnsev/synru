<script lang="ts" setup>
import { filtersData, typeLabels, type TypeLabelKey } from '~/components/sections/school_work/SSchoolWorkFilters/filtersData';

const chosenCategory = shallowRef<TypeLabelKey>('all');
const visibleCount = shallowRef(9);

const typeKeys = Object.keys(typeLabels) as TypeLabelKey[];

const filteredItems = computed(() => {
  if (chosenCategory.value === 'all') {
    return filtersData;
  }
  return filtersData.filter((item) => item.type.includes(chosenCategory.value));
});

const visibleItems = computed(() => {
  return filteredItems.value.slice(0, visibleCount.value);
});

const remainingCount = computed(() => {
  return Math.max(0, filteredItems.value.length - visibleCount.value);
});

const showLoadMoreButton = computed(() => {
  return filteredItems.value.length > 9 && remainingCount.value > 0;
});

const showReturnButton = computed(() => {
  return filteredItems.value.length > 9 && remainingCount.value === 0;
});

function changeCategory(category: TypeLabelKey) {
  if (chosenCategory.value !== category) {
    chosenCategory.value = category;

    visibleCount.value = 9;
  }
}

function countCategory(category: TypeLabelKey) {
  return filtersData.filter((item) => item.type.includes(category)).length;
}

function loadMore() {
  const nextCount = visibleCount.value + 9;

  visibleCount.value = Math.min(nextCount, filteredItems.value.length);
}

function scrollToFilters() {
  const filtersElement = document.querySelector('.s-school-work-filters__filters');
  if (filtersElement) {
    filtersElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    visibleCount.value = 9;
  }
}

watch(filteredItems, () => {
  visibleCount.value = 9;
});
</script>

<template>
  <MSection
    class="s-school-work-filters"
    title="Выбери профессию"
  >
    <div class="s-school-work-filters__body">
      <div
        ref="filtersRef"
        class="s-school-work-filters__filters"
      >
        <div
          v-for="key in typeKeys"
          :key="key"
          class="s-school-work-filters__tag"
          :class="key === chosenCategory ? 'active' : undefined"
          @click="changeCategory(key)"
        >
          {{ typeLabels[key] }}
          <div
            v-if="key !== 'all'"
            class="s-school-work-filters__count"
          >
            {{ countCategory(key) }}
          </div>
          <ASvgMono
            v-else
            class="s-school-work-filters__all"
            name="faculty_all"
          />
        </div>
      </div>
      <div class="s-school-work-filters__cards">
        <MSchoolWorkFilterCard
          v-for="item in visibleItems"
          :key="item.id"
          :name="item.name"
          :type="item.type"
        />
      </div>

      <button
        v-if="showLoadMoreButton"
        class="s-school-work-filters__more"
        @click="loadMore"
      >
        Показать ещё ({{ remainingCount }})
      </button>

      <button
        v-if="showReturnButton"
        class="s-school-work-filters__more"
        @click="scrollToFilters"
      >
        Вернуться к фильтрам
      </button>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkFilters.scss';
</style>
