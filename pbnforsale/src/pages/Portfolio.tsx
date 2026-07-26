import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, TrendingUp } from 'lucide-react';

const projects = [
  {
    name: 'Urban Point',
    location: 'Qatar / Oman / Kuwait',
    description:
      'Largest subscription-based discount platform for food lovers in the Middle East. Features multi-tenant backend, dynamic subscription management, and real-time voucher redemption APIs.',
    tech: 'Ooredoo payment gateway, Firebase analytics',
    metrics: 'Multi-country deployment, real-time processing',
    category: 'Software Development',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    name: 'Qreeb',
    location: 'Saudi Arabia',
    description:
      'On-demand e-services marketplace connecting users with skilled workers. Features real-time job matching and geolocation-based worker discovery.',
    tech: 'Socket.IO, AI tools for API docs',
    metrics: 'Real-time matching, live status tracking',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'Majoor',
    location: 'Qatar',
    description:
      'Government-approved online pharmacy and medicine delivery platform with secure prescription management and inventory APIs.',
    tech: 'Healthcare regulation compliance',
    metrics: 'Government-approved, healthcare-grade security',
    category: 'Software Development',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'Stars Day Nurseries',
    location: 'UK',
    description:
      'Digital management platform for UK childcare center chain. Features child enrollment workflows, parent communication portals, and staff scheduling.',
    tech: 'GDPR compliance, AI-assisted code review',
    metrics: 'UK data protection standards, multi-location',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    name: 'Ruhiy',
    location: 'Global',
    description:
      'Islamic life companion app by Noori Digital Services. Features Islamic guidance, religious tools, modern integration, and a comprehensive ecosystem.',
    tech: 'Mobile app development, multi-feature integration',
    metrics: 'Google Play availability, comprehensive management',
    category: 'Mobile App',
    image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/c6981e5380d736fae4abed791b62a4bc.webp',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    name: 'Wareed Medical Laboratories',
    location: 'Riyadh, KSA',
    description:
      'Leading diagnostic center in Al Narjis District, Riyadh. Features advanced LIMS, diagnostic device integration, online patient portal, and secure lifetime result storage.',
    tech: 'LIMS, online portal, secure storage',
    metrics: 'Board-certified pathologists, patient-centered',
    category: 'Healthcare / Diagnostics',
    image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/90841cfc19e5f8733536c3481ef4bcba.webp',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    name: 'ThriftPlan',
    location: 'Saudi Arabia',
    description:
      'Shariah-compliant employee benefits platform for Saudi Arabia. Features Shariah-compliant savings, performance rewards, and digital benefit management.',
    tech: 'Digital benefits platform, advisory services',
    metrics: 'Benefit optimization, financial well-being',
    category: 'HR Technology',
    image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/72fd72a8836a07f0e48b3c35dcdafc0b.webp',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    name: 'TravelHouse UK',
    location: 'UK',
    description:
      'Global airline and hotel distribution network for flights from UK. Features global distribution, online booking, cancellation handling, and secure payments.',
    tech: 'Travel distribution platform, booking engine',
    metrics: 'ATOL/ABTA protected, multiple partnerships',
    category: 'Travel & Tourism',
    image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/bf17417ca2d55a15b6a89ddd1f12dcf0.webp',
    span: 'md:col-span-2 md:row-span-1',
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-200">
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 to-dark-900" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gold-500/10 text-gold-400 text-sm font-medium mb-6">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our work speaks for itself
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Explore case studies and campaigns that delivered measurable impact for businesses across technology, ecommerce, healthcare, and more.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-dark-900 bg-gold-500 rounded-xl hover:bg-gold-400 transition-all"
            >
              Back to Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-all"
            >
              View our Blog
            </Link>
          </div>
        </div>
      </section>

      <nav aria-label="breadcrumb" className="bg-dark-800 border-t border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-400">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="inline-block mx-2 h-4 w-4 text-gray-500" />
          <span className="text-white">Portfolio</span>
        </div>
      </nav>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured projects</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
              Real solutions delivering visible results for brands across multiple industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {projects.map((project) => (
              <div
                key={project.name}
                className={project.span}
              >
                <Card className="h-full overflow-hidden bg-dark-800 border border-dark-600 shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={`${project.name} project`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/10 to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <Badge>{project.category}</Badge>
                      <Badge variant="secondary">{project.location}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{project.name}</CardTitle>
                    <CardDescription className="text-gray-400">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
                      <TrendingUp className="w-4 h-4 text-gold-500" />
                      <span>{project.metrics}</span>
                    </div>
                    <p className="text-sm text-gray-400">Tech: {project.tech}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
