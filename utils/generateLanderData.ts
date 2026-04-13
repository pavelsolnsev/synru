import { useStorage } from '@vueuse/core';
import { getMergeLead, getEntryPoint, getMatomoUid, getAnalitycsId, getPiwikId } from './getAnalitycsData';
import { ROUTES } from '~/constants';
import { MTI_PROGRAM_SLUGS_SET } from '~/constants/mtiProgramSlugs';

export default function generateLanderData(data: BaseLanderData) {
  const { path } = useRoute();
  const config = useRuntimeConfig();
  const landerSlug = (config.public.landerDemoSlug as string) || '';
  const yaId = Number(config.public.yaMetrikaId) || 0;

  const defaultAlias = getAlias(path);

  const formTitle = filterFormText(data.title ?? '');
  const formSubtitle = filterFormText(data.subtitle ?? '');

  const additionalParams = data.actionParams && data.actionParams.length
    ? data.actionParams.reduce((acc, item) => {

        if (!item.param) return acc;

        const [key, value] = item.param.split('=');

        if (key && value) acc[key] = value;

        return acc;
      },{} as Record<string, string>)
    : {};

  let yandexClientId: number | undefined = undefined;

  if (yaId) {
    window?.ym(yaId, 'getClientID', function(clientID: number) {
      yandexClientId = clientID;
    });
  }

  const params = {
    r: 'land/index',
    land: landerSlug,
    unit: landerSlug,
    type: 'univer',
    graccount: landerSlug,
    form_title: formTitle ?? '',
    subtitle: formSubtitle ?? '',
    version: getVersion(path) ?? '',
    level: getLevelName(path),
    alias: defaultAlias,

    ...additionalParams,

    mergeLead: getMergeLead(),
    entry_point: getEntryPoint(),
    url_location: window?.location.toString() || '',
    url: window?.location.toString() || '',
    refer: getReferrer(),
    matomo_uid: getMatomoUid(),
    piwik_id: getPiwikId(),
    analytics_id: getAnalitycsId(),
    yandex_counter_id: yaId ? String(yaId) : '',
    yandex_client_id: typeof yandexClientId !== 'undefined' ? (yandexClientId as number).toString() : '',
    remake: '3781',
  };

  const filterParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && Boolean(value)) filterParams[key] = value;
  }

  return filterParams;
}

function getLastPathSegment(path: string) {
  return path.endsWith('/') ? path.split('/').at(-2) : path.split('/').at(-1);
}

function getAlias(path: string) {
  if (path === '/') return 'main';

  if (isArticlePath(path)) return 'media';

  return getLastPathSegment(path);
}

function getVersion(path: string) {
  const lastPathSegment = getLastPathSegment(path);

  if (isArticlePath(path)) return lastPathSegment;

  if (lastPathSegment && MTI_PROGRAM_SLUGS_SET.has(lastPathSegment)) return `mti_${lastPathSegment}`;

  return getAlias(path);
}

function filterFormText(text: string) {
  if (!text || typeof text !== 'string') return null;

  const textWithoutNbsp = text.replace(/&nbsp;/g, ' ');
  const filteredText = textWithoutNbsp.replace(/[^а-яА-ЯёЁ .,!]/g, '');

  return filteredText;
}

function getReferrer() {
  const back = useRouter().options.history.state.back;
  return back ? window?.location.origin + back : document?.referrer;
}

function isArticlePath(path: string) {
  const ARTICLES_ROUTES = [
    ROUTES.ARTICLES,
    ROUTES.MEDIA,
    ROUTES.ACADEMY,
    ROUTES.EGE_OGE,
  ];

  return ARTICLES_ROUTES.some((key) => path.startsWith(key));
}

export interface BaseLanderData {
  title: string;
  subtitle?: string;
  actionParams?: { param: string }[]
}

function getLevelName(path: string) {
  if (path.startsWith('/abiturientam/programmyi_obucheniya/')) {
    const levelsMap = useStorage('levelsMap', {} as Record<string, string>, sessionStorage);

    if (path in levelsMap.value) {
      return levelsMap.value[path];
    }
  };

  const levelNamesMap = {
    '/school': 'Школа',
    '/abiturientam/college': 'Колледж',
    '/abiturientam/pervoe_vysshee': 'Бакалавриат',
    '/abiturientam/magistracy': 'Магистратура',
    '/abiturientam/second_highest': 'Второе высшее',
    '/abiturientam/speczialitet': 'Специалитет',
    '/abiturientam/postgraduate_study': 'Аспирантура',
    '/abiturientam/ordinatura': 'Ординатура',
    '/business_education': 'MBA',
    '/mba': 'MBA',
    '/professions': 'Курсы',
  };

  for (const sybPath in levelNamesMap) {
    if (path.startsWith(sybPath)) return levelNamesMap[sybPath as keyof typeof levelNamesMap];
  }

  return '';
}
