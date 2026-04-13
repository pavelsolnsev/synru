import ANum from './ANum.vue';

export default {
  title: 'Atoms/ANum',
  component: ANum,
  argTypes: {
    num: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => ({
  components: { ANum },
  setup() {
    return { args };
  },
  template: '<a-num v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = { num: '1' };

export const Medium = Template.bind({});
Medium.args = { num: '02', classes: 'a-num--md' };
