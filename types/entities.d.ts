import type { ResourceIdentifierObject } from './JsonApi';
import type { LevelCustomFields } from './LevelEntity';
import type { Nullable } from './common';

export interface ProgramResource {
  id: string;
  type: 'programs';
  attributes: ProgramAttributesObject;
  relationships: ProgramRelationshipsObject;
}

export interface ProgramAttributesObject {
  name: string;
  slug: string;
  image: string | null;
  annotation: string | null;
  content: string | null;
  published: boolean;
  comment: string | null;
  properties: {
    title: string | null;
    for_dubai: boolean;
    description: string | null;
    partner_show: boolean;
    show_section_resume: boolean;
    show_section_employment: boolean;
    international: string;
    price: Nullable<number>;
    partner_logo: Nullable<string>;
    partner_text: Nullable<string>;
    partner_bonuses: Nullable<string>;
  };
  is_new: boolean;
  url: string;
  rank: number;
  direction_id: string;
  published: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  custom_field_values: Array<{
    [key: string]: unknown[];
  }>;
}

export interface ProgramRelationshipsObject {
  faculty: RelationshipObject;
  forms: RelationshipObject;
  level: RelationshipObject;
  persons: RelationshipObject;
  customFieldValues: RelationshipObject;
  lock: RelationshipObject;
  tags: RelationshipObject;
}

export interface FacultiesResource<T> {
  id: string;
  type: 'faculties';
  attributes: FacultiesAttributesObject;
  relationships?: FacultiesRelationshipsObject<T>;
}

export interface FacultiesRelationshipsObject<T> {
  levels?: T;
}

export interface FacultiesAttributesObject {
  created_at: string;
  description?: string;
  id: number | string;
  intro_image?: string;
  name: string;
  preview_image?: string;
  properties: {
    title?: string;
    description?: string;
    advanced_short_name?: string;
    advanced_name?: string;
    form_title?: string;
  };
  published: boolean;
  rank: number;
  short_name?: string;
  slug: string;
  updated_at: string;
  url: string | null;
}

export interface PersonResource {
  id: string;
  type: 'persons';
  attributes: PersonAttributesObject;
  relationships: PersonRelationshipsObject;
}

export interface PersonAttributesObject {
  surname: string;
  name: string;
  patronymic?: string;
  description: string;
  photo: string;
  position: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  regalia: string;
  slug: string;
}

export interface ProgramRelationshipsObject {
  programs: RelationshipObject;
  lock: RelationshipObject;
  tags: RelationshipObject;
}

export interface SchoolProgramResource {
  id: string;
  type: 'school_programs';
  attributes: SchoolProgramAttributesObject;
  relationships: SchoolProgramRelationshipsObject;
}

export interface SchoolProgramAttributesObject {
  name: string;
  slug: string;
  content: string;
  published: boolean;
  properties: [] | {
    title: string;
    description: string;
  };
  created_at: string;
  updated_at: string;
  custom_field_values: Array<CustomFieldSchoolPreview>;
}

export interface SchoolProgramRelationshipsObject {
  persons: RelationshipObject;
  lock: RelationshipObject;
  forms: RelationshipObject;
  customFieldValues: RelationshipObject;
}

export interface FormResource {
  id: string;
  type: 'forms';
  attributes: FormAttributesObject;
  relationships: FormRelationshipsObject;
}

export interface FormAttributesObject {
  name: string;
  slug: string;
  short_name: string;
  description: string;
  rank: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  properties: [] | {
    title: string;
    description: string;
  };
}

export interface FormRelationshipsObject {
  programs: RelationshipObject;
  lock: RelationshipObject;
}

export interface CourseResource {
  id: string;
  type: 'courses';
  attributes: CourseAttributesObject;
  relationships: CourseRelationshipsObject;
}

export interface CourseAttributesObject {
  name: string;
  slug: string;
  annotation: Nullable<string>;
  content: Nullable<string>;
  image: Nullable<string>;
  published: boolean;
  comment: Nullable<string>;
  properties: {
    title: Nullable<string>;
    description: Nullable<string>;
    international: Nullable<string>;
    duration_days: string;
    partner_show: boolean;
    is_mini: boolean;
    is_express: boolean;
    price: Nullable<number>;
    partner_logo: Nullable<string>;
    partner_text: Nullable<string>;
    partner_bonuses: Nullable<string>;
  }
  is_new: boolean;
  url: string;
  rank: number;
  direction_id: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  custom_field_values: Array<{
    [key: string]: unknown[];
  }>;
}

