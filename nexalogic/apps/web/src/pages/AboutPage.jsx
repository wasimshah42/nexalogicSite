import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import TeamMemberCard from '@/components/TeamMemberCard.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Award, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexalogic Technologies",
    "description": "Technology partner specializing in software development, AI solutions, web development, and digital marketing."
  };

  const competencies = [
    'Multi-tenant architecture',
    'Real-time systems',
    'Payment gateway integration',
    'Healthcare compliance',
    'GDPR compliance',
    'AI-accelerated development'
  ];

  const team = [
    {
      name: 'Maya Chen',
      role: 'Chief Technology Officer',
      initials: 'MC',
      photo: '',
      social: { linkedin: '#', twitter: '#', email: 'maya.chen@nexalogic.com' }
    },
    {
      name: 'Raj Patel',
      role: 'Head of AI Solutions',
      initials: 'RP',
      photo: '',
      social: { linkedin: '#', twitter: '#', email: 'raj.patel@nexalogic.com' }
    },
    {
      name: 'Lucia Torres',
      role: 'Lead Web Developer',
      initials: 'LT',
      photo: '',
      social: { linkedin: '#', twitter: '#', email: 'lucia.torres@nexalogic.com' }
    },
    {
      name: 'Kwame Asante',
      role: 'Digital Marketing Director',
      initials: 'KA',
      photo: '',
      social: { linkedin: '#', twitter: '#', email: 'kwame.asante@nexalogic.com' }
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Nexalogic Technologies</title>
        <meta name="description" content="Learn about Nexalogic Technologies - our mission, expertise in software development, AI solutions, web development, and digital marketing." />
        <meta name="keywords" content="About Nexalogic Technologies, Software Development, AI Solutions, Web Development" />
        <link rel="canonical" href="https://nexalogic.com/about" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />

      <main>
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          headline="Building the future of business technology"
          subheading="A team of passionate experts dedicated to transforming businesses through innovative solutions"
          ctaText="Join Our Team"
          ctaLink="/contact"
        />

        <nav aria-label="breadcrumb" className="bg-muted/20 py-3 border-b border-border/40">
          <div className="container-custom flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">About</span>
          </div>
        </nav>

        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-16"
            >
              <h2 className="mb-6 text-center">Our story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Nexalogic Technologies began with a simple belief: technology should solve real business problems, not create new ones. We are a full-service technology partner serving clients across industries.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we combine deep technical expertise with strategic thinking to deliver solutions that drive measurable results. From <Link to="/services" className="text-primary hover:underline">software development</Link> to AI integration, web development to digital marketing, we're committed to helping businesses thrive in the digital age. Check out our <Link to="/portfolio" className="text-primary hover:underline">portfolio</Link> to see our work.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-card border-border h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">To empower businesses with innovative technology solutions that drive measurable growth and competitive advantage in the digital age.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">To be the trusted technology partner for businesses worldwide, known for excellence, innovation, and transformative results.</p>
                </CardContent>
              </Card>
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
              className="text-center mb-12"
            >
              <h2 className="mb-4">Core Competencies</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Our technical expertise spans across critical enterprise domains
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {competencies.map((comp, index) => (
                <div key={index} className="flex items-center space-x-3 bg-card p-4 rounded-xl border border-border">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground font-medium">{comp}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Meet our team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experienced professionals passionate about technology and client success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <TeamMemberCard key={index} {...member} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;