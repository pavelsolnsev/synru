export const FORM_FIELDS = [
  {
    name: 'name',
    component: 'AInput',
    placeholder: 'Имя',
    attributes: {
      inputmode: 'text',
    },
  },
  {
    name: 'phone',
    component: 'APhoneInput',
    placeholder: 'Телефон',
    attributes: {
      inputmode: 'tel',
    },
  },
  {
    name: 'feedback-status',
    component: 'ASelect',
    placeholder: 'Статус',
    options: ['Абитуриент', 'Студент', 'Родитель', 'Соискатель', 'Сотрудник'],
    attributes: {
      autofocus: true,
    },
  },
  {
    name: 'feedback-filial',
    component: 'ASelect',
    placeholder: 'Филиал',
    classname: 'feedback-filial__regions',
    attributes: {
      autofocus: true,
      name: 'feedback-filial',
    },
  },
  {
    name: 'feedback-type',
    component: 'ASelect',
    placeholder: 'Тип обращения',
    options: ['Вопрос', 'Предложение', 'Благодарность', 'Жалоба'],
    attributes: {
      autofocus: true,
    },
  },
  {
    name: 'feedback-theme',
    component: 'ASelect',
    placeholder: 'Тема обращения',
    options: ['Поступление', 'Трудоустройство', 'Обучение', 'Оплата', 'Кадровый резерв', 'Внеучебная деятельность', 'Работа автоматических сервисов университета'],
    attributes: {
      autofocus: true,
    },
  },
  {
    name: 'feedback-text',
    component: 'ATextarea',
    placeholder: 'Напишите ваше обращение',
    attributes: {
      inputmode: 'text',
    },
  },
];
