import SCredit from './SCredit.vue';

export default {
  title: 'Sections/SCredit',
  component: SCredit,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCredit },
  setup() {
    return { args };
  },
  template: '<s-credit v-bind="args"/>',
});


export const Default = Template.bind({});
