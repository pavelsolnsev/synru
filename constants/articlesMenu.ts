import { ROUTES } from '~/constants';
import type { MArticlesMenu } from '~/types';

export const blogMenu: MArticlesMenu[] = [{
  title: 'Медиацентр',
  icon: 'menu_home',
  to: ROUTES.NEWS_MEDIACENTER,
},
{
  title: 'Новости Университета',
  icon: 'menu_news',
  to: ROUTES.NEWS,
},
{
  title: 'Опросы',
  icon: 'menu_help',
  to: ROUTES.NEWS_RESEARCH,
},
{
  title: 'Фотогалерея',
  icon: 'menu_photo',
  to: ROUTES.GALLERY,
},
{
  title: 'Видеогалерея',
  icon: 'menu_video',
  to: ROUTES.VIDEOGALLERY,
},
{
  title: 'СМИ о&nbsp;нас',
  icon: 'menu_smi',
  to: ROUTES.NEWS_SMI,
}];

export const guideMenu: MArticlesMenu[] = [{
  title: 'Справочники',
  icon: 'menu_home',
  to: ROUTES.MEDIA_GUIDES,
},
{
  title: 'Справочник по&nbsp;поступлению',
  icon: 'menu_different',
  to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE,
  child: [
    {
      title: 'ОГЭ',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_OGE,
    },
    {
      title: 'ЕГЭ',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_EGE,
    },
    {
      title: 'ГВЭ',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_GVE,
    },
    {
      title: 'Колледж',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_COLLEGE,
    },
    {
      title: 'Высшее образование',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_VISSHEE_OBRAZOVANIE,
    },
    {
      title: 'Магистратура',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_MAGISTRATURA,
    },
    {
      title: 'Оргвопросы',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_ORGVOPROSI,
    },
    {
      title: 'Выплаты студентам',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_VIPLATI_STUDENTAM,
    },
    {
      title: 'Льготы',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_LGOTI,
    },
    {
      title: 'Дистанционное обучение',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_DISTANCIONNOE_OBRAZOVANIE,
    },
    {
      title: 'Учёба за&nbsp;границей',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_UCHEBA_ZA_GRANICEY,
    },
    {
      title: 'После вуза',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_POSLE_VUZA,
    },
    {
      title: 'Повышение квалификации и&nbsp;переподготовка',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_POVISHENIE_KVAL,
    },
    {
      title: 'MBA',
      to: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE_MBA,
    },
  ],
},
{
  title: 'Справочник по&nbsp;профессиям',
  icon: 'menu_higher_education',
  to: ROUTES.MEDIA_GUIDES_SPRAVOCHNIK_PO_PROFESSIYAM,
},
{
  title: 'Дни открытых дверей',
  icon: 'menu_college',
  to: ROUTES.MEDIA_GUIDES_DEN_OTKRITIX_DVEREY,
},
{
  title: 'Профориентация',
  icon: 'menu_prof',
  to: ROUTES.MEDIA_CAREER_GUIDANCE,
}];

export const articlesMenu: MArticlesMenu[] = [{
  title: 'Главная',
  icon: 'menu_home',
  to: ROUTES.ARTICLES,
},
{
  title: 'Справочник абитуриента',
  icon: 'menu_media',
  to: ROUTES.MEDIA,
},
{
  title: 'Школа',
  icon: 'menu_school',
  to: ROUTES.ARTICLES_SCHOOL,
},
{
  title: 'ОГЭ/ЕГЭ',
  icon: 'menu_exam',
  to: ROUTES.ARTICLES_EGE,
  child: [
    {
      title: 'Материалы для подготовки к&nbsp;ЕГЭ/ОГЭ',
      to: ROUTES.EGE_OGE,
    },
    {
      title: 'ЕГЭ',
      to: ROUTES.EGE,
    },
    {
      title: 'ОГЭ',
      to: ROUTES.OGE,
    },
    {
      title: 'Калькулятор ЕГЭ 2026',
      to: ROUTES.EGE_CALC,
    },
    {
      title: 'Новости образования',
      to: ROUTES.EDU_NEWS,
    },
    {
      title: 'Блог абитуриента',
      to: ROUTES.EDU_USEFUL_INFORMATION,
    },
  ],
},
{
  title: 'Колледж',
  icon: 'menu_college',
  to: ROUTES.ARTICLES_COLLEGE,
},
{
  title: 'Высшее образование',
  icon: 'menu_higher_education',
  to: ROUTES.ARTICLES_HIGHEST_EDUCATION,
  child: [
    {
      title: 'Бакалавриат',
      to: ROUTES.ARTICLES_BACCALAUREATE,
    },
    {
      title: 'Специалитет',
      to: ROUTES.ARTICLES_SPECIALTY,
    },
    {
      title: 'Магистратура',
      to: ROUTES.ARTICLES_MAGISTRACY,
    },
    {
      title: 'Второе высшее',
      to: ROUTES.ARTICLES_SECOND_HIGHEST,
    },
    {
      title: 'Аспирантура',
      to: ROUTES.ARTICLES_POSTGRADUATE_STUDY,
    },
  ],
},
{
  title: 'Заочка',
  icon: 'menu_absentia',
  to: ROUTES.ARTICLES_ZAO,
},
{
  title: 'Дистанционка',
  icon: 'menu_distance',
  to: ROUTES.ARTICLES_DISTANCE,
},
{
  title: 'Курсы',
  icon: 'menu_courses',
  to: ROUTES.ARTICLES_COURSES,
},
{
  title: 'Профессии',
  icon: 'menu_specialties',
  to: ROUTES.ARTICLES_PROFESSIONS,
},
{
  title: 'Медицина',
  icon: 'menu_medicine',
  to: ROUTES.ARTICLES_MEDICINE,
},
{
  title: 'Карьера',
  icon: 'menu_academy',
  to: ROUTES.ACADEMY,
  child: [
    { title: 'Геймдев', to: ROUTES.ACADEMY_GAME },
    { title: 'Карьера', to: ROUTES.ACADEMY_CAREER },
    { title: 'Управление', to: ROUTES.ACADEMY_UPRAVLENIE },
    { title: 'Программирование', to: ROUTES.ACADEMY_PROGRAMMING },
    { title: 'Дизайн', to: ROUTES.ACADEMY_DESIGN },
    { title: 'Маркетинг', to: ROUTES.ACADEMY_MANAGEMENT },
  ],
},
{
  title: 'Помощь абитуриентам',
  icon: 'menu_help',
  to: ROUTES.ARTICLES_HELP,
},
{
  title: 'Полезное',
  icon: 'menu_different',
  to: ROUTES.ARTICLES_USEFUL,
},
{
  title: 'О демо-вузе',
  icon: 'menu_brend',
  to: ROUTES.ARTICLES_BREND,
}];
