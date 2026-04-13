<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { CourseEntity, Nullable, FacultyEntity } from '~/types';
import { LK_CHECKOUT } from '~/constants/routes';
import { EXPRESS_PRODUCT_PRICE } from '~/constants/common';
import { KEYS } from '~/constants';
import DefaultFacultyIcon from '~/assets/images/program/intro/default-intro-icon.svg?url';
import { synergyApi } from '~/utils/mediaCdn';

interface FacultyByCourseResponse {
  data: {
    id: string;
    type: 'faculties';
    attributes: FacultyEntity;
  };
  included?: Array<{
    id: string;
    attributes: {
      name: string;
      value: unknown;
    };
  }>;
}

interface Props {
  actionParams?: { param: string }[]
  entity?: Nullable<CourseEntity>;
  routeName?: string;
}

const {
  actionParams: propsActionParams = [],
  entity = null,
  routeName = '',
} = defineProps<Props>();

const {
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
  observer: true,
  observeParents: true,
});

const {
  external_id: externalId = null,
  price = 0,
  currency = '',
  partner_show = false,
  partner_bonuses: bonusText = '',
  partner_logo = '',
  is_express,
} = entity?.properties || {};

const hasPriceInfo = (externalId && price && currency) || is_express;

const runtimeConfig = useRuntimeConfig();
const expressPaymentUrl = computed(() => (runtimeConfig.public.expressPaymentUrl as string) || '');
const expressThankUrl = computed(() => (runtimeConfig.public.expressThankUrl as string) || '');
const expressProductId = computed(() => {
  const raw = runtimeConfig.public.expressProductId as string;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 0;
});

const { data: direction, execute: fetchCourseDirection } = await useFetch(`/api/courses/${entity?.id}/direction`, {
  deep: false,
  watch: false,
  immediate: false,
  transform(res) {
    if (!res) return null;
    return res.data?.attributes;
  },
});

await Promise.all([
  fetchCourseDirection(),
]);

const actionParams = useCourseActionParams({
  defaultParams: [
    { param: 'grcampaign=e_mail_chain_vpo' },
    { param: 'form=foreign_entrant' },
    { param: 'level=Курсы' },
    ...propsActionParams,
  ],
  directionName: direction.value!.name,
  courseSlug: entity!.slug,
});

const breadcrumbsWithoutDirection = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const breadcrumbs = direction.value!.name
  ? [
      ...breadcrumbsWithoutDirection.slice(0, -1),
      { title: direction.value!.name, link: `/professions/${direction.value!.slug}` },
      breadcrumbsWithoutDirection[breadcrumbsWithoutDirection.length - 1],
    ]
  : breadcrumbsWithoutDirection;

const {
  course_triggers = [],
  course_intro = [],
} = entity?.customFields ?? {};

const {
  images: courseImages = [],
  tools: courseTools = '',
  type: courseType = '',
  triggers: courseTriggers = [],
} = course_intro[0] || {};

const startDate = courseFormatStartDate(course_triggers);
const courseDuration = formatDaysToMonths(entity?.properties.duration_days);

const { data: faculty } = await useFetch<FacultyByCourseResponse>(`/api/courses/${entity?.id}/faculty`, {
  deep: false,
  watch: false,
  key: `${KEYS.COURSE_FACULTY}-${entity?.id}`,
});

const facultyData = faculty.value?.data?.attributes;
const facultyIcon = facultyData?.preview_image || DefaultFacultyIcon;
const facultyName = facultyData?.name || '';

const tools = courseTools?.split(', ')
  .filter(Boolean)
  .map((tool) => {
    return {
      name: tool,
      icon: tool.trim().toLowerCase().replace(/\s+/g, '_'),
    };
  });

const introImage = courseImages[0]?.image || entity?.image;

const imageClass = computed(() => {
  if (courseImages[0]?.image) {
    return 's-course-intro-new__image';
  }
  return 's-course-intro-new__old-image';
});

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Узнайте подробнее у&nbsp;менеджера, заполнив форму',
    titleClass: 'a-font_h6',
    btn: 'Отправить',
    formName: false,
    formPhone: true,
    actionParams: actionParams,
  });
}

