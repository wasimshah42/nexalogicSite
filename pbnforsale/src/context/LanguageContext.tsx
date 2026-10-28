import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type LanguageCode = 'en' | 'id' | 'km'; // en: English, id: Bahasa Indonesia, km: Khmer (Cambodia)
export type CurrencyCode = 'USD' | 'IDR' | 'KHR';

export interface LanguageContextType {
  language: LanguageCode;
  currency: CurrencyCode;
  countryName: string;
  countryCode: string;
  setLanguage: (lang: LanguageCode) => void;
  setCurrency: (curr: CurrencyCode) => void;
  t: (key: string) => string;
}

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Nav
    'nav.why_us': 'Why Us',
    'nav.case_studies': 'Case Studies',
    'nav.blog': 'Blog',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.rankpilot': 'Rankpilot',
    'nav.buy_now': 'Buy Now',

    // Hero
    'hero.badge': 'Trusted Digital Marketing Since 2014',
    'hero.title_start': 'Drive High Rankings with ',
    'hero.title_gradient': 'Premium Backlinks',
    'hero.title_end': ' That Convert',
    'hero.desc': "Nexalogic Technologies is the world's safest backlink service company. Boost your website rankings, bring in high-quality traffic, and gain the visibility your business needs to succeed.",
    'hero.cta_buy': 'View Backlinks For Sale',
    'hero.cta_packages': 'Link Building Packages',
    'hero.payment_text': 'We Accept Secure Payments',

    // Trust Badges
    'trust.da': 'DA 50+ Aged Domains',
    'trust.safe': '100% Google Safe',
    'trust.indexed': 'Permanent Indexed Links',
    'trust.delivery': 'Fast 48hr Delivery',

    // Packages Section
    'pkg.badge': 'Nexalogic Wholesale Pricing • 12,000+ Domain Inventory',
    'pkg.title': 'Choose Your PBN & Backlink Package',
    'pkg.desc': 'Direct agency wholesale rates with strict outbound link control, natural drip-feeding, and a verified 95%+ indexation rate. Accept all niches including Casino & Crypto.',
    'pkg.tab_all': 'All Packages',
    'pkg.tab_tier1': 'Tier 1: General & Niche',
    'pkg.tab_tier2': 'Tier 2: High DA/DR',
    'pkg.tab_tier3': 'Tier 3: Country & EDU',
    'pkg.order_now': 'Order Package',
    'pkg.bulk_title': 'Ordering 500+ Links or Need a 3–5 URL Sample Batch?',
    'pkg.bulk_desc': 'Connect directly with our Admin on Telegram or talk with Sarah in chat. We provide custom bulk discount tiers and verified sample batches so you can inspect Moz/Ahrefs metrics prior to ordering.',

    // Contact
    'contact.title_start': 'Ready to Dominate ',
    'contact.title_gradient': 'Search Rankings?',
    'contact.desc': 'Take the first step towards expanding your business online with our premium backlink services. We work with private individuals and SEO agencies to help you rank your websites correctly.',
    'contact.send_dm': 'Send a Direct Message',
    'contact.name_placeholder': 'Your Name',
    'contact.email_placeholder': 'Your Email',
    'contact.msg_placeholder': 'Tell us about your project or backlink requirements...',
    'contact.submit_btn': 'Send Message to Inbox',
  },
  id: {
    // Nav
    'nav.why_us': 'Keunggulan Kami',
    'nav.case_studies': 'Studi Kasus SEO',
    'nav.blog': 'Blog',
    'nav.testimonials': 'Testimoni',
    'nav.faq': 'Tanya Jawab',
    'nav.rankpilot': 'Rankpilot',
    'nav.buy_now': 'Beli Sekarang',

    // Hero
    'hero.badge': 'Penyedia Digital Marketing Terpercaya Sejak 2014',
    'hero.title_start': 'Tingkatkan Ranking Tertinggi dengan ',
    'hero.title_gradient': 'Backlink Berkualitas',
    'hero.title_end': ' yang Terbukti Konversi',
    'hero.desc': 'Nexalogic Technologies adalah penyedia layanan backlink paling aman di dunia. Dongkrak ranking website Anda, datangkan traffic organik berkualitas, dan raih visibilitas bisnis terbaik.',
    'hero.cta_buy': 'Lihat Daftar Backlink',
    'hero.cta_packages': 'Pilihan Paket Backlink',
    'hero.payment_text': 'Menerima Pembayaran Aman (IDR, Crypto, Transfer)',

    // Trust Badges
    'trust.da': 'Domain Berumur DA 50+',
    'trust.safe': '100% Aman dari Pinalti Google',
    'trust.indexed': 'Link Permanen Terindeks',
    'trust.delivery': 'Pengiriman Cepat 48 Jam',

    // Packages Section
    'pkg.badge': 'Harga Grosir Nexalogic • Jaringan 12.000+ Domain Otoritas',
    'pkg.title': 'Pilih Paket PBN & Backlink Pilihan Anda',
    'pkg.desc': 'Tarif wholesale langsung untuk agensi dengan kontrol outbound link ketat, drip-feed alami, dan rasio indeksasi 95%+. Menerima semua niche termasuk Judi Online / Casino, Crypto, dan Slot.',
    'pkg.tab_all': 'Semua Paket',
    'pkg.tab_tier1': 'Tier 1: General & Niche',
    'pkg.tab_tier2': 'Tier 2: High DA/DR',
    'pkg.tab_tier3': 'Tier 3: Domain Negara & EDU',
    'pkg.order_now': 'Pesan Paket Ini',
    'pkg.bulk_title': 'Pesan 500+ Link atau Butuh Contoh Sample 3–5 URL?',
    'pkg.bulk_desc': 'Hubungi Admin kami langsung di Telegram atau chat dengan Sarah. Kami menyediakan diskon grosir khusus pesanan besar dan batch sample gratis untuk verifikasi metrik Ahrefs & Moz.',

    // Contact
    'contact.title_start': 'Siap Menguasai ',
    'contact.title_gradient': 'Halaman 1 Google?',
    'contact.desc': 'Mulai tingkatkan dominasi bisnis online Anda bersama backlink premium kami. Kami melayani pemilik website personal hingga agency SEO besar.',
    'contact.send_dm': 'Kirim Pesan Langsung ke Inbox',
    'contact.name_placeholder': 'Nama Lengkap Anda',
    'contact.email_placeholder': 'Email Anda',
    'contact.msg_placeholder': 'Tuliskan kebutuhan backlink atau target website Anda...',
    'contact.submit_btn': 'Kirim Pesan ke Sales',
  },
  km: {
    // Nav (Khmer for Cambodia)
    'nav.why_us': 'ហេតុអ្វីជ្រើសរើសយើង',
    'nav.case_studies': 'ករណីសិក្សា SEO',
    'nav.blog': 'ប្លុក',
    'nav.testimonials': 'មតិអតិថិជន',
    'nav.faq': 'សំណួរញឹកញាប់',
    'nav.rankpilot': 'Rankpilot',
    'nav.buy_now': 'ទិញឥឡូវនេះ',

    // Hero
    'hero.badge': 'អ្នកជំនាញ Digital Marketing គួរឱ្យទុកចិត្តតាំងពីឆ្នាំ 2014',
    'hero.title_start': 'ជំរុញចំណាត់ថ្នាក់ខ្ពស់ជាមួយ ',
    'hero.title_gradient': 'Backlinks លំដាប់ខ្ពស់',
    'hero.title_end': ' ដែលនាំមកនូវផលពិតប្រាកដ',
    'hero.desc': 'Nexalogic Technologies គឺជាក្រុមហ៊ុនផ្តល់សេវា backlink ដែលមានសុវត្ថិភាពបំផុតលើពិភពលោក។ បង្កើនចំណាត់ថ្នាក់គេហទំព័ររបស់អ្នក និងទាក់ទាញអតិថិជនសក្តានុពល។',
    'hero.cta_buy': 'មើលបញ្ជី Backlinks សម្រាប់លក់',
    'hero.cta_packages': 'កញ្ចប់សេវា Link Building',
    'hero.payment_text': 'យើងទទួលការទូទាត់ប្រកបដោយសុវត្ថិភាព (ABA, Crypto, USDT)',

    // Trust Badges
    'trust.da': 'Aged Domains DA 50+',
    'trust.safe': 'សុវត្ថិភាព Google 100%',
    'trust.indexed': 'Permanent Indexed Links',
    'trust.delivery': 'ដឹកជញ្ជូនរហ័សក្នុង 48 ម៉ោង',

    // Packages Section
    'pkg.badge': 'តម្លៃបោះដុំ Nexalogic • បណ្តាញ Domain ជាង 12,000+',
    'pkg.title': 'ជ្រើសរើសកញ្ចប់ PBN & Backlink របស់អ្នក',
    'pkg.desc': 'តម្លៃបោះដុំផ្ទាល់សម្រាប់ Agency ជាមួយនឹងការគ្រប់គ្រង Outbound Link យ៉ាងតឹងរ៉ឹង ការ drip-feed បែបធម្មជាតិ និងអត្រា index លើសពី 95%+។ ទទួលយកគ្រប់ niche រួមទាំង Casino, iGaming & Crypto។',
    'pkg.tab_all': 'កញ្ចប់ទាំងអស់',
    'pkg.tab_tier1': 'កម្រិត 1: General & Niche',
    'pkg.tab_tier2': 'កម្រិត 2: High DA/DR',
    'pkg.tab_tier3': 'កម្រិត 3: ប្រទេស & EDU',
    'pkg.order_now': 'បញ្ជាទិញកញ្ចប់នេះ',
    'pkg.bulk_title': 'បញ្ជាទិញ 500+ Links ឬត្រូវការមើល Sample 3–5 URLs?',
    'pkg.bulk_desc': 'ទាក់ទងផ្ទាល់ជាមួយ Admin តាម Telegram ឬជជែកជាមួយ Sarah តាម Live Chat។ យើងមានតម្លៃពិសេសសម្រាប់ការកុម្ម៉ង់ច្រើន និងផ្ញើ Sample សម្រាប់ពិនិត្យ Moz/Ahrefs មុនពេលបញ្ជាទិញ។',

    // Contact
    'contact.title_start': 'ត្រៀមខ្លួនគ្រប់គ្រង ',
    'contact.title_gradient': 'ចំណាត់ថ្នាក់ស្វែងរកហើយឬនៅ?',
    'contact.desc': 'បោះជំហានដំបូងក្នុងការពង្រីកអាជីវកម្មរបស់អ្នកនៅលើអ៊ីនធឺណិតជាមួយនឹងសេវាកម្ម backlink លំដាប់ខ្ពស់របស់យើង។',
    'contact.send_dm': 'ផ្ញើសារផ្ទាល់ទៅកាន់ Inbox',
    'contact.name_placeholder': 'ឈ្មោះរបស់អ្នក',
    'contact.email_placeholder': 'អ៊ីមែលរបស់អ្នក',
    'contact.msg_placeholder': 'ប្រាប់យើងអំពីគេហទំព័រ ឬតម្រូវការ backlink របស់អ្នក...',
    'contact.submit_btn': 'ផ្ញើសារទៅកាន់ផ្នែកលក់',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isIdRoute = location.pathname === '/id' || location.pathname.startsWith('/id/');

  // Initial state based on current URL path or defaults
  const [language, setLanguageState] = useState<LanguageCode>(isIdRoute ? 'id' : 'en');
  const [currency, setCurrencyState] = useState<CurrencyCode>(isIdRoute ? 'IDR' : 'USD');
  const [countryName, setCountryName] = useState<string>(isIdRoute ? 'Indonesia' : 'Global');
  const [countryCode, setCountryCode] = useState<string>(isIdRoute ? 'ID' : 'US');

  // Sync state whenever route changes
  useEffect(() => {
    if (isIdRoute) {
      setLanguageState('id');
      setCurrencyState('IDR');
      setCountryName('Indonesia');
      setCountryCode('ID');
    }
  }, [isIdRoute]);

  useEffect(() => {
    // If user is already on a dedicated /id path, do not overwrite with geoip
    if (window.location.pathname.startsWith('/id')) {
      return;
    }

    // 1. Check local storage preference
    const savedLang = localStorage.getItem('nexalogic_lang') as LanguageCode | null;
    const savedCurrency = localStorage.getItem('nexalogic_currency') as CurrencyCode | null;

    if (savedLang && (savedLang === 'en' || savedLang === 'id' || savedLang === 'km')) {
      setLanguageState(savedLang);
      if (savedCurrency) setCurrencyState(savedCurrency);
      return;
    }

    // 2. Geolocation IP Fetching (Targeting Indonesia, Cambodia & Global)
    const detectLocation = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            const cCode = (data.country_code || '').toUpperCase();
            setCountryCode(cCode);
            setCountryName(data.country || 'Indonesia');

            if (cCode === 'KH') {
              setLanguageState('km');
              setCurrencyState('USD');
              localStorage.setItem('nexalogic_lang', 'km');
              localStorage.setItem('nexalogic_currency', 'USD');
            } else if (cCode === 'ID') {
              setLanguageState('id');
              setCurrencyState('IDR');
              localStorage.setItem('nexalogic_lang', 'id');
              localStorage.setItem('nexalogic_currency', 'IDR');
            } else {
              setLanguageState('en');
              setCurrencyState('USD');
              localStorage.setItem('nexalogic_lang', 'en');
              localStorage.setItem('nexalogic_currency', 'USD');
            }
          }
        }
      } catch (err) {
        console.warn('Geolocation detection error:', err);
      }
    };

    detectLocation();
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('nexalogic_lang', lang);

    if (lang === 'id') {
      setCurrencyState('IDR');
      localStorage.setItem('nexalogic_currency', 'IDR');

      // Navigate to /id URL equivalent if not already on /id
      const currentPath = location.pathname;
      if (!currentPath.startsWith('/id')) {
        const newPath = currentPath === '/' ? '/id' : `/id${currentPath}`;
        navigate(newPath);
      }
    } else {
      setCurrencyState('USD');
      localStorage.setItem('nexalogic_currency', 'USD');

      // Strip /id prefix if navigating to en or km
      const currentPath = location.pathname;
      if (currentPath.startsWith('/id')) {
        const newPath = currentPath.replace(/^\/id/, '') || '/';
        navigate(newPath);
      }
    }
  };

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    localStorage.setItem('nexalogic_currency', curr);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currency,
        countryName,
        countryCode,
        setLanguage,
        setCurrency,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
