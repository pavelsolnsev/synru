import type { Nullable } from './common';

export interface FacultyEntity {
  created_at: string;
  custom_field_values: Array<CustomFieldPopular & CustomFieldFreeEducation>;
  customFields?: FacultyCustomFields;
  description: string;
  id: number | string;
  intro_image: string;
  name: string;
  preview_image: string;
  properties: {
    title: string;
    description: string;
    advanced_short_name: string;
    advanced_name: string;
    form_title?: string;
  };
  published: boolean;
  rank: number;
  short_name: string;
  slug: string;
  updated_at: string;
  url: string | null;
}

interface CustomFieldPopular {
  popular: boolean;
}
interface CustomFieldFreeEducation {
  free_education: boolean;
}

interface FacultyCustomFields {
  preview_additional: Nullable<string>;
}
