import SMainAboutUniversity from './SMainAboutUniversity.vue';

export default {
  title: 'Sections/SMainAboutUniversity',
  component: SMainAboutUniversity,
  argTypes: {},
};

const Template = (args) => ({
  components: { SMainAboutUniversity },
  setup() {
    return { args };
  },
  template: '<s-main-about-university v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  items:[
    { text:'43&nbsp;факультета разных направлений' },
    { text:'Наличие бюджетных мест' },
    { text:'Трудоустройство студентов и&nbsp;выпускников' },
    { text:'Программы переподготовки и&nbsp;смена специальности' },
    { text:'Упор на&nbsp;практику и&nbsp;погружение в&nbsp;профессию' },
    { text:'Cтарт обучения на&nbsp;любом этапе' },
  ],
};
