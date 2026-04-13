import type { Entity, ProgramResource } from '~/types/entities';
import type { DocumentMetaObject, TopLevelLinksObject } from '~/types/JsonApi';
import { transformProgramFiltersData } from '~/utils/transformProgramFiltersData';
import { KEYS } from '~/constants';
import { ONE_HOUR } from '~/constants/timeToCache';

const mtiIds = '198,215,257,269,337,404,72,17,60,330,255,328,415,417,413,411,15,292,339,224,45,128,43,175,407,529,122,258,270,338,405,18,61,331,256,329,416,418,414,412,16,293,340,46,129,44,176,123,73';

const HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const QUERY_PROGRAMS = {
  include: 'faculty.direction,level.tags,forms,tags',
  'fields[programs]': 'id,name,properties,rank,faculty_id,level_id,slug,published_at',
  'fields[faculties]': 'id,slug,name,direction_id,rank',
  'fields[forms]': 'id,short_name',
  'fields[tags]': 'id,name,type',
  'fields[directions]': 'id,slug',
  'fields[levels]': 'id,name,rank,properties',
  'filter[published]': true,
  'filter[id]': mtiIds,
  'page[size]': 0,
  nolinks: 1,
  sort: '-rank,id',
};

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const results = await $fetch<ProgramsFilterResponse>(`${config.public.apiBase}/api/programs`, {
      headers: HEADERS,
      query: QUERY_PROGRAMS,
    }).then((programs: ProgramsFilterResponse) => {
      const data = [...programs.data];

      const includedMap = new Map();

      programs.included.forEach((entity) => {
        includedMap.set(`${entity.type}_${entity.id}`, entity);
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
  name: KEYS.PROGRAMS_FILTERS_DATA_MTI,
  getKey: () => 'default',
});

interface ProgramsFilterResponse {
  data: ProgramResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}

