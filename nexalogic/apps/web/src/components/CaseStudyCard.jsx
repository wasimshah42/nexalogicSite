import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

const CaseStudyCard = ({ 
  projectName, 
  description, 
  metrics, 
  category, 
  image, 
  index = 0,
  featured = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Card className="h-full overflow-hidden bg-card border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={projectName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">{category}</Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{projectName}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-secondary">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">{metrics}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CaseStudyCard;