const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const routes = [
  // Indonesian Main Pages
  {
    dir: 'id',
    title: 'Nexalogic Technologies | Jasa Backlink PBN Murah, Aged Domains & SEO Authority Indonesia',
    desc: 'Jasa backlink PBN berkualitas & bergaransi dari Nexalogic Technologies. Jaringan luas aged domains, DA/DR 40+ hingga 90+, aman Google, drip-feed alami, terima niche judi/casino/crypto.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id',
  },
  {
    dir: 'id/portfolio',
    title: 'Studi Kasus & Portofolio Backlink SEO Indonesia | Nexalogic Technologies',
    desc: 'Lihat hasil peningkatan ranking Google dan pertumbuhan organic traffic klien Nexalogic menggunakan jaringan PBN authority.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/portfolio',
  },
  {
    dir: 'id/blog',
    title: 'Blog SEO & Panduan Backlink PBN Indonesia | Nexalogic Technologies',
    desc: 'Kumpulan artikel dan panduan link building, strategi PBN aman tanpa deindex, dan optimasi SEO Google Indonesia.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog',
  },
  {
    dir: 'id/tools/pagespeed-checker',
    title: 'Cek Kecepatan Website & Core Web Vitals Gratis | Nexalogic Tools',
    desc: 'Analisis performa website, PageSpeed, dan Core Web Vitals untuk meningkatkan ranking di Google Indonesia.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/tools/pagespeed-checker',
  },

  // Cambodia Regional Routes (Khmer)
  {
    dir: 'km',
    title: 'Nexalogic Technologies | សេវាកម្ម Backlink PBN & Link Building គុណភាពខ្ពស់ កម្ពុជា',
    desc: 'ទិញ backlink PBN និង link building លំដាប់ខ្ពស់ពី Nexalogic Technologies ។ Aged domains DA/DR 40+ ដល់ 90+, ទទួលយក Casino, iGaming & Crypto, សុវត្ថិភាព Google 100% ។',
    lang: 'km',
    canonical: 'https://nexalogic.site/km',
  },
  {
    dir: 'km/portfolio',
    title: 'ករណីសិក្សា SEO & ផលប័ត្រ Backlink កម្ពុជា | Nexalogic Technologies',
    desc: 'ស្វែងយល់ពីរបៀបដែល Nexalogic Authority Links ជួយឱ្យគេហទំព័រសម្រេចបានចំណាត់ថ្នាក់លេខ 1 ប្រកបដោយនិរន្តរភាពលើ Google ។',
    lang: 'km',
    canonical: 'https://nexalogic.site/km/portfolio',
  },
  {
    dir: 'km/blog',
    title: 'ប្លុក SEO & យុទ្ធសាស្ត្រ Backlink PBN កម្ពុជា | Nexalogic Technologies',
    desc: 'ស្វែងយល់ពីយុទ្ធសាស្ត្រ Link Building ទំនើប គោលការណ៍សុវត្ថិភាព PBN និងបច្ចេកទេសបង្កើនចំណាត់ថ្នាក់ Google សម្រាប់គេហទំព័រកម្ពុជា។',
    lang: 'km',
    canonical: 'https://nexalogic.site/km/blog',
  },
  {
    dir: 'km/tools/pagespeed-checker',
    title: 'ឧបករណ៍ពិនិត្យល្បឿនគេហទំព័រ & Core Web Vitals ដោយឥតគិតថ្លៃ | Nexalogic Tools',
    desc: 'ឧបករណ៍ឥតគិតថ្លៃដើម្បីធ្វើតេស្តល្បឿនគេហទំព័រ និង Core Web Vitals សម្រាប់ទីផ្សារកម្ពុជា។',
    lang: 'km',
    canonical: 'https://nexalogic.site/km/tools/pagespeed-checker',
  },

  // Global / English Routes
  {
    dir: 'portfolio',
    title: 'SEO Case Studies & Backlink Portfolio | Nexalogic Technologies',
    desc: 'Discover how Nexalogic authority links helped agencies and businesses achieve sustainable #1 rankings on Google.',
    lang: 'en',
    canonical: 'https://nexalogic.site/portfolio',
  },
  {
    dir: 'blog',
    title: 'SEO Authority & PBN Strategy Blog | Nexalogic Technologies',
    desc: 'Explore modern link building strategies, PBN safety guidelines, and search engine ranking techniques.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog',
  },
  {
    dir: 'tools/pagespeed-checker',
    title: 'Website Speed & Core Web Vitals Checker | Nexalogic Tools',
    desc: 'Free tool to test website performance, page load speed, and Core Web Vitals metrics.',
    lang: 'en',
    canonical: 'https://nexalogic.site/tools/pagespeed-checker',
  },

  // Indonesian Blog Articles (High Intent)
  {
    dir: 'id/blog/jasa-backlink-pbn-indonesia-terbaik-panduan-lengkap-menaikkan-da-dr-ranking-google-2026',
    title: 'Jasa Backlink PBN Indonesia Terbaik: Panduan Menaikkan DA/DR & Ranking Google 2026 | Nexalogic',
    desc: 'Pelajari bagaimana strategi PBN modern dengan aged domain otoritas tinggi (DA/DR 50+) dapat mendongkrak peringkat website Anda di Google Indonesia tanpa takut terkena penalti algoritma.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/jasa-backlink-pbn-indonesia-terbaik-panduan-lengkap-menaikkan-da-dr-ranking-google-2026',
  },
  {
    dir: 'id/blog/cara-memilih-backlink-dofollow-berkualitas-tanpa-takut-kena-deindex-google',
    title: 'Cara Memilih Backlink Dofollow Berkualitas Tanpa Takut Kena Deindex Google | Nexalogic',
    desc: 'Panduan praktis bagi webmaster dan praktisi SEO Indonesia dalam menyaring backlink berkualitas tinggi: rasio anchor text, metrik authority asli, dan proteksi deindex.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/cara-memilih-backlink-dofollow-berkualitas-tanpa-takut-kena-deindex-google',
  },
  {
    dir: 'id/blog/pbn-vs-guest-post-mana-yang-lebih-cepat-membawa-website-ke-halaman-1-google',
    title: 'PBN vs Guest Post: Mana yang Lebih Cepat Membawa Website ke Halaman 1 Google? | Nexalogic',
    desc: 'Perbandingan mendalam kelebihan, kekurangan, perbandingan biaya, dan kecepatan hasil antara strategi PBN private network dengan publikasi media nasional.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/pbn-vs-guest-post-mana-yang-lebih-cepat-membawa-website-ke-halaman-1-google',
  },
  {
    dir: 'id/blog/strategi-link-building-untuk-niche-kompetitif-igaming-fintech-crypto',
    title: 'Strategi Link Building untuk Niche Kompetitif (iGaming, Fintech, & Crypto) | Nexalogic',
    desc: 'Teknik SEO & Link Building Footprint-Zero untuk niche dengan persaingan tinggi di Google Indonesia.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/strategi-link-building-untuk-niche-kompetitif-igaming-fintech-crypto',
  },
  {
    dir: 'id/blog/jasa-backlink-pbn-judi-online-slot-terpercaya-2026-strategi-ranking-google-footprint-zero',
    title: 'Jasa Backlink PBN Judi Online & Slot Terpercaya 2026: Strategi Ranking Google Footprint-Zero | Nexalogic',
    desc: 'Panduan jasa backlink PBN judi online, slot gacor & casino terpercaya di Indonesia. Strategi link building tanpa jejak menggunakan aged domain DA 50+.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/jasa-backlink-pbn-judi-online-slot-terpercaya-2026-strategi-ranking-google-footprint-zero',
  },
  {
    dir: 'id/blog/apa-itu-aged-domain-dan-kenapa-penting-untuk-menaikkan-ranking-seo-website',
    title: 'Apa Itu Aged Domain dan Kenapa Penting untuk Menaikkan Ranking SEO Website | Nexalogic',
    desc: 'Mengenal keunggulan aged domain vs fresh domain untuk dominasi hasil pencarian Google. Lolos Google Sandbox dan naikkan DA/DR instan.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/apa-itu-aged-domain-dan-kenapa-penting-untuk-menaikkan-ranking-seo-website',
  },
  {
    dir: 'id/blog/berapa-banyak-backlink-yang-dibutuhkan-untuk-menembus-halaman-1-google-indonesia',
    title: 'Berapa Banyak Backlink yang Dibutuhkan untuk Menembus Halaman 1 Google Indonesia | Nexalogic',
    desc: 'Strategi menghitung kebutuhan backlink & gap analysis kompetitor di Google Indonesia untuk mencapai Top 3 SERP.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/berapa-banyak-backlink-yang-dibutuhkan-untuk-menembus-halaman-1-google-indonesia',
  },
  {
    dir: 'id/blog/cara-kerja-drip-feed-backlink-dan-alasan-pentingnya-untuk-menghindari-penalti-google',
    title: 'Cara Kerja Drip-Feed Backlink dan Alasan Pentingnya untuk Menghindari Penalti Google | Nexalogic',
    desc: 'Mengapa drip-feed link building wajib diterapkan dalam kampanye SEO modern 2026 untuk mempertahankan profil backlink yang natural.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog/cara-kerja-drip-feed-backlink-dan-alasan-pentingnya-untuk-menghindari-penalti-google',
  },

  // English Global Authority Blog Articles
  {
    dir: 'blog/more-than-just-pbn-links-becoming-a-complete-link-building-partner',
    title: 'More Than Just PBN Links: Becoming a Complete Link Building Partner | Nexalogic',
    desc: 'Discover how modern link building goes beyond PBN backlinks and evolves into a complete authority-building strategy for long-term SEO rankings in 2026.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog/more-than-just-pbn-links-becoming-a-complete-link-building-partner',
  },
  {
    dir: 'blog/googles-helpful-content-update-what-changed-and-how-to-protect-your-website',
    title: "Google's Helpful Content Update: What Changed and How to Protect Your Website | Nexalogic",
    desc: "Learn what changed in Google's Helpful Content Update and how to protect your rankings using authority signals and strategic backlinks.",
    lang: 'en',
    canonical: 'https://nexalogic.site/blog/googles-helpful-content-update-what-changed-and-how-to-protect-your-website',
  },
  {
    dir: 'blog/why-google-wont-index-your-pages-and-how-to-fix-it',
    title: "Why Google Won't Index Your Pages (And How to Fix It) | Nexalogic",
    desc: 'Discover the main reasons Google fails to index pages and how to fix indexing issues using authority and technical optimization.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog/why-google-wont-index-your-pages-and-how-to-fix-it',
  },
  {
    dir: 'blog/googles-link-spam-updates-what-still-works',
    title: "Google's Link Spam Updates: What Still Works in 2026 | Nexalogic",
    desc: 'Discover which link building strategies remain effective after Google’s latest spam updates.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog/googles-link-spam-updates-what-still-works',
  },
  {
    dir: 'blog/how-to-buy-pbn-links-safely-in-2026-footprint-protection-fast-indexing',
    title: 'How to Buy PBN Links Safely in 2026: Footprint Protection & Fast Indexing | Nexalogic',
    desc: 'Master zero-footprint link building, aged domain authority selection, anchor text ratios, and Google-safe drip-feeding.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog/how-to-buy-pbn-links-safely-in-2026-footprint-protection-fast-indexing',
  },
  {
    dir: 'blog/igaming-casino-seo-backlinks-how-to-rank-in-southeast-asia-cambodia-global-serps',
    title: 'iGaming & Casino SEO Backlinks: How to Rank in Southeast Asia, Cambodia & Global SERPs | Nexalogic',
    desc: 'Learn how elite operators dominate ultra-competitive casino, sports betting, and crypto search queries using high-authority PBN networks.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog/igaming-casino-seo-backlinks-how-to-rank-in-southeast-asia-cambodia-global-serps',
  },
];

