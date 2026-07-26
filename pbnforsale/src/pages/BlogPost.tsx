import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import posts from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 p-6 bg-dark-800 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <div className="prose prose-invert max-w-none space-y-8 p-6 bg-dark-800 rounded-lg shadow">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div className="mt-8">
          <Link to="/blog" className="text-gold-500 hover:underline">
            &larr; Back to blog list
          </Link>
        </div>
      </div>
    </div>
  );
}
