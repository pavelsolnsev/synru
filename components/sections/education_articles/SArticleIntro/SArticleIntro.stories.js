import SArticleIntro from './SArticleIntro.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/Articles/SArticleIntro',
  component: SArticleIntro,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleIntro },
  setup() {
    return { args };
  },
  template: '<s-article-intro v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  description: 'Описание',
  image: synergyApi('uploads/content/25_11zon.png'),
  breadcrumbs: [{ title: 'Заголовок 1', link: '#' },{ title: 'Заголовок 2', link: '#' }],
  date: '12 января 2025',
  authorName: 'Олег Хрустов',
};
