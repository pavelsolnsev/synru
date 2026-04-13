import type { CourseResource, Entity } from '~/types/entities';
import type { DocumentMetaObject, TopLevelLinksObject } from '~/types/JsonApi';
import { transformCoursesFilterData } from '~/utils/transformCoursesFilterData';
import { KEYS } from '~/constants';
import { ONE_HOUR } from '~/constants/timeToCache';

const HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const QUERY = {
  include: 'faculty.direction,direction,forms,tags',
  'fields[courses]': 'id,name,properties,rank,faculty_id,slug,published_at,direction_id',
  'fields[faculties]': 'id,slug,name,short_name,direction_id,rank',
  'fields[forms]': 'id,short_name',
  'fields[tags]': 'id,name,type',
  'fields[directions]': 'id,name,slug',
  'filter[published]': true,
  'page[size]': 0,
  nolinks: 1,
  sort: '-price_rank',
};

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const { data, included } =  await $fetch<CoursesFilterResponse>(`${config.public.apiBase}/api/courses`, {
      headers: HEADERS,
      query: QUERY,
    });

    return transformCoursesFilterData({ data, included });
  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.COURSES_FILTER_DATA,
  getKey: () => 'default',
});

interface CoursesFilterResponse {
  data: CourseResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}
