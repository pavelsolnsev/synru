import MTeacherCard from './MTeacherCard.vue';
import MTeacherCardImage from '~/assets/images/m_teacher_card/teacher_card_test.webp';


export default {
  title: 'Molecules/MTeacherCard',
  component: MTeacherCard,
  argTypes: {},
};

const Template = (args) => ({
  components: { MTeacherCard },
  setup() {
    return { args };
  },
  template: '<m-teacher-card v-bind="args" />',
});

const position = '<ul><li>Декан факультета Экономики</li><li>Декан факультета Менеджмента</li><li>Кандидат экономических наук, доцент, магистр по направлению подготовки «Менеджмент»</li><li>Стажировки по программам Taft University (Бостон, США), «Corporate Strategy» VYSOKA SKOLA TECHICKA A ECONOMICKA (Чешская Республика), «Financial Management» The University of Economics in Bratislava (Словацкая Республика)</li><li>Автор более 90 научных и учебно-методических трудов</li></ul>';

export const Default = Template.bind({});
Default.args = {
  image: MTeacherCardImage,
  name: 'Кухаренко Олеся Геннадьевна',
  position,
  text: position,
};
