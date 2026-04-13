<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { APP_LINKS } from '~/constants';

const downloadAppLinks = [
  {
    name: 'App Store',
    link: APP_LINKS.APP_STORE,
    image: synergyApi('uploads/content/s-download-app/apple.svg'),
  },
  {
    name: 'Google Play',
    link: APP_LINKS.GOOGLE_PLAY,
    image: synergyApi('uploads/content/s-download-app/google.svg'),
  },
];
</script>


<template>
  <MSection
    class="s-download-app"
  >
    <div class="s-download-app__grid">
      <div class="s-download-app__inner">
        <h4 class="s-download-app__title a-font_h4">
          Всё для&nbsp;вашей учёбы доступно онлайн
        </h4>
        <picture class="s-download-app__img">
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/s-download-app/lg.png')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/s-download-app/md.png')
          >
          <source srcset=synergyApi('uploads/content/s-download-app/sm.png')>
          <AImg
            src=synergyApi('uploads/content/s-download-app/sm.png')
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div class="s-download-app__text a-font_h6">
          Расписание, зачётку и&nbsp;домашние задания смотрите в&nbsp;приложении
        </div>
        <MAppLinks :app-links="downloadAppLinks" />
      </div>
      <MBannerCard
        img=synergyApi('uploads/content/s-download-app/banner-sm.svg')
        img-md=synergyApi('uploads/content/s-download-app/banner-md.svg')
        img-lg=synergyApi('uploads/content/s-download-app/banner-lg.svg')
        title="Пройдите тест<br>и узнайте, на кого вам<br>лучше учиться"
        title-class-name="a-font_h4"
        subtitle="Поможем сориентироваться"
        :tags="['Тест', '1 минута', '5 вопросов']"
      />
    </div>
  </MSection>
</template>

<style lang="scss" src="./SDownloadApp.scss" />
