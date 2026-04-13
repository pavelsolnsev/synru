import { ROUTES } from '~/constants';
import { ARTICLE_DEFAULT_FORM_TITLE } from '~/constants/common';
import type { ArticleEntity } from '~/types';

export default function transformCKEditorContent(data: Data) {
  const {
    entity,
    rawContent,
    payload,
  } = data;

  const {
    specialties = [],
  } = payload;

  const splitByTagRegex = /<([a-z0-9-]+)[^>]*>.*?<\/\1>/gs;
  const rawTags = rawContent.match(splitByTagRegex) ?? [];
  let hTagIndex = 0;

  return rawTags.reduce((acc, rawTag) => {
    const tagHandlers: Record<string, () => void> = {
      '<h2': () => {
        const { tag, chapter } = formatHTag(rawTag, hTagIndex);

        hTagIndex += 1;
        acc.tags.push(tag);
        acc.chapters.push(chapter);
      },
      '<h3': () => {
        const { tag, chapter } = formatHTag(rawTag, hTagIndex);

        hTagIndex += 1;
        acc.tags.push(tag);

        const findLastH2 = acc.chapters.findLast((h) => h.type === 'h2');
        if (findLastH2) {
          findLastH2.children?.push(chapter);
        } else {
          acc.chapters.push(chapter);
        }
      },
      '<component': () => {
        const { component = '', props = {} } = formatAdminPanelComponent(rawTag) ?? {};

        acc.tags.push({ component, props });
      },
      '<table': () => {
        const component = 's-article-table';
        const props = { table: rawTag };

        acc.tags.push({ component, props });
      },
      '<figure': () => {
        if (rawTag.includes('class="table"')) {
          const component = 's-article-table';
          const props = { table: rawTag };

          acc.tags.push({ component, props });
        } else {
          acc.tags.push(rawTag);
        }
      },
      '<div': () => {
        if (rawContent.includes('<table')) {
          const component = 's-article-table';
          const props = { table: rawTag };

          acc.tags.push({ component, props });
        }
      },
      '<p': () => {
        acc.tags.push({ component: 's-article-paragraph', props: parsePTagRegex(rawTag) });
      },
    };

    const tagHandler = Object.keys(tagHandlers).find((key) => rawTag.startsWith(key));

    if (tagHandler) {
      tagHandlers[tagHandler]();
      return acc;
    }

    acc.tags.push(rawTag);
    return acc;
  }, { tags: [], chapters: [] } as FormatContent);

  function formatHTag(tag: string, index: number) {
    const hTag = tag.startsWith('<h2') ? 'h2' : 'h3';

    const hTagRegex = new RegExp(`<${hTag}[^]*?>([^]*?)</${hTag}>`, 'i');
    const hTagMatches = tag.match(hTagRegex);

    const idAttribute = `h_caption_${index}`;
    const spanAnchor = `<span id="${idAttribute}" class="s-article__anchor"></span>`;
    const hTagText = hTagMatches ? hTagMatches[1] : '';

    const hTagWithIdAttribute = tag.replace(new RegExp(`<${hTag}`), `${spanAnchor}<${hTag}`);

    return {
      tag: hTagWithIdAttribute,
      chapter: {
        type: hTag,
        text: hTagText,
        id: idAttribute,
        children: hTag === 'h2' ? [] : undefined,
      } as FormatContent['chapters'][0],
    };
  }

  function parsePTagRegex(htmlString: string) {
    const result = {
      text: '',
      classes: '',
      id: '',
    };

    const pTagRegex = /<p\b([^>]*)>([\s\S]*?)<\/p>/i;
    const match = htmlString.match(pTagRegex);

    if (match) {
      const attributes = match[1];

      result.text = match[2];

      const classMatch = attributes.match(/class\s*=\s*["']([^"']*)["']/i);
      if (classMatch) result.classes = classMatch[1];

      const idMatch = attributes.match(/id\s*=\s*["']([^"']*)["']/i);
      if (idMatch) result.id = idMatch[1];
    }

    return result;
  }

  function formatAdminPanelComponent(adminPanelComponent: string): ComponentData | null {
    const componentRegex = /<component name="([^"]+)">([^]*?)<\/component>/gs;

    const matches = componentRegex.exec(adminPanelComponent);

    if (!matches) return null;

    const INITIAL_ADMIN_PANEL_LIST_INDEX = 1;

    const adminPanelComponentName = matches[1];
    const adminPanelComponentData = matches[2];

    let component = '';
    const props: ComponentData['props'] = {};

    const adminPanelComponentsMap: Record<string, () => ComponentData> = {
      'article-form1-widget': () => {
        component = 's-article-form';

        const formTitleRegex = /<formtitle>(.*?)<\/formtitle>/;
        const formTitleMatch = adminPanelComponentData.match(formTitleRegex);
        const formTitle = formTitleMatch ? formTitleMatch[1]?.trim() : '';
        const defaultFormTitle = ARTICLE_DEFAULT_FORM_TITLE;

        props['title'] = formTitle && formTitle !== '&nbsp;' ? formTitle : defaultFormTitle;
        props['action-params'] = [{ param: 'form=education_articles' }];
        return { component, props };
      },

      'article-steps-widget': () => {
        component = 's-article-trajectory';

        const componentData = { component, props };

        const componentNumber = getCustomFieldNumber(adminPanelComponentData);
        if (!componentNumber) return componentData;

        const { article_steps = [] } = entity?.customFields ?? {};
        const index = Number(componentNumber) - INITIAL_ADMIN_PANEL_LIST_INDEX;
        const steps = article_steps[index] ?? null;

        if (!steps) return componentData;

        props['title'] = steps.title;
        props['items'] = steps.steps.map((item) => item.step);

        return componentData;
      },

      'article-programs-block-widget': () => {
        component = 's-article-specialities';

        const defaultTitle = 'Рекомендованные программы обучения';

        const {
          article_education_new = [],
        } = entity?.customFields ?? {};

        const {
          title: recommendProgramsTitle = '',
        } = article_education_new[0] ?? {};

        props['title'] = recommendProgramsTitle || defaultTitle;

        props['items'] = specialties;

        return { component, props };
      },

      'article-programs-filter-widget': () => {
        component = 's-programs-list';

        props['routeName'] = 'education_article';
        props['trainingProgramsTitle'] = 'Программы обучения';
        props['trainingProgramsTitleClass'] = 'a-font_h4';
        props['entity'] = entity;

        return { component, props };
      },

      'article-notes-widget': () => {
        component = 's-article-nb';

        const componentData = { component, props };

        const componentNumber = getCustomFieldNumber(adminPanelComponentData);

        if (!componentNumber) return componentData;
        const { article_notes = [] } = entity?.customFields ?? {};
        const index = Number(componentNumber) - INITIAL_ADMIN_PANEL_LIST_INDEX;

        const { text = '' } = article_notes[index] ?? {};

        if (!text) return componentData;

        props['text'] = text;

        return componentData;
      },

      'article-quotes-widget': () => {
        component = 's-article-quote';

        const componentData = { component, props };
        const componentNumber = getCustomFieldNumber(adminPanelComponentData);

        if (!componentNumber) return componentData;
        const { article_quotes = [] } = entity?.customFields ?? {};
        const index = Number(componentNumber) - INITIAL_ADMIN_PANEL_LIST_INDEX;

        const {
          description,
          image,
          name,
          text,
        } = article_quotes[index] ?? {};

        props['description'] = description ?? '';
        props['image'] = image ?? '';
        props['name'] = name ?? '';
        props['text'] = text ?? '';

        return componentData;
      },

      'article-lists-widget': () => {
        component = 's-article-lists-widget';

        const componentData = { component, props };
        const componentNumber = getCustomFieldNumber(adminPanelComponentData);
        if (!componentNumber) return componentData;

        const { article_lists = [] } = entity?.customFields ?? {};

        if (!Array.isArray(article_lists)) return componentData;

        const index = Number(componentNumber) - INITIAL_ADMIN_PANEL_LIST_INDEX;

        const list = article_lists[index] ?? {};

        props['list'] = list;

        return componentData;
      },

      'article-career-guidance-widget': () => {
        component = 's-banner-link';

        const titleRegex = /<title>(.*?)<\/title>/;
        const titleMatch = adminPanelComponentData.match(titleRegex);
        const title = titleMatch ? titleMatch[1]?.trim() : '';

        props['title'] = title && title !== '&nbsp;' ? title : '';
        props['description'] = 'Профориентация с&nbsp;искусственным интеллектом';
        props['href'] = `${ROUTES.MEDIA_CAREER_GUIDANCE}/test`;
        props['image-lg'] = '/img/articles/banner/ai_help/article-banner-lg.webp';
        props['image-sm'] = '/img/articles/banner/ai_help/article-banner-sm.webp';

        return { component, props };
      },
    };

    const formatComponent = adminPanelComponentsMap[adminPanelComponentName];

    return formatComponent ? formatComponent() : null;
  }

  function getCustomFieldNumber(componentData: string): number | null {
    const numberRegex = /<number>(.*?)<\/number>/;
    const numberMatch = componentData?.match(numberRegex);

    if (!numberMatch) return null;

    const getOnlyNumbers = numberMatch[1]?.match(/\d+/g);

    if (!getOnlyNumbers) return null;

    const numberString = getOnlyNumbers.join('');

    const number = Number(numberString);

    return isNaN(number) ? null : number;
  }
}

interface Data {
  rawContent: string;
  entity: ArticleEntity | null;
  payload: {
    specialties: { to: string; ico: string; title: string }[]
  }
}

interface ComponentData {
  component: string;
  props: { [key: string]: unknown }
}

interface FormatContent {
  tags: Array<string | ComponentData>;
  chapters: {
    text: string;
    id: string;
    type: 'h2' | 'h3';
    children?: FormatContent['chapters'];
  }[]
}
