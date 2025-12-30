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
      const response = await fetch('https://www.cascaderealtors.com/api/contact', {
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
    question: "What is the average home price in Pacifica?",
    answer: <>The median home price in Pacifica is approximately $1.3 million as of 2024. This represents excellent value compared to neighboring San Francisco and peninsula cities. Prices vary based on ocean views, proximity to beaches, and property type—from coastal condos starting around $700,000 to luxury oceanfront estates exceeding $3 million. Pacifica's relative affordability makes it attractive for buyers seeking coastal living without San Francisco price tags. For a detailed analysis of current pricing in your target neighborhoods, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our Pacifica specialists</Link>.</>
  },
  {
    question: "Is Pacifica a good place to buy a home in 2025?",
    answer: <>Pacifica offers compelling value for coastal living in 2025. With median prices around $1.3 million—significantly lower than San Francisco's $1.35 million—you get ocean views, beach access, and a tight-knit community. The city appeals to remote workers, surfers, and families seeking outdoor lifestyle. While the foggy climate isn't for everyone, those who embrace it find excellent long-term appreciation potential as Bay Area coastal properties remain in high demand. The team at Cascade California Realty can help you assess whether Pacifica aligns with your goals—<Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link> to explore your options.</>
  },
  {
    question: "What are the best neighborhoods in Pacifica for families?",
    answer: <>Linda Mar is Pacifica's most family-friendly neighborhood, offering proximity to Linda Mar Beach, good schools in the Jefferson Union High School District, and a strong community feel. Sharp Park provides more affordable options with easy highway access. Fairmont and Vallemar offer hillside homes with ocean views and quieter streets. Park Pacifica features newer developments with modern amenities. Each neighborhood has its own microclimate—areas closer to the coast experience more fog. Want help narrowing down which area suits your family best? <Link to="/contact" className="text-blue-600 hover:underline">Connect with our local experts</Link> for personalized neighborhood tours.</>
  },
  {
    question: "How much fog does Pacifica really get?",
    answer: <>Pacifica is known as one of the foggiest coastal cities in California, especially during summer months (June-August). Coastal neighborhoods like Sharp Park and Rockaway Beach can experience fog and cool temperatures while inland areas like Linda Mar may be sunnier. Morning fog typically burns off by afternoon, though some days remain overcast. Winter months are often clearer. Buyers should spend time in Pacifica during different seasons and times of day to ensure the climate suits their lifestyle. Our agents at Cascade California Realty know the microclimates intimately—<Link to="/contact" className="text-blue-600 hover:underline">ask us</Link> which pockets get the most sunshine.</>
  },
  {
    question: "What beaches are in Pacifica?",
    answer: "Pacifica features several stunning beaches along its 5-mile coastline. Linda Mar Beach is the most popular, known for excellent surfing conditions and family-friendly amenities. Rockaway Beach offers tide pools, dining at the historic pier, and dramatic cliff views. Sharp Park Beach provides wide sandy shores and is dog-friendly. Pacifica State Beach (San Pedro Beach) offers scenic bluff trails. Mori Point features coastal hiking trails with panoramic ocean views. Each beach has distinct character and wave conditions."
  },
  {
    question: "Is Pacifica good for surfing?",
    answer: "Pacifica is one of the Bay Area's premier surfing destinations. Linda Mar Beach is ideal for beginners and intermediate surfers, with consistent waves year-round and several surf schools offering lessons. Rockaway Beach provides more challenging breaks for experienced surfers. The water is cold (requiring wetsuit year-round), but the surfing community is welcoming and active. Proximity to multiple breaks, surf shops, and the ocean lifestyle make Pacifica paradise for wave riders."
  },
  {
    question: "What is the commute like from Pacifica?",
    answer: <>Pacifica's commute requires acceptance of winding coastal roads. Highway 1 connects to Interstate 280 and Highway 101, with commutes to San Francisco taking 30-45 minutes in good traffic, though fog and congestion can extend this. South Bay tech workers face 45-75 minute commutes. The scenic coastal drive is a trade-off buyers should consider. BART isn't accessible directly, though the Daly City BART station is 15 minutes away. Pacifica works best for remote workers or those with flexible schedules. If commute logistics are a priority, <Link to="/contact" className="text-blue-600 hover:underline">let us know your workplace location</Link> and we'll suggest the best-positioned neighborhoods.</>
  },
  {
    question: "What are property taxes in Pacifica?",
    answer: <>Pacifica property taxes run approximately 1.12-1.15% of assessed value annually, including San Mateo County's base rate plus local bonds and assessments. Thanks to California's Proposition 13, your assessed value increases by a maximum of 2% per year regardless of market appreciation. A home purchased for $1.3 million would have annual property taxes around $14,600-$15,000. New buyers are assessed at purchase price, making long-term ownership increasingly advantageous as market values rise. Need help calculating the full cost of ownership? <Link to="/contact" className="text-blue-600 hover:underline">Our team can walk you through the numbers</Link>.</>
  },
  {
    question: "Are there good schools in Pacifica?",
    answer: <>Pacifica is served by the Pacifica School District (K-8) and Jefferson Union High School District. Schools include Ocean Shore Elementary, Vallemar Elementary, and Ingrid B. Lacy Middle School. Terra Nova High School and Oceana High School serve the area. While test scores vary, smaller class sizes and strong community involvement are benefits. Many families supplement with private schools in nearby Burlingame or San Mateo. The coastal lifestyle and outdoor education opportunities are significant draws for active families. For guidance on which neighborhoods feed into your preferred schools, <Link to="/contact" className="text-blue-600 hover:underline">get in touch with us</Link>.</>
  },
  {
    question: "What are the hidden costs of buying a home in Pacifica?",
    answer: <>Beyond purchase price, Pacifica buyers should budget for: coastal home maintenance (salt air accelerates wear on exteriors, windows, and vehicles), potential septic system costs in some areas, higher heating bills due to fog and cooler temperatures, coastal hazard insurance considerations, and possible seismic retrofitting for older homes. Properties with ocean views may require additional windstorm insurance. HOA fees for coastal condos range $400-$800/month. Budget extra for dehumidifiers and moisture control in foggy months. We help our clients anticipate these expenses—<Link to="/contact" className="text-blue-600 hover:underline">reach out</Link> for a comprehensive cost breakdown.</>
  },
  {
    question: "Is Pacifica at risk for coastal erosion or sea level rise?",
    answer: <>Some Pacifica properties face coastal erosion concerns, particularly along the eroding bluffs near Esplanade Avenue. The city has implemented beach nourishment and seawall projects to protect vulnerable areas. When buying in Pacifica, obtain detailed geological reports, review natural hazard disclosure statements carefully, and consider elevation and setback from coastal bluffs. Properties on hillsides above Highway 1 generally face less risk than bluff-top homes. Sea level rise projections should factor into long-term ownership decisions for coastal properties. At Cascade California Realty, we help buyers interpret hazard disclosures and identify properties with sound long-term positioning—<Link to="/contact" className="text-blue-600 hover:underline">contact us</Link> with any concerns.</>
  },
  {
    question: "What dining and shopping options are available in Pacifica?",
    answer: "Pacifica offers limited but beloved local dining, including Nick's Restaurant (oceanfront fine dining), Moonraker (seafood at Rockaway Beach), and Puerto 27 (Peruvian). The Manor Restaurant and various taco shops and cafes serve locals. Shopping is primarily convenience stores and small groceries—residents drive to Daly City, South San Francisco, or Burlingame for major shopping. This limited commercial development preserves Pacifica's quiet, nature-focused character but requires adjustment for those accustomed to urban amenities."
  },
  {
    question: "What outdoor activities are popular in Pacifica?",
    answer: "Pacifica is outdoor recreation paradise. Surfing leads the activities, followed by coastal hiking (Mori Point, Sweeney Ridge, Coastal Trail), mountain biking on Pedro Mountain Road, fishing from piers and shoreline, tide pooling, and beachcombing. Devil's Slide Trail offers paved walking with stunning coastal views. Whale watching opportunities exist seasonally. The community embraces outdoor lifestyle year-round despite fog and cool temperatures. Dog owners appreciate dog-friendly beaches. This nature access is Pacifica's primary appeal."
  },
  {
    question: "How does Pacifica compare to Half Moon Bay?",
    answer: <>Pacifica and Half Moon Bay both offer coastal living but differ significantly. Pacifica provides closer proximity to San Francisco (20 miles vs. 30), lower median prices ($1.3M vs. $1.5M+), and more developed infrastructure. Half Moon Bay offers more sunshine, charming downtown with dining and shops, and agricultural character. Pacifica suits surfers and those prioritizing SF access; Half Moon Bay appeals to those seeking small-town coastal community. Both face similar commute challenges and coastal weather patterns. Unsure which coastal community fits you best? <Link to="/contact" className="text-blue-600 hover:underline">Talk to our team</Link>—we represent buyers in both markets.</>
  },
  {
    question: "Can you have short-term rentals in Pacifica?",
    answer: <>Pacifica regulates short-term rentals and requires permits for vacation rentals operating less than 30 consecutive days. The city caps the number of permits available and enforces occupancy limits and safety requirements. Many HOAs in Pacifica prohibit short-term rentals entirely. Buyers considering rental income strategies should research current regulations, verify property zoning, review HOA restrictions, and obtain proper permits before purchasing. Traditional long-term rentals face fewer restrictions and benefit from strong coastal demand. If rental potential is part of your strategy, <Link to="/contact" className="text-blue-600 hover:underline">let us help you find compliant properties</Link>.</>
  },
  {
    question: "What is the investment potential for Pacifica real estate?",
    answer: <>Pacifica offers strong long-term investment potential based on several factors: limited coastal land supply in the Bay Area, relative affordability compared to neighboring cities, growing remote work acceptance making location flexibility viable, and increasing appreciation for outdoor lifestyle. Risks include coastal erosion concerns for some properties, climate considerations limiting buyer pool, and infrastructure constraints. Properties with ocean views and beach access appreciate most consistently. A 5-10 year hold typically shows strong returns for well-selected properties. For investment-focused guidance, <Link to="/contact" className="text-blue-600 hover:underline">speak with our Pacifica market specialists</Link>.</>
  },
  {
    question: "What should I look for when buying a coastal home in Pacifica?",
    answer: <>When buying in Pacifica, prioritize: detailed geological and foundation inspections (especially for bluff properties), moisture and drainage assessments (fog creates condensation issues), proximity to coast and erosion history, heating system condition (important for cool climate), window and exterior condition (salt air causes corrosion), disclosure review for past landslides or coastal hazards, and neighborhood microclimate (fog varies by area). Spend time in the property during foggy periods to assess comfort level with Pacifica's unique weather. Our experienced agents can guide you through the nuances of coastal property evaluation—<Link to="/contact" className="text-blue-600 hover:underline">get in touch</Link> to start your search the right way.</>
  },
  {
    question: "Is Pacifica a good place for retirees?",
    answer: <>Pacifica appeals to active retirees who embrace outdoor lifestyle and cooler coastal climate. Benefits include peaceful community, natural beauty, lower stress environment, excellent walking and hiking, and proximity to San Francisco cultural amenities. Challenges include limited local medical facilities (major hospitals are in San Francisco or San Mateo), hilly terrain that may become difficult with age, and distance from some services. Retirees who love nature, don't mind fog, and maintain active lifestyles find Pacifica ideal. Planning your next chapter on the coast? <Link to="/contact" className="text-blue-600 hover:underline">We would love to help you find the right fit</Link>.</>
  },
  {
    question: "What are the pros and cons of living in Pacifica?",
    answer: <>Pros: Stunning ocean views and beach access, excellent surfing, abundant outdoor recreation, tight-knit community feel, relative affordability for coastal living, proximity to San Francisco, peaceful lifestyle, and nature immersion. Cons: Persistent fog especially in summer, limited dining and shopping, winding commute routes, distance from major medical facilities, coastal erosion concerns for some properties, cooler temperatures year-round, and moisture/condensation management. Pacifica is ideal for outdoor enthusiasts who prioritize nature access over urban convenience. Still weighing your options? <Link to="/contact" className="text-blue-600 hover:underline">Let Cascade California Realty help you decide</Link> if Pacifica is the right move.</>
  },
  {
    question: "How competitive is the Pacifica housing market?",
    answer: <>Pacifica's market competitiveness varies by property type and season. Well-priced homes with ocean views typically receive multiple offers, especially during spring and summer. Properties requiring significant updating or in less desirable locations may have more negotiating room. The smaller market size means fewer listings than urban areas—inventory is limited, making timing important. Successful buyers get pre-approved financing, act quickly on new listings, understand Pacifica's unique value proposition, and work with agents experienced in coastal properties and local market dynamics. Ready to compete? <Link to="/contact" className="text-blue-600 hover:underline">Partner with our Pacifica experts</Link> for an edge in this unique market.</>
  }
];

export function PacificaFAQ() {
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
        title="Best Realtor in Pacifica | Manoj Thomas - Top Pacifica Real Estate Agent 2025"
        description="Looking for the best realtor in Pacifica? Manoj Thomas is the #1 rated Pacifica real estate agent with 15+ years experience, $1B+ sales. Expert in Pacifica homes and neighborhoods."
        canonical="https://cascaderealtors.com/pacifica"
        city="Pacifica"
        county="San Mateo County"
        coordinates={{ lat: 37.6138, lng: -122.4869 }}
      />
      <FAQHeader />
      <FAQHero
        title="Pacifica Real Estate FAQ"
        description="Everything you need to know about buying a home in Pacifica. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="pacifica" />

      <Footer />
    </div>
  );
}
