import { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Zap, Clock, TrendingUp, CreditCard, Bitcoin } from 'lucide-react';

const trustBadges = [
  { icon: TrendingUp, label: 'DA 50+ Aged Domains' },
  { icon: Shield, label: '100% Google Safe' },
  { icon: Zap, label: 'Permanent Indexed Links' },
  { icon: Clock, label: 'Fast 48hr Delivery' },
];

const paymentMethods = [
  { icon: CreditCard, label: 'Card' },
  { icon: null, label: 'PayPal', custom: 'PP' },
  { icon: Bitcoin, label: 'Crypto' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="SEO Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/70 to-dark-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.1s' }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                Trusted Digital Marketing Since 2014
              </span>
            </div>

            {/* Main Headline */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Drive High Rankings with{' '}
                <span className="text-gradient">Premium Backlinks</span>{' '}
                That Convert
              </h1>
            </div>

            {/* Subheadline */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl">
                <strong className="text-white">Nexalogic Technologies</strong> is the world's safest backlink service company. 
                Boost your website rankings, bring in high-quality traffic, and gain the visibility your business needs to succeed.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <badge.icon className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.5s' }}>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all shadow-glow hover:shadow-glow-lg"
              >
                View Backlinks For Sale
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/5 transition-all"
              >
                Link Building Packages
              </a>
            </div>

            {/* Payment Methods */}
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-gray-400 mb-3">We Accept Secure Payments</p>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">Pay by</span>
                <div className="flex items-center gap-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                    >
                      {method.icon ? (
                        <method.icon className="w-4 h-4 text-gold-500" />
                      ) : (
                        <span className="text-xs font-bold text-gold-500">{method.custom}</span>
                      )}
                      <span className="text-sm text-gray-300">{method.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="animate-on-scroll opacity-0 hidden lg:block" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-3xl blur-2xl" />
              <div className="relative glass-effect rounded-2xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Nexalogic Technologies</p>
                    <p className="text-2xl font-bold text-white">Premium Network</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-dark-900" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-3xl font-bold text-gold-500">1M+</p>
                    <p className="text-sm text-gray-400">Links Delivered</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-3xl font-bold text-gold-500">4.9★</p>
                    <p className="text-sm text-gray-400">Rating</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-3xl font-bold text-gold-500">97%</p>
                    <p className="text-sm text-gray-400">Success Rate</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-3xl font-bold text-gold-500">10+</p>
                    <p className="text-sm text-gray-400">Years Experience</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-dark-900" />
                    </div>
                    <div>
                      <p className="text-white font-medium">100% Safe & Secure</p>
                      <p className="text-sm text-gray-400">Google-friendly backlinks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10" />
    </section>
  );
}
