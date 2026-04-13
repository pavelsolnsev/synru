import SProgramCareer from './SProgramCareer.vue';

export default {
  title: 'Sections/SProgramCareer',
  component: SProgramCareer,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramCareer },
  setup() {
    return { args };
  },
  template: '<s-program-career v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        'career-trajectory': [
          {
            'title': 'Помощник арт-дилера / арт-менеджера',
            'text': '<ul>\n<li><span>Собственноручное выполнение задач под контролем руководителя</span></li>\n<li><span>Сбор фактуры и&nbsp;первичная аналитика материала</span></li>\n<li><span>Участие в&nbsp;переговорах с&nbsp;коллекционерами; работа с&nbsp;документами, счетами </span></li>\n</ul>',
          },
          {
            'title': 'Арт-дилер / Арт-менеджер',
            'text': '<ul>\n<li><span>Координация команды, постановка задач и&nbsp;контроль исполнения</span></li>\n<li><span>Работа с&nbsp;художниками и&nbsp;коллекционерами</span></li>\n<li><span>Помощь в&nbsp;составлении коллекции и&nbsp;арт-консалтинг</span></li>\n<li><span>Составление стратегии продвижения арт-продукта на&nbsp;рынке</span></li>\n</ul>',
          },
          {
            'title': 'Галерист / Главный куратор',
            'text': '<ul>\n<li><span>Контроль и&nbsp;координация активности проекта</span></li>\n<li><span>Подбор команды</span></li>\n<li><span>Утверждение годового плана мероприятий</span></li>\n<li><span>Контроль финансов</span></li>\n</ul>',
          },
        ],
      },
    ],
  },
};
