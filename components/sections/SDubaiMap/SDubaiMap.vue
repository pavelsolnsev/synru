<script setup lang="ts">
import DubaiMapImgSm from '~/assets/images/s-dubai-map/dubai_map_sm.webp';
import DubaiMapImgMd from '~/assets/images/s-dubai-map/dubai_map_md.webp';
import DubaiMapImgLg from '~/assets/images/s-dubai-map/dubai_map_lg.webp';

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Узнать стоимость',
    btn: 'Отправить заявку',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=dubai_price'},
    ],
  });
}
</script>

<template>
  <MSection
    class="s-dubai-map"
    title="Приёмная комиссия"
  >
    <picture>
      <source
        media="(min-width: 1200px)"
        :srcset="DubaiMapImgLg"
      >
      <source
        media="(min-width: 768px)"
        :srcset="DubaiMapImgMd"
      >
      <AImg
        :src="DubaiMapImgSm"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </picture>
    <AButton
      size="lg"
      @click="openForm()"
    >
      Узнать стоимость
    </AButton>
  </MSection>
</template>

<style lang="scss" scoped>
  @import './SDubaiMap.scss';
</style>
