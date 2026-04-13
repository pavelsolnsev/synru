import type { Nullable } from './common';

export interface ProgramEntity {
  id: number | string;
  name: string;
  slug: string;
  image: string;
  annotation: null | string;
  content: null | string;
  published: boolean;
  comment: string
  properties: {
    title: null | string,
    for_dubai: false,
    description: null | string;
    international: null | string;
    partner_show: boolean;
    partner_text: Nullable<string>;
    show_section_resume: boolean;
    show_section_employment: boolean;
    show_section_diploms: boolean;
  }
  published_at: string;
  created_at: string;
  updated_at: string;
  url: string;
  custom_field_values: Array<ProgramCustomField>
  customFields: ProgramCustomField
}

export interface ProgramCustomField {
  faq:  Array<{ question: string; answer: string }>;
  documents: unknown[];
  program_preview: unknown[];
  learning_program: Array<
    {
      title: null | string;
      duration: null | string;
      description: null | string;
    }
  >;
  for_whom: Array<
    {
      title: null | string;
      text: null | string;
    }
  >;
  triggers: Array<
    {
      duration: null | string;
      career: null | string;
    }
  >;
  show_second_higher: boolean;
  'career_trajectory': Array<
    {
      title: null | string;
      text: null | string;
    }
  >;
  's-resume-skills': Array<
    {
      skill: null | string;
    }
  >;
  's-resume': Array<
    {
      title: null | string;
      education: null | string;
      experience: null | string;
      achievements: null | string;
    }
  >;
  how_learning: Array<
    {
      title: null | string;
      description: null | string;
    }
  >;
  where_can_work: Array<
    {
      image: null | string;
      title: null | string;
      description: null | string;
    }
  >;
  full_resume: Array<
    {
      title: null | string;
      photo: null | string;
      name: null | string;
      info_text: null | string;
      contacts: Array<
        {
          contact_logo: null | string;
          contact_text: null | string;
        }
      >,
      education_faculty: null | string;
      education_university: null | string;
      education_text: null | string;
      skills: Array<
        {
          skill: null | string;
        }
      >,
      experience: Array<
        {
          experience_item: null | string;
        }
      >,
      achievements: Array<
        {
          achievement_item: null | string;
        }
      >
    }
  >;
  what_learn: Array<
    {
      text: string | null;
      title: string | null;
    }
  >;
  what_obtain: Array<
    {
      title: null | string;
      description: null | string;
      link: null | string;
    }
  >;
  goals: Array<
    {
      image: null | string;
      text: null | string;
      title: null | string;
    }
  >;
  video_reviews: Array<
    {
      name: null | string;
      info: null | string;
      image_v: null | string;
      rutube_id: null | string;
      youtube_id: null | string;
      video: null | string;
    }>
}
