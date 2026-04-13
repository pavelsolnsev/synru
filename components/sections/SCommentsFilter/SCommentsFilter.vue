<script setup lang='ts'>
import { KEYS } from '~/constants';
import type { Nullable, SectionConditionalGroup } from '~/types';
import type { Comment, TransformComments } from '~/utils/transformCommentsFilterData';
import DefaultTextCommentImg from '~/assets/images/logo/logo-min.svg?url';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  title?: string;
  commentsIds?: string;
  routeName?: string;
  entity?: { id: number } | null;
}

const {
  title = 'Отзывы о&nbsp;демо-вузе',
  routeName = '',
  entity: propsEntity = null,
  commentsIds: rawCommentsIds = '',
  conditionalGroup = [],
} = defineProps<Props>();

const commentsIds = rawCommentsIds?.trim()
  ? rawCommentsIds.trim().split(',')
  : [];

const needRender = needRenderSection({ conditionalGroup, data: { entityId: propsEntity?.id } });

const INITIAL_COMMENTS_COUNT = 6;
const showCommentsCount = shallowRef(INITIAL_COMMENTS_COUNT);

const DEFAULT_FILTER_VALUE = null;

const filteredLevel = shallowRef<null | string>(DEFAULT_FILTER_VALUE);
const filteredFaculty = shallowRef<null | string>(DEFAULT_FILTER_VALUE);
let filteredCity: null | number = DEFAULT_FILTER_VALUE;
let filteredProgram: null | number = DEFAULT_FILTER_VALUE;
let filteredCourse: null | number = DEFAULT_FILTER_VALUE;
let filteredDirection: null | number = DEFAULT_FILTER_VALUE;
let filteredCustomEntity: null | number = DEFAULT_FILTER_VALUE;

let preselectedByEntity = false;

const showFilters = [
  'reviews',
].includes(routeName);

const { data } = await useFetch<TransformComments>('/api/comments/filter', {
  watch: false,
  deep: false,
  key: KEYS.COMMENTS_FILTER_DATA,
});

const {
  comments = [],
  levels: levelsData = {},
  faculties: facultiesData = {},
  directions: directionsData = {},
  commentsMap = {},
} = data.value || {};

const levels = Object.keys(levelsData).map((levelId) => {
  const level = levelsData[Number(levelId)];
  return {
    id: levelId,
    title: level.text,
  };
});

const faculties = Object.values(facultiesData);

const filteredComments = shallowRef<Comment[]>([]);

const filterState: FilterState = {
  currentState: null,
  states: {
    initial: {
      onStateChanged() {
        resetFilters('all');
        preselectEntity(routeName);
      },
    },
    levelSelected: {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));
      },
    },
    facultySelected: {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));

        const isFacultyRoute = routeName === 'faculty' || routeName === 'promo_faculty';

        if (filteredComments.value?.length === 0 && isFacultyRoute) {
          const defaultFacultyCommentsIds: string[] = ['169', '151', '152', '168'];

          const defaultFacultyComments = defaultFacultyCommentsIds.reduce((acc, commentId) => {
            const comment = commentsMap[commentId];

            if (comment) acc.push(comment);

            return acc;
          }, [] as Comment[]);

          filteredComments.value = sortComments(defaultFacultyComments);
        }
      },
    },
    citySelected: {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));
      },
    },
    programSelected: {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));
      },
    },
    courseSelected: {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));
      },
    },
    'directionSelected': {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));
      },
    },
    customEntitySelected: {
      onStateChanged() {
        filteredComments.value = sortComments(comments.filter(isMatch));
      },
    },
  },
  onStateChanged() {
    if (import.meta.dev) {
      console.log(`comment filter state changed to ${this.currentState}`);
    }
  },
  changeTo(newState: State) {
    if (!this.states[newState]) return;

    this.currentState = newState;
    this.onStateChanged();

    if (this.states[newState]['onStateChanged']) {
      this.states[newState]['onStateChanged']();
    }
  },
};

filterState.changeTo('initial');

const showSection = needRender
  ? preselectedByEntity
    ? Boolean(filteredComments.value?.length)
    : true
  : false;

