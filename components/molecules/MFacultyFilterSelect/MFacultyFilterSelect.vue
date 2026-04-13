<script setup lang="ts">
import { FACULTY_FILTER_OPTION_HELP_FORM } from '~/constants/common';

interface Props {
  faculties: Facuilties,
  disabled?: boolean,
  showHelpOption?: boolean;
}

interface Facuilties {
  [key: number]: Facuily
}

interface Facuily {
  value: string,
  text: string,
  disabled: boolean,
  popular: boolean,
  rank: number
}

interface HelpFormOption {
  action: string;
  value: string;
  text: string;
  class?: string;
  icon?: { type: string; name: string }
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showHelpOption: false,
});

const faculty = defineModel<number | null | undefined>();

defineEmits(['change', 'action']);

const facultyOptions: Ref<Array<Facuily | HelpFormOption>> = ref(sortFaculties(Object.values(toRaw(props.faculties))));

watch(props.faculties, () => {
  facultyOptions.value = sortFaculties(Object.values(toRaw(props.faculties)));
});

function sortFaculties(facultyOptions: Facuily[]) {
  type OptionType = {
    enabled: Facuily[],
    disabled: Facuily[],
  };

  const optionType: OptionType = {
    enabled: [],
    disabled: [],
  };

  facultyOptions.forEach((item) => {
    const type: keyof OptionType = item.disabled ? 'disabled' : 'enabled';

    optionType[type].push(item);
  });

  Object.keys(optionType).forEach((type) => optionType[type as keyof OptionType].sort(compareByRank));

  const helpOption = {
    value: 'help',
    text: 'Помогите выбрать',
    action: FACULTY_FILTER_OPTION_HELP_FORM,
    class: '--help',
    icon: { type: 'colors', name: 'question' },
  };

  return props.showHelpOption
    ? [
        ...optionType.enabled.slice(0,3),
        helpOption,
        ...optionType.enabled.slice(3),
      ]

    : [...optionType.enabled];
}

function compareByRank ({ rank: rankA }: Facuily, { rank: rankB }: Facuily) {
  return rankA - rankB;
}
</script>

<template>
  <AUikitSelect
    v-model="faculty"
    placeholder="Факультет"
    :options="facultyOptions"
    :disabled
    @update:model-value="$emit('change')"
    @action="(value) => $emit('action', value)"
  />
</template>

<style lang="scss" scoped>
@import './MFacultyFilterSelect.scss';
</style>
