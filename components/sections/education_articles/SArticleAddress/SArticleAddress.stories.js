import SArticleAddress from './SArticleAddress.vue';

export default {
  title: 'Sections/Articles/SArticleAddress',
  component: SArticleAddress,
  argTypes: {},
};

const Template = (args) => ({
  components: { SArticleAddress },
  setup() {
    return { args };
  },
  template: '<s-article-address v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