function isMatch(comment: Comment) {
  if (
    filteredLevel.value
    && !Object.hasOwn(comment.levels, filteredLevel.value)
  ) return false;

  if (
    filteredFaculty.value !== DEFAULT_FILTER_VALUE
    && !Object.hasOwn(comment.faculties, filteredFaculty.value)
  ) return false;

  if (filteredCity && !Object.hasOwn(comment.cities, filteredCity)) return false;

  if (filteredProgram && !Object.hasOwn(comment.programs, filteredProgram)) return false;

  if (filteredCourse && !Object.hasOwn(comment.courses, filteredCourse)) return false;

  if (filteredDirection && !Object.hasOwn(comment.directions, filteredDirection)) return false;

  if (filteredCustomEntity && !Object.hasOwn(comment.customEntities, filteredCustomEntity)) return false;

  if (commentsIds?.length) {
    return commentsIds.includes(comment.id);
  }

  return true;
}

function preselectEntity(entity: string) {
  const preselectMap: Record<string, () => void> = {
    default: () => {
      if (commentsIds?.length) preselectedByEntity = true;
      filteredComments.value = sortComments(comments.filter(isMatch));
    },

    'branch': () => {
      if (!propsEntity?.id) return;

      preselectedByEntity = true;
      filteredCity = propsEntity.id;
      filterState.changeTo('citySelected');
    },

    'program': () => {
      if (!propsEntity?.id) return;

      preselectedByEntity = true;
      filteredProgram = propsEntity.id;
      filterState.changeTo('programSelected');
    },

    'faculty': () => {
      if (!propsEntity?.id) return;

      preselectedByEntity = true;
      filteredFaculty.value = String(propsEntity.id);
      filterState.changeTo('facultySelected');
    },

    'promo_faculty': () => {
      preselectEntity('faculty');
    },

    'course': () => {
      if (!propsEntity?.id) return;
      preselectedByEntity = true;

      filteredCourse = propsEntity.id;
      filterState.changeTo('courseSelected');
    },

    'courses_direction': () => {
      if (!propsEntity?.id) return;

      preselectedByEntity = true;
      filteredDirection = propsEntity.id;
      filterState.changeTo('directionSelected');
    },

    'seo-college': () => {
      if (!propsEntity?.id) return;

      preselectedByEntity = true;
      filteredCustomEntity = propsEntity.id;
      filterState.changeTo('customEntitySelected');
    },
  };

  (Object.hasOwn(preselectMap, entity)
    ? preselectMap[entity]
    : preselectMap.default)();
}

function changedLevel(level: string | null) {
  filteredLevel.value = level;
  filterState.changeTo('levelSelected');
}

function resetFilters(...args: string[]) {
  const filters: Record<string, () => void> = {
    level() {
      filteredLevel.value = DEFAULT_FILTER_VALUE;
    },
    faculty() {
      filteredFaculty.value = DEFAULT_FILTER_VALUE;
    },
    city() {
      filteredCity = DEFAULT_FILTER_VALUE;
      preselectedByEntity = false;
    },
    program() {
      filteredProgram = DEFAULT_FILTER_VALUE;
      preselectedByEntity = false;
    },
    course() {
      filteredCourse = DEFAULT_FILTER_VALUE;
      preselectedByEntity = false;
    },
    direction() {
      filteredDirection = DEFAULT_FILTER_VALUE;
      preselectedByEntity = false;
    },
    customEntity() {
      filteredCustomEntity = DEFAULT_FILTER_VALUE;
      preselectedByEntity = false;
    },
    all() {
      resetFilters('level', 'faculty', 'city', 'program', 'course', 'direction', 'customEntity');
    },
  };

  args.forEach((filter) => {
    if (!Object.hasOwn(filters, filter)) return;

    filters[filter]();
  });
}

