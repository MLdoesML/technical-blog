export const DOMAIN_LABELS: Record<string, string> = {
  'ml-ai':             'ML / AI',
  'economics':         'Economics',
  'physics':           'Physics',
  'biology':           'Biology',
  'chemistry':         'Chemistry',
  'business-strategy': 'Business',
};

export function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

export function groupTagsByDomain(
  posts: Array<{ data: { domain: string; tags: string[] } }>
): Record<string, string[]> {
  const grouped: Record<string, Set<string>> = {};

  for (const post of posts) {
    const { domain, tags } = post.data;
    if (!grouped[domain]) grouped[domain] = new Set();
    for (const tag of tags) {
      grouped[domain].add(normalizeTag(tag));
    }
  }

  return Object.fromEntries(
    Object.entries(grouped).map(([domain, tags]) => [domain, [...tags].sort()])
  );
}

export function getAllTags(
  posts: Array<{ data: { tags: string[] } }>
): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.add(normalizeTag(tag));
    }
  }
  return [...tags].sort();
}
