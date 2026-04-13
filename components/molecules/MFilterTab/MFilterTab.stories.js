import MFilterTab from './MFilterTab.vue';

export default {
  title: 'Molecules/MFilterTab',
  component: MFilterTab,
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    active: {
      control: { type: 'boolean' },
    },
  },
};

const Template = (args) => ({
  components: { MFilterTab },
  setup() {
    return { args };
  },
  template: '<m-filter-tab v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Технические',
  icon: 'faculty_1',
};

export const Active = Template.bind({});
Active.args = {
  title: 'Гуманитарные',
  icon: 'faculty_2',
  active: true,
};

