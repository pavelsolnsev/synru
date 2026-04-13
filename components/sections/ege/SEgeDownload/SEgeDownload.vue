<script lang="ts" setup>
interface Props {
  title: string
  subtitle?: string
  imageLg: string
  imageSm: string
  formActions?: Array<{ param: string }>
}

const props = defineProps<Props>();

const { openModal } = useModalStore();

function onClickDownload() {
  openModal('MModalForm', {
    title: 'Скачайте чек-лист',
    btn: 'Отправить',
    subtitle: 'Ссылку на&nbsp;скачивание вы получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram',
    'form-phone': true,
    'subtitle-class': 'a-font_h6',
    'action-params': props.formActions || [{ param: 'form=skatchat_pod_EGE' }],
  });
}

function onClickFreeLesson() {
  openModal('MModalForm', {
    title: 'Начните с бесплатного урока',
    btn: 'Отправить',
    subtitle: 'Заполните форму, мы свяжемся и&nbsp;уточним удобное для&nbsp;вас время',
    'form-phone': true,
    'subtitle-class': 'a-font_h6',
    'action-params': props.formActions || [{ param: 'form=skatchat_pod_EGE' }],
  });
}
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-download"
  >
    <div class="s-ege-download__body">
      <picture
        class="s-ege-download__bg"
      >
        <source
          media="(min-width: 1200px)"
          :srcset="imageLg"
        >
        <AImg
          :src="imageSm"
          :alt="title"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <h2
        class="s-ege-download__title a-font_h3"
        v-html="title"
      />
      <div
        v-if="subtitle"
        class="s-ege-download__subtitle"
        v-html="subtitle"
      />
      <div class="s-ege-download__bottom">
        <AButton
          class="s-ege-download__btn"
          @click="onClickDownload"
        >
          Скачать чек-лист
        </AButton>
        <AButton
          bg-color="white"
          class="s-ege-download__btn white"
          @click="onClickFreeLesson"
        >
          Бесплатный урок
        </AButton>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeDownload';
</style>
