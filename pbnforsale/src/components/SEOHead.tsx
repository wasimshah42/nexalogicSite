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
    let title = 'Nexalogic Technologies | Premium PBN Backlinks, Guest Posts & SEO Authority';
    let description = "Scale your domain authority with Nexalogic's private inventory of 12,000+ aged domains. High DA/DR 70+, permanent dofollow links, strict outbound control.";

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
        description = 'Jasa backlink PBN berkualitas & bergaransi dari Nexalogic Technologies. 12.000+ aged domains, DA/DR 40+ hingga 90+, aman Google, drip-feed alami, terima niche judi/casino/crypto & general.';
      }
    } else {
      if (location.pathname.includes('/blog')) {
        title = 'SEO Authority & PBN Strategy Blog | Nexalogic Technologies';
        description = 'Explore modern link building strategies, PBN safety guidelines, and search engine ranking techniques.';
      } else if (location.pathname.includes('/portfolio')) {
        title = 'SEO Case Studies & Backlink Portfolio | Nexalogic Technologies';
        description = 'Discover how Nexalogic authority links helped agencies and businesses achieve sustainable #1 rankings on Google.';
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
