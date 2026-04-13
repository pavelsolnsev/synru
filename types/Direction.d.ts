export interface DirectionResponse {
  data: DirectionResponseData;
  links: DirectionResponseLinks;
}

interface DirectionResponseData {
  id: string;
  type: 'directions';
  attributes: DirectionResponseAttributes;
  relationships: unknown[];
}

interface DirectionResponseAttributes {
  name: string;
  rank: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  modx_id: number;
  slug: string;
}

interface DirectionResponseLinks {
  self: string;
}
