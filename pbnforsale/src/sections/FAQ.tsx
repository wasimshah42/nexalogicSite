import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const faqsEn = [
  {
    question: 'What is a PBN link?',
    answer: "A PBN (Private Blog Network) link is a high-quality backlink from a carefully curated network of authoritative websites that points to your website. These links are powerful tools for boosting your site's domain authority, improving search engine rankings, and driving organic traffic. At Nexalogic Technologies, our network consists of genuine, aged domains with real traffic and established authority.",
  },
  {
    question: 'Are PBN backlinks safe from Google penalties?',
    answer: "Yes, our PBN links are 100% safe! Safety is our top priority. Our network features: Aged domains (5-15+ years old) with clean histories, unique C-class IP addresses across multiple global cloud providers (zero footprint), original contextual content, natural drip-feeding over 7-21 days, and strict outbound link control (maximum 2-3 links per article).",
  },
  {
    question: 'Do you accept competitive niches (Casino, iGaming, Crypto)?',
    answer: "Yes, absolutely! We accept all niches including competitive and high-volume sectors like iGaming, online casino, sports betting, cryptocurrency, forex trading, as well as general corporate and e-commerce websites.",
  },
  {
    question: 'How quickly will I see ranking results?',
    answer: "Most clients begin seeing ranking movements within 2 to 4 weeks of link indexing. Because our aged domains already have established trust in Google's index, link equity flows quickly to boost your target keywords.",
  },
  {
    question: 'How many backlinks do I need to rank on Page 1?',
    answer: "Quality always trumps quantity. A batch of 10 to 25 high-authority PBN links (DA 50-80+) from Nexalogic routinely outperforms hundreds of low-tier directory or spam links. For most competitive terms, our Tier-2 or Tier-3 packages provide the exact authority boost needed.",
  },
  {
    question: 'What payment methods do you accept?',
    answer: "We accept multiple secure payment methods including: Cryptocurrencies (USDT, Bitcoin), Bank Wire Transfer, Credit/Debit Cards, and PayPal. For Indonesian clients, local payment arrangements are available via Telegram sales.",
  },
];

const faqsId = [
  {
    question: 'Apa itu backlink PBN dan fungsinya untuk SEO?',
    answer: 'Backlink PBN (Private Blog Network) adalah tautan berbobot tinggi dari jaringan aged domain otoritas (DA 50+ hingga 90+) yang mengalirkan link equity langsung ke website Anda. Di Google Indonesia, backlink PBN adalah cara paling cepat dan efektif untuk mendongkrak peringkat kata kunci kompetitif ke Halaman 1.',
  },
  {
    question: 'Apakah backlink PBN Nexalogic aman dari pinalti algoritma Google?',
    answer: '100% Aman dan Bebas Jejak (Zero Footprint)! Jaringan Nexalogic dibangun dengan standar enterprise: aged domain berumur 5-15 tahun riwayat bersih, subnet IP C-Class dan server hosting berbeda di seluruh dunia, konten kontekstual mendalam, drip-feed natural (7-21 hari), dan batas tautan keluar ketat (maksimal 2-3 link/artikel).',
  },
  {
    question: 'Apakah menerima niche Judi Online, Slot, Casino, dan Crypto?',
    answer: 'Ya, kami menerima semua jenis niche! Termasuk industri dengan persaingan tinggi di Indonesia seperti situs judi/slot online, casino, cryptocurrency, platform trading, hingga toko online dan website bisnis korporat.',
  },
  {
    question: 'Berapa lama proses pengerjaan dan hasil kenaikan ranking terlihat?',
    answer: 'Penempatan link dikerjakan dan didistribusikan secara bertahap (drip-feed) dalam 48 jam hingga 14 hari kerja. Kenaikan ranking di Google Indonesia umumnya mulai terlihat dalam 2–4 minggu setelah tautan terindeks secara permanen.',
  },
  {
    question: 'Berapa backlink yang saya butuhkan untuk masuk Top 3 Google Indonesia?',
    answer: 'Kualitas selalu mengalahkan kuantitas. Paket 10 hingga 25 link PBN berotoritas tinggi dari Nexalogic terbukti lebih bertenaga daripada ribuan backlink spam murahan. Tim kami siap menganalisis website Anda dan merekomendasikan paket yang tepat.',
  },
  {
    question: 'Bagaimana cara pembayaran untuk pemesanan dari Indonesia?',
    answer: 'Kami menerima pembayaran yang fleksibel dan aman: Transfer Bank / QRIS (melalui koordinasi admin), Cryptocurrency (USDT TRC20/BEP20, Bitcoin), serta PayPal. Hubungi Admin Telegram @smartlinker786 untuk konsultasi dan invoice instan.',
  },
];

export default function FAQ() {
  const { language } = useLanguage();
  const isIndonesian = language === 'id';
  const faqs = isIndonesian ? faqsId : faqsEn;
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
  }, [language]);

  // Generate Google Rich Snippet FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const contactLink = isIndonesian ? '/id#contact' : '#contact';

  return (
    <section id="faq" ref={sectionRef} className="py-20 lg:py-28 bg-dark-800 relative">
      {/* Dynamic JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll opacity-0">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-semibold mb-4 border border-gold-500/20">
            {isIndonesian ? 'Tanya Jawab (FAQ)' : 'FAQ'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            {isIndonesian ? (
              <>
                Pertanyaan yang Sering <span className="text-gradient">Diajukan</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-gradient">Questions</span>
              </>
            )}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {isIndonesian
              ? 'Punya pertanyaan seputar jaringan PBN, keamanan Google, dan metode pemesanan? Temukan jawabannya di bawah ini atau hubungi tim sales kami.'
              : "Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our team."}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`${language}-${index}`}
                value={`item-${index}`}
                className="border border-dark-600 rounded-xl overflow-hidden bg-dark-900 px-6 data-[state=open]:border-gold-500/40 transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-white hover:text-gold-400 py-5 text-base font-semibold [&[data-state=open]>svg]:rotate-180">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-5 pl-8 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-dark-900 border border-dark-600 shadow-xl">
            <MessageCircle className="w-6 h-6 text-gold-500" />
            <div className="text-left">
              <p className="text-white font-semibold">
                {isIndonesian ? 'Masih ada pertanyaan lain?' : 'Still have questions?'}
              </p>
              <p className="text-sm text-gray-400">
                <a href={contactLink} className="text-gold-500 hover:underline font-medium">
                  {isIndonesian ? 'Hubungi tim sales kami' : 'Contact our sales team'}
                </a>{' '}
                {isIndonesian ? 'atau chat langsung via Telegram @smartlinker786' : 'for personalized advice and free sample URLs'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
