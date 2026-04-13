import SContacts from './SContacts.vue';

export default {
  title: 'Sections/SContacts',
  component: SContacts,
  argTypes: {},
};

const Template = (args) => ({
  components: { SContacts },
  setup() {
    return { args };
  },
  template: '<s-contacts v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
