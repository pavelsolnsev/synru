import MFormNameEmail from './MFormNameEmail.vue';

export default {
  title: 'Molecules/MFormNameEmail',
  component: MFormNameEmail,
  argTypes: {},
};

const Template = (args) => ({
  components: { MForm },
  setup() {
    return { args };
  },
  template: '<MFormNameEmail v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

export const Subtitle = Template.bind({});
Subtitle.args = {
  title: 'Заголовок формы',
  subtitle: 'Подзаголовок формы',
};

export const WithEmail = Template.bind({});
