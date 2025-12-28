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
    question: "What is the average home price in San Ramon?",
    answer: "The median home price in San Ramon is approximately $1.5 million as of 2025. This East Bay suburb offers exceptional value compared to nearby Silicon Valley and Peninsula communities, where prices often exceed $2-3 million for comparable properties. Prices vary by neighborhood—Gale Ranch and Dougherty Valley feature newer construction averaging $1.6-2M, while established neighborhoods near Crow Canyon offer homes from $1.2-1.8M. The city's top-rated schools, corporate presence, and quality of life continue to drive strong demand."
  },
  {
    question: "Is San Ramon a good place to invest in real estate?",
    answer: "San Ramon is an excellent real estate investment for 2025 and beyond. The city offers strong fundamentals: top-ranked schools in the San Ramon Valley Unified School District, major corporate headquarters (Chevron, AT&T, GE Digital), low crime rates, and extensive amenities. It's more affordable than South Bay tech hubs while maintaining easy freeway access to Silicon Valley jobs. Long-term appreciation has been steady, and the city's master-planned communities ensure quality neighborhood standards. Rental demand is strong from families and corporate relocations."
  },
  {
    question: "What are the best neighborhoods in San Ramon for families?",
    answer: "Top family-friendly neighborhoods in San Ramon include Gale Ranch (newer homes, resort-style amenities, excellent elementary schools), Dougherty Valley (newer development, proximity to top-rated high school, family-oriented community), Crow Canyon (established neighborhood, mature trees, larger lots), and Windemere (walkable, community pool, highly regarded schools). All neighborhoods benefit from San Ramon's exceptional school system, extensive parks and trails, low crime, and family-focused city planning. Each offers different home styles and price points while maintaining quality of life."
  },
  {
    question: "How do San Ramon schools compare to other Bay Area districts?",
    answer: "San Ramon Valley Unified School District consistently ranks among the top school districts in California and the entire nation. The district includes multiple California Distinguished Schools and National Blue Ribbon Schools. Test scores significantly exceed state averages, with many schools achieving API scores above 900. High schools like Dougherty Valley and California High rank among the best in the state. The district's strong academics, robust extracurricular programs, and parent involvement make San Ramon a top choice for families prioritizing education—a major factor driving home values."
  },
  {
    question: "What is the Bishop Ranch business park, and why does it matter?",
    answer: "Bishop Ranch is one of the largest master-planned business parks in the Western United States, featuring 585 acres with corporate campuses for Chevron, AT&T, GE Digital, and many other Fortune 500 companies. It provides 30,000+ jobs and includes retail, dining, entertainment, and the Marketplace shopping center. For homeowners, Bishop Ranch means strong local employment, shorter commutes, vibrant amenities, stable property values, and a thriving local economy. The business park's continued expansion and modernization (including new residential components) enhance San Ramon's long-term real estate outlook."
  },
  {
    question: "What trail systems and outdoor recreation does San Ramon offer?",
    answer: "San Ramon features over 75 miles of trails connecting parks, schools, neighborhoods, and open spaces. The Iron Horse Regional Trail runs through the city, offering 32 miles of paved path perfect for cycling, running, and walking. Las Trampas Regional Wilderness provides hiking trails with spectacular ridge views. The city maintains 40+ parks, including Central Park with its amphitheater and aquatics complex. Memorial Park offers sports fields and playgrounds. This extensive trail network and park system supports active lifestyles and is a major draw for health-conscious families, directly supporting property values."
  },
  {
    question: "How much do I need to earn to buy a home in San Ramon?",
    answer: "To comfortably afford San Ramon's median home price of $1.5M, you typically need a household income of $350,000-$450,000, assuming a 20% down payment ($300,000) and following the 28% debt-to-income ratio guideline. This income level is common among Silicon Valley tech workers, corporate executives, and dual-income professional households. Many buyers work in South Bay or East Bay tech companies. With lower property taxes than San Francisco and no city income tax, San Ramon offers relative affordability for Bay Area standards while maintaining premium quality of life."
  },
  {
    question: "What are property taxes like in San Ramon?",
    answer: "San Ramon property taxes average approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and Mello-Roos assessments in newer developments. A $1.5M home would have annual taxes around $16,500-$18,000. Thanks to Prop 13, your assessed value can only increase 2% annually regardless of market appreciation, making long-term ownership increasingly advantageous. Newer neighborhoods in Gale Ranch and Dougherty Valley may have higher Mello-Roos payments ($3,000-$5,000 annually) that fund schools and infrastructure but typically sunset after 20-30 years."
  },
  {
    question: "How does San Ramon compare to Danville and other East Bay suburbs?",
    answer: "San Ramon offers newer housing stock and master-planned communities compared to Danville's more established, traditional neighborhoods. San Ramon tends to be 10-15% more affordable than Danville while sharing the same excellent school district (San Ramon Valley Unified). Both cities offer low crime, family-friendly environments, and good freeway access. San Ramon has more corporate headquarters and commercial development, while Danville maintains a more historic, small-town character. Dublin (adjacent) is generally more affordable but with slightly less prestigious schools. San Ramon strikes an ideal balance of value, schools, and amenities."
  },
  {
    question: "What makes San Ramon more affordable than South Bay cities?",
    answer: "San Ramon offers 30-40% lower home prices than comparable South Bay cities like Palo Alto, Los Gatos, or Saratoga, despite similar school quality and amenities. Key factors include: slightly longer commutes to Silicon Valley (though many companies now have East Bay offices), more available land for development in San Ramon's history, and the prestige premium of established South Bay addresses. However, San Ramon's value proposition is strong—you get newer homes, excellent schools, extensive trails, corporate amenities, and a family-friendly environment at significantly lower cost. Many South Bay workers are discovering this arbitrage."
  },
  {
    question: "What is the commute like from San Ramon to Silicon Valley?",
    answer: "Commute times from San Ramon to Silicon Valley typically range from 35-60 minutes depending on destination and time of day. Routes include I-680 South to I-580 West or I-680 South to Highway 84 West. Many tech companies (Apple, Google, Facebook) offer shuttle services from East Bay pickup points. With hybrid and remote work increasingly common post-2020, many residents commute 2-3 days per week rather than daily, making San Ramon's value proposition even stronger. The city's own job base (30,000+ at Bishop Ranch) also means many residents work locally. BART access via Dublin/Pleasanton station serves San Francisco commuters."
  },
  {
    question: "Are there HOA fees in San Ramon neighborhoods?",
    answer: "Most San Ramon neighborhoods have HOA fees ranging from $100-$400 monthly depending on amenities. Gale Ranch, with its resort-style clubhouse, pools, and extensive facilities, has higher fees ($300-$400/month). Dougherty Valley communities typically charge $150-$250/month. Older neighborhoods may have minimal fees ($50-$150) covering basic landscaping. These fees maintain community standards, common areas, and amenities that support property values. Always review HOA financial statements, reserve funds, and CC&Rs before purchasing. Newer communities may also have Mello-Roos assessments separate from HOA fees."
  },
  {
    question: "What types of homes are available in San Ramon?",
    answer: "San Ramon offers diverse housing options including single-family detached homes (most common, $1.2-3M+), townhomes and attached homes ($800,000-1.2M), newer construction in master-planned communities (Gale Ranch, Dougherty Valley), and some condos. Typical homes feature 2,000-4,000 square feet, 3-5 bedrooms, modern layouts, and 2-3 car garages. Newer areas showcase contemporary architecture with open floor plans, while established neighborhoods offer traditional designs with mature landscaping. Limited rental apartments exist; San Ramon is predominantly a homeownership community, which contributes to stable neighborhoods and strong schools."
  },
  {
    question: "What are the hidden costs of buying a home in San Ramon?",
    answer: "Beyond the purchase price, San Ramon buyers should budget for: closing costs (2-3% of purchase price), title insurance, inspection fees ($500-$1,500), HOA fees ($100-$400/month), Mello-Roos in newer areas ($3,000-$5,000 annually, check specific parcel), higher utilities for larger homes ($300-$500/month), and ongoing maintenance. Newer homes require less immediate maintenance but may have landscaping costs until mature. Property insurance averages $1,500-$2,500 annually. Some buyers add solar panels (often included in newer construction). Budget 1-2% of home value annually for maintenance and reserves."
  },
  {
    question: "Is San Ramon a good choice for first-time homebuyers?",
    answer: "San Ramon can be challenging for first-time buyers due to the $1.5M median price requiring substantial income and down payment. However, townhomes and condos ($800,000-1M) provide entry points. First-time buyers often benefit from: dual-income households in tech or corporate sectors, down payment gifts from family, or selling starter homes from more affordable markets. The city's excellent schools, low crime, and amenities make it worth the stretch for many families planning long-term residence. Some buyers start in nearby Dublin or Pleasanton (more affordable) and trade up to San Ramon later."
  },
  {
    question: "What is the resale value and appreciation potential in San Ramon?",
    answer: "San Ramon has demonstrated consistent long-term appreciation, typically tracking broader Bay Area trends with 4-6% annual growth over decades. The city's appreciation is supported by: limited new land for development (constraining supply), strong school district maintaining demand, corporate headquarters providing employment stability, and master-planned communities enforcing quality standards. Homes in top school attendance areas (Dougherty Valley High, California High) show strongest appreciation. Well-maintained properties in desirable neighborhoods typically sell quickly. The city's relative affordability compared to South Bay suggests continued appreciation potential as buyers discover the value proposition."
  },
  {
    question: "How competitive is the San Ramon housing market?",
    answer: "San Ramon's market competitiveness varies by price point and season. Well-priced homes in desirable neighborhoods often receive multiple offers, especially during spring/summer when families want to move before the school year. Properties under $1.5M and in top school zones generate strongest competition. Successful buyers typically: get fully pre-approved, work with experienced local agents familiar with San Ramon neighborhoods, write clean offers with minimal contingencies, and act quickly on new listings. The market is more balanced than Silicon Valley, offering better negotiation opportunities while still requiring preparation and decisiveness."
  },
  {
    question: "What questions should I ask when buying a home in San Ramon?",
    answer: "Essential questions for San Ramon home purchases include: 1) What are the exact HOA fees and what do they cover? 2) Are there Mello-Roos taxes, and what is the annual amount and sunset date? 3) Which schools serve this address (verify on district website)? 4) Has the home had any foundation, roof, or major system issues? 5) What items are included in the sale? 6) Why is the seller moving? 7) How old are major systems (HVAC, water heater, roof)? 8) Are there any planned community assessments? 9) What is the neighborhood's character and typical buyer profile? An experienced local agent can help investigate each thoroughly."
  },
  {
    question: "What are Mello-Roos taxes, and do San Ramon homes have them?",
    answer: "Mello-Roos are special tax assessments on newer developments to fund infrastructure, schools, and services. Many San Ramon neighborhoods built after 1990, especially Gale Ranch and Dougherty Valley, have Mello-Roos ranging from $3,000-$5,000 annually on top of regular property taxes. These assessments typically last 20-30 years and then sunset (end permanently). While they increase carrying costs, they funded the excellent schools and infrastructure that make these neighborhoods desirable. Mello-Roos amounts are fixed and don't increase with property value (unlike regular property taxes). Always verify the exact amount and sunset date before purchasing—your agent can obtain this information from the tax assessor."
  },
  {
    question: "How do I choose the right real estate agent for San Ramon?",
    answer: "Choose a San Ramon agent based on: deep knowledge of specific neighborhoods (Gale Ranch, Dougherty Valley, Crow Canyon differences), experience with San Ramon's school zones and their impact on value, understanding of Mello-Roos and HOA structures in various communities, established relationships with local inspectors and service providers, and proven negotiation skills in competitive markets. Interview 2-3 agents, ask for recent San Ramon sales references, and assess their communication style. An agent with 10+ years in the East Bay market and specific San Ramon expertise will navigate the city's unique characteristics (planned communities, corporate relocations, school-focused buyers) most effectively."
  }
];

export function SanRamonFAQ() {
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
        title="San Ramon Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your San Ramon real estate questions. Learn about home prices, schools, neighborhoods, and buying in San Ramon from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/san-ramon-faq"
        city="San Ramon"
        coordinates={{ lat: 37.7799, lng: -121.9780 }}
      />
      <FAQHeader />
      <FAQHero
        title="San Ramon Real Estate FAQ"
        description="Everything you need to know about buying a home in San Ramon. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="san-ramon" />

      <Footer />
    </div>
  );
}
