import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to sales@nexalogic.site
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...data,
        destination: 'sales@nexalogic.site',
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      toast.success('Message sent to sales@nexalogic.site. We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-foreground">Name</Label>
        <Input
          id="name"
          {...register('name')}
          className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-foreground">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company" className="text-foreground">Company</Label>
        <Input
          id="company"
          {...register('company')}
          className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground"
          placeholder="Your company name"
        />
        {errors.company && (
          <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="service" className="text-foreground">Service Interest</Label>
        <Select onValueChange={(value) => setValue('service', value)}>
          <SelectTrigger className="mt-2 bg-muted border-border text-foreground">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="software-development">Software Development</SelectItem>
            <SelectItem value="ai-solutions">AI Solutions</SelectItem>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="seo">SEO</SelectItem>
            <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="text-sm text-destructive mt-1">{errors.service.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="text-foreground">Message</Label>
        <Textarea
          id="message"
          {...register('message')}
          className="mt-2 bg-muted border-border text-foreground placeholder:text-muted-foreground min-h-[150px]"
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Your inquiry will be securely forwarded to our sales team at <strong className="text-foreground">sales@nexalogic.site</strong>.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;