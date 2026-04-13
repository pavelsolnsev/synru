export interface BusinessProgramEntity {
  id: number;
  bs_id: number;
  name: string;
  slug: string;
  type: string;
  published: boolean;
  properties: BPProperties;
  created_at: string;
  updated_at: string;
  custom_field_values: unknown[];
}

interface BPProperties {
  blocks: BPBlock[];
  images: BPPropertiesImages;
  reviews: unknown[];
  partners: unknown[];
  documents: unknown[];
  educators: BPEducator[];
  attributes:  BPPropertiesAttributes;
  directions:  BPPropertiesDirection[];
  internships: unknown[];
}

interface BPPropertiesAttributes {
  id: number;
  url: string;
  name: string;
  slug: string;
  type: string;
  format: string;
  date_to: Date;
  subtype: string;
  date_from: Date;
  is_active: boolean;
  time_from: string;
  created_at: Date;
  form_title: string;
  updated_at: Date;
  form_is_active: boolean;
}

export interface BPBlock {
  id: string;
  type: 'blocks';
  attributes: BPBlockAttributes;
}

interface BPBlockAttributes {
  key: BPBlockAttributesKey;
  title: string;
  content: unknown[] | BPBlockAttributesContent;
  model_id: number;
  is_hidden: boolean;
  created_at: Date;
  model_type: 'programs';
  updated_at: Date;
}

export type BPBlockAttributesKey = 's-program-main'
  | 's-program-accreditation'
  | 's-program-headliner'
  | 's-program-educators'
  | 's-program-internships'
  | 's-program-program'
  | 's-program-form'
  | 's-program-school'
  | 's-program-reviews'
  | 's-program-location'
  | 's-program-previous'
  | 's-program-questions'
  | 's-program-get'
  | 's-program-form'
  | 's-program-advantages'
  | 's-program-partners'
  | 's-program-documents'
  | 's-program-about'
  | 's-program-why'
  | 's-program-for';

export interface BPBlockAttributesContent {
  date?: string;
  time?: string;
  title?: string;
  subtype?: string;
  description?: string;
  images?: ContentImage[];
  items?: ContentItem[];
  address?: string;
  form?: string;
}

interface ContentImage {
  format?: string;
  image_url: { file: unknown[] } | string;
}

interface ContentItem {
  title?: string;
  description?: string[] | string;
  text?: string;
  value?: string;
  image_url?: null | string;
  image_preview_url?: string;
}

interface BPPropertiesDirection {
  id: number;
  type: 'directions';
  images: { main: string };
  attributes: BPPropertiesDirectionAttributes;
}

interface BPPropertiesDirectionAttributes {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface BPEducator {
  id: string;
  type: 'educator';
  images: BPEducatorImages;
  attributes: BPEducatorAttributes;
  relationships: unknown[];
}

interface BPEducatorAttributes {
  id: number;
  slug: string;
  order: number | null;
  content: string;
  is_main: boolean;
  is_active: boolean;
  last_name: string;
  created_at: Date;
  first_name: string;
  updated_at: Date;
  middle_name: string;
  order_this_page: number | null;
  short_description: string;
}

interface BPEducatorImages {
  header: string;
  main_mobile: string;
  main_tablet: string;
  main_desktop: string;
  header_mobile: string;
  header_tablet: string;
}

interface BPPropertiesImages {
  mba_mobile: string;
  mba_tablet: string;
  mba_desktop: string;
  page_mobile: string;
  page_tablet: string;
  page_desktop: string;
  catalog_mobile: string;
  catalog_tablet: string;
  catalog_desktop: string;
  main_catalog_mobile: string;
  main_catalog_tablet: string;
  main_catalog_desktop: string;
  main_immediate_mobile: string;
  main_immediate_tablet: string;
  main_immediate_desktop: string;
}
