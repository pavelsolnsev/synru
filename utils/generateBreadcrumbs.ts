import { ROUTES } from '~/constants';

interface Data {
  routeName: string;
  entity: Entity;
}

interface Route {
  external?: boolean,
  title: string;
  link: string;
}

interface Entity {
  name?: string;
  short_name?: string;
}

const HOMEPAGE: Route = { title: 'Главная', link: ROUTES.HOMEPAGE };

const routesBreadcrumbs: Record<string, Array<Route | 'entity'>> = {
  'about': [HOMEPAGE, { title: 'Об университете', link: '#' }],
  'abiturientam': [HOMEPAGE, { title: 'Абитуриентам', link: '#' }],
  'abiturientam_newdesign': [HOMEPAGE, { title: 'Абитуриентам', link: '#' }],
  'branch': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Приемные комиссии в&nbsp;других городах и&nbsp;странах', link: ROUTES.FILIALS }, { title: 'Региональные подразделения', link: '#' }],
  'branches': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Приемные комиссии в&nbsp;других городах и&nbsp;странах', link: '#' }],
  'business_education': [HOMEPAGE, { title: 'Бизнес-образование', link: '#' }],
  'business_program': [HOMEPAGE, { title: 'Бизнес-образование', link: ROUTES.BUSINESS_EDUCATION }, 'entity'],
  'mba_program': [HOMEPAGE, { title: 'Бизнес-образование', link: ROUTES.BUSINESS_EDUCATION }, 'entity'],
  'calculator': [HOMEPAGE, { title: 'Кредитный калькулятор', link: '#' }],
  'college': [HOMEPAGE, { title: 'Колледж', link: '#' }],
  'college_new': [HOMEPAGE, { title: 'Колледж (демо)', link: '#' }],
  'college_medicine': [HOMEPAGE, { title: 'Колледж', link: ROUTES.COLLEGE }, { title: 'Медицинский колледж', link: '#' }],
  'career_center': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY },{ title: 'Центр карьеры', link: '#' }],
  'seo-college': [HOMEPAGE, { title: 'Колледж', link: ROUTES.COLLEGE }, 'entity'],
  'coordinat': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY },{ title: 'Контакты', link: '#' }],
  'course': [HOMEPAGE, { title: 'Курсы', link: ROUTES.COURSES }, 'entity'],
  'credit_na_obrazovanie_s_podderzhkoj_gosudarstva': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Кредит на&nbsp;образование с&nbsp;поддержкой государства', link: '#' }],
  'emba': [HOMEPAGE, { external: true, title: 'MBA', link: ROUTES.MBA }, { external: true, title: 'Executive MBA', link: ROUTES.EMBA_TAB }, { title: 'Executive MBA', link: '#' }],
  'faculties': [HOMEPAGE, { title: 'Факультеты Университета', link: '#' }],
  'faculty': [HOMEPAGE, { title: 'Факультеты', link: ROUTES.FACULTIES }, 'entity'],
  'promo_faculty': [HOMEPAGE, { title: 'Факультеты', link: ROUTES.FACULTIES }, 'entity'],
  'faq': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Часто задаваемые вопросы', link: '#' }],
  'franchises': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Франшизы', link: '#' }],
  'magistracy': [HOMEPAGE, { title: 'Магистратура', link: '#' }],
  'ordinatura': [HOMEPAGE, { title: 'Ординатура', link: '#' }],
  'pay_education': [HOMEPAGE, { title: 'Студентам', link: ROUTES.STUDENTS }, { title: 'Оплата обучения', link: '#' }],
  'perevod_iz_drugogo_vuza': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Перевод из другого вуза', link: '#' }],
  'personnel_reserve': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Кадровый резерв', link: '#' }],
  'pervoe_vysshee': [HOMEPAGE, { title: 'Бакалавриат', link: '#' }],
  'postgraduate_study': [HOMEPAGE, { title: 'Аспирантура', link: '#' }],
  'priemnaya_komissiya': [HOMEPAGE, { title: 'Приёмная комиссия', link: '#' }],
  'program': [HOMEPAGE, { title: 'Специальности', link: ROUTES.SPECIALTIES }, 'entity'],
  'professions': [HOMEPAGE, { title: 'Курсы', link: '#' }],
  'courses_direction': [HOMEPAGE, { title: 'Курсы', link: ROUTES.COURSES }, 'entity'],
  'programmyi_obucheniya': [HOMEPAGE, { title: 'Специальности', link: '#' }],
  'raitings': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Рейтинги (демо)', link: '#' }],
  'school': [HOMEPAGE, { title: 'Онлайн-школа (демо)', link: '#' }],
  'school_program': [HOMEPAGE, { title: 'Школа', link: ROUTES.SCHOOL }, 'entity'],
  'second_highest': [HOMEPAGE, { title: 'Второе высшее', link: '#' }],
  'speczialitet': [HOMEPAGE, { title: 'Специалитет', link: '#' }],
  'students': [HOMEPAGE, { title: 'Студентам', link: '#' }],
  'talent_pool': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Целевое обучение', link: '#' }],
  'zarubezhnoe_obrazovanie': [HOMEPAGE, { title: 'Зарубежное образование', link: '#' }],
  'history': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'История Университета', link: '#' }],
  'sber': [HOMEPAGE, { title: 'Кредит на&nbsp;образование с&nbsp;поддержкой государства', link: ROUTES.CREDIT }, { title: 'от Сбера', link: '#' }],
  'tbank': [HOMEPAGE, { title: 'Кредит на&nbsp;образование с&nbsp;поддержкой государства', link: ROUTES.CREDIT }, { title: 'от Т-банка', link: '#' }],
  'credit_na_obrazovanie': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Кредит на&nbsp;образование с&nbsp;поддержкой государства', link: '#' }],
  'pogruzhenie_v_professiyu': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM },{ title: 'Практика и&nbsp;погружение в&nbsp;профессию', link: '#' }],
  'synergy_friends': [HOMEPAGE, { title: 'Студентам', link: ROUTES.STUDENTS }, { title: 'Программа лояльности (демо)', link: ROUTES.STUDENTS_DEMO_LOYALTY }],
  'demo_loyalty': [HOMEPAGE, { title: 'Студентам', link: ROUTES.STUDENTS }, { title: 'Программа лояльности (демо)', link: ROUTES.STUDENTS_DEMO_LOYALTY }],
  'express_professions': [HOMEPAGE, { title: 'Экспресс-курсы', link: '#' }],
  'certificate': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Сертификат', link: '#' }],
  'dodemba':[HOMEPAGE, { title: 'Программы EMBA', link: ROUTES.BUSINESS_EDUCATION }, { title: 'День открытых дверей EMBA', link: '#' }],
  'inostrannyim_abiturientam': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Иностранным абитуриентам', link: '#' }],
  'magistracy_new': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Магистратура онлайн', link: '#' }],
  'mti': [HOMEPAGE, { title: 'Московский технологический институт (МТИ)', link: '#' }],
  'map': [HOMEPAGE, { title: 'Московская академия предпринимательства (МосАП)', link: '#' }],
  'education_article': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Образование', link: ROUTES.ARTICLES }],
  'edu': [HOMEPAGE, { title: 'Информ-центр образования', link: '#' }],
  'edu_news': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'Новости ЕГЭ', link: '#' }],
  'edu_news_ege': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ЕГЭ&nbsp;— Материалы для подготовки', link: ROUTES.EGE }, { title: 'Новости ЕГЭ', link: '#' }],
  'edu_news_oge': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ОГЭ. Материалы для подготовки', link: ROUTES.OGE }, { title: 'Новости ОГЭ', link: '#' }],
  'edu_ege_calc': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'Калькулятор ЕГЭ 2026', link: '#' }],
  'edu_ege_schedule': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'Расписание ЕГЭ в 2026 году', link: '#' }],
  'edu_oge_schedule': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'Расписание ОГЭ в 2026 году', link: '#' }],
  'edu_shkala_ege': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ЕГЭ — Материалы для подготовки', link: ROUTES.EGE },{ title: 'Минимальные баллы ЕГЭ в 2026 году', link: '#' }],
  'edu_shkala_oge': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ОГЭ — Материалы для подготовки', link: ROUTES.OGE },{ title: 'Шкала перевода баллов ОГЭ в 2026 году', link: '#' }],
  'edu_ege': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ЕГЭ — Материалы для подготовки', link: '#' }],
  'news': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Новостной блок', link: ROUTES.NEWS }, 'entity' ],
  'education_articles_pomoshh_article': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Образование', link: ROUTES.ARTICLES }, { title: 'Помощь', link: ROUTES.ARTICLES_HELP } ],
  'education_articles_raznoe_article': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Образование', link: ROUTES.ARTICLES }, { title: 'Разное', link: ROUTES.ARTICLES_USEFUL } ],
  'akademiya_article': [HOMEPAGE, { title: 'Медиа (демо)', link: ROUTES.ACADEMY } ],
  'media_guides_entrance_guide_article': [HOMEPAGE, { title: 'Медиа (демо)', link: ROUTES.MEDIA }, { title: 'Справочники', link: ROUTES.MEDIA_GUIDES }, { title: 'Справочник по&nbsp;поступлению', link: ROUTES.MEDIA_GUIDES_ENTRANCE_GUIDE } ],
  'media_guides_guide': [HOMEPAGE, { title: 'Медиа (демо)', link: ROUTES.MEDIA }, { title: 'Справочники', link: ROUTES.MEDIA_GUIDES } ],
  'media_career_guidance_article': [HOMEPAGE, { title: 'Медиа (демо)', link: ROUTES.MEDIA } ],
  'article_author': [HOMEPAGE, { title: 'Медиацентр', link: ROUTES.MEDIACENTER }, { title: 'Авторы', link: ROUTES.ARTICLES_AUTHORS }, 'entity' ],
  'presscenter_media_about_us': [HOMEPAGE, { title: 'Медиацентр', link: ROUTES.MEDIACENTER }, { title: 'СМИ о нас', link: '#' } ],
  'photogallery': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Фотогалерея', link: '#' } ],
  'videogallery': [HOMEPAGE, { title: 'Об Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Видеогалерея', link: '#' } ],
  'edu_news_article': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE } ],
  'edu_poleznaya_informacziya': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'Полезная информация', link: '#' } ],
  'edu_poleznaya_informacziya_article': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }],
  'edu_category': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, 'entity'],
  'edu_blanki_ege': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ЕГЭ&nbsp;— Материалы для подготовки', link: ROUTES.EGE }, { title: 'Бланки ЕГЭ в 2026 году', link: '#' }],
  'edu_blanki_oge': [HOMEPAGE, { title: 'ЕГЭ и&nbsp;ОГЭ', link: ROUTES.EGE_OGE }, { title: 'ОГЭ. Материалы для подготовки', link: ROUTES.OGE }, { title: 'Бланки ОГЭ в 2026 году', link: '#' }],
  'ege_oge': [HOMEPAGE, { title: 'Школа', link: ROUTES.SCHOOL }, { title: 'Подготовка к ЕГЭ и ОГЭ', link: '#' }],
  'podgotovka_oge_base': [HOMEPAGE, { title: 'Школа', link: ROUTES.SCHOOL }, { title: 'Подготовка к ЕГЭ и ОГЭ', link: ROUTES.OGE_EGE_PODGOTOVKA }, { title: 'Подготовка к ОГЭ', link: '#' }],
  'podgotovka_ege_base': [HOMEPAGE, { title: 'Школа', link: ROUTES.SCHOOL }, { title: 'Подготовка к ЕГЭ и ОГЭ', link: ROUTES.OGE_EGE_PODGOTOVKA }, { title: 'Подготовка к ЕГЭ', link: '#' }],
  'education_articles_raznoe_no_category_article': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Образование', link: ROUTES.ARTICLES }],
  'job_dlya_mam': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Центр карьеры', link: ROUTES.CAREER_CENTER }, { title: 'Образование в декрете и трудоустройство', link: '#' }],
  'podbor_top_menedzherov': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Центр карьеры', link: ROUTES.JOB }, { title: 'Национальный контур', link: '#' }],
  'school_and_work': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Центр карьеры', link: ROUTES.JOB }, { title: 'Работа и учёба для школьников', link: '#' }],
  'garantiya_trudoustroystva': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Центр карьеры', link: ROUTES.JOB }, { title: 'Гарантия трудоустройства', link: '#' }],
  'number_one': [HOMEPAGE,  { title: 'Онлайн-колледж № 1', link: '#' }],
  'education_articles_speczialnosti_article': [HOMEPAGE,  { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Образование', link: ROUTES.ARTICLES }, { title: 'Специальности', link: `${ROUTES.ARTICLES}/speczialnosti` }],
  'distance_university': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Дистанционное обучение (демо)', link: '#' } ],
  'zao_university': [HOMEPAGE, { title: 'Абитуриентам', link: ROUTES.ABITURIENTAM }, { title: 'Заочное обучение (демо)', link: '#' } ],
  'podbor': [HOMEPAGE, { title: 'Об&nbsp;Университете', link: ROUTES.ABOUT_UNIVERSITY }, { title: 'Центр карьеры', link: ROUTES.JOB }, { title: 'Международный контур', link: '#' }],
  'school_1': [HOMEPAGE,  { title: 'Онлайн-школа №1', link: '#' }],
  'gymnasium': [HOMEPAGE,  { title: 'Онлайн-гимназия №1', link: '#' }],
};

export default function generateBreadcrumbs({ routeName, entity }: Data) {
  if (!routesBreadcrumbs[routeName]) return [];

  const breadcrumbs = routesBreadcrumbs[routeName].map((route) => {
    return route === 'entity'
      ? { title: entity.name || '', link: '#' }
      : route;
  });

  return breadcrumbs;
};
