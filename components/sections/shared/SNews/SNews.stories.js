import SNews from './SNews.vue';

export default {
  title: 'Sections/SNews',
  component: SNews,
  argTypes: {},
};

const Template = (args) => ({
  components: { SNews },
  setup() {
    return { args };
  },
  template: '<SNews v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {};
