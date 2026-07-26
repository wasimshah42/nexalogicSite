import { useEffect, useRef, useState } from 'react';
import { Link2, Star, TrendingUp, Calendar } from 'lucide-react';

const stats = [
  { icon: Link2, value: 1000000, suffix: '+', label: 'Links Delivered', prefix: '' },
  { icon: Star, value: 4.9, suffix: '★', label: 'Customer Rating', prefix: '' },
  { icon: TrendingUp, value: 97, suffix: '%', label: 'Success Rate', prefix: '' },
  { icon: Calendar, value: 10, suffix: '+', label: 'Years Experience', prefix: '' },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const displayValue = value >= 1000000 
    ? `${(count / 1000000).toFixed(0)}M` 
    : value % 1 !== 0 
    ? count.toFixed(1) 
    : Math.floor(count);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 lg:py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 lg:p-8 rounded-2xl bg-dark-800 border border-dark-600 hover:border-gold-500/30 transition-all hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gold-500" />
                  </div>
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
