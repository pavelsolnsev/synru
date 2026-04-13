import SAdvantagesGrid from './SAdvantagesGrid.vue';

export default {
  title: 'Sections/SAdvantagesGrid',
  component: SAdvantagesGrid,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAdvantagesGrid },
  setup() {
    return { args };
  },
  template: '<s-advantages-grid v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Что вы будете изучать',
  items: [
    { text: 'Химию' },
    { text: 'Изо' },
    { text: 'Черчение' },
    { text: 'Математика' },
    { text: 'Физкультура' },
    { text: 'Алгебра' },
  ],
};
