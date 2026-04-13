<script setup lang="ts">
const data = {
  title: 'Как оформить иностранную рабочую силу',
  cards: [
    {
      title: 'Разрешение <br>на&nbsp;работу по&nbsp;квоте',
      subtitle: 'Квота&nbsp;— ограниченное количество разрешений на&nbsp;работу для&nbsp;иностранцев, ежегодно устанавливаемое государством. Приём сотрудников по&nbsp;квоте&nbsp;— недорогой, стабильный и&nbsp;проверенный способ привлечения иностранной рабочей силы.',
      content: {
        title: 'Особенности оформления',
        tags: [
          'Современные образовательные методики в&nbsp;дополнительном образовании',
          'Возможна корректировка квоты текущего года (сокращает сроки до&nbsp;2–3 месяцев)',
          'Разрешение выдаётся на&nbsp;1 год и&nbsp;действует только в&nbsp;одном регионе',
        ],
      },
    },
    {
      title: 'Высококвалифицированный специалист (ВКС)&nbsp;— быстрый и&nbsp;выгодный вариант',
      subtitle: 'Оформление иностранного сотрудника в&nbsp;статусе ВКС&nbsp;— наиболее оперативный способ легализации его трудовой деятельности в&nbsp;России. Ключевое требование&nbsp;— заработная плата не&nbsp;менее 250 000 рублей в&nbsp;месяц.',
      content: {
        title: 'Преимущества статуса ВКС',
        tags: [
          'Льготное налогообложение: работодатель выплачивает только НДФЛ (13%) и&nbsp;взносы на&nbsp;страхование от&nbsp;несчастных случаев',
          'Долгосрочное разрешение: рабочая виза и&nbsp;разрешение выдаются на&nbsp;3&nbsp;года',
          'Срок оформления: не более 1 месяца',
          'Сотруднику не&nbsp;нужно сдавать экзамен на&nbsp;знание русского языка',
        ],
      },
    },
    {
      title: 'Разрешение <br>на неквотируемые специальности',
      subtitle: 'Если зарплата иностранного сотрудника не&nbsp;соответствует требованиям для&nbsp;ВКС, возможен альтернативный вариант: оформление вне&nbsp;квоты. При&nbsp;этом иностранный специалист может быть принят только на&nbsp;должность из&nbsp;перечня, утверждённого Минтрудом&nbsp;РФ.',
      content: {
        title: 'Особенности',
        tags: [
          'Срок действия разрешения&nbsp;— до&nbsp;1&nbsp;года',
          'Трудовая деятельность возможна только в&nbsp;регионе выдачи разрешения',
          'Процедура занимает от&nbsp;2 месяцев',
        ],
      },
    },
  ],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-international-contour-paperwork"
    :title="data.title"
  >
    <div class="s-international-contour-paperwork__body">
      <div
        v-for="(card, index) in data.cards"
        :key="card.title"
        class="s-international-contour-paperwork__item"
      >
        <div class="s-international-contour-paperwork__top">
          <div class="s-international-contour-paperwork__number a-font_h5">{{ formatNumberWithLeadingZero(index+1) }}</div>
          <div
            class="s-international-contour-paperwork__title a-font_h5"
            v-html="card.title"
          />
        </div>
        <div class="s-international-contour-paperwork__bottom">
          <div
            class="s-international-contour-paperwork__subtitle a-font_l-m"
            v-html="card.subtitle"
          />
          <div class="s-international-contour-paperwork__content">
            <div
              class="s-international-contour-paperwork__content-title a-font_slider-text"
              v-html="card.content.title"
            />
            <ul class="s-international-contour-paperwork__list">
              <li
                v-for="tag in card.content.tags"
                :key="tag"
                class="s-international-contour-paperwork__tags a-font_l-m"
                v-html="tag"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SInternationalContourPaperwork';
</style>


