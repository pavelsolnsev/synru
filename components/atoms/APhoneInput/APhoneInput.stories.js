import APhoneInput from './APhoneInput.vue';

export default {
  title: 'Atoms/APhoneInput',
  component: APhoneInput,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { APhoneInput },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: '<a-phone-input v-model="value" v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};
