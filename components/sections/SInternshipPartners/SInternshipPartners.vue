<script setup lang='ts'>
import { defaultPartnersLogos } from '../shared/SPartners/partners-data';

const part = Math.ceil(defaultPartnersLogos.length / 3);

const sliders = [
  defaultPartnersLogos.slice(0, part),
  defaultPartnersLogos.slice(part, defaultPartnersLogos.length - part),
  defaultPartnersLogos.slice(defaultPartnersLogos.length - part),
];
</script>

<template>
  <MSection class="s-internship-partners">
    <div class="s-internship-partners__sliders">
      <div
        class="s-internship-partners__slider"
        :style="`--slide-count:${sliders[0].length}`"
      >
        <div
          v-for="{ image }, idx in sliders[0]"
          :key="image"
          class="s-internship-partners__item"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>

      <div
        class="s-internship-partners__slider"
        :style="`--slide-count:${sliders[1].length}`"
      >
        <div
          v-for="{ image }, idx in sliders[1]"
          :key="image"
          class="s-internship-partners__item --toRight"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>

      <div
        class="s-internship-partners__slider"
        :style="`--slide-count:${sliders[2].length}`"
      >
        <div
          v-for="{ image }, idx in sliders[2]"
          :key="image"
          class="s-internship-partners__item"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>
    </div>
    <div class="s-internship-partners__info">
      <h2 class="a-font_h4">Стажировка, производственная практика и&nbsp;работа в&nbsp;<span class="nobr">компаниях-партнёрах</span></h2>
      <div class="a-font_xl-m s-internship-partners__info-text">
        <p>Обеспечиваем стажировку и&nbsp;производственную практику в&nbsp;ведущих компаниях, чтобы вы погрузились в&nbsp;рабочую среду, выполняли задачи под&nbsp;руководством экспертов и&nbsp;получили реальный практический опыт.</p>
        <p>После окончания обучения вы можете продолжить работу и&nbsp;развивать карьеру в&nbsp;этих компаниях.</p>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SInternshipPartners.scss';
</style>
