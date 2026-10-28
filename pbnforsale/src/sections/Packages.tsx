import { useEffect, useRef, useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Percent
} from 'lucide-react';

type TierKey = 'all' | 'tier1' | 'tier2' | 'tier3';

interface PackageItem {
  id: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  tierLabel: string;
  name: string;
  category: string;
  usdPrice: number;
  idrPrice: string;
  unit: string;
  popular?: boolean;
  bestValue?: boolean;
  badge?: string;
  metrics: string;
  features: string[];
}

const packagesData: PackageItem[] = [
  // TIER 1: GENERAL & NICHE SITES
  {
    id: 'general-blogpost',
    tier: 'tier1',
    tierLabel: 'Tier 1: General & Niche',
    name: 'General Blogpost',
    category: 'General & Niche Sites',
    usdPrice: 15,
    idrPrice: 'Rp 225.000',
    unit: '100 Links',
    metrics: 'Standard Authority',
    features: [
      '100 Contextual Blogpost Backlinks',
      'Clean Outbound Link Profile',
      'Natural Drip-Feed Delivery',
      'Permanent Dofollow Links',
      'Complete White-Label Report',
    ],
  },
  {
    id: 'general-blogroll',
    tier: 'tier1',
    tierLabel: 'Tier 1: General & Niche',
    name: 'General Blogroll (Sitewide)',
    category: 'General & Niche Sites',
    usdPrice: 20,
    idrPrice: 'Rp 300.000',
    unit: '100 Links',
    metrics: 'Sitewide Exposure',
    features: [
      '100 Sitewide Blogroll Links',
      'High Link Velocity Power',
      'Targeted Anchor Text Control',
      '95%+ Verified Indexation Rate',
      'Detailed Placement Report',
    ],
  },
  {
    id: 'gray-blogpost',
    tier: 'tier1',
    tierLabel: 'Tier 1: General & Niche',
    name: 'Casino / Gray Niche Blogpost',
    category: 'Gambling, Crypto & Gray',
    usdPrice: 20,
    idrPrice: 'Rp 300.000',
    unit: '100 Links',
    badge: 'Accepts Casino/Crypto',
    metrics: 'Gray Niche Accepted',
    features: [
      '100 Niche-Targeted Blogpost Placements',
      'Full Casino, Crypto & Betting Support',
      'Zero Footprint Domain Hosting',
      'Anchor Text Diversity & Control',
      'Drip-Feed Protection Strategy',
    ],
  },
  {
    id: 'gray-blogroll',
    tier: 'tier1',
    tierLabel: 'Tier 1: General & Niche',
    name: 'Casino / Gray Niche Blogroll',
    category: 'Gambling, Crypto & Gray',
    usdPrice: 25,
    idrPrice: 'Rp 375.000',
    unit: '100 Links',
    badge: 'High Impact Gray',
    metrics: 'Sitewide Gray Power',
    features: [
      '100 Gray Niche Sitewide Blogrolls',
      'Dedicated Niche Relevant Servers',
      'No Footprint Between Networks',
      'Continuous Crawl & Indexing',
      'Instant Indexer Submission',
    ],
  },

  // TIER 2: HIGH METRIC (DA/DR)
  {
    id: 'high-da-blogpost',
    tier: 'tier2',
    tierLabel: 'Tier 2: High Metric (DA/DR)',
    name: 'High DA Blogpost (DA 40+)',
    category: 'Moz Verified Authority',
    usdPrice: 25,
    idrPrice: 'Rp 375.000',
    unit: '100 Links',
    metrics: 'DA 40+ Verified Moz',
    features: [
      '100 High DA 40+ Contextual Blogposts',
      'Aged Domains (5–12+ Years Old)',
      'Strict Outbound Link Limit (OBL < 15)',
      'Natural In-Content Editorial Links',
      'Full Live URL Excel Report',
    ],
  },
  {
    id: 'high-dr-blogpost',
    tier: 'tier2',
    tierLabel: 'Tier 2: High Metric (DA/DR)',
    name: 'High DR Blogpost (DR 40–50+)',
    category: 'Ahrefs Power Network',
    usdPrice: 30,
    idrPrice: 'Rp 450.000',
    unit: '100 Links',
    popular: true,
    badge: 'Agency Favorite',
    metrics: 'DR 40–50+ Ahrefs Power',
    features: [
      '100 High DR Contextual Placements',
      'High Domain Rating Link Juice Transfer',
      'Permanent Dofollow Index Guaranteed',
      'Custom Anchor Text Distribution',
      'Priority Delivery Within 48 Hours',
    ],
  },
  {
    id: 'premium-dr70-blogpost',
    tier: 'tier2',
    tierLabel: 'Tier 2: High Metric (DA/DR)',
    name: 'Premium DR70 Blogpost',
    category: 'Elite Power Network',
    usdPrice: 60,
    idrPrice: 'Rp 900.000',
    unit: '100 Links',
    bestValue: true,
    badge: 'Sarah Top Recommendation',
    metrics: 'DR 70+ Elite Authority',
    features: [
      '100 Verified DR 70+ Aged Authority Links',
      'Pristine Link Equity & Toxic-Free History',
      'Maximum Anchor Diversity Protection',
      'Premium Tier Indexer & Drip-Feeding',
      'Direct Account Executive Support',
    ],
  },
  {
    id: 'da-dr-90-blogpost',
    tier: 'tier2',
    tierLabel: 'Tier 2: High Metric (DA/DR)',
    name: 'DA/DR 90+ Blogpost',
    category: 'Maximum Search Equity',
    usdPrice: 80,
    idrPrice: 'Rp 1.200.000',
    unit: '100 Links',
    badge: 'Super Authority',
    metrics: 'DA/DR 90+ Top Tier',
    features: [
      '100 Top-Tier DA/DR 90+ Placements',
      'Steep Ranking Gains for Tough Keywords',
      'Ultra-Low OBL & High Trust Flow',
      'Manual High-Relevance Editorial Postings',
      'Complete Verified Ahrefs/Moz Proof',
    ],
  },

  // TIER 3: PREMIUM COUNTRY & EDU
  {
    id: 'id-premium-blogpost',
    tier: 'tier3',
    tierLabel: 'Tier 3: Premium Country & EDU',
    name: 'Indonesia (.id) Premium Blogpost',
    category: 'High Metric Indonesia (Spesial)',
    usdPrice: 80,
    idrPrice: 'Rp 1.200.000',
    unit: '100 Links',
    popular: true,
    badge: 'Paling Laris di Indonesia 🇮🇩',
    metrics: 'High DA/DR .ID Domain',
    features: [
      '100 Backlink .ID High DA/DR Spesial Otoritas',
      'Otoritas Lokal Maksimal untuk SERP Google Indonesia',
      'Outbound Link Terkontrol Sangat Bersih (<15 OBL)',
      'Aman untuk Brand & Niche Kompetitif (Judi/Slot/Crypto)',
      'Prioritas Handoff ke Admin Telegram @smartlinker786',
    ],
  },
  {
    id: 'id-general-blogpost',
    tier: 'tier3',
    tierLabel: 'Tier 3: Premium Country & EDU',
    name: 'Indonesia (.id) General Blogpost',
    category: 'Indonesian Market (.id)',
    usdPrice: 50,
    idrPrice: 'Rp 750.000',
    unit: '100 Links',
    badge: 'Lokal Indonesia 🇮🇩',
    metrics: '.ID Geo Relevance',
    features: [
      '100 Backlink Blogpost Domain Indonesia (.id)',
      'Cocok untuk Pasar & Trafik Target Indonesia',
      'Artikel Bahasa Indonesia Relevan & Alami',
      'Drip-Feed Alami & Dofollow Permanen 95%+ Index',
      'Laporan Lengkap Excel & Fast Turnaround 48 Jam',
    ],
  },
  {
    id: 'country-geo-blogpost',
    tier: 'tier3',
    tierLabel: 'Tier 3: Premium Country & EDU',
    name: 'GEO Target Blogpost (.co.uk/.us/.ca/.nl/.fr)',
    category: 'Country Specific ccTLDs',
    usdPrice: 60,
    idrPrice: 'Rp 900.000',
    unit: '100 Links',
    badge: 'Geo Targeted',
    metrics: 'Local Country TLDs',
    features: [
      '100 Country Targeted Aged Domains',
      '.co.uk, .us, .ca, .nl, .fr Available',
      'Localized Search Engine Authority Push',
      'Unique Local IP Class C Hosting',
      'Guaranteed Indexation Strategy',
    ],
  },
  {
    id: 'edu-blogpost',
    tier: 'tier3',
    tierLabel: 'Tier 3: Premium Country & EDU',
    name: 'EDU Blogpost Placement',
    category: 'Academic & Institutional',
    usdPrice: 70,
    idrPrice: 'Rp 1.050.000',
    unit: '100 Links',
    badge: 'High Trust Flow',
    metrics: '.EDU Institutional Trust',
    features: [
      '100 In-Content Contextual .EDU Placements',
      'Unmatched Trust Signal from Academic Domains',
      'Deep Dofollow Link Power',
      'Natural Citation Anchor Formatting',
      '95%+ Verified Crawl & Index Ratio',
    ],
  },
  {
    id: 'edu-comment',
    tier: 'tier3',
    tierLabel: 'Tier 3: Premium Country & EDU',
    name: 'EDU High Authority Comments',
    category: 'Institutional Diversification',
    usdPrice: 15,
    idrPrice: 'Rp 225.000',
    unit: '100 Links',
    metrics: '.EDU Link Velocity',
    features: [
      '100 Verified .EDU Relevant Placements',
      'Diversifies Backlink Profile Safely',
      'Quick Crawl Booster for New Websites',
      'Clean Non-Spammy Anchor Control',
      'Delivered in Under 48 Hours',
    ],
  },
];

