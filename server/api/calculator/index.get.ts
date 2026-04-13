import type { Entity, ProgramResource } from '~/types/entities';
import type { DocumentMetaObject, TopLevelLinksObject } from '~/types/JsonApi';
import { transformProgramFiltersData } from '~/utils/transformProgramFiltersData';

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

const SCORE_SUBJECTS = [
  'rus',
  'math',
  'physics',
  'informatic',
  'biology',
  'history',
  'social',
  'literature',
  'foreign_language',
  'chemistry',
  'geography',
];

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const query = getQuery(event);
  const scoreFilter: string[] = [];

  SCORE_SUBJECTS.forEach((subject) => {
    if (query[subject] && typeof query[subject] === 'string') {
      scoreFilter.push(subject + ':' + encodeURIComponent(query[subject]));
    }
  });

  try {
    const results = await $fetch<ProgramsFilterResponse>(`${config.public.apiBase}/api/programs`, {
      headers: HEADERS,
      query: {
        'filter[score]': scoreFilter.join(','),
        ...QUERY_PROGRAMS,
      },
    });

    const data = [...results.data];

    const includedMap = new Map();

    results.included.forEach((entity) => {
      includedMap.set(`${entity.type}_${entity.id}`, entity);
    });

    const included = Array.from(includedMap.values());

    return transformProgramFiltersData({
      data,
      included,
    });

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

