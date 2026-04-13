import { ROUTES } from '~/constants';
import FormImage1 from '~/assets/images/header/s-expanded-menu/form/form_img1.webp';
import FormImage2 from '~/assets/images/header/s-expanded-menu/form/form_img2.webp';
import FormImage3 from '~/assets/images/header/s-expanded-menu/form/form_img3.webp';

export const menuLinks: MenuLinks[] = [
  {
    title: 'Абитуриентам',
    to: `${ROUTES.ABITURIENTAM}/newdesign`,
    items: [
      [
        {
          title: `Приёмная комиссия ${new Date().getFullYear()}`,
          to: ROUTES.ADMISSION_COMMITTEE,
        },

        {
          title: 'Кредит на образование',
          to: ROUTES.CREDIT,
        },
        {
          title: 'Кредитный калькулятор',
          to: ROUTES.CALCULATOR,
        },
        {
          title: 'Личный кабинет',
          to: ROUTES.LK_REGISTRATION,
        },
      ],
      [
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
      ],
      [
        {
          title: 'Специальности',
          to: ROUTES.SPECIALTIES,
        },

        {
          title: 'Факультеты',
          to: ROUTES.FACULTIES,
        },
        {
          title: 'Образование за&nbsp;рубежом',
          to: ROUTES.ABROAD_EDUCATION,
        },
      ],
      [
        {
          title: 'Адреса приёмной комиссии',
          to: ROUTES.FILIALS,
        },
        {
          title: 'Перевод из&nbsp;другого&nbsp;вуза',
          to: ROUTES.PEREVOD,
          external: true,
        },
        {
          title: 'Часто задаваемые вопросы',
          to: ROUTES.FAQ,
        },
      ],
    ],
    form: {
      id: 1,
      image: FormImage1,
      title: 'Гарантия трудоустройства после обучения',
      description: 'Гарантия трудоустройства по&nbsp;специальности для&nbsp;выпускников колледжа и&nbsp;университета зафиксирована в&nbsp;договоре',
      descriptionClass: '--light',
      btnText: 'Узнать проходной балл',
      formTitle: 'Узнайте минимальный проходной балл и&nbsp;получите <span class="--free-red">бесплатный</span> доступ к&nbsp;началу обучения',
      formBtnText: 'Подать заявку',
      actionParams: [{ param: 'form=garant_trud_top_ab_kruchu' }],
    },
  },
  {
    title: 'Студентам',
    to: ROUTES.STUDENTS,
    items: [
      [
        {
          title: 'Личный кабинет',
          to: ROUTES.LMS,
          external: true,
        },
      ],
      [
        {
          title: 'Оплата обучения',
          to: ROUTES.PAYMENT_INFO,
        },

      ],
      [
        {
          title: 'Программа лояльности Synergy Friends',
          to: ROUTES.FRIENDS,
        },
      ],
      [
        {
          title: 'Телефон для студентов:',
          description: '8 800 350–00–60',
        },
      ],
    ],
    form: {
      image: FormImage3,
      title: 'Программа лояльности <br> Synergy Friends',
      description: 'Рекомендуйте друзьям обучение у&nbsp;нас и&nbsp;получайте вознаграждение в&nbsp;баллах.',
      btnText: 'Узнать подробнее',
      to: ROUTES.FRIENDS,
    },
  },
  {
    title: 'Факультеты',
    to: ROUTES.FACULTIES,
    navMenu: [
      {
        title: 'Технические',
        items: [
          {
            title: 'Программирование',
            to: '/abiturientam/faculties/programmirovanie',
          },
          {
            title: 'Информационные технологии',
            to: '/abiturientam/faculties/it',
          },
          {
            title: 'Инженерия',
            to: '/abiturientam/faculties/inzenernyi_fakultet',
          },
          {
            title: 'Кибербезопасность',
            to: '/abiturientam/faculties/fakultet_kiberbezopasnosti',
          },
          {
            title: 'Искусственный интеллект',
            to: '/abiturientam/faculties/fakultet_iskusstvennogo_intellekta',
          },
          {
            title: 'Интернет-профессии',
            to: '/abiturientam/faculties/interneta',
          },
          {
            title: 'Логистика',
            to: '/abiturientam/faculties/fakultet_logistiki',
          },
          {
            title: 'Строительство',
            to: '/abiturientam/faculties/stroitelstvo',
          },
          {
            title: 'Блокчейн и&nbsp;криптовалюта',
            to: '/abiturientam/faculties/fakultet_blokchejna_i_kriptovalyut',
          },
          {
            title: 'Теплоэнергетика и&nbsp;теплотехника',
            to: '/abiturientam/faculties/teploenergetika_i_teplotexnika',
          },
          {
            title: 'Управление в&nbsp;технических системах',
            to: '/abiturientam/faculties/upravlenie_v_texnicheskix_sistemax',
          },
          {
            title: 'Техносферная безопасность',
            to: '/abiturientam/faculties/texnosfernaya_bezopasnost',
          },
          {
            title: 'Электроэнергетика и&nbsp;электротехника',
            to: '/abiturientam/faculties/elektroenergetika_i_elektrotexnika',
          },
        ],
      },
      {
        title: 'Гуманитарные',
        items: [
          {
            title: 'Государственное и&nbsp;муниципальное управление',
            to: '/abiturientam/faculties/gosudarstvennoe_i_municzipalnoe_upravlenie',
          },
          {
            title: 'Гостеприимство',
            to: '/abiturientam/faculties/restoranbusines',
          },
          {
            title: 'Игровая индустрия и&nbsp;киберспорт',
            to: '/abiturientam/faculties/cybersport',
          },
          {
            title: 'Индустрия спорта',
            to: '/abiturientam/faculties/sportmanager',
          },
          {
            title: 'Комьюнити-менеджмент',
            to: '/abiturientam/faculties/community_management',
          },
          {
            title: 'Лингвистика',
            to: '/abiturientam/faculties/linguist',
          },
          {
            title: 'Логистика',
            to: '/abiturientam/faculties/fakultet_logistiki',
          },
          {
            title: 'Менеджмент',
            to: '/abiturientam/faculties/upravleniya',
          },
          {
            title: 'Международные отношения',
            to: '/abiturientam/faculties/fakultet_mezhdunarodnyix_otnoshenij',
          },
          {
            title: 'Педагогика',
            to: '/abiturientam/faculties/pedagogika',
          },
          {
            title: 'Политология',
            to: '/abiturientam/faculties/politologiya',
          },
          {
            title: 'Психология',
            to: '/abiturientam/faculties/psychology',
          },
          {
            title: 'Технологическое предпринимательство',
            to: '/abiturientam/faculties/tech',
          },
          {
            title: 'Фитнес и&nbsp;культура здоровья',
            to: '/abiturientam/faculties/fakultet_fitnesa_i_kulturyi_zdorovya',
          },
          {
            title: 'Юриспруденция',
            to: '/abiturientam/faculties/yuridicheskij',
          },
        ],
      },
      {
        title: 'Экономические',
        items: [
          {
            title: 'Факультет экономики',
            to: '/abiturientam/faculties/economic',
          },
          {
            title: 'Факультет бизнеса',
            to: '/abiturientam/faculties/business',
          },
          {
            title: 'Факультет банковского дела',
            to: '/abiturientam/faculties/bankovskogo_dela',
          },
          {
            title: 'Факультет международного бизнеса',
            to: '/abiturientam/faculties/fakultet_mezhdunarodnyix_otnoshenij',
          },
          {
            title: 'Факультет e-commerce',
            to: '/abiturientam/faculties/fakultet_e_commerce',
          },
        ],
      },
      {
        title: 'Творческие',
        items: [
          {
            title: 'Арт',
            to: '/abiturientam/faculties/artacademy',
          },
          {
            title: 'Анимация',
            to: '/abiturientam/faculties/animation',
          },
          {
            title: 'Геймдизайн',
            to: '/abiturientam/faculties/gejmdizajn_i_razrabotka_mobilnyix_igr',
          },
          {
            title: 'Дизайн',
            to: '/abiturientam/faculties/design',
          },
          {
            title: 'Кино',
            to: '/abiturientam/faculties/fakultet_kino_i_media',
          },
          {
            title: 'Медиа',
            to: '/abiturientam/faculties/mediakommunikaczii',
          },
          {
            title: 'Музыкальная индустрия',
            to: '/abiturientam/faculties/fakultet_sovremennoj_muzyiki',
          },
          {
            title: 'Театральная школа',
            to: '/abiturientam/faculties/teatralnyi',
          },
          {
            title: 'Факультет комиксов',
            to: '/abiturientam/faculties/fakultet_komiksov',
          },
        ],
      },
      {
        title: 'Медицина',
        to: '/abiturientam/faculties/medicine',
      },
    ],
    form: {
      id: 2,
      image: FormImage2,
      title: 'Узнайте минимальный <br> проходной балл',
      description: 'Оставьте заявку, и&nbsp;специалист приёмной комиссии расскажет о&nbsp;возможностях поступления в&nbsp;2025 году.',
      btnText: 'Узнать проходной балл',
      formTitle: 'Узнайте минимальный проходной балл и&nbsp;получите <span class="--free-red">бесплатный</span>  доступ к&nbsp;началу обучения',
      actionParams: [{ param: 'form=admission_consultation_top_ab_kruchu' }],
    },
  },
  {
    title: 'Курсы',
    to: ROUTES.COURSES,
  },
  {
    title: 'Об Университете',
    to: ROUTES.ABOUT_UNIVERSITY,
    items: [
      [
        {
          title: 'Медиа',
          to: ROUTES.ARTICLES,
          external: true,
        },
        {
          title: 'ЕГЭ и ОГЭ',
          to: ROUTES.EGE_OGE,
          external: true,
        },
        {
          title: 'Медиацентр',
          to: ROUTES.MEDIACENTER,
          external: true,
        },
        {
          title: 'История Университета',
          to: ROUTES.HISTORY,
        },
      ],
      [
        {
          title: 'Демо-вуз в&nbsp;рейтингах',
          to: ROUTES.RATING,
        },
        {
          title: 'Галерея',
          to: ROUTES.GALLERY,
          external: true,
        },
      ],
      [
        {
          title: 'Учёный совет',
          to: ROUTES.UCHENYI_SOVET,
          external: true,
        },
        {
          title: 'Кадровый резерв',
          to: ROUTES.PERSONNEL_RESERVE,
        },
      ],
      [
        {
          title: 'Иностранным абитуриентам',
          to: ROUTES.FOREIGN_APPLICANTS,
        },
        {
          title: 'Юридическая клиника',
          to: ROUTES.UR_CLINIC,
          external: true,
        },
        {
          title: 'Контакты',
          to: ROUTES.CONTACTS,
        },
      ],
    ],
    form: {
      id: 3,
      image: FormImage1,
      title: 'Гарантия трудоустройства после обучения',
      description: 'Гарантия трудоустройства по&nbsp;специальности для&nbsp;выпускников колледжа и&nbsp;университета зафиксирована в&nbsp;договоре',
      descriptionClass: '--light',
      btnText: 'Узнать проходной балл',
      formTitle: 'Узнайте минимальный проходной балл и&nbsp;получите <span class="--free-red">бесплатный</span> доступ к&nbsp;началу обучения',
      formBtnText: 'Подать заявку',
      actionParams: [{ param: 'form=garant_trud_top_ab_kruchu' }],
    },
  },
];

export const additionalMenuLinks = [
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
    title: 'MBA',
    to: ROUTES.BUSINESS_EDUCATION,
  },
];

export interface MenuLinks {
  title?: string;
  to?: string;
  items?: Array<
    Array<
      {
        title?: string;
        to?: string;
        external?: boolean;
        description?: string;
      }
    >
  >
  form?: {
    id?: number;
    image?: string;
    title?: string;
    description?: string;
    descriptionClass?: string;
    btnText?: string;
    to?: string;
    external?: boolean;
    formTitle?: string;
    subtitle?: string;
    actionParams?: { param: string }[]
    formBtnText?: string;
  },
  navMenu?: Array<
    {
      title?: string;
      items?: { title?: string; to?: string }[]
      to?: string;
    }
  >
};
