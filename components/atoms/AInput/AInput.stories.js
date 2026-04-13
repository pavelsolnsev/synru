import AInput from './AInput.vue';

export default {
  title: 'Atoms/AInput',
  component: AInput,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { AInput },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: '<a-input v-model="value" v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = { placeholder: 'Default Input' };
