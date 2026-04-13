import SCenterCareers from './SCenterCareers.vue';

export default {
  title: 'sections/SCenterCareers',
  component: SCenterCareers,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCenterCareers },
  setup() {
    return { args };
  },
  template:
    '<div><SCenterCareers v-bind="args"/></div>',
});

export const Default = Template.bind({});

