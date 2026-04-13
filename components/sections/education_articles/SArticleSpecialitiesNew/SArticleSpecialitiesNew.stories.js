import SArticleSpecialitiesNew from './SArticleSpecialitiesNew.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/Articles/SArticleSpecialitiesNew',
  component: SArticleSpecialitiesNew,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleSpecialitiesNew },
  setup() {
    return { args };
  },
  template: '<SArticleSpecialitiesNew v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  items: [
    {
      title: 'Статья 1',
      to: 'Ссылка 1',
      ico: synergyRu('content/faculties/icons7_small/gostepriimstvo.svg'),
    },
    {
      title: 'Статья 2',
      to: 'Ссылка 2',
      ico: synergyRu('content/faculties/icons7_small/ekonomika.svg'),
    },
    {
      title: 'Статья 1',
      to: 'Ссылка 1',
      ico: synergyRu('content/faculties/icons7_small/gostepriimstvo.svg'),
    },
    {
      title: 'Статья 2',
      to: 'Ссылка 2',
      ico: synergyRu('content/faculties/icons7_small/ekonomika.svg'),
    },
    {
      title: 'Статья 1',
      to: 'Ссылка 1',
      ico: synergyRu('content/faculties/icons7_small/gostepriimstvo.svg'),
    },
    {
      title: 'Статья 2',
      to: 'Ссылка 2',
      ico: synergyRu('content/faculties/icons7_small/ekonomika.svg'),
    },
  ],
};
