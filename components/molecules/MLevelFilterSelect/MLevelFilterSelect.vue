<script setup lang="ts">
interface Props {
  levels: Levels,
  disabled?: boolean,
}

interface Levels {
  [key: number]: Level;
}

interface Level {
  value: string;
  text: string;
  disabled: boolean;
  rank: number;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const level = defineModel<number | undefined>();

defineEmits(['change']);

const levelOptions: Ref<Level[]> = ref(sortLevels(Object.values(toRaw(props.levels))));
const key = ref(0);

watch(props.levels, () => {
  levelOptions.value = sortLevels(Object.values(toRaw(props.levels)));
  key.value += 1;
});

function sortLevels(levelOptions: Level[]) {
  type OptionType = {
    enabled: Level[],
    disabled: Level[],
  };

  const optionType: OptionType = {
    enabled: [],
    disabled: [],
  };

  levelOptions.forEach((item) => {
    const type: keyof OptionType = item.disabled ? 'disabled' : 'enabled';

    optionType[type].push(item);
  });

  Object.keys(optionType).forEach((type) => optionType[type as keyof OptionType].sort(compareByRank));

  return [...optionType.enabled, ...optionType.disabled];
}

function compareByRank({ rank: rankA }: Level, { rank: rankB }: Level) {
  return rankA - rankB;
}
</script>

<template>
  <AUikitSelect
    v-model="level"
    placeholder="Уровень образования"
    :options="levelOptions"
    :disabled
    @update:model-value="$emit('change')"
  />
</template>
