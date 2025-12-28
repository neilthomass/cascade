import { ChevronDown, Phone, Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { FAQHeader } from '../components/FAQHeader';
import { FAQHero } from '../components/FAQHero';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { RelatedCities } from '../components/RelatedCities';
import { SEO } from '../components/SEO';

interface FAQItem {
  question: string;
  answer: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://cascade-contact.manoj-thomas-c22.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status === 'error') setStatus('idle');
  };

  if (status === 'success') {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-gray-900 flex items-center justify-center mb-8 mx-auto">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-light text-gray-900 mb-4">Message Sent</h3>
          <p className="text-gray-600 font-light mb-8">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows the market inside and out.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm tracking-wide text-gray-900 mb-3">
                FULL NAME *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm tracking-wide text-gray-900 mb-3">
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status === 'submitting'}
                className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm tracking-wide text-gray-900 mb-3">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'submitting'}
              className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50"
              placeholder="Enter your phone"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm tracking-wide text-gray-900 mb-3">
              MESSAGE *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
              rows={4}
              className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none resize-none transition-colors bg-transparent disabled:opacity-50"
              placeholder="Tell us about your home buying needs"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="tracking-wide">SENDING...</span>
              </>
            ) : (
              <>
                <span className="tracking-wide">GET IN TOUCH</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-center">
          <a href="tel:+14087577353" className="text-gray-600 hover:text-gray-900 transition-colors">
            <Phone className="w-4 h-4 inline mr-2" />
            (408) 757-7353
          </a>
          <a href="mailto:contact@cascaderealtors.com" className="text-gray-600 hover:text-gray-900 transition-colors">
            <Mail className="w-4 h-4 inline mr-2" />
            contact@cascaderealtors.com
          </a>
        </div>
      </div>
    </section>
  );
}

