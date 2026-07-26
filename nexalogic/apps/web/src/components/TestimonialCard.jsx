import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, name, company, photo, initials }) => {
  return (
    <Card className="bg-card border-border break-inside-avoid mb-6">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <p className="text-base text-muted-foreground mb-6 leading-relaxed italic">
          "{quote}"
        </p>
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 rounded-xl">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;