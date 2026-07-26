import { useEffect, useRef } from 'react';
import { Briefcase, ArrowRight, BarChart3, Sparkles, ShieldCheck } from 'lucide-react';

const portfolioItems = [
  {
    title: 'PBN Authority Growth',
    description:
      'A targeted backlink campaign using aged PBN sites to move a competitive niche website into top search results fast.',
    results: ['DA 50+ placements', 'First-page rankings in 4 weeks', 'Anchor text optimization'],
    icon: Briefcase,
  },
  {
    title: 'SEO Recovery & Rebuild',
    description:
      'Safe recovery from a backlink penalty through a clean link profile rebuild and strategic PBN support.',
    results: ['Penalty removal support', 'Natural link velocity', 'White-hat friendly content'],
    icon: ShieldCheck,
  },
  {
    title: 'E-commerce Ranking Lift',
    description:
      'A conversion-focused link strategy that boosted product category visibility and organic traffic for online stores.',
    results: ['Top 10 product keywords', 'Site authority increase', 'Sales-focused backlinks'],
    icon: BarChart3,
  },
  {
    title: 'High-Impact Link Strategy',
    description:
      'Premium backlink placements with strong domain authority to support long-term search growth and trust signals.',
    results: ['Manual placements only', 'Contextual content', 'Traffic-quality focus'],
    icon: Sparkles,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 lg:py-28 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Proven backlink campaigns that move search rankings.
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            See how our PBN and link building services support real growth, recovery, and sustainable authority for online businesses.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {portfolioItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-3xl border border-dark-600 bg-dark-800 p-8 shadow-lg transition-all hover:-translate-y-1 hover:border-gold-500/30 animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 mb-6">{item.description}</p>
                <ul className="space-y-3 mb-8">
                  {item.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                      <span className="mt-1 text-gold-500">•</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-white transition-colors"
                >
                  View details
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center animate-on-scroll opacity-0">
          <p className="text-gray-400">
            Want a custom backlink campaign tailored to your niche, location, or industry? Contact us and we’ll build a plan around your goals.
          </p>
        </div>
      </div>
    </section>
  );
}
