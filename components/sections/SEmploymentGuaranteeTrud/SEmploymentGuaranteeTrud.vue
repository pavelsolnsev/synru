<script setup lang='ts'>
const { openModal } = useModalStore();

const configModal = {
  title: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;ответим на&nbsp;все вопросы',
  'form-name': true,
  'form-phone': true,
  btn: 'Отправить',
  'action-params': [{ param: 'form=garantiya_trud' }],
};

const items = [{
  title: 'Сопровождение',
  text: 'Персональные консультации, тренинги, практика, помощь на&nbsp;всех этапах поиска работы',
  icon: 'simple-group2',
}, {
  title: 'Сотрудничество',
  text: 'С&nbsp;нами сотрудничают 300+ ведущих компаний России',
  icon: 'simple-bag4',
}, {
  title: 'Экспертность',
  text: 'В&nbsp;нашей команде&nbsp;— карьерные и&nbsp;HR-консультанты, коучи, социальные педагоги и&nbsp;психологи',
  icon: 'simple-premium2',
}, {
  title: 'Преимущество',
  text: 'Доступ к&nbsp;горячим вакансиям компаний-партнёров',
  icon: 'simple-star5',
}];
</script>

<template>
  <MSectionNewResponsive
    class="s-employment-guarantee-trud"
    title="Гарантия трудоустройства"
  >
    <div class="s-employment-guarantee-trud__content">
      <div class="s-employment-guarantee-trud__content-item">
        <p class="a-font_h5">Мы привлекаем индустриальных партнёров из&nbsp;числа ведущих российских компаний к&nbsp;составлению программ и&nbsp;преподаванию, поэтому учим тому, что прямо сейчас востребовано на&nbsp;рынке труда</p>
        <div class="s-employment-guarantee-trud__content-item__text">
          <p class="a-font_xl-m">Уверенность в&nbsp;качестве нашего образования мы подтверждаем юридически: <span class="red">гарантия трудоустройства зафиксирована в&nbsp;договоре</span></p>
          <p class="a-font_l-m">70% студентов и&nbsp;выпускников получают офферы в&nbsp;первые месяцы поиска работы</p>
          <AButton
            size="lg"
            @click="openModal('MModalForm', configModal)"
          >
            Узнать больше
          </AButton>
        </div>
      </div>
      <picture class="s-employment-guarantee-trud__content-item --picture">
        <AImg
          src="/img/s-dlya-mam/garant.webp"
          alt="Гарантия трудоустройства"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div
        v-for="item in items"
        :key="item.title"
        class="s-employment-guarantee-trud__content-item --second"
      >
        <p
          class="a-font_h5"
          v-html="item.title"
        />
        <p
          class="a-font_l-m --text"
          v-html="item.text"
        />
        <ASvgMono :name="item.icon" />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
  @import './SEmploymentGuaranteeTrud.scss';
</style>
