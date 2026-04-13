<script setup lang="ts">
import type { Direction, HelpCard } from '~/components/sections/SChooseDirection/SChooseDirectionData';
import { directionType } from '~/components/sections/SChooseDirection/SChooseDirectionData';
import type { DirectionDataType } from '~/components/sections/SChooseDirection/SChooseDirectionData';
import imgLg from '~/assets/images/m-help-choose-card/3-lg.webp';
import imgSm from '~/assets/images/m-help-choose-card/3-sm.webp';

interface Props {
  routeName?: string;
  type: keyof typeof directionType;
  name: string;
  title?: string;
}

const {
  routeName = '',
  type = 'level',
  name = '',
  title = 'Направления обучения',
} = defineProps<Props>();

const currentType = directionType[type];

const firstKey = Object.keys(currentType)[0] as keyof typeof currentType;
const currentData: DirectionDataType = name in currentType
  ? currentType[name as keyof typeof currentType]
  : currentType[firstKey];

const formTitle = shallowRef('');
const actionParams = currentData?.actionParams;

const { openModal } = useModalStore();

function clickBtn(title: string) {
  formTitle.value = title;

  openModal('MModalForm', {
    'formPhone': true,
    'title': formTitle,
    'subtitle': 'Презентацию о&nbsp;программах обучения вы получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram',
    'subtitleClass': 'a-font_l-m',
    'btn': 'Скачать программы',
    'actionParams': actionParams,
    'routeName': routeName,
  });
}

function isHelpCard(item: Direction | HelpCard): item is HelpCard {
  return (item as HelpCard)?.type === 'helpCard';
}
</script>

<template>
  <MSectionNewResponsive
    :title
    class="s-choose-direction-new"
  >
    <div class="s-choose-direction-new__list">
      <template
        v-for="(item) in currentData.directions"
        :key="item.title"
      >
        <MHelpChooseCard
          v-if="isHelpCard(item)"
          :title="item.title"
          titleClass="a-font_h5"
          :description="item.description"
          descriptionClass="a-font_s-m"
          :text="item.text"
          :img-lg="imgLg"
          :img-md="imgSm"
          :img-sm="imgSm"
          :form-id="item.formId"
          :action-params="[{param: 'form=direction_help_card'}]"
          form-title="Оставьте контакты, мы вам поможем"
          variant="first"
          color-type="white"
        />
        <div
          v-else
          class="s-choose-direction-new__item"
          @click="clickBtn(item.titleForm ?? item.title)"
        >
          <div class="s-choose-direction-new__top">
            <h5 class="a-font_h5" v-html="item.title" />
            <p class="a-font_xs-m" v-html="item.text" />
          </div>
          <AImg
            :src="item.iconNew"
            alt="direction"
            class="s-choose-direction-new__img"
            decoding="async"
            loading="lazy"
          />
          <AButton
            size="md"
            bg-color="white"
          >
            Выбрать
          </AButton>
        </div>
      </template>
      <div class="s-choose-direction-new__plug">
        <AImg
          src="/img/plug.webp"
          alt="plug"
          decoding="async"
          loading="lazy"
        />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SChooseDirectionNew.scss';
</style>
