const email = [
  {
    title: 'По всем вопросам',
    email: 'info@university.example',
  },
  {
    title: 'Приёмная комиссия',
    email: 'admissions@university.example',
  },
  {
    title: 'Для студентов',
    email: 'students@university.example',
  },
  {
    title: 'По вопросам сотрудничества',
    email: 'partners@university.example',
  },
];

const phones = [
  {
    title: 'Приёмная комиссия',
    phones: ['+7 (495) 555-01-23', '8 800 555-35-35'],
  },
  {
    title: 'Для студентов',
    phones: ['8 800 555-00-00'],
  },
  {
    title: 'По любым вопросам',
    phones: ['8 800 555-35-35'],
  },
];

const schedule = [
  {
    day: 'Пн',
    start: '08:30',
    end: '22:00',
  },
  {
    day: 'Вт',
    start: '08:30',
    end: '22:00',
  },
  {
    day: 'Ср',
    start: '08:30',
    end: '22:00',
  },
  {
    day: 'Чт',
    start: '08:30',
    end: '22:00',
  },
  {
    day: 'Пт',
    start: '08:30',
    end: '22:00',
  },
  {
    day: 'Сб',
    start: '10:00',
    end: '17:00',
    class: '--short',
  },
  {
    day: 'Вс',
    start: '10:00',
    end: '17:00',
    class: '--short',
  },
];

export { email, phones, schedule };
