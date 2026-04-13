import SStudentLife from './SStudentLife.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SStudentLife',
  component: SStudentLife,
  argTypes: {},
};

const Template = (args) => ({
  components: { SStudentLife },
  setup() {
    return { args };
  },
  template:
    '<div><SStudentLife v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  studentLifeItems: [
    {
      image: synergyApi('uploads/content/s-student-life/01.jpeg'),
    },
    {
      image: synergyApi('uploads/content/s-student-life/02.jpeg'),
    },
    {
      image: synergyApi('uploads/content/s-student-life/03.jpeg'),
    },
    {
      image: synergyApi('uploads/content/s-student-life/04.jpeg'),
    },
    {
      image: synergyApi('uploads/content/s-student-life/05.jpeg'),
    },
    {
      image: synergyApi('uploads/content/s-student-life/06.jpeg'),
    },
    {
      image: synergyApi('uploads/content/s-student-life/07.jpeg'),
    },
  ],
};
