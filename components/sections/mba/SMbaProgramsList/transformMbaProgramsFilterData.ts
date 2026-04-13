import { BUSINESS_EDUCATION } from '~/constants/routes';
import type {
  TopLevelLinksObject,
  DocumentMetaObject,
} from '~/types';
import type { ProgramCard, EntityOption } from '~/types/ProgramCard';
import type {
  MbaProgramAttributesObject,
  MbaProgramResource,
} from '~/types/entities';

export function transform(response: MbaProgramsFilterResponse) {
  const included = {
    forms: {} as Record<string, EntityOption>,
    categories: {} as Record<string, EntityOption>,
  };

  response.included?.map((item) => {
    if (item.type === 'forms') {
      included.forms[item.id] = {
        value: Number(item.id),
        text: item.attributes.short_name || item.attributes.name
      };
    }
    if (item.type === 'categories') {
      included.categories[item.id] = {
        value: Number(item.id),
        text: item.attributes.short_name || item.attributes.name
      };
    }
  });

  const tags: Record<number, EntityOption> = included.categories;

  const programs = response.data.map(({ id, attributes, relationships }) => {
    const program = getMbaProgramTemplate(id, attributes);

    relationships.categories?.data?.forEach((category: { id: string, type: 'categories' }) => {
      program.tags[+category.id] = included.categories[category.id];
    });

    relationships.forms?.data?.forEach((form: { id: string, type: 'forms' }) => {
      program.forms[+form.id] = included.forms[form.id];
    });

    return program;
  });

  return {
    programs,
    tags,
  };
}

function getMbaProgramTemplate(id: string, attributes: MbaProgramAttributesObject): ProgramCard {
  return {
    id,
    name: attributes.name,
    type: 'mba-programs',
    faculty: {} as EntityOption,
    level: {} as EntityOption,
    forms: {},
    place: '',
    tags: {} as Record<number, EntityOption>,

    // внутренний тикет — замена ссылки
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

function makeAdvantages({ custom_field_values }: MbaProgramAttributesObject) {
  const block = custom_field_values.find((field) => Object.keys(field)[0] === 'mba_program_advantages');

  const advantages = block?.mba_program_advantages.map((item) => {
    if (typeof item === 'object' && item !== null && item.hasOwnProperty('text')) {
      const match = ( item as { text: string }).text.match(/^(\d+)\s+(.+)$/);
      if (match) {
        return {
          text: match[2],
          value: match[1]
        };
      }
    }

    return { text: '', value: '' };
  })

  return advantages;
}

function makeProgram({ custom_field_values }: MbaProgramAttributesObject) {
  const block = custom_field_values.find((field) => Object.keys(field)[0] === 'learning_program');

  return block?.learning_program;
}

interface MbaProgramsFilterResponse {
  data: MbaProgramResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}

type EntityTypes = 'custom-field-values' | 'forms' | 'categories';

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
