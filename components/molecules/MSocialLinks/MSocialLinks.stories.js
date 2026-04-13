import MSocialLinks from './MSocialLinks.vue';

export default {
  title: 'Molecules/MSocialLinks',
  component: MSocialLinks,
  argTypes: {},
};

const Template = (args) => ({
  components: { MSocialLinks },
  setup() {
    return { args };
  },
  template: '<MSocialLinks v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  showTitle: false,
};
