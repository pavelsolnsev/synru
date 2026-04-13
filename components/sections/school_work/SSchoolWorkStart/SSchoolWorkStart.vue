<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string,
  bgImages: BgImage[]
  btnText: string
}

defineProps<Props>();

const { openModal } = useModalStore();

function openFormStart() {
  openModal('MModalForm', {
    title: 'Заполни форму, мы свяжемся с тобой',
    btn: 'Оставить заявку',
    formName: false,
    formPhone: true,
    actionParams: [{param: 'form=job_start'}]
  });
}
</script>

<template>
  <MSection class="s-school-work-start">
    <div class="s-school-work-start__body">
      <div class="s-school-work-start__info">
        <h2
          class="s-school-work-start__title a-font_h3"
          v-html="title"
        />
        <div
          class="s-school-work-start__subtitle"
          v-html="subtitle"
        />
        <AButton
          class="s-school-work-start__btn"
          @click="openFormStart()"
        >
          <span>{{ btnText }}</span>
        </AButton>
      </div>
      <div class="s-school-work-start__photo">
        <ABgImages v-bind="{...bgImages[0]}" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkStart.scss';
</style>
