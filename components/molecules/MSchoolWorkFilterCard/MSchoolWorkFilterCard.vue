<script lang="ts" setup>
import type { TypeLabelKey } from '~/components/sections/school_work/SSchoolWorkFilters/filtersData';
import { typeLabels } from '~/components/sections/school_work/SSchoolWorkFilters/filtersData';

interface Props {
  name: string
  type: TypeLabelKey[]
}

defineProps<Props>();

const { openModal } = useModalStore();

function openForm(name: string) {
  openModal('MModalForm', {
    title: 'Заполни форму, мы свяжемся с тобой',
    btn: 'Оставить заявку',
    formPhone: true,
    actionParams: [
      {param: 'form=job_professyy'},
      {param: 'title='+name}
    ],
  });
}
</script>

<template>
  <div class="m-school-work-filter-card">
    <div
      v-for="tag in type"
      :key="tag"
      class="m-school-work-filter-card__tag"
    >
      {{ typeLabels[tag] }}
    </div>

    <div
      class="m-school-work-filter-card__name a-font_h5"
      v-html="name"
    />
    <AButton
      class="m-school-work-filter-card__btn"
      @click="openForm(name)"
    >
      Подробнее
    </AButton>
    <AImg
      src="/img/school-work/filter-card.svg"
      alt="bg"
      class="m-school-work-filter-card__bg"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MSchoolWorkFilterCard.scss';
</style>
