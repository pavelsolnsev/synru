import MFormWithEmail from './MFormWithEmail.vue';

export default {
  title: 'Molecules/MFormWithEmail',
  component: MForm,
  argTypes: {},
};

const Template = (args) => ({
  components: { MForm },
  setup() {
    return { args };
  },
  template: '<MFormWithEmail v-bind="args" />',
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
