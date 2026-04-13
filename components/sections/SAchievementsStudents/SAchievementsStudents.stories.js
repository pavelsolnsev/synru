import SAchievementsStudents from './SAchievementsStudents.vue';
import { synergyApi } from '~/utils/mediaCdn';

export default {
  title: 'sections/SAchievementsStudents',
  component: SAchievementsStudents,
  argTypes: {},
};

const Template = (args) => ({
  components: { SAchievementsStudents },
  setup() {
    return { args };
  },
  template:
    '<div><SAchievementsStudents v-bind="args"/></div>',
});

export const Default = Template.bind({});

Default.args = {
  achievements: [{
    image: synergyApi('uploads/content/s-achievements-students/photo.webp'),
    name: 'Илья «m0NESY» Осипов',
    text: 'Игрок команды G2 Esports, попал в список Forbes «30 до 30», IEM Katowice 2022–2 место',
  }, {
    image: synergyApi('uploads/content/s-achievements-students/photo.webp'),
    name: 'Кирилл «Cloud» Нехожин',
    text: 'Игрок европейской организации Giants Gaming по Valorant',
  }, {
    image: synergyApi('uploads/content/s-achievements-students/photo.webp'),
    name: 'Иван «Pure» Москаленко',
    text: 'Игрок команды BetBoom Team по DOTA2, выступал на The International в 2022 г.',
  }, {
    image: synergyApi('uploads/content/s-achievements-students/photo.webp'),
    name: 'Иван «Pure» Москаленко',
    text: 'Игрок команды BetBoom Team по DOTA2, выступал на The International в 2022 г.',
  }, {
    image: synergyApi('uploads/content/s-achievements-students/photo.webp'),
    name: 'Иван «Pure» Москаленко',
    text: 'Игрок команды BetBoom Team по DOTA2, выступал на The International в 2022 г.',
  }],
};
