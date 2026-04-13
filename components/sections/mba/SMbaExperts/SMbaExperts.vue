<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';
import type { Person, ResponsePersons, TeacherCard } from '~/types';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const expertsData = entity.customFields.mba_experts || [];

function transformPersonResponse(response: ResponsePersons): TeacherCard[] {
  if (!response) return [];
  return response.data.map((person: Person) => {
    return {
      image: person.attributes.photo,
      name: `${person.attributes.surname} ${person.attributes.name} ${person.attributes.patronymic ?? ''}`,
      teacherId: person.id,
      text: person.attributes.regalia,
      position: person.attributes.regalia,
    };
  });
}

async function getExperts() {
  const result = await useFetch('/api/persons', {
    query: {
      'filter[id]': expertsData.join(','),
    },
    immediate: true,
    deep: false,
    watch: false,
    transform: transformPersonResponse,
  });

  return result.data.value;
}

const experts = expertsData.length ? await getExperts() : [];
</script>

<template>
  <MSection
    v-if="experts && experts.length"
    class="s-mba-experts"
    title="Интервью и онлайн-встречи<br>с экспертами"
  >
    <div
      class="s-mba-experts__slider"
    >
      <MTeachersSlider :teachers="experts" />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaExperts';
</style>
