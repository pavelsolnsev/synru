import SQuiz from './SQuiz.vue';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Sections/SQuiz',
  component: SQuiz,
  argTypes: {},
};

const Template = (args) => ({
  components: { SQuiz },
  setup() {
    return { args };
  },
  template: '<s-quiz v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title: 'Приёмная <br>комиссия&nbsp;2024',
  description: 'Пройдите тест и&nbsp;узнайте, <br>на&nbsp;кого вам лучше учиться',
  quizClass: '--banner',
  showQuizButton: true,
  quizBtnText: 'Подобрать программу',
  showButton: true,
  btnText:'Подробнее',
  btnLink:'https://example.com/abiturientam/priemnaya_komissiya',
  titleClass:'a-font_h1',
  bgImages:[
    { image: 'https://example.com/assets/template/v5/new3/images/s_quiz/main-sm.webp' },
    { image: 'https://example.com/assets/template/v5/new3/images/s_quiz/main-md.webp' },
    { image: 'https://example.com/assets/template/v5/new3/images/s_quiz/main-lg.webp' },
  ],
};

Default.decorators = [
  vueRouter(),
];