export interface CourseRelationshipsObject {
  customFieldValues: RelationshipObject;
  direction: RelationshipObject;
  faculty: RelationshipObject;
  forms: RelationshipObject;
  persons: RelationshipObject;
  tags: RelationshipObject;
  lock: RelationshipObject;
}

export interface BsProgramResource {
  id: string;
  type: 'bs-entity';
  attributes: BsProgramAttributesObject;
  relationships: BsProgramRelationshipsObject;
}

export interface BsProgramAttributesObject {
  name: string;
  slug: string;
  type: string;
  bs_id: string;
  published: boolean;
  properties: {
    attributes: {
      format: string;
    },
    blocks: {
      id: string,
      type: 'blocks',
      attributes: {
        key: string,
        content?: {
          title: string,
          items: {
            [key: string]: unknown
          }[],
        },
      }
    }[],
    [key: string]: unknown;
  }
  created_at: string;
  updated_at: string;
  custom_field_values: BsProgramCustomField[];
}

export interface BsProgramRelationshipsObject {
  customFieldValues: RelationshipObject;
  lock: RelationshipObject;
}

export interface MbaProgramResource {
  id: string;
  type: 'mba-programs';
  attributes: MbaProgramAttributesObject;
  relationships: MbaProgramRelationshipsObject;
}

export interface MbaProgramAttributesObject {
  name: string;
  slug: string;
  annotation: string;
  image_url: string;
  published: boolean;
  properties?: {
    title?: string;
    description?: string;
  };
  rank: number;
  custom_field_values: Array<{
    [key: string]: unknown[];
  }>;
}

export interface MbaProgramRelationshipsObject {
  customFieldValues: RelationshipObject;
  categories: RelationshipObject;
  forms: RelationshipObject;
}

export interface LevelResource {
  id: string;
  type: 'levels';
  attributes: LevelAttributesObject;
  relationships: LevelRelationshipsObject;
}

export interface LevelAttributesObject {
  created_at?: string
  custom_field_values?: LevelCustomFields[]
  description?: Nullable<string>;
  id?: number | string;
  name: string
  programs_count?: number
  properties?: {
    title: Nullable<string>;
    description: Nullable<string>;
  }
  published?: boolean
  rank?: number
  slug?: string;
  updated_at?: string
  url?: string
}

export interface LevelRelationshipsObject {
  customFieldValues: RelationshipObject;
  programs: RelationshipObject;
  tags: RelationshipObject;
}

export interface PageResource {
  id: string;
  type: 'pages';
  attributes: PageAttributesObject;
  relationships: PageRelationshipsObject;
}

export interface PageAttributesObject {
  name: string;
  created_at?: string
  description?: Nullable<string>;
  published?: boolean;
  rank?: number;
  uri?: string;
  updated_at?: string;
  url?: string;
  entity_class?: string;
  entity: Nullable<Entity['attributes']>;
  route_name: string;
  properties?: {
    title: Nullable<string>;
    description: Nullable<string>;
  };
  sections: {
    key: string;
    items: {
      [key: string]: unknown;
    }
  }[];
}

export interface PageRelationshipsObject {
  template: RelationshipObject;
  parent: RelationshipObject;
}

export interface CommentResource {
  id: string;
  type: 'comments';
  attributes: CommentAttributesObject;
  relationships: CommentRelationshipsObject;
}

export interface CommentAttributesObject {
  name: string;
  created_at: string;
  description: Nullable<string>;
  image: Nullable<string>;
  media: Nullable<string>;
  media_type: Nullable<string>;
  properties: string[];
  published: boolean;
  published_at: Nullable<string>
  rank: number
  text: Nullable<string>
  updated_at: Nullable<string>
}

export interface CommentRelationshipsObject {
  cities: RelationshipObject;
  courses: RelationshipObject;
  customEntities: RelationshipObject;
  'custom-entities': RelationshipObject;
  directions: RelationshipObject;
  faculties: RelationshipObject;
  levels: RelationshipObject;
  programs: RelationshipObject;
}

