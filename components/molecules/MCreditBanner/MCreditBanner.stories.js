import MCreditBanner from './MCreditBanner.vue';

export default {
  title: 'Molecules/MCreditBanner',
  component: MCreditBanner,
  argTypes: {},
};

const Template = (args) => ({
  components: { MCreditBanner },
  setup() {
    return { args };
  },
  template: '<MCreditBanner v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок Кредитного Баннера',
  img: '/assets/images/s-university/talisman-sm.webp',
  imgLg: '/assets/images/s-university/talisman-lg.webp',
  imgMd: '/assets/images/s-university/talisman-md.webp',
  subtitle: 'Подзаголовок',
  btnText: 'Мне интересно',
  tags: ['Тег 1', 'Тег 2'],
};
