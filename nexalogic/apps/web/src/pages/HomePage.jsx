import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import TestimonialSection from '@/components/TestimonialSection.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Brain, Globe, TrendingUp, Zap, Shield, Users, ArrowRight, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexalogic Technologies",
    "url": "https://nexalogic.com",
    "logo": "https://nexalogic.com/logo.png",
    "description": "Software Development, AI Solutions & Digital Marketing",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service"
    }
  };

  const values = [
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Cutting-edge solutions powered by the latest technologies and industry best practices'
    },
    {
      icon: Shield,
      title: 'Expertise',
      description: 'Seasoned professionals with deep knowledge across software, AI, and digital marketing'
    },
    {
      icon: TrendingUp,
      title: 'Results',
      description: 'Measurable outcomes that drive growth and deliver real business value'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Collaborative approach focused on understanding and achieving your unique goals'
    }
  ];

  const services = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom applications built to scale with your business',
      link: '/services'
    },
    {
      icon: Brain,
      title: 'AI Solutions',
      description: 'Intelligent automation and machine learning integration',
      link: '/services'
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'High-performance websites that convert visitors into customers',
      link: '/services'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nexalogic Technologies - Software Development, AI Solutions & Digital Marketing</title>
        <meta name="description" content="Nexalogic Technologies provides expert software development, AI solutions, web development, SEO, and digital marketing services to transform your business." />
        <meta name="keywords" content="Software Development, AI Solutions, Web Development, Digital Marketing, SEO, Nexalogic Technologies" />
        <link rel="canonical" href="https://nexalogic.com/" />
        <meta property="og:title" content="Nexalogic Technologies - Software Development, AI Solutions & Digital Marketing" />
        <meta property="og:description" content="Expert software development, AI solutions, web development, SEO, and digital marketing services." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1699941150314-90a62569ef3a" />
        <meta property="og:url" content="https://nexalogic.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />

      <main>
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1699941150314-90a62569ef3a"
          headline="Transform Your Business with Nexalogic Technologies"
          subheading="Expert software development, AI integration, web development, SEO, and digital marketing services that drive measurable results"
          ctaText="Get Started"
          ctaLink="/contact"
        />

        <nav aria-label="breadcrumb" className="bg-muted/20 py-3 border-b border-border/40">
          <div className="container-custom flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
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
              <h2 className="mb-4">Why choose Nexalogic Technologies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine technical excellence with strategic thinking to deliver solutions that matter
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                      <CardDescription className="text-base">{value.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
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
              className="text-center mb-16"
            >
              <h2 className="mb-4">Our core services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive technology solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={service.link}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary transition-all duration-200"
                        >
                          Explore
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Link to="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 active:scale-[0.98]"
                >
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <TestimonialSection />

        <section className="section-padding bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4">Ready to transform your business?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how our expertise can help you achieve your goals
              </p>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 transition-all duration-200 active:scale-[0.98]"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;