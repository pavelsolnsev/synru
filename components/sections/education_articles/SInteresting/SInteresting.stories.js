import SInteresting from './SInteresting.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/Articles/SInteresting',
  component: SInteresting,
  argTypes: {},
};

const Template = (args) => ({
  components: { SInteresting },
  setup() {
    return { args };
  },
  template: '<SInteresting v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок',
  items: [
    {
      title: 'Элемент 1',
      text: 'Текст 1',
      image: synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
    },
    {
      title: 'Элемент 2',
      text: 'Текст 2',
      image: synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
    },
  ],
};
