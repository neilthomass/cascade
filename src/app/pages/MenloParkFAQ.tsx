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
  answer: React.ReactNode;
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
    question: "What is the average home price in Menlo Park?",
    answer: <>The median home price in Menlo Park is approximately $3.2 million as of 2025. However, prices vary significantly by neighborhood—from around $2 million for smaller homes in Belle Haven to $5-10 million or more for luxury estates in west Menlo Park neighborhoods like Sharon Heights and the Willows. The city's proximity to Stanford University and Meta headquarters has made it one of the most expensive markets in the Bay Area. For the most current pricing data in your target neighborhoods, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team at Cascade California Realty</Link>.</>
  },
  {
    question: "How has Meta (Facebook) headquarters affected Menlo Park real estate?",
    answer: <>Meta's headquarters in Menlo Park has significantly impacted the local real estate market. The company's presence has brought thousands of high-earning tech employees to the area, driving up demand and prices. Neighborhoods within walking or biking distance to Meta's campus command premium prices. However, this also means the market can be influenced by tech industry cycles. The long-term effect has been strong appreciation, but buyers should consider their timeline and the diversification of the local economy. Our agents at Cascade California Realty have helped many tech professionals navigate this unique market—<Link to="/contact" className="text-blue-600 hover:underline">connect with us</Link> to discuss your situation.</>
  },
  {
    question: "Is Menlo Park a good investment for real estate in 2025?",
    answer: <>Menlo Park remains an excellent long-term real estate investment in 2025. Key factors supporting this include: Stanford University's proximity and influence, concentration of venture capital firms on Sand Hill Road, Meta headquarters and other tech employers, top-rated schools (Menlo Park City School District), and limited housing supply due to zoning restrictions. While prices are high, the fundamentals of location, employment, and education support continued appreciation. Buyers planning to stay 5+ years typically benefit from strong equity growth and quality of life. Want a personalized investment analysis? <Link to="/contact" className="text-blue-600 hover:underline">Let Cascade California Realty guide you</Link>.</>
  },
  {
    question: "What are the best neighborhoods in Menlo Park for families?",
    answer: <>Top family-friendly neighborhoods in Menlo Park include: Sharon Heights (excellent schools, larger lots, quiet streets), Allied Arts (walkable to downtown, strong community feel, mid-century architecture), the Willows (tree-lined streets, close to downtown, prestigious addresses), and Suburban Park (family-oriented, good schools, parks nearby). West Menlo Park generally commands higher prices but offers larger homes. East Menlo Park and Belle Haven offer more affordable entry points while still providing access to the excellent Menlo Park City School District. Finding the right neighborhood match is what we do best at Cascade California Realty—<Link to="/contact" className="text-blue-600 hover:underline">schedule a neighborhood tour</Link> with us.</>
  },
  {
    question: "What makes Menlo Park schools so desirable?",
    answer: <>Menlo Park City School District consistently ranks among California's top school districts. Schools like Laurel, Encinal, and Hillview have excellent API scores and dedicated parent communities. The district benefits from high property tax revenues, involved families, and proximity to Stanford's educational resources. Many families specifically move to Menlo Park for the schools, creating a competitive housing market. Private school options include Sacred Heart Schools and Phillips Brooks. The combination of outstanding public and private schools makes Menlo Park extremely attractive to families with children. If top schools are your priority, <Link to="/contact" className="text-blue-600 hover:underline">talk to our Cascade California Realty specialists</Link> about which neighborhoods feed into your preferred schools.</>
  },
  {
    question: "How much do I need to earn to buy a house in Menlo Park?",
    answer: <>To comfortably afford a median-priced home in Menlo Park ($3.2M), you typically need a household income of $700,000-$900,000, assuming a 20% down payment ($640,000) and following the 28% debt-to-income guideline. This high threshold reflects the premium market. Many buyers are dual-income tech couples, executives, or successful entrepreneurs. First-time buyers often start with condos or townhomes ($1.5-2.5M range) or look at neighboring communities like Redwood City or Atherton before moving up to single-family homes in Menlo Park. Not sure where you stand? <Link to="/contact" className="text-blue-600 hover:underline">Our team can connect you with trusted lenders</Link> who specialize in jumbo loans.</>
  },
  {
    question: "What is the proximity to Stanford University worth in terms of home value?",
    answer: <>Stanford's proximity adds significant value to Menlo Park real estate. Beyond the prestigious address and excellent schools influenced by Stanford's presence, proximity to the university offers: access to cultural events and facilities, potential rental income from graduate students and visiting professors, employment opportunities, and a stable anchor institution that supports long-term property values. Homes within a mile of campus or in neighborhoods like College Terrace and Stanford Hills command 10-20% premiums compared to similar homes further away. The university's continued growth and research excellence make this proximity increasingly valuable. Interested in Stanford-adjacent properties? <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty can show you what's available</Link>.</>
  },
  {
    question: "What is Sand Hill Road and how does it impact Menlo Park real estate?",
    answer: <>Sand Hill Road is one of the world's most famous venture capital corridors, home to firms like Sequoia Capital, Andreessen Horowitz, and Kleiner Perkins. This concentration of venture capital has several effects on Menlo Park real estate: it attracts extremely high-net-worth individuals as residents, creates demand for luxury housing, brings successful entrepreneurs to the area, and provides economic stability beyond any single company. Living near Sand Hill Road means proximity to some of the most influential investors in tech, and the area's prestige adds value to nearby properties. For luxury listings in this exclusive corridor, <Link to="/contact" className="text-blue-600 hover:underline">get in touch with Cascade California Realty</Link>.</>
  },
  {
    question: "What are the property taxes in Menlo Park?",
    answer: <>Menlo Park property taxes are approximately 1.15-1.20% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments and bonds. For a $3.2M home, expect annual property taxes around $37,000-$38,000. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price. The high taxes fund excellent schools and city services, contributing to Menlo Park's desirability. Have questions about total carrying costs? <Link to="/contact" className="text-blue-600 hover:underline">We're happy to walk you through the numbers</Link>.</>
  },
  {
    question: "What is the difference between east and west Menlo Park?",
    answer: <>East and west Menlo Park are divided by Highway 101 and differ significantly. West Menlo Park (closer to Stanford and the hills) features larger lots, higher prices ($4-10M+), more established neighborhoods like Sharon Heights and the Willows, and proximity to downtown. East Menlo Park and Belle Haven offer more affordable entry points ($1.5-3M), smaller lots, more diversity, and are closer to the bay. Both areas are served by the Menlo Park City School District. West Menlo Park has traditionally been more prestigious, but east Menlo Park offers better value for first-time buyers seeking access to excellent schools. Unsure which side fits your lifestyle? <Link to="/contact" className="text-blue-600 hover:underline">Let us help you explore both</Link>.</>
  },
  {
    question: "Is Belle Haven a good neighborhood for buying in Menlo Park?",
    answer: <>Belle Haven represents Menlo Park's most affordable neighborhood and has strong appreciation potential. This historically working-class neighborhood east of Highway 101 has seen significant investment and gentrification. Positives include: access to Menlo Park City School District, lower entry prices ($1.5-2.5M range), proximity to Meta and other employers, and ongoing community development. Challenges include smaller lots, older housing stock requiring updates, and less walkability. For buyers seeking Menlo Park schools and appreciation potential without west Menlo Park prices, Belle Haven is worth serious consideration. <Link to="/contact" className="text-blue-600 hover:underline">Ask Cascade California Realty about current Belle Haven listings</Link>.</>
  },
  {
    question: "How competitive is the Menlo Park housing market?",
    answer: <>Menlo Park's housing market is extremely competitive, especially for well-located single-family homes with good schools. Properties in desirable neighborhoods often receive multiple offers and sell above asking price. To compete successfully: get pre-approved for a jumbo mortgage (most Menlo Park homes exceed conventional loan limits), work with an agent who knows the micro-markets intimately, be prepared to waive contingencies if inspection is satisfactory, consider escalation clauses, and act quickly when the right property appears. Spring and early fall see the most competition, but inventory is limited year-round. Having a well-connected agent makes all the difference—<Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty knows how to craft winning offers</Link>.</>
  },
  {
    question: "What are HOA fees like for condos and townhomes in Menlo Park?",
    answer: <>Menlo Park condo and townhome HOA fees typically range from $400-$800 per month depending on the complex, amenities, and age. These fees cover building insurance, common area maintenance, landscaping, water/garbage, and reserve funds. Always review HOA financial documents before purchasing. Look for adequate reserves (at least 6 months of operating expenses) and no history of large special assessments. Some luxury developments near downtown or with extensive amenities may charge $800-$1,200 monthly. Factor these fees into affordability calculations, as they reduce your borrowing power. Our agents can help you review HOA documents—<Link to="/contact" className="text-blue-600 hover:underline">contact Cascade California Realty</Link> for condo and townhome options.</>
  },
  {
    question: "Should I buy a fixer-upper or move-in ready home in Menlo Park?",
    answer: <>In Menlo Park's expensive market, this decision depends on your budget, timeline, and risk tolerance. Fixer-uppers ($2.5-3.5M range) offer opportunities to add value through renovation, but require additional capital, time, and patience with permits. Move-in ready homes ($3.5M+) command premium prices but eliminate renovation stress. Many buyers purchase original condition homes in great locations (especially mid-century moderns in Allied Arts), live in them while planning renovations, and upgrade over time. Given Menlo Park's land value, location often matters more than house condition—you're buying for the lot, schools, and neighborhood. Need help weighing your options? <Link to="/contact" className="text-blue-600 hover:underline">Our team has contractor connections and renovation insights</Link> to share.</>
  },
  {
    question: "What is the commute like from Menlo Park to San Francisco and Silicon Valley?",
    answer: <>Menlo Park offers excellent commute access to both San Francisco and Silicon Valley. To San Francisco: 35-40 minutes via Caltrain from Menlo Park station, or 45-60 minutes driving via 101 or 280 (traffic dependent). To Silicon Valley: 15-20 minutes to Palo Alto, 20-25 minutes to Mountain View, 30-35 minutes to Sunnyvale/Santa Clara. Many residents walk or bike to Meta headquarters. The central Peninsula location is ideal for couples working in different parts of the Bay Area. Caltrain's electrification will improve service frequency and reliability, making the commute even more attractive. We can help you find homes near transit—<Link to="/contact" className="text-blue-600 hover:underline">reach out to start your search</Link>.</>
  },
  {
    question: "Are there teardowns in Menlo Park, and is that a good investment?",
    answer: <>Yes, teardowns are common in Menlo Park, particularly in west Menlo Park neighborhoods where land values are extremely high. A teardown typically costs $2-3M for the lot, plus $1.5-3M for construction, resulting in a $4-6M finished property. This makes sense when: you want a custom home in a premier location, existing homes are significantly outdated, or you plan to stay long-term and want exactly what you want. Work with architects familiar with Menlo Park's zoning and design guidelines. The process takes 18-24 months from purchase to completion. Consider lot size, setback requirements, and tree ordinances before purchasing. Considering a teardown project? <Link to="/contact" className="text-blue-600 hover:underline">We can connect you with trusted architects and builders</Link>.</>
  },
  {
    question: "What should I know about Menlo Park's downtown area for real estate?",
    answer: <>Downtown Menlo Park (centered on Santa Cruz Avenue) is a major selling point for the city. The walkable downtown features excellent restaurants, boutique shops, farmers market, and Kepler's bookstore. Homes within walking distance (Allied Arts, Willows, Linfield Oaks) command significant premiums due to the lifestyle factor. The downtown area has seen continuous investment and improvement, supporting property values. However, these neighborhoods also have higher density and less privacy than Sharon Heights or other west Menlo areas. For buyers valuing walkability and community feel, downtown proximity is worth the premium. Properties within a 10-minute walk to Santa Cruz Avenue often sell 15-20% above comparable homes further away. Love the idea of walking to brunch? <Link to="/contact" className="text-blue-600 hover:underline">Tell us your lifestyle priorities</Link> and we'll find the right fit.</>
  },
  {
    question: "What are the risks of buying in Menlo Park's expensive market?",
    answer: <>Key risks in Menlo Park's market include: high exposure to tech industry cycles (Meta and Silicon Valley concentration), extreme price levels limiting buyer pool, potential for prices to moderate if remote work continues reducing Bay Area demand, and earthquake/climate risks (though less than some Bay Area communities). Mitigation strategies: buy with a 7-10 year horizon to ride out cycles, maintain significant equity cushion, ensure earthquake insurance, and focus on locations with enduring value (top schools, Stanford proximity, established neighborhoods). Despite risks, Menlo Park's fundamentals—limited supply, excellent schools, major employers, and prestigious location—have supported values through multiple cycles. Want an honest assessment of risk versus reward? <Link to="/contact" className="text-blue-600 hover:underline">Our advisors at Cascade California Realty are here to help</Link>.</>
  },
  {
    question: "How do I choose the right real estate agent in Menlo Park?",
    answer: <>Choose a Menlo Park agent based on: deep local knowledge of neighborhood micro-markets and school boundaries, experience with jumbo mortgages and luxury transactions, strong negotiation skills (crucial in multiple-offer situations), relationships with local inspectors and contractors, and proven track record with 10+ annual transactions. Interview 2-3 agents before deciding. Look for someone who asks questions about your priorities rather than just pitching themselves. In Menlo Park's sophisticated market, an experienced agent's guidance on off-market opportunities, pricing strategy, and negotiation tactics can make a six-figure difference in your outcome. References from past clients in similar price ranges are essential. At Cascade California Realty, we check all these boxes—<Link to="/contact" className="text-blue-600 hover:underline">schedule a no-pressure consultation</Link> to see if we're the right fit.</>
  },
  {
    question: "What is the investment potential for rental properties in Menlo Park?",
    answer: <>Menlo Park rental properties can generate strong returns, but cash flow is challenging given high purchase prices. Single-family homes rarely cash flow as straight rentals (typical gross rental yields are 2-3%). Better strategies include: renting to Meta/Stanford employees on short-term corporate assignments, offering furnished rentals at premium rates, purchasing multi-family properties (2-4 units) in east Menlo Park, adding ADUs (Accessory Dwelling Units) to increase rental income, or house-hacking by living in one unit and renting others. The investment case is primarily appreciation-driven rather than cash flow. Long-term holders benefit from Prop 13 tax benefits, strong appreciation, and increasing rents, but expect to subsidize carrying costs initially. Thinking about Menlo Park as an investment? <Link to="/contact" className="text-blue-600 hover:underline">Let Cascade California Realty run the numbers with you</Link>.</>
  }
];

export function MenloParkFAQ() {
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
        title="Best Realtor in Menlo Park | Manoj Thomas - Top Menlo Park Real Estate Agent 2025"
        description="Looking for the best realtor in Menlo Park? Manoj Thomas is the #1 rated Menlo Park real estate agent with 15+ years experience, $1B+ sales. Expert in Menlo Park homes and neighborhoods."
        canonical="https://cascaderealtors.com/menlo-park"
        city="Menlo Park"
        county="San Mateo County"
        coordinates={{ lat: 37.4530, lng: -122.1817 }}
      />
      <FAQHeader />
      <FAQHero
        title="Menlo Park Real Estate FAQ"
        description="Everything you need to know about buying a home in Menlo Park. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="menlo-park" />

      <Footer />
    </div>
  );
}
