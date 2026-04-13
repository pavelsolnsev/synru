import type { FacultyEntity } from '~/types';

export default defineEventHandler(async (event): Promise<FacultyByProgramIdResponse | undefined>  => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;
  try {
    const query = getQuery(event);
    return await $fetch(`${config.public.apiBase}/api/courses/${id}/faculty`, {
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

interface FacultyByProgramIdResponse {
  data: {
    id: string;
    type: 'faculties';
    attributes: FacultyEntity;
  },
  included?: FacultyIncluded[]
}

interface FacultyIncluded {
  id: string;
  attributes: {
    name: string;
    value: unknown;
  }
}

