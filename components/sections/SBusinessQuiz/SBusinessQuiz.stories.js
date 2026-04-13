import SBusinessQuiz from './SBusinessQuiz.vue';
import { synergyApi } from '~/utils/mediaCdn';


export default {
  title: 'Sections/SBusinessQuiz',
  component: SBusinessQuiz,
  argTypes: {},
};

const Template = (args) => ({
  components: { SBusinessQuiz },
  setup() {
    return { args };
  },
  template: '<SBusinessQuiz v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  bgImages:[
    {
      'image': synergyApi('uploads/content/quiz/8518_lg.webp'),
    },
    {
      'image': synergyApi('uploads/content/quiz/8518_md.webp'),
    },
    {
      'image': synergyApi('uploads/content/quiz/8518_sm.webp'),
    },
  ],
  description: '',
  quizBtnText: 'Подобрать программу',
  showBreadcrumbs: true,
  showQuizButton: true,
  tagIcon: 'simple-diamond',
  title:'Бизнес-образование',
  titleClass:'a-font_banner',
  hasEntity: false,
  programsCount: [
    {
      'count': 5,
    },
  ],
};
