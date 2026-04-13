<script setup lang="ts">
import type { Fonts, SectionConditionalGroup  } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number }
  title?: string;
  titleClass?: Fonts;
  howGetItemsClass?: string;
  howGetItems: { text: string; image: string }[];
  documents?: { title: string; text: string; icon: string }[]
  minorsItems?: { title: string; text?: string }[]
  actionParams: { param: string }[]
}

const {
  conditionalGroup = [],
  entity,
  title = 'Как получить кредит',
  titleClass = 'a-font_h2',
  howGetItems = [],
  documents = [],
  minorsItems = [],
  actionParams = [],
} = defineProps<Props>();
  const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
  console.log(showSection, conditionalGroup)

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте заявку, чтобы узнать больше о&nbsp;кредитовании на&nbsp;льготных условиях',
    subtitle: 'Заполните форму, и&nbsp;наш менеджер свяжется с&nbsp;вами',
    subtitleClass: 'a-font_h6',
    btn: 'Отправить',
    formPhone: true,
    formName: true,
    actionParams: actionParams,
  });
}
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-credit-how-get-and-pay"
  >
    <SCreditHowGet
      :title
      :title-class
      :items-class="howGetItemsClass"
      :items="howGetItems"
    />
    <SCreditPay
      :documents
      :minors-items
    />

    <AButton @click="openForm()">
      <span class="s-credit-how-get-and-pay__button-mobile">Узнать больше</span>
      <span class="s-credit-how-get-and-pay__button-large">Узнать больше о кредитовании с господдержкой</span>
    </AButton>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditHowGetAndPay.scss';
</style>
