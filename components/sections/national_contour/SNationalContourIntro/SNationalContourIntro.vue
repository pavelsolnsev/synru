<script lang="ts" setup>
interface Props {
  routeName?: string;
  title: string;
  subtitle: string;
  cards: {
    title: string
    subtitle: string
    icon?: string
  }[];
  bgImages: { image: string }[];
  isBottomCards: boolean;
}

const {
  routeName = '',
  title = '',
  subtitle = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const isInternational = routeName === 'podbor';
</script>

<template>
  <MSectionNewResponsive
    class="s-national-contour-intro"
    :class="{ 's-national-contour-intro--default': !isInternational }"
  >
    <div class="s-national-contour-intro__body">
      <div class="s-national-contour-intro__info">
        <div class="s-national-contour-intro__top">
          <MBreadcrumbs :breadcrumbs />
          <h2
            v-dompurify-html="title"
            class="s-national-contour-intro__title a-font_h1-banner"
          />
        </div>

        <div class="s-national-contour-intro__bottom">
          <div
            v-dompurify-html="subtitle"
            class="s-national-contour-intro__subtitle-desktop a-font_h5"
            :class="isInternational ? 'a-font_xl-m' : undefined"
          />

          <div
            v-if="!isBottomCards"
            class="s-national-contour-intro__cards"
          >
            <div
              v-for="card in cards"
              :key="card.title"
              :class="[
                's-national-contour-intro__card',
                { 'flex-raw': !card.title },
                { 'short': isInternational },
              ]"
            >
              <div class="s-national-contour-intro__card-top">
                <span
                  v-if="card.title"
                  class="s-national-contour-intro__card-title a-font_xl-m"
                  v-html="card.title"
                />

                <ASvgMono
                  name="simple-check3"
                  :class="!card.title ? 'desktop' : undefined"
                />
              </div>

              <ASvgMono
                v-if="!card.title"
                name="simple-check3"
                class="mobile"
              />
              <span
                v-dompurify-html="card.subtitle"
                class="s-national-contour-intro__card-subtitle a-font_m-m"
              />
            </div>
          </div>

          <div class="s-national-contour-intro__btns">
            <span
              v-dompurify-html="subtitle"
              class="s-national-contour-intro__subtitle-mobile a-font_h5"
              :class="isInternational ? 'a-font_l-m' : undefined"
            />

            <MQuizForm
              class="s-national-contour-intro__quiz-form"
              btn="Начать подбор"
              :action-params="[{param: 'form=pervyy_ekran'}]"
              theme="dark"
            />
          </div>
        </div>

        <picture>
          <source
            :srcset="bgImages[1].image"
            media="(min-width: 1200px)"
          >
          <AImg
            :src="bgImages[0].image"
            alt="credit"
          />
        </picture>
      </div>
    </div>

    <div
      v-if="isBottomCards"
      class="s-national-contour-intro__bottom-cards"
    >
      <div
        v-for="card in cards"
        :key="card.title"
        class="s-national-contour-intro__bottom-card"
      >
        <div class="s-national-contour-intro__bottom-card-text">
          <span
            v-if="card.title"
            v-dompurify-html="card.title"
            class="s-national-contour-intro__bottom-card-title a-font_h5"
          />
          <span
            v-dompurify-html="card.subtitle"
            class="s-national-contour-intro__bottom-card-subtitle a-font_xl-m"
          />
        </div>

        <ASvgMono
          :name="card.icon ?? 'simple-check3'"
          class="s-national-contour-intro__bottom-card-icon"
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SNationalContourIntro.scss';
</style>