console.log('Generating pre-rendered static route HTML files for 100% Hostinger & Googlebot availability...');

routes.forEach((route) => {
  const targetFolder = path.join(distDir, route.dir);
  fs.mkdirSync(targetFolder, { recursive: true });

  let customizedHtml = baseHtml;

  // Replace lang
  customizedHtml = customizedHtml.replace(/<html[^>]*>/, `<html lang="${route.lang}">`);

  // Replace title
  customizedHtml = customizedHtml.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);

  // Replace meta description
  customizedHtml = customizedHtml.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${route.desc}"`
  );

  // Replace canonical
  customizedHtml = customizedHtml.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${route.canonical}"`
  );

  // Replace OpenGraph Title & Description
  customizedHtml = customizedHtml.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${route.title}"`
  );
  customizedHtml = customizedHtml.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${route.desc}"`
  );

  // Replace og:locale and og:url
  const locale = route.lang === 'id' ? 'id_ID' : route.lang === 'km' ? 'km_KH' : 'en_US';
  customizedHtml = customizedHtml.replace(
    /<meta property="og:locale" content="[^"]*"/,
    `<meta property="og:locale" content="${locale}"`
  );
  customizedHtml = customizedHtml.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${route.canonical}"`
  );

  fs.writeFileSync(path.join(targetFolder, 'index.html'), customizedHtml, 'utf8');
  console.log(`  ✓ Generated: dist/${route.dir}/index.html`);
});

console.log('✅ All static routes generated successfully!');
