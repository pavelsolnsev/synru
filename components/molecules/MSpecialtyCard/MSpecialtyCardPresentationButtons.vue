<script setup lang="ts">
interface Props {
  presentationLink?: string;
  faculty?: string;
  link?: string;
  price?: string;
  ico?: string;
  id: string;
}

const {
  id,
  presentationLink = '',
} = defineProps<Props>();

const { openModal } = useModalStore();

function openForm(id: string) {
  openModal('MModalForm', {
    title: 'Укажите ваш <nobr>e-mail</nobr> и&nbsp;мы пришлём подробную информацию об обучении',
    btn: 'Получить',
    formPhone: true,
    formName: false,
    actionParams: [
      { param: 'form=thanks_presentation' },
      { param: 'groups_enkod=synergy_ru_thanks' },
      { param: `form_title=Укажите ваш e-mail и мы вышлем подробную программу обучения: ${id}` },
    ],
  });
}
</script>

<template>
  <div class="specialty-card__bottom">
    <AButton
      v-if="presentationLink"
      class="specialty-card__apply"
      size="md"
      @click="openForm(id)"
    >
      <span>
        Презентация
      </span>
    </AButton>

    <span
      v-if="ico"
      class="specialty-card__ico"
    >
      <ASvgMono :name="ico" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import './MSpecialtyCard.scss';
</style>

<style lang="scss">
@include desktop {
  [id^="presentation-popup-"].m-modal-form {
    min-height: scale(260);
  }
}
</style>
