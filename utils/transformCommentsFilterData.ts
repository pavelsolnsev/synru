import type { EntityTypes, RelationshipObject, ResourceIdentifierObject } from '~/types';
import type { CommentAttributesObject, CommentResource, Entity } from '~/types/entities';

export function transformCommentsFilterData(response: { data: CommentResource[], included: Entity[]; }) {
  const {
    data,
    included = [],
  } = response;

  const relationsMap: RelationsMap = {
    cities: {},
    courses: {},
    directions: {},
    customEntities: {},
    'custom-entities': {},
    faculties: {},
    programs: {},
    levels: {},
  };

  const COMMENT_RELATION_ALIASES: Record<CommentEntityRelation, {
    entityType: CommentEntityRelation;
    commentKey: CommentRelationTarget;
  }> = {
    cities: { entityType: 'cities', commentKey: 'cities' },
    courses: { entityType: 'courses', commentKey: 'courses' },
    'custom-entities': { entityType: 'custom-entities', commentKey: 'customEntities' },
    customEntities: { entityType: 'custom-entities', commentKey: 'customEntities' },
    faculties: { entityType: 'faculties', commentKey: 'faculties' },
    programs: { entityType: 'programs', commentKey: 'programs' },
    levels: { entityType: 'levels', commentKey: 'levels' },
    directions: { entityType: 'directions', commentKey: 'directions' },
  };

  try {
    included.forEach((entity) => {
      if (!Object.hasOwn(relationsMap, entity.type)) return;

      relationsMap[entity.type as CommentEntityRelation][+entity.id] = makeOptions(entity);

    });
  } catch (e) {
    console.error(e);
  }

  let comments: Comment[] = [];

  const commentsMap: Record<string, Comment> = {};

  try {
    comments = data.map(({ id, attributes, relationships }) => {
      const comment = getCommentTemplate(id, attributes);

      (Object.keys(relationships) as CommentEntityRelation[]).forEach((relation) => {
        const relationConfig = COMMENT_RELATION_ALIASES[relation];
        if (!relationConfig) return;

        const relationData = relationships[relation]?.data ?? [];

        comment[relationConfig.commentKey] = makeRelationArray(
          relationsMap,
          relationConfig.entityType,
          relationData,
        );
      });

      commentsMap[comment.id] = comment;
      return comment;
    });
  } catch(e) {
    console.error(e);
  }
  return {
    comments,
    commentsMap,
    ...relationsMap,
  };
}

function makeOptions({ id, attributes }: Entity): EntityOption {
  const defaultOption: EntityOption = {
    value: +id,
    text: attributes.short_name || attributes.name,
  };

  return defaultOption;;
}

function getCommentTemplate(id: string, attributes: CommentAttributesObject): Comment {
  const {
    name,
    description,
    image,
    media,
    media_type,
    rank,
    text,
  } = attributes;

  return {
    id,
    type: 'comments',
    name,
    faculties: {},
    levels: {},
    cities: {},
    courses: {},
    directions: {},
    customEntities: {},
    'custom-entities': {},
    programs: {},
    description: description ?? '',
    image: image ?? '',
    media: media ?? '',
    media_type: media_type ?? '',
    rank: rank ?? 0,
    text: text ?? '',
  };
}

function makeRelationArray(
  relations: RelationsMap,
  relationType: CommentEntityRelation,
  relationData: RelationshipObject['data'],
): Record<number, EntityOption> {
  if (!Array.isArray(relationData)) return {};

  return relationData.reduce((acc, relation) => {
    const entityId = +relation.id;
    const entity = relations[relationType][entityId];
    if (!entity) return acc;

    acc[entityId] = entity;
    return acc;
  }, {} as Record<number, EntityOption>);
}

type CommentEntityRelation = Extract<
  EntityTypes,
  'cities' | 'courses' | 'custom-entities' | 'customEntities' | 'faculties' | 'programs' | 'levels' | 'directions'
>;

type CommentRelationTarget = keyof Pick<Comment,
  'cities' | 'courses' | 'directions' | 'custom-entities' | 'customEntities' | 'faculties' | 'programs' | 'levels'
>;

type RelationsMap = Record<
  CommentEntityRelation,
  {
    [key: number]: EntityOption;
  }
>;

interface EntityOption {
  value: number;
  text: string;
  disabled?: false;
  [key: string]: unknown;
}

export interface Comment {
  id: string;
  name: string;
  type: 'comments';
  cities: Record<number, EntityOption>;
  courses: Record<number, EntityOption>;
  directions: Record<number, EntityOption>;
  customEntities: Record<number, EntityOption>;
  'custom-entities': Record<number, EntityOption>;
  faculties: Record<number, EntityOption>;
  programs: Record<number, EntityOption>;
  levels: Record<number, EntityOption>;
  description: string;
  image: string;
  media: string;
  media_type: string;
  rank: number;
  text: string;
}

export interface TransformComments extends RelationsMap {
  comments: Comment[];
  commentsMap: Record<string, Comment>;
}