useFitText('titlePage');

async function handlePayClick() {
  try {
    const payUrl = expressPaymentUrl.value;
    const thankUrl = expressThankUrl.value;
    const productId = expressProductId.value;
    const landLabel = (runtimeConfig.public.paymentLandLabel as string) || '';

    if (!payUrl || !thankUrl || !productId) {
      console.warn('Экспресс-оплата отключена: задайте NUXT_PUBLIC_EXPRESS_* в .env');
      return;
    }

    const response = await $fetch<{
      link?: string;
      data?: {
        relationships?: {
          transactions?: {
            links?: {
              self?: string;
            };
          };
        };
      };
    }>(payUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        products: [
          {
            id: productId,
            count: 1,
            newPlan: true,
          },
        ],
        land: landLabel,
        manualEmail: true,
        fillContract: true,
        meta: {
          utm_campaign: 'avtooplata',
        },
        successPage: thankUrl,
      },
    });

    const paymentUrl = response?.link || response?.data?.relationships?.transactions?.links?.self;

    if (!paymentUrl) {
      throw new Error('Payment url is missing');
    }

    await navigateTo(paymentUrl, { external: true });
  } catch (error) {
    console.error(error);
  }
}

const buttonProps = computed(() => {
  if (is_express) {
    return { onClick: handlePayClick };
  }
  return { to: `${LK_CHECKOUT}/${entity?.id}` };
});

const subtitle = computed(() => {
  if (bonusText) {
    return { class: 'a-font_h5 --bonus', html: bonusText };
  }
  return { class: 'a-font_h6', html: entity?.comment };
});
</script>

<template>
  <MSection class="s-course-intro-new">
    <div class="s-course-intro-new__banner">
      <AImg
        v-if="courseImages?.length || partner_show"
        class="s-course-intro-new__banner-bg"
        :class="partner_show ? 'sm-hiden' : ''"
        :src="partner_show ? '/img/courses/intro_partner_bg.webp' : '/img/courses/intro_bg.webp'"
      />
      <AImg
        v-if="!partner_show"
        :src="introImage"
        :alt="entity?.name"
        :class="imageClass"
      />

      <div
        v-if="partner_show"
        class="s-course-intro-new__partner_icons"
      >
        <div class="s-course-intro-new__faculty-icon">
          <AImg
            :src="facultyIcon"
            :alt="facultyName"
            decoding="async"
          />
        </div>
        <div
          v-if="partner_logo"
          class="s-course-intro-new__partner"
        >
          <svg
            class="circle"
            viewBox="0 0 100 100"
          >
            <path
              id="circle"
              d="M 0,50 a 50,50 0 1,1 0,1 z"
            />
            <text
              textLength="310"
              lengthAdjust="spacing"
            >
              <textPath xlink:href="#circle">
                Партнёр курса Партнёр курса Партнёр курса Партнёр курса Партнёр курса
              </textPath>
            </text>
          </svg>

          <AImg
            :src="partner_logo"
            decoding="async"
          />
        </div>
      </div>
      <p
        v-if="startDate"
        class="a-font_l-m s-course-intro-new__start"
      >
        <ASvgMono name="simple-hat" />
        <span v-html="`Старт ${startDate}`" />
      </p>

      <div class="s-course-intro-new__banner-content">
        <MBreadcrumbs :breadcrumbs />
        <h1
          ref="titlePage"
          class="a-font_banner s-course-intro-new__name"
          :class="partner_show ? '--partner-title' : ''"
          v-html="entity?.name"
        />
        <p
          v-if="subtitle.html"
          class="s-course-intro-new__banner-content-subtitle"
          :class="subtitle.class"
          v-html="subtitle.html"
        />
        <ul
          class="s-course-intro-new__tags a-font_l-m"
          :class="partner_show ? 'order-0' : ''"
        >
          <li
            v-if="partner_show"
            class="--partner-tag"
          >
            <ASvgMono name="speciality_partner-2" />
            <span>Партнёрский курс</span>
          </li>
          <li v-if="courseType">
            <ASvgMono name="simple-world" />
            <span v-html="courseType" />
          </li>
          <li
            v-if="courseDuration"
            class="--duration"
          >
            <ASvgMono name="simple-calendar2" />
            <span v-html="courseDuration" />
          </li>
        </ul>
        <div class="price-buttons">
          <AButton
            v-if="hasPriceInfo"
            v-bind="buttonProps"
          >
            Перейти к оплате: <span class="a-font_h5">{{ is_express? EXPRESS_PRODUCT_PRICE : price }}<span class="ruble-icon">Р</span></span>
          </AButton>
          <AButton
            @click="openForm()"
            :bg-color="hasPriceInfo ? 'white' : 'red'"
          >
            <span>Узнать подробнее</span>
          </AButton>
        </div>
      </div>
    </div>

    <div
      v-if="tools?.length"
      class="s-course-intro-new__icons"
    >
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="item in tools"
          :key="item.name"
          class="a-font_s-m s-course-intro-new__icons-item"
        >
          <AImg
            :src="synergyApi(`uploads/tools/${item.icon}.webp`)"
            :alt="item.name"
          />
          <p v-html="item.name" />
        </SwiperSlide>
      </Swiper>
    </div>

    <div
      v-if="courseTriggers.length"
      class="s-course-intro-new__info"
    >
      <div
        v-for="item in courseTriggers"
        :key="item.title"
        class="a-font_l-m s-course-intro-new__info-item"
      >
        <p
          class="a-font_l-m"
          v-html="item.title"
        />
        <p
          class="a-font_l-m s-course-intro-new__info-item-text"
          v-html="item.text"
        />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCourseIntroNew.scss';

