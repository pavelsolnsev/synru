import MTabs from './MTabs.vue';

export default {
  title: 'Molecules/MTabs',
  component: MTabs,
  argTypes: {},
};

const Template = (args) => ({
  components: { MTabs },
  setup() {
    return { args };
  },
  template: '<m-tabs v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [{ label: 'Ректорат' }, { label:'Совет президента' }, { label:'Почётные профессора' }],
};
