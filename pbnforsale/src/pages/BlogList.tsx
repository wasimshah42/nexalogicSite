import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { postsEn, postsId } from '../data/blogPosts';
import { BookOpen, ArrowRight, Globe } from 'lucide-react';

export default function BlogList() {
  const { language } = useLanguage();
  const location = useLocation();

  const isIndonesian = language === 'id' || location.pathname.startsWith('/id');
  const currentPosts = isIndonesian ? postsId : postsEn;
  const linkPrefix = isIndonesian ? '/id/blog' : '/blog';

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-16 pt-28">
      <div className="max-w-4xl mx-auto">
        {/* Header Banner */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {isIndonesian ? 'Edisi SEO Indonesia 2026' : 'SEO Authority 2026 Edition'}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {isIndonesian ? (
              <>
                Blog SEO & <span className="text-gold-500">Link Building</span> Indonesia
              </>
            ) : (
              <>
                Our Authority <span className="text-gold-500">Blog</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            {isIndonesian
              ? 'Panduan praktis, studi kasus PBN aged domain, dan teknik menaikkan DA/DR serta ranking di Google Indonesia.'
              : 'Actionable strategies, algorithm analysis, and authority link-building guides for scaling modern search rankings.'}
          </p>

          {/* Quick Language Filter */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <Link
              to="/id/blog"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isIndonesian
                  ? 'bg-gold-500 text-dark-900 font-bold shadow-md shadow-gold-500/20'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-700'
              }`}
            >
              <span>🇮🇩</span> Bahasa Indonesia ({postsId.length})
            </Link>
            <Link
              to="/blog"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                !isIndonesian
                  ? 'bg-gold-500 text-dark-900 font-bold shadow-md shadow-gold-500/20'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-700'
              }`}
            >
              <span>🇺🇸</span> English Global ({postsEn.length})
            </Link>
          </div>
        </div>

        {/* Post Grid */}
        <div className="space-y-6">
          {currentPosts.map((post, idx) => (
            <article key={post.slug}>
              <Link
                to={`${linkPrefix}/${post.slug}`}
                className="group block p-6 md:p-8 bg-dark-800/80 hover:bg-dark-800 border border-dark-700/60 hover:border-gold-500/40 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gold-500/5 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 text-xs text-gold-400/80 font-medium mb-3">
                  <span>#0{idx + 1}</span>
                  <span>•</span>
                  <span>{isIndonesian ? 'Panduan SEO' : 'Authority Guide'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {isIndonesian ? 'Indonesia' : 'Global'}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-gold-400 transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
                  {post.content.slice(0, 180).replace(/[#*_-]/g, '')}...
                </p>
                <div className="flex items-center text-xs font-bold text-gold-400 group-hover:text-gold-300 transition-colors">
                  <span>{isIndonesian ? 'Baca Selengkapnya' : 'Read Full Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
