import type { Nullable } from './common';

export interface CourseEntity {
  id: number;
  name: string;
  slug: string;
  url?: string,
  annotation: Nullable<string>;
  content: Nullable<string>;
  image: Nullable<string>;
  published: boolean;
  comment: Nullable<string>;
  properties: {
    price: Nullable<number>;
    title: Nullable<string>;
    description: Nullable<string>;
    for_dubai: boolean;
    international: Nullable<string>;
    partner_show: Nullable<boolean>;
    partner_logo: Nullable<string>;
    partner_text: Nullable<string>;
    partner_bonuses: Nullable<string>;
    duration_days: Nullable<string>;
    currency: Nullable<string>;
    external_id: Nullable<string>;
    express_package: Nullable<boolean>;
    is_express: Nullable<boolean>;
  }
  created_at: string;
  updated_at: string;
  custom_field_values: CourseCustomField[];
  customFields: CourseCustomField;
}

export interface CourseCustomField {
  additional_documents?: AdditionalDocument[];
  course_triggers?: CourseTrigger[];
  faq?: FAQ[];
  for_whom?: ForWhom[];
  learning_program?: LearningProgram[];
  what_learn?: ForWhom[];
  why_learn?: WhyLearn[];
  's-video-block'?: SVideoBlock[];
  course_show_blocks?: CourseShowBlock[];
  s_programs_recommend?: number[];
  free_video: Nullable<string>;
  course_earnings: CourseEarnings[];
  bonus_programs: LearningProgram[];
  course_portfolio: CoursePortfolio[];
  course_intro: CourseIntro[];
  course_pluses: CoursePlus[];
  average_salary: AverageSalary[];
  partners: { image: string }[];
}

interface CoursePlus {
  top_list: { image: string, title: string, text: string }[];
  bottom_list: { title: string, text: string }[];
}

interface AverageSalary {
  salary: Nullable<string>;
  title: Nullable<string>;
  text: Nullable<string>;
}

interface CourseIntro {
  images: { image: string }[];
  bonus_course_text: Nullable<string>;
  bonus_course_desc: Nullable<string>;
  type: Nullable<string>;
  tools: Nullable<string>;
  portfolio: Nullable<string>;
  triggers: { title: string, text: string }[];
}

interface AdditionalDocument {
  title: Nullable<string>;
  image: Nullable<string>;
  link: Nullable<string>;
}

interface CoursePortfolio {
  subtitle: Nullable<string>;
  title: Nullable<string>;
  items: {
    tag: Nullable<string>;
    title: Nullable<string>;
    text: Nullable<string>;
    image: Nullable<string>;
  }[];
}

interface CourseShowBlock {
  s_help_employment: Nullable<boolean>;
  s_synergy_lms: Nullable<boolean>;
}

interface CourseEarnings {
  title: string;
  careers: {
    tag: string;
    title: string;
    price: string;
    level: string;
    experience: string;
  }[];
}

interface CourseTrigger {
  diploma: Nullable<string>;
  duration_hours: Nullable<string>;
  duration_months: Nullable<string>;
  start_date: Nullable<string>;
  start_days: Nullable<string>;
  start_today: Nullable<boolean>;
  course_icon: Nullable<string>;
  soft_skills: { title: string }[];
  skills_title: Nullable<string>;
  programs: Nullable<string>;
  programs_title: Nullable<string>;
  teachers_title: Nullable<string>;
  tag_content: { tag: string }[];
}

interface FAQ {
  question: Nullable<string>;
  answer: Nullable<string>;
}

interface ForWhom {
  title: Nullable<string>;
  text: Nullable<string>;
}

interface LearningProgram {
  description: Nullable<string>;
  duration: Nullable<string>
  result: Nullable<string>
  title: Nullable<string>
}

interface SVideoBlock {
  videoSrc: Nullable<string>;
  bgImage:  Nullable<string>;
}

interface WhyLearn {
  title: Nullable<string>;
  text:  Nullable<string>;
  count: Nullable<string>;
  salary: Nullable<string>;
}
