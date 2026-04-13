import MLevelNav from './MLevelNav.vue';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Molecules/MLevelNav',
  component: MLevelNav,
  argTypes: {},
};

const Template = (args) => ({
  components: { MLevelNav },
  setup() {
    return { args };
  },
  template: '<m-level-nav v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: 'Приёмная комиссия 2024',
      to: '/abiturientam/priemnaya_komissiya',
      textColor: 'red',
    },
    {
      title: 'Колледж',
      to: '/abiturientam/college',
    },
    {
      title: 'Бакалавриат',
      to: '/abiturientam/pervoe_vysshee',
    },
    {
      title: 'Магистратура',
      to: '/abiturientam/magistracy',
    },
    {
      title: 'Второе высшее',
      to: '/abiturientam/second_highest',
    },
    {
      title: 'Специалитет',
      to: '/abiturientam/speczialitet',
    },
    {
      title: 'Аспирантура',
      to: '/abiturientam/postgraduate_study',
    },
    {
      title: 'MBA',
      to: '/mba',
    },
    {
      title: 'Профессии',
      to: '/professions',
    },
    {
      title: 'Курсы',
      to: '/abiturientam/additional_education',
    },
    {
      title: 'Школа',
      to: '/school',
    },
  ],
};

Default.decorators = [
  vueRouter(),
];
