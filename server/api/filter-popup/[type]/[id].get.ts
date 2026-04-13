import type { CourseResource, Entity, ProgramResource } from '~/types/entities';
import type { DocumentMetaObject, TopLevelLinksObject } from '~/types/JsonApi';

export default defineEventHandler(async (event): Promise<UnionFilterResponse | undefined> => {
  const config = useRuntimeConfig();
  const { type, id } = getRouterParams(event);

  if (!['programs', 'courses'].includes(type)) {
    createError({
      status: 400,
    });
  }

  try {
    const entity: ProgramsFilterResponse | CoursesFilterResponse = await $fetch(`${config.public.apiBase}/api/${type}/${id}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query: {
        include: ['customFieldValues', type === 'courses' ? 'direction' : ''].join(),
      },
    });

    return entity;

  } catch (err) {
    console.error(err);
  }
});

interface ProgramsFilterResponse {
  data: ProgramResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}

interface CoursesFilterResponse {
  data: CourseResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}

interface UnionFilterResponse {
  data: Array<CourseResource | ProgramResource>;
  included: Entity[];
}
