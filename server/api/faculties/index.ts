import type { RelationshipObject, ResourceObject } from '~/types';
import type { FacultiesResource } from '~/types/entities';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const query = getQuery(event);
    return await $fetch<FacultiesResponse>(`${config.public.apiBase}/api/faculties`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query,
    });
  } catch (err) {
    console.error(err);
  }
});

export interface FacultiesResponse {
  data: FacultiesResource<RelationshipObject>[],
  included?: ResourceObject[],
}
