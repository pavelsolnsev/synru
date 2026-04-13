<script setup lang='ts'>
const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Скачайте гайд для&nbsp;эффективного онлайн-обучения',
    titleClass: 'a-font_h4',
    subtitle: 'Вы получите гайд по&nbsp;СМС и&nbsp;в&nbsp;Telegram',
    subtitleClass: 'a-font_xl-m',
    btn: 'Cкачать',
    formPhone: true,
    formName: false,
    actionParams: [{param: 'form=courses_guide'}],
  });
}
</script>

<template>
  <MSection class="s-download-guide">
    <div class="s-download-guide__content">
      <picture>
        <source
          srcset="/img/courses/download-guide-bg_lg.webp"
          media="(min-width: 1200px)"
        >
        <source
          srcset="/img/courses/download-guide-bg_md.webp"
          media="(min-width: 768px)"
        >
        <AImg
          src="/img/courses/download-guide-bg_sm.webp"
          alt="Как получить максимум от онлайн-курсов?"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <h2 class="a-font_slider">Как получить максимум от&nbsp;онлайн-курсов?</h2>
      <p class="a-font_xl-m">Мы подготовили гайд, который поможет вам успешно проходить любые онлайн-курсы и&nbsp;добиваться результата. Читайте и&nbsp;достигайте цели!</p>
      <AButton @click="openForm()">
        Скачать бесплатно
      </AButton>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SDownloadGuide.scss';
</style>
