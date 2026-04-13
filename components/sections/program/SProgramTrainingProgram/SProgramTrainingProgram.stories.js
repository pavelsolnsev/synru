import SProgramTrainingProgram from './SProgramTrainingProgram.vue';

export default {
  title: 'Sections/SProgramTrainingProgram',
  component: SProgramTrainingProgram,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramTrainingProgram },
  setup() {
    return { args };
  },
  template: '<s-program-training-program v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    customFields: {
      'learning_program': [
        {
          'title': '1 курс',
          'duration': null,
          'description': '<ol><li>Программное обеспечение для управления проектами в арт-бизнесе</li><li>Музееведение</li><li>Художественная критика как часть современного искусства</li><li>Иностранный язык в профессиональной деятельности</li><li>Цифровая трансформация</li></ol>',
        },
        {
          'title': '2 курс',
          'duration': null,
          'description': '<ol><li>Теория и методология истории искусства и мировой художественной культуры</li><li>Иностранный язык в профессиональной деятельности</li><li>Организация проектной деятельности в арт-бизнесе</li><li>История зарубежного искусства</li><li>Управление проектами</li></ol>',
        },
      ],
    },
  },
};
