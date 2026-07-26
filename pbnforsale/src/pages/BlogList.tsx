import { Link } from 'react-router-dom';
import posts from '../data/blogPosts';

export default function BlogList() {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Our Blog</h1>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/${post.slug}`}
                className="block p-6 bg-dark-800 rounded-lg shadow hover:bg-dark-700 transition-colors"
              >
                <h2 className="text-2xl font-bold text-gold-500 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-400">
                  {post.content.slice(0, 150)}...
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