export interface ArticleResource {
  id: string;
  type: 'articles';
  attributes: ArticleAttributesObject;
  relationships: ArticleRelationshipsObject;
}

interface ArticleAttributesObject {
  title: string;
  slug: string;
  image: string;
  annotation: string;
  content: string;
  properties: {
    title: string;
    keywords: Nullable<string>;
    description: string;
  };
  published_at: string;
  created_at: string;
  updated_at: string;
  modx_id: number;
  published: boolean;
  url: string;
}

interface ArticleRelationshipsObject {
  categories: { data: Array<{ id: number; type: 'categories' }> };
  customFieldValues: RelationshipObject;
  persons: RelationshipObject;
}

export interface NewsResource {
  id: string;
  type: 'news';
  attributes: NewsAttributesObject;
  relationships?: NewsRelationshipsObject;
}

interface NewsAttributesObject {
  title: string;
  slug: string;
  image: Nullable<string>;
  annotation: Nullable<string>;
  content: Nullable<string>;
  properties: {
    title: Nullable<string>;
    keywords: Nullable<string>;
    description: Nullable<string>;
  };
  published_at: string;
  created_at: string;
  updated_at: string;
  modx_id: Nullable<number>;
  published: boolean;
  url: string;
}

interface NewsRelationshipsObject {
  categories: RelationshipObject;
  customFieldValues: RelationshipObject;
  persons: RelationshipObject;
}

export interface CategoryResource {
  id: string;
  type: 'categories';
  attributes: CategoryAttributesObject;
  relationships?: CategoryRelationshipsObject;
}

interface CategoryAttributesObject {
  name: string;
  slug: string;
  description: string;
  entity_type: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  url: string;
}

export interface CategoryDescendantsAttributesObject extends CategoryAttributesObject {
  path: string;
  depth: string;
}

export interface CategoryRelationshipsObject {
  descendants?: { data: ResourceIdentifierObject[] };
  children?: { data: ResourceIdentifierObject[] };
  parent?: { data: ResourceIdentifierObject }
  ancestors?: { data: ResourceIdentifierObject[] }
}

export interface CategoryResponse {
  data: CategoryResource | CategoryResource[];
  included?: Entity[];
}

export interface CategoryEntity extends CategoryAttributesObject {
  id: number;
}

export interface MediaMentionsResource {
  id: string;
  type: 'media-mentions';
  attributes: MediaMentionsAttributes;
}

export interface MediaMentionsAttributes {
  title: string;
  slug: string;
  annotation: string;
  source_name: Nullable<string>;
  published_at: string;
  properties: {
    title: Nullable<string>;
    keywords: Nullable<string>;
    description: Nullable<string>;
  };
  created_at: string;
  updated_at: string;
  published: boolean;
  url: string;
}

export interface GalleriesResource {
  id: string;
  type: 'galleries';
  attributes: GalleriesAttributes;
}

interface GalleriesAttributes {
  title: string;
  type: 'image' | 'video';
  preview_image: string;
  media_source: 'rutubeId' | 'url';
  media: string;
  published_at: string;
  properties: Nullable<{
    title: Nullable<string>;
    description: Nullable<string>;
  }>;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface GalleriesResponse {
  data: GalleriesResource[];
  meta: DocumentMetaObject;
}

export interface DocumentsResource {
  id: string;
  type: 'documents';
  attributes: DocumentsAttributes;
  relationships?: DocumentsRelationshipsObject;
}

interface DocumentsAttributes {
  slug: string;
  name: string;
  description: string;
  link: string;
  published: boolean;
  rank: number;
  properties: {
    title: Nullable<string>;
    description: Nullable<string>;
  };
  created_at: string;
  updated_at: string;
  url: string;
}

interface DocumentsRelationshipsObject {
  categories: { data: ResourceIdentifierObject[] };
}

export interface DocumentsResponse {
  data: DocumentsResource | DocumentsResource[];
  included?: Entity[];
}

export interface DocumentEntity extends DocumentsAttributes {
  id: number;
}

interface Entity {
  id: string;
  type: string;
  attributes: {
    name: string;
    short_name?: string;
    properties?: Record<string, unknown>;
    custom_field_values?: Record<string, unknown>[];
    [key: string]: unknown;
  };
  relationships: Record<string, unknown>;
}
