import SProgramWhatStudy from './SProgramWhatStudy.vue';

export default {
  title: 'Sections/SProgramWhatStudy',
  component: SProgramWhatStudy,
  argTypes: {},
};

const Template = (args) => ({
  components: { SProgramWhatStudy },
  setup() {
    return { args };
  },
  template: '<s-program-what-study v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  entity: {
    custom_field_values: [
      {
        'what_learn': [
          {
            'title': 'Устройство и функционирование информационной системы',
            'text': '<ul>\n<li>Автоматизированные информационные системы в&nbsp;управлении производством и&nbsp;бизнесом</li>\n<li>Методы проектирования информационной системы</li>\n<li>Технологии проектирования информационной системы</li>\n</ul>',
          },
          {
            'title': 'Арт-менеджмент',
            'text': '<ul>\n<li><span>Менеджмент в&nbsp;искусстве </span></li>\n<li><span>Продажи в&nbsp;искусстве </span></li>\n<li><span>Организация проектной деятельности в&nbsp;арт-бизнесе </span></li>\n<li><span>Экспозиционная и&nbsp;выставочная деятельность </span></li>\n<li><span>Креативное партнерство: арт-коллаборации</span></li>\n</ul>',
          },
          {
            'title': 'Арт-критика',
            'text': '<ul>\n<li><span>Основы рецензирования </span></li>\n<li><span>Музееведение </span></li>\n<li><span>История зарубежного искусства </span></li>\n<li><span>Критика и&nbsp;журналистика в&nbsp;сфере искусства и&nbsp;культуры </span></li>\n<li><span>Редакторская деятельность в&nbsp;сфере искусств</span></li>\n</ul>',
          },
          {
            'title': 'Общие дисциплины',
            'text': '<ul>\n<li><span>Экспозиционная и&nbsp;выставочная деятельность </span></li>\n<li><span>Брендинг и&nbsp;современные маркетинговые технологии в&nbsp;арт-бизнесе </span></li>\n<li><span>Теория и&nbsp;методология истории искусства и&nbsp;мировой художественной культуры </span></li>\n<li><span>Куратор и&nbsp;его роль в&nbsp;современном искусстве </span></li>\n<li><span>Ценообразование в&nbsp;сфере искусств </span></li>\n<li><span>Основы государственной культурной политики</span></li>\n</ul>',
          },
        ],
      },
    ],
  },
};
