import type { Nullable } from './common';

export interface LevelEntity {
  created_at?: string
  custom_field_values?: LevelCustomFields[]
  customFields?: LevelCustomFields;
  description?: Nullable<string>;
  id?: number | string;
  name?: string
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

export interface LevelCustomFields {
  'quiz_image'?: SQuizImage[];
  'quiz_icon'?: string;
  'quiz_title_class'?: string;
  'quiz_form'?: boolean;
  'quiz_description'?: string;
  'quiz_form_title'?: string;
  'level_advantages'?: SAdvantage[];
  'reviews'?: SReview[];
  'level_cards'?: LevelCard[];
  'additional_documents': AdditionalDocuments[];
}

interface SQuizImage {
  imageSm: Nullable<string>;
  imageMd: Nullable<string>;
  imageLg: Nullable<string>;
}

interface LevelCard {
  title: Nullable<string>;
  description: Nullable<string>;
  showNavigation: boolean;
  items: Array<{
    title: Nullable<string>;
    titleClass: Nullable<string>;
    text: Nullable<string>;
    textClass: Nullable<string>;
    image: Nullable<string>;
    link: Nullable<string>;
  }>;
}

interface SAdvantage {
  text: Nullable<string>;
  title: Nullable<string>;
  textClass: Nullable<string>;
  advantages: Array<{
    titleClass?: Nullable<string>;
    title?: Nullable<string>;
    subtitle?: Nullable<string>;
    image?: Nullable<string>;
    popupTitle: Nullable<string>;
    popupText: Nullable<string>;
  }>;
  tags?: Array<{ title: string }>
}

interface SReview {
  title: Nullable<string>;
  items: Array<{
    name: Nullable<string>;
    date: Nullable<string>;
    text: Nullable<string>;
    img: Nullable<string>;
  }>;
}

interface AdditionalDocuments {
  title: Nullable<string>;
  link: Nullable<string>;
}
