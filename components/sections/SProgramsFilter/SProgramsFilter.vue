<script setup lang="ts">
import type { EntityOption, ProgramCard } from '~/types/ProgramCard';
import { useMediaQuery } from '@vueuse/core';
import { levelIcons } from './levelIcons';
import { KEYS } from '~/constants';

interface Props {
  title: string;
  actionParams: { param: string }[];
  routeName: string;
  entity?: { id?: number };
}

const {
  title = 'Программы обучения',
  routeName,
  entity,
} = defineProps<Props>();

const DESKTOP_INITIAL_COUNT = 6;
const MOBILE_INITIAL_COUNT = 4;
const SHOW_MORE_STEP = 6;

const isMti = routeName === 'mti' || routeName === 'map';

const processedRouteName = routeName?.startsWith('promo_') ? 'faculty' : routeName;
const isDesktop = useMediaQuery('(min-width: 1200px)');
const initialCardsCount = computed(() => (isDesktop.value ? DESKTOP_INITIAL_COUNT : MOBILE_INITIAL_COUNT));
const visibleCardsCount = shallowRef(initialCardsCount.value);

const { data } = await useFetch(isMti ? '/api/getProgramFiltersDataMti' : '/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: isMti ? KEYS.PROGRAMS_FILTERS_DATA_MTI : KEYS.PROGRAMS_FILTERS_DATA,
});

const {
  programs: cards = [] as ProgramCard[],
  levels: levelsData = {} as Record<string, EntityOption>,
  forms: formatsData = {} as Record<string, EntityOption>,
  tags = {} as Record<string, EntityOption>,
} = data.value || {};

const levelsArray = Object.values(levelsData);

const formatsArray = Object.values(formatsData).map((format) => ({
  ...format,
  text: format.text.replace(/ый$/, 'ая').replace(/ий$/, 'яя'),
}));

const tagsArray = Object.values(tags);

const initialLevel = levelsArray.find((level) => {
  if (processedRouteName === 'level') return level.value === entity?.id;
  if (processedRouteName === 'ordinatura') return level.value === 7;
  if (processedRouteName === 'magistracy_new') return level.value === 4;
  return false;
}) || levelsArray[0];

const selectedLevel = shallowRef<EntityOption>(initialLevel);
const selectedTag = shallowRef<EntityOption | null>(null);
const selectedFormat = shallowRef<EntityOption | null>(null);
const isForeignEducation = shallowRef(false);
const showLevelSelect = !['level', 'ordinatura', 'college_new', 'college_lp', 'magistracy_new'].includes(routeName);

const filtersOptions = computed(() => {
  if (!selectedLevel.value?.value) return { tags: [], formats: [] };

  const tagCounts = new Map<string, number>();
  const formIds = new Set<string>();
  const tagIdsAvailableInFormat = new Set<string>();

  for (const { level, tags, forms } of cards) {
    if (level?.value !== selectedLevel.value?.value) continue;
    const matchesFormat = !selectedFormat.value?.value || (forms && forms[selectedFormat.value.value]);

    if (tags) {
      for (const id of Object.keys(tags)) {
        tagCounts.set(id, (tagCounts.get(id) ?? 0) + 1);

        if (matchesFormat) {
          tagIdsAvailableInFormat.add(id);
        }
      }
    }

    if (forms) {
      for (const id of Object.keys(forms)) {
        formIds.add(id);
      }
    }
  }

  return {
    tags: tagsArray
      .filter((tag) => tag.type === 'LevelPage' && tagCounts.has(String(tag.value)))
      .map((tag) => {
        return {
          ...tag,
          count: tagCounts.get(String(tag.value)) || 0,
          dimmed: selectedFormat.value?.value ? !tagIdsAvailableInFormat.has(String(tag.value)) : false,
        };
      }),
    formats: formatsArray.filter((format) => formIds.has(String(format.value))),
  };
});

const filteredCards = computed(() => {
  return cards.filter((program) => {
    if (String(program.level?.value) !== String(selectedLevel.value?.value)) return false;
    if (selectedTag.value?.value && !program.tags?.[selectedTag.value.value]) return false;
    if (selectedFormat.value?.value && !program.forms?.[selectedFormat.value.value]) return false;
    if (isForeignEducation.value && !program.place) return false;
    return true;
  });
});

const hasForeignPrograms = computed(() => filteredCards.value.some((program) => Boolean(program.place)));

const visibleCards = computed(() => filteredCards.value.slice(0, visibleCardsCount.value));
const remainingCardsCount = computed(() => Math.max(0, filteredCards.value.length - visibleCardsCount.value));

function filterByLevel(level: EntityOption) {
  selectedLevel.value = level;
  selectedTag.value = null;
  selectedFormat.value = null;
  visibleCardsCount.value = SHOW_MORE_STEP;
}

function showMore() {
  visibleCardsCount.value = Math.min(
    visibleCardsCount.value + SHOW_MORE_STEP,
    filteredCards.value.length,
  );
}

function resetFilters() {
  selectedLevel.value = initialLevel;
  selectedTag.value = null;
  selectedFormat.value = null;
  visibleCardsCount.value = SHOW_MORE_STEP;
  isForeignEducation.value = false;
}

function changeForeignEducation() {
  isForeignEducation.value = !isForeignEducation.value;
}

const { popupData, showPopup } = useProgramPopup(routeName);
const renderPopups = shallowRef(false);

