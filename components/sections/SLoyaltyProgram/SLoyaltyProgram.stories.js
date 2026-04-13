import SLoyaltyProgram from './SLoyaltyProgram.vue';

export default {
  title: 'sections/SLoyaltyProgram',
  component: SLoyaltyProgram,
  argTypes: {},
};

const Template = (args) => ({
  components: { SLoyaltyProgram },
  setup() {
    return { args };
  },
  template:
    '<div><SLoyaltyProgram v-bind="args"/></div>',
});

export const Default = Template.bind({});

