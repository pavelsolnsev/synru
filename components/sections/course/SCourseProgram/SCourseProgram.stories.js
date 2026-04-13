import SCourseProgram from './SCourseProgram.vue';

export default {
  title: 'Sections/SCourseProgram',
  component: SCourseProgram,
  argTypes: {},
};

const Template = (args) => ({
  components: { SCourseProgram },
  setup() {
    return { args };
  },
  template: '<s-course-program v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        learning_program: [
          {
            'question': 'Основы синтаксиса С++',
            'duration': '133 часа',
          },
          {
            'question': 'Углубленный синтаксис С++',
          },
          {
            'question': 'Математика для программиста',
            'duration': '6 часов',
          },
          {
            'question': 'Система контроля версий Git',
          },
          {
            'question': 'Базы данных',
          },
          {
            'question': 'Библиотека Boost',
          },
          {
            'question': 'Фреймворк QT',
          },
          {
            'question': 'Docker и Linux',
          },
          {
            'question': 'Поиск работы и подготовка портфолио',
          },
          {
            'question': 'Английский для разработчика',
          },
        ],
      },
    ],
  },
};
