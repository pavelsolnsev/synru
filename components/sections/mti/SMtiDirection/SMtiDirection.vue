<script lang="ts" setup>
interface Props {
  title: string
  cards: {
    title: string
    subtitle?: string
    imageLG: string
    imageMD: string
    imageSM: string
    animatedIcon?: string
  }[],
  routeName?: string
}

const { cards = [] } = defineProps<Props>();

const chosenDirection = shallowRef(cards[0].title);

const popupTitle = computed(() => {
  return `Скачайте программы по&nbsp;направлению «${chosenDirection.value}»`;
});

const { openModal } = useModalStore();

function openDirection() {
  openModal('MModalForm', {
    title: popupTitle,
    subtitle: "Презентацию о&nbsp;программах обучения вы&nbsp;получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram",
    subtitleClass: "a-font_l-m",
    btn: 'Скачать программы',
    formPhone: true,
    actionParams: [{ param: 'form=postupi_short_mti' }],
  });
}

function changeChosenDirection(direction: string) {
  chosenDirection.value = direction;
}
</script>

<template>
  <MSection
    class="s-mti-direction"
    :title
  >
    <ul class="s-mti-direction__cards">
      <li
        v-for="card in cards"
        :key="card.title"
        class="s-mti-direction__card"
        @click="changeChosenDirection(card.title); openDirection();"
      >
        <div
          class="s-mti-direction__card-title"
          v-html="card.title"
        />
        <div
          v-if="card.subtitle"
          class="s-mti-direction__card-subtitle"
          v-html="card.subtitle"
        />
        <AButton
          class="s-mti-direction__btn"
          bg-color="white"
          size="sm"
        >
          Выбрать
        </AButton>
        <img
          v-if="card.animatedIcon"
          :src="`/img/animatedBGs/${card.animatedIcon}.webp`"
          :alt="card.animatedIcon"
          class="s-mti-direction__img"
        >
        <ABgImages
          :class="card.animatedIcon ? 's-mti-direction__bg' : undefined"
          v-bind="card"
        />
      </li>
    </ul>
  </MSection>
</template>

<style lang="scss">
@import './SMtiDirection.scss';
</style>
