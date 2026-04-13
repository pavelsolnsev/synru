import MBreadcrumbs from './MBreadcrumbs.vue';

export default {
  title: 'Molecules/MBreadcrumbs',
  component: MBreadcrumbs,
  argTypes: {},
};

const Template = (args) => ({
  components: { MBreadcrumbs },
  setup() {
    return { args };
  },
  template: '<MBreadcrumbs v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  breadcrumbs: [
    {
      title: 'Главная',
      link: '/',
    },
    {
      title: 'Абитуриентам',
      link: '/abiturientam',
    },
    {
      title: 'Программы обучения',
      link: '/abiturientam/programs',
    },
  ],
};
