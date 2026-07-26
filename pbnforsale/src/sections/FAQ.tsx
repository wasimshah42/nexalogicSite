import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is a PBN link?',
    answer: 'A PBN (Private Blog Network) link is a high-quality backlink from a carefully curated network of authoritative websites that points to your website. These links are powerful tools for boosting your site\'s domain authority, improving search engine rankings, and driving organic traffic. At Nexalogic Technologies, our network consists of genuine, aged domains with real traffic and established authority.',
  },
  {
    question: 'Are PBN backlinks good?',
    answer: 'Absolutely! PBN backlinks are among the most effective link-building strategies when done correctly. The key is quality over quantity. Our PBN links come from aged domains with genuine authority metrics (DA 30-80+), real organic traffic, and clean backlink profiles. Unlike low-quality link schemes, our professionally managed network provides contextual, relevant backlinks that search engines view favorably.',
  },
  {
    question: 'Do PBNs still work?',
    answer: 'Yes, PBNs absolutely still work in 2025 and remain one of the most powerful SEO strategies available! The key difference today is that quality matters more than ever. Our network has evolved with Google\'s algorithms - we use aged, authoritative domains with real traffic, unique content, diverse hosting, and natural link profiles. Our clients consistently see significant ranking improvements.',
  },
  {
    question: 'What does PBN stand for in SEO?',
    answer: 'PBN stands for Private Blog Network. It refers to a collection of high-authority websites owned or controlled by SEO professionals, used strategically to build powerful backlinks to client websites. The "private" aspect means these networks are carefully managed and not available to the general public, ensuring link quality and exclusivity.',
  },
  {
    question: 'How many backlinks do I need to rank?',
    answer: 'The number of backlinks needed varies based on your niche competition, current domain authority, and target keywords. However, quality always trumps quantity! A handful of powerful links from high-DA sites (like ours) can outperform hundreds of low-quality links. For most websites, we recommend starting with 5-10 high-quality PBN links to see initial movement.',
  },
  {
    question: 'Are your PBN links safe?',
    answer: 'Yes, our PBN links are 100% safe! Safety is our top priority, and we\'ve built our entire business around risk-free link building. Our network features: Aged domains (5-15+ years old) with clean histories, unique IP addresses and diverse hosting across multiple providers, original high-quality content written by native English speakers, natural link velocity and anchor text distribution, sites with real organic traffic and genuine authority metrics.',
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Most clients begin seeing ranking improvements within 2-4 weeks of link placement. However, results can vary based on several factors: your current domain authority, keyword competition, existing backlink profile, and on-page SEO. Some clients see dramatic jumps within days, while competitive niches may take 6-8 weeks for full impact.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept multiple secure payment methods including: Credit/Debit Cards (Visa, Mastercard, American Express), PayPal, Cryptocurrencies (Bitcoin, Ethereum, and more), and Bank Transfer for large orders. All transactions are encrypted and secure.',
  },
];

export default function FAQ() {
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
    <section id="faq" ref={sectionRef} className="py-20 lg:py-28 bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, 
            feel free to contact our team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-dark-600 rounded-xl overflow-hidden bg-dark-900 px-6 data-[state=open]:border-gold-500/30"
              >
                <AccordionTrigger className="text-left text-white hover:text-gold-500 py-5 text-base font-medium [&[data-state=open]>svg]:rotate-180">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-5 pl-8 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-dark-900 border border-dark-600">
            <MessageCircle className="w-6 h-6 text-gold-500" />
            <div className="text-left">
              <p className="text-white font-medium">Still have questions?</p>
              <p className="text-sm text-gray-400">
                <a href="#contact" className="text-gold-500 hover:underline">Contact us</a> for personalized advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
