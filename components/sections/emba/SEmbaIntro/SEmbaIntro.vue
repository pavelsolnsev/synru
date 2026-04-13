<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';

interface Props {
  entity?: object;
  routeName?: string;
}

const {
  entity = {},
  routeName = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const mainList = [{
  img: '/img/emba/emba_main_2.webp',
  title: 'Артемий Лебедев',
  text: 'Дизайнер, предприниматель, блогер, дизайн директор&nbsp;ВК',
}, {
  img: '/img/emba/emba_main_3.webp',
  title: 'Марк Розин',
  text: 'Управляющий партнер «Экопси консалтинг», кандидат психологических&nbsp;наук',
}, {
  img: '/img/emba/emba_main_4.webp',
  title: 'Андрей Клепач',
  text: 'Заслуженный экономист Российской Федерации, государственный деятель',
}, {
  img: '/img/emba/emba_main_5.webp',
  title: 'Сергей Иванов',
  text: 'Исполнительный директор, член совета директоров ГК «ЭФКО»',
}, {
  img: '/img/emba/sergey_pereslegin_lg.webp',
  title: 'Сергей Переслегин',
  text: 'Директор Центра управления знаниями МНИИПУ, руководитель проектной группы и СМИ «Софиософт», физик, социолог, исследователь, публицист',
}];

const tags = ['6 стран', '16 модулей', '2 года обучения', '4 выездных модуля', 'трек ­«Здоровье лидера»'];

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте заявку',
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [{param: 'form=emba'}],
  });
}
</script>

<template>
  <MSection class="s-emba-intro">
    <div class="s-emba-intro__content">
      <MBreadcrumbs
        v-if="breadcrumbs.length"
        :breadcrumbs
      />
      <picture>
        <source
          media="(min-width: 1200px)"
          srcset="/img/emba/emba_lg.webp"
        >
        <source
          media="(min-width: 768px)"
          srcset="/img/emba/emba_md.webp"
        >
        <AImg
          src="/img/emba/emba_sm.webp"
          alt=""
          decoding="async"
        />
      </picture>
      <h1 class="a-font_banner s-emba-intro__title">EXECUTIVE MBA</h1>
      <div class="a-font_h6 s-emba-intro__subtitle">
        <ASvgMono name="gerb_2" />
        <span>Русская школа управления</span>
      </div>
      <div class="a-font_h6 s-emba-intro__text">Комплексная программа развития для&nbsp;опытных управленцев, которые хотят выйти на&nbsp;новый уровень</div>
      <AButton
        size="lg"
        class=""
        @click="openForm()"
      >
        Подать заявку
      </AButton>
      <div class="s-emba-intro__tags">
        <ATag
          v-for="tag in tags"
          :key="tag"
          :text="tag"
          variant="blur"
        />
      </div>
    </div>
    <div class="s-emba-intro__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in mainList"
          :key="item.title"
          class="s-emba-intro__item"
        >
          <AImg
            :src="item.img"
            :alt="item.title"
            decoding="async"
          />
          <div class="s-emba-intro__item-info">
            <div class="s-emba-intro__item-title a-font_xl-m">{{ item.title }}</div>
            <div
              class="s-emba-intro__item-text a-font_s-m"
              v-html="item.text"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SEmbaIntro';
</style>
