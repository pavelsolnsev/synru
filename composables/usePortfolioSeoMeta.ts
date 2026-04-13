import type { MaybeRefOrGetter } from 'vue';

/**
 * Минимальные SEO-теги для демо: только title и description (без canonical / OG / keywords).
 */
export function usePortfolioSeoMeta(input: {
  title: MaybeRefOrGetter<string | null | undefined>;
  description: MaybeRefOrGetter<string | null | undefined>;
}) {
  useSeoMeta({
    title: () => toValue(input.title) ?? undefined,
    description: () => toValue(input.description) ?? undefined,
  });
}
