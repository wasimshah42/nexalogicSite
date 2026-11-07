import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, ShoppingCart, ChevronDown, Send, Facebook, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Shortened, clean navigation
const navItems = [
  { key: "nav.why_us", label: "Why Us", href: "/#why-us" },
  { key: "nav.case_studies", label: "Case Studies", href: "/portfolio" },
  { key: "nav.blog", label: "Blog", href: "/blog" },
  { key: "nav.testimonials", label: "Testimonials", href: "/#testimonials" },
  { key: "nav.faq", label: "FAQ", href: "/#faq" },
  { key: "nav.rankpilot", label: "Rankpilot", href: "https://rankpilot.nexalogic.site/", isHighlight: true },
];

export default function Header() {
  const { language, setLanguage, countryName, countryCode, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExternalLink = (href: string) => /^https?:\/\//.test(href);

  const getLocalizedHref = (href: string) => {
    if (isExternalLink(href)) return href;
    if (language === 'id') {
      if (href.startsWith('/#')) return `/id#${href.slice(2)}`;
      if (href === '/') return '/id';
      if (!href.startsWith('/id')) return `/id${href}`;
    }
    if (language === 'km') {
      if (href.startsWith('/#')) return `/km#${href.slice(2)}`;
      if (href === '/') return '/km';
      if (!href.startsWith('/km')) return `/km${href}`;
    }
    return href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-lg border-b border-dark-600'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={language === 'id' ? '/id' : language === 'km' ? '/km' : '/'} className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
              <span className="text-dark-900 font-bold text-lg lg:text-xl">N</span>
            </div>
            <span className="text-white font-bold text-lg lg:text-xl hidden sm:block">
              Nexalogic <span className="text-gold-500">Technologies</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isHighlighted = item.isHighlight;
              const displayLabel = item.key ? t(item.key) : item.label;
              const targetHref = getLocalizedHref(item.href);

              if (targetHref.includes("#")) {
                return (
                  <HashLink
                    smooth
                    key={item.label}
                    to={targetHref}
                    className={`px-4 py-2 text-sm transition-colors rounded-lg font-medium ${
                      isHighlighted
                        ? 'ml-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {displayLabel}
                  </HashLink>
                );
              }

              if (isExternalLink(targetHref)) {
                return (
                  <a
                    key={item.label}
                    href={targetHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 text-sm transition-colors rounded-lg font-medium ${
                      isHighlighted
                        ? 'ml-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-500'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {displayLabel}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={targetHref}
                  className={`px-4 py-2 text-sm transition-colors rounded-lg font-medium ${
                    isHighlighted
                      ? 'ml-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-500'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {displayLabel}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Change Language and Region"
                  className="bg-dark-800 border-dark-600 text-gray-200 hover:text-white hover:bg-dark-700 text-xs px-2 sm:px-3 h-8 sm:h-9 gap-1.5 focus-visible:ring-0"
                >
                  <Globe className="w-3.5 h-3.5 text-gold-500" />
                  <span className="font-semibold uppercase">{language}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-dark-800 border-dark-600 shadow-xl rounded-lg p-1.5 min-w-[170px]"
              >
                <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-gray-400 font-bold border-b border-white/5 mb-1">
                  Region: {countryName} ({countryCode})
                </div>
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={`flex items-center justify-between text-xs px-2.5 py-2 rounded-md cursor-pointer transition-colors ${
                    language === 'en' ? 'bg-gold-500/20 text-gold-300 font-bold' : 'hover:bg-white/5 text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇺🇸</span> English (Global / US)
                  </span>
                  {language === 'en' && <span className="text-gold-400 text-xs">✓</span>}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setLanguage('id')}
                  className={`flex items-center justify-between text-xs px-2.5 py-2 rounded-md cursor-pointer transition-colors ${
                    language === 'id' ? 'bg-gold-500/20 text-gold-300 font-bold' : 'hover:bg-white/5 text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇮🇩</span> Indonesia (Bahasa)
                  </span>
                  {language === 'id' && <span className="text-gold-400 text-xs">✓</span>}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setLanguage('km')}
                  className={`flex items-center justify-between text-xs px-2.5 py-2 rounded-md cursor-pointer transition-colors ${
                    language === 'km' ? 'bg-gold-500/20 text-gold-300 font-bold' : 'hover:bg-white/5 text-gray-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🇰🇭</span> Cambodia (ភាសាខ្មែរ)
                  </span>
                  {language === 'km' && <span className="text-gold-400 text-xs">✓</span>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Buy Now CTA */}
            <a
              href={getLocalizedHref('/#packages')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all font-bold"
            >
              <ShoppingCart className="w-4 h-4" />
              {t('nav.buy_now')}
            </a>
            {/* social icons */}
            <a
              href="https://t.me/smartlinker786"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Nexalogic on Telegram"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61588156805039"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Nexalogic on Facebook"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white" aria-label="Open mobile navigation menu">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark-900 border-dark-600 w-[90vw] max-w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                      <span className="text-dark-900 font-bold text-xl">N</span>
                    </div>
                    <span className="text-white font-bold text-xl">
                      Nexalogic <span className="text-gold-500">Technologies</span>
                    </span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      const isHighlighted = item.isHighlight;
                      const displayLabel = item.key ? t(item.key) : item.label;
                      const targetHref = getLocalizedHref(item.href);

                      if (targetHref.includes("#")) {
                        return (
                          <HashLink
                            smooth
                            key={item.label}
                            to={targetHref}
                            onClick={() => setIsOpen(false)}
                            className={`px-4 py-3 rounded-lg transition-colors font-medium ${
                              isHighlighted
                                ? 'mt-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-lg shadow-gold-500/25'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {displayLabel}
                          </HashLink>
                        );
                      }

                      if (isExternalLink(targetHref)) {
                        return (
                          <a
                            key={item.label}
                            href={targetHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className={`px-4 py-3 rounded-lg transition-colors font-medium ${
                              isHighlighted
                                ? 'mt-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-lg shadow-gold-500/25'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {displayLabel}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          to={targetHref}
                          onClick={() => setIsOpen(false)}
                          className={`px-4 py-3 rounded-lg transition-colors font-medium ${
                            isHighlighted
                              ? 'mt-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-900 font-bold shadow-lg shadow-gold-500/25'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {displayLabel}
                        </Link>
                      );
                    })}
                    {/* Highlighted Rankpilot Link */}
                    <div className="mt-4">
                      <a
                        href="https://rankpilot.nexalogic.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-500 transition-all"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Rankpilot
                      </a>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
