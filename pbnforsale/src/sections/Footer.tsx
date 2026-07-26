import { 
  Facebook,
  Send,
  MapPin,
  Mail,
  CreditCard,
  Bitcoin
} from 'lucide-react';

const footerLinks = {
  backlinks: [
    { label: 'Buy Backlinks', href: '#packages' },
    { label: 'SEO Agency Links', href: '#packages' },
    { label: 'Link Building Packages', href: '#packages' },
    { label: 'SEO Services', href: '#packages' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
  ],
  company: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
};

const socialLinks = [
  { icon: Send, href: 'https://t.me/smartlinker786', label: 'Telegram' },
  { icon: Facebook, href: 'https://web.facebook.com/profile.php?id=61588156805039', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                  <span className="text-dark-900 font-bold text-xl">N</span>
                </div>
                <span className="text-white font-bold text-xl">
                  Nexalogic <span className="text-gold-500">Technologies</span>
                </span>
              </a>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Nexalogic Technologies is an experienced provider of safe backlink and digital marketing solutions to help elevate your search engine rankings.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center text-gray-400 hover:text-gold-500 hover:bg-dark-600 transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Backlinks Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Backlinks</h4>
              <ul className="space-y-3">
                {footerLinks.backlinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Our Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Information</h4>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-start gap-3">
                    <Send className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Telegram</p>
                      <a href="#" className="text-white hover:text-gold-500 transition-colors">
                        @smartlinker786
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <div className="space-y-1">
                        <a
                          href="mailto:sales@nexalogic.site"
                          className="text-white hover:text-gold-500 transition-colors block"
                        >
                          sales@nexalogic.site
                        </a>
                        <a
                          href="mailto:support@nexalogic.site"
                          className="text-white hover:text-gold-500 transition-colors block"
                        >
                          support@nexalogic.site
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">Alicante, Spain</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="py-6 border-t border-dark-600">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">We accept:</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <Bitcoin className="w-4 h-4 text-gold-500" />
                  <span className="text-xs text-gray-300">Crypto</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <CreditCard className="w-4 h-4 text-gold-500" />
                  <span className="text-xs text-gray-300">Card</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-xs font-bold text-gold-500">PP</span>
                  <span className="text-xs text-gray-300">PayPal</span>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()}{' '}
                <a href="/" className="text-gold-500 hover:underline">
                    Nexalogic Technologies
                </a>
                . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
