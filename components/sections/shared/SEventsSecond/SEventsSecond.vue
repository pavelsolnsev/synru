<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, Navigation } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import DefaultEventImage from '~/assets/images/global/placeholder_card.svg?url';
import type { Event } from '~/types';

interface Props {
  title?: string;
  events?: Event[];
}

const {
  title = '',
  events: rawEvents = [],
} = defineProps<Props>();

const events = rawEvents.reduce((acc, event) => {
  if (!event.date) return acc;
  if (!compareEventDate(event.date)) return acc;

  const date = formatEnDate(event.date);
  const time = event.time ? `в ${event.time}` : '';

  const formatEvent = {
    ...event,
    date: `${date}<br>${time}`,
  };

  acc.push(formatEvent);

  return acc;
}, [] as Event[]);

const {
  swiperConfig,
  swiperRef,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Scrollbar, Navigation],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});

const { openModal } = useModalStore();

const modalProps = {
  title: "Заполните форму, чтобы записаться на&nbsp;мероприятие",
  formName: true,
  formPhone: true,
  actionParams: [{param: 'form=event_ab_kruchu'}],
};

function formatEnDate(enDate: string | undefined) {
  if (!enDate) return '';

  const [datePart] = enDate.split(' ');
  const [year, month, day] = datePart.split('-');

  const ruDate = formateDateToLocale(`${day}.${month}.${year}`);

  const [ruDay, ruMonth] = ruDate.split(' ');

  return `${ruDay} ${ruMonth}`;
}

function compareEventDate(enDate: string) {
  const eventDate = new Date(enDate);

  const today = new Date();

  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
}
</script>

<template>
  <MSectionSecond
    v-if="events.length"
    class="s-events --second"
    :title
  >
    <div class="s-events__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="event, index in events"
          :key="index"
          class="s-events__item swiper-slide"
        >
          <div
            v-if="event.tag"
            class="s-events__item-tag a-font_m-m"
            v-html="event.tag"
          />
          <div
            v-if="event.date"
            class="s-events__item-tag --date a-font_m-m"
            v-html="event.date"
          />
          <picture>
            <AImg
              class="s-events__item-img lazy"
              :src="event.image ?? DefaultEventImage"
              :alt="event.title"
              :data-srcset="event.image"
            />
          </picture>
          <div class="s-events__item-content">
            <div
              v-if="event.title"
              class="s-events__item-title a-font_xl-m"
              v-html="event.title"
            />
            <div
              v-if="event.description"
              class="s-events__item-desc a-font_m-m"
              v-html="event.description"
            />
            <div
              v-if="event.place"
              class="s-events__item-text a-font_m"
              v-html="event.place"
            />
            <AButtonThird
              class="s-events__item-btn"
              size="md"
              @click="openModal('MModalForm', modalProps)"
            >
              <span>Записаться</span>
            </AButtonThird>
          </div>
        </swiper-slide>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SEventsSecond.scss';
</style>
