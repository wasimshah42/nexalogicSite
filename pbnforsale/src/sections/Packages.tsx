import { useEffect, useRef } from 'react';
import { Check, Star, Zap, Building2, ArrowRight } from 'lucide-react';

const packages = [
  {
    name: 'Starter Package',
    subtitle: 'Best for New & Small Sites',
    price: 50,
    duration: '1 Day',
    icon: Zap,
    features: [
      '100 & 20 Blogroll High-DA PBN Backlinks',
      'Niche-Relevant Content',
      'Manual Placement',
      'Do-Follow Links',
      'Delivery: 1–2 Days',
      'Report Included',
    ],
    cta: 'Order Now',
    popular: false,
  },
  {
    name: 'Growth Package',
    subtitle: 'Best for Competitive Niches',
    price: 100,
    duration: '2 Days',
    icon: Star,
    features: [
      '200 & 30 Blogroll High-DA PBN Backlinks',
      'Keywords Tracked',
      'Niche Edits Included',
      'Authority Domains',
      'Manual Placement',
      'Fast Delivery',
      'Full SEO Report',
    ],
    cta: 'Choose Plan',
    popular: true,
  },
  {
    name: 'Authority Package',
    subtitle: 'Best for Agencies & Power SEO',
    price: 200,
    duration: '3 Days',
    icon: Building2,
    features: [
      '450 & 10 Blogroll High-DA/DR PBN Backlinks',
      'Premium Authority Domains',
      'Advanced Anchor Strategy',
      'Manual Placement Only',
      'Priority Delivery',
      'Detailed Report + Support',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="packages" ref={sectionRef} className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-gradient">PBN Package</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Select the package that best fits your SEO goals. All packages include our 
            premium quality guarantee and permanent link placement.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`animate-on-scroll opacity-0 relative group ${
                pkg.popular ? 'md:-mt-4 md:mb-4' : ''
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full p-6 lg:p-8 rounded-2xl border transition-all hover:-translate-y-2 ${
                  pkg.popular
                    ? 'bg-dark-700 border-gold-500/50 shadow-glow'
                    : 'bg-dark-900 border-dark-600 hover:border-gold-500/30'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      pkg.popular ? 'bg-gold-500' : 'bg-gold-500/10'
                    }`}
                  >
                    <pkg.icon
                      className={`w-6 h-6 ${
                        pkg.popular ? 'text-dark-900' : 'text-gold-500'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                    <p className="text-sm text-gray-400">{pkg.subtitle}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-400 text-sm">Duration: {pkg.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          pkg.popular ? 'bg-gold-500' : 'bg-gold-500/20'
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            pkg.popular ? 'text-dark-900' : 'text-gold-500'
                          }`}
                        />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 hover:from-gold-400 hover:to-gold-500'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {pkg.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.5s' }}>
          <p className="text-gray-400">
            All packages include{' '}
            <span className="text-gold-500">100% money-back guarantee</span> if you're not satisfied.
          </p>
        </div>
      </div>
    </section>
  );
}
