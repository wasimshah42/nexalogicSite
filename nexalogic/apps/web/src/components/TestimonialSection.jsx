import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard.jsx';

const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "Nexalogic transformed our outdated systems into a modern, scalable platform. The AI integration reduced our processing time by 63% and improved accuracy significantly.",
      name: "Maya Chen",
      company: "TechFlow Industries",
      initials: "MC",
      photo: ""
    },
    {
      quote: "Their SEO expertise brought our organic traffic from 2,400 to 18,700 monthly visitors in just six months. The ROI has been exceptional.",
      name: "Raj Patel",
      company: "Coastal Roasters",
      initials: "RP",
      photo: ""
    },
    {
      quote: "The web development team delivered a stunning, high-performance site that converted 47% better than our previous design. Their attention to detail is unmatched.",
      name: "Lucia Torres",
      company: "Meridian Labs",
      initials: "LT",
      photo: ""
    },
    {
      quote: "Working with Nexalogic on our digital marketing campaign was a game changer. We saw a 3.2x increase in qualified leads within the first quarter.",
      name: "Kwame Asante",
      company: "Elm & Oak Furniture",
      initials: "KA",
      photo: ""
    },
    {
      quote: "Their custom software solution streamlined our entire workflow. What used to take our team 8 hours now takes 45 minutes. Absolutely transformative.",
      name: "Anika Bergström",
      company: "Nordic Logistics",
      initials: "AB",
      photo: ""
    }
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">What our clients say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real partnerships across diverse industries
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;