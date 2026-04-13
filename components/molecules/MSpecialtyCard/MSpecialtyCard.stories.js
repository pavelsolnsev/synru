import MSpecialtyCard from './MSpecialtyCard.vue';
import { synergyApi, synergyRu } from '~/utils/mediaCdn';

export default {
  title: 'Molecules/MSpecialtyCard',
  component: MSpecialtyCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { MSpecialtyCard },
  setup() {
    return { args };
  },
  template: '<m-specialty-card v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  level: 'Бакалавриат',
  faculty: 'Программирование',
  isNew: true,
  name: 'Fullstack-разработчик',
  link: '/',
  place: 'Место',
  isPartner: true,
  isShowEnroll: true,
  price: '300р',
};

export const Presentation = Template.bind({});
Presentation.args = {
  level: 'Колледж',
  faculty: 'Информационные технологии',
  name: 'Специалист по&nbsp;информационным системам',
  link: 'https://example.com/abiturientam/programmyi_obucheniya/isit_college',
  presentationLink: synergyRu('presentations/it.pdf'),
};
