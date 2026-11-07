import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function SEOHead() {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const isIndonesian = language === 'id' || location.pathname.startsWith('/id');
    const isKhmer = language === 'km' || location.pathname.startsWith('/km');

    // Update document HTML lang attribute
    document.documentElement.lang = isIndonesian ? 'id' : isKhmer ? 'km' : 'en';

    // Title and Description Mapping
    let title = 'Buy Premium PBN Backlinks & Authority Domains — Nexalogic';
    let description = "Buy premium PBN backlinks & high DA/DR aged domain links from Nexalogic. Vast network of aged domains, permanent dofollow, Google-safe drip feed, and 95%+ indexation.";

    if (isIndonesian) {
      if (location.pathname.includes('/blog')) {
        title = 'Blog SEO & Panduan Backlink PBN Indonesia | Nexalogic Technologies';
        description = 'Kumpulan artikel dan panduan link building, strategi PBN aman tanpa deindex, dan optimasi SEO Google Indonesia.';
      } else if (location.pathname.includes('/portfolio')) {
        title = 'Studi Kasus & Portofolio Backlink SEO Indonesia | Nexalogic Technologies';
        description = 'Lihat hasil peningkatan ranking Google dan pertumbuhan organic traffic klien Nexalogic menggunakan jaringan PBN authority.';
      } else if (location.pathname.includes('/tools/pagespeed-checker')) {
        title = 'Cek Kecepatan Website & Core Web Vitals Gratis | Nexalogic Tools';
        description = 'Analisis performa website, PageSpeed, dan Core Web Vitals untuk meningkatkan ranking di Google Indonesia.';
      } else {
        title = 'Nexalogic Technologies | Jasa Backlink PBN Murah, Aged Domains & SEO Authority Indonesia';
        description = 'Jasa backlink PBN berkualitas & bergaransi dari Nexalogic Technologies. Jaringan luas aged domains, DA/DR 40+ hingga 90+, aman Google, drip-feed alami, terima niche judi/casino/crypto & general.';
      }
    } else if (isKhmer) {
      if (location.pathname.includes('/blog')) {
        title = 'ប្លុក SEO & យុទ្ធសាស្ត្រ Backlink PBN កម្ពុជា | Nexalogic Technologies';
        description = 'ស្វែងយល់ពីយុទ្ធសាស្ត្រ Link Building ទំនើប គោលការណ៍សុវត្ថិភាព PBN និងបច្ចេកទេសបង្កើនចំណាត់ថ្នាក់ Google សម្រាប់គេហទំព័រកម្ពុជា។';
      } else if (location.pathname.includes('/portfolio')) {
        title = 'ករណីសិក្សា SEO & ផលប័ត្រ Backlink កម្ពុជា | Nexalogic Technologies';
        description = 'ស្វែងយល់ពីរបៀបដែល Nexalogic Authority Links ជួយឱ្យគេហទំព័រសម្រេចបានចំណាត់ថ្នាក់លេខ 1 ប្រកបដោយនិរន្តរភាពលើ Google ។';
      } else if (location.pathname.includes('/tools/pagespeed-checker')) {
        title = 'ឧបករណ៍ពិនិត្យល្បឿនគេហទំព័រ & Core Web Vitals ដោយឥតគិតថ្លៃ | Nexalogic Tools';
        description = 'ឧបករណ៍ឥតគិតថ្លៃដើម្បីធ្វើតេស្តល្បឿនគេហទំព័រ និង Core Web Vitals សម្រាប់ទីផ្សារកម្ពុជា។';
      } else {
        title = 'Nexalogic Technologies | សេវាកម្ម Backlink PBN & Link Building គុណភាពខ្ពស់ កម្ពុជា';
        description = 'ទិញ backlink PBN និង link building លំដាប់ខ្ពស់ពី Nexalogic Technologies ។ Aged domains DA/DR 40+ ដល់ 90+, ទទួលយក Casino, iGaming & Crypto, សុវត្ថិភាព Google 100% ។';
      }
    } else {
      if (location.pathname.includes('/blog')) {
        title = 'SEO Authority & PBN Strategy Blog | Nexalogic Technologies';
        description = 'Explore modern link building strategies, PBN safety guidelines, and search engine ranking techniques.';
      } else if (location.pathname.includes('/portfolio')) {
        title = 'SEO Case Studies & Backlink Portfolio | Nexalogic Technologies';
        description = 'Discover how Nexalogic authority links helped agencies and businesses achieve sustainable #1 rankings on Google.';
      } else if (location.pathname.includes('/tools/pagespeed-checker')) {
        title = 'Website Speed & Core Web Vitals Checker | Nexalogic Tools';
        description = 'Free tool to test website performance, page load speed, and Core Web Vitals metrics.';
      }
    }

    // Set document title
    document.title = title;

    // Set Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Set OpenGraph Meta
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Set Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://nexalogic.site${location.pathname}`);
    }
  }, [language, location.pathname]);

  return null;
}
