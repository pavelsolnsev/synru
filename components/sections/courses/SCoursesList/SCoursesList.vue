<script setup>
import { FREE_COURSE_DIRECTION_NAME, FACULTY_FILTER_OPTION_HELP_FORM } from '~/constants/common';

const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
});

const switcherItems = [
  {
    label: 'От 6 месяцев',
    value: 'fromSix',
    count: 0,
  },
  {
    label: 'До 6 месяцев',
    value: 'upSix',
    count: 0,
  },
  {
    label: 'Мини-курсы',
    value: 'isMini',
    count: 0,
  },
  {
    label: 'Экспресс-курсы',
    value: 'isExpress',
    count: 0,
    to: `/${EXPRESS_COURSES_ROUTE}`,
  },

];

const { data } = await useFetch('/api/getCoursesFilterData', {
  watch: false,
  deep: false,
});

const {
  courses = [],
  coursesTypes = [],
  faculties: facultiesData = [],
  forms: formsData = [],
} = data.value;

const EXPRESS_COURSES_ROUTE = 'express_professions';

const faculties = ref(facultiesData);
const formats = ref(formsData);

const selectedDuration = ref(null);
const selectedDirection = ref(null);
const selectedFaculty = ref(null);
const selectedFormat = ref(null);
const resetFiltersButtonDisabled = ref(false);

const coursesCount = computed(() => {
  const countByRouteMap = {
    [EXPRESS_COURSES_ROUTE]: () => {
      return courses?.filter((course) => course.isExpress)?.length;
    },
    default: () => {
      return courses?.length;
    },
  };

  const countHandler = countByRouteMap[props.routeName] ?? countByRouteMap['default'];

  return countHandler();
});

const types = {
  fromSix: 0,
  upSix: 0,
  isMini: 0,
  isExpress: 0,
};

courses.forEach((course) => {
  types[course.courseType] += 1;
});

switcherItems.forEach((item) => {
  item.count = types[item.value];
});

const coursePopup = useTemplateRef('popup');
const popupData = ref({});

const filteredCourses = computed(() => {
  return courses.filter(isMatch);
});

const filteredCoursesWithHelpCards = shallowRef(filteredCourses.value);

watch(filteredCourses, () => {
  filteredCoursesWithHelpCards.value = addHelpCardsToCourses(filteredCourses.value);
});

const filterState = {
  currentState: 'initial',
  states: {
    initial: {
      onStateChanged() {
        selectedDuration.value = 'fromSix';
        selectedFaculty.value = null;
        selectedFormat.value = null;
        selectedDirection.value = null;
        resetFiltersButtonDisabled.value = true;
        preselectEntity(props.routeName);
      },
    },
    durationSelected: {
      onStateChanged() {
        selectedFaculty.value = null;
        selectedFormat.value = null;
        selectedDirection.value = null;
        resetFiltersButtonDisabled.value = true;

        Object.values(faculties.value).forEach(
          (faculty) => (faculty.disabled = true),
        );

        Object.values(formats.value).forEach(
          (format) => (format.disabled = true),
        );

        filteredCourses.value.forEach((course) => {
          const facultyId = course.faculty?.value;
          const formIds = Object.keys(course.forms);

          if (facultyId)
            faculties.value[facultyId].disabled = false;

          if (formIds.length)
            formIds.forEach((formId) => {
              formats.value[formId].disabled = false;
            });
        });
      },
    },
    facultySelected: {
      onStateChanged() {
        selectedDirection.value = null;
        resetFiltersButtonDisabled.value = false;

        Object.values(formats.value).forEach(
          (format) => (format.disabled = true),
        );

        filteredCourses.value.forEach((course) => {
          const formIds = Object.keys(course.forms);

          if (formIds.length)
            formIds.forEach((formId) => {
              formats.value[formId].disabled = false;
            });
        });

      },
    },
    formatSelected: {
      onStateChanged() {
        selectedDirection.value = null;
        resetFiltersButtonDisabled.value = false;

        Object.values(faculties.value).forEach(
          (faculty) => (faculty.disabled = true),
        );


        filteredCourses.value.forEach((course) => {
          const facultyId = course.faculty?.value;

          if (facultyId)
            faculties.value[facultyId].disabled = false;
        });
      },
    },
    directionSelected: {
      onStateChanged() {
        selectedFaculty.value = null;
        selectedFormat.value = null;
        resetFiltersButtonDisabled.value = false;
      },
    },
  },
  onStateChanged() {
    if (import.meta.dev) {
      console.log(`filter state changed to ${this.currentState}`);
    }
  },
  dispatch(actionName, ...payload) {
    if (!this.states[this.currentState][actionName]) return;

    this.states[this.currentState][actionName](...payload);
  },
  changeTo(newState) {
    if (!this.states[newState]) return;

    this.currentState = newState;
    this.onStateChanged();

    if (this.states[newState]['onStateChanged']) {
      this.states[newState]['onStateChanged']();
    }
  },
  resetFilter() {
    this.changeTo('initial');
  },
};

