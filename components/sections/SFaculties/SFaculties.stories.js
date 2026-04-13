import SFaculties from './SFaculties.vue';

export default {
  title: 'sections/SFaculties',
  component: SFaculties,
  argTypes: {},
};

const Template = (args) => ({
  components: { SFaculties },
  setup() {
    return { args };
  },
  template:
    '<div><SFaculties v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title:'Факультеты',
};
