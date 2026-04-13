import MCardList from './MCardList.vue';

export default {
  title: 'Molecules/MCardList',
  component: MCardList,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    subtitle: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  components: { MCardList },
  setup() {
    return { args };
  },
  template: '<m-card-list v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Механизмы развития заболевания',
  subtitle: 'Подзаголовок',
  list:`<ul>
        <li>Анатомия человека</li>
        <li>Нормальная физиология'</li>
        <li>Биохимия'</li>
        </ul>
  `,
};
