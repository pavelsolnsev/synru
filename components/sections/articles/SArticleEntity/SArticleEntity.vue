<script setup lang="ts">
import { KEYS, ROUTES } from '~/constants';
import { ARTICLE_BANNER_UTM, ARTICLE_DEFAULT_FORM_TITLE, ARTICLE_PROGRAM_AND_COURSES_UTM } from '~/constants/common';
import getArticleDate from '~/utils/article/getArticleDate';
import type { ArticlesResponse } from '~/server/api/articles/index.get';
import type { ArticleResponse } from '~/server/api/articles/[id]/index.get';
import type { AdmissionsResponse, ArticleEntity } from '~/types';
import type { ProgramMap } from '~/types/ProgramCard';
import { ARTICLE_DEFAULT_FORM_PARAM } from '~/constants/articles';
import { ARTICLE_SHOW_FOOTER } from '~/constants/state';
import type { Admission } from '~/components/sections/education_articles/SArticleAddress/SArticleAddress.vue';

interface Props {
  entity: ArticleEntity | null;
  routeName?: string;
}

const {
  entity,
  routeName = '',
} = defineProps<Props>();

const {
  article_education = [],
  article_education_new = [],
  article_zoomable = [],
  article_city = '',
  faq: rawFaq = [],
} = entity?.customFields ?? {};

const {
  title: recommendProgramsTitle = '',
  entities: recommendPrograms = [],
} = article_education?.[0] ?? {};

const {
  title: recommendProgramsTitleNew = '',
  entities: recommendProgramsNew = [],
} = article_education_new?.[0] ?? {};

const path = useRoute().path;

const FETCH_ARTICLES_BY_CATEGORY_COUNT = 6;

const SHOW_ASIDE_FORM = path.startsWith(ROUTES.EGE_OGE);
const ASIDE_FORM_EGE_TITLE = 'Узнайте минимальный проходной балл и&nbsp;начните готовиться к&nbsp;ЕГЭ бесплатно';
const ASIDE_FORM_OGE_TITLE = 'Узнайте минимальный проходной балл и&nbsp;начните готовиться к&nbsp;ОГЭ бесплатно';

const ASIDE_FORM_TITLE = entity?.title?.includes('ОГЭ')
  ? ASIDE_FORM_OGE_TITLE
  : ASIDE_FORM_EGE_TITLE;

const articleCityID = article_city ?? '';

const { data: programsFilterData, execute: getProgramsFilterData } = await useFetch('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: KEYS.PROGRAMS_FILTERS_DATA,
  immediate: false,
});

const { data: articleData, execute: fetchArticle } = await useFetch<ArticleResponse>(`/api/articles/${entity?.id}`, {
  deep: false,
  watch: false,
  query: {
    include: 'categories,persons',
    'filter[published]': true,
  },
  immediate: false,
});

const { data: admissionsData, execute: fetchAdmission } = await useFetch<AdmissionsResponse>(`/api/cities/${articleCityID}/admissions`, {
  query: {
    'filter[published]': true,
    'page[size]': 0,
  },
  deep: false,
  watch: false,
  immediate: false,
});

await Promise.all([
  getProgramsFilterData(),
  fetchArticle(),
  articleCityID ? fetchAdmission() : undefined,
]);

const {
  category = {},
  person = {},
} = transformArticleResponse(articleData.value);

const { data: articlesData, execute: fetchArticles } = await useFetch<ArticlesResponse>(`/api/articles`, {
  deep: false,
  watch: false,
  query: {
    'include': 'categories',
    'page[size]': FETCH_ARTICLES_BY_CATEGORY_COUNT,
    'filter[categories.slug]': category.slug,
    'sort': '-published_at',
    'filter[published]': true,
  },
  immediate: false,
});

const {
  programsMap = {} as ProgramMap,
  faculties = {},
} = programsFilterData.value ?? {};

const specialties = recommendPrograms?.length
  ? recommendPrograms.reduce((acc, recommendProgram) => {
      if (!recommendProgram) return acc;

      const programType = recommendProgram?.type ?? '' ;

      const programsData = programsMap[programType] ?? {};

      const program = programsData[recommendProgram.id] ?? {};

      if (!program?.published_at) return acc;

      const programFacultyId = program.faculty?.value;

      const facultyData = faculties[programFacultyId] ?? {};
      const facultyIco = facultyData?.intro_image as string;

      acc.push({
        title: program.name ?? '',
        to: `${program.link}?${ARTICLE_PROGRAM_AND_COURSES_UTM}${entity?.id}`,
        ico: facultyIco,
      });

      return acc;
    }, [] as { title: string; to: string; ico: string }[])
  : [];

const specialtiesNew: { title: string; to: string; ico: string }[] = [];

if (recommendProgramsNew?.length) {
  for (const programItem of recommendProgramsNew) {
    const recommendProgramItem = makeRecommendProgramItem(programItem);

    if (!recommendProgramItem) continue;

    specialtiesNew.push(recommendProgramItem);
  }
}

function makeRecommendProgramItem(programItem: {
  text: string;
  entity: {
    id: string;
    type: 'courses' | 'programs';
  } | null;
} | null) {
  const { text = '', entity: recommendProgram } = programItem ?? {};

  if (!recommendProgram) return null;

  const programType = recommendProgram?.type ?? '';

  const programsData = programsMap[programType as keyof typeof programsMap] ?? {};

  const program = programsData[recommendProgram.id] ?? {};

  if (!program?.published_at) return null;

  const programFacultyId = program.faculty?.value;

  const facultyData = faculties[programFacultyId] ?? {};
  const facultyIco = facultyData?.intro_image as string;

  return {
    title: text ? text : program.name ?? '',
    to: `${program.link}?${ARTICLE_PROGRAM_AND_COURSES_UTM}${entity?.id}`,
    ico: facultyIco,
  };
}

const interestingArticles = computed(() => {
  if (!articlesData?.value) return [];

  return articlesData.value?.data?.map(({ attributes }) => {
    const date = getArticleDate(attributes?.published_at || attributes?.updated_at);

    return {
      to: attributes.slug,
      image: attributes.image,
      date,
      title: attributes.title,
      tags: [{ text: category.name ?? '' }],
    };
  });
});

const rawBreadcrumbs = generateBreadcrumbs({ routeName, entity: {} }) ?? [];

const breadcrumbs = [
  ...rawBreadcrumbs,
  {
    title: category.name ?? '',
    link: category.url ?? '',
  },
  {
    title: entity?.title ?? '',
    link: '#',
  },
];

const bottomFormName = ['edu_news_article', 'edu_poleznaya_informacziya_article'].includes(routeName) ? ARTICLE_DEFAULT_FORM_PARAM : 'form=education_articles_bottom';

const date = getArticleDate(entity?.published_at || entity?.updated_at || '');

const {
  tags,
  chapters,
} = transformCKEditorContent({
  rawContent: entity?.content ?? '',
  entity: entity,
  payload: { specialties: specialtiesNew.length ? specialtiesNew : specialties },
});

const zoomableImg = getZoomableImage(article_zoomable);

const showFooter = useState(ARTICLE_SHOW_FOOTER);

showFooter.value = Boolean(!zoomableImg);

const admissionAddress = transformAdmissions(admissionsData.value);

const faq = Array.isArray(rawFaq)
  ? rawFaq.filter((item) => item.answer && item.question)
  : [];

onMounted(() => {
  fetchArticles();
  disableTitleAttr();
});

function getZoomableImage(zoomImg: ArticleEntity['customFields']['article_zoomable']) {
  if (!Array.isArray(zoomImg) || !zoomImg?.length) return null;

  const data = zoomImg[0];

  const hasImage = data.image_lg || data.image_md || data.image_sm || null;

  if (!hasImage) return null;

  const hasUrl = data.url;

  if (!hasUrl) return null;

  return data;
}

function transformAdmissions(res: AdmissionsResponse | null) {
  if (!res || !res.data?.length) return null;

  const data = res.data[0];

  return {
    address: data.attributes?.address,
    latitude: data.attributes?.properties?.coordinates?.latitude,
    longitude: data.attributes?.properties?.coordinates?.longitude,
  } as Admission;
}

