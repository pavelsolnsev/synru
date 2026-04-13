<script setup lang="ts">
import { email, phones, schedule } from './contactsData';
import { ROUTES } from '~/constants';

interface Props {
  showForm?: boolean
  showMoreButton?: boolean;
  routeName?: string;
}

const {
  showForm = false,
  showMoreButton = false,
  routeName = '',
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-contacts"
    title="Контакты"
  >
    <div class="s-contacts__wrap">
      <div class="s-contacts__item m-card-text">
        <div class="s-contacts__item-title a-font_h6">
          Электронная почта
        </div>
        <div class="s-contacts__item-content a-font_m-m">
          <div
            v-for="item in email"
            :key="item.title"
            class="s-contacts__item-contact"
          >
            <div
              class="s-contacts__item-contact-title"
              v-html="item.title"
            />
            <NuxtLink
              class="a-tag a-tag--primary"
              :to="`mailto:${item.email}`"
            >
              <span v-html="item.email" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="s-contacts__item m-card-text">
        <div class="s-contacts__item-title a-font_h6">Телефоны</div>
        <div class="s-contacts__item-content a-font_m-m">
          <div
            v-for="item in phones"
            :key="item.title"
            class="s-contacts__item-contact"
          >
            <div
              class="s-contacts__item-contact-title"
              v-html="item.title"
            />
            <div class="s-contacts__item-phones">
              <NuxtLink
                v-for="phone in item.phones"
                :key="phone"
                class="a-tag a-tag--primary"
                :to="`tel:${$phoneToLink(phone)}`"
              >
                <span v-html="phone" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!showForm"
        class="s-contacts__item m-card-text"
      >
        <div class="s-contacts__item-title a-font_h6">Время работы</div>
        <div class="s-contacts__timeline">
          <div
            v-for="item in schedule"
            :key="item.day"
            class="contact-timeline"
            :class="item.class"
          >
            <div class="contact-timeline__wrap">
              <div class="contact-timeline__line a-font_s-m">
                <span v-html="item.start" />
                <span v-html="item.end" />
              </div>
            </div>
            <span
              class="a-font_m-m"
              v-html="item.day"
            />
          </div>
        </div>
      </div>

      <div
        v-else
        class="s-contacts__item s-contacts__item--form m-card-text"
      >
        <MAskQuestionForm
          title="У вас есть вопрос?"
          title-class="a-font_h5"
          subtitle="Заполните форму, мы перезвоним и ответим на все интересующие вас вопросы."
          subtitle-class="a-font_l-m"
          bg-color="red"
          :action-params="[
            {param: 'form=contacts'},
          ]"
          :route-name
        />
      </div>
    </div>

    <MMore
      v-if="showMoreButton"
      text="Узнать больше"
      size="lg_m"
      :href="ROUTES.CONTACTS"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SContacts.scss';
@import '../../../atoms/ATag/ATag.scss';
@import '../../../molecules/MCardText/MCardText.scss';
</style>
