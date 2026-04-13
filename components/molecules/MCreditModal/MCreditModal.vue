<script setup lang='ts'>
import ImageFormLg from '~/assets/images/credit/credit_form_lg.webp';
import ImageFormSm from '~/assets/images/credit/credit_form_sm.webp';

interface Props {
  title: string;
  text: string;
}

const { closeTopModal } = useModalStore();

const {
  title,
  text,
} = defineProps<Props>();
</script>

<template>
  <MModalForm
    id="credit-cost_form"
    class="m-credit-modal"
    title-class="a-font_h6"
    title="Узнайте подробнее у&nbsp;менеджера, заполнив форму"
    form-phone
    btn="Отправить"
    :image-lg="ImageFormLg"
    :image-md="ImageFormLg"
    :image-sm="ImageFormSm"
    :action-params="[
      {param: 'form=credit'},
    ]"
  >
    <div class="s-credit__modal">
      <button
        class="bottom-buttons__form-close"
        @click="closeTopModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 6 8">
          <path fill="#1C1C1C" d="M4 0 0 4l4 4 1-1-3-3 3-3-1-1Z"/>
        </svg>
        <span class="a-font_xs-m">
          Вернуться
        </span>
      </button>
      <p
        class="a-font_h4 s-credit__title"
        v-html="title"
      />
      <p
        class="a-font_xl-m s-credit__text"
        v-html="text"
      />
    </div>
  </MModalForm>
</template>

<style scoped lang='scss'>
@import './MCreditModal.scss';
</style>

<style lang="scss">
.--modal-m-credit-modal {
  .m-modal-form {
    display: flex;
    flex-direction: column;
    @include desktop {
      width: scale(910);
    }
  }
  .m-modal-form__img {
    @include tablet(min) {
      height: scale(240);
    }
    @include desktop {
      height: scale(278);
    }
  }
  .m-modal-close {
    @include mobile(max) {
      display: none;
    }
  }
}
</style>

