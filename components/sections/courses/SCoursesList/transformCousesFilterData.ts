import type {
  TopLevelLinksObject,
  DocumentMetaObject,
} from '~/types';
import type { CourseResource, Entity } from '~/types/entities';

export function transform({ data, included }: {
  data: CourseResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}) {
  if (!data) return [];

  const { forms, directions } = included.reduce((acc, entity) => {
    if (['forms', 'directions'].includes(entity.type)) {
      acc[entity.type as keyof typeof acc][entity.id] = {
        id: entity.id,
        name: entity.type === 'directions' ? entity.attributes.name : entity.attributes.short_name!,
      };
    }

    return acc;

  }, { forms: {} as RelationshipOptions, directions: {} as RelationshipOptions });

  const coursesTypes = {
    upSix: {
      isActive: false,
      directions: {} as RelationshipOptions,
    },
    fromSix: {
      isActive: true,
      directions: {} as RelationshipOptions,
    },
    isMini: {
      isActive: false,
      directions: {} as RelationshipOptions,
    },
  };

  const courses: CourseData[] = [];

  data.forEach(({ id, attributes, relationships }) => {

    const isMini = Boolean(attributes.properties?.is_mini);
    const duration = Number(attributes.properties?.duration_days) || 0;

    const course: CourseData = {
      id,
      isMini,
      duration,
      type: 'courses',
      name: attributes.name,
      place: attributes.properties?.international || '',
      partner: Boolean(attributes.properties?.partner_show) || false,
      link: '/' + attributes.url,
      direction: {} as { id: string, name: string },
      forms: '',
      new: Boolean(attributes.is_new),
      courseType: isMini ? 'isMini' : duration >= 180 ? 'fromSix' : 'upSix',
    };

    course.direction = directions[relationships.direction.data.id];

    const formId = relationships.forms.data.at(0)?.id || undefined;

    course.forms = formId ? forms[formId].name : 'Онлайн';

    courses.push(course);

    coursesTypes[course.courseType].directions = Object.assign(coursesTypes[course.courseType].directions, { [course.direction.id]: course.direction });
  });

  return { courses, coursesTypes };
}

export type RelationshipOptions = Record<string, { id: string, name: string } >;

export interface CourseData {
  id: string;
  name: string;
  place: string;
  partner: boolean;
  type: 'courses';
  duration: number;
  direction: { id: string, name: string };
  forms: string;
  link: string;
  isMini: boolean;
  new: boolean;
  courseType: 'upSix' | 'fromSix' | 'isMini';
}
