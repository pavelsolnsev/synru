import { BUSINESS_EDUCATION } from '~/constants/routes';
import type {
  TopLevelLinksObject,
  DocumentMetaObject,
} from '~/types';
import type { ProgramCard, EntityOption } from '~/types/ProgramCard';
import type {
  BsProgramAttributesObject,
  BsProgramResource,
} from '~/types/entities';

export function transform(response: BsProgramsFilterResponse) {
  const tagsDict = {
    'MBA': { virtualId: 1 },
    'Мероприятия': { virtualId: 2 },
    'Онлайн-курс': { virtualId: 3 },
    'Семинар': { virtualId: 4 },
    'Выездные мероприятия': { virtualId: 5 },
  };

  const tags: Record<number, EntityOption> = {};

  const programs = response.data.map(({ id, attributes }) => {
    const tagName = attributes.type[0].toUpperCase() + attributes.type.slice(1);
    const virtualTagId = tagsDict[tagName as keyof typeof tagsDict].virtualId;

    const program = getBsProgramTemplate(id, attributes);

    program.tags[virtualTagId] = {
      text: tagName,
      value: virtualTagId,
    };

    tags[virtualTagId] = {
      text: tagName,
      value: virtualTagId,
    };

    return program;
  });

  return {
    programs,
    tags,
  };
}

function getBsProgramTemplate(id: string, attributes: BsProgramAttributesObject): ProgramCard {
  const form = attributes?.properties?.attributes?.format;

  return {
    id,
    name: attributes.name,
    type: 'bs-entities',
    faculty: {} as EntityOption,
    level: {} as EntityOption,
    forms: {
      0: {
        text: form ? form[0].toUpperCase() + form.slice(1) : 'Онлайн',
        value: 0,
      },
    },
    place: '',
    tags: {} as Record<number, EntityOption>,

    // внутренний тикет OP-4408 — замена ссылки
    link: attributes.slug === 'synergy_executive_mba' ? '/mba/executive_mba/executive_mba' : (BUSINESS_EDUCATION + '/' + attributes.slug).replace('//', '/'),
    new: false,
    isPopular: false,
    partner: false,
    published_at: '',
    popup: true,
    customFields: attributes.custom_field_values,
    advantages: makeAdvantages(attributes) as { text: string, value: string }[],
    program: makeProgram(attributes) as { title: string, description: string }[],
    presentation: '',
    rank: 0,
    direction_ico: '',
  };
}

function makeAdvantages({ properties }: BsProgramAttributesObject) {
  const block = properties?.blocks?.find((block) => block.attributes.key === 's-program-advantages');

  const blockItems = block?.attributes?.content?.items || [];

  return blockItems.filter((item) => item.value || item.text);
}

function makeProgram({ properties }: BsProgramAttributesObject) {
  const block = properties?.blocks?.find((block) => block.attributes.key === 's-program-program');

  const blockItems = block?.attributes?.content?.items || [];

  return blockItems.filter((item) => item?.title || item?.description);
}

interface BsProgramsFilterResponse {
  data: BsProgramResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}

type EntityTypes = 'custom-field-values';

interface Entity {
  id: string;
  type: EntityTypes;
  attributes: {
    name: string;
    short_name?: string;
    properties?: Record<string, unknown>;
    [key: string]: unknown;
  };
  relationships: Record<string, unknown>;
}
