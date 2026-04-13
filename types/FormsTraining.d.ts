export type FormsTrainingSlug = 'full-time'
  | 'part-time'
  | 'full-part-time'
  | 'evening'
  | 'online'
  | 'weekend';

export interface FormsTrainingResponse {
  data: Array<{
    id: string;
    type: 'forms';
    attributes: {
      created_at: string;
      description: string;
      name: string;
      short_name: string
      slug: FormsTrainingSlug
      updated_at: string;
      rank: number;
    }
  }>
};
