export interface SchoolProgramEntity {
  id: string;
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
  custom_field_values: CustomFieldSchoolPrograms;
  customFields: CustomFieldSchoolPrograms;
}

interface CustomFieldSchoolPrograms {
  s_school_about_description: string;
  intro_image: string;
  s_process: {
    title: string;
    text: string;
    image: string;
  }[]
  s_for_who_items: {
    title: string;
    text: string;
  }[],
  s_for_who_title: string,
  school_benefits: {
    title: string;
    text?: string;
    icon?: string;
  }[],
  faq: {
    answer: string;
    question: string;
  }[]
  lander: {
    grcampaign: string;
    land: string;
    quote_id: string;
    version: string;
  }[]
}

