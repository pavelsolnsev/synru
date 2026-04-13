<script setup lang='ts'>
import { KEYS } from '~/constants';
import type { ProgramMap } from '~/types/ProgramCard';

interface Props {
  title?: string;
  titleClass?: string;
  subtitle?: string;
  subtitleClass?: string;
  btnText?: string;
  imageLG: string;
  imageSM: string;
  routeName?: string;
  actionParams?: { param: string }[],
}

const {
  title = '',
  titleClass = 'a-font_h3',
  subtitle = '',
  subtitleClass = 'a-font_h6',
  btnText = '',
  imageLG,
  imageSM,
  routeName = '',
  actionParams = [],
} = defineProps<Props>();

const formats = {
  'distance_university': '6', // Онлайн
  'zao_university': '2', // Заочный
}

const ONLINE_FORM_ID = formats[routeName as keyof typeof formats];

const { data } = await useFetch('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: KEYS.PROGRAMS_FILTERS_DATA,
});

const {
  programsMap = {} as ProgramMap,
} = data.value || {};

const programs = programsMap['programs'] ?? {};
const mapOnlineFaculties = new Set<string>();

Object.values(programs).forEach((program) => {
  const isOnline = program.forms[ONLINE_FORM_ID];
  const facultyObj = program.faculty;
  if (!isOnline) return;
  mapOnlineFaculties.add(facultyObj.text);
  return true;
});

const onlineFaculties = [...mapOnlineFaculties].map((item) => {
  return {
    text: item,
    value: item
  }
});

const faculty = shallowRef<null | string>(onlineFaculties[0]?.text);

const fullActionParams = [
  { param: `form=${routeName}` },
  { param: `form_title=${faculty.value}` },
  ...actionParams
];

watch(faculty, (newValue) => {
  if (!newValue) return;

  const params = [...fullActionParams];
  const titleRow = params.find((row) => row.param.startsWith('form_title='));
  
  if (!titleRow) return;

  fullActionParams.push(
    { param: `form_title=${faculty.value}` },
    { param: `faculty=${faculty.value}` },
  );
});

</script>

<template>
  <MSectionNewResponsive
    class="s-dz-faculty-presentation"
  >
    <ABgImages
      v-bind="{ imageSM, imageLG }"
    />
    <div class="s-dz-faculty-presentation__content">
      <h2
        v-if="title"
        ref="refTitle"
        class="s-dz-faculty-presentation__title"
        :class="titleClass"
        v-html="title"
      />
      <p
        v-if="subtitle"
        class="s-dz-faculty-presentation__subtitle"
        :class="subtitleClass"
        v-html="subtitle"
      />
      <AUikitSelect
        v-model="faculty"
        :options="onlineFaculties"
        :placeholder="onlineFaculties[0].text"
        placeholder-class="a-font_m-m"
        @action="(value) => $emit('action', value)"
      />
      <MQuizForm
        :action-params="fullActionParams"
        :btn="btnText"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import "./SDzFacultyPresentation.scss";
</style>
