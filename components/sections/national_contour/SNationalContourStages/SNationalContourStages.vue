<script setup lang="ts">
interface Props {
  title?: string;
}

defineProps<Props>();

const { openModal } = useModalStore();


const cards = [
  {
    iconName: 'pen-filled',
    subtitle: 'Оставьте заявку на&nbsp;сайте или&nbsp;позвоните нам. Мы свяжемся в&nbsp;течение дня, уточним задачу, проконсультируем по&nbsp;рынку и&nbsp;срокам и&nbsp;сформируем профиль вакансии.',
  },
  {
    iconName: 'doc-filled',
    subtitle: 'Заключаем договор и&nbsp;запускаем подбор. AI&nbspанализирует тысячи резюме, команда рекрутеров подключается к&nbsp;хантингу. Первые кандидаты&nbsp;— через&nbsp;2–5 дней.',
  },
  {
    iconName: 'bag-filled',
    subtitle: 'Проводим интервью, тесты, оцениваем навыки, собираем рекомендации и&nbsp;проверяем документы. Отправляем регулярные отчёты о&nbsp;ходе подбора.',
  },
  {
    iconName: 'star-filled',
    subtitle: 'Предоставляем <nobr>шорт-лист</nobr> с&nbsp;резюме и&nbsp;оценками. Организуем интервью, сопровождаем кандидатов. Вы выбираете финалиста.',
  },
  {
    iconName: 'file-filled',
    subtitle: 'Помогаем с&nbsp;оффером и&nbsp;оформлением. Поддерживаем кандидата в&nbsp;адаптации в&nbsp;течение 3 месяцев. Бесплатная замена при&nbsp;необходимости.',
  },
];

const modalProps = {
  title: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;ответим на&nbsp;все вопросы',
  'form-name': true,
  'form-phone': true,
  btn: 'Отправить',
  'action-params': [{ param: 'form=konsultatsija_etapu' }],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-national-contour-stages"
    :title
  >
    <div class="s-national-contour-stages__body">
      <div class="s-national-contour-stages__list">
        <div
          v-for="(card, idx) in cards"
          :key="card.subtitle"
          class="s-national-contour-stages__card"
        >
          <div class="s-national-contour-stages__card-top">
            <h5 class="s-national-contour-stages__card-num">{{ `0${1 + idx}` }}</h5>
            <ASvgMono
              :name="card.iconName"
              class="--mobile"
            />
          </div>
          <div class="s-national-contour-stages__card-bottom">
            <span
              v-dompurify-html="card.subtitle"
              class="s-national-contour-stages__card-subtitle a-font_l-m"
            />
            <ASvgMono
              :name="card.iconName"
              class="--desktop"
            />
          </div>
        </div>
      </div>
    </div>

    <AButton
      class="s-national-contour-stages__btn-form"
      @click="openModal('MModalForm', modalProps)"
    >
      Консультация
    </AButton>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SNationalContourStages.scss';
</style>
