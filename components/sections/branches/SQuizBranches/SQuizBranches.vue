<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  showBreadcrumbs?: boolean;
  btnText?: string;
  showForm?: boolean;
  actionParams?: { param: string }[],
  formBtn?: string,
  routeName?: string;
}

const props = defineProps<Props>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: "Подберите программу обучения <br>и&nbsp;начните учиться <span class='--free-red'>бесплатно</span>",
    formName: false,
    formPhone: true,
    actionParams: [
      {param: 'grcampaign=e_mail_chain_vpo'},
      {param: 'form=quiz-form'},
    ],
  });
}

</script>
<template>
  <SQuiz v-bind="props">
    <template v-if="!props.showForm">
      <AButton @click="openForm()">
        <span v-html="props.btnText" />
      </AButton>
    </template>
  </SQuiz>
</template>

<style lang="scss" scoped>
@import './SQuizBranches.scss';
</style>
