<script setup lang="ts">
import BgLg from '~/assets/images/s_personnel_reserve/personal-reserve-bg-lg.webp';
import BgMd from '~/assets/images/s_personnel_reserve/personal-reserve-bg-md.webp';
import BgSm from '~/assets/images/s_personnel_reserve/personal-reserve-bg-sm.webp';
import ImageLg from '~/assets/images/s_personnel_reserve/personal-reserve-lg.webp';
import ImageMd from '~/assets/images/s_personnel_reserve/personal-reserve-md.webp';
import ImageSm from '~/assets/images/s_personnel_reserve/personal-reserve-sm.webp';
import LogoImage from '~/assets/images/s_personnel_reserve/kp.webp';
import { defaultFactoids } from './sPersonnelReserveData';

interface Props {
  title?: string;
  description?: string;
  factoids: { title?: string; text?: string; image?: string; class?: string }[]
  altForm?: boolean;
}

const {
  title = 'Кадровый резерв',
  description:propsDescription,
  factoids: propsFactoids,
  altForm = false,
} = defineProps<Props>();

const DEFAULT_DESCRIPTION = 'Студенты из&nbsp;регионов России и&nbsp;стран ближнего зарубежья могут бесплатно учиться по&nbsp;программе «Кадровый резерв»: мы полностью оплачиваем очное обучение и&nbsp;проживание в&nbsp;Москве.<br><br> Это уникальный путь получения высшего образования и&nbsp;построения карьеры, формирующий новое поколение руководителей и&nbsp;топ-менеджеров. Студенты программы трудоустраиваются в&nbsp;партнёрские организации одновременно с&nbsp;зачислением и&nbsp;начинают строить карьеру с&nbsp;первого курса.';

const description = propsDescription ? propsDescription : DEFAULT_DESCRIPTION;

const factoids = propsFactoids?.length ? propsFactoids : defaultFactoids;
</script>

<template>
  <MSection class="s-personnel-reserve">
    <div class="s-personnel-reserve__wrapper">
      <div class="s-personnel-reserve__main">
        <div class="s-personnel-reserve__main__info">
          <div class="s-personnel-reserve__main__info__header">
            <div
              class="s-personnel-reserve__main__info__header-title a-font_h2"
              v-html="title"
            />

            <AImg
              alt="kp"
              :src="LogoImage"
            />
          </div>

          <div
            class="s-personnel-reserve__main__info__text"
            v-html="description"
          />
        </div>
        <div class="s-personnel-reserve__main__image">
          <picture>
            <source
              :srcset="ImageLg"
              media="(min-width: 1200px)"
            >
            <source
              :srcset="ImageMd"
              media="(min-width: 768px)"
            >
            <AImg
              :src="ImageSm"
              alt="personnel-reserve"
              decoding="async"
              loading="lazy"
            />
          </picture>
        </div>
        <div class="s-personnel-reserve__main__bg">
          <picture>
            <source
              :srcset="BgLg"
              media="(min-width: 1200px)"
            >
            <source
              :srcset="BgMd"
              media="(min-width: 768px)"
            >
            <AImg
              :src="BgSm"
              alt="kp"
              decoding="async"
              loading="lazy"
            />
          </picture>
        </div>
      </div>

      <div class="s-personnel-reserve__additional">
        <div class="s-personnel-reserve__factoids">
          <div
            v-for="factoid in factoids"
            :key="factoid.text"
            class="s-personnel-reserve__factoid"
            :class="factoid.class"
          >
            <div
              class="s-personnel-reserve__factoid__title"
              v-html="factoid.title"
            />
            <div
              class="s-personnel-reserve__factoid__text a-font_l-m"
              v-html="factoid.text"
            />
            <AImg
              class="s-personnel-reserve__factoid__image"
              alt="factoid"
              :src="factoid.image"
            />
          </div>
        </div>
        <MFormMin
          title="Хотите узнать больше о&nbsp;программе?"
          title-class="a-font_h3"
          subtitle="Оставьте контакты, и&nbsp;мы расскажем, как поступить на&nbsp;«Кадровый&nbsp;резерв» и&nbsp;учиться бесплатно"
          subtitle-class="a-font_h6"
          form-name
          form-phone
          show-logo
          bg-color="red"
          btn="Отправить заявку"
          :action-params="[{param: 'form=kadrovyj_rezerv'}]"
          :class="{'--alt-form': altForm}"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPersonnelReserve.scss';
</style>
