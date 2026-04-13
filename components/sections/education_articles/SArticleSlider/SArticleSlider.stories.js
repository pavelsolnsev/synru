import SArticleSlider from './SArticleSlider.vue';

export default {
  title: 'Sections/Articles/SArticleSlider',
  component: SArticleSlider,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleSlider },
  setup() {
    return { args };
  },
  template: '<s-article-slider v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
