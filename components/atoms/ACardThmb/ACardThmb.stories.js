import ACardThmb from './ACardThmb.vue';

export default {
  title: 'Atoms/ACardThmb',
  component: ACardThmb,
  argTypes: {},
};

const Template = (args) => ({
  components: { ACardThmb },
  setup() {
    return { args };
  },
  template: '<a-card-thmb v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
