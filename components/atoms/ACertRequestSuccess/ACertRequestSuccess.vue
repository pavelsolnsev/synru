<script setup lang="ts">

</script>

<template>
  <div
    id="a-cert--request-success"
    class="a-cert-success"
  >
    <h4 class="a-cert-success__title a-font_h4">
      Спасибо!
    </h4>
    <div class="a-cert-success__subtitle a-font_l">
      Читайте письма от демо-вуза, среди полезных новостей и акций вас может ждать сертификат.
    </div>
  </div>
</template>

<style lang="scss">
:global(.--modal-a-cert-request-success .m-modal-close) {
  display: none;
}

.a-cert-success {
  width: scale(500);
  height: scale(400);
  padding: scale(24);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: scale(40);
  background-color: var(--a-color_white);
  border-radius: scale(12);
  text-align: center;

  @include mobile(max) {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
