import { FAQHeader } from '../components/FAQHeader';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Manoj Thomas | Cascade California Realty | Bay Area Realtor"
        description="Get in touch with Manoj Thomas at Cascade California Realty. Call (408) 757-7353 or send a message. Expert Bay Area real estate services for buyers and sellers."
        canonical="https://cascaderealtors.com/contact"
      />
      <FAQHeader />

      {/* Spacer for fixed header */}
      <div className="pt-20" />

      <ContactSection />

      <Footer />
    </div>
  );
}
