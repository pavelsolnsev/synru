<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
  title?: string;
  titleClass?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_download?.length ? entity.customFields.mba_program_download[0] : {}),
};

const bgImagesProps = {
  imageLG: data.imageLG ?? '',
  imageMD: data.imageMD ?? '',
  imageSM: data.imageSM ?? '',
} as const;

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Скачайте презентацию программы',
    subtitle: 'Презентацию вы&nbsp;получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram',
    formName: true,
    formPhone: true,
    actionParams: data.actionParams,
  });
}
</script>

<template>
  <MSection
    v-if="title || data.title"
    class="s-mba-download"
  >
    <div class="s-mba-download__body">
      <h2
        class="s-mba-download__title"
        :class="titleClass"
        v-html="title || data.title"
      />
      <AButton
        class="s-mba-download__btn"
        @click="openForm()"
      >
        {{ data.btnText }}
      </AButton>
      <ABgImages v-bind="bgImagesProps" />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaDownload';
</style>
