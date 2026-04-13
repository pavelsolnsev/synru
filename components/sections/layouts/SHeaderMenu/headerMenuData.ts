import { ROUTES } from '~/constants';
import type { AccordionItem } from '~/types';

const chapters = [
  {
    href: ROUTES.ABITURIENTAM,
    text: 'Абитуриентам',
  },
  {
    href: ROUTES.FACULTIES,
    text: 'Факультеты',
  },
  {
    href: ROUTES.ABOUT_UNIVERSITY,
    text: 'Об Университете',
  },
  {
    href: ROUTES.STUDENTS,
    text: 'Студентам',
  },
];

const navToggledFaculties: AccordionItem[] = [
  {
    title: {
      href: ROUTES.ABITURIENTAM,
      text: 'Абитуриентам',
      className: 'a-font_m-m',
    },
    isOpen: false,
    icon: 'new-chevron-down',
    itemKey: ROUTES.ABITURIENTAM,
    customContent: [
      {
        href: ROUTES.SPECIALTIES,
        text: 'Специальности',
      },
      {
        href: ROUTES.COURSES,
        text: 'Курсы',
      },
      {
        href: '/abiturientam/zarubezhnoe_obrazovanie',
        text: 'Образование за рубежом',
      },
      {
        href: ROUTES.FACULTIES,
        text: 'Факультеты',
      },
      {
        href: ROUTES.ADMISSION_COMMITTEE,
        text: `Приёмная комиссия ${new Date().getFullYear()}`,
      },
      {
        href: ROUTES.FILIALS,
        text: 'Адреса приёмной комиссии',
      },
      {
        href: ROUTES.CREDIT,
        text: 'Кредит на образование',
      },
      {
        href: ROUTES.POGRUZHENIE_V_PROFESSIYU,
        text: 'Практика и погружение в профессию',
      },
      {
        href: '/abiturientam/perevod_iz_drugogo_vuza',
        text: 'Перевод из&nbsp;другого вуза',
        external: true,
      },
      {
        href: ROUTES.LK_REGISTRATION,
        text: 'Личный кабинет',
        target: '_blank',
        external: true,
      },
      {
        href: '/abiturientam/faq',
        text: 'Часто задаваемые вопросы',
        external: true,
      },
      {
        href: ROUTES.FRANCHISES,
        text: 'Франшизы',
      },
    ],
  },
  {
    title: {
      text: 'Факультеты',
      href: ROUTES.FACULTIES,
      className: 'a-font_m-m',
    },
    itemKey: ROUTES.FACULTIES,
    isOpen: false,
    icon: 'new-chevron-down',
    customContent: [
      {
        href: '/abiturientam/faculties/yuridicheskij',
        text: 'Юриспруденция',
      },
      {
        href: '/abiturientam/faculties/it',
        text: 'Информационные технологии',
      },
      {
        href: '/abiturientam/faculties/upravleniya',
        text: 'Менеджмент ',
      },
      {
        href: '/abiturientam/faculties/psychology',
        text: 'Психология',
      },
      {
        href: '/abiturientam/faculties/business',
        text: 'Бизнес',
      },
      {
        href: '/abiturientam/faculties/economic',
        text: 'Экономика',
      },
      {
        href: '/abiturientam/faculties/pedagogika',
        text: 'Педагогика',
      },
      {
        href: '/abiturientam/faculties/medicine',
        text: 'Медицина',
      },
      {
        href: '/abiturientam/faculties/design',
        text: 'Дизайн',
      },
      {
        href: '/abiturientam/faculties/fakultet_kiberbezopasnosti',
        text: 'Кибербезопасность',
      },
      {
        href: '/abiturientam/faculties/fakultet_logistiki',
        text: 'Логистика',
      },
      {
        href: '/abiturientam/faculties/fakultet_mezhdunarodnogo_biznesa',
        text: 'Международный бизнес  ',
      },
      {
        href: '/abiturientam/faculties/fakultet_komiksov',
        text: 'Комиксы',
      },
      {
        href: '/abiturientam/faculties/cybersport',
        text: 'Игровая индустрия и киберспорт',
      },
      {
        href: '/abiturientam/faculties/sportmanager',
        text: 'Спорт',
      },
      {
        href: '/abiturientam/faculties/fakultet_sovremennoj_muzyiki',
        text: 'Музыкальная индустрия',
      },
      {
        href: '/abiturientam/faculties/animation',
        text: 'Анимация',
      },
      {
        href: '/abiturientam/faculties/upravlenie_v_texnicheskix_sistemax',
        text: 'Управление в технических системах',
      },
      {
        href: '/abiturientam/faculties/linguist',
        text: 'Лингвистика',
      },
      {
        href: '/abiturientam/faculties/pr',
        text: 'Реклама',
      },
      {
        href: '/abiturientam/faculties/fakultet_kino_i_media',
        text: 'Кино и телевидение',
      },
      {
        href: '/abiturientam/faculties/teploenergetika_i_teplotexnika',
        text: 'Теплоэнергетика и теплотехника',
      },
      {
        href: '/abiturientam/faculties/programmirovanie',
        text: 'Программирование',
      },
      {
        href: '/abiturientam/faculties/fakultet_mezhdunarodnyix_otnoshenij',
        text: 'Международные отношения',
      },
      {
        href: '/abiturientam/faculties/gosudarstvennoe_i_municzipalnoe_upravlenie',
        text: 'Государственное и муниципальное управление',
      },
      {
        href: '/abiturientam/faculties/stroitelstvo',
        text: 'Строительство',
      },
      {
        href: '/abiturientam/faculties/restoranbusines',
        text: 'Туризм и индустрия гостеприимства',
      },
      {
        href: '/abiturientam/faculties/mediakommunikaczii',
        text: 'Медиа',
      },
      {
        href: '/abiturientam/faculties/interneta',
        text: 'Интернет-профессии',
      },
      {
        href: '/abiturientam/faculties/texnosfernaya_bezopasnost',
        text: 'Техносферная безопасность',
      },
      {
        href: '/abiturientam/faculties/gejmdizajn_i_razrabotka_mobilnyix_igr',
        text: 'Геймдизайн и разработка игр',
      },
      {
        href: '/abiturientam/faculties/fakultet_blokchejna_i_kriptovalyut',
        text: 'Блокчейн и криптовалюта',
      },
      {
        href: '/abiturientam/faculties/elektroenergetika_i_elektrotexnika',
        text: 'Электроэнергетика и электротехника',
      },
      { href: '/abiturientam/faculties/artacademy',
        text: 'Арт',
      },
      {
        href: '/abiturientam/faculties/politologiya',
        text: 'Политология',
      },
      {
        href: '/abiturientam/faculties/inzenernyi_fakultet',
        text: 'Инженерия',
      },
      {
        href: '/abiturientam/faculties/community_management',
        text: 'Комьюнити-менеджмент',
      },
      {
        href: '/abiturientam/faculties/teatralnyi',
        text: 'Театральный факультет',
      },
      {
        href: '/abiturientam/faculties/bankovskogo_dela',
        text: 'Банковское дело',
      },
      {
        href: '/abiturientam/faculties/tech',
        text: 'Технологическое предпринимательство',
      },
      {
        href: '/abiturientam/faculties/fakultet_e_commerce',
        text: 'E-commerce',
      },
      {

        href: '/abiturientam/faculties/fakultet_iskusstvennogo_intellekta',
        text: 'Искусственный интеллект',
      },
    ],
  },
  {
    title: {
      href: ROUTES.ABOUT_UNIVERSITY,
      text: 'Об Университете',
      className: 'a-font_m-m',
    },
    isOpen: false,
    icon: 'new-chevron-down',
    itemKey: ROUTES.ABOUT_UNIVERSITY,
    customContent: [
      {
        href: '/edu',
        text: 'ЕГЭ и ОГЭ',
        external: true,
      },
      {
        href: '/about/uchenyij_sovet',
        text: 'Учёный совет',
        external: true,
      },
      {
        href: '/presscenter',
        text: 'Медиацентр',
        external: true,
      },
      {
        href: '/about/raitings',
        text: 'Демо-вуз в рейтингах',
        external: true,
      },
      {
        href: '/yuridicheskaya_klinika',
        text: 'Юридическая клиника',
        external: true,
      },
      {
        href: '/about/gallery',
        text: 'Галерея',
        external: true,
      },
      {
        href: ROUTES.REVIEWS,
        text: 'Отзывы',
      },
      {
        href: '/about/history',
        text: 'История Университета',
        external: true,
      },
      {
        href: '/abiturientam/inostrannyim_abiturientam',
        text: 'Иностранным абитуриентам',
      },
      {
        href: '/about/personnel_reserve',
        text: 'Кадровый резерв',
        external: true,
      },
      {
        href: '/about/coordinat',
        text: 'Контакты',
      },
    ],
  },
  {
    title: {
      href: '/students',
      text: 'Студентам',
      className: 'a-font_m-m',
    },
    isOpen: false,
    icon: 'new-chevron-down',
    itemKey: '/students',
    customContent: [
      {
        href: '/students/pay_education',
        text: 'Оплата обучения',
        external: true,
      },
      {
        href: ROUTES.STUDENTS_DEMO_LOYALTY,
        text: 'Программа лояльности (демо)',
      },
      {
        href: ROUTES.LMS,
        text: 'Личный кабинет',
        attr: {
          rel: 'nofollow',
          target: '_blank',
        },
      },
    ],
  },
];

export {
  chapters,
  navToggledFaculties,
};
