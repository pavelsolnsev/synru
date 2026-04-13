import SSchoolGraduates from './SSchoolGraduates.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SSchoolGraduates',
  component: SSchoolGraduates,
  argTypes: {},
};

const Template = (args) => ({
  components: { SSchoolGraduates },
  setup() {
    return { args };
  },
  template:
    '<div><SSchoolGraduates v-bind="args"/></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Каждый год&nbsp;мы <br>выпускаем больше 1000&nbsp;довольных учеников',
  description: 'Наши выпускники поступают на&nbsp;бюджет <br>в&nbsp;ведущие вузы страны',
  tag :'1000+ выпускников',
  buttonText: 'Узнать больше',
  imageLg: synergyApi('uploads/content/school/s-school-graduates-lg.webp'),
  imageMd: synergyApi('uploads/content/school/s-school-graduates-md.webp'),
  imageSm: synergyApi('uploads/content/school/s-school-graduates-sm.webp'),
};
