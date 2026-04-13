<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';

interface Franchise {
  title: string;
  description: string;
  investment: string;
  time: string;
  profit: string;
  image: string;
  select: 'up' | 'from';
  actionParams: Array<
    { value: string }[]
  >
}

const { width: windowWidth } = useWindowSize();

const { franchises: rawFranchises = [] } = defineProps<{ franchises: Franchise[] }>();

const franchises = rawFranchises.map((franchise) => {
  return { ...franchise, actionParams: formatFormActionParams(franchise.actionParams) };
});

const franchisesCatalogFilters = [
  { value: 'up', title: 'До 2 миллионов' },
  { value: 'from', title: 'От 2 миллионов' },
];

const filterByInvestment = ref(null);

const currentOpenFranchiseIndex = ref(0);

const getFormActionsParams = computed(() => {
  const franchise = francisesToShow.value[currentOpenFranchiseIndex.value];
  const franchiseActionParams = franchise.actionParams ?? [];

  if (!franchiseActionParams.length) return [];

  return franchiseActionParams;
});

const filteredFranchises = computed(() => {
  return franchises.filter((franchise) => {
    return filterByInvestment.value ? franchise.select === filterByInvestment.value : true;
  });
});

const STEP = windowWidth.value < 1200 ? 2 : 4;
const showFranchisesCount = ref(STEP);

const francisesToShow = computed(() => {
  return filteredFranchises.value.slice(0, showFranchisesCount.value);
});

const showMoreButton = ref(francisesToShow.value.length < filteredFranchises.value.length);
const restOfFranchises = ref(filteredFranchises.value.length - francisesToShow.value.length);

watch([francisesToShow, showFranchisesCount], () => {
  restOfFranchises.value = filteredFranchises.value.length - francisesToShow.value.length;
  showMoreButton.value = restOfFranchises.value > 0;
});

watch(() => filteredFranchises.value, () => {
  showFranchisesCount.value = STEP;
});

const actualActionParams = computed<{ param: string }[]>(() => getFormActionsParams.value);

const { openModal } = useModalStore();

function openFranchiesModal(franchiseIndex: number) {
  currentOpenFranchiseIndex.value = franchiseIndex;

  openModal('MModalForm', {
    title: "Получить презентацию",
    btn: "Подать заявку",
    formName: true,
    formPhone: true,
    formMail: true,
    actionParams: actualActionParams,
  });

  setTimeout(() => {
    changeFormActionParameter();
  }, 10);
};

function formatFormActionParams(params: Array<{ value: string }[]>) {
  if (!Array.isArray(params)) return [];
  return params.map((item) => {
    const param = item[0]?.value;
    return { param };
  });
}

function changeFormActionParameter() {
  const popupFormElement: HTMLFormElement | null = document.querySelector('#modal-form-catalog form');

  if (!popupFormElement) return;

  const url = new URL(popupFormElement.action);
  if (!url) return;

  getFormActionsParams.value.forEach((currentParam) => {
    const [param, paramValue] = currentParam.param.split('=');

    url.searchParams.set(param, paramValue);
  });

  popupFormElement.action = url.toString();
}
</script>

<template>
  <MSection
    v-if="franchises.length"
    class="s-catalog"
  >
    <h2 class="l-section__title a-font_h2">Наши франшизы</h2>
    <div class="s-catalog__filters">
      <MFiltersTabsSlider
        v-model="filterByInvestment"
        :tabs="franchisesCatalogFilters"
        class="s-catalog__directions sticky"
      />
    </div>

    <div
      class="s-catalog__list"
      :class="{'--visibled-all': restOfFranchises === 0}"
    >
      <template
        v-for="item, franchiseIndex in francisesToShow"
        :key="item.title"
      >
        <a
          class="s-catalog__card"
          @click="openFranchiesModal(franchiseIndex)"
        >
          <span class="s-catalog__card-img">
            <AImg
              :src="item.image"
              :alt="item.title"
            />
          </span>
          <div class="s-catalog__card-info">
            <h5
              class="s-catalog__card-title a-font_h5"
              v-html="item.title"
            />
            <div
              class="s-catalog__card-descr a-font_l-m"
              v-html="item.description"
            />
            <div class="s-catalog__card-params a-font_m">
              <span class="s-catalog__card-param">
                <span>Размер инвестиций:</span>
                <span v-html="item.investment" />
              </span>
              <span class="s-catalog__card-param">
                <span>Окупаемость:</span>
                <span v-html="item.time" />
              </span>
              <span class="s-catalog__card-param">
                <span>Ежемесячный доход:</span>
                <span v-html="item.profit" />
              </span>
            </div>
            <AButton size="md">Получить презентацию</AButton>
          </div>
        </a>
      </template>
      <ACardThmb class="s-catalog__block-thmb" />
    </div>
    <MMore
      v-if="showMoreButton"
      class="s-catalog__more"
      size="lg_m"
      :text="`Показать еще (${restOfFranchises})`"
      @click.stop="showFranchisesCount += STEP"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCatalog.scss';
</style>
