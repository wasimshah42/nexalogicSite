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
  {
    dir: 'id',
    title: 'Nexalogic Technologies | Jasa Backlink PBN Murah, Aged Domains & SEO Authority Indonesia',
    desc: 'Jasa backlink PBN berkualitas & bergaransi dari Nexalogic Technologies. 12.000+ aged domains, DA/DR 40+ hingga 90+, aman Google, drip-feed alami.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id',
  },
  {
    dir: 'portfolio',
    title: 'SEO Case Studies & Backlink Portfolio | Nexalogic Technologies',
    desc: 'Discover how Nexalogic authority links helped agencies and businesses achieve sustainable #1 rankings on Google.',
    lang: 'en',
    canonical: 'https://nexalogic.site/portfolio',
  },
  {
    dir: 'id/portfolio',
    title: 'Studi Kasus & Portofolio Backlink SEO Indonesia | Nexalogic Technologies',
    desc: 'Lihat hasil peningkatan ranking Google dan pertumbuhan organic traffic klien Nexalogic menggunakan jaringan PBN authority.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/portfolio',
  },
  {
    dir: 'blog',
    title: 'SEO Authority & PBN Strategy Blog | Nexalogic Technologies',
    desc: 'Explore modern link building strategies, PBN safety guidelines, and search engine ranking techniques.',
    lang: 'en',
    canonical: 'https://nexalogic.site/blog',
  },
  {
    dir: 'id/blog',
    title: 'Blog SEO & Panduan Backlink PBN Indonesia | Nexalogic Technologies',
    desc: 'Kumpulan artikel dan panduan link building, strategi PBN aman tanpa deindex, dan optimasi SEO Google Indonesia.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/blog',
  },
  {
    dir: 'tools/pagespeed-checker',
    title: 'Website Speed & Core Web Vitals Checker | Nexalogic Tools',
    desc: 'Free tool to test website performance, page load speed, and Core Web Vitals metrics.',
    lang: 'en',
    canonical: 'https://nexalogic.site/tools/pagespeed-checker',
  },
  {
    dir: 'id/tools/pagespeed-checker',
    title: 'Cek Kecepatan Website & Core Web Vitals Gratis | Nexalogic Tools',
    desc: 'Analisis performa website, PageSpeed, dan Core Web Vitals untuk meningkatkan ranking di Google Indonesia.',
    lang: 'id',
    canonical: 'https://nexalogic.site/id/tools/pagespeed-checker',
  },
  // High-Intent Indonesian Blog Articles
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

  fs.writeFileSync(path.join(targetFolder, 'index.html'), customizedHtml, 'utf8');
  console.log(`  ✓ Generated: dist/${route.dir}/index.html`);
});

console.log('✅ All static routes generated successfully!');
