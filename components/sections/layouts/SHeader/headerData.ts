import { ROUTES } from '~/constants';
import type { MenuLink } from '~/types';

const sveden = {
  to: ROUTES.OFFICIAL,
  text: 'Сведения об&nbsp;образовательной организации',
  external: true,
};

const topMenu: MenuLink[] = [
  {
    title: 'Приёмная комиссия',
    to: ROUTES.ADMISSION_COMMITTEE,
    textColor: 'red',
  },
  {
    title: 'Абитуриентам',
    to: ROUTES.ABITURIENTAM,
  },
  {
    title: 'Факультеты',
    to: ROUTES.FACULTIES,
  },
  {
    title: 'Специальности',
    to: ROUTES.SPECIALTIES,
  },
  {
    title: 'Об&nbsp;Университете',
    to: ROUTES.ABOUT_UNIVERSITY,
  },
];

const topMenu2: MenuLink[] = [
  {
    title: 'Приёмная комиссия',
    to: ROUTES.ADMISSION_COMMITTEE,
    textColor: 'red',
    attributes: {
      class: '--priemnaya-komissiya',
    },
  },
  {
    title: 'Абитуриентам',
    to: ROUTES.ABITURIENTAM,
    attributes: {
      class: '--hide-on-open',
    },
  },
  {
    title: 'Факультеты',
    to: ROUTES.FACULTIES,
    attributes: {
      class: '--hide-on-open',
    },
  },
  {
    title: 'Специальности',
    to: ROUTES.SPECIALTIES,
    attributes: {
      class: '--hide-on-open',
    },
  },
  {
    title: 'Школа',
    to: ROUTES.SCHOOL,
  },
  {
    title: 'Колледж',
    to: ROUTES.COLLEGE,
  },
  {
    title: 'Бакалавриат',
    to: ROUTES.BACCALAUREATE,
  },
  {
    title: 'Специалитет',
    to: ROUTES.SPECIALTY,
  },
  {
    title: 'Магистратура',
    to: ROUTES.MAGISTRACY,
  },
  {
    title: 'Второе высшее',
    to: ROUTES.SECOND_HIGHEST,
  },
  {
    title: 'Аспирантура',
    to: ROUTES.POSTGRADUATE_STUDY,
  },
  {
    title: 'Ординатура',
    to: ROUTES.ORDINATURA,
  },
  {
    title: 'MBA',
    to: ROUTES.BUSINESS_EDUCATION,
  },
  {
    title: 'Курсы',
    to: ROUTES.COURSES,
  },
  {
    title: 'Студентам',
    to: ROUTES.STUDENTS,
  },
  {
    title: 'Трудоустройство',
    to: ROUTES.JOB,
  },
  {
    title: 'Медиа',
    to: ROUTES.ARTICLES,
  },
];

export {
  sveden,
  topMenu,
  topMenu2,
};

