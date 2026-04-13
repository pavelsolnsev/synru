export interface ResponseNews {
  data: News[]
  included: NewsIncludedTagData[]
}

interface News {
  id: string;
  type: string;
  attributes: NewsAttributes;
  relationships: Relationships;
}

interface NewsAttributes {
  title: string;
  slug: string;
  preview_image?: string;
  annotation?: string;
  content?: string;
  author_id?: number;
  published_at: string;
  published?: boolean;
  properties?: unknown;
  created_at?: string;
  updated_at?: string;
  url?: string;
}

interface Relationships {
  tags: RelationshipsTags;
}

interface RelationshipsTags {
  data: RelationshipsTagData[];
}

interface RelationshipsTagData {
  id: number;
  type: string;
}

interface NewsIncludedTagData {
  id: string;
  type: string;
  attributes: TagAttributes;
}

interface TagAttributes {
  name: string;
  slug: string;
  type: string;
  created_at: string;
  updated_at: string;
}
