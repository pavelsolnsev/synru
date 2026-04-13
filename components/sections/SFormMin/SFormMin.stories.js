import SFormMin from './SFormMin.vue';

export default {
  title: 'sections/SFormMin',
  component: SFormMin,
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['transparent', 'grey_40', 'grey_20', 'grey_10', 'red', 'white'],
    },
  },
};

const Template = (args) => ({
  components: { SFormMin },
  setup() {
    return { args };
  },
  template:
    '<div><SFormMin v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  bgColor: 'red',
  formMail: true,
  title: 'Оставьте заявку на обучение',
  subtitle: 'Заполните форму и наш менеджер свяжется с вами',
  showLogo: true,
};
