import SArticleSpecialities from './SArticleSpecialities.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Sections/Articles/SArticleSpecialities',
  component: SArticleSpecialities,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleSpecialities },
  setup() {
    return { args };
  },
  template: '<s-article-specialities v-bind="args" />',
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
  ],
};