onMounted(() => { renderPopups.value = true; });
</script>

<template>
  <MSectionNewResponsive
    :title
    class="s-programs-filter"
  >
    <div class="s-programs-filter__content">
      <div class="s-programs-filter__filters">
        <LevelSelect
          v-if="showLevelSelect"
          :levels="levelsArray"
          :selected-level="selectedLevel"
          @update:selected-level="filterByLevel"
        />

        <FormatSelect
          v-if="!showLevelSelect"
          :formats="filtersOptions.formats"
          :selected-format="selectedFormat"
          @update:selected-format="selectedFormat = $event"
        />

        <div class="s-programs-filter__tags">
          <p class="a-font_l-m s-programs-filter__title">Направления</p>

          <div class="s-programs-filter__tags-list">
            <div class="s-programs-filter__tags-wrap">
              <button
                :class="{ active: selectedTag === null }"
                class="tag-button a-font_l-m"
                @click="selectedTag = null"
              >
                <span>Все направления</span>
                <span
                  class="--num"
                  v-html="selectedLevel?.count"
                />
              </button>
              <button
                v-for="tag in filtersOptions.tags"
                :key="tag.id"
                :class="{ active: selectedTag?.value === tag.value }"
                class="tag-button a-font_l-m"
                :disabled="tag.dimmed"
                @click="selectedTag = tag"
              >
                <span v-html="tag.text" />
                <span
                  class="--num"
                  v-html="tag.count"
                />
              </button>
            </div>
          </div>
          <div
            class="s-programs-filter__foreign a-font_l-m"
            :class="{ disabled: !hasForeignPrograms }"
          >
            Образование за рубежом
            <div class="tooltip">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M10.67 18.67V10h2.66v8.67zm0-10.9V5.32h2.66v2.43z"
                />
              </svg>
              <div class="tooltip-content">
                <p class="a-font_h6">С&nbsp;трудоустройством</p>
                <p class="a-font_m-m">Профессии с&nbsp;помощью в&nbsp;трудоустройстве от&nbsp;центра карьеры. Вы научитесь правильно составлять резюме и&nbsp;презентовать свои умения работодателям. Подберём несколько вакансий и&nbsp;организуем собеседования.</p>
              </div>
            </div>

            <AToggleBtn
              @change="changeForeignEducation"
            />
          </div>
          <FilterBanner
            v-if="isDesktop"
            title-class="a-font_h6"
            text-class="a-font_m-m"
            image-src="/img/SProgramsFilter/filter_banner.webp"
            text="Расскажем о&nbsp;каждом направлении <br>и&nbsp;поможем определиться"
          />
          <div
            class="s-programs-filter__reset a-font_s-m"
            @click="resetFilters"
          >
            <ASvgMono name="close" />
            <span>Сбросить фильтр</span>
          </div>
        </div>
      </div>

      <div class="s-programs-filter__programs">
        <div
          v-if="showLevelSelect"
          class="s-programs-filter__programs-top"
        >
          <div class="s-programs-filter__programs-top-level">
            <p class="a-font_h4">{{ selectedLevel?.text }}</p>
            <p class="a-font_m-m">{{ selectedLevel?.count }} специальностей</p>
            <AImg
              v-if="levelIcons"
              :src="levelIcons[selectedLevel?.value as keyof typeof levelIcons].image"
              decoding="async"
              loading="lazy"
            />
          </div>

          <FormatSelect
            :formats="filtersOptions.formats"
            :selected-format="selectedFormat"
            @update:selected-format="selectedFormat = $event"
          />
        </div>

        <div
          v-if="!visibleCards.length"
          class="a-font_l-m"
        >
          По таким фильтрам программ не найдено
        </div>

        <template
          v-for="program, idx in visibleCards"
          :key="program.name"
        >
          <FilterBanner
            v-if="idx === 2 && !isDesktop"
            title-class="a-font_h3"
            text-class="a-font_xl-m"
            image-src="/img/SProgramsFilter/filter_banner_sm.webp"
            text="Расскажем о&nbsp;каждом <br>направлении и&nbsp;поможем <br>определиться"
          />
          <MSpecialtyCard
            :id="program.id"
            :name="program.name"
            :faculty="program.faculty?.text || ''"
            :level="program.level?.text || ''"
            :place="program.place"
            :link="program.link"
            :is-new="program.new"
            :is-popular="program.isPopular"
            :is-partner="program.partner"
            :partner-logo="program.partnerLogo"
            :partner-text="program.partnerText"
            :partner-bonus="program.partnerBonus"
            :ico="program.direction_ico"
            :price="program.price"
            :is-show-enroll="program.popup"
            :presentation-link="program.presentation ?? ''"
            @enroll="showPopup(program as ProgramCard)"
          />
        </template>
        <AButtonThird
          v-if="remainingCardsCount > 0"
          size="lg_m"
          class="s-programs-filter__show-more"
          @click="showMore"
        >
          Показать еще ({{ remainingCardsCount }})
        </AButtonThird>
      </div>
    </div>
    <SProgramsListPopup
      v-if="renderPopups"
      ref="programPopup"
      v-bind="popupData"
      :action-params="actionParams"
      :route-name
    />

    <SCoursesListPopup
      v-if="renderPopups"
      ref="coursePopup"
      v-bind="popupData"
      :route-name
    />
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SProgramsFilter.scss';
</style>

