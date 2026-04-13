<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_price?.length ? entity.customFields.mba_program_price[0] : {}),
  dateStart: entity.customFields.mba_programs_dates_start[0].date_from,
  discountUntil: entity.customFields.mba_program_price?.length ? entity.customFields.mba_program_price[0].timeLeft : '',
};

const { timeLeft } = useCountdown(data.discountUntil);

const formattedDateStart = computed(() => {
  if (!data.dateStart) return '';
  const date = new Date(data.dateStart);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
});

const placesLabel = computed(() => {
  const count = Number(data.left) || 0;
  return 'Осталось ' + declensionOfNumber(count, ['место', 'места', 'мест'], true);
});

const bg1 = {
  imageLG: '/img/mba/price-1_lg.webp',
  imageMD: '/img/mba/price-1_md.webp',
  imageSM: '/img/mba/price-1_sm.webp',
};

const bg2 = {
  imageLG: '/img/mba/price-2_lg.webp',
  imageMD: '/img/mba/price-2_md.webp',
  imageSM: '/img/mba/price-2_sm.webp',
};
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-price"
  >
    <div class="s-mba-price__body">
      <div class="s-mba-price__left">
        <div class="s-mba-price__top">
          <div
            class="s-mba-price__title a-font_h2"
            v-html="data.title"
          />
          <div
            v-if="data.discount"
            class="s-mba-price__discount a-font_h4"
          >
            -{{ data.discount }}%
          </div>
        </div>
        <div class="s-mba-price__bottom">
          <div class="s-mba-price__info">
            <div
              v-if="data.oldMonthPrice || data.monthPrice"
              class="s-mba-price__prices"
            >
              <span
                v-if="data.oldMonthPrice"
                class="crossed a-font_l-m"
              >
                {{ data.oldMonthPrice }}
                <span class="ruble-icon">Р</span>/мес.</span>
              <span
                v-if="data.monthPrice"
                class="a-font_h3"
              >{{ data.monthPrice }} <span class="ruble-icon">Р</span>/мес.</span>
            </div>
            <div class="s-mba-price__total a-font_m">
              <span>Рассрочка на 12 месяцев, без переплат и первого взноса</span>
              <span v-if="data.totalPrice">
                Итоговая сумма за курс:
                <span
                  v-if="data.oldTotalPrice"
                  class="crossed"
                >{{ data.oldTotalPrice }} <span class="ruble-icon">Р</span></span>
                {{ data.totalPrice }} <span class="ruble-icon">Р</span>
              </span>
            </div>
          </div>
          <div class="s-mba-price__time">
            <div class="s-mba-price__start a-font_m">
              Старт курса {{ formattedDateStart }}
            </div>

            <div class="s-mba-price__left-places a-font_m">{{ placesLabel }}</div>

            <div
              v-if="data.discountUntil"
              class="s-mba-price__time-left"
            >
              <span class="a-font_m">До конца скидки</span>
              <div class="s-mba-price__wrapper">
                <div class="s-mba-price__item">
                  <div class="s-mba-price__case a-font_xl-m">{{ timeLeft.days.value }}</div>
                  <div class="s-mba-price__label">{{ timeLeft.days.label }}</div>
                </div>

                <div class="s-mba-price__item">
                  <div class="s-mba-price__case a-font_xl-m">{{ timeLeft.hours.value }}</div>
                  <div class="s-mba-price__label">{{ timeLeft.hours.label }}</div>
                </div>

                <div class="s-mba-price__item">
                  <div class="s-mba-price__case a-font_xl-m">{{ timeLeft.minutes.value }}</div>
                  <div class="s-mba-price__label">{{ timeLeft.minutes.label }}</div>
                </div>

                <div class="s-mba-price__item">
                  <div class="s-mba-price__case a-font_xl-m">{{ timeLeft.seconds.value }}</div>
                  <div class="s-mba-price__label">секунд</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="data.formTitle || data.formSubtitle"
        class="s-mba-price__right"
      >
        <MForm
          :title="data.formTitle || 'Заполните форму'"
          :subtitle="data.formSubtitle || undefined"
          subtitle-class="a-font_l-m"
          form-mail
          :action-params="[{param: 'form=mba_stoimost'}]"
          btn="Оставить заявку"
        />
      </div>
    </div>
    <div class="s-mba-price__add-info">
      <div class="s-mba-price__plan">
        <ABgImages v-bind="bg1" />
        <span class="a-font_h5">Рассрочка без процентов</span>
      </div>
      <div class="s-mba-price__tax">
        <ABgImages v-bind="bg2" />
        <span class="a-font_h5">Оформление налогового вычета</span>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaPrice';
</style>
