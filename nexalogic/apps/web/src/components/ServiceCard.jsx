import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, features, link, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-card border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
        <CardHeader>
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <ul className="space-y-3 mb-6 flex-grow">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Link to={link}>
              <Button 
                variant="ghost" 
                className="w-full justify-between group/btn hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;