function disableTitleAttr() {
  const SELECTOR = 'a.--hint[title]';

  const tags = document.querySelectorAll(SELECTOR);

  if (!tags.length) return;

  tags.forEach((tag) => {
    const titleText = tag.getAttribute('title');

    if (!titleText || titleText === '&nbsp;') return;

    tag.removeAttribute('title');

    tag.setAttribute('data-title', titleText);
  });
}
</script>

<template>
  <SArticleMain
    :uri="path"
    :image="entity?.image"
    :page-title="entity?.title"
    :date-modified="entity?.updated_at"
    :date-published="entity?.created_at"
    :parent-title="category.name"
    type="article"
  >
    <SArticleIntro
      :title="entity?.title"
      :description="entity?.annotation"
      :date
      :breadcrumbs
      :author-img="person.photo"
      :author-name="`${person.name} ${person.surname}`"
      :author-link="person.slug"
      :image="entity?.image"
    />
    <SArticleMenu :items="chapters" />
    <SArticleSpecialitiesNew
      v-if="specialtiesNew.length || specialties?.length"
      :title="recommendProgramsTitleNew ? recommendProgramsTitleNew : recommendProgramsTitle ? recommendProgramsTitle : 'Рекомендуемые программы обучения'"
      :items="specialtiesNew.length ? specialtiesNew : specialties"
    />
    <SArticleBanners
      class="--mobile"
      image-lg="/img/articles/banner/articles_banner_4_lg.webp"
      image-md="/img/articles/banner/articles_banner_4_md.webp"
      image-sm="/img/articles/banner/articles_banner_4_sm.webp"
      btn-text="Подобрать программу"
      :href="`${ROUTES.ADMISSION_COMMITTEE}?${ARTICLE_BANNER_UTM}${entity?.id}`"
    />
    <div
      id="s-article"
      class="s-article"
    >
      <div
        class="s-article__content a-font_l"
      >
        <template
          v-for="item, index in tags"
          :key="index"
        >
          <template v-if="typeof (item) === 'object'">
            <component
              :is="item.component"
              v-if="item.component !== 's-article-paragraph'"
              v-bind="item.props"
            />
            <SArticleParagraph
              v-else
              v-bind="item.props"
            />
          </template>
          <template v-else>
            <div
              class="s-article__content-item"
              v-html="item"
            />
          </template>
        </template>
        <SArticleAddress
          v-if="!zoomableImg"
          :admission="admissionAddress"
        />
        <SFaqMin
          v-if="faq?.length"
          :items="faq"
          title-class="a-font_h4"
          items-title-class="a-font_xl-m"
          items-text-class="a-font_m-m"
          multiple-open
        />
      </div>
    </div>
    <template #bottom>
      <template v-if="zoomableImg">
        <SArticleZoomableImg
          :image="zoomableImg"
          :article-id="entity?.id"
        />
      </template>
      <template v-else>
        <SInteresting :items="interestingArticles" />
        <MFormMin
          :title="ARTICLE_DEFAULT_FORM_TITLE"
          :action-params="[{ param: bottomFormName }]"
          bg-color="red"
          btn="Подать заявку"
        />
        <SDownloadAppNew />
      </template>
    </template>
    <template #aside>
      <SArticleBanners v-if="SHOW_ASIDE_FORM">
        <MForm
          :action-params="[{ param: ARTICLE_DEFAULT_FORM_PARAM }]"
          :title="ASIDE_FORM_TITLE"
          class="--large"
          title-class="a-font_h6"
          bg-color="white"
        />
      </SArticleBanners>
      <SArticleBanners
        v-else
        class="--large"
        image-lg="/img/articles/banner/articles_banner_4_lg.webp"
        image-md="/img/articles/banner/articles_banner_4_md.webp"
        image-sm="/img/articles/banner/articles_banner_4_sm.webp"
        btn-text="Подобрать программу"
        :href="`${ROUTES.ADMISSION_COMMITTEE}?${ARTICLE_BANNER_UTM}${entity?.id}`"
      />
    </template>
  </SArticleMain>
</template>

<style lang="scss" scoped>
@import './SArticleEntity.scss';
</style>