function sortComments(comments: Comment[]): Comment[] {
  if (!Array.isArray(comments)) return [];

  const videoComments: Comment[] = [];
  const textComments: Comment[] = [];
  const sortedComments: Comment[] = [];

  comments.forEach((comment) => {
    if (isVideoComment(comment)) {
      videoComments.push(comment);
      return;
    }

    textComments.push(comment);
  });

  const isVideoCommentEvenCount = videoComments.length % 2 === 0;

  const pattern: Array<'video' | 'text'> = ['video', 'text', 'text', 'video', 'text', 'video', 'video', 'text'];
  const INITIAL_PATTERN_INDEX = 0;
  const MAX_PATTERN_INDEX = pattern.length - 1;
  let currentPatternIndex = INITIAL_PATTERN_INDEX;

  for (let i = 0; i < comments.length; i++) {
    const commentType = pattern[currentPatternIndex];
    const comment = commentType === 'video' ? videoComments.shift() : textComments.shift();

    if (comment) {
      sortedComments.push(comment);
      currentPatternIndex = currentPatternIndex === MAX_PATTERN_INDEX ? 0 : currentPatternIndex + 1;
      continue;
    }

    const finalComments = [...sortedComments, ...((commentType === 'video') ? textComments : videoComments)];

    if (isVideoCommentEvenCount) return finalComments;

    const findLastVideoIndex = finalComments.findLastIndex((isVideoComment));

    const lastVideo = finalComments[findLastVideoIndex];

    finalComments.splice(findLastVideoIndex, 1);

    finalComments.push(lastVideo);

    return finalComments;
  }

  return sortedComments;
}


function isVideoComment(comment: Comment) {
  return Boolean(comment?.media?.trim());
}

interface FilterState {
  currentState: Nullable<string>;
  states: Record<State, Record<'onStateChanged', () => void>>
  onStateChanged: () => void,
  changeTo: (state: State) => void;
}

type State = 'initial'
  | 'levelSelected'
  | 'facultySelected'
  | 'citySelected'
  | 'programSelected'
  | 'courseSelected'
  | 'directionSelected'
  | 'customEntitySelected';
</script>

<template>
  <MSectionNewResponsive
    v-if="showSection"
    class="s-reviews-filter"
    :title
  >
    <div
      v-if="showFilters"
      class="s-reviews-filter__filters"
    >
      <div class="s-reviews-filter__filters__level">
        <MFilterTab
          title="Все"
          :active="filteredLevel === DEFAULT_FILTER_VALUE"
          @click="filterState.changeTo('initial')"
        />
        <div
          v-if="levels?.length"
          class="s-reviews-filter__filters__level__tabs"
        >
          <MFilterTab
            v-for="level in levels"
            :key="level.id"
            font-size="a-font_m-m"
            :title="level.title"
            :active="filteredLevel === level.id"
            @click="changedLevel(level.id)"
          />
        </div>
      </div>

      <ASelectSecond
        v-if="faculties.length"
        v-model="filteredFaculty"
        :options="faculties"
        placeholder="Факультет"
        class="s-reviews-filter__select"
        @change="filterState.changeTo('facultySelected');"
      />
    </div>
    <div class="s-reviews-filter__content">
      <template v-if="filteredComments.length">
        <template
          v-for="review, index in filteredComments"
          :key="review.id"
        >
          <MVideoCardVertical
            v-if="review.media"
            class="s-reviews-filter__review"
            :class="[
              index + 1 > showCommentsCount && '--hidden',
            ]"
            :video="review.media"
            :image="review.image"
            :image-lg="review.image"
            :image-md="review.image"
            :title="review.name"
            :text="review.text"
          />
          <MReview
            v-else
            class="s-reviews-filter__review"
            :class="[
              index + 1 > showCommentsCount && '--hidden',
            ]"
            :image="review.image ? review.image : DefaultTextCommentImg"
            :name="review.name"
            :info="review.description"
            :text="review.text"
          />
        </template>
      </template>

      <template v-else>
        Нет подходящих результатов
      </template>
    </div>
    <AButtonThird
      v-if="showCommentsCount < filteredComments.length"
      class="s-reviews-filter__show-btn"
      @click="showCommentsCount += INITIAL_COMMENTS_COUNT"
    >
      <span>Показать ещё ({{ filteredComments.length - showCommentsCount }})</span>
    </AButtonThird>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import './SCommentsFilter.scss';
</style>
