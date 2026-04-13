import SArticleBanners from './SArticleBanners.vue';

export default {
  title: 'Sections/Articles/SArticleBanners',
  component: SArticleBanners,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleBanners },
  setup() {
    return { args };
  },
  template: '<SArticleBanners v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
