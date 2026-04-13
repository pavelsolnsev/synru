<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { KEYS } from '~/constants';

interface Props {
  title: string;
}

const {
  title = 'Контакты колледжа',
} = defineProps<Props>();

const emails = useTemplateRef('emails');

const {
  swiperRef,
  scrollbarRef,
  swiperConfig,
}  = useSwiperWrapper({
  modules: [Scrollbar],
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

const { data: regionCitiesData } = await useFetch('/api/cities/filter', {
  deep: false,
  watch: false,
  key: KEYS.REGIONS_FILTER_DATA,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return data ? data : undefined;
  },
});

const cities = regionCitiesData.value ?? {};

const citiesCount = computed(() => Object.keys(cities).length);

const citiesValues = [...new Set(Object.values(cities).map((city) => city.value))]
  .sort((a, b) => a.localeCompare(b, 'ru'));

const isFocusSearchInput = defineModel<boolean>('isFocusSearchInput');
const searchValue = shallowRef('');
const selectedCity = shallowRef('Москва');

const searchCityList = computed(() => {
  if (!searchValue.value) {
    return citiesValues;
  }

  const list = citiesValues.filter((city) => city.toLowerCase().includes(searchValue.value.toLowerCase()));

  if (list.length === 0) {
    return ['Город с таким названием не найден'];
  }

  return list;
});

const citySlider = computed(() => {
  return Object.values(cities).filter((city) => city.value.toLowerCase() === selectedCity.value.toLowerCase());
});


function selectCity(city: string) {
  selectedCity.value = city;

  setTimeout(() => {
    if (emails.value) {
      const emailElements = Array.isArray(emails.value) ? emails.value : [emails.value];

      emailElements.forEach((el) => fitText(el, 9));
    }
  }, 100);
}

function onClickOutsideSearchInput() {
  isFocusSearchInput.value = false;
  searchValue.value = '';
}

function formatAddress(address: string | null) {
  if (!address || typeof address !== 'string') return '';

  return address.replace(/ул\.(&nbsp;)?/g, '');
}

function formatAdditionalEmail(email: string) {
  if (!email || typeof email !== 'string') return '';

  return email
    .split(';')
    .map((email) => email.trim());
}

const { reachGoal } = sendYandexMetricaGoal();

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

const contacts = [{
  title: 'Телефон',
  type: 'phone',
  items: [
    {
      title: 'Приёмная комиссия',
      contacts: ['+7 495 800-10-01','8 800 100-00-11'],
    },
    {
      title: 'Для студентов',
      contacts: ['8 800 350-00-60'],
    },
    {
      title: 'По любым вопросам',
      contacts: ['8 800 100-00-11'],
    },
  ],
}, {
  title: 'Почта',
  type: 'email',
  items: [
    {
      title: 'По всем вопросам',
      contacts: ['info@university.example'],
    },
    {
      title: 'Приёмная комиссия',
      contacts: ['postupi@university.example'],
    },
    {
      title: 'По вопросам сотрудничества',
      contacts: ['feedback@university.example'],
    },
  ],
}];
</script>

<template>
  <MSection
    class="s-contacts-admissions"
    :title="title"
  >
    <div class="s-contacts-admissions__content a-font_l-m">
      <div class="s-contacts-admissions__content-item">
        <div class="a-font_h4 s-contacts-admissions__item-title">
          <span>Адреса приёмной комиссии</span>
          <span
            class="num a-font_m-m"
            v-html="citiesCount"
          />
        </div>

        <div
          id="m-map__search"
          class="s-regions__search"
          :class="{'--focused': isFocusSearchInput}"
        >
          <MSearch
            v-model="searchValue"
            v-click-outside="onClickOutsideSearchInput"
            placeholder="Введите город"
            @focus="isFocusSearchInput = true"
          />
          <div
            class="s-regions__search-result"
            :class="{'--focused': isFocusSearchInput}"
          >
            <div
              id="m-map__list"
              class="s-regions__search-list a-font_m-m"
            >
              <span
                v-for="city in searchCityList"
                :key="city"
                @click="selectCity(city)"
                v-html="city"
              />
            </div>
          </div>
        </div>
        <div class="s-contacts-admissions__slider">
          <Swiper
            ref="swiperRef"
            v-bind="swiperConfig"
          >
            <swiper-slide
              v-for="slide in citySlider"
              :key="slide.id"
              class="s-regions__branch"
              itemscope
              itemtype="https://schema.org/LocalBusiness"
            >
              <span
                class="s-regions__branch-name a-font_h6"
                itemprop="name"
                v-html="`${slide.value}, ${slide.region}`"
              />
              <div class="s-regions__branch-params a-font_xs-m">
                <span
                  v-if="slide.address"
                  class="s-regions__branch-param"
                >
                  <ASvgMono name="simple-placemark-dot" />
                  <span
                    class="s-regions__branch-address"
                    itemprop="address"
                    v-html="formatAddress(slide.address)"
                  />
                </span>

                <span
                  ref="emails"
                  class="s-regions__branch-param"
                >
                  <ASvgMono name="simple-world" />
                  <span class="s-regions__branch-emails">
                    <NuxtLink
                      to="mailto:info@university.example"
                      itemprop="email"
                    >
                      info@university.example
                    </NuxtLink>
                  </span>
                </span>

                <span class="s-regions__branch-param">
                  <ASvgMono name="phone-outline" />
                  <span class="s-regions__branch-phones">
                    <NuxtLink
                      to="tel:88001000011"
                      @click="sendReachGoal('88001000011')"
                    >
                      <span itemprop="telephone">8 (800) 100-00-11</span>
                    </NuxtLink>
                  </span>
                </span>
              </div>
            </swiper-slide>
          </Swiper>
          <div
            ref="scrollbarRef"
            class="swiper-scrollbar"
          />
        </div>
      </div>

      <div
        v-for="contact, idx in contacts"
        :key="idx"
        class="s-contacts-admissions__content-item"
      >
        <p
          class="a-font_h4 s-contacts-admissions__item-title"
          v-html="contact.title"
        />
        <div
          v-for="item in contact.items"
          :key="item.title"
          class="s-contacts-admissions__contact"
        >
          <p
            class="s-contacts-admissions__contact-title"
            v-html="item.title"
          />
          <a
            v-for="el in item.contacts"
            :key="el"
            :href="contact.type === 'email' ? `mailto:${el}` : `tel:${el}`"
            class="a-font_m-m"
            v-html="el"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SContactsAdmissions.scss';
</style>
