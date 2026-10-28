import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Shield, Clock, Award, Headphones, Send, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { sendContactMessage } from '../lib/contactService';

const benefits = [
  { icon: Shield, label: '100% Risk Free' },
  { icon: Clock, label: 'FREE Expert Advice' },
  { icon: Award, label: '#1 Rankings Goal' },
  { icon: Headphones, label: '24/7 Support' },
];

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('sending');
    try {
      const res = await sendContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: 'Website CTA Form',
      });

      if (res.success) {
        setStatus('success');
        setStatusMessage(res.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(res.message);
      }
    } catch {
      setStatus('error');
      setStatusMessage('Failed to send message. Please email sales@nexalogic.site directly.');
    }
  };

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
                <p className="text-lg text-gray-300 leading-relaxed">
                  Take the first step towards expanding your business online with our premium 
                  backlink services. We work with private individuals and SEO agencies to help 
                  you rank your websites correctly. Contact us 24/7 at{' '}
                  <a href="mailto:sales@nexalogic.site" className="text-gold-400 font-medium underline hover:text-gold-300">
                    sales@nexalogic.site
                  </a>
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
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
                    <Mail className="w-5 h-5 text-gold-500" />
                    Email Sales Directly
                  </a>
                </div>

                {/* Contact form with direct inbox delivery */}
                <div className="mt-8 pt-6 border-t border-white/10 max-w-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-gold-500" />
                    Send a Direct Message
                  </h3>

                  {status === 'success' ? (
                    <div className="p-6 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-white space-y-3 animate-fade-in-up">
                      <div className="flex items-center gap-3 text-gold-400 font-bold text-lg">
                        <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                        Message Sent Successfully!
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {statusMessage || 'Your message has been delivered to sales@nexalogic.site. Our team will get back to you shortly.'}
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-2 text-xs font-semibold text-gold-400 hover:underline"
                      >
                        ← Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Your Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Your Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all text-sm"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2">
                        <label className="block text-xs font-medium text-gray-300 mb-1">Your Message</label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project or backlink requirements..."
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-dark-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all text-sm"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="col-span-1 sm:col-span-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                          {statusMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="col-span-1 sm:col-span-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl hover:from-gold-400 hover:to-gold-500 transition-all disabled:opacity-50 shadow-glow"
                      >
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-dark-900" />
                            Sending to sales@nexalogic.site...
                          </>
                        ) : (
                          <>
                            Send Message to Inbox
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Content - Benefits */}
              <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-4 lg:p-6 rounded-xl bg-dark-900/50 border border-white/10 text-center hover:border-gold-500/30 transition-all"
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
