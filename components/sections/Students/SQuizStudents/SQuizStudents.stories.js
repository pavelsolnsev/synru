import SQuizStudents from './SQuizStudents.vue';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Sections/SQuizStudents',
  component: SQuizStudents,
  argTypes: {},
};

const Template = (args) => ({
  components: { SQuizStudents },
  setup() {
    return { args };
  },
  template: '<s-quiz-students v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  title:'Студентам',
  description:'Возьмите от&nbsp;студенческой жизни максимум. Скачайте приложение Synergy LMS, в&nbsp;нем находятся личный кабинет, расписание и&nbsp;все учебные материалы',
  bgImages:[
    { image: 'https://example.com/assets/template/v5/new3/images/students/intro_sm.webp' },
    { image: 'https://example.com/assets/template/v5/new3/images/students/intro_md.webp' },
    { image: 'https://example.com/assets/template/v5/new3/images/students/intro_lg.webp' },
  ],
  showBreadcrumbs:true,
  routeName: 'students',
};

Default.decorators = [
  vueRouter(),
];
