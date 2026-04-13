import MModalForm from './MModalForm.vue';

export default {
  title: 'Molecules/MModalForm',
  component: MModalForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { MModalForm },
  setup() {
    return { args };
  },
  template: '<MModalForm v-bind="args" style="display: block;"/>',
});

export const Default = Template.bind({});

Default.args = {};