:deep() {
  .m-breadcrumbs {
    order: -2;
  }

  .a-btn {
    @include tablet(min) {
      margin-top: auto;

     .s-course-intro-new__banner-content-subtitle + & {
        margin-top: 0;
      }
    }
  }
}
.s-course-intro-new {

  &__banner-content-subtitle {
    &.--bonus {
      position: relative;

      @include desktop(min) {
        margin-bottom: scale(16);
      }

      &:before {
        position: absolute;
        content: '';
        bottom: scale(-8);
        left: 0;
        width: 100%;
        height: scale(4);
        background: linear-gradient(90deg, var(--a-color_red) 0%, #E2C0C5 87%, #E4A8AD 100%);
        border-radius: scale(12);

        @include tablet(max) {
          content: none;
        }
      }
    }

    @include tablet(min) {
      margin-top: auto;
    }
  }

  &__partner_icons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: scale(40) scale(10);

    @include tablet(min) {
      padding: 0;
      position: absolute;
      top: 50%;
      right: scale(24);
      transform: translateY(-50%);
    }

    @include desktop(min) {
      right: scale(100);
    }
  }

  &__faculty-icon,
  &__partner {
    height: scale(180);
    width: scale(180);
    padding: 10%;
    background-color: rgba(255,255,255,0.25);
    border: 1px solid var(--a-color_white);
    border-radius: 50%;
    rotate: -15deg;

    @include tablet() {
      width: scale(140);
      height: scale(140);
    }

    @include desktop(min) {
      width: scale(380);
      height: scale(380);
    }

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }

  &__partner {
    position: relative;
    rotate: -20deg;
    margin-left: scale(-48);
    background-color: var(--a-color_grey_10);
    border: none;
    padding: 14%;

    @include desktop(min) {
      margin-left: scale(-80);
    }

    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      overflow: visible;
      width: 85%;
      height: 85%;
      font-size: 7px;
      font-weight: 600;
      fill: var(--a-color_grey_80);
    }

    .circle path {
      fill: none;
    }
  }
}
</style>

