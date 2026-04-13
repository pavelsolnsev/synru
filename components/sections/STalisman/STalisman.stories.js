import STalisman from './STalisman.vue';

export default {
  title: 'sections/STalisman',
  component: STalisman,
  argTypes: {},
};

const Template = (args) => ({
  components: { STalisman },
  setup() {
    return { args };
  },
  template:
    '<div><STalisman v-bind="args"/></div>',
});

export const Default = Template.bind({});

