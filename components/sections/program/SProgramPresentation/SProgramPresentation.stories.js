import SProgramPresentation from './SProgramPresentation.vue';

export default {
  title: 'Sections/SProgramPresentation',
  component: SProgramPresentation,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramPresentation },
  setup() {
    return { args };
  },
  template: '<s-program-presentation v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    id: 31,
  },
};
