<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

const title = 'Другие уровни образования';
const levels = [
  {
    title: 'Дистанционный колледж',
    link: ROUTES.ONLINE_COLLEGE,
    imageSM: synergyApi('uploads/content/distance_zao/level-college-sm.webp'),
    imageLG: synergyApi('uploads/content/distance_zao/level-college-lg.webp'),
  },
  {
    title: 'Онлайн‐магистратура',
    link: ROUTES.ONLINE_MAGISTRACY,
    imageSM: synergyApi('uploads/content/distance_zao/level-mag-sm.webp'),
    imageLG: synergyApi('uploads/content/distance_zao/level-mag-lg.webp'),
  },
  {
    title: 'Онлайн‐аспирантура',
    modal: true,
    imageSM: synergyApi('uploads/content/distance_zao/level-aspir-sm.webp'),
    imageLG: synergyApi('uploads/content/distance_zao/level-aspir-lg.webp'),
  },
];

const { openModal } = useModalStore();

function clickBtn(index: number) {
  openModal('MModalForm', {
    'form-phone': true,
    'action-params': [
      {param: `form=form-${index}`}
    ],
  });
}
</script>

<template>
  <MSectionNewResponsive
    v-if="levels"
    class="s-dz-levels"
    :title
  >
    <div class="s-dz-levels__list">
      <div
        v-for="item, index in levels"
        :key="item.title"
        class="s-dz-levels__item"
      >
        <ABgImages
          v-bind="{ imageSM: item.imageSM, imageLG: item.imageLG }"
        />
        <h5
          class="s-dz-levels__title a-font_h5"
          v-html="item.title"
        />
        <AButton
          :to="item.link ?? ''"
          size="sm"
          @click="item.modal ? clickBtn(index) : null"
        >
          Перейти
        </AButton>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SDzLevels.scss';
</style>
