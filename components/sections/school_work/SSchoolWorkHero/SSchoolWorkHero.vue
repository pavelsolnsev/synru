<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string,
  description: string,
  btnText: string,
  bgImages: BgImage[]
  tags: {
    icon: string,
    title: string
  }[],
  cards: {
    title: string
    subtitle: string
  }[]
  routeName: string,
}
const { routeName } = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const { openModal } = useModalStore();

function openFormHero() {
  openModal('MModalForm', {
    title: 'Заполни форму, мы свяжемся с тобой',
    btn: 'Оставить заявку',
    formName: false,
    formPhone: true,
    actionParams: [{param: 'form=pervyy_ekran'}]
  });
}
</script>

<template>
  <MSection class="s-school-work-hero">
    <div class="s-school-work-hero__body">
      <div class="s-school-work-hero__top">
        <ABgImages v-bind="{...bgImages[0]}" />
        <div class="s-school-work-hero__info">
          <MBreadcrumbs :breadcrumbs />
          <h1
            class="s-school-work-hero__title"
            v-html="title"
          />
          <div
            class="s-school-work-hero__subtitle"
            v-html="subtitle"
          />
          <ul class="s-school-work-hero__mobile-scroll">
            <li
              v-for="tag in tags"
              :key="tag.title"
              class="s-school-work-hero__tag"
            >
              <div class="s-school-work-hero__tag-icon">
                <AImg
                  :src="`/img/school-work/${tag.icon}.svg`"
                  alt="icon"
                />
              </div>

              <div
                class="s-school-work-hero__tag-name"
                v-html="tag.title"
              />
            </li>
          </ul>
          <div class="s-school-work-hero__mobile-wrapper">
            <div
              class="s-school-work-hero__description"
              v-html="description"
            />
            <AButton
              class="s-school-work-hero__button"
              variant="primary"
              @click="openFormHero"
            >
              <span>{{ btnText }}</span>
            </AButton>
          </div>
        </div>
        <ul
          class="s-school-work-hero__tags"
        >
          <li
            v-for="tag in tags"
            :key="tag.title"
            class="s-school-work-hero__tag"
          >
            <div class="s-school-work-hero__tag-icon">
              <AImg
                :src="`/img/school-work/${tag.icon}.svg`"
                alt="icon"
              />
            </div>

            <div
              class="s-school-work-hero__tag-name"
              v-html="tag.title"
            />
          </li>
        </ul>
      </div>
      <ul class="s-school-work-hero__bottom">
        <li
          v-for="card in cards"
          :key="card.title"
          class="s-school-work-hero__card"
        >
          <div class="s-school-work-hero__wrapper">
            <div
              class="a-font_h5"
              v-html="card.title"
            />
            <ASvgMono
              name="list-icon"
              class="s-school-work-hero__card-icon"
            />
          </div>
          <div
            class="s-school-work-hero__card-subtitle"
            v-html="card.subtitle"
          />
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkHero.scss';
</style>