const faqs: FAQItem[] = [
  {
    question: "What is the average home price in Saratoga?",
    answer: "The median home price in Saratoga is approximately $4.2 million as of 2025, making it one of the most expensive cities in the Bay Area. Homes typically range from $2 million for smaller properties to over $10 million for luxury estates in the foothills. Prices reflect the city's exceptional schools (including renowned Saratoga High School), large lot sizes averaging 10,000+ square feet, proximity to Silicon Valley tech companies, and the prestigious Saratoga address. The luxury estate market, particularly properties near Hakone Gardens and in the scenic foothills, commands premium prices due to privacy, views, and exclusivity."
  },
  {
    question: "Why are Saratoga homes so expensive?",
    answer: "Saratoga's premium prices are driven by multiple factors: the Saratoga Union School District ranks among California's top performing with exceptional test scores and college placement rates; large lot sizes (often 10,000-40,000+ square feet) are rare in the Bay Area; the city offers a quiet, suburban atmosphere with low crime rates while being just 15-20 minutes from major Silicon Valley employers; strict zoning preserves the semi-rural character and limits density; proximity to wine country, hiking trails, and scenic foothills adds lifestyle appeal; and wealthy tech executives and entrepreneurs compete for limited inventory. The combination of world-class schools and luxury living creates sustained demand that outpaces supply."
  },
  {
    question: "What are the best neighborhoods in Saratoga?",
    answer: "Top Saratoga neighborhoods include: Saratoga Village (walkable downtown area with charming shops, restaurants, and proximity to top schools), the Foothills near Hakone Gardens (luxury estates with privacy, mountain views, and larger lots), areas near Saratoga High School (highly sought after for families prioritizing education), Montalvo/Villa Montalvo (historic estates and cultural significance), and neighborhoods along Highway 9 (wine country atmosphere with easy access to Silicon Valley). Each area offers large properties, excellent schools, and the prestigious Saratoga lifestyle. The most exclusive properties are typically in the foothills with acreage, privacy, and panoramic views."
  },
  {
    question: "How good are Saratoga schools?",
    answer: "Saratoga schools are exceptional and a primary driver of home values. Saratoga High School consistently ranks in the top 1% of California public schools with API scores near 950, 95%+ college attendance rates, and numerous National Merit Scholars. The Saratoga Union Elementary School District feeds into Saratoga High and includes highly rated schools like Saratoga Elementary and Foothill Elementary. Los Gatos-Saratoga Joint Union High School District serves the area. Many families move to Saratoga specifically for the schools, accepting higher home prices and property taxes as an investment in education. Private school options including Harker School are also nearby for families seeking alternatives."
  },
  {
    question: "Is Saratoga a good place to raise a family?",
    answer: "Saratoga is one of the Bay Area's premier family communities. Benefits include: top-ranked public schools with exceptional academic performance, extremely low crime rates and safe neighborhoods, large yards and properties ideal for children, strong sense of community with family-oriented events, excellent parks and recreational facilities, proximity to hiking trails and nature, and high concentration of educated, professional families. The city offers a suburban refuge from urban density while maintaining easy access to Silicon Valley job centers. The trade-off is higher home prices and property taxes, but many families consider it worthwhile for the quality of life and educational opportunities."
  },
  {
    question: "What is the luxury estate market like in Saratoga?",
    answer: "Saratoga's luxury estate market ($5M-$20M+) is robust and attracts Silicon Valley executives, entrepreneurs, and ultra-high-net-worth buyers. These properties typically feature: 5,000-15,000+ square foot homes on 1-5 acre lots, Mediterranean, Contemporary, or Traditional architectural styles, resort-style amenities including pools, tennis courts, wine cellars, and home theaters, privacy with gated entries and mature landscaping, and stunning mountain or valley views. The foothills area commands the highest prices. Luxury buyers prioritize privacy, land, views, and proximity to top schools. The market remains strong due to limited inventory and consistent demand from tech wealth. Working with an agent experienced in luxury properties is essential."
  },
  {
    question: "How does Saratoga compare to other Bay Area cities?",
    answer: "Saratoga stands out among Bay Area communities for its unique combination of factors. Compared to Palo Alto or Atherton, Saratoga offers larger lots and more privacy at similar or slightly lower price points. Versus Los Gatos, Saratoga has higher-rated schools and a quieter atmosphere. Compared to Cupertino, Saratoga provides more acreage and a semi-rural feel with equally excellent schools. The city offers lower density and larger properties than most Bay Area suburbs while maintaining top-tier schools, low crime, and proximity to Silicon Valley employers. The trade-off is less walkability and nightlife than urban areas, but families prioritizing space, schools, and tranquility find exceptional value."
  },
  {
    question: "What are property taxes like in Saratoga?",
    answer: "Saratoga property taxes are approximately 1.15-1.25% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments for schools and services. On a $4.2 million home, annual property taxes would be approximately $48,000-$52,500. Thanks to Prop 13, assessed value can only increase 2% per year regardless of market appreciation, providing long-term tax predictability. New buyers pay taxes based on purchase price. While absolute tax amounts are high due to home values, the rate is comparable to other Santa Clara County cities. Many buyers consider the excellent schools and services worth the tax investment."
  },
  {
    question: "Is Saratoga a good investment for 2025?",
    answer: "Saratoga remains a strong long-term real estate investment for several reasons: limited land and strict zoning restrict future supply, top-tier schools ensure sustained family demand, proximity to Silicon Valley tech companies supports high-income buyers, the city's prestige and desirability maintain price stability, and wealthy demographics provide resilience during economic downturns. While prices are at historic highs, the fundamentals remain strong. Best for buyers planning 5+ year holds who value quality of life alongside investment returns. The luxury segment may see more volatility, but single-family homes in good school areas have shown consistent long-term appreciation. Work with experienced local agents who understand market nuances."
  },
  {
    question: "What is the wine country lifestyle in Saratoga?",
    answer: "Saratoga offers a unique wine country atmosphere rare in Silicon Valley. The city is home to several boutique wineries including Mountain Winery (famous for concerts) and Savannah-Chanelle Vineyards. The scenic Highway 9 corridor through Saratoga leads to the Santa Cruz Mountains wine region with dozens of tasting rooms. Many estates have vineyards or wine cellars. The lifestyle blends suburban convenience with rural charm: farmers markets, outdoor dining, hiking trails, and a relaxed pace. Saratoga Village features wine bars and restaurants with local wine lists. For buyers seeking both tech proximity and wine country living without moving to Napa or Sonoma, Saratoga offers an ideal compromise."
  },
  {
    question: "How much land do Saratoga homes typically have?",
    answer: "Saratoga properties typically sit on much larger lots than most Bay Area suburbs. Standard residential lots range from 10,000-20,000 square feet (0.25-0.5 acres), with many properties on 1-5 acre parcels, particularly in the foothills. This contrasts sharply with typical Bay Area lots of 5,000-7,000 square feet. Larger parcels offer privacy, gardens, pools, and space for outdoor living. Some estate properties exceed 5-10 acres with vineyards or natural landscapes. Minimum lot sizes are protected by zoning, preventing subdivision and maintaining the semi-rural character. The land is a major value component—buyers pay premium prices for acreage, which is increasingly scarce in Silicon Valley."
  },
  {
    question: "What is the commute like from Saratoga to Silicon Valley?",
    answer: "Saratoga offers excellent Silicon Valley access for a suburban community. Typical commutes include: Apple/Cupertino (10-15 minutes), Google/Mountain View (20-25 minutes), Facebook/Meta (25-30 minutes), and San Francisco (50-60 minutes). Highway 85 and 280 provide direct routes to major tech campuses. Los Gatos and Saratoga are among the closest affluent communities to Apple Park. Many tech executives choose Saratoga specifically for the short commute combined with large properties and top schools. Remote work has made location even more attractive as daily commutes decrease. Morning traffic on 85 North can add time, but most destinations remain within 30 minutes. Reverse commutes are typically easier."
  },
  {
    question: "Are there any HOA fees in Saratoga?",
    answer: "Most Saratoga single-family homes do not have HOA fees, as they're typically on individual lots rather than in planned communities. This is a significant advantage over condos or townhomes. However, some gated communities or luxury developments may have small HOA fees ($100-500/month) for common area maintenance, gate upkeep, or shared amenities. Always verify HOA status before purchasing. The lack of HOA fees is part of Saratoga's appeal—owners have more control over their properties. However, this also means individual responsibility for all maintenance, landscaping, and improvements. Budget accordingly for the upkeep of large properties and estates."
  },
  {
    question: "What should I know about buying a Saratoga estate property?",
    answer: "Buying a Saratoga estate requires specialized due diligence. Key considerations include: hire inspectors experienced with large properties and luxury features, evaluate well and septic systems if present (some areas aren't on city services), check for landslide or soil stability issues in hillside locations, understand maintenance costs for pools, landscaping, and large homes, review property boundaries and easements carefully, consider privacy and security features, evaluate resale market for high-end properties, and verify permits for all improvements and structures. Work with a realtor specializing in luxury Saratoga properties who understands estate-specific issues. Budget 1-2% of home value annually for maintenance on luxury properties. Consider ongoing costs beyond the mortgage."
  },
  {
    question: "How competitive is the Saratoga housing market?",
    answer: "The Saratoga market is highly competitive, particularly for properties in top school zones or on larger lots. Well-priced homes often receive multiple offers and sell quickly, especially in spring when families plan for the school year. Successful buyers typically: get fully pre-approved with proof of funds for large down payments, work with experienced local agents who know the market intimately, act decisively when the right property appears, write clean offers with minimal contingencies, and be prepared to offer at or above asking price for desirable properties. The luxury segment ($5M+) has more negotiating room but still moves quickly for exceptional properties. Cash buyers have advantages. Limited inventory and strong demand from wealthy buyers maintain competition."
  },
  {
    question: "What is the history and culture of Saratoga?",
    answer: "Saratoga evolved from a lumber and agricultural community to one of California's wealthiest cities. The name comes from Saratoga Springs, NY, due to natural springs in the area. Incorporated in 1956 to preserve its semi-rural character and resist annexation, the city has maintained strict zoning and low density. Cultural highlights include Hakone Gardens (authentic Japanese gardens), Mountain Winery (historic concerts), and Villa Montalvo (arts center and historic estate). The community values education, arts, nature, and preservation of its village atmosphere. Residents are highly educated, with large concentrations of tech executives, entrepreneurs, and professionals. The culture balances Silicon Valley innovation with small-town charm and natural beauty."
  },
  {
    question: "Are there first-time buyer opportunities in Saratoga?",
    answer: "Saratoga presents significant challenges for first-time buyers due to the $4.2 million median price. Entry points are limited but include: condos and townhomes ($1.2M-$2M), smaller homes on standard lots ($2M-$2.5M), properties needing renovation, or homes in less desirable locations. Most first-time Saratoga buyers are tech professionals with high incomes, equity from previous homes, or family financial support. Alternatives include buying in nearby Campbell or Los Gatos and moving to Saratoga later, or considering Cupertino for similar school quality at potentially lower prices. If Saratoga schools are the priority, some families buy smaller properties specifically for school access. Work with an agent who understands entry-level opportunities and can identify value."
  },
  {
    question: "What makes Saratoga different from Los Gatos?",
    answer: "While neighboring cities sharing a school district, Saratoga and Los Gatos have distinct characters. Saratoga offers: higher-rated elementary schools (Saratoga Union vs Los Gatos Union), larger average lot sizes and more privacy, quieter, more residential atmosphere, lower density and stricter zoning, and slightly lower prices for comparable properties. Los Gatos provides: more walkable downtown with shopping and dining, more diverse housing stock including affordable options, slightly more nightlife and urban amenities, and historic charm with the Los Gatos Creek. Both share excellent Saratoga High School access. Saratoga appeals more to families prioritizing schools, space, and quiet living. Los Gatos attracts those wanting more walkability and downtown vibrancy. Many buyers compare both cities before deciding."
  },
  {
    question: "What are the ongoing costs of owning a home in Saratoga?",
    answer: "Beyond mortgage payments, Saratoga homeowners should budget for: property taxes ($48,000-$52,500 annually on a $4.2M home), homeowners insurance ($3,000-$8,000+ depending on value and coverage), earthquake insurance (recommended but optional, $2,000-$5,000), utilities including water/sewer ($200-400/month), landscaping and yard maintenance ($300-$1,000+/month for large properties), pool maintenance if applicable ($150-300/month), general home maintenance (budget 1-2% of home value annually), and potential well/septic maintenance for some properties. Luxury estates have higher costs. Total annual ownership costs beyond mortgage typically range from $75,000-$150,000+ for median-priced homes. Ensure you can comfortably afford ongoing expenses, not just the purchase price."
  },
  {
    question: "How do I choose the right real estate agent in Saratoga?",
    answer: "Choosing a Saratoga agent requires specific expertise. Look for: deep knowledge of Saratoga neighborhoods, schools, and property values, experience with luxury and estate properties if buying at higher price points, strong negotiation skills for competitive multiple-offer situations, established relationships with local agents and sellers, proven track record with recent Saratoga transactions (check sold properties), understanding of large lot and estate-specific issues (wells, septic, land), and excellent references from past Saratoga clients. Interview 2-3 agents before deciding. The agent should ask detailed questions about your needs, school priorities, and lifestyle preferences. In Saratoga's expensive market, an experienced agent's guidance on valuation, negotiation, and property selection is invaluable—their expertise can save or make you hundreds of thousands of dollars."
  }
];

export function SaratogaFAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleFAQ = (index: number) => {
    setOpenIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Saratoga Real Estate FAQ | Home Buying Guide 2025"
        description="Expert answers to common Saratoga home buying questions. Learn about prices, neighborhoods, and more from a Bay Area realtor with 15+ years experience."
        canonical="https://cascaderealtors.com/saratoga"
        city="Saratoga"
        coordinates={{ lat: 37.2639, lng: -122.0230 }}
      />
      <FAQHeader />
      <FAQHero
        title="Saratoga Real Estate FAQ"
        description="Everything you need to know about buying a home in Saratoga. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg font-medium text-gray-900 pr-8">{faq.question}</h2>
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

      {/* Contact Form Section */}
      <ContactForm />

      {/* Related Cities */}
      <RelatedCities currentCity="saratoga" />

      <Footer />
    </div>
  );
}
