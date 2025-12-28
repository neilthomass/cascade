import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { PropertiesSection } from './components/PropertiesSection';
import { AboutSection } from './components/AboutSection';
import { BuyingProcess } from './components/BuyingProcess';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="size-full">
      <Header />
      <Hero />
      <IntroSection />
      <AboutSection />
      <PropertiesSection />
      <BuyingProcess />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}