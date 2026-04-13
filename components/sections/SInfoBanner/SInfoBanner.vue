<script setup lang='ts'>
interface Props {
  title?: string;
  titleClass?: string;
  text?: string;
  textClass?: string;
  tags?: { tag: string }[];
  imageLg?: string;
  imageMd?: string;
  imageSm?: string;
  showBtn?: boolean;
  textBtn?: string;
  linkBtn?: string;
  titleForm?: string;
  btnForm?: string;
  formActionParams?: { param: string }[]
  routeName?: string;
}

const {
  title = '',
  titleClass = 'a-font_h3',
  text = '',
  textClass = 'a-font_h6',
  tags = [],
  imageLg = '',
  imageMd = '',
  imageSm = '',
  showBtn = false,
  linkBtn = '',
  textBtn = 'Подробнее',
  titleForm = 'Получить консультацию',
  btnForm = 'Отправить заявку',
  formActionParams = [{ param: 'form=form_banner' }],
  routeName = '',
} = defineProps<Props>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: titleForm,
    btn: btnForm,
    formName: true,
    formPhone: true,
    actionParams: formActionParams,
    routeName: routeName,
  });
}
</script>

<template>
  <MSection class="s-info-banner">
    <picture class="s-info-banner__picture">
      <source
        v-if="imageLg"
        media="(min-width: 1200px)"
        :srcset="imageLg"
      >
      <source
        v-if="imageMd"
        media="(min-width: 768px)"
        :srcset="imageMd"
      >
      <AImg
        v-if="imageSm"
        :src="imageSm"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div class="s-info-banner__content">
      <h2
        class="s-info-banner__title"
        :class="titleClass"
        v-html="title"
      />
      <div
        class="s-info-banner__text"
        :class="textClass"
        v-html="text"
      />

      <div
        v-if="tags.length"
        class="s-info-banner__tags"
      >
        <ATag
          v-for="tag in tags"
          :key="tag.tag"
          :text="tag.tag"
          variant="black"
        />
      </div>

      <AButton
        v-if="showBtn && !linkBtn"
        @click="openForm()"
      >
        {{ textBtn }}
      </AButton>
      <AButton
        v-if="showBtn && linkBtn"
        :to="linkBtn"
      >
        {{ textBtn }}
      </AButton>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SInfoBanner.scss';
</style>
