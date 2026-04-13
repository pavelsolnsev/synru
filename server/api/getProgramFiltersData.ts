import type { CourseResource, Entity, ProgramResource } from '~/types/entities';
import type { DocumentMetaObject, TopLevelLinksObject } from '~/types/JsonApi';
import { transformProgramFiltersData } from '~/utils/transformProgramFiltersData';
import { KEYS } from '~/constants';
import { ONE_HOUR } from '~/constants/timeToCache';

const HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const QUERY_PROGRAMS = {
  include: 'faculty.direction,level.tags,forms,tags',
  'fields[programs]': 'id,name,properties,rank,faculty_id,level_id,slug,published_at',
  'fields[faculties]': 'id,slug,name,direction_id,rank,intro_image',
  'fields[forms]': 'id,short_name',
  'fields[tags]': 'id,name,type',
  'fields[directions]': 'id,slug',
  'fields[levels]': 'id,name,rank,properties',
  'filter[published]': true,
  'page[size]': 0,
  nolinks: 1,
  sort: '-rank,id',
};

const QUERY_COURSES = {
  include: 'faculty.direction,direction,forms,tags',
  'fields[courses]': 'id,name,properties,rank,faculty_id,slug,published_at,direction_id',
  'fields[faculties]': 'id,slug,name,direction_id,rank,intro_image',
  'fields[forms]': 'id,short_name',
  'fields[tags]': 'id,name,type',
  'fields[directions]': 'id,slug',
  'filter[published]': true,
  'page[size]': 0,
  nolinks: 1,
  sort: '-rank,id',
};

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const results = await Promise.all([
      $fetch<ProgramsFilterResponse>(`${config.public.apiBase}/api/programs`, {
        headers: HEADERS,
        query: QUERY_PROGRAMS,
      }),
      $fetch<CoursesFilterResponse>(`${config.public.apiBase}/api/courses`, {
        headers: HEADERS,
        query: QUERY_COURSES,
      }),
    ]).then(([programs, courses]: [ProgramsFilterResponse, CoursesFilterResponse]) => {
      const data = [...programs.data, ...courses.data];

      const includedMap = new Map();

      [programs, courses].forEach((collection) => {
        collection.included.forEach((entity) => {
          includedMap.set(`${entity.type}_${entity.id}`, entity);
        });
      });

      const included = Array.from(includedMap.values());

      return transformProgramFiltersData({
        data,
        included,
      });
    });

    return results;

  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.PROGRAMS_FILTERS_DATA,
  getKey: () => 'default',
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
