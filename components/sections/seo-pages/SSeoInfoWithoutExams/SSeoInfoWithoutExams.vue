<script setup lang='ts'>
interface Entity {
  name?: string;
  short_name?: string;
}

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
  formActionParams?: { param: string }[],
  entity: Entity & {
    customFields?: {
      'seo-info-without-exams': Array<{
        title: string;
        titleClass?: string;
        text: string;
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
        formActionParams?: { param: string }[];
      }>;
      [key: string]: unknown;
    };
  }
}

const props = defineProps<Props>();

const title = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.title || (props.title || '');
const titleClass = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.titleClass || (props.titleClass || '');
const text = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.text || (props.text || '');
const textClass = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.textClass || (props.textClass || 'a-font_h6');
const tags = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.tags || (props.tags || []) as { tag: string }[];
const imageLg = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.imageLg || (props.imageLg || '');
const imageMd = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.imageMd || (props.imageMd || '');
const imageSm = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.imageSm || (props.imageSm || '');
const showBtn = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.showBtn || (props.showBtn || false);
const linkBtn = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.linkBtn || (props.linkBtn || '');
const textBtn = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.textBtn || (props.textBtn || 'Подробнее');
const titleForm = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.titleForm || (props.titleForm || 'Получить консультацию');
const btnForm = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.btnForm || (props.btnForm || 'Отправить заявку');
const formActionParams = props.entity.customFields?.['seo-info-without-exams']?.at(0)?.formActionParams || (props.formActionParams || [{ param: 'form=form_banner' }]);

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: titleForm,
    btn: btnForm,
    formName: true,
    formPhone: true,
    actionParams: formActionParams,
  });
}

useFitText('refTitle');
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
        ref="refTitle"
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
@import '../SSeoInfoBanner/SSeoInfoBanner.scss';
</style>