import { useLanguage } from '../context/LanguageContext';

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency, t } = useLanguage();
  const [activeTier, setActiveTier] = useState<TierKey>('all');

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
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTier]);

  const filteredPackages = activeTier === 'all'
    ? packagesData
    : packagesData.filter((p) => p.tier === activeTier);

  return (
    <section id="packages" ref={sectionRef} className="py-20 lg:py-28 bg-dark-900 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-gold-400" />
            {t('pkg.badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            <span className="text-gradient">{t('pkg.title')}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('pkg.desc')}
          </p>

          {/* Currency & Tier Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Tier Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-dark-800 border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveTier('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTier === 'all'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 shadow-md font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('pkg.tab_all')} ({packagesData.length})
              </button>
              <button
                onClick={() => setActiveTier('tier1')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTier === 'tier1'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 shadow-md font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('pkg.tab_tier1')}
              </button>
              <button
                onClick={() => setActiveTier('tier2')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTier === 'tier2'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 shadow-md font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('pkg.tab_tier2')}
              </button>
              <button
                onClick={() => setActiveTier('tier3')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTier === 'tier3'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 shadow-md font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('pkg.tab_tier3')}
              </button>
            </div>

            {/* Currency Switcher */}
            <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-dark-800 border border-gold-500/30 text-xs">
              <span className="text-gray-400 pl-2 text-[11px] font-medium">Currency:</span>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-gold-500 text-dark-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  currency === 'IDR'
                    ? 'bg-gold-500 text-dark-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                IDR (Rp)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative group flex flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 ${
                pkg.popular || pkg.bestValue
                  ? 'bg-dark-800/90 border-gold-500/60 shadow-glow'
                  : 'bg-dark-800/60 border-white/10 hover:border-gold-500/40'
              }`}
              style={{ animationDelay: `${(index % 6) * 0.08}s` }}
            >
              {/* Badge */}
              {(pkg.popular || pkg.bestValue || pkg.badge) && (
                <div className="absolute -top-3.5 left-6 z-10">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900'
                      : pkg.bestValue
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-dark-700 text-gold-400 border border-gold-500/40'
                  }`}>
                    {pkg.popular ? 'Most Popular' : pkg.bestValue ? 'Best Value (DR70)' : pkg.badge}
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Tier Label */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span className="font-semibold text-gold-400/90 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {pkg.tierLabel}
                    </span>
                    <span className="text-[11px] text-gray-400 px-2 py-0.5 rounded bg-dark-700 border border-white/5">
                      {pkg.metrics}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">{pkg.category}</p>

                  {/* Price Block */}
                  <div className="mb-6 p-4 rounded-xl bg-dark-900/80 border border-white/5 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl lg:text-4xl font-extrabold text-white">
                          {currency === 'USD' ? `$${pkg.usdPrice}` : pkg.idrPrice}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">/ {pkg.unit}</span>
                      </div>
                      {currency === 'USD' ? (
                        <p className="text-[11px] text-gray-400 mt-1">
                          Equivalent: <span className="text-gold-400">{pkg.idrPrice}</span> ($1 = Rp 15.000)
                        </p>
                      ) : (
                        <p className="text-[11px] text-gray-400 mt-1">
                          Wholesale Rate: <span className="text-gold-400">${pkg.usdPrice} USD</span>
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                      Wholesale
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-gray-300">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-gold-400" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Button */}
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    pkg.popular || pkg.bestValue
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 hover:from-gold-400 hover:to-gold-500 shadow-glow'
                      : 'bg-dark-700 hover:bg-gold-500/20 text-white hover:text-gold-400 border border-white/10 hover:border-gold-500/40'
                  }`}
                >
                  Order {pkg.name}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Agency Bulk & Sample Batch Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-800 via-dark-850 to-dark-800 border border-gold-500/30 flex flex-col lg:flex-row items-center justify-between gap-6 animate-on-scroll opacity-0">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Percent className="w-4 h-4" /> Need Agency Bulk Fulfillment (500+ Links)?
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ordering 500+ Links or Need a 3–5 URL Sample Batch?
            </h3>
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Connect directly with our Admin on Telegram or talk with Sarah in chat. We provide custom bulk discount tiers and verified sample batches so you can inspect Moz/Ahrefs metrics prior to ordering.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://t.me/smartlinker786"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-xs sm:text-sm font-bold transition-all"
            >
              Contact Admin @smartlinker786
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:sales@nexalogic.site"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-500 text-dark-900 hover:bg-gold-400 text-xs sm:text-sm font-extrabold transition-all shadow-glow"
            >
              Email sales@nexalogic.site
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>
              All orders come with strict outbound link control, natural drip-feeding, and 
              a <strong className="text-gold-400">100% money-back guarantee</strong> if specifications are not delivered.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
