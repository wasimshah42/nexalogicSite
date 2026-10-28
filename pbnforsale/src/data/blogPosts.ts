import blogMarkdownEn from './seo-authority-blog-pack-2026.md?raw';
import blogMarkdownId from './seo-authority-blog-pack-indonesia-2026.md?raw';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseMarkdownPack(markdown: string, lang: 'en' | 'id'): Post[] {
  const sections = markdown
    .split(/={5,}/g)
    .map((s) => s.trim())
    .filter((s) => s && /^#\s*\d+\./.test(s));

  return sections.map((sec) => {
    const lines = sec.split('\n');
    const titleLine = lines[0] || '';
    const title = titleLine.replace(/^#\s*\d+\.\s*/, '').trim();
    const rest = lines.slice(1).join('\n').trim();
    return {
      title,
      slug: slugify(title),
      content: rest,
      lang,
    };
  });
}

export interface Post {
  title: string;
  slug: string;
  content: string;
  lang: 'en' | 'id';
}

export const postsEn: Post[] = parseMarkdownPack(blogMarkdownEn, 'en');
export const postsId: Post[] = parseMarkdownPack(blogMarkdownId, 'id');

const allPosts: Post[] = [...postsEn, ...postsId];

export function getPostsByLanguage(lang: string): Post[] {
  if (lang === 'id') return postsId;
  return postsEn;
}

export function getPostBySlug(slug: string, lang?: string): Post | undefined {
  if (lang === 'id') {
    const idPost = postsId.find((p) => p.slug === slug);
    if (idPost) return idPost;
  }
  return allPosts.find((p) => p.slug === slug);
}

export default allPosts;
