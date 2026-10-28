import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, TrendingUp, ShieldCheck, CheckCircle2, ArrowUpRight, Globe2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CaseStudy {
  title: string;
  client: string;
  niche: string;
  region: string;
  overview: string;
  challenge: string;
  strategy: string;
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  keywordsWon: string[];
  duration: string;
  packageUsed: string;
  image: string;
  category: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    title: 'iGaming & Casino Ranking Surge: 0 to Top 3 in 6 Weeks',
    client: 'Major Southeast Asian Gaming Portal',
    niche: 'Casino / iGaming / Sportsbook',
    region: 'Indonesia & Cambodia (ID & KH)',
    overview: 'A tier-1 gaming operator in Southeast Asia needed to break into ultra-competitive search terms without triggering automated footprint penalties.',
    challenge: 'High keyword difficulty (KD 82+), heavy competitor link velocity, and previous algorithmic scrutiny on direct exact-match anchors.',
    strategy: 'Deployed 100 Premium DR70 Blogposts coupled with 100 Indonesian (.id) General Blogposts with clean brand and partial-match anchor velocity drip-fed over 30 days.',
    metrics: [
      { label: 'Organic Traffic', value: '184,000/mo', change: '+412%' },
      { label: 'Ahrefs DR', value: 'DR 71', change: '+38 Pts' },
      { label: 'Top 3 Keywords', value: '28 Terms', change: 'Page 1' },
    ],
    keywordsWon: ['judi slot online terpercaya', 'situs casino resmi', 'daftar slot gacor'],
    duration: '6 Weeks',
    packageUsed: 'Premium DR70 Blogpost + .ID Premium Package',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    category: 'High-Competition Casino',
  },
  {
    title: 'Crypto & Web3 Exchange Authority Scale: Outranking Global Competitors',
    client: 'Decentralized Trading Platform',
    niche: 'Crypto / Forex / FinTech',
    region: 'Global / US / UK',
    overview: 'An emerging crypto swap exchange struggled with domain trust flow and was stuck on Google Page 4 for essential token swap keywords.',
    challenge: 'FinTech keywords require strict E-E-A-T and institutional-level trust signals that generic web 2.0 links cannot fulfill.',
    strategy: 'Executed an institutional campaign using 200 DA/DR 90+ Blogposts and 100 EDU Institutional placements with natural citations and deep entity anchor optimization.',
    metrics: [
      { label: 'Organic Visibility', value: '92,500/mo', change: '+680%' },
      { label: 'Domain Authority', value: 'DA 64', change: '+42 Pts' },
      { label: 'Keyword Rankings', value: '14 Top 5', change: 'First Page' },
    ],
    keywordsWon: ['fast crypto exchange', 'lowest fee crypto swap', 'best defi trading app'],
    duration: '8 Weeks',
    packageUsed: 'DA/DR 90+ Blogpost + EDU Blogpost Package',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    category: 'FinTech & Web3',
  },
  {
    title: 'E-Commerce Authority Recovery: Algorithmic Penalty Overhaul',
    client: 'Multi-Brand Consumer Store',
    niche: 'E-commerce & Retail',
    region: 'UK & Europe',
    overview: 'After a Google Core Update impacted legacy toxic blog links, this client saw an immediate 60% loss in category page visibility.',
    challenge: 'Negative link velocity, severe algorithmic suppression, and toxic outbound footprints from cheap legacy PBN vendors.',
    strategy: 'Conducted a toxic link disavow and rebuilt backlink trust utilizing 150 High DR Blogposts and Country-specific .co.uk aged domains with zero inter-linking footprints.',
    metrics: [
      { label: 'Revenue Recovered', value: '$340,000+', change: 'Full Recovery' },
      { label: 'Keyword Recovery', value: '94% Restored', change: 'Top 10' },
      { label: 'Indexed Ratio', value: '99.2%', change: 'Google Verified' },
    ],
    keywordsWon: ['designer clothing online uk', 'luxury accessories sale', 'sustainable fashion uk'],
    duration: '5 Weeks',
    packageUsed: 'High DR Blogpost + .co.uk Geo Targeted',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    category: 'E-Commerce SEO',
  },
  {
    title: 'Affiliate Authority Site: #1 Spot for High-Ticket Buyer Intent Terms',
    client: 'SaaS & Tech Review Publisher',
    niche: 'B2B Software & Tech Affiliate',
    region: 'North America',
    overview: 'A digital marketing affiliate hub targeting recurring commission software products needed substantial link juice to compete with Forbes and G2.',
    challenge: 'High domain rating competitors with millions in venture SEO budgets holding all Top 3 ranking spots.',
    strategy: 'Targeted tier-1 power: 300 High DA/DR Contextual Editorial posts alongside strategic EDU citations pointing directly to comparison pillar content.',
    metrics: [
      { label: 'Affiliate Payouts', value: '$48,000/mo', change: '+320%' },
      { label: 'Top 1 Rankings', value: '19 Terms', change: '#1 Rank' },
      { label: 'Referring Domains', value: '450+ Clean', change: 'Zero Footprints' },
    ],
    keywordsWon: ['best project management tools', 'crm software for agencies', 'email marketing software review'],
    duration: '7 Weeks',
    packageUsed: 'Agency Authority Tier (High DA + EDU Placements)',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'Affiliate SEO',
  },
];

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/90 to-dark-900" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 text-gold-400" />
            Verified SEO Campaign Results
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            SEO Case Studies & <span className="text-gradient">Ranking Proof</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real data from competitive campaigns. Discover how our 12,000+ domain inventory, strict outbound link control, and high DA/DR placements consistently move competitive search rankings.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/#packages"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all shadow-glow"
            >
              Explore Backlink Packages
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
            >
              Get Custom Audit from Sarah
            </a>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-dark-800 border-t border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-gray-400 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-gold-400 font-semibold">{t('nav.case_studies')}</span>
        </div>
      </nav>

      {/* Case Studies Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {caseStudiesData.map((study, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-dark-800/80 p-6 sm:p-10 shadow-2xl transition-all hover:border-gold-500/40"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Overview Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-gold-500 text-dark-900 font-bold px-3 py-1">
                      {study.category}
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-white/20">
                      <Globe2 className="w-3 h-3 mr-1 text-gold-400" />
                      {study.region}
                    </Badge>
                    <span className="text-xs text-gray-400 ml-auto font-medium">
                      Campaign Duration: <strong className="text-white">{study.duration}</strong>
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                      {study.title}
                    </h2>
                    <p className="text-sm font-semibold text-gold-400/90">
                      Target Niche: {study.niche} • {study.client}
                    </p>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {study.overview}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-dark-900/90 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-1 flex items-center gap-1.5">
                        The Challenge
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-dark-900/90 border border-gold-500/20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        The Nexalogic Strategy & Deployment
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {study.strategy}
                      </p>
                    </div>
                  </div>

                  {/* Keywords Targeted */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                      Primary Keywords Scaled:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {study.keywordsWon.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-3 py-1 rounded-lg bg-dark-700 border border-white/10 text-xs font-medium text-emerald-400"
                        >
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Metrics Card Column */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  {/* Image banner */}
                  <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
                        Package Utilized:
                      </p>
                      <p className="text-xs font-bold text-white truncate">
                        {study.packageUsed}
                      </p>
                    </div>
                  </div>

                  {/* Metric Stat Blocks */}
                  <div className="grid grid-cols-3 gap-3">
                    {study.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3.5 rounded-xl bg-dark-900/90 border border-white/10 text-center"
                      >
                        <div className="text-xs text-gray-400 font-medium mb-1">
                          {m.label}
                        </div>
                        <div className="text-lg sm:text-xl font-extrabold text-white">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-0.5 mt-0.5">
                          <TrendingUp className="w-3 h-3" />
                          {m.change}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <a
                    href="#packages"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark-900 font-bold text-xs sm:text-sm transition-all shadow-glow"
                  >
                    Deploy Similar Campaign For Your Site
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Proof Assurance */}
      <section className="py-12 bg-dark-800 border-t border-dark-700 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <ShieldCheck className="w-8 h-8 text-gold-500 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Want to Inspect Metrics Before Ordering?
          </h3>
          <p className="text-sm text-gray-300 mb-6">
            We are transparent about our inventory power. Request a 3–5 sample batch from Sarah in chat or connect directly with our Telegram Admin to audit live Moz DA and Ahrefs DR metrics.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://t.me/smartlinker786"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-500/30 transition-all"
            >
              Request Sample via Telegram (@smartlinker786)
            </a>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-dark-700 text-gray-300 border border-white/10 text-xs font-semibold hover:text-white transition-all"
            >
              ← Back to Main Page
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
