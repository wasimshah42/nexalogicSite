import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, ShoppingCart, ChevronDown, Send, Facebook } from 'lucide-react';
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

// const navItems = [
//   { label: 'Why Us', href: '/#why-us' },
//   { label: 'Portfolio', href: '/portfolio' },
//   { label: 'Blog', href: '/blog' },
//   { label: 'Testimonials', href: '/#testimonials' },
//   { label: 'FAQ', href: '/#faq' },
// ];
const navItems = [
  { label: "Why Us", href: "/#why-us" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

const seoServices = [
  { label: 'SEO Services', href: '/#packages' },
  { label: 'SEO Audit', href: '/#contact' },
];

const seoTools = [
  { label: 'PageSpeed Checker', href: '/tools/pagespeed-checker' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
              <span className="text-dark-900 font-bold text-lg lg:text-xl">N</span>
            </div>
            <span className="text-white font-bold text-lg lg:text-xl hidden sm:block">
              Nexalogic <span className="text-gold-500">Technologies</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              // item.href.startsWith('/') ? (
              //   <Link
              //     key={item.label}
              //     to={item.href}
              //     className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              //   >
              //     {item.label}
              //   </Link>
              // ) : (
              //   <a
              //     key={item.label}
              //     href={item.href}
              //     className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              //   >
              //     {item.label}
              //   </a>
              // )
              item.href.includes("#") ? (
              <HashLink
                smooth
                key={item.label}
                to={item.href}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </HashLink>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            )
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1">
                  Services
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-dark-800 border-dark-600">
                {seoServices.map((service) => (
                  <DropdownMenuItem key={service.label} asChild>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      {service.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1">
                  Tools
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-dark-800 border-dark-600">
                {seoTools.map((tool) => (
                  <DropdownMenuItem key={tool.label} asChild>
                    <a
                      href={tool.href}
                      className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      {tool.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <a
              href="/#packages"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-900 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </a>
            {/* social icons */}
            <a
              href="https://t.me/smartlinker786"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href="https://web.facebook.com/profile.php?id=61588156805039"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
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
                    {navItems.map((item) =>
                      // item.href.startsWith('/') ? (
                      //   <Link
                      //     key={item.label}
                      //     to={item.href}
                      //     onClick={() => setIsOpen(false)}
                      //     className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      //   >
                      //     {item.label}
                      //   </Link>
                      // ) : (
                      //   <a
                      //     key={item.label}
                      //     href={item.href}
                      //     onClick={() => setIsOpen(false)}
                      //     className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      //   >
                      //     {item.label}
                      //   </a>
                      // )
                      item.href.includes("#") ? (
                      <HashLink
                        smooth
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {item.label}
                      </HashLink>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                    )
                    )}
                    <div className="px-4 py-3 text-gray-400 text-sm font-medium mt-2">
                      Services
                    </div>
                    {seoServices.map((service) => (
                      <a
                        key={service.label}
                        href={service.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors pl-8"
                      >
                        {service.label}
                      </a>
                    ))}
                    <div className="px-4 py-3 text-gray-400 text-sm font-medium mt-2">
                      Tools
                    </div>
                    {seoTools.map((tool) => (
                      <a
                        key={tool.label}
                        href={tool.href}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors pl-8"
                      >
                        {tool.label}
                      </a>
                    ))}
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
