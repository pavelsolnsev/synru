import MFormMin from './MFormMin.vue';

export default {
  title: 'Molecules/MFormMin',
  component: MFormMin,
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['transparent', 'grey_40', 'grey_20', 'grey_10', 'red', 'white'],
    },
  },
};

const Template = (args) => ({
  components: { MFormMin },
  setup() {
    return { args };
  },
  template: '<MFormMin v-bind="args" />',
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

export const Grey40 = Template.bind({});
Grey40.args = {
  bgColor: 'grey_40',
};

export const Grey20 = Template.bind({});
Grey20.args = {
  bgColor: 'grey_20',
};

export const Grey10 = Template.bind({});
Grey10.args = {
  bgColor: 'grey_10',
};

export const White = Template.bind({});
White.args = {
  bgColor: 'white',
};

export const Red = Template.bind({});
Red.args = {
  bgColor: 'red',
};

export const RedWithLogo = Template.bind({});
RedWithLogo.args = {
  bgColor: 'red',
  formMail: true,
  title: 'Оставьте заявку на обучение',
  subtitle: 'Заполните форму и наш менеджер свяжется с вами',
  showLogo: true,
};
