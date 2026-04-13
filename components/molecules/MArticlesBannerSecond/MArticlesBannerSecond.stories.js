import MArticlesBannerSecond from './MArticlesBannerSecond.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/Articles/MArticlesBannerSecond',
  component: MArticlesBannerSecond,
  argTypes: {},
};

const Template = (args) => ({
  components: { MArticlesBannerSecond },
  setup() {
    return { args };
  },
  template: '<MArticlesBannerSecond v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  to: '#',
  imageLg: synergyApi('uploads/content/storybook/molecules/m-articles-banner-second/articles_banner_4_lg.webp'),
  imageMd: synergyApi('uploads/content/storybook/molecules/m-articles-banner-second/articles_banner_4_md.webp'),
  imageSm: synergyApi('uploads/content/storybook/molecules/m-articles-banner-second/articles_banner_4_sm.webp'),
};

