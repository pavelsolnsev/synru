<script setup lang='ts'>
import CardHelpImageLg from '~/assets/images/s-choose-direction/card.webp';
import CardBgImg from '~/assets/images/s-choose-direction/choose-direction-item.webp';
import type { LevelEntity } from '~/types';
import type { Direction, HelpCard } from '~/components/sections/SChooseDirection/SChooseDirectionData';
import { directionType } from '~/components/sections/SChooseDirection/SChooseDirectionData';
import { helpCard } from '~/components/sections/SChooseDirection/SChooseDirectionDataLevel';
import { synergyApi } from '~/utils/mediaCdn';

interface Props {
  routeName?: string;
  entity: LevelEntity
}

const {
  routeName = '',
  entity = {},
} = defineProps<Props>();

const formTitle = shallowRef('Скачайте программы');

const directionsData = directionType['level'];

const currentData = entity.slug ? directionsData[entity.slug as keyof typeof directionsData].directions : directionsData.college.directions;
const actionParams = entity.slug ? directionsData[entity.slug as keyof typeof directionsData].actionParams : directionsData.college.actionParams;

const { openModal } = useModalStore();

function openFormDiretion(title: string) {
  openModal('MModalForm', {
    title: title ?? formTitle,
    subtitle: 'Презентацию о&nbsp;программах обучения вы получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram',
    subtitleClass: 'a-font_l-m',
    btn: 'Скачать программы',
    formName: false,
    formPhone: true,
    actionParams: actionParams,
    routeName: routeName,
  });
}

function isHelpCard(item: Direction | HelpCard): item is HelpCard {
  return (item as HelpCard)?.type === 'helpCard';
}
</script>

<template>
  <MSection
    title="Выберите направление обучения"
    class="s-choose-direction"
  >
    <div class="s-choose-direction__wrap">
      <div class="s-choose-direction__left">
        <template
          v-for="(item, index) in currentData"
          :key="item.title"
        >
          <MHelpChooseCard
            v-if="isHelpCard(item)"
            :title="item.title"
            :text="item.text"
            :description="item.description"
            :form-id="item.formId"
            :action-params="[{param: 'form=direction_help_card'}]"
            form-title="Оставьте контакты, мы вам поможем"
            variant="second"
            color-type="white"
          />
          <div
            v-else
            class="s-choose-direction__item"
            @click="openFormDiretion(item.titleForm)"
          >
            <div
              class="a-font_h5 item__title"
              v-html="item.title"
            />
            <div
              class="a-font_s-m item__text"
              v-html="item.text"
            />
            <AButton size="md">
              Выбрать
            </AButton>
            <AImg
              class="item__img"
              :src="synergyApi(`uploads/content/s-choose-direction/${item.icon}.svg`)"
              alt="direction"
              decoding="async"
              loading="lazy"
            />
            <AImg
              class="item__img --small"
              :src="synergyApi(`uploads/content/faculties/${item.iconSm}.svg`)"
              alt="direction"
              decoding="async"
              loading="lazy"
            />
            <AImg
              v-if="index < 3"
              class="item__bg"
              :src="CardBgImg"
              alt="direction"
              decoding="async"
              loading="lazy"
            />
          </div>
        </template>
      </div>
      <MHelpChooseCard
        :title="helpCard.title"
        :text="helpCard.text"
        :description="helpCard.description"
        :btn="helpCard.btn"
        :form-id="helpCard.formId"
        :img-lg="CardHelpImageLg"
        :action-params="[{param: 'form=direction_help_card'}]"
        form-title="Оставьте контакты, мы вам поможем"
        variant="second"
      />
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SChooseDirection.scss';
</style>
