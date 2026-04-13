<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation } from 'swiper/modules';

interface Props {
  tags: Tag[];
  routeName?: string;
}

interface Tag {
  value: number;
  text: string;
}

const {
  tags = [],
  routeName = '',
} = defineProps<Props>();

const formActionParams = routeName === 'mti' ? 'form=pomogite_vibrat_mti' : 'form=pomogite_vibrat';

const tagId = defineModel<number | undefined>();

const prevSlideButton = ref();
const nextSlideButton = ref();

const swiperConfig = {
  modules: [FreeMode, Navigation],
  freeMode: true,
  initialSlide: 0,
  grabCursor: true,
  observer: true,
  resistance: true,
  resistanceRatio: 0,
};

const emit = defineEmits(['selected', 'reset']);

function reset() {
  tagId.value = undefined;
  emit('reset');
}


const { openModal } = useModalStore();

function onClickHelp() {
  openModal('MModalForm', {
    title: 'Поможем подобрать программу обучения ',
    btn: 'Отправить ',
    subtitle: 'Заполните форму, и&nbsp;мы свяжемся с&nbsp;вами, чтобы провести <span class="--free-red">бесплатную</span> профориентацию и&nbsp;ответить на&nbsp;все вопросы ',
    'form-phone': true,
    'subtitle-class': 'a-font_h6 ',
    'action-params': [{param: formActionParams}],
  });
}
</script>

<template>
  <div class="m-programs-tags sticky a-font_l-m">
    <form
      class="nolander m-programs-tags__list"
      autocomplete="off"
    >
      <div
        class="m-programs-tags__item --reset hidden-sm"
        type="button"
        disabled
      >
        <MFilterTab
          title="Популярные"
          :active="!tagId"
          @click.prevent="reset"
        />
      </div>

      <swiper
        slides-per-view="auto"
        :navigation="{ nextEl: nextSlideButton, prevEl: prevSlideButton }"
        v-bind="swiperConfig"
      >
        <swiper-slide>
          <div
            class="m-programs-tags__item --reset hidden-min-md"
            type="button"
            disabled
          >
            <MFilterTab
              title="Популярные"
              :active="!tagId"
              @click.prevent="reset"
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <button
            class="m-programs-tags__item-form a-font_l-m"
            @click.prevent="onClickHelp()"
          >
            <ASvgMono name="question" />
            <span>Помогите выбрать</span>
          </button>
        </swiper-slide>
        <swiper-slide
          v-for="tag in tags"
          :key="tag.value"
        >
          <span class="m-programs-tags__item">
            <input
              v-model="tagId"
              type="radio"
              name="program_tag"
              :value="tag.value"
              autocomplete="off"
              @update:model-value="$emit('selected')"
            >
            <MFilterTab
              :title="tag.text"
              :active="tagId === tag.value"
            />
          </span>
        </swiper-slide>
      </swiper>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import './MProgramsTags.scss';
</style>
