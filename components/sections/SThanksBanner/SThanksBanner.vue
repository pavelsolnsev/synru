<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';
import { FREE_COURSE_DIRECTION_ID, LK_THANKS_PAGE_KEY } from '~/constants/common';
import type { RegistrationDataKey } from '~/types';

interface CardItem {
  icon: string;
  text: string;
  key: RegistrationDataKey;
}

const FREE_PREFIX = 'free_' as const;

const route = useRoute();

const courseVideoLink = ref<string | undefined>(undefined);

const isFreeQuery = Object.keys(route.query).find((key) => key.startsWith(FREE_PREFIX));
const phone = window?.localStorage.getItem('phone');

if (isFreeQuery) {
  const { data: courses } = await useFetch('/api/courses', {
    watch: false,
    deep: false,
    query: {
      'filter[slug]': isFreeQuery.replace(FREE_PREFIX, ''),
      'filter[direction_id]': FREE_COURSE_DIRECTION_ID,
      'fields[courses]': 'id,name',
      'include': 'customFieldValues',
      'filter[published]': 'true',
      'nolinks': '1',
    },
  });

  courseVideoLink.value = mapCustomFields(courses.value?.data?.at(0)?.attributes.custom_field_values)?.free_video || '';
}

const { data: checkByPhoneData, execute: fetchCheckByPhone } = await useFetch('/api/lk/check-by-phone', {
  method: 'POST',
  body: {
    phone,
  },
  immediate: false,
});

const userExists = computed(() => checkByPhoneData.value?.exists);
const redirectTo = computed(() => userExists.value ? ROUTES.LK_LOGIN : ROUTES.LK_REGISTRATION);

useScriptTag(
  'https://api.flocktory.com/v2/loader.js?site_id=5541',

  () => {
    try {
      const storagedEmail = localStorage.getItem('email');

      if (document.querySelector('.i-flocktory') &&
        storagedEmail) {
        document.querySelector('.i-flocktory')?.setAttribute('data-fl-user-email',
          storagedEmail);
      }
    } catch (e) { console.log(e); }
  },
);

const { width: windowWidth } = useWindowSize();
const isMobile = ref(windowWidth.value < 768);
const isDesktop = ref(windowWidth.value >= 1200);

watchEffect(() => {
  isMobile.value = windowWidth.value < 768;
  isDesktop.value = windowWidth.value >= 1200;
});

const title = 'Спасибо!';
const description = 'В&nbsp;течение 5&nbsp;минут с&nbsp;вами свяжется сотрудник приёмной комиссии';
const inviteTxt =  computed(() => userExists.value ? 'А&nbsp;сейчас войдите в&nbsp;личный кабинет абитуриента' : 'А&nbsp;сейчас зарегистрируйтесь в&nbsp;личном кабинете абитуриента');
const inviteBtn = computed(() => userExists.value ? 'Войти' : 'Зарегистрироваться');

const cardsList: CardItem[] = [
  {
    icon: 'simple-catalog',
    text: 'Стоимость <br>обучения',
    key: 'price',
  },
  {
    icon: 'simple-man-check',
    text: 'Минимальный проходной балл',
    key: 'score',
  },
  {
    icon: 'simple-man-bust',
    text: 'Количество бюджетных мест',
    key: 'budget',
  },
  {
    icon: 'simple-precent-three',
    text: 'Расчёт кредита<br>под 3%',
    key: 'credit',
  },
  {
    icon: 'simple-doc-write',
    text: 'Подача заявления<br>на поступление',
    key: 'application',
  },
  {
    icon: 'simple-doc-2',
    text: 'Тест<br>на профориентацию',
    key: 'proftest',
  },
];

const cardsListFont = ref(isDesktop.value ? 'a-font_l-m' : 'a-font_s-m');

watch(windowWidth, () => {
  cardsListFont.value = isDesktop.value ? 'a-font_l-m' : 'a-font_s-m';
});

function onCardClick(key: RegistrationDataKey) {
  localStorage?.setItem(LK_THANKS_PAGE_KEY, key);
}

onMounted(() => {
  if(!courseVideoLink.value && phone) fetchCheckByPhone();
});
</script>


<template>
  <SThanksBannerFree
    v-if="courseVideoLink"
    :course-video-link
  />

  <MSection
    v-else
    class="s-thanks-banner"
  >
    <div class="s-thanks-banner__wrap">
      <div class="s-thanks-banner__top">
        <div class="s-thanks-banner__headtitle">
          <h1 class="s-thanks-banner__headtitle-title a-font_h1">{{ title }}</h1>
          <p
            class="s-thanks-banner__headtitle-text a-font_h5"
            v-html="description"
          />
          <div class="s-thanks-banner__invite --large">
            <h6
              class="a-font_h6"
              v-html="inviteTxt"
            />
            <AButton
              size="lg"
              bg-color="red"
              class="a-font_l-m"
              target="_blank"
              :to="redirectTo"
              :external="true"
              @click="onCardClick('default')"
            >
              {{ inviteBtn }}
            </AButton>
          </div>
        </div>
        <div class="s-thanks-banner__picture --large">
          <h6
            class="a-font_h6 --mobile"
            v-html="inviteTxt"
          />
          <picture>
            <source
              media="(min-width: 1200px)"
              srcset=synergyApi('uploads/content/s-thanks-banner/new/thanks-lg.webp')
            >
            <source
              media="(min-width: 768px)"
              srcset=synergyApi('uploads/content/s-thanks-banner/new/thanks-md.webp')
            >
            <AImg
              src=synergyApi('uploads/content/s-thanks-banner/new/thanks-sm.webp')
              decoding="async"
              alt="lk"
            />
          </picture>
        </div>
      </div>

      <div class="s-thanks-banner__cards">
        <div class="s-thanks-banner__picture --mobile">
          <h6
            class="a-font_h6"
            v-html="inviteTxt"
          />
          <picture>
            <source
              media="(min-width: 1200px)"
              srcset=synergyApi('uploads/content/s-thanks-banner/new/thanks-lg.webp')
            >
            <source
              media="(min-width: 768px)"
              srcset=synergyApi('uploads/content/s-thanks-banner/new/thanks-md.webp')
            >
            <AImg
              src=synergyApi('uploads/content/s-thanks-banner/new/thanks-sm.webp')
              decoding="async"
              alt="lk"
            />
          </picture>
        </div>
        <h6 class="a-font_h6">Что есть в&nbsp;личном кабинете?</h6>
        <div class="s-thanks-banner__cards-list">
          <NuxtLink
            v-for="item in cardsList"
            :key="item.text"
            :to="redirectTo"
            :external="true"
            class="s-thanks-banner__cards-item"
            target="_blank"
            @click="onCardClick(item.key)"
          >
            <span
              :class="cardsListFont"
              v-html="item.text"
            />
            <ASvgMono :name="item.icon" />
          </NuxtLink>
        </div>

        <AButton
          :to="redirectTo"
          :external="true"
          size="lg"
          bg-color="red"
          class="a-font_l-m --mobile"
          target="_blank"
          @click="onCardClick('default')"
        >
          {{ inviteBtn }}
        </AButton>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SThanksBanner.scss';
</style>
