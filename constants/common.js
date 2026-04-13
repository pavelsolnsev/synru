import { PRIVACY } from './documents';

const siteUrl = typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_SITE_URL
  ? String(import.meta.env.NUXT_PUBLIC_SITE_URL).replace(/\/$/, '')
  : '';

export const POPULAR_TAG_NAME = 'Популярные';
export const POPULAR_TAG_ICON = 'lightning';
export const NOT_FREE_FACULTY_ID = '20';
export const FREE_COURSE_DIRECTION_ID = '24';
export const FREE_COURSE_DIRECTION_NAME = 'Бесплатно';
export const FORM_POLICY_TEXT = `Даю согласие на&nbsp;обработку персональных данных и&nbsp;соглашаюсь c&nbsp;<a href="${PRIVACY || 'https://example.com/privacy'}" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>.`;
export const FORM_POLICY_TEXT_CERT = `Даю согласие на&nbsp;обработку персональных данных и&nbsp;получение информационных рассылок, соглашаюсь c&nbsp;<a href="${PRIVACY || 'https://example.com/privacy'}" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>.`;
export const LOGO_URL = '/img/header/brand-logo.svg';
export const OG_IMAGE = typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_OG_IMAGE_URL
  ? String(import.meta.env.NUXT_PUBLIC_OG_IMAGE_URL)
  : '';
export const FACULTY_FILTER_OPTION_HELP_FORM = 'help_form';
export const HEADER_QUIZ_TEXT = 'Начать бесплатно';
export const YA_METRIKA_ID = 0;

export const ARTICLE_PROGRAM_AND_COURSES_UTM = 'utm_source=demo&utm_medium=portfolio&utm_campaign=articles';
export const ARTICLE_BANNER_UTM = 'utm_source=demo&utm_medium=portfolio&utm_campaign=banner';
export const ARTICLE_DEFAULT_FORM_TITLE = 'Подберите программу обучения и&nbsp;оставьте заявку <span class="--free-white">бесплатно</span>';

export const LK_THANKS_PAGE_KEY = 'registration_key';

export const DEFAULT_DOMAIN = siteUrl;

export const PWA_DESCRIPTION = 'Демо-фронтенд образовательного портала (портфолио).';

export const EXPRESS_PRODUCT_PRICE = 4999;
