import SArticlesSlider from './SArticlesSlider.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/Articles/SArticlesSlider',
  component: SArticlesSlider,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticlesSlider },
  setup() {
    return { args };
  },
  template: '<s-articles-slider v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: 'Элемент 1',
      text: 'Текст 1',
      to: 'link',
      tags: [{ text: 'Тег 1' }],
      image: synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
      share: true,
    },
    {
      title: 'Элемент 2',
      text: 'Текст 2',
      to: 'link',
      tags: [{ text: 'Тег 2' }],
      image: synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
      share: true,
    },
  ],
};
