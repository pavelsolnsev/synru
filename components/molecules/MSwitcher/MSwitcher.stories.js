import MSwitcher from './MSwitcher.vue';

export default {
  title: 'Molecules/MSwitcher',
  component: MSwitcher,
  argTypes: {},
};

const Template = (args) => ({
  components: { MSwitcher },
  setup() {
    return { args };
  },
  template: '<m-switcher v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items: [{ label: 'От 6 месяцев' }, { label:'До 6 месяцев' }],
};
