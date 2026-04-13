import AStandAloneSelect from './AStandAloneSelect.vue';

export default {
  title: 'Atoms/AStandAloneSelect',
  component: AStandAloneSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { AStandAloneSelect },
  setup() {
    const value = ref('');
    return { args, value };
  },
  template: '<AStandAloneSelect v-model="value" v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {
  options: ['One', 'Two', 'Three'],
};
export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Choose number',
  options: ['One', 'Two', 'Three'],
};
