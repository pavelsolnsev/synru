import SFooter from './SFooter.vue';
import { vueRouter } from 'storybook-vue3-router';

export default {
  title: 'Sections/SFooter',
  component: SFooter,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFooter },
  setup() {
    return { args };
  },
  template: '<SFooter v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [vueRouter()];
