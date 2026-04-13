import SFacultiesQuiz from './SFacultiesQuiz.vue';
import { synergyApi } from '~/utils/mediaCdn';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Sections/SFacultiesQuiz',
  component: SFacultiesQuiz,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFacultiesQuiz },
  setup() {
    return { args };
  },
  template: '<s-faculties-quiz v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  bgImages: [
    {
      'image': synergyApi('uploads/content/faculties/quiz/faculties-sm.webp'),
    },
    {
      'image': synergyApi('uploads/content/faculties/quiz/faculties-md.webp'),
    },
    {
      'image': synergyApi('uploads/content/faculties/quiz/faculties-lg.webp'),
    },
  ],
  description: 'Подберите программу обучения <br>и&nbsp;начните учиться <span class="--free-red">бесплатно</span>',
  descriptionClass: 'a-font_h6',
  factoids: [
    {
      'quantity': [
        {
          'count': 30,
        },
      ],
      'label': 'факультет|факультета|факультетов',
    },
    {
      'title': '500',
      'description': 'преподавателей',
    },
    {
      'title': '1000+',
      'description': 'программ обучения',
    },
    {
      'title': 'Максимум',
      'description': 'практики',
    },
  ],
  quizBtnText: 'Начать бесплатно',
  showBreadcrumbs: true,
  showQuizButton: true,
  title: 'Факультеты',
  titleClass: 'a-font_h1',
  routeName: 'faculties',
};

Default.decorators = [
  vueRouter(),
];
