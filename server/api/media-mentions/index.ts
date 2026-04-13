import type { DocumentMetaObject } from '~/types';
import type { MediaMentionsResource } from '~/types/entities';

export default defineEventHandler(
  async (event): Promise<MediaMentionsResource | undefined> => {
    const config = useRuntimeConfig(event);

    try {
      const query = getQuery(event);
      return await $fetch<MediaMentionsResource>(`${config.public.apiBase}/api/media-mentions`,{
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        query,
      });
    } catch (err) {
      console.error(err);
    }
  },
);

export interface MediaMentionResponse {
  data: MediaMentionsResource[];
  meta: DocumentMetaObject;
}
