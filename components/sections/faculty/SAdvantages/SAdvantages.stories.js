import SAdvantages from './SAdvantages.vue';

export default {
  title: 'Sections/SAdvantages',
  component: SAdvantages,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAdvantages },
  setup() {
    return { args };
  },
  template: '<s-advantages v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  hasEntity: true,
  entity: {
    custom_field_values: [
      {
        popular: true,
      },
      {
        benefits_learning: [
          {
            title: 'Подготовка',
            text: 'с ориентацией на практику',
          },
          {
            title: 'Занятия',
            text: 'в частных и государственных клиниках Москвы',
          },
          {
            title: 'Оборудование',
            text: 'новое и современное',
          },
          {
            title: 'Преподаватели',
            text: 'действующие врачи, провизоры и психологи',
          },
          {
            title: 'Трудоустройство',
            text: 'в клиники-партнеры Университета',
          },
        ],
      },
      {
        free_education: false,
      },
    ],
  },
};
