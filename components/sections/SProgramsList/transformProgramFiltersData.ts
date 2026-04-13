import { COMMON } from '~/constants';
import { synergyRu } from '~/utils/mediaCdn';
import type {
  ResourceIdentifierObject,
} from '~/types';
import type { ProgramCard, EntityOption } from '~/types/ProgramCard';
import type {
  ProgramAttributesObject,
  ProgramResource,
  CourseResource,
  CourseAttributesObject,
} from '~/types/entities';

export function transform(response: UnionFilterResponse) {
  const { included } = response;

  const relationsMap: RelationsMap = {
    faculties: {},
    levels: {},
    forms: {},
    tags: {},
    directions: {},
  };

  try {
    included.forEach((entity) => {
      if (!Object.hasOwn(relationsMap, entity.type)) return;

      relationsMap[entity.type][+entity.id] = makeOptions(entity);
    });
  } catch (e) {
    console.error(e);
  }

  let programs: ProgramCard[] = [];
  try {
    programs = response.data.map(({ id, type, attributes, relationships }) => {
      const program = getProgramCardTemplate(type, id, attributes);

      Object.keys(relationships).forEach((relation) => {
        if (!Object.hasOwn(program, relation)) return;

        let relationData;

        if (type === 'programs') {
          relationData = relationships[relation as ProgramRelationsNames]['data']!;
        } else {
          if (relation !== 'levels') {
            relationData = relationships[relation as CourseRelationsNames]['data']!;
          }
        }

        if (['faculty', 'level'].includes(relation)) {
          program[relation as Extract<ProgramRelationsNames, 'faculty' | 'level'>] =
          makeRelation(relationsMap, relationData);
        } else {
          program[relation as Extract<ProgramRelationsNames, 'forms' | 'tags'>] =
          makeRelationArray(relationsMap, relationData);
        }
      });

      if (program.faculty.value) {
        const directionId = relationsMap.faculties[program.faculty.value].direction;

        const directionSlug = relationsMap.directions[directionId as number].slug;

        program.direction_ico = getDirectionIconName(directionSlug as string);

        program.presentation = synergyRu(`presentations/${relationsMap.faculties[program.faculty.value].slug}.pdf`);
      }

      if (
        Object.keys(program.tags).some(
          (tagId) => program.tags[+tagId]?.text === COMMON.POPULAR_TAG_NAME,
        )
      ) {
        program.isPopular = true;
      }

      return program;
    });
  } catch (error) {
    console.error(error);
  }

  relationsMap.levels['1000'] = {
    text: 'Курсы',
    value: 1000,
    rank: 1000,
  };

  return {
    programs,
    ...relationsMap,
  };
}

function makeOptions({ id, type, attributes, relationships }: Entity): EntityOption {
  const defaultOption: EntityOption = {
    value: +id,
    text: attributes.short_name || attributes.name,
    disabled: false,
  };

  const types = {
    tags(data: EntityOption) {
      data.type = attributes.type;
      return data;
    },
    faculties(data: EntityOption) {
      data.popular = Boolean(attributes.properties?.popular);

      const presentationField = Array.isArray(attributes?.custom_field_values) && attributes?.custom_field_values.length ? attributes.custom_field_values.find((field) => Object.keys(field).includes('presentation')) : {};

      data.presentation = presentationField?.presentation || '';
      data.direction = (relationships as FacultyRelationship)?.direction?.data.id;
      data.text = attributes.name;
      data.slug = attributes.slug;

      return data;
    },
    levels(data: EntityOption) {

      data.tags = (relationships as LevelRelationship)?.tags?.data?.map((tag: { id: string, type: 'tags' }) => +tag.id) || [];
      data.rank = attributes?.rank || 0;

      return data;
    },
    directions(data: EntityOption) {
      data.slug = attributes.slug;
      return data;
    },
  };

  return Object.hasOwn(types, type)
    ? types[type as keyof typeof types](defaultOption)
    : defaultOption;
}

function getProgramCardTemplate(type: 'programs' | 'courses', id: string, attributes: ProgramAttributesObject | CourseAttributesObject): ProgramCard {
  const isProgramAttributes = (type: 'programs' | 'courses', attributes: ProgramAttributesObject | CourseAttributesObject): attributes is ProgramAttributesObject  => type === 'programs';

  const isProgram = isProgramAttributes(type, attributes);

  return {
    id,
    type,
    name: attributes.name,
    faculty: {} as EntityOption,
    level: isProgram ? {} as EntityOption : { text: 'Курсы', value: 1000 },
    forms: {} as Record<number, EntityOption>,
    place: attributes.properties?.international || '',
    tags: {} as Record<number, EntityOption>,
    link: '/' + attributes.url,
    new: Boolean(attributes?.is_new),
    isPopular: false,
    partner: isProgram ? Boolean(attributes.properties?.partner_show) : false,
    published_at: attributes.published_at,
    popup: true,
    customFields: attributes.custom_field_values,
    presentation: '',
    rank: attributes?.rank || 0,
    direction_ico: '',
  };
}

function makeRelationArray(
  relations: RelationsMap,
  relationData: ResourceIdentifierObject[],
) {
  return relationData.reduce((acc, { id }) => {
    const { type } = relationData.at(0) as ResourceIdentifierObject;

    return Object.assign(acc, { [id]: relations[type as EntityTypes][+id] });
  }, {});
}

function makeRelation(
  relations: RelationsMap,
  relationData: ResourceIdentifierObject,
) {
  if (!relationData) return { text: '', value: 0 };

  const { id, type } = relationData;

  return {
    text: relations[type as EntityTypes][+id]['text'],
    value: relations[type as EntityTypes][+id]['value'],
  };
}

function getDirectionIconName(slug: string): string {
  const slugToIconMap: Record<string, string> = {
    'texniceskoe': 'faculty_1',
    'gumanitarnoe': 'faculty_2',
    'medicinskoe': 'faculty_3',
    'tvorceskoe': 'faculty_4',
    'ekonomiceskoe': 'faculty_5',
  };

  return slugToIconMap[slug] ?? '';
}

type RelationsMap = Record<
  EntityTypes,
  {
    [key: number]: EntityOption;
  }
>;

type ProgramRelationsNames = 'faculty' | 'level' | 'forms' | 'tags';
type CourseRelationsNames = 'faculty' | 'forms' | 'tags';
type EntityTypes = 'faculties' | 'levels' | 'forms' | 'tags' | 'directions';

interface Entity {
  id: string;
  type: EntityTypes;
  attributes: {
    name: string;
    short_name?: string;
    properties?: Record<string, unknown>;
    custom_field_values?: Record<string, unknown>[];
    [key: string]: unknown;
  };
  relationships: Record<string, unknown>;
}

interface UnionFilterResponse {
  data: Array<CourseResource | ProgramResource>;
  included: Entity[];
}

interface LevelRelationship extends Record<string, unknown>{
  tags: {
    data: {
      id: string,
      type: 'tags'
    }[];
  };
}

interface FacultyRelationship extends Record<string, unknown>{
  direction: {
    data: {
      id: string,
      type: 'directions'
    };
  };
}
