import SSchoolQuiz from './SSchoolQuiz.vue';
import { synergyApi } from '~/utils/mediaCdn';


export default {
  title: 'Sections/SSchoolQuiz',
  component: SSchoolQuiz,
  argTypes: {},
};

const Template = (args) => ({
  components: { SSchoolQuiz },
  setup() {
    return { args };
  },
  template: '<s-courses-quiz v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  bgImages:[
    {
      'image': synergyApi('uploads/content/quiz/24205_sm.webp'),
    },
    {
      'image': synergyApi('uploads/content/quiz/24205_md.webp'),
    },
    {
      'image': synergyApi('uploads/content/quiz/24205_lg.webp'),
    },
  ],
  description: 'Подберите программу обучения <br>и&nbsp;начните учиться <span class="--free-red">бесплатно</span>',
  descriptionClass: 'a-font_h6',
  quizBtnText: 'Начать бесплатно',
  showBreadcrumbs: true,
  showQuizButton: true,
  tagIcon: 'simple-happy',
  title:'Школа',
  titleClass:'a-font_h1',
  hasEntity: false,
  programsCount: [
    {
      'count': 7,
    },
  ],
};
