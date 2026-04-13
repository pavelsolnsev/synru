import SCreditCost from './SCreditCost.vue';

export default {
  title: 'Sections/SCreditCost',
  component: SCreditCost,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCreditCost },
  setup() {
    return { args };
  },
  template: '<SCreditCost v-bind="args" />',
});


export const Default = Template.bind({});
Default.args = {
  title: 'Стоимость образовательного кредита',
};

