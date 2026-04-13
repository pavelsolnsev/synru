import SCoursesQuiz from './SCoursesQuiz.vue';
import { synergyApi } from '~/utils/mediaCdn';


export default {
  title: 'Sections/SCoursesQuiz',
  component: SCoursesQuiz,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCoursesQuiz },
  setup() {
    return { args };
  },
  template: '<s-courses-quiz v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  bgImages:[
    {
      'image': synergyApi('uploads/content/quiz/new-design/courses/courses_quiz_sm.webp'),
    },
    {
      'image': synergyApi('uploads/content/quiz/new-design/courses/courses_quiz_md.webp'),
    },
    {
      'image': synergyApi('uploads/content/quiz/new-design/courses/courses_quiz_lg.webp'),
    },
  ],
  description: 'Подберите программу обучения <br>и&nbsp;начните учиться <span class="--free-red">бесплатно</span>',
  descriptionClass: 'a-font_h6',
  quizBtnText: 'Начать бесплатно',
  showBreadcrumbs: true,
  showQuizButton: true,
  tagIcon: 'simple-happy',
  title:'Курсы',
  titleClass:'a-font_h1',
  coursesCount: [
    {
      'count': 12,
    },
  ],
};
