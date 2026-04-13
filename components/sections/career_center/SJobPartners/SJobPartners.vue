<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { defaultPartnersLogos } from '../../shared/SPartners/partners-data';
import { useWindowSize } from '@vueuse/core';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const { width: windowWidth } = useWindowSize();
const isMobile = shallowRef(windowWidth.value < 768);

const sliders = computed(() => {
  const result = [];
  const size = isMobile.value ? Math.ceil(defaultPartnersLogos.length / 2) : Math.ceil(defaultPartnersLogos.length / 3);
  for(let i = 0; i < defaultPartnersLogos.length; i += size) {
    const part = defaultPartnersLogos.slice(i, i + size);

    result.push(part);
  }
  return result;
});

const title = routeName == 'podbor' ? 'Работаем с&nbsp;малым и&nbsp;крупным<br>бизнесом из&nbsp;разных отраслей' : 'Компании&nbsp;&mdash; партнёры <br>демо-корпорации';
const text = routeName == 'podbor' ? 'От&nbsp;промышленности и&nbsp;девелопмента<br>до&nbsp;HoReCa и&nbsp;сервисных платформ' : 'Сотрудничаем с&nbsp;ведущими компаниями <br>и&nbsp;организациями России и&nbsp;мира';

const imgSm = synergyApi('uploads/content/career_center/s-job-partners/sm.webp');
const imgLg = synergyApi('uploads/content/career_center/s-job-partners/lg.webp');

watchEffect(() => {
  isMobile.value = windowWidth.value < 1200;
});
</script>

<template>
  <MSectionNewResponsive
    class="s-job-partners"
  >
    <div class="s-job-partners__grid">
      <div class="s-job-partners__top">
        <h3
          class="a-font_h3 s-job-partners__title"
          v-html="title"
        />
        <p
          class="a-font_xl-m"
          v-html="text"
        />
        <picture>
          <source
            :srcset="imgLg"
            media="(min-width: 1200px)"
          >
          <AImg
            :src="imgSm"
            alt="partners"
          />
        </picture>
      </div>

      <div class="s-job-partners__sliders">
        <div
          v-for="items, index in sliders"
          :key="index"
          class="s-job-partners__slider"
          :style="`--slide-count:${items.length}`"
        >
          <span
            v-for="{ image }, idx in items"
            :key="image"
            :class="index % 2 ? '--toRight' : '--toLeft'"
            :style="`--n:${idx}`"
          >
            <AImg
              loading="lazy"
              decoding="async"
              :src="image"
              :alt="image"
            />
          </span>
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobPartners.scss';
</style>
