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
    question: "What is the average home price in Lafayette?",
    answer: <>The median home price in Lafayette is approximately $2.1 million as of 2024, making it one of the most desirable communities in Contra Costa County. Prices vary based on location, with hillside properties commanding premium prices for their privacy and views, while homes closer to downtown Lafayette offer walkability to shops and restaurants. The strong Lafayette School District and small-town charm contribute to sustained property values and appreciation potential. For a personalized analysis of current pricing in specific neighborhoods, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team at Cascade California Realty</Link>.</>
  },
  {
    question: "What makes Lafayette's schools so highly rated?",
    answer: <>Lafayette is served by the Lafayette School District, consistently ranked among the top districts in California. The district includes highly acclaimed elementary schools like Lafayette Elementary, Burton Valley Elementary, and Springhill Elementary, along with Stanley Middle School. High school students attend Acalanes High School, known for excellent academics, arts programs, and athletics. Small class sizes, engaged parents, and strong community support create an exceptional learning environment that drives many families to choose Lafayette. <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link> if you need guidance on which neighborhoods feed into your preferred schools.</>
  },
  {
    question: "What is the downtown Lafayette experience like?",
    answer: <>Downtown Lafayette offers charming, walkable streets lined with boutique shops, cafes, and restaurants. The downtown core along Mt. Diablo Boulevard and surrounding streets features local favorites like Artisan Bistro, Postino, and numerous coffee shops. Weekly farmers markets, community events, and the historic Lafayette Plaza create a village atmosphere rare in the Bay Area. Residents enjoy the ability to walk to errands, meet neighbors at local establishments, and participate in a tight-knit community that values its small-town character. Our agents at Cascade California Realty can show you homes within walking distance of downtown - <Link to="/contact" className="text-blue-600 hover:underline">schedule a tour today</Link>.</>
  },
  {
    question: "How is the BART access from Lafayette?",
    answer: <>Lafayette BART station provides direct access to San Francisco, Oakland, and the broader Bay Area. The commute to downtown San Francisco takes approximately 35-40 minutes, making Lafayette ideal for professionals working in the city who want suburban living. The station is centrally located with ample parking, though spaces fill quickly during peak hours. Many residents use BART for daily commutes, events, and airport access, appreciating the convenience of public transit combined with Lafayette's suburban lifestyle. If BART proximity is a priority for your search, <Link to="/contact" className="text-blue-600 hover:underline">let Cascade California Realty know</Link> and we'll focus on properties with the best station access.</>
  },
  {
    question: "What hiking and outdoor activities are available in Lafayette?",
    answer: <>Lafayette offers exceptional access to hiking trails and outdoor recreation. The Lafayette-Moraga Regional Trail is perfect for walking, running, and cycling through scenic landscapes. Nearby Briones Regional Park provides miles of hiking trails with panoramic views of Mount Diablo and the Bay Area. Lafayette Reservoir offers a 2.7-mile paved trail around the water, ideal for families, plus fishing and boating opportunities. The mild climate allows year-round outdoor activities, and many neighborhoods have direct trail access from their properties. Looking for a home with easy trail access? <Link to="/contact" className="text-blue-600 hover:underline">Ask Cascade California Realty</Link> about properties bordering open space.</>
  },
  {
    question: "Is Lafayette a good place for families with children?",
    answer: <>Lafayette is exceptional for families, consistently ranking as one of the Bay Area's top family-friendly communities. The combination of top-rated schools, safe neighborhoods, abundant parks and playgrounds, and strong youth sports programs creates an ideal environment for raising children. The community hosts family-oriented events throughout the year, and the walkable downtown allows kids to develop independence safely. Many families specifically relocate to Lafayette for the schools and family-focused atmosphere, creating a community where children thrive. The team at Cascade California Realty specializes in helping families find the perfect Lafayette neighborhood - <Link to="/contact" className="text-blue-600 hover:underline">get in touch to start your search</Link>.</>
  },
  {
    question: "What youth sports programs are available in Lafayette?",
    answer: <>Lafayette offers comprehensive youth sports programs through organizations like Lafayette Little League, AYSO Soccer, Lafayette Swim Conference, and Lafayette Junior Basketball. The community's emphasis on youth sports means excellent facilities, experienced coaches, and strong participation across all age groups. Many programs have long-standing traditions and alumni networks. The Lafayette Community Center and various parks provide venues for sports year-round, and the engaged parent community ensures quality programs that balance competition with skill development and fun.</>
  },
  {
    question: "What are the advantages of hillside properties in Lafayette?",
    answer: <>Lafayette's hillside properties offer privacy, larger lots, spectacular views, and a secluded feeling while remaining close to amenities. Many hillside homes sit on half-acre to multi-acre parcels with mature landscaping, creating private retreats. Properties in neighborhoods like Happy Valley, Upper Happy Valley, and areas near Briones offer panoramic vistas of Mount Diablo, rolling hills, and distant Bay views. While hillside living may involve steeper driveways and more maintenance, buyers seeking privacy and natural beauty find exceptional value in Lafayette's hills. Cascade California Realty has extensive experience with hillside properties - <Link to="/contact" className="text-blue-600 hover:underline">contact us</Link> for current listings with views.</>
  },
  {
    question: "How does Lafayette maintain its small-town feel?",
    answer: <>Lafayette has carefully preserved its small-town character through community engagement, thoughtful development, and strong local institutions. The city maintains strict development standards, emphasizes locally-owned businesses, and hosts community events like the Art & Wine Festival and Fourth of July parade. Residents actively participate in local government, schools, and community organizations. The walkable downtown, lack of chain stores in the core, and emphasis on preserving open space all contribute to Lafayette's unique village atmosphere that sets it apart from more suburban neighbors.</>
  },
  {
    question: "What is the commute like from Lafayette to San Francisco and Silicon Valley?",
    answer: <>Lafayette offers versatile commute options. To San Francisco, BART provides a 35-40 minute direct connection, or Highway 24 to 580/80 takes 30-45 minutes by car depending on traffic. For Silicon Valley commuters, the drive via Highway 24 to 680 South ranges from 45-75 minutes depending on destination and traffic. Many tech workers commute to East Bay offices in Walnut Creek, San Ramon, or Pleasanton (20-30 minutes). The trade-off of a slightly longer commute for Lafayette's lifestyle, schools, and community appeals to many Bay Area professionals. Share your workplace location with <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty</Link> and we'll help identify neighborhoods that optimize your commute.</>
  },
  {
    question: "What types of homes are typical in Lafayette?",
    answer: <>Lafayette's housing stock is diverse, ranging from charming mid-century ranches to modern custom estates. Common styles include California ranch homes from the 1950s-1970s, traditional colonials, contemporary designs, and Mediterranean-inspired homes. Lot sizes vary significantly, from quarter-acre lots in more central locations to multi-acre hillside estates. Many homes have been updated or remodeled while maintaining classic California indoor-outdoor living with decks, patios, and landscaped yards. The variety ensures buyers can find everything from move-in ready homes to fixer-uppers with potential. Whatever your style preference, <Link to="/contact" className="text-blue-600 hover:underline">our team</Link> can help you find the right fit.</>
  },
  {
    question: "How competitive is the Lafayette housing market?",
    answer: <>Lafayette's housing market is highly competitive, especially for well-maintained homes in desirable neighborhoods near top schools. Properties often receive multiple offers, particularly in the spring market when families are planning for the school year. Homes priced correctly typically sell within 2-4 weeks, and bidding wars are common for turn-key properties. However, homes requiring significant updates or in less desirable locations may sit longer, providing opportunities for buyers willing to renovate. Working with an agent who knows Lafayette's micro-markets and school boundaries is essential - <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty</Link> offers that local expertise.</>
  },
  {
    question: "What are the property taxes like in Lafayette?",
    answer: <>Lafayette property taxes are approximately 1.1-1.2% of assessed value annually, including the base 1% California rate plus local bonds and assessments for schools and services. Thanks to Proposition 13, your assessed value can only increase by a maximum of 2% per year, making long-term ownership financially predictable. New buyers are assessed at purchase price, so a $2.1 million home would have annual taxes around $23,000-$25,000. The exceptional schools and services justify the tax rate for most residents, and long-term owners benefit significantly from Prop 13 protection. Have questions about the full cost of ownership? <Link to="/contact" className="text-blue-600 hover:underline">Our advisors at Cascade California Realty</Link> can walk you through the numbers.</>
  },
  {
    question: "Is Lafayette a good real estate investment?",
    answer: <>Lafayette has historically been an excellent real estate investment due to limited inventory, top-rated schools, and strong demand from families and professionals. Properties appreciate steadily, with the school district reputation driving sustained demand. The combination of Proposition 13 tax protection, quality of life, and proximity to job centers creates favorable long-term investment conditions. While the high median price requires significant capital, buyers planning to stay 5-10+ years typically see strong appreciation and enjoy the lifestyle benefits while building equity. For a detailed market analysis, <Link to="/contact" className="text-blue-600 hover:underline">speak with Cascade California Realty</Link> about current opportunities.</>
  },
  {
    question: "What community events and activities define Lafayette?",
    answer: <>Lafayette hosts numerous community events that strengthen its village character. The annual Art & Wine Festival draws thousands for live music, art vendors, and food. The Fourth of July Parade and Celebration is a beloved tradition featuring floats, music, and family activities. Weekly farmers markets offer local produce and community gathering. The Lafayette Library hosts readings and programs, while the Town Hall Theatre provides professional-quality performances. Seasonal events like Halloween parades and holiday celebrations create traditions that generations of families cherish, fostering the strong community bonds Lafayette is known for.</>
  },
  {
    question: "What should first-time buyers know about purchasing in Lafayette?",
    answer: <>First-time buyers considering Lafayette should understand the high price point requires strong income and down payment, typically $400,000-$500,000 minimum. Focus on properties in your budget even if smaller or needing updates, as getting into the Lafayette market and school district is the priority. Consider future resale value, especially school proximity and neighborhood desirability. Be prepared for competitive offers and move quickly on good properties. Many first-time buyers start with condos or smaller homes, build equity, and later upgrade to larger single-family properties while staying in the community. <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty</Link> loves guiding first-time buyers through the process - we're here to help you find your way in.</>
  },
  {
    question: "How does Lafayette compare to neighboring Orinda and Moraga?",
    answer: <>Lafayette, Orinda, and Moraga form the desirable 'Lamorinda' region, sharing excellent schools and quality of life. Lafayette offers the most walkable downtown with shops and restaurants, plus convenient BART access. Orinda is slightly more residential with newer housing stock and the highly-rated Orinda school system. Moraga has more affordable entry points and a college-town atmosphere with Saint Mary's College. All three have strong communities, but Lafayette's downtown vitality and BART connectivity make it popular with commuters and those valuing walkability alongside suburban living. Not sure which Lamorinda community suits you best? <Link to="/contact" className="text-blue-600 hover:underline">Talk to our team</Link> for personalized guidance.</>
  },
  {
    question: "What are the HOA considerations for Lafayette properties?",
    answer: <>Many Lafayette single-family homes have no HOA, giving owners complete control over their property. Some planned communities and townhome developments have HOAs with fees ranging from $200-$600 monthly, typically covering common area maintenance, landscaping, and sometimes water/garbage. When buying in an HOA community, review the CC&Rs, financial reserves, and any planned assessments. Ask about restrictions on renovations, parking, and rentals. Non-HOA properties offer more freedom but require owners to handle all maintenance, which appeals to buyers wanting independence and control.</>
  },
  {
    question: "What makes Lafayette worth the premium price over other Bay Area suburbs?",
    answer: <>Lafayette commands premium prices due to its rare combination of top-tier schools, walkable downtown, small-town community feel, and excellent location. While neighboring cities may offer lower entry points, Lafayette's Lafayette School District, charming downtown, active community, and BART access create exceptional value. The investment in Lafayette lifestyle pays dividends in daily quality of life, strong resale values, and children's educational opportunities. For families prioritizing schools and community over home size, and professionals valuing BART access to San Francisco, Lafayette's premium is justified by the unique lifestyle it offers. Ready to explore what Lafayette has to offer? <Link to="/contact" className="text-blue-600 hover:underline">Reach out to Cascade California Realty</Link> for a no-pressure conversation.</>
  },
  {
    question: "How can I determine if Lafayette is the right community for my family?",
    answer: <>Visit Lafayette multiple times at different times of day and week. Walk downtown Lafayette, attend a farmers market, and observe the community atmosphere. Tour neighborhoods you're considering and note proximity to schools, parks, and downtown. If possible, attend a Lafayette school district event or tour schools. Talk to residents about their experiences. Consider your commute, trying it during rush hour via BART or car. Evaluate your priorities: if excellent schools, walkable downtown, community engagement, and small-town feel rank high, Lafayette likely suits your family well despite the premium price. When you're ready to take the next step, <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty is here to help</Link> you make Lafayette home.</>
  }
];

export function LafayetteFAQ() {
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
        title="Best Realtor in Lafayette | Manoj Thomas - Top Lafayette Real Estate Agent 2025"
        description="Looking for the best realtor in Lafayette? Manoj Thomas is the #1 rated Lafayette real estate agent with 15+ years experience, $1B+ sales. Expert in Lafayette homes and neighborhoods."
        canonical="https://cascaderealtors.com/lafayette"
        city="Lafayette"
        county="Contra Costa County"
        coordinates={{ lat: 37.8858, lng: -122.1180 }}
      />
      <FAQHeader />
      <FAQHero
        title="Lafayette Real Estate FAQ"
        description="Everything you need to know about buying a home in Lafayette. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="lafayette" />

      <Footer />
    </div>
  );
}
