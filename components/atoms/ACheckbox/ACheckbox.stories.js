import ACheckbox from './ACheckbox.vue';

export default {
  title: 'Atoms/ACheckbox',
  component: ACheckbox,
  argTypes: {},
};

const Template = (args) => ({
  components: { ACheckbox },
  setup() {
    const value1 = ref(true);
    const value2 = ref(false);
    return { args, value1, value2 };
  },
  template: `
  <a-checkbox name="check1" v-model="value1" v-bind="args" label="Value1" value="value1"/>
  <div>&nbsp;</div>
  <a-checkbox name="check2" v-model="value2" v-bind="args" label="Value2" value="value2"/>
  `,
});

export const Default = Template.bind({});
Default.args = {};
