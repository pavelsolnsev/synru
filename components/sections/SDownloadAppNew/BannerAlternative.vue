import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
interface Props {
  routeName?: string;
}

const {
  routeName = '',
}  = defineProps<Props>();

const baseParams = [
  { param: 'form=budjet_bottom' },
];

const actionParams: ComputedRef<{ param: string }[]> = computed(() => getAbTestActionParams(baseParams, routeName));

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: "Узнайте минимальный проходной балл и&nbsp;получите <span class='--free-red'>бесплатный</span> доступ к&nbsp;началу обучения",
    formName: true,
    formPhone: true,
    actionParams: actionParams,
  });
}
</script>

<template>
  <div class="s-download-app-new__alternative ">
    <picture>
      <source
        media="(min-width: 1200px)"
        srcset=synergyApi('uploads/content/s-download-app/guarantee_lg.webp')
      >
      <source
        media="(min-width: 768px)"
        srcset=synergyApi('uploads/content/s-download-app/guarantee_md.webp')
      >
      <AImg
        src=synergyApi('uploads/content/s-download-app/guarantee_sm.webp')
        alt="image"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <div class="a-font_h5 s-download-app-new__alternative-title">
      Гарантия трудоустройства после обучения
    </div>
    <div class="a-font_xl-m s-download-app-new__alternative-text">
      Фиксируем в&nbsp;договоре гарантию трудоустройства по&nbsp;специальности для&nbsp;выпускников Колледжа
      и&nbsp;Университета
    </div>
    <AButton @click="openForm()">
      <span>Узнать минимальный проходной балл</span>
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
.s-download-app-new__alternative {
  overflow: hidden;
  position: relative;
  z-index: 1;
  gap: scale(8);
  flex-direction: column;
  display: flex;
  height: scale(351);
  padding: var(--padding_def);
  border-radius: scale(16);
  background-color: var(--a-color_dark);
  text-align: center;
  color: var(--a-color_white);
  @include tablet() {
    min-height: scale(351);
    height: auto;
  }
  @include desktop(min) {
    gap: scale(20);
    height: scale(379);
    text-align: left;
  }

  &-title {
    max-width: scale(280);
    margin: auto auto 0;

    @include desktop(min) {
      max-width: scale(500);
      margin: 0;
    }
  }

  &-text {
    max-width: scale(280);
    margin: 0 auto;
    @include desktop(min) {
      margin: 0 0 auto;
      max-width: scale(450);
    }
  }

  picture {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
}
</style>
