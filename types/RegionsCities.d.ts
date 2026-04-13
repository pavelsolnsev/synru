export interface RegionCity {
  key: string
  value: string
  rank: string
  site_url: string
  site_start: string
  sitemap_page: string
  sitemap: string
  robots: string
  region: string
  published: string
  programm: string
  partner: string
  news: string
  longitude: string
  latitude: string
  isfilial: string
  iscapital: string
  http_host: string
  filial_name: string
  feedback: string
  error_page: string
  country: string
  base_url: string
  district: string
  phone_main: string
  email: string
  address: string
  schedule: string
  director: string
}

export interface RegionCityWithSlug extends RegionCity {
  slug: string;
}
