import SCoursesAbout from './SCoursesAbout.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/SCoursesAbout',
  component: SCoursesAbout,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCoursesAbout },
  setup() {
    return { args };
  },
  template: '<s-courses-about v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  icons: [
    {
      'icon': 'simple-rune',
    },
    {
      'icon': 'simple-happy',
    },
  ],
  tags: [
    {
      'tag': 'Переподготовка — от 6 месяцев',
    },
    {
      'tag': 'Курсы — от 1 месяца',
    },
  ],
  text: '<p>Курсы от&nbsp;1 до&nbsp;6 месяцев для новых навыков и&nbsp;проф. переподготовки.</p> Подходят для тех, кто хочет сменить профессию или расширить свой инструментарий.',
  title: 'О курсах',
  coursesCount: [{ count: 12 }],
  factoids: [
    {
      'text': 'продолжительность <br>обучения',
      'image': synergyApi('uploads/content/s-about/img/2.webp'),
      'title': 'От 1 месяца',
      'imageLg': null,
      'imageMd': null,
      'classname': null,
    },
    {
      'text': 'официального образца по окончании обучения',
      'image': synergyApi('uploads/content/s-about/img/3.webp'),
      'title': 'Диплом',
      'imageLg': null,
      'imageMd': null,
      'classname': '--bg-red',
    },
    {
      'text': 'поможем подобрать вакансии',
      'image': synergyApi('uploads/content/s-about/img/4.webp'),
      'title': 'Центр карьеры',
      'imageLg': null,
      'imageMd': null,
      'classname': '--bg-img',
    },
  ],
};
