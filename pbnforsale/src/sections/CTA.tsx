import { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Clock, Award, Headphones } from 'lucide-react';

const benefits = [
  { icon: Shield, label: '100% Risk Free' },
  { icon: Clock, label: 'FREE Expert Advice' },
  { icon: Award, label: '#1 Rankings Goal' },
  { icon: Headphones, label: '24/7 Support' },
];

export default function CTA() {
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
    <section id="contact" ref={sectionRef} className="py-20 lg:py-28 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Gradient */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-gold-500/20 rounded-3xl blur-2xl" />
          
          {/* Content */}
          <div className="relative p-8 lg:p-16 rounded-3xl bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-500/20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6 animate-on-scroll opacity-0">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Ready to Dominate{' '}
                  <span className="text-gradient">Search Rankings?</span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Take the first step towards expanding your business online with our premium 
                  backlink services. We work with private individuals and SEO agencies to help 
                  you rank your websites correctly. Or contact 24/7 on:
                  Email: sales@nexalogic.site Or support@nexalogic.site / 
                  Telegram: @smartlinker786
                  Whatsapp: +923118895477
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#packages"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all shadow-glow hover:shadow-glow-lg"
                  >
                    Buy Backlinks Now
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:sales@nexalogic.site"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/5 transition-all"
                  >
                    Contact Us Today
                  </a>
                </div>

                {/* Simple contact form */}
                <form
                  action="mailto:sales@nexalogic.site"
                  method="post"
                  encType="text/plain"
                  className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl"
                >
                  <input
                    type="text"
                    name="Name"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <input
                    type="email"
                    name="Email"
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <textarea
                    name="Message"
                    placeholder="Your Message"
                    required
                    className="col-span-1 sm:col-span-2 w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    rows={4}
                  />
                  <button
                    type="submit"
                    className="col-span-1 sm:col-span-2 inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Right Content - Benefits */}
              <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-4 lg:p-6 rounded-xl bg-dark-900/50 border border-white/10 text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gold-500/10 flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <p className="text-white font-medium text-sm lg:text-base">
                        {benefit.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="mt-6 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-dark-900" />
                    </div>
                    <div>
                      <p className="text-white font-medium">100% Money-Back Guarantee</p>
                      <p className="text-sm text-gray-400">Not satisfied? Get a full refund</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
