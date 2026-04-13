export const phonesDef = ['+7 (495) 555-01-23', '8 800 555-35-35'];
export const phoneLink = function(phone) {return phone.replace(/[^+\d]/g, '');};

export const phonesPK = {
  phone: '8 800 555-00-00',
  link: '88005550000',
};


export const email = 'admissions@university.example';


export const contactsAddress = [
  {
    name: 'Офис А',
    text: 'г. Москва, ул. Примерная, д.&nbsp;1',
  },
  {
    name: 'Офис Б',
    text: 'г. Москва, пр-т Демонстрационный, д.&nbsp;10',
  },
];


export const contactsSchedule = [
  {
    name: 'Пн-пт',
    text: '09:00 — 19:00',
  },
  {
    name: 'Сб',
    text: '09:00 — 19:00',
  },
  {
    name: 'Вс',
    text: '09:00 — 17:00',
  },
];


export const levelNav = [
  {
    href: 'javascript:void(0);',
    title: 'Уровни образования',
    classname: '_type-btns',
    childrens: [
      {
        title: 'Колледж',
        href: '/abiturientam/college',
      },
      {
        title: 'Бакалавриат',
        href: '/abiturientam/pervoe_vysshee',
      },
      {
        title: 'Магистратура',
        href: '/abiturientam/magistracy',
      },
      {
        title: 'Второе высшее',
        href: '/abiturientam/second_highest',
      },
      {
        title: 'Специалитет',
        href: '/abiturientam/speczialitet',
      },
      {
        title: 'Аспирантура',
        href: '/abiturientam/postgraduate_study',
      },
      {
        title: 'MBA',
        href: '/biznes_obrazovanie/mba',
      },
      {
        title: 'Курсы',
        href: '/abiturientam/additional_education/',
      },
      {
        title: 'Школа',
        href: '/school',
      },
    ],
  },
];

/** Пусто в демо; задайте NUXT_PUBLIC_LANDER_ENDPOINT при подключении реального бэкенда. */
export const landerBaseURI = typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_LANDER_ENDPOINT
  ? String(import.meta.env.NUXT_PUBLIC_LANDER_ENDPOINT)
  : '';
