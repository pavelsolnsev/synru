import MTeachersSlider from './MTeachersSlider.vue';
import MTeacherCardImage from '~/assets/images/m_teacher_card/teacher_card_test.webp';
import MTeacherCard2Image from '~/assets/images/m_teacher_card/teacher_card_test2.webp';
import MTeacherCard3Image from '~/assets/images/m_teacher_card/teacher_card_test3.webp';

export default {
  title: 'Molecules/MTeachersSlider',
  component: MTeachersSlider,
  argTypes: {},
};

const Template = (args) => ({
  components: { MTeachersSlider },
  setup() {
    return { args };
  },
  template: '<m-teachers-slider v-bind="args" />',
});

const teachers = [
  {
    teacherId: 0,
    image: MTeacherCardImage,
    name: 'Кухаренко Олеся Геннадьевна',
    position: '<ul><li>Декан факультета Экономики</li><li>Декан факультета Менеджмента</li><li>Кандидат экономических наук, доцент, магистр по направлению подготовки «Менеджмент»</li><li>Стажировки по программам Taft University (Бостон, США), «Corporate Strategy» VYSOKA SKOLA TECHICKA A ECONOMICKA (Чешская Республика), «Financial Management» The University of Economics in Bratislava (Словацкая Республика)</li><li>Автор более 90 научных и учебно-методических трудов</li></ul>',
    text: '<ul><li>Декан факультета Экономики</li><li>Декан факультета Менеджмента</li><li>Кандидат экономических наук, доцент, магистр по направлению подготовки «Менеджмент»</li><li>Стажировки по программам Taft University (Бостон, США), «Corporate Strategy» VYSOKA SKOLA TECHICKA A ECONOMICKA (Чешская Республика), «Financial Management» The University of Economics in Bratislava (Словацкая Республика)</li><li>Автор более 90 научных и учебно-методических трудов</li></ul>',
  },
  {
    teacherId: 1,
    image: MTeacherCard2Image,
    name: 'Малыгин Андрей Вадимович',
    position: '<ul><li>Заведующий кафедрой спортивного маркетинга</li><li>Кандидат экономических наук, доцент</li><li>Руководитель Школы спортивного маркетинга</li></ul>',
    text: '<ul><li>Заведующий кафедрой спортивного маркетинга</li><li>Кандидат экономических наук, доцент</li><li>Руководитель Школы спортивного маркетинга</li></ul>',
  },
  {
    teacherId: 2,
    image: MTeacherCard3Image,
    name: 'Позина Марина Борисовна',
    position: '<ul><li>Заведующая кафедрой психологии</li><li>Кандидат психологических наук, доцент</li><li>Сертифицированный профконсультант</li><li>Почетный работник сферы образования Российской Федерации</li>',
    text: '<ul><li>Заведующая кафедрой психологии</li><li>Кандидат психологических наук, доцент</li><li>Сертифицированный профконсультант</li><li>Почетный работник сферы образования Российской Федерации</li>',
  },
];

export const Default = Template.bind({});
Default.args = {
  teachers,
};
