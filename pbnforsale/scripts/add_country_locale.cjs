#!/usr/bin/env node
/**
 * Nexalogic Technologies - Rapid International Country Expansion Engine
 * Generates pre-rendered routes, sitemap hreflangs, and templates for a new target country.
 * Usage: node scripts/add_country_locale.cjs --code=br --lang=pt --currency=BRL --name=Brazil
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2).reduce((acc, curr) => {
  const [k, v] = curr.replace(/^--/, '').split('=');
  acc[k] = v;
  return acc;
}, {});

const countryCode = (args.code || args.country || '').toLowerCase();
const countryName = args.name || countryCode.toUpperCase();
const lang = args.lang || countryCode;
const currency = args.currency || 'USD';

if (!countryCode) {
  console.log('Usage: node scripts/add_country_locale.cjs --code=br --lang=pt --currency=BRL --name=Brazil');
  process.exit(1);
}

const distDir = path.join(__dirname, '..', 'dist');
const targetDir = path.join(distDir, countryCode);
const indexHtmlPath = path.join(distDir, 'index.html');

console.log(`\n🌍 Expanding Nexalogic to Target Country: [${countryName}] (${countryCode.toUpperCase()})`);

if (fs.existsSync(indexHtmlPath)) {
  fs.mkdirSync(targetDir, { recursive: true });
  let html = fs.readFileSync(indexHtmlPath, 'utf8');

  // Replace lang and canonical
  html = html.replace(/<html[^>]*>/, `<html lang="${lang}">`);
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="https://nexalogic.site/${countryCode}"`
  );

  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`  ✓ Generated static route: dist/${countryCode}/index.html`);
}

// Append to sitemap.xml
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const newEntry = `  <url>
    <loc>https://nexalogic.site/${countryCode}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://nexalogic.site/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://nexalogic.site/" />
    <xhtml:link rel="alternate" hreflang="${lang}" href="https://nexalogic.site/${countryCode}" />
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>\n</urlset>`;

  if (!sitemap.includes(`https://nexalogic.site/${countryCode}`)) {
    sitemap = sitemap.replace('</urlset>', newEntry);
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log(`  ✓ Updated public/sitemap.xml with ${countryCode.toUpperCase()} hreflang entry`);
  }
}

console.log(`\n✅ Country [${countryName}] ready at: https://nexalogic.site/${countryCode}`);