const durationDirections = computed(() => {

  const directionsObject = coursesTypes[selectedDuration.value]?.directions || {};

  const directionOrder = {
    fromSix: ['Бесплатно', 'Психология', 'Программирование', 'Дизайн', 'Лингвистика', 'Маркетинг', 'Менеджмент', 'Игры', 'E-commerce', 'Анимация', 'Строительство'],
    upSix: ['Бесплатно', 'Культура и искусство', 'Психология', 'Менеджмент', 'Аналитика', 'Педагогика', 'Маркетинг', 'Дизайн', 'Программирование', 'Индустрия гостеприимства', 'Саморазвитие', 'E-commerce', 'Государственное и муниципальное управление', 'Лингвистика', 'Игры', 'Анимация', 'Строительство', 'Искусственный интеллект'],
    'isMini': ['Бесплатно', 'Саморазвитие', 'Государственное и муниципальное управление', 'Программирование', 'Игры', 'Менеджмент', 'Лингвистика'],
    'isExpress': ['Бесплатно', 'Саморазвитие', 'Программирование', 'Игры', 'Менеджмент', 'Лингвистика'],
  };

  const directionsArray = Object.values(directionsObject).map((direction) => ({ title: direction.text, value: direction.value }));

  const sortedDirectionsArray = directionOrder[selectedDuration.value].reduce((acc, el) => {
    const direction = directionsArray.find((item) => item.title === el);

    if (direction) {
      acc.push(direction);
    }

    return acc;
  }, []);


  return sortedDirectionsArray.length < directionsArray.length ? [...new Set([...sortedDirectionsArray, ...directionsArray])] : sortedDirectionsArray;
});

filterState.changeTo('initial');

function isMatch(course) {
  if (course.courseType !== selectedDuration.value) return false;

  if (selectedFaculty.value && course.faculty.value !== selectedFaculty.value) return false;

  if (selectedFormat.value && !course.forms[selectedFormat.value]) return false;

  if (selectedDirection.value && course.direction.value !== selectedDirection.value) return false;

  return true;
}

function makeCrumbsOnCard(course) {
  const isFreeCourse = course.direction?.name === FREE_COURSE_DIRECTION_NAME;

  if (isFreeCourse) return Object.values(course.forms).at(0).text;

  const duration = calculateCourseDuration(course.duration);

  const form = Object.values(course.forms)?.at(0)?.text || '';

  return [duration, form].filter((el) => !!el).join(' / ');
}

function calculateCourseDuration(duration) {

  if (!duration) return '';

  if (duration < 14) return declensionOfNumber(duration, ['день', 'дня', 'дней'], true);

  if (duration < 28) return '0,5 месяца';

  const DAYS_IN_MONTH = 30;

  return declensionOfNumber(Math.round(duration / DAYS_IN_MONTH), ['месяц', 'месяца', 'месяцев', 'месяцев'], true);
}

const getPopupData = getCachedPopupData();

async function showPopup(course) {
  const fields = await getPopupData(course.type, course.id);
  const customFields = mapCustomFields(fields);
  const triggersData = customFields.course_triggers;

  const triggers = [
    {
      title: 'Длительность',
      content: triggersData?.at(0)?.duration_hours,
    },
    { title: 'Срок обучения', content: calculateCourseDuration(course.duration) },
    {
      title: 'Формат',
      content: Object.values(course.forms).map((form) => form.text),
    },
  ];

  const {
    learning_program: learningProgram,
    what_learn: whatLearn,
  } = mapCustomFields(fields);

  popupData.value = {};
  popupData.value = {
    name: course.name,
    slug: course.link,
    faculty: '',
    triggers,
    learningProgram,
    whatLearn,
    isFree: course.direction?.name === FREE_COURSE_DIRECTION_NAME,
  };

  coursePopup.value.open();
}

function getCachedPopupData() {
  const cachedPopupData = new Map();

  return async (type, id) => {
    if (cachedPopupData.has(`${type}-${id}`)) {
      return cachedPopupData.get(`${type}-${id}`);
    }

    const { data } = await useFetch(`/api/filter-popup/${type}/${id}`, {
      key: `filter-popup-${type}-${id}`,
      watch: false,
      deep: false,
    });

    const fields = data.value.data.attributes.custom_field_values;

    cachedPopupData.set(`${type}-${id}`, fields);

    return fields;
  };
}

