<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, Navigation, Grid } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import { subjects } from './subjects';

const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
});

const scoresData = ref(subjects.map((subject) => ({ ...subject, value: undefined })));
const results = shallowRef([]);
const resultsRef = useTemplateRef('resultsRef');
const { openModal } = useModalStore();

const inputHandler = (item) => {
  item.value = Math.max(0, Math.min(100, item.value));
};

const increment = (item) => {
  item.value = Math.min(100, !item.value ? 1 : item.value + 1);
};

const decrement = (item) => {
  item.value = Math.max(0, !item.value || item.value <= 0 ? 0 : item.value - 1);
};

async function getProgramsByScore() {
  const query = new URLSearchParams(scoresData.value.reduce((query, el) => {
    if (!el.value) {
      return query;
    }
    query[el.name] = el.value;
    return query;
  }, {}));

  const { data, error } = await useFetch(`/api/calculator?${query.toString()}`, {
    watch: false,
    deep: false,
  });

  if (!error.value) {
    return data.value?.programs || [];
  }

  console.error(error.value);

  return [];
}

async function submit() {
  results.value = await getProgramsByScore();

  if (results.value.length) {
    nextTick(() => {
      resultsRef.value.scrollIntoView({ block: 'center' });
    });

    return;
  }

  openModal('MModalForm', {
    formName: true,
    formPhone: true,
    title: 'Заполните форму и наш менеджер свяжется с вами',
    titleClass: 'a-font_h4',
    subtitle: '<p>По результатам подсчета, сумма введенных вами баллов ниже минимального проходного значения Минобрнауки.</p><p>Мы сформировали для вас индивидуальный план поступления. <br>Получите бесплатную консультацию приемной комиссии.',
    subtitleClass: 'a-font_h5',
    btn: 'Подать заявку',
    actionParams: [
      {
        param: 'form=ege_calc_min',
      },
    ],
  });
}

const {
  swiperConfig,
  swiperRef,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Scrollbar, Navigation, Grid],
  showSwiperScrollbar: true,
  showSwiperNavigation: true,
  slidesPerView: 'auto',
  spaceBetween: 16,
  breakpoints: {
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      grid: {
        rows: 2,
      },
    },
    1400: {
      slidesPerView: 'auto',
      spaceBetween: 20,
      grid: {
        rows: 2,
      },
    },
  },
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const { popupData, showPopup } = useProgramPopup(props.routeName);
const renderPopups = shallowRef(false);

onMounted(() => { renderPopups.value = true; });
</script>

<template>
  <div class="s-calculator">
    <div class="s-calculator__inner">
      <h2 class="l-section__title s-calculator__title a-font_h3">
        Калькулятор ЕГЭ 2026
      </h2>

      <div class="s-calculator__description a-font_xl-m">
        Калькулятор подберет образовательные программы, в&nbsp;соответствии с&nbsp;Вашим набором ЕГЭ. Введите баллы
        единых гос экзаменов (реальные или предполагаемые) и&nbsp;получите варианты программ высшего образования.
      </div>

      <form
        class="s-calculator__form nolander"
        @submit.prevent="submit"
      >
        <div
          v-for="item in scoresData"
          :key="item.title"
          class="s-calculator__lesson"
        >
          <span class="s-calculator__lesson-label">
            <span
              class="a-font_xl-m"
              v-html="item.title"
            />
            <span class="s-calculator__lesson-label-min a-font_m-m">Минимальный: {{ item.min }}</span>
          </span>
          <span class="s-calculator__lesson-input a-font_l-m">
            <input
              v-model="item.value"
              :name="item.name"
              :required="item.required"
              class="a-font_s"
              type="number"
              placeholder="0"
              min="0"
              max="100"
              @input="inputHandler(item)"
            >
            <button
              type="button"
              @click.up="increment(item)"
            >
              <ASvgMono name="chevron-down" />
            </button>

            <button
              type="button"
              @click.prevent="decrement(item)"
            >
              <ASvgMono name="chevron-down" />
            </button>
          </span>
        </div>
        <AButton
          type="submit"
          size="lg"
          class="s-calculator__form-btn"
        >
          Подобрать программу
        </AButton>
      </form>
    </div>
    <div
      v-if="results.length"
      ref="resultsRef"
      class="s-calculator__results"
    >
      <h2 class="l-section__title s-calculator__title a-font_h3">
        Результаты подбора
      </h2>
      <div class="s-calculator__description a-font_xl-m">
        <p>
          Узнайте список факультетов, на&nbsp;которые можно подать документы, а&nbsp;также перечень изучаемых
          дисциплин, информацию по&nbsp;трудоустройству и&nbsp;прохождению практики. А&nbsp;оставив заявку, можно
          получить персональную консультацию приёмной комиссии. Поступите в&nbsp;ВУЗ гарантировано!
        </p>
      </div>
      <div class="s-calculator__results-slider">
        <swiper
          ref="swiperRef"
          v-bind="swiperConfig"
        >
          <swiper-slide
            v-for="program in results"
            :key="program.id"
            role="group"
          >
            <MSpecialtyCard
              :id="program.id"
              :name="program.name"
              :faculty="program.faculty.text"
              :level="program.level.text"
              :place="program.place"
              :link="program.link"
              :is-new="program.new"
              :is-popular="program.isPopular"
              :is-partner="program.partner"
              :partner-logo="program.partnerLogo"
              :partner-text="program.partnerText"
              :partner-bonus="program.partnerBonus"
              :ico="program.direction_ico"
              :is-show-enroll="program.popup"
              :price="program.price"
              @enroll="showPopup(program)"
            />
          </swiper-slide>
        </swiper>

        <MSwiperNav ref="navRef" />
        <div
          ref="scrollbarRef"
          class="swiper-scrollbar"
        />
      </div>
    </div>
  </div>
  <SProgramsListPopup
    v-if="renderPopups"
    ref="programPopup"
    v-bind="popupData"
    :action-params="[{ param: 'form=postupi_short' }]"
    :route-name
  />
</template>

<style lang="scss" scoped>
@import './SCalculator.scss';
</style>
