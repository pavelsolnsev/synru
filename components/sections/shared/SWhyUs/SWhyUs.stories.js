import SWhyUs from './SWhyUs.vue';

export default {
  title: 'Sections/SWhyUs',
  component: SWhyUs,
  argTypes: {},
};

const Template = (args) => ({
  components: { SWhyUs },
  setup() {
    return { args };
  },
  template: '<s-why-us v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title:'Кому подойдёт программа',
  items: [
    { title: 'Школьникам' },
    { title: 'Учителям' },
    { title: 'Профессорам' },
    { title: 'Сварщикам' },
    { title: 'Слесарям' },
  ],
};
