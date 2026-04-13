<script setup lang="ts">
const title = 'Сертификат на&nbsp;7000 <span class="a-cert-success__ruble">Р</span> активирован';
const subtitle = 'Сумма сертификата закреплена за&nbsp;вашим номером телефона. Её можно списать в&nbsp;течение одного года при&nbsp;оплате любых программ обучения у&nbsp;нас.';
</script>

<template>
  <div
    id="a-cert-success"
    class="a-cert-success"
  >
    <h4
      class="a-cert-success__title a-font_h4"
      v-html="title"
    />

    <div
      class="a-cert-success__subtitle a-font_l"
      v-html="subtitle"
    />
  </div>
</template>

<style lang="scss" scoped>
:global(.--modal-a-cert-success .m-modal-close) {
  display: none;
}

.a-cert-success {
  width: scale(500);
  height: scale(400);
  padding: scale(24);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: scale(40);
  background-color: var(--a-color_white);
  border-radius: scale(12);
  text-align: center;

  @include mobile(max) {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }

  &__ruble {
    position: relative;

    &:after {
      content: '';
      width: 29%;
      height: 7%;
      background-color: currentColor;
      position: absolute;
      left: -7%;
      top: 51%;

      @include mobile(max) {
        top: 52%;
      }
    }

    &:before {
      content: '';
      width: 67%;
      height: 5%;
      background-color: currentColor;
      position: absolute;
      left: -7%;
      top: 65%;
    }
  }
}
</style>
