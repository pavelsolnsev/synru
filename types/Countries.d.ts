import type { RegionRelation } from './Cities';
import { Nullable } from "./common";

export interface CountriesResponse {
  data: Country[]
}

interface Country {
  id: string;
  type: 'countries';
  attributes: CountryAttributes;
  relationships: CountryRelationships;
};

interface CountryAttributes {
  name: string;
  fullname: string;
  name_en: string;
  fullname_en: string;
  slug: string;
  code: string;
  rank: number;
  published: boolean;
  properties: CountryProperties;
  created_at: string;
  updated_at: string;
}

interface CountryRelationships {
  regions: RegionRelation;
}

