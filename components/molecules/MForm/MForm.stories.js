import MForm from './MForm.vue';

export default {
  title: 'Molecules/MForm',
  component: MForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { MForm },
  setup() {
    return { args };
  },
  template: '<MForm v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

export const Subtitle = Template.bind({});
Subtitle.args = {
  title: 'Заголовок формы',
  subtitle: 'Подзаголовок формы',
};

export const WithEmail = Template.bind({});
WithEmail.args = {
  formMail: 'true',
};
