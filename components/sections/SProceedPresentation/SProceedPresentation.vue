<script setup lang='ts'>
interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const tags = ['Приёмная комиссия', 'Поступление на бюджет', 'Общежитие', 'Какие документы нужны', 'Перевод из другого учреждения', 'Отсрочка от армии', 'Факультеты и специальности', 'Оплата и кредит с господдержкой'];

const { openModal } = useModalStore();

function openFormPresentation() {
  openModal('MModalForm', {
    title: 'Скачайте презентацию о Колледже',
    subtitle: "Презентацию вы получите по СМС и в Telegram",
    subtitleClass: "a-font_h6",
    btn: 'Скачать',
    formName: false,
    formPhone: true,
    actionParams: [
      {param: 'form=skatchat_k'}
    ],
    routeName: routeName,
  });
}

function openFormConsultation() {
  openModal('MModalForm', {
    title: 'Узнайте минимальный проходной балл в 2025 году, оставив заявку',
    btn: 'Отправить',
    formName: false,
    formPhone: true,
    actionParams: [
      {param: 'form=kak_postupit_k'}
    ],
    routeName: routeName,
  });
}
</script>

<template>
  <MSection class="s-proceed-presentation s-form">
    <div class="s-proceed-presentation__container --consultation">
      <picture class="s-proceed-presentation__img">
        <source
          media="(min-width: 1200px)"
          srcset="/img/SProceedPresentation/cons_lg.webp"
        >
        <source
          media="(min-width: 768px)"
          srcset="/img/SProceedPresentation/cons_md.webp"
        >
        <AImg
          src="/img/SProceedPresentation/cons_sm.webp"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-proceed-presentation__content">
        <p class="a-font_h4">Как поступить?</p>
        <p class="a-font_l-m">Собрали для&nbsp;вас всю необходимую <br>информацию о&nbsp;поступлении</p>
        <div class="s-proceed-presentation__tags">
          <ATag
            v-for="tag in tags"
            :key="tag"
            :text="tag"
            variant="blur"
          />
        </div>
        <AButton
          class="s-proceed-presentation__btn"
          @click="openFormConsultation()"
        >
          Получить консультацию
        </AButton>
      </div>
    </div>

    <div class="s-proceed-presentation__container --presentation">
      <picture class="s-proceed-presentation__img">
        <source
          media="(min-width: 1200px)"
          srcset="/img/SProceedPresentation/present_lg.webp"
        >
        <source
          media="(min-width: 768px)"
          srcset="/img/SProceedPresentation/present_md.webp"
        >
        <AImg
          src="/img/SProceedPresentation/present_sm.webp"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-proceed-presentation__content">
        <p class="a-font_h4">Вся информация <br>о&nbsp;Колледже&nbsp;— <br>в&nbsp;презентации, <br>скачайте для&nbsp;изучения</p>
        <AButton
          bg-color="black"
          @click="openFormPresentation()"
        >
          Получить презентацию
        </AButton>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SProceedPresentation.scss';
</style>
