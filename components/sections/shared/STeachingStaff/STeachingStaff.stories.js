import STeachingStaff from './STeachingStaff.vue';

export default {
  title: 'Sections/STeachingStaff',
  component: STeachingStaff,
  argTypes: {},
};

const Template = (args) => ({
  components: { STeachingStaff },
  setup() {
    return { args };
  },
  template: '<s-teaching-staff v-bind="args"/>',
});


export const Default = Template.bind({});
Default.args = {};
