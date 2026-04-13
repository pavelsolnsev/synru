<script setup lang="ts">
import { COMMON } from '~/constants';

interface Props {
  address: Address[];
  commonPhones: string[];
  studentsPhones: string[];
  schedules: Schedule[];
}

interface Address {
  metro?: string;
  city?: string;
  address?: string;
  localBusinessSchema?: string;
}

interface Schedule {
  days?: string;
  times?: string;
  dayOfWeek?: string[],
  opens?: string,
  closes?: string,
}

const {
  address = [],
  commonPhones = [],
  studentsPhones = [],
  schedules = [],
} = defineProps<Props>();

const path = useRoute().path;
</script>

<template>
  <div class="m-nav-contacts">
    <div class="m-nav-contacts__section">
      <div
        class="m-nav-contacts__title a-font_l-m"
      >
        <span>Адреса:</span>
      </div>
      <AImg
        :src="COMMON.LOGO_URL"
        style="display: none;"
        itemprop="image"
      />
      <div
        v-for="item in address"
        :key="item.metro"
        class="m-nav-contacts__section-wrap"
        itemprop="address"
        itemscope
        itemtype="http://schema.org/PostalAddress"
      >
        <div class="a-font_s-m m-nav-contacts__address">
          <span>М&nbsp;</span>
          <span v-html="item.metro" />
        </div>
        <div
          class="a-font_s"
        >
          <span
            v-html="`${item.city}, `"
            itemprop="addressLocality"
          />
          <span
            v-html="item.address"
            itemprop="streetAddress"
          />
        </div>
      </div>
    </div>
    <div class="m-nav-contacts__section">
      <div class="m-nav-contacts__title a-font_l-m">
        По всем вопросам
      </div>
      <div class="m-nav-contacts__section-wrap">
        <MPhones
          :phones="commonPhones"
          :icon="false"
          class="a-font_s-m"
        />
      </div>
    </div>
    <div class="m-nav-contacts__section m-nav-contacts__students">
      <div class="m-nav-contacts__title a-font_l-m">
        Для студентов
      </div>
      <div class="m-nav-contacts__section-wrap">
        <MPhones
          :phones="studentsPhones"
          :icon="false"
          class="a-font_s-m"
        />
      </div>
    </div>
    <div class="m-nav-contacts__section">
      <div class="m-nav-contacts__title a-font_l-m">
        График работы:
      </div>
      <div class="m-nav-contacts__section-wrap">
        <div
          v-for="schedule in schedules"
          :key="schedule.days"
          class="m-nav-contacts__schedule a-font_s"
          itemscope
          itemtype="https://schema.org/OpeningHoursSpecification"
        >
          <span v-html="schedule.days" />
          <span
            class="a-font_m-m"
            v-html="`${schedule.opens}–${schedule.closes}`"
          />
          <meta
            v-for="day in schedule.dayOfWeek"
            :key="day"
            itemprop="dayOfWeek"
            :content="day"
          />
          <meta itemprop="opens" :content="schedule.opens" />
          <meta itemprop="closes" :content="schedule.closes" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MNavContacts.scss';
</style>