function preselectEntity(entity) {
  const preselectMap = {
    [EXPRESS_COURSES_ROUTE]() {
      selectedDuration.value = 'isExpress';
      filterState.changeTo('durationSelected');
    },

    default() {
      selectedDuration.value = 'fromSix';
      filterState.changeTo('durationSelected');
    },
  };

  (Object.hasOwn(preselectMap, entity) ? preselectMap[entity] : preselectMap.default)();
}
</script>

<template>
  <MSection
    id="courses-container"
    title="Программы обучения"
    :nums="coursesCount"
    class="s-courses-list"
  >
    <div class="s-courses-list__filters">
      <div
        v-if="props.routeName !== EXPRESS_COURSES_ROUTE"
        class="s-courses-list__type-slider-wrapper"
      >
        <MCoursesTypeFilterSlider
          id="s-courses-list__content"
          v-model="selectedDuration"
          :types="switcherItems"
          @changed="filterState.changeTo('durationSelected')"
        />
      </div>
      <div class="s-courses-list__selects s-courses-list__selects-cropped">
        <MFacultyFilterSelect
          v-model="selectedFaculty"
          :faculties
          :disabled="facultyFilterDisabled"
          show-help-option
          placeholder="Направление"
          @change="filterState.changeTo('facultySelected')"
          @action="
            handleActionOption({action:FACULTY_FILTER_OPTION_HELP_FORM, actionData:'#s-courses-list-fac-select'})"
        />
        <MFormatFilterSelect
          v-model="selectedFormat"
          :formats
          :disabled="formatFilterDisabled"
          @change="filterState.changeTo('formatSelected')"
        />
        <AButton
          rounding="rect"
          size="md"
          :disabled="resetFiltersButtonDisabled"
          class="s-courses-list__reset"
          @click="filterState.changeTo('initial')"
        >
          <span class="a-font_sm-m">Сбросить</span>
        </AButton>
      </div>
    </div>

    <MFiltersTabsSliderNav
      v-if="selectedDuration"
      v-model="selectedDirection"
      :tabs="durationDirections"
      :form-action-params="[{param:'form=pomogite_vibrat'}]"
      show-form-tab
      form-tab-title="Помогите выбрать"
      form-title="Поможем подобрать программу обучения"
      form-subtitle="Заполните форму, и&nbsp;мы свяжемся с&nbsp;вами, чтобы провести <span class='--free-red'>бесплатную</span> профориентацию и&nbsp;ответить на&nbsp;все вопросы."
      form-btn="Отправить"
      first-tab-text="Популярные"
      class="s-courses-list__directions profession_directions sticky"
      @tab-selected="() => filterState.changeTo('directionSelected')"
    />

    <div class="s-courses-list__content _is-active">
      <CoursesResults :cards="filteredCoursesWithHelpCards">
        <template #default="{ item: course, hide = false }">
          <template v-if="course.type">
            <MSpecialtyCard
              v-show="!hide"
              :id="course.id"
              :name="course.name"
              :place="course.place"
              :link="course.link"
              :is-partner="course.partner"
              :is-show-enroll="true"
              :price="course.price"
              :faculty="makeCrumbsOnCard(course)"
              :is-free="course.direction?.name === FREE_COURSE_DIRECTION_NAME"
              :is-new="course.new"
              level="Курсы"
              @enroll="showPopup(course)"
            />
          </template>
          <template v-else>
            <MHelpChooseCard
              v-show="!hide"
              form-title="Оставьте контакты, мы вам поможем"
              form-btn="Отправить"
              form-id="courses"
              :action-params="[{param: 'form=pomogite_vibrat_kurs'}]"
              :btn="course.btn"
              :title="course.title"
              :description="course.description"
              :text="course.text"
            />
          </template>
        </template>
      </CoursesResults>
    </div>
  </MSection>

  <SCoursesListPopup
    ref="popup"
    :route-name="props.routeName"
    v-bind="popupData"
  />

  <MModalForm
    id="s-courses-list-fac-select"
    title="Оставьте контакты, мы вам поможем"
    btn="Отправить"
    form-phone
    :action-params="[{param: 'form=pomogite_vybrat_select_filtra'}]"
  />
</template>

<style lang="scss" scoped>
@import './SCoursesList.scss';
</style>

<style lang="scss">
.s-courses-list {
  &__selects {
    .a-uikit-select {
      &__input {
        background-color: var(--a-color_grey_20);

        &._open {
          background-color: var(--a-color_white);
        }
      }
    }

    &:has(._open) {
      z-index: indexes("program-selects");
    }
  }

  .m-filters-tabs-slider__filters .m-filter-tab {
    flex-grow: 0;
  }
}
</style>
