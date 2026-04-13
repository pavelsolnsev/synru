<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';

const universityPriorities = [
  {
    title: 'Приоритет',
    text: 'Требования крупнейших компаний-работодателей',
    img: synergyApi('uploads/content/s-university/priorities/1.webp'),
  },
  {
    title: 'Актуальные знания',
    text: 'Все наши преподаватели&nbsp;&mdash; специалисты-практики',
    img: synergyApi('uploads/content/s-university/priorities/2.webp'),
  },
  {
    title: 'Высокий результат',
    text: 'Выпускники&nbsp;&mdash; новая профессиональная элита',
    img: synergyApi('uploads/content/s-university/priorities/3.webp'),
  },
];

const infoBlocks = [
  {
    title: '1995',
    text: 'год основания демо-портала',
    icon: '',
  },
  {
    title: '>1000',
    text: 'образовательных программ',
    icon: '',
  },
  {
    title: '>200 000',
    text: 'обучающихся на платформе',
    icon: '',
  },
  {
    title: '>500 000',
    text: 'выпускников',
    icon: '',
  },
];
</script>

<template>
  <MSection
    title="Об университете"
    class="s-university"
  >
    <MUniversityTarget
      :title="`<span class='red'>Наша цель</span>&nbsp;&mdash; качественное образование для&nbsp;вашей успешной карьеры`"
      title-class="a-font_h4"
      text="<p>Более 25&nbsp;лет мы учим актуальным и&nbsp;востребованным профессиям. У&nbsp;нас вы получите знания, которые помогут развить свой бизнес или&nbsp;устроиться на&nbsp;работу в&nbsp;крупную компанию.</p><a class=&quot;a-btn a-btn--lg a-font_xl-m a-btn--primary a-btn--red&quot; href=&quot;/about&quot;><span>Подробнее</span></a>"
      text-class="a-font_h6"
      :icons="['simple-25', 'simple-bag']"
      :is-big="true"
      :image-lg="synergyApi('uploads/content/s-university/video/video_lg.webp')"
      :image-md="synergyApi('uploads/content/s-university/video/video_md.webp')"
      :image="synergyApi('uploads/content/s-university/video/video.webp')"
      video-bg=""
      video="https://www.youtube.com/embed/uwkydBf7TC4?si=uxDrukT7CrwTkVqS"
      tag="Смотрите видео о&nbsp;Университете"
      :achievements="infoBlocks"
      :university-priorities="universityPriorities"
    />
  </MSection>
</template>

<style lang="scss" src="./SUniversity.scss" />
