import type { Nullable } from './common';

export interface ArticleEntity {
  id: number;
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
  custom_field_values: CustomFields[];
  customFields: CustomFields;
}

interface CustomFields {
  article_steps?: ArticleSteps[];
  article_education?: ArticleEducation[];
  article_education_new?: ArticleEducationNew[];
  article_filter?: ArticleFilter[];
  faq?: ArticleFaq[];
  article_notes?: ArticleNotes[];
  article_quotes?: ArticleQuotes[];
  article_links?: ArticleLink[];
  article_zoomable?: ArticleZoomable[];
  article_city?: Nullable<string>;
  article_lists?: Nullable<ArticleListsWidget[]>
}

interface ArticleSteps {
  title: string;
  steps: { step: string }[]
}

interface ArticleEducation {
  title: Nullable<string>;
  entities: Array<{ id: string, type: 'programs' | 'courses' } | null> | null;
}

interface ArticleEducationNew {
  title: Nullable<string>;
  entities: Array<{ text: string, entity: { id: string, type: 'programs' | 'courses' } } | null> | null;
}

interface ArticleFilter {
  level: Nullable<string>;
  format: Nullable<string>;
  faculty: Nullable<string>;
}

interface ArticleFaq {
  answer: string;
  question: string;
}

interface ArticleNotes {
  text: string;
}

interface ArticleQuotes {
  description: Nullable<string>
  image: Nullable<string>
  name: string;
  text: string;
}

interface ArticleLink {
  url: string;
  title: string;
}

export interface ArticleZoomable {
  url: Nullable<string>;
  level: Nullable<string>;
  title: Nullable<string>;
  image_lg: Nullable<string>;
  image_md: Nullable<string>;
  image_sm: Nullable<string>;
  text_about: Nullable<string>;
  title_about: Nullable<string>;
}

export interface ArticleListsWidget {
  name?: Nullable<string>;
  items?: Nullable<{
    text: Nullable<string>;
    title: Nullable<string>;
  }[]>
}


