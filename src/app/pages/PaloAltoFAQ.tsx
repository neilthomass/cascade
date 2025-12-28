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
    question: "What is the average home price in Palo Alto?",
    answer: "The median home price in Palo Alto is approximately $3.8 million as of 2025, making it one of the most expensive real estate markets in the nation. Prices typically range from $2 million for smaller condos or townhomes to well over $10 million for larger estates in prime neighborhoods like Old Palo Alto or Professorville. The market remains strong due to proximity to Stanford University, top-rated schools in the Palo Alto Unified School District, and the concentration of venture capital firms and tech companies."
  },
  {
    question: "Why is Palo Alto real estate so expensive?",
    answer: "Palo Alto's premium pricing reflects its unique combination of world-class education, innovation economy, and quality of life. The city is home to Stanford University, which drives academic excellence and economic vitality. Palo Alto Unified School District consistently ranks among California's best, with schools like Palo Alto High and Gunn High achieving exceptional test scores. The concentration of venture capital firms on Sand Hill Road and proximity to tech giants creates enormous wealth. Limited housing supply due to strict zoning and the city's small geographic footprint intensify competition for available homes."
  },
  {
    question: "What are the best neighborhoods in Palo Alto?",
    answer: "Palo Alto's most sought-after neighborhoods include Old Palo Alto (historic charm, tree-lined streets, walkability to downtown), Professorville (Craftsman and Victorian homes, near Stanford), Crescent Park (family-friendly, excellent schools, parks), Community Center (central location, diverse housing), South of Midtown (more affordable entry point), and Barron Park (strong community feel, good schools). Each neighborhood offers proximity to top schools, parks, and amenities. Old Palo Alto and Professorville command premium prices for their historic character and location."
  },
  {
    question: "How does Stanford University affect Palo Alto real estate?",
    answer: "Stanford University profoundly influences Palo Alto's housing market in multiple ways. The university attracts world-class faculty, researchers, and graduate students who seek nearby housing, creating consistent demand. Stanford's innovation ecosystem spawns startups that often remain in the area, building wealth that fuels home purchases. The university's presence ensures cultural amenities, lectures, and events that enhance quality of life. Additionally, Stanford's land holdings limit available residential development, constraining supply. Many buyers specifically seek proximity to campus for academic collaboration or to participate in the intellectual community."
  },
  {
    question: "Is Palo Alto a good investment for real estate?",
    answer: "Palo Alto has historically been an excellent long-term real estate investment, with consistent appreciation driven by structural advantages. The combination of limited land supply, top schools, Stanford's presence, and venture capital concentration creates sustained demand. However, the high entry price means buyers need substantial capital and should plan 7-10 year holding periods for optimal returns. The market can experience volatility during tech downturns, but long-term trends remain strong. Investors should consider property taxes (1.18% annually), maintenance costs, and the opportunity cost of capital when evaluating returns."
  },
  {
    question: "What are Palo Alto schools like?",
    answer: "Palo Alto Unified School District (PAUSD) is consistently ranked among California's top districts, with exceptional academic performance, extensive advanced placement offerings, and strong college placement records. Elementary schools like Duveneck, Ohlone, and Fairmeadows score in the top percentiles statewide. Middle schools JLS and Greene prepare students rigorously. High schools Palo Alto High (Paly) and Gunn High offer numerous AP courses and send graduates to top universities. The district also provides robust support for special education, arts, and athletics. Many families move to Palo Alto specifically for school access, driving real estate demand."
  },
  {
    question: "Can first-time buyers afford homes in Palo Alto?",
    answer: "First-time buyers face significant challenges in Palo Alto given the $3.8 million median price. Most successful first-time buyers have household incomes exceeding $500,000, often from tech industry positions, or receive family assistance with down payments. Entry points include smaller condos ($1.5M-$2.5M), townhomes, or properties in South of Midtown. Some buyers start in adjacent cities like Mountain View or Menlo Park and move to Palo Alto later. Creative strategies include ADU (Accessory Dwelling Unit) rental income, dual-income households in tech, or equity from stock compensation. Down payment assistance programs are limited at this price point."
  },
  {
    question: "What is the venture capital influence on Palo Alto housing?",
    answer: "Sand Hill Road's concentration of elite venture capital firms (Sequoia Capital, Andreessen Horowitz, Kleiner Perkins, etc.) significantly impacts Palo Alto real estate. VC partners and principals, who earn substantial carried interest from successful investments, become premium homebuyers. The venture ecosystem attracts entrepreneurs who've had successful exits, creating a buyer pool with significant wealth. This concentration of capital drives up home prices, particularly in neighborhoods near Sand Hill Road or Stanford. The VC presence also ensures economic resilience—even during downturns, the long-term innovation cycle supports property values."
  },
  {
    question: "How competitive is the Palo Alto housing market?",
    answer: "Palo Alto's housing market is highly competitive, especially for well-maintained homes in desirable neighborhoods or excellent school attendance areas. Properties often receive multiple offers, particularly in spring when families want to move before the school year. Successful buyers typically need all-cash offers or very strong financing (over 30% down), minimal contingencies, and quick closing timelines. Homes can sell 5-15% over asking in competitive situations. Working with an agent who has deep Palo Alto market knowledge, relationships with listing agents, and experience with complex negotiations is essential for success."
  },
  {
    question: "What are property taxes in Palo Alto?",
    answer: "Palo Alto property taxes are approximately 1.18% of assessed value annually, consistent with Santa Clara County rates. This includes California's base 1% Proposition 13 rate plus local bonds and assessments. Prop 13 limits annual assessment increases to 2% regardless of market appreciation, providing long-term tax predictability for owners. A home purchased for $3.8 million would have annual property taxes around $44,840. New buyers are assessed at purchase price. Given Palo Alto's strong appreciation history, long-term owners benefit significantly from Prop 13's tax growth caps versus current market values."
  },
  {
    question: "What is downtown Palo Alto like?",
    answer: "Downtown Palo Alto, centered on University Avenue, offers a vibrant, walkable environment with high-end restaurants, boutique shops, coffee houses, and cultural venues. The downtown blends historic California charm with modern sophistication—tree-lined streets, outdoor dining, and pedestrian-friendly design. Notable spots include The Stanford Theatre, numerous acclaimed restaurants (Evvia, Vina Enoteca, Naomi Sushi), upscale retailers, and independent bookstores. Proximity to downtown is highly valued by residents for dining, entertainment, and community events. California Avenue in the south also provides neighborhood commercial amenities. This walkable urbanism adds to Palo Alto's residential appeal."
  },
  {
    question: "How do tech industry cycles affect Palo Alto real estate?",
    answer: "Palo Alto real estate correlates with tech industry performance but maintains long-term upward trajectory. During boom periods (2020-2021, for example), stock compensation and IPO wealth drive rapid appreciation and intense competition. During downturns, the market may soften—fewer buyers, longer days on market, more negotiating room—but rarely sees significant price declines due to structural demand factors. Stanford's presence, school quality, and venture capital's long-term orientation provide stability. Savvy buyers may find opportunities during tech corrections, while sellers do best during expansionary periods. The 7-10 year tech cycle influences short-term timing but not long-term value."
  },
  {
    question: "What should I know about buying a condo or townhome in Palo Alto?",
    answer: "Palo Alto condos and townhomes ($1.5M-$3M+) offer more accessible entry points than single-family homes. Key considerations include HOA fees (typically $400-$800/month covering maintenance, insurance, sometimes utilities), HOA reserve funds (verify adequate reserves for major repairs), parking allocation, and resale potential. Condos near downtown, Stanford, or Caltrain have strong rental demand if you relocate. Many complexes have age and condition variations—newer developments in areas like Park Boulevard versus older complexes near California Avenue. Review HOA financial documents carefully and consider future special assessments. Condos appreciate but typically at slower rates than single-family homes."
  },
  {
    question: "What are the hidden costs of buying a home in Palo Alto?",
    answer: "Beyond the purchase price, Palo Alto buyers should budget for: closing costs (2-3% of price, or $75K-$115K on a $3.8M home), property transfer tax (varies by county, approximately 1.25% split with seller), title insurance, inspections ($1,000-$2,500), potential HOA fees for condos ($400-$800/month), homeowner's insurance ($3,000-$8,000 annually), earthquake insurance (optional but recommended, $3,000-$6,000 annually), ongoing maintenance (1-2% of home value annually for older properties), and landscaping for larger lots. Older homes may need foundation inspections, sewer lateral replacements, or electrical upgrades. Budget conservatively for ongoing costs."
  },
  {
    question: "How important is location within Palo Alto?",
    answer: "Location within Palo Alto significantly affects both price and lifestyle. Proximity to top-performing elementary schools (Duveneck, Ohlone, Fairmeadows) commands premium pricing as families prioritize attendance boundaries. Walkability to downtown or California Avenue adds value for residents who enjoy urban amenities. Distance to Highway 101 and Caltrain impacts commutes to San Francisco or South Bay employers. Quiet, tree-lined streets versus busier thoroughfares affect livability. Even within Palo Alto's small geographic area, micro-location differences of a few blocks can mean $500K-$1M+ price variations. Working with an agent who knows these nuances is critical."
  },
  {
    question: "What is the home buying process like in Palo Alto?",
    answer: "The Palo Alto home buying process typically takes 30-45 days from accepted offer to closing, with some all-cash deals closing faster. Key steps: 1) Get pre-approved for a large mortgage or confirm cash position, 2) Work with a Palo Alto specialist agent who understands the competitive market, 3) Tour properties and review disclosures carefully, 4) Make strong offers—often above asking with minimal contingencies, 5) Complete inspections within 10-17 days (foundation, pest, general, sewer lateral recommended), 6) Remove contingencies, 7) Final loan approval and appraisal, 8) Closing. Given high prices, thorough due diligence is essential. Expect competition and be prepared to act decisively."
  },
  {
    question: "Are there any homes under $2 million in Palo Alto?",
    answer: "Homes under $2 million in Palo Alto are rare but occasionally available, typically as smaller condos, townhomes, or properties needing significant renovation. These opportunities appear in South of Midtown, some condo complexes near California Avenue, or occasionally older homes requiring substantial updates. Buyers at this price point should expect compromise on size, condition, or location within the city. Competition is intense for any reasonably priced property. Some buyers consider adjacent cities like Mountain View or East Palo Alto for better value, planning to move into Palo Alto proper later. Working with an agent who monitors new listings closely is essential for catching rare opportunities."
  },
  {
    question: "What makes Palo Alto different from other Peninsula cities?",
    answer: "Palo Alto distinguishes itself through the combination of Stanford University, venture capital concentration, and school excellence—a trifecta unmatched by neighboring cities. While Menlo Park has VC firms and good schools, it lacks a major university. Mountain View has tech companies but not the same school quality. Los Altos has excellent schools but not Stanford's intellectual community. Palo Alto's downtown offers superior walkability and dining compared to most Peninsula suburbs. The city's demographics skew heavily toward highly educated professionals, creating a unique intellectual culture. These factors justify Palo Alto's price premium over neighboring communities, though each offers distinct advantages depending on buyer priorities."
  },
  {
    question: "Should I rent or buy in Palo Alto?",
    answer: "The rent vs. buy decision in Palo Alto depends heavily on your financial situation and timeline. Buying makes sense if you have substantial capital (20%+ down on $3.8M = $760K+), plan to stay 7+ years, and value building equity and tax benefits. Long-term owners benefit tremendously from Prop 13 tax protection and appreciation. Renting offers flexibility and lower upfront costs—2-3 bedroom homes rent for $5,000-$9,000/month, while comparable purchase would require $15,000-$20,000 monthly with mortgage, taxes, and maintenance. For short-term stays (under 5 years), rental market disruption from tech employment, or uncertain income, renting may be more practical. Calculate your specific scenario carefully."
  },
  {
    question: "How do I choose the right real estate agent in Palo Alto?",
    answer: "Choosing a Palo Alto agent requires evaluating: deep local expertise (they should know neighborhood boundaries, school attendance areas, and micro-market trends intimately), strong transaction volume in Palo Alto specifically (10+ deals per year shows active market involvement), relationships with listing agents (critical in competitive situations), client references from similar transactions, and negotiation skills for multiple-offer scenarios. Interview 2-3 agents before deciding. Look for someone who asks detailed questions about your needs, provides data-driven market analysis, and demonstrates patience—Palo Alto purchases require careful consideration given the investment size. An experienced Palo Alto specialist's guidance on strategy, timing, and valuation is invaluable in this complex market."
  }
];

export function PaloAltoFAQ() {
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
        title="Palo Alto Real Estate FAQ | Home Buying Guide 2025"
        description="Expert answers to common Palo Alto home buying questions. Learn about prices, neighborhoods, and more from a Bay Area realtor with 15+ years experience."
        canonical="https://cascaderealtors.com/palo-alto"
        city="Palo Alto"
        coordinates={{ lat: 37.4419, lng: -122.1430 }}
      />
      <FAQHeader />
      <FAQHero
        title="Palo Alto Real Estate FAQ"
        description="Everything you need to know about buying a home in Palo Alto. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="palo-alto" />

      <Footer />
    </div>
  );
}
