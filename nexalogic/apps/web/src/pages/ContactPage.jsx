import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';

const ContactPage = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nexalogic Technologies",
    "image": "https://nexalogic.com/logo.png",
    "telephone": "+92-311-889-5477",
    "email": "sales@nexalogic.site",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Boulevard",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'sales@nexalogic.site',
      link: 'mailto:sales@nexalogic.site'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+92(311) 889-5477',
      link: 'tel:+923118895477'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Tech Boulevard, San Francisco, CA 94105',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday: 9:00 AM - 6:00 PM PST',
      link: '#'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Nexalogic Technologies</title>
        <meta name="description" content="Get in touch with Nexalogic Technologies. Contact us at sales@nexalogic.site or +92(311) 889-5477 for software development, AI solutions, web development, SEO, and digital marketing services." />
        <meta name="keywords" content="Contact Nexalogic Technologies, Software Development, AI Solutions, Web Development" />
        <link rel="canonical" href="https://nexalogic.com/contact" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <Header />

      <main>
        <HeroSection
          backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a"
          headline="Let's build something great together"
          subheading="Ready to transform your business? Get in touch with our team to discuss your project"
          showCta={false}
        />

        <nav aria-label="breadcrumb" className="bg-muted/20 py-3 border-b border-border/40">
          <div className="container-custom flex items-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">Contact</span>
          </div>
        </nav>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mb-6">Send us a message</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours. We're excited to learn about your project and explore how we can help.
                </p>
                <ContactForm />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <h2 className="mb-6">Contact information</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Prefer to reach out directly? Here's how you can get in touch with us.
                </p>

                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="bg-card border-border">
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg mb-2">{info.title}</CardTitle>
                            {info.link !== '#' ? (
                              <a 
                                href={info.link}
                                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                              >
                                {info.details}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.details}</p>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>

                <Card className="bg-muted/30 border-border mt-auto flex-grow flex flex-col">
                  <CardContent className="p-0 flex-grow relative rounded-lg overflow-hidden min-h-[300px]">
                    <iframe
                      title="Office Location Map"
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: 'absolute', inset: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4056%2C37.7876%2C-122.3856%2C37.7976&amp;layer=mapnik&amp;marker=37.7926%2C-122.3956"
                    ></iframe>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactPage;