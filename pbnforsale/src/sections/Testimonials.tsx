import { useEffect, useRef } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: 'Liam Wheeler',
    rating: 5,
    text: 'I can assure you, that they only place your backlinks in super high-quality PBN Networks that are both safe and reliable. With a limited amount of selling in each site.',
    verified: true,
    purchase: 'Professional Package',
  },
  {
    name: 'Finley Poole',
    rating: 5,
    text: 'PBNs can be quite tricky, and having been burned in the past I was very apprehensive. But their service happens to be quite safe as my website has not seen any penalties. On the contrary, we\'ve seen an increase in rankings.',
    verified: true,
    purchase: 'Enterprise Package',
  },
  {
    name: 'Sarah Mitchell',
    rating: 5,
    text: 'The SERP Missile Package exceeded my expectations. The quality of the links is fantastic, and I love how the service includes both T1 and T2 links, providing a solid foundation for my site.',
    verified: true,
    purchase: 'Starter Package',
  },
  {
    name: 'Danny O\'Brien',
    rating: 5,
    text: 'Great service as always have been buying adult PBN links here for a while and always receive high quality links and a great service. Sites look very real and professionally built.',
    verified: true,
    purchase: 'Professional Package',
  },
  {
    name: 'Michael Chen',
    rating: 5,
    text: 'Just received ours yesterday - so I will be back to give a testament about it. However I really liked the professionalism of the team, reaching out to make sure everything was going on well.',
    verified: true,
    purchase: 'Enterprise Package',
  },
];

export default function Testimonials() {
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
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-28 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            We Care About Our <span className="text-gradient">Clients' Experiences</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Real results from real customers. See why thousands of SEO professionals trust us 
            for all their backlink buying needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`animate-on-scroll opacity-0 group ${
                index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="h-full p-6 rounded-2xl bg-dark-800 border border-dark-600 hover:border-gold-500/30 transition-all hover:-translate-y-1">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-gold-500/30" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-gold-500 text-gold-500"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-dark-600">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                    <span className="text-dark-900 font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{testimonial.name}</span>
                      {testimonial.verified && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">Purchased {testimonial.purchase}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 animate-on-scroll opacity-0" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-400">Verified Purchases</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-400">Real Customer Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-gray-400">Secure Payments</span>
          </div>
        </div>
      </div>
    </section>
  );
}
