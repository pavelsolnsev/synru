<script lang="ts" setup>
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string
  routeName?: string
  entity?: { id?: number, name?: string; short_name?: string; }
  bgImages: BgImage[]
  time: string
  place: string
}

const {
  routeName = '',
  entity = {},
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Регистрация',
    btn: 'Зарегистрироваться',
    formName: true,
    formPhone: true,
    formMail: true,
    actionParams: [{param: 'form=registration_EMBA'}],
  });
}
</script>

<template>
  <MSection class="s-dodemba-hero">
    <div class="s-dodemba-hero__body">
      <ABgImages v-bind="{...bgImages[0]}" />
      <div class="s-dodemba-hero__info">
        <MBreadcrumbs :breadcrumbs />
        <h1 class="s-dodemba-hero__title">{{ title }}</h1>
        <div
          class="s-dodemba-hero__subtitle"
          v-html="subtitle"
        />
        <div class="s-dodemba-hero__free">Бесплатное участие</div>
        <AButton
          class="s-dodemba-hero__btn"
          size="lg"
          @click="openForm()"
        >
          Зарегистрироваться
        </AButton>
      </div>
      <div class="s-dodemba-hero__place-and-time">
        <div class="s-dodemba-hero__item">
          <ASvgMono
            name="dodemba-time"
            class="s-dodemba-hero__icon"
          />
          <span
            class="big"
            v-html="time"
          />
          <span class="small">Сбор гостей, регистрация</span>
        </div>
        <div class="s-dodemba-hero__item">
          <ASvgMono name="dodemba-place" />
          <span
            class="big"
            v-html="place"
          />
          <span class="small">Место проведения мероприятия</span>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaHero.scss';
</style>
