import { useEffect, useRef } from 'react';
import { Check, Shield, TrendingUp, Users, Globe, Lock, FileText } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Aged Domains Only',
    description: 'Every PBN link comes from a domain with real history and established authority',
  },
  {
    icon: TrendingUp,
    title: 'Fully Indexed',
    description: 'All our PBN sites are indexed in Google — we guarantee it',
  },
  {
    icon: Users,
    title: 'Real Traffic',
    description: 'Our networks receive genuine organic traffic that passes referral visits',
  },
  {
    icon: Globe,
    title: 'Unique IPs',
    description: 'Complete footprint protection with diverse hosting across multiple Class C IPs',
  },
  {
    icon: FileText,
    title: 'Niche Relevant Content',
    description: 'Your PBN backlinks are placed within contextually relevant articles',
  },
  {
    icon: Lock,
    title: 'Permanent Links',
    description: 'Once placed, your links stay forever — no monthly fees or removals',
  },
];

const highlights = [
  { value: '$10K+', label: 'Per Domain Build Cost' },
  { value: '500+', label: 'Premium Domains' },
  { value: '100%', label: 'Crawler Blocked' },
  { value: '10+', label: 'Years Experience' },
];

export default function WhyChooseUs() {
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
    <section id="why-us" ref={sectionRef} className="py-20 lg:py-28 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            What Makes Our Backlinks <span className="text-gradient">Different?</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            When you're looking to buy premium backlinks, quality matters more than anything else. 
            Our backlinks are not like the cheap, spammy links you'll find elsewhere.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Features List */}
          <div className="space-y-6 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="p-6 rounded-2xl bg-dark-800 border border-dark-600">
              <h3 className="text-xl font-bold text-white mb-4">
                Premium Quality Features
              </h3>
              <p className="text-gray-400 mb-6">
                Every single link in our network is placed on a genuine aged domain with real authority, 
                real traffic, and real rankings in Google.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-xl bg-dark-800 border border-dark-600 hover:border-gold-500/30 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image and Stats */}
          <div className="space-y-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/10 to-gold-600/10 rounded-3xl blur-2xl" />
              <img
                src="/seo-growth.jpg"
                alt="SEO Growth"
                className="relative w-full rounded-2xl border border-dark-600"
              />
            </div>

            {/* Highlight Stats */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-dark-800 border border-dark-600 text-center"
                >
                  <p className="text-2xl lg:text-3xl font-bold text-gold-500 mb-1">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Trust Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-dark-900" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">
                    Built for Major Companies, Now Available to You
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Our PBN networks are built originally for major companies. They are built to rank 
                    their websites, constructed by world leading SEO scientists, to produce rankings 
                    for some of the most competitive keywords in the world!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
