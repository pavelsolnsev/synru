import type { FormResource } from "~/types/entities";

export default defineEventHandler(async (event): Promise<{ data: FormResource[] } | undefined>  => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;
  try {
    const query = getQuery(event);
    return await $fetch(`${config.public.apiBase}/api/mba-programs/${id}/forms`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query,
    });
  } catch (err) {
    console.error(err);
  }
})