import MArticleCardSecond from './MArticleCardSecond.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/Articles/MArticleCardSecond',
  component: MArticleCardSecond,
  argTypes: {},
};

const Template = (args) => ({
  components: { MArticleCardSecond },
  setup() {
    return { args };
  },
  template: '<MArticleCardSecond v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  image: synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
  title:'IT, экология и межотраслевое образование: что определяет профессии будущего',
  textClass:'a-font_xl-m',
  tag:'Магистратура',
  tagClass:'a-font_m',
  date:'26 октября 2024',
  dateClass:'a-font_m',
  share: true,
};

