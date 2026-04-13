import type { CacheConfig } from '~/types/cache';
import { TEN_MIN } from './timeToCache';

export const CACHE_ROUTES: CacheConfig[] = [
  { path: '/', ttl: TEN_MIN },
  { path: '/abiturientam/priemnaya_komissiya', ttl: TEN_MIN },
  { path: '/abiturientam', ttl: TEN_MIN },
  { path: '/abiturientam/faculties', ttl: TEN_MIN },
  { path: '/abiturientam/programmyi_obucheniya', ttl: TEN_MIN },
  { path: '/abiturientam/priemnaya_komissiya', ttl: TEN_MIN },
  { path: '/school', ttl: TEN_MIN },
  { path: '/abiturientam/college', ttl: TEN_MIN },
  { path: '/abiturientam/pervoe_vysshee' , ttl: TEN_MIN },
  { path: '/abiturientam/speczialitet', ttl: TEN_MIN },
  { path: '/abiturientam/magistracy', ttl: TEN_MIN },
  { path: '/abiturientam/second_highest', ttl: TEN_MIN },
  { path: '/abiturientam/postgraduate_study', ttl: TEN_MIN },
  { path: '/business_education', ttl: TEN_MIN },
  { path: '/professions', ttl: TEN_MIN },
  { path: '/students', ttl: TEN_MIN },
  { path: '/about/job', ttl: TEN_MIN },
  { path: '/about/education_articles', ttl: TEN_MIN },
];
