export default function generateFormAction(data: Data) {
  const path = useRoute().path;
  const alias = getAlias(path);

  const config = useRuntimeConfig();
  const actionUrl = config.public.landerBaseUri as string;

  if (!actionUrl) {
    return '#';
  }

  const formTitle = filterFormText(data.title ?? '');
  const formSubtitle = filterFormText(data.subtitle ?? '');

  const additionalParams = data.actionParams && data.actionParams.length
    ? data.actionParams.reduce((acc, item) => {
        const [key, value] = item.param.split('=');

        if (key && value) acc[key] = value;

        return acc;
      },{} as Record<string, string>)
    : {};

  const slug = (config.public.landerDemoSlug as string) || '';

  const params = {
    'r': 'land/index',
    'land': slug,
    'unit': slug,
    'type': 'univer',
    'graccount': slug,
    'form_title': formTitle ?? '',
    'subtitle': formSubtitle ?? '',
    'version': alias ?? '',
    'alias': alias ?? '',
    ...additionalParams,
  };

  const filterParams: Record<string, string> = Object.fromEntries(
    Object.entries(params)
      .filter(([_, value]) => Boolean(value)),
  );

  const actionParams = new URLSearchParams(filterParams);

  const action = `${actionUrl}?${actionParams.toString()}`;

  return action;
}

function getAlias(path: string) {
  if (path === '/') return 'main';

  return path.endsWith('/')
    ? path.split('/').at(-2)
    : path.split('/').at(-1);
}

function filterFormText(text: string) {
  if (!text || typeof text !== 'string') return null;

  const textWithoutNbsp = text.replace(/&nbsp;/g, ' ');
  const filteredText = textWithoutNbsp.replace(/[^а-яА-ЯёЁ .,!]/g, '');

  return filteredText;
}

interface Data {
  title: string;
  subtitle?: string;
  actionParams?: { param: string }[]
}
