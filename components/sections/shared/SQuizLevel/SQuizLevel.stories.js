import SQuizLevel from './SQuizLevel.vue';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Sections/SQuizLevel',
  component: SQuizLevel,
  argTypes: {},
};

const Template = (args) => ({
  components: { SQuizLevel },
  setup() {
    return { args };
  },
  template: '<s-quiz-level v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title:'Аспирантура',
  titleClass:'a-font_h1',
  description:'Пройдите тест и&nbsp;узнайте, <br>на&nbsp;кого вам лучше учиться',
  showQuizButton: true,
  quizBtnText:'Подобрать программу',
  bgImages:[
    { image: 'https://example.com/assets/template/v5/new3/images/level/s_quiz/9091_sm.webp?v=270924' },
    { image: 'https://example.com/assets/template/v5/new3/images/level/s_quiz/9091_md.webp?v=270924' },
    { image: 'https://example.com/assets/template/v5/new3/images/level/s_quiz/9091_lg.webp?v=270924' },
  ],
  routeName:'postgraduate_study',
  showBreadcrumbs: true,
  entity:{ id: 1 },
  hasEntity:true,
};

Default.decorators = [
  vueRouter(),
];
