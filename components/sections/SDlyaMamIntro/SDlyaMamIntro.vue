<script setup lang='ts'>
interface Props {
  routeName: string
  entity: { id?: number, name?: string; short_name?: string; }
}

const {
  routeName,
  entity,
} = defineProps<Props>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;ответим на&nbsp;все вопросы',
    'form-name': true,
    'form-phone': true,
    btn: 'Отправить',
    'action-params': [{ param: 'form=pervyy_ekran' }],
  });
}

const items = [
  'Высшее образование без&nbsp;посещения университета',
  'Круглогодичное поступление без&nbsp;ЕГЭ и&nbsp;экзаменов',
  'Диплом гособразца по&nbsp;окончании обучения',
];

const breadcrumbs = generateBreadcrumbs({ routeName, entity });
</script>

<template>
  <MSectionNewResponsive class="s-dlya-mam-intro">
    <MBreadcrumbs :breadcrumbs />
    <ABgImages
      imageLG="/img/s-dlya-mam/intro_lg.webp"
      imageSM="/img/s-dlya-mam/intro.webp"
    />
    <h1 class="a-font_banner s-dlya-mam-intro__title">Образование и&nbsp;трудоустройство для&nbsp;мам в&nbsp;декрете</h1>

    <div class="s-dlya-mam-intro__list">
      <div
        v-for="item in items"
        :key="item"
        class="s-dlya-mam-intro__item"
      >
        <ASvgMono name="simple-check3" />
        <p
          class="a-font_l-m"
          v-html="item"
        />
      </div>
    </div>

    <p class="s-dlya-mam-intro__text a-font_h6">«Образование для&nbsp;мам»&nbsp;— специальная программа переподготовки и&nbsp;повышения квалификации</p>
    <AButton
      size="lg"
      @click="openForm"
    >
      Узнать больше
    </AButton>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import './SDlyaMamIntro.scss';
</style>
