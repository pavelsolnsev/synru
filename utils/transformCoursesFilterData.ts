import type { Entity, CourseResource  } from '~/types/entities';
import type { Nullable } from '~/types';

export function transformCoursesFilterData(response: CourseResponse) {
  if (!response) return [];

  const relationsMap: RelationsMap = {
    faculties: {},
    forms: {},
    directions: {},
    tags: {},
  };

  const includedHandler: Record<
    EntityTypes,
    (include: Entity) => EntityOption
  > = {
    faculties(include: Entity) {
      return {
        value: Number(include.id),
        text: include.attributes.short_name || include.attributes.name,
        disabled: false,
        slug: include.attributes.slug,
        rank: include.attributes.rank,
      } satisfies EntityOption;
    },
    forms(include: Entity) {
      return {
        value: Number(include.id),
        text: include.attributes.short_name || include.attributes.name,
        disabled: false,
      } satisfies EntityOption;
    },
    directions(include: Entity) {
      return {
        value: Number(include.id),
        text: include.attributes.name,
        disabled: false,
      } satisfies EntityOption;
    },
    tags(include: Entity) {
      return {
        value: Number(include.id),
        text: include.attributes.name,
        disabled: false,
      } satisfies EntityOption;
    },
  };

  response.included.forEach((include) => {
    if (!Object.hasOwn(relationsMap, include.type)) return;

    if (!Object.hasOwn(includedHandler, include.type)) {
      console.error(`Included handler for ${include.type} not found`);
      return;
    }

    const type = include.type as EntityTypes;

    relationsMap[type][+include.id] = includedHandler[type](include);
  });

  const coursesTypes = {
    fromSix: {
      isActive: false,
      directions: {} as EntityOption,
    },
    upSix: {
      isActive: true,
      directions: {} as EntityOption,
    },
    isMini: {
      isActive: false,
      directions: {} as EntityOption,
    },
    isExpress: {
      isActive: false,
      directions: {} as EntityOption,
    },
  };

  const courses: CourseData[] = [];

  response.data.forEach(({ id, attributes, relationships }) => {
    const isMini = Boolean(attributes.properties?.is_mini);
    const isExpress = Boolean(attributes.properties?.is_express);
    const duration = Number(attributes.properties?.duration_days) || 0;

    const course: CourseData = {
      id,
      isMini,
      isExpress,
      duration,
      type: 'courses',
      name: attributes.name,
      place: attributes.properties?.international || '',
      partner: Boolean(attributes.properties?.partner_show) || false,
      partnerLogo: attributes.properties?.partner_logo || '',
      partnerText: attributes.properties?.partner_text || '',
      partnerBonus: attributes.properties?.partner_bonuses || '',
      link: '/' + attributes.url,
      direction: {} as EntityOption,
      forms: {},
      faculty: {} as EntityOption,
      tags: relationships.tags?.data?.map((tag: { id: string }) => +tag.id) || [],
      new: Boolean(attributes.is_new),
      courseType: isMini ? 'isMini' : isExpress ? 'isExpress' : duration >= 180 ? 'fromSix' : 'upSix',
      price: attributes.properties?.price,
    };

    const directionId = +relationships.direction.data?.id || null;

    if (directionId && relationsMap.directions[directionId]) {
      course.direction = relationsMap.directions[directionId];
      coursesTypes[course.courseType].directions[directionId] = Object.assign({},course.direction);
    }

    const formIds =
      relationships.forms.data.map((form: { id: string }) => +form.id) || [];

    course.forms = formIds.reduce(
      (acc: Record<number, EntityOption>, formId: number) => {
        acc[formId] = relationsMap.forms[formId];
        return acc;
      },
      {} satisfies Record<number, EntityOption>,
    );

    const facultyId = +relationships.faculty.data?.id || null;

    if (facultyId && relationsMap.faculties[facultyId]) {
      course.faculty = relationsMap.faculties[facultyId];
    }

    courses.push(course);
  });

  return { courses, coursesTypes, ...relationsMap, tags: Object.values(relationsMap.tags) };
}

interface CourseResponse {
  data: CourseResource[];
  included: Entity[];
}

export type RelationshipOptions = Record<string, { id: string; name: string }>;

export interface CourseData {
  id: string;
  name: string;
  place: string;
  partner: boolean;
  partnerLogo: string;
  partnerText: string;
  partnerBonus: string;
  type: 'courses';
  duration: number;
  direction: EntityOption;
  forms: Record<number, EntityOption>;
  faculty: EntityOption;
  tags: number[];
  link: string;
  isMini: boolean;
  isExpress: boolean;
  new: boolean;
  courseType: 'upSix' | 'fromSix' | 'isMini' | 'isExpress';
  price: Nullable<number>;
}

type RelationsMap = Record<
  EntityTypes,
  {
    [key: number]: EntityOption;
  }
>;

type EntityTypes = 'faculties' | 'forms' | 'directions' | 'tags';

export interface EntityOption {
  value: number;
  text: string;
  disabled?: false;
  [key: string]: unknown;
}
