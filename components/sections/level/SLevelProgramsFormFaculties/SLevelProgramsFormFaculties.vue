<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

interface Props {
  routeName: string;
  entity: object;
}

const {
  routeName,
  entity = {},
} = defineProps<Props>();

const route = useRoute();

const SWAP_SECTION_ROUTES_LIST = [ROUTES.MAGISTRACY, ROUTES.SECOND_HIGHEST];

const swapSection = computed(() => SWAP_SECTION_ROUTES_LIST.includes(route.path));
</script>

<template>
  <div
    class="s-level-programs-form-faculties"
  >
    <div
      class="s-level-programs-form-faculties__programs"
      :class="{'--swap': swapSection}"
    >
      <SProgramsFilter
        title="Программы обучения"
        :action-params="[
          {param: 'form=postupi_short'},
          {param: 'form_title=Поступите+на+программу'},
        ]"
        :route-name
        :entity
      />
    </div>
    <div class="s-level-programs-form-faculties__form">
      <SForm
        title="Оставьте заявку <br>на обучение"
        image-lg=synergyApi('uploads/content/s-form/4_lg.webp')
        image-md=synergyApi('uploads/content/s-form/4_md.webp')
        image-sm=synergyApi('uploads/content/s-form/4_sm.webp')
        form-title="Узнайте минимальный <br>проходной балл в&nbsp;2026 году"
        btn-text="Отправить"
        bg-color="white"
        :action-params="[
          {param: 'form=top'},
          {param: 'form_title=Оставьте+заявку+на+обучение'},
        ]"
      />
    </div>
    <div
      class="s-level-programs-form-faculties__faculties"
      :class="{'--swap': swapSection}"
    >
      <SFaculties
        title="Программы по факультетам"
        form-title="Узнайте минимальный проходной балл и&nbsp;получите <span class='--free-red'>бесплатный</span> доступ к&nbsp;началу обучения"
        :route-name
        :action-params="[{param: 'form=credit_sber_level'}]"
        :entity
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SLevelProgramsFormFaculties.scss';
</style>
