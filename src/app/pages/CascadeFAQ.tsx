import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQHeader } from '../components/FAQHeader';
import { FAQHero } from '../components/FAQHero';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

interface FAQItem {
  question: string;
  answer: string;
}

export function CascadeFAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  const faqs: FAQItem[] = [
    {
      question: 'What areas does Cascade California Realty serve?',
      answer: 'Cascade California Realty serves the entire San Francisco Bay Area, including Silicon Valley cities like San Jose, Saratoga, Los Altos, Mountain View, Palo Alto, and Cupertino, as well as the Tri-Valley area (Pleasanton, Dublin, San Ramon), and communities throughout Alameda, Contra Costa, and San Mateo counties.'
    },
    {
      question: 'How much experience does Manoj Thomas have?',
      answer: 'Manoj Thomas has over 15 years of experience in Bay Area real estate, with more than $1 billion in lifetime sales and over 415 completed transactions. He holds an MBA from UC Berkeley\'s Haas School of Business and has received multiple industry awards including the Platinum Award (2021-2023), Pinnacle Award (2020), and Grand Master Award (2016-2019).'
    },
    {
      question: 'What types of properties does Cascade handle?',
      answer: 'Cascade California Realty specializes in residential properties including single-family homes, townhouses, and condos. We work with first-time homebuyers, move-up buyers, investors, and sellers across all price ranges, with particular expertise in luxury homes throughout Silicon Valley.'
    },
    {
      question: 'What makes Cascade different from other brokerages?',
      answer: 'As a boutique brokerage, Cascade provides personalized attention that larger firms can\'t match. Manoj is an active real estate investor himself, bringing firsthand experience to guide clients. Our 100% client satisfaction rate and numerous industry awards reflect our commitment to exceptional service.'
    },
    {
      question: 'How do I get started with Cascade?',
      answer: 'Simply contact us by phone at (408) 757-7353 or through our website contact form. We\'ll schedule a free consultation to discuss your real estate goals, whether you\'re looking to buy, sell, or invest. There\'s no obligation, and we\'re happy to answer any questions you have about the Bay Area market.'
    },
    {
      question: 'Does Cascade help with investment properties?',
      answer: 'Yes! Manoj Thomas is an active real estate investor and brings that expertise to help clients identify and evaluate investment opportunities. Whether you\'re looking for rental properties, multi-family units, or fix-and-flip opportunities, we can guide you through the investment process.'
    },
    {
      question: 'What is Cascade\'s commission structure?',
      answer: 'Our commission rates are competitive with industry standards and are always discussed upfront during our initial consultation. We believe in transparency and will explain all costs involved before you commit to working with us.'
    },
    {
      question: 'Can Cascade help first-time homebuyers?',
      answer: 'Absolutely! We have extensive experience guiding first-time buyers through the entire process. From explaining the basics of home financing to negotiating offers and navigating inspections, we provide patient, step-by-step guidance to make your first home purchase as smooth as possible.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Cascade California Realty FAQ | About Our Bay Area Real Estate Services"
        description="Frequently asked questions about Cascade California Realty. Learn about our services, experience, and how we can help you buy or sell a home in the San Francisco Bay Area."
        canonical="https://cascaderealtors.com/faq"
      />
      <FAQHeader />
      <FAQHero
        title="Cascade California Realty FAQ"
        description="Common questions about our brokerage, services, and how we can help with your Bay Area real estate needs."
      />

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white"
              >
                <button
                  onClick={() => {
                    const newSet = new Set(openIndices);
                    if (newSet.has(index)) {
                      newSet.delete(index);
                    } else {
                      newSet.add(index);
                    }
                    setOpenIndices(newSet);
                  }}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg text-gray-900 font-light pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                      openIndices.has(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndices.has(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
