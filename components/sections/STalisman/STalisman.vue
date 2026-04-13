<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';

const talismanGrid = [
  {
    title: 'Носорог&nbsp;&mdash; талисман <br>демо-вуза',
    text: 'Талисманом демо-вуза является носорог&nbsp;&mdash; символ мудрости, учёности и&nbsp;целеустремлённости. Носороги воплощают работоспособность, уверенность и&nbsp;удачу.',
  },
  {
    text: 'Носорог в&nbsp;дизайне наших пространств и&nbsp;материалов служит постоянным напоминанием о&nbsp;корпоративных ценностях и&nbsp;стремлении к&nbsp;совершенству.',
  },
  {
    text: 'Это символ, который напоминает нашим студентам, сотрудникам и&nbsp;партнёрам о&nbsp;силе синергии и&nbsp;взаимной поддержке внутри сообщества.',
  },
];

const { openModal } = useModalStore();
</script>

<template>
  <MSection class="s-talisman">
    <div class="s-talisman__inner">
      <div class="s-talisman__right">
        <picture class="s-talisman__right-img">
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/s-talisman/thumb-lg.webp')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/s-talisman/thumb-md.webp')
          >
          <AImg
            src=synergyApi('uploads/content/s-talisman/thumb-sm.webp')
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
        <AButton
          bg-color="black"
          @click="openModal('StalismanPopup')"
        >
          Узнать больше о&nbsp;талисмане
        </AButton>
      </div>
      <div class="s-talisman__grid">
        <MCardText
          v-for="item in talismanGrid"
          :key="item.text"
          :title="item.title"
          title-class="a-font_h5"
          :text="item.text"
          text-class="a-font_xl-m"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" src="./STalisman.scss" />
