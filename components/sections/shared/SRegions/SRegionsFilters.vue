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
  districts: rawDistricts,
} = defineProps<Props>();

const districts = {
  abroad: sortDistricts(rawDistricts.abroad ?? {}),
  rus: sortDistricts(rawDistricts.rus ?? {}),
};

const activeTab = defineModel<number>('activeTab');
const activeDistrict = defineModel<number>('activeDistrict');
const isFocusSearchInput = defineModel<boolean>('isFocusSearchInput');
const searchValue = defineModel<string>('searchValue');

const emits = defineEmits(['changedTab', 'onSearch']);

const tabs = [{ label: 'В Москве' }, { label: 'В регионах' }, { label: 'За рубежом' }];

const abroadSelectValues = [
  { text: 'Выберите страну', value: null },
  ...Object.keys(districts.abroad).map((item) => ({ text:item, value:item })),
];

const rusRegionsSelectValues = [
  { text: 'Выберите округ РФ', value: null },
  ...Object.keys(districts.rus).map((item) => ({ text:item, value:item })),
];

const districtSelectValues = computed(() => {
  const ABROAD_TAB_INDEX = 2;

  return activeTab.value === ABROAD_TAB_INDEX
    ? abroadSelectValues
    : rusRegionsSelectValues;
});

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
  searchValue.value = '';
}

function sortDistricts(obj: Record<string, unknown>) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<string, unknown>);
}
</script>

<template>
  <div class="s-regions__filters">
    <div
      id="m-map__switcher"
      class="s-regions__switcher"
    >
      <MSwitcher
        v-model="activeTab"
        :items="tabs"
        @changed="emits('changedTab')"
      />
    </div>

    <div
      id="m-map__search"
      class="s-regions__search"
      :class="{'--focused': isFocusSearchInput}"
    >
      <MSearch
        v-model="searchValue"
        v-click-outside="onClickOutsideSearchInput"
        placeholder="Введите название города"
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

    <div
      class="s-regions__select"
    >
      <AUikitSelect
        v-model="activeDistrict"
        size="xl"
        placeholder-class="a-font_l-m"
        :placeholder="districtSelectValues[0]?.text"
        :options="districtSelectValues"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SRegions.scss';
</style>
