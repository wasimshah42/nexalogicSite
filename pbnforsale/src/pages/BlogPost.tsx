import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '../data/blogPosts';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Send, ShieldCheck, Zap } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { language } = useLanguage();

  const isIndonesian = language === 'id' || location.pathname.startsWith('/id');
  const post = getPostBySlug(slug || '', isIndonesian ? 'id' : 'en');

  if (!post) {
    return <Navigate to={isIndonesian ? '/id/blog' : '/blog'} replace />;
  }

  const backLink = isIndonesian ? '/id/blog' : '/blog';
  const packagesLink = isIndonesian ? '/id#packages' : '/#packages';

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 px-4 py-16 pt-28">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to={backLink}
            className="inline-flex items-center text-xs font-semibold text-gray-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            {isIndonesian ? 'Kembali ke Daftar Blog' : 'Back to Blog'}
          </Link>
        </div>

        {/* Post Title Header */}
        <header className="mb-8 p-6 md:p-8 bg-dark-800/90 border border-dark-700/60 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold mb-3">
            <span className="px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
              {post.lang === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇺🇸 English'}
            </span>
            <span>•</span>
            <span>{isIndonesian ? 'Otoritas & Link Building' : 'SEO & Authority'}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {post.title}
          </h1>
        </header>

        {/* Article Body */}
        <article className="prose prose-invert prose-gold max-w-none p-6 md:p-10 bg-dark-800/60 border border-dark-700/40 rounded-2xl shadow-xl space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2">{children}</h2>,
              h2: ({ children }) => <h3 className="text-xl font-bold text-gold-400 mt-6 mb-3">{children}</h3>,
              h3: ({ children }) => <h4 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h4>,
              p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>,
              li: ({ children }) => <li className="text-gray-300">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} className="text-gold-400 hover:text-gold-300 underline font-medium">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Bottom CTA Box */}
        <div className="mt-10 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-gold-500/10 via-dark-800 to-gold-500/10 border border-gold-500/30 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-500/20 text-gold-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {isIndonesian ? 'Siap Meningkatkan Ranking Website Anda?' : 'Ready to Elevate Your Search Authority?'}
          </h3>
          <p className="text-gray-300 text-sm max-w-lg mx-auto mb-6">
            {isIndonesian
              ? 'Dapatkan paket PBN aged domain DA/DR 50-90+ dengan kontrol outbound link ketat dan garansi dofollow permanen.'
              : 'Deploy curated aged domain PBNs with strict outbound ratios, contextual placement, and guaranteed indexing.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to={packagesLink}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-500/20 transition-all"
            >
              <Zap className="w-4 h-4" />
              {isIndonesian ? 'Lihat Pilihan Paket PBN' : 'Explore Backlink Packages'}
            </Link>
            <a
              href="https://t.me/smartlinker786"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
              Telegram Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
