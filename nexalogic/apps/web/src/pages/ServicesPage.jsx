import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import { Code, Brain, Globe, Search, TrendingUp, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Technology Services",
    "provider": {
      "@type": "Organization",
      "name": "Nexalogic Technologies"
    }
  };

  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Build scalable, secure applications tailored to your business requirements',
      features: [
        'Custom enterprise software solutions',
        'Cloud-native application development',
        'API design and integration',
        'Legacy system modernization',
        'Agile development methodology'
      ],
      link: '/contact'
    },
    {
      icon: Brain,
      title: 'AI Solutions',
      description: 'Harness the power of artificial intelligence to automate and optimize',
      features: [
        'Machine learning model development',
        'Natural language processing',
        'Computer vision applications',
        'Predictive analytics',
        'AI-powered automation'
      ],
      link: '/contact'
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Create stunning, high-performance websites that drive conversions',
      features: [
        'Responsive web design',
        'E-commerce platforms',
        'Progressive web applications',
        'Content management systems',
        'Performance optimization'
      ],
      link: '/contact'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Reach your target audience with data-driven marketing strategies',
      features: [
        'Social media marketing',
        'Pay-per-click advertising',
        'Content marketing strategy',
        'Email marketing campaigns',
        'Analytics and reporting'
      ],
      link: '/contact'
    }
  ];

  const seoTiers = [
    {
      name: 'Starter',
      price: '$50/month',
      features: ['Basic link package', 'Monthly reporting', 'Niche-relevant links']
    },
    {
      name: 'Professional',
      price: '$100/month',
      features: ['Enhanced metrics tracking', 'High DA/PA links', 'Link velocity management', 'Detailed monthly reporting']
    },
    {
      name: 'Enterprise',
      price: '$200/month',
      features: ['Premium network access', 'White-hat SEO practices', 'Custom strategy', 'Dedicated account manager']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - Nexalogic Technologies</title>
        <meta name="description" content="Comprehensive technology services including software development, AI solutions, web development, SEO Backlinks, and digital marketing." />
        <meta name="keywords" content="Software Development, AI Solutions, Web Development, SEO Backlinks, Digital Marketing" />
        <link rel="canonical" href="https://nexalogic.com/services" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />

      <main>
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
          headline="Comprehensive technology services"
          subheading="From software development to digital marketing, we provide end-to-end solutions that drive business growth"
          ctaText="Get a Quote"
          ctaLink="/contact"
        />

        <nav aria-label="breadcrumb" className="bg-muted/20 py-3 border-b border-border/40">
          <div className="container-custom flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">Services</span>
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
              <h2 className="mb-4">What we offer</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert services designed to solve your toughest business challenges
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Search className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-center mb-4">SEO Backlinks Service</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-12">
                Boost your search rankings and organic traffic with our premium network of high-quality backlinks from authoritative domains. We focus on Quality Metrics (DA, PA, Trust Flow) and white-hat practices.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                {seoTiers.map((tier, index) => (
                  <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary mt-2">{tier.price}</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start space-x-2">
                            <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Choose {tier.name}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">1M+</div>
                  <div className="text-sm text-muted-foreground">Quality Links</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">4.9★</div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">97%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;