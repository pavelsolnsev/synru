import type { SectionConditionalGroup, SectionConditionalType } from '~/types';

export default function needRenderSection(payload: { conditionalGroup: SectionConditionalGroup[], data?: Data }) {
  const { conditionalGroup, data } = payload;

  if (!Array.isArray(conditionalGroup)) return true;
  if (!conditionalGroup[0]) return true;

  const { conditional , conditionalType } = conditionalGroup[0];
  if (!conditionalType) return true;

  const conditionalCheckStrategy: Record<SectionConditionalType, () => boolean> = {
    'show': () => true,
    'hide': () => false,
    'ids': () => checkEntitiesId({ conditionalIds: conditional, entityId: data?.entityId, checkType: 'include' }),
    'excludeIds': () => checkEntitiesId({ conditionalIds: conditional, entityId: data?.entityId, checkType: 'exclude' }),
    'afterDate': () => checkDate({ conditionalDate: conditional, checkType: 'afterDate' }),
    'beforeDate': () => checkDate({ conditionalDate: conditional, checkType: 'beforeDate' }),
    'params': () => checkParams({ conditionalParams: conditional , type: 'include' }),
    'excludeParams': () => checkParams({ conditionalParams: conditional, type: 'exclude' }),
    'route': () => checkRoute({ conditionalRoute: conditional, type: 'include' }),
    'excludeRoute': () => checkRoute({ conditionalRoute: conditional, type: 'exclude' }),
    'routes': () => checkRoutes({ conditionalRoute: conditional, type: 'include' }),
    'excludeRoutes': () => checkRoutes({ conditionalRoute: conditional, type: 'exclude' }),
  };

  const checkFunction = conditionalCheckStrategy[conditionalType];

  if (!checkFunction) return true;

  return checkFunction();
}

function checkEntitiesId(data: {
  conditionalIds?: string | null,
  checkType: 'include' | 'exclude'
  entityId?:  number | string | undefined },
) {
  const { conditionalIds, entityId, checkType } = data;
  if (!conditionalIds || !entityId) return false;

  const conditionalIdsList = conditionalIds.trim().split(',').filter(Boolean);

  return checkType === 'include' ? conditionalIdsList.includes(String(entityId)) : !conditionalIdsList.includes(String(entityId))
  ;
}

function checkDate(data: { conditionalDate?: string | null, checkType: 'afterDate' | 'beforeDate' }) {
  const { conditionalDate, checkType } = data;

  if (!conditionalDate) return false;

  const conditionalDateInGMT3 = new Date(conditionalDate + ' GMT+0300');
  const currentDate = new Date();

  return checkType === 'afterDate' ? currentDate > conditionalDateInGMT3 : currentDate < conditionalDateInGMT3;
}

function checkParams(data: { conditionalParams?: string | null, type: 'include' | 'exclude' }) {
  const { conditionalParams, type } = data;

  if (!conditionalParams) return false;

  const { query } = useRoute();

  const currentQueryParams = new URLSearchParams(query as Record<string, string>);
  const conditionalQueryParams = new URLSearchParams(conditionalParams);

  const currentParamsString = Array.from(currentQueryParams.entries()).sort().toString();
  const conditionalParamsString = Array.from(conditionalQueryParams.entries()).sort().toString();

  return type === 'exclude'
    ? currentParamsString !== conditionalParamsString
    : currentParamsString === conditionalParamsString;
};

function checkRoute(data: { conditionalRoute?: string | null, type: 'include' | 'exclude' }) {
  const { conditionalRoute: route, type } = data;
  if (!route) return false;

  const { fullPath } = useRoute();

  return type === 'exclude'
    ? route !== fullPath
    : route === fullPath;
}

function checkRoutes(data: { conditionalRoute?: string | null, type: 'include' | 'exclude' }) {
  const { conditionalRoute: routes, type } = data;

  if (!routes?.trim()) return false;

  const SPLITTER = ',';

  const routesList = routes
    .split(SPLITTER)
    .map((route) => route.trim());

  const { path } = useRoute();

  return type === 'include'
    ? routesList.includes(path)
    : !routesList.includes(path);
}

interface Data {
  entityId?: number | string;
}
