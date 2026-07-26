import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, TrendingUp } from 'lucide-react';

const PortfolioPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio - Nexalogic Technologies",
    "description": "Case studies and portfolio of Nexalogic Technologies, including Urban Point, Qreeb, Ruhiy, ThriftPlan, and more."
  };

  const projects = [
    {
      name: 'Urban Point',
      location: 'Qatar/Oman/Kuwait',
      description: 'Largest subscription-based discount platform for food lovers in the Middle East. Features multi-tenant backend, dynamic subscription management, and real-time voucher redemption APIs.',
      tech: 'Ooredoo payment gateway, Firebase analytics',
      metrics: 'Multi-country deployment, real-time processing',
      category: 'Software Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      span: 'md:col-span-2 md:row-span-2'
    },
    {
      name: 'Qreeb',
      location: 'Saudi Arabia',
      description: 'On-demand e-services marketplace connecting users with skilled workers. Features real-time job matching and geolocation-based worker discovery.',
      tech: 'Socket.IO, AI tools for API docs',
      metrics: 'Real-time matching, live status tracking',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      name: 'Majoor',
      location: 'Qatar',
      description: 'Government-approved online pharmacy and medicine delivery platform with secure prescription management and inventory APIs.',
      tech: 'Healthcare regulation compliance',
      metrics: 'Government-approved, healthcare-grade security',
      category: 'Software Development',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      name: 'Stars Day Nurseries',
      location: 'UK',
      description: 'Digital management platform for UK childcare center chain. Features child enrollment workflows, parent communication portals, and staff scheduling.',
      tech: 'GDPR compliance, AI-assisted code review',
      metrics: 'UK data protection standards, multi-location',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293',
      span: 'md:col-span-2 md:row-span-1'
    },
    {
      name: 'Ruhiy',
      location: 'Global',
      description: 'Islamic life companion app by Noori Digital Services. Features Islamic guidance, religious tools, modern integration, and a comprehensive ecosystem.',
      tech: 'Mobile app development, multi-feature integration',
      metrics: 'Google Play availability, comprehensive management',
      category: 'Mobile App',
      image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/c6981e5380d736fae4abed791b62a4bc.webp',
      span: 'md:col-span-1 md:row-span-2'
    },
    {
      name: 'Wareed Medical Laboratories',
      location: 'Riyadh, KSA',
      description: 'Leading diagnostic center in Al Narjis District, Riyadh. Features advanced LIMS, diagnostic device integration, online patient portal, and secure lifetime result storage.',
      tech: 'LIMS, online portal, secure storage',
      metrics: 'Board-certified pathologists, patient-centered',
      category: 'Healthcare/Diagnostics',
      image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/90841cfc19e5f8733536c3481ef4bcba.webp',
      span: 'md:col-span-2 md:row-span-1'
    },
    {
      name: 'ThriftPlan',
      location: 'Saudi Arabia',
      description: 'Shariah-compliant employee benefits platform for Saudi Arabia. Features Shariah-compliant savings, performance rewards, and digital benefit management.',
      tech: 'Digital benefits platform, advisory services',
      metrics: 'Benefit optimization, financial well-being',
      category: 'HR Technology',
      image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/72fd72a8836a07f0e48b3c35dcdafc0b.webp',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      name: 'TravelHouse UK',
      location: 'UK',
      description: 'Global airline and hotel distribution network for flights from UK. Features global distribution, online booking, cancellation handling, and secure payments.',
      tech: 'Travel distribution platform, booking engine',
      metrics: 'ATOL/ABTA protected, multiple partnerships',
      category: 'Travel & Tourism',
      image: 'https://horizons-cdn.hostinger.com/c7a8a299-a24e-43f4-83fb-90a2dca0aebd/bf17417ca2d55a15b6a89ddd1f12dcf0.webp',
      span: 'md:col-span-2 md:row-span-1'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio - Nexalogic Technologies</title>
        <meta name="description" content="Explore our portfolio of successful projects including Urban Point, Qreeb, Majoor, Stars Day Nurseries, Ruhiy, Wareed Medical, ThriftPlan, and TravelHouse UK." />
        <meta name="keywords" content="Portfolio, Case Studies, Software Development, Web Development, HR Technology, Nexalogic Technologies" />
        <link rel="canonical" href="https://nexalogic.com/portfolio" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />

      <main>
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          headline="Our work speaks for itself"
          subheading="Explore case studies showcasing measurable results across diverse industries and technologies"
          ctaText="Start Your Project"
          ctaLink="/contact"
        />

        <nav aria-label="breadcrumb" className="bg-muted/20 py-3 border-b border-border/40">
          <div className="container-custom flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">Portfolio</span>
          </div>
        </nav>

        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="mb-4">Featured projects</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real solutions delivering real impact for businesses of all sizes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={project.span}
                >
                  <Card className="h-full overflow-hidden bg-card border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group flex flex-col">
                    <div className="relative h-48 md:h-64 overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center p-4">
                      <img 
                        src={project.image} 
                        alt={`Screenshot or logo of ${project.name} project`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <Badge className="bg-primary text-primary-foreground">{project.category}</Badge>
                        <Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground">{project.location}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl md:text-2xl">{project.name}</CardTitle>
                      <CardDescription className="text-base mt-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Tech:</strong> {project.tech}
                        </div>
                        <div className="flex items-center space-x-2 text-secondary">
                          <TrendingUp className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{project.metrics}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PortfolioPage;