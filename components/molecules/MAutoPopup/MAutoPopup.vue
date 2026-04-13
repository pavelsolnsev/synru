<script setup lang='ts'>
import { Fancybox } from '@fancyapps/ui';

const { width: windowWidth } = useWindowSize();

let timeoutId: ReturnType<typeof setTimeout>;

onMounted(() => {
  if (windowWidth.value < 1200) {
    return;
  }

  if (import.meta.dev) return;

  timeoutId = setTimeout(() => {
    Fancybox.show([
      {
        src: '#m-auto-popup',
        type: 'inline',
        width: 'auto',
        height: 'auto',
      },
    ], {
      mainClass: '--auto-popup',
      dragToClose: false,
      hideScrollbar: true,
    });
  }, 6000);
});

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <div
    id="m-auto-popup"
    class="m-auto-popup"
  >
    <AImg
      class="m-auto-popup__img"
      src="/img/auto-popup.webp"
      alt=""
      decoding="async"
      loading="lazy"
    />
    <p class="a-font_h6 m-auto-popup__title">Подберите <br>программу обучения</p>
    <p class="a-font_l-m">и узнайте минимальный <br>проходной балл</p>
    <AButton
      size="sm"
      bg-color="black"
      @click.stop="showQuizPopup([{ param:'grcampaign=e_mail_chain_vpo' }, { param:'form=kviz_pop-up' }])"
    >
      <span>Подробнее</span>
    </AButton>
  </div>
</template>

<style lang="scss">
.--auto-popup {
  .fancybox__content .f-button.is-close-btn {
    top: 0;
    right: 0;
    background-color: transparent;
    opacity: 1;

    svg {
      color: white;
    }
  }
}
</style>

<style scoped lang='scss'>
@import './MAutoPopup.scss';
</style>
