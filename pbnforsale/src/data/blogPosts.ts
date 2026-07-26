import blogMarkdown from './seo-authority-blog-pack-2026.md?raw';

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// split at separator lines
const sections = blogMarkdown
  .split(/={5,}/g)
  .map((s) => s.trim())
  .filter((s) => s && s.startsWith('#'));

interface Post {
  title: string;
  slug: string;
  content: string;
}

const posts: Post[] = sections.map((sec) => {
  const lines = sec.split('\n');
  const titleLine = lines[0] || '';
  const title = titleLine.replace(/^#\s*\d+\.\s*/, '').trim();
  // everything after first blank line (skip two lines if necessary)
  const rest = lines.slice(1).join('\n').trim();
  return {
    title,
    slug: slugify(title),
    content: rest,
  };
});

export default posts;
