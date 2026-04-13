import SArticleQuote from './SArticleQuote.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Sections/Articles/SArticleQuote',
  component: SArticleQuote,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleQuote },
  setup() {
    return { args };
  },
  template: '<SArticleQuote v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  image: synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
  name: 'Алина Фролова',
  description: 'Региональный директор компании TOGAS',
  text: 'Можно смело утверждать, что начавшаяся почти два года назад пандемия превратилась в «праздник, который всегда с тобой». На фоне локальных успехов в борьбе с новой инфекцией до стабилизации, не говоря уж о победе, пока далеко. ',
};
