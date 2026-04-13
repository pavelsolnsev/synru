import type { ArticleResponse } from '~/server/api/articles/[id]/index.get';

export default function transformArticleResponse(response: ArticleResponse | null) {
  const included: TransformIncluded = {
    category: { name: '', slug: '', url: '' },
    person: { name: '', surname: '' },
  };

  if (!response) return included;

  response.included.forEach((item) => {
    const includedTypeMap: Record<string, () => void> = {
      categories: () => {
        if (included.category.name) return;
        included.category.name = item.attributes.name;
        included.category.slug = item.attributes.slug as string;
        included.category.url = item.attributes.url as string;
      },

      persons: () => {
        included.person.name = item.attributes.name ?? '';
        included.person.surname = item.attributes.surname as string ?? '';
        included.person.photo = item.attributes.photo as string;
        included.person.slug = item.attributes.url as string;
      },
    };

    const action = includedTypeMap[item.type];
    if (!action) return;
    action();
  });

  return included;
}

interface TransformIncluded {
  category: {
    name?: string;
    slug?: string;
    url?: string;
  };
  person: {
    name?: string;
    surname?: string;
    photo?: string;
    slug?: string;
  };
}
