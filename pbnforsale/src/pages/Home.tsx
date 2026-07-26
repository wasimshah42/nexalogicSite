import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import WhyChooseUs from '../sections/WhyChooseUs';
import Packages from '../sections/Packages';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import CTA from '../sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <WhyChooseUs />
      <Packages />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
