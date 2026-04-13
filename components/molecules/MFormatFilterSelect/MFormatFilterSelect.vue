<script setup lang="ts">
interface Props {
  formats: Formats,
  disabled?: boolean,
}

interface Formats {
  [key: number]: Format
}

export interface Format {
  value: string,
  text: string,
  disabled: boolean,
  popular: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const format = defineModel<number | null>({
  default: null,
});

defineEmits(['change']);

const formatOptions: Ref<Format[]> = ref(sortFormats(Object.values(toRaw(props.formats))));

watch(props.formats, () => {
  formatOptions.value = sortFormats(Object.values(toRaw(props.formats)));
});

function sortFormats(formats: Format[]) {
  type OptionType = {
    enabled: Format[],
    disabled: Format[],
  };

  const optionType: OptionType = {
    enabled: [],
    disabled: [],
  };

  formats.forEach((item) => {
    const type: keyof OptionType = item.disabled ? 'disabled' : 'enabled';

    optionType[type].push(item);
  });

  Object.keys(optionType).forEach((type) => optionType[type as keyof OptionType].sort(compareByText));

  return [...optionType.enabled];
}

function compareByText({ text: textA }: Format, { text: textB }: Format) {
  if (textA === textB) return 0;

  return textA < textB ? -1 : 1;
}
</script>

<template>
  <AUikitSelect
    v-model="format"
    placeholder="Формат обучения"
    :options="formatOptions"
    :disabled
    @update:model-value="$emit('change')"
  />
</template>
