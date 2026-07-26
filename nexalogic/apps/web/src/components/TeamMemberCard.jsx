import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const TeamMemberCard = ({ name, role, photo, initials, social, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-card border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
        <CardContent className="pt-6 text-center">
          <Avatar className="h-24 w-24 mx-auto mb-4 rounded-xl">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-2xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{role}</p>
          <div className="flex justify-center space-x-2">
            {social?.linkedin && (
              <a
                href={social.linkedin}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {social?.twitter && (
              <a
                href={social.twitter}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
            {social?.email && (
              <a
                href={`mailto:${social.email}`}
                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeamMemberCard;