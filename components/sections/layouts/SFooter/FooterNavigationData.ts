import { ROUTES } from '~/constants';

interface NavigationLink {
  href: string;
  title: string;
  target?: '_blank';
  external?: boolean;
  attr?: object;
}

interface NavigationSection {
  title: {
    text: string;
    href?: string;
    className?: string;
  };
  isOpen?: boolean;
  children: NavigationLink[];
}

export interface FooterNavigation {
  [key: string]: NavigationSection;
}

export const footerNavigation: FooterNavigation = {
  faculties: {
    title: {
      text: 'Факультеты',
      href: ROUTES.FACULTIES,
      className: 'a-font_h6',
    },
    isOpen: false,
    children: [
      {
        href: '/abiturientam/faculties/medicine',
        title: 'Медицина',
      },
      {
        href: '/abiturientam/faculties/psychology',
        title: 'Психология',
      },
      {
        href: '/abiturientam/faculties/yuridicheskij',
        title: 'Юриспруденция',
      },
      {
        href: '/abiturientam/faculties/programmirovanie',
        title: 'Программирования',
      },
      {
        href: '/abiturientam/faculties/cybersport',
        title: 'Игровая индустрия и киберспорт',
      },
      {
        href: '/abiturientam/faculties/design',
        title: 'Дизайн',
      },
      {
        href: '/abiturientam/faculties/pedagogika',
        title: 'Педагогика',
      },
      {
        href: '/abiturientam/faculties/upravleniya',
        title: 'Менеджмент',
      },
      {
        href: '/abiturientam/faculties/economic',
        title: 'Экономика',
      },
      {
        href: '/abiturientam/faculties/it',
        title: 'Информационные технологии',
      },
    ],
  },
  about: {
    title: {
      text: 'Об Университете',
      href: ROUTES.ABOUT_UNIVERSITY,
      className: 'a-font_h6',
    },
    isOpen: false,
    children: [
      {
        href: '/about/education_articles',
        title: 'Медиа',
        external: true,
      },
      {
        href: '/edu',
        title: 'ЕГЭ и ОГЭ',
        external: true,
      },
      {
        href: '/about/uchenyij_sovet',
        title: 'Учёный совет',
        external: true,
      },
      {
        href: ROUTES.MEDIACENTER,
        title: 'Медиацентр',
        external: true,
      },
      {
        href: '/about/raitings',
        title: 'Демо-вуз в рейтингах',
        external: true,
      },
      {
        href: '/yuridicheskaya_klinika',
        title: 'Юридическая клиника',
        external: true,
      },
      {
        href: '/about/gallery',
        title: 'Галерея',
        external: true,
      },
      {
        href: ROUTES.REVIEWS,
        title: 'Отзывы',
      },
      {
        href: '/about/history',
        title: 'История Университета',
        external: true,
      },
      {
        href: '/abiturientam/inostrannyim_abiturientam',
        title: 'Иностранным абитуриентам',
      },
      {
        href: '/about/personnel_reserve',
        title: 'Кадровый резерв',
        external: true,
      },
      {
        href: ROUTES.CONTACTS,
        title: 'Контакты',
        external: true,
      },
      {
        href: '/about/svedeniya_obyazatelnyie_dlya_publikaczii',
        title: 'Сведения, обязательные для публикации',
        external: true,
      },
      {
        href: ROUTES.FRANCHISES,
        title: 'Франшизы',
      },
    ],
  },
  applicants: {
    title: {
      text: 'Абитуриентам',
      href: ROUTES.ABITURIENTAM,
      className: 'a-font_h6',
    },
    isOpen: false,
    children: [
      {
        href: ROUTES.SPECIALTIES,
        title: 'Специальности',
      },
      {
        href: '/abiturientam/zarubezhnoe_obrazovanie',
        title: 'Образование за рубежом',
      },
      {
        href: ROUTES.COURSES,
        title: 'Курсы',
      },
      {
        href: ROUTES.FACULTIES,
        title: 'Факультеты',
      },
      {
        href: ROUTES.ADMISSION_COMMITTEE,
        title: 'Приёмная комиссия',
      },
      {
        href: ROUTES.CREDIT,
        title: 'Кредит на образование',
      },
      {
        href: ROUTES.POGRUZHENIE_V_PROFESSIYU,
        title: 'Практика и погружение в профессию',
      },
      {
        href: ROUTES.FILIALS,
        title: 'Адреса приёмной комиссии',
      },
      {
        href: '/abiturientam/perevod_iz_drugogo_vuza',
        title: 'Перевод из другого вуза',
        external: true,
      },
      {
        href: ROUTES.LK_REGISTRATION,
        title: 'Личный кабинет',
        external: true,
      },
      {
        href: '/abiturientam/faq',
        title: 'Часто задаваемые вопросы',
        external: true,
      },
    ],
  },
  students: {
    title: {
      text: 'Студентам',
      href: ROUTES.STUDENTS,
      className: 'a-font_h6',
    },
    isOpen: false,
    children: [
      {
        href: ROUTES.PAYMENT_INFO,
        title: 'Оплата обучения',
        external: true,
      },
      {
        href: ROUTES.FRIENDS,
        title: 'Программа лояльности Synergy Friends',
      },
      {
        href: ROUTES.LMS,
        title: 'Личный кабинет',
        target: '_blank',
        attr: {
          rel: 'nofollow',
        },
      },
    ],
  },
};

export const contacts = {
  address: [
    {
      metro: 'Сокол',
      city: 'г.&nbsp;Москва',
      address: 'Ленинградский пр-т, д.&nbsp;80Б, корпуса Г и&nbsp;Ж',
    },
    {
      metro: 'Семёновская',
      city: 'г.&nbsp;Москва',
      address: 'ул. Измайловский Вал, д. 2',
    },
    {
      metro: 'Охотный Ряд',
      city: 'г.&nbsp;Москва',
      address: 'ул. Тверская, д. 4',
    },
    {
      metro: 'ВДНХ',
      city: 'г.&nbsp;Москва',
      address: '2-я Останкинская, д. 3',
    },
  ],
  schedules: [
    { days: 'Пн. — Пт.:', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
    { days: 'Сб.:', dayOfWeek: ['Saturday'], opens: '10:00', closes: '19:00' },
    { days: 'Вс.:', dayOfWeek: ['Sunday'], opens: '10:00', closes: '17:00' },
  ],
  commonPhones: [
    '+7 495 800–10–01',
    '8 800 100–00–11',
  ],
  studentsPhones: ['8 800 350–00–60'],
};
