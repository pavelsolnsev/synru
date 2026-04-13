<script lang="ts" setup>
interface Props {
  title: string
  conditions: {
    btnText?: string
    imageLG: string
    imageMD: string
    imageSM: string
    title: string
  }[]
  routeName?: string
}

const props = defineProps<Props>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте заявку на перевод',
    btn: 'Подать заявку',
    formName: false,
    formPhone: true,
    actionParams: [
      {param: 'form=perevod_iz_drugogo_vuza'}
    ],
    routeName: props.routeName,
  });
}
</script>

<template>
  <MSection
    class="s-transfer-conditions"
    :title
  >
    <ul class="s-transfer-conditions__list">
      <li
        v-for="(item, index) in conditions"
        :key="item.title"
        class="s-transfer-conditions__item"
      >
        <ABgImages v-bind="{...item}" />
        <div class="s-transfer-conditions__top">
          {{ formatNumberWithLeadingZero(index + 1) }}
        </div>
        <div class="s-transfer-conditions__bottom">
          <div
            class="s-transfer-conditions__title"
            v-html="item.title"
          />
          <div
            v-if="item.btnText"
            class="s-transfer-conditions__btn"
          >
            <AButton
              bg-color="black"
              @click="openForm()"
            >
              {{ item.btnText }}
            </AButton>
          </div>
        </div>
      </li>
    </ul>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STransferConditions';
</style>
