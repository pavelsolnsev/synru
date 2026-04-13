<script setup lang="ts">
interface Props {
  searchValues: Record<string, { region: string, slideIndex: number }>
  districts: {
    abroad: Record<string, unknown>
    rus: Record<string, unknown>
  }
}

const {
  searchValues,
} = defineProps<Props>();

const emits = defineEmits(['changedTab', 'onSearch']);

const tabs = [{ label: 'В Москве' },{ label: 'В регионах' },{ label: 'За рубежом' }];
const activeTab = defineModel<number>('activeTab');
const isFocusSearchInput = defineModel<boolean>('isFocusSearchInput');
const searchValue = defineModel<string>('searchValue');

const allCitiesName = Object.keys(searchValues);

const searchCityList = computed(() => {
  const currentSearch = searchValue.value?.toLowerCase()?.trim();
  if (!currentSearch) return allCitiesName;

  if (currentSearch.length === 1) {
    const findCitiesByFirstLetter = allCitiesName.filter((city) => city[0].toLowerCase() === currentSearch);
    return findCitiesByFirstLetter.length ? findCitiesByFirstLetter : allCitiesName;
  }

  const findCity = allCitiesName.filter((city) => city.toLowerCase().includes(currentSearch));

  return findCity.length ? findCity : allCitiesName;
});

function onClickOutsideSearchInput() {
  isFocusSearchInput.value = false;
}
</script>

<template>
  <div class="s-regions__filters">
    <div
      id="m-map__switcher"
      class="s-regions__switcher"
    >
      <MTabs
        v-model="activeTab"
        :items="tabs"
        @click="emits('changedTab')"
      />
    </div>

    <div
      id="m-map__search"
      class="s-regions__search"
      :class="{'--focused': isFocusSearchInput}"
    >
      <MSearchSecond
        v-model="searchValue"
        v-click-outside="onClickOutsideSearchInput"
        placeholder="Введите название города"
        :autocomplete="false"
        @focus="isFocusSearchInput = true"
      />
      <div class="s-regions__search-result">
        <div
          id="m-map__list"
          class="s-regions__search-list a-font_m-m"
        >
          <span
            v-for="city in searchCityList"
            :key="city"
            @click="emits('onSearch', city)"
            v-html="city"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SRegionsSecond.scss';
</style>
