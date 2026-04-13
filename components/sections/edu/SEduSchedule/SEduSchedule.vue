<script setup lang="ts">
import { EGE_SCHEDULE } from '~/constants/routes';
import { EGE_SCHEDULE as egeSchedule, OGE_SCHEDULE as ogeSchedule } from './scheduleData';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const route = useRoute();
const type = EGE_SCHEDULE === route.path ? 'ege_schedule' : 'oge_schedule';
const data_schedule = EGE_SCHEDULE === route.path ? egeSchedule : ogeSchedule;
const currentYear = new Date().getFullYear();

const data = {
  'ege_schedule': {
    title: `Расписание ЕГЭ в&nbsp;${currentYear} году`,
    content: '<p>Минпросвещения и Рособрнадзор опубликовали проект приказа о едином расписании ЕГЭ-2026. На основании прошлых лет, точное расписание может немного измениться, но основные даты, скорее всего, останутся такими.</p><p>Главный этап ЕГЭ в 2026 году запланирован с 1 по 19 июня - довольно поздняя дата. Как и в предыдущие годы, предусмотрена возможность пересдать один предмет по желанию для улучшения результата - экзамен по нему пройдет 8-9 июля. Все экзамены стартуют в 10 утра по местному времени.</p>',
  },
  'oge_schedule': {
    title: `Расписание ОГЭ в&nbsp;${currentYear} году`,
    content: '<p>Минпросвещения опубликовали<span> проект приказа с датами проведения основного государственного экзамена (ОГЭ) в 2026 году. Основной период ОГЭ предположительно пройдет со 2 июня по 6 июля. Досрочный период — с 21 апреля по 18 мая. </span>Резервные дни и дни пересдач: 29 июня — математика; 2 июля — русский язык; 3 и 6 июля — предметы по выбору (все, кроме русского языка и математики).</p>',
  },
};

const activeTab = ref(0);

function countLessons(num: number) {
  const count = (num > 3) && (num % 3) ? 'n' : num % 3;
  return `s-schedule__subjects --x${count}` ;
}
</script>

<template>
  <SEduWrapper
    :route-name
  >
    <template #top>
      <div class="s-schedule">
        <h2
          class="l-section__title a-font_h3"
          v-html="data[type].title"
        />
        <div
          v-if="data[type].content"
          class="s-schedule__content a-font_l"
          v-html="data[type].content"
        />

        <MTabs
          v-if="data_schedule.length > 1"
          v-model="activeTab"
          :items="data_schedule"
        />

        <div class="s-schedule__inner">
          <template
            v-for="tab, index in data_schedule"
            :key="tab.label"
          >
            <div
              v-show="activeTab === index"
              :id="`s-schedule__tabs_${index}`"
              class="s-schedule__card"
            >
              <template
                v-for="item in tab.dates"
                :key="item.date"
              >
                <div
                  class="s-schedule__title a-font_xl-m"
                  v-html="item.date"
                />
                <div :class="countLessons(item.lessons.length)">
                  <AButtonSecond
                    v-for="lesson in item.lessons"
                    :key="lesson"
                    bg-color="transparent"
                    class="a-btn--lg"
                  >
                    <span v-html="lesson" />
                  </AButtonSecond>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </template>

    <template #bottom>
      <SEduWrapperBottom />
    </template>
  </SEduWrapper>
</template>

<style lang="scss" scoped>
@import './SEduSchedule.scss';
</style>
