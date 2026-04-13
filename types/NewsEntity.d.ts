import type { Nullable } from './common';

export interface NewsEntity {
  id: number;
  title: string;
  slug: string;
  image: string;
  annotation: string;
  content: string;
  properties: Properties;
  published_at: string;
  created_at: string;
  updated_at: string;
  modx_id: Nullable<number>;
  published: boolean;
  url: string;
}

export interface Properties {
  title: Nullable<string>;
  keywords: Nullable<string>;
  description: Nullable<string>;
}
