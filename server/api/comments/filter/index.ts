import { FIVE_MIN } from '~/constants/timeToCache';
import { KEYS } from '~/constants';
import type { CommentResource, Entity  } from '~/types/entities';
import type { DocumentMetaObject, TopLevelLinksObject } from '~/types/JsonApi';
import { transformCommentsFilterData } from '~/utils/transformCommentsFilterData';

const headers = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const query = {
  include: 'levels,faculties,programs,cities,courses,directions,customEntities',
  'page[size]': 0,
  'filter[published]': true,
  sort: 'rank',
};

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const result = await $fetch<CommentsResponse>(`${config.public.apiBase}/api/comments`, {
      headers,
      query,
    });

    const {
      data,
      included,
    } = result;

    return transformCommentsFilterData({
      data,
      included,
    });

  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: FIVE_MIN,
  name: KEYS.COMMENTS_FILTER_DATA,
  getKey: () => 'default',
});

interface CommentsResponse {
  data: CommentResource[];
  included: Entity[];
  links: TopLevelLinksObject;
  meta: DocumentMetaObject;
}
