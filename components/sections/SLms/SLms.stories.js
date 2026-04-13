import SLms from './SLms.vue';

export default {
  title: 'sections/SLms',
  component: SLms,
  argTypes: {},
};

const Template = (args) => ({
  components: { SLms },
  setup() {
    return { args };
  },
  template:
    '<div><SLms v-bind="args"/></div>',
});

export const Default = Template.bind({});
