<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number }
  date?: string;
  time?: string;
  format?: string;
  title?: string;
  description?: string;
  btn?: string;
  formTitle?: string;
  formDescription?: string;
  formBtn?: string;
  actionParams?: { param: string }[]
  image?: string;
  imageMd?: string;
  imageLg?: string;
  videoTag?: string;
  video?: string;
}

const {
  conditionalGroup = [],
  entity,
  image = '',
  imageMd = '',
  imageLg = '',
  videoTag = '',
  video = '',
  date,
  time,
  format,
  title,
  description,
  btn,
  formTitle,
  formDescription,
  formBtn,
  actionParams = [],
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: formTitle,
    subtitle: formDescription,
    btn: formBtn,
    formName: false,
    formPhone: true,
    actionParams: actionParams,
  });
}
</script>

<template>
  <MSectionSecond
    v-if="showSection"
    class="s-dod-second"
  >
    <div class="s-dod-second__additional-title">
      День открытых дверей
    </div>

    <MVideoCard
      :image
      :image-md
      :image-lg
      :video
      :tag="videoTag"
    />

    <div class="s-dod-second__main">
      <div class="s-dod-second__main__date-time">
        <div
          class="s-dod-second__main__date"
          v-html="date"
        />
        <div
          v-if="time"
          class="s-dod-second__main__time"
        >
          <span>&nbsp;в {{ time }}</span>
        </div>
        <div
          v-if="format"
          class="s-dod-second__main__format"
        >
          <span>&nbsp;|&nbsp;{{ format }}</span>
        </div>
      </div>

      <div
        class="s-dod-second__main__title"
        v-html="title"
      />

      <div
        class="s-dod-second__main__description"
        v-html="description"
      />

      <AButtonMain @click="openForm()">
        <span v-html="btn" />
      </AButtonMain>
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SDodSecond.scss';
</style>
