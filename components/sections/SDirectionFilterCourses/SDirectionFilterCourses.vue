<script setup lang='ts'>
import { FREE_COURSE_DIRECTION_NAME, EXPRESS_PRODUCT_PRICE } from '~/constants/common';
import type { CourseData } from '~/utils/transformCoursesFilterData';
import { COURSES_DIRECTIONS } from '~/constants/keys';

interface CoursesFilterData {
  courses: CourseData[];
  tags: courseTag[];
}

interface courseTag {
  value: number;
  text: string;
}

interface Props {
  routeName: string;
  entity: {
    id: string;
    name: string;
    long_name: string;
    slug: string;
    url?: string,
  };
}

const {
  entity,
  routeName,
} = defineProps<Props>();

const { data: coursesData } = await useFetch<CoursesFilterData>('/api/getCoursesFilterData', {
  key: COURSES_DIRECTIONS,
  watch: false,
  deep: false,
});

const { openModal } = useModalStore();
const selectedDuration = shallowRef('all');
const showFreeCourses = shallowRef(false);
const popupData = shallowRef({});
const isPopular = shallowRef(true);
const coursePopup = useTemplateRef('popup');

const switcherItems = [{
  label: 'Все',
  value: 'all',
}, {
  label: 'От 6 месяцев',
  value: 'fromSix',
}, {
  label: 'До 6 месяцев',
  value: 'upSix',
}];

const coursesTags: courseTag[] = coursesData.value?.tags || [];
const courses: CourseData[] = coursesData.value?.courses || [];

const freeTagId = coursesTags.filter((tag) => tag.text === FREE_COURSE_DIRECTION_NAME)[0]?.value || 0;

const filteredCourses = computed(() => {
  return courses.filter((course) => {
    if (course.direction?.value !== +entity.id) return false;
    if (selectedDuration.value === 'fromSix' && course.duration < 180) return false;
    if (selectedDuration.value === 'upSix' && course.duration >= 180) return false;
    if (showFreeCourses.value && !course.tags.includes(freeTagId)) return false;
    return true;
  });
});

function makeCrumbsOnCard(course: CourseData) {
  const duration = calculateCourseDuration(course.duration!);
  const form = Object.values(course.forms)?.at(0)?.text || '';
  return [duration, form].filter((el) => !!el).join(' / ');
}

function calculateCourseDuration(duration: number) {
  if (!duration) return '';
  if (duration < 14) return declensionOfNumber(duration, ['день', 'дня', 'дней'], true);
  if (duration < 28) return '0,5 месяца';

  const DAYS_IN_MONTH = 30;
  return declensionOfNumber(Math.round(duration / DAYS_IN_MONTH), ['месяц', 'месяца', 'месяцев', 'месяцев'], true);
}

const isFreeCourses = filteredCourses.value.filter((course) => course.tags.includes(freeTagId)).length;

function isFreeCourse(course: CourseData) {
  return course.tags.includes(freeTagId) || course.direction?.text === FREE_COURSE_DIRECTION_NAME;
}

function changeDuration(duration: string) {
  selectedDuration.value = duration;
  showFreeCourses.value = false;
  isPopular.value = true;
}

function toggleFreeCourses() {
  showFreeCourses.value = !showFreeCourses.value;
  selectedDuration.value = 'all';
}

const getPopupData = getCachedPopupData();

async function showPopup(course: CourseData) {
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
    type: course.type,
    faculty: '',
    triggers,
    learningProgram,
    whatLearn,
    isFree: course.direction?.name === FREE_COURSE_DIRECTION_NAME,
  };

  coursePopup.value!.open();
}

function getCachedPopupData() {
  const cachedPopupData = new Map();

  return async (type: string, id: string) => {
    if (cachedPopupData.has(`${type}-${id}`)) {
      return cachedPopupData.get(`${type}-${id}`);
    }

    const { data } = await useFetch(`/api/filter-popup/${type}/${id}`, {
      key: `filter-popup-${type}-${id}`,
      watch: false,
      deep: false,
    });

    const fields = data.value?.data[0]?.attributes?.custom_field_values;

    cachedPopupData.set(`${type}-${id}`, fields);

    return fields;
  };
}

function openForm() {
  openModal('MModalForm', {
    title: 'Поможем выбрать курс и&nbsp;откроем бесплатный доступ к&nbsp;началу обучения',
    btn: 'Отправить',
    formName: false,
    formPhone: true,
    actionParams: [{param:'form=pomogite_vibrat'}],
  });
}
</script>

<template>
  <MSection
    id="courses-container"
    class="s-direction-filter-courses"
  >
    <div class="s-direction-filter-courses__filters">
      <div class="s-direction-filter-courses__switcher">
        <div
          v-for="item in switcherItems"
          :key="item.value"
          class="s-direction-filter-courses__switcher-item a-font_l-m"
          :class="{ 'checked': selectedDuration === item.value }"
          @click="changeDuration(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <div
        v-if="isFreeCourses"
        class="a-font_m-m s-direction-filter-courses__free-btn"
        :class="{ 'checked': showFreeCourses }"
        @click="toggleFreeCourses"
      >
        <ASvgMono
          name="present"
        />
        <span>Бесплатно</span>
      </div>
      <div
        class="s-direction-filter-courses__tag a-font_l-m"
        @click="openForm()"
      >
        <ASvgMono name="question" />
        Помогите выбрать
      </div>
    </div>
    <CoursesResults :cards="filteredCourses">
      <template #default="{ item: course, hide = false }">
        <template v-if="course.type">
          <MSpecialtyCard
            v-show="!hide"
            :id="course.id"
            :name="course.name"
            :place="course.place"
            :link="course.link"
            :price="(course as CourseData).isExpress ? EXPRESS_PRODUCT_PRICE : course.price"
            btn-text="Записаться"
            :faculty="makeCrumbsOnCard(course as CourseData)"
            :is-partner="course.partner"
            :partner-logo="course.partnerLogo"
            :partner-text="course.partnerText"
            :partner-bonus="course.partnerBonus"
            :is-show-enroll="true"
            :is-free="isFreeCourse(course as CourseData)"
            :is-new="course.new"
            level="Курсы"
            @enroll="showPopup(course as CourseData)"
          />
        </template>
      </template>
    </CoursesResults>
    <SCoursesListPopup
      ref="popup"
      :route-name="routeName"
      v-bind="popupData"
    />
  </MSection>
</template>

<style scoped lang='scss'>
@import './SDirectionFilterCourses.scss';
</style>
