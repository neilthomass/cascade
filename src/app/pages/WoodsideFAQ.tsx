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
    question: "What is the average home price in Woodside?",
    answer: <>The median home price in Woodside is approximately $4.5 million as of 2024, making it one of the most exclusive communities in the Bay Area. However, prices range dramatically from around $2 million for smaller properties to well over $20 million for premium estates with extensive acreage. Most homes sit on large lots (1-5+ acres) and offer privacy, equestrian facilities, and proximity to redwood forests. The ultra-luxury market and limited inventory keep prices consistently high. For a personalized market analysis based on your budget and preferences, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team</Link> for a confidential consultation.</>
  },
  {
    question: "What makes Woodside unique compared to other Bay Area communities?",
    answer: <>Woodside is renowned as the Bay Area's premier equestrian community, offering a rare blend of rural luxury just minutes from Silicon Valley. The town features miles of riding trails, horse properties with barns and paddocks, towering redwood forests, and a strong emphasis on preserving natural beauty. Residents enjoy large ranch-style estates, complete privacy, no sidewalks or streetlights (maintaining the rural character), and proximity to world-class hiking, yet remain within 30 minutes of tech hubs and San Francisco. Our agents at Cascade California Realty specialize in these distinctive properties and can help you find one that matches your lifestyle.</>
  },
  {
    question: "Is Woodside a good place to buy a home in 2025?",
    answer: <>Woodside offers exceptional value for buyers seeking privacy, nature, and luxury in 2025. The town's strict zoning protects property values by limiting development and maintaining large lot sizes. Strong demand from tech executives and affluent families, combined with extremely limited inventory (only 5,562 residents), supports continued appreciation. Key attractions include top-rated schools, equestrian lifestyle, and unmatched privacy. Buyers should plan for long-term ownership (10+ years) to maximize returns and fully enjoy the lifestyle. <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link> to discuss current market timing and opportunities.</>
  },
  {
    question: "What are the best areas to buy in Woodside?",
    answer: <>Woodside doesn't have traditional neighborhoods, but desirable areas include: properties near Huddart Park and Wunderlich Park (direct trail access), homes in the hills with Bay or canyon views, estates along Mountain Home Road and Woodside Road (central location), and properties near the historic Woodside Store. The eastern side offers easier commutes to Silicon Valley, while western areas provide deeper forest seclusion. Consider proximity to riding trails, school access, and fire safety when choosing your location. Our Woodside specialists at Cascade California Realty know every corner of this unique community and can guide you to the right area for your needs.</>
  },
  {
    question: "How much do I need to earn to buy a house in Woodside?",
    answer: <>To comfortably afford a median-priced Woodside home ($4.5M), you typically need a household income of $1 million or more annually, assuming a 20% down payment ($900K) and following conservative debt-to-income guidelines. Many Woodside buyers have significant assets beyond salary, including stock options, equity compensation, or business ownership. Entry-level properties around $2-3M might require $500K-700K in household income. Most buyers pay all-cash or make substantial down payments (40-50%). If you'd like to explore financing options or discuss your specific situation, <Link to="/contact" className="text-blue-600 hover:underline">our team can connect you with trusted lenders</Link> who specialize in high-value transactions.</>
  },
  {
    question: "What is the equestrian lifestyle like in Woodside?",
    answer: <>Woodside is California's premier equestrian community with over 100 miles of riding trails connecting properties, parks, and open space. Many homes include barns, paddocks, riding arenas, and horse facilities. The community supports multiple boarding facilities, riding schools, and equestrian events. Trail access connects to Huddart Park, Wunderlich Park, and broader San Mateo County trail systems. Even non-horse owners appreciate the rural character and car-free trail networks perfect for hiking and mountain biking. At Cascade California Realty, we understand the nuances of equestrian properties and can help you find one with the right facilities for your horses.</>
  },
  {
    question: "What are property taxes like in Woodside?",
    answer: <>San Mateo County property taxes in Woodside are approximately 1.15% of assessed value annually, including the base Proposition 13 rate plus local assessments. For a $4.5M home, expect around $52,000 per year in property taxes. Prop 13 limits annual increases to 2% regardless of market appreciation, providing long-term tax predictability. New buyers are assessed at purchase price. Many Woodside properties have large land values, and buyers should factor in estate planning for potential future property transfer taxes. <Link to="/contact" className="text-blue-600 hover:underline">Get in touch with us</Link> to understand the full financial picture before making your purchase.</>
  },
  {
    question: "What are the schools like in Woodside?",
    answer: <>Woodside is served by the highly-rated Woodside Elementary School District (K-8), known for small class sizes and strong community involvement. High school students attend Carlmont or Sequoia High School in the Sequoia Union High School District, both offering excellent programs. Many families also choose prestigious private schools nearby, including Menlo School, Sacred Heart Prep, and Woodside Priory School (located in Portola Valley, adjacent to Woodside). The area's educational options attract families prioritizing academic excellence. We're happy to share insights on school boundaries and help you find homes in specific attendance areas.</>
  },
  {
    question: "What are the hidden costs of owning a home in Woodside?",
    answer: <>Beyond the purchase price, Woodside homeowners should budget for: property maintenance on large lots (landscaping, tree care), fire mitigation and defensible space requirements, private road maintenance fees (many properties), septic system maintenance (some areas lack municipal sewer), well maintenance (if applicable), homeowners insurance (higher due to fire risk), equestrian facility upkeep (if applicable), and utility costs for large homes. Annual maintenance can easily reach $50,000-100,000+ for estate properties. <Link to="/contact" className="text-blue-600 hover:underline">Speak with our Woodside experts</Link> to get a complete cost breakdown before you buy.</>
  },
  {
    question: "What should I know about fire risk in Woodside?",
    answer: <>Woodside is located in a high fire risk zone due to dense forests, steep terrain, and seasonal drought. Homeowners must maintain defensible space (clearing vegetation around structures), follow strict fire-safe landscaping guidelines, and consider fire-resistant building materials for renovations. Insurance costs reflect this risk, and some carriers have reduced coverage in wildfire areas. However, the town has robust fire protection (CAL FIRE, local departments), and most modern homes include fire suppression systems. Proper mitigation makes the risk manageable. Our team at Cascade California Realty can help you evaluate fire risk factors during your property search.</>
  },
  {
    question: "Can I have horses on my Woodside property?",
    answer: <>Yes, horses are welcome on most Woodside properties, subject to lot size and zoning requirements. Typically, properties over 1-2 acres can support horses with proper facilities (barn, paddock, water). Many homes already include equestrian amenities. Check specific zoning for your property, as regulations govern the number of horses per acre, setbacks for barns, and manure management. Woodside's equestrian-friendly zoning and culture make it one of the few Bay Area communities where horses are the norm rather than exception. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> to explore available equestrian properties that meet your specific needs.</>
  },
  {
    question: "What is the commute like from Woodside to San Francisco and Silicon Valley?",
    answer: <>Woodside offers reasonable commutes to both San Francisco (35-45 minutes via 280) and Silicon Valley tech hubs. Menlo Park, Palo Alto, and Stanford are 10-15 minutes away. Redwood City is 15 minutes. San Francisco is 30-40 minutes in light traffic, 60+ during peak hours. Mountain View and Sunnyvale are 25-30 minutes. The trade-off is worthwhile for many tech executives who value privacy and nature. Remote work trends have made Woodside even more attractive for those with flexible schedules. Let our agents help you find a property that balances your commute needs with your lifestyle goals.</>
  },
  {
    question: "What recreational activities are available in Woodside?",
    answer: <>Woodside offers world-class outdoor recreation including horseback riding on 100+ miles of trails, hiking in Huddart Park and Wunderlich Park, mountain biking on renowned trails, road cycling on scenic routes (popular with serious cyclists), and trail running. The historic Woodside Store provides community gathering space. Nearby attractions include Filoli Gardens, Purisima Creek Redwoods, and quick access to Half Moon Bay beaches. The community also hosts events like the Woodside Horse Show and supports local arts and culture. We love helping buyers discover homes that maximize access to these incredible amenities.</>
  },
  {
    question: "What is the home buying process like in Woodside?",
    answer: <>Buying in Woodside typically takes 30-60 days and requires specialized knowledge. Key steps include: 1) Work with an agent experienced in luxury and equestrian properties, 2) Secure financing (many use jumbo loans or all-cash offers), 3) Conduct thorough inspections including well/septic, foundation, soil stability, and fire risk assessment, 4) Review disclosure packages carefully (septic reports, well water tests, geological surveys), 5) Understand private road agreements and easements, 6) Complete title review and insurance. Competition is less intense than urban areas, but inventory is extremely limited. <Link to="/contact" className="text-blue-600 hover:underline">Partner with Cascade California Realty</Link> to navigate this process with confidence and expertise.</>
  },
  {
    question: "Are there any deed restrictions or HOAs in Woodside?",
    answer: <>Woodside has minimal HOAs compared to suburban communities. However, many properties have private road associations with annual fees ($500-$5,000+) for road maintenance. Some neighborhoods have CC&Rs (Covenants, Conditions, and Restrictions) governing architectural guidelines, minimum lot sizes, and land use. The town itself has strict zoning protecting rural character: no lot splits under 2.5 acres, height limits, tree preservation ordinances, and dark sky policies (limited outdoor lighting). These restrictions preserve property values and community character. Our agents thoroughly review all deed restrictions and association requirements so you know exactly what to expect before closing.</>
  },
  {
    question: "What utilities and services are available in Woodside?",
    answer: <>Woodside has a mix of utility services. Water comes from private wells or California Water Service. Many properties use septic systems rather than sewer. Natural gas and electricity are provided by PG&E. Internet options include Comcast/Xfinity cable and some fiber, though speeds vary by location (rural areas may have slower service). Cell service can be spotty in canyon areas. Trash service is private. These rural utilities require more homeowner involvement than typical suburban services. <Link to="/contact" className="text-blue-600 hover:underline">Reach out to our team</Link> and we'll help you understand the specific utility situation for any property you're considering.</>
  },
  {
    question: "What is the historic Woodside Store, and why is it significant?",
    answer: <>The Woodside Store, built in 1854, is a California Historical Landmark and one of the oldest commercial buildings in San Mateo County. Originally a general store and post office serving lumberjacks and farmers, it now operates as a museum run by San Mateo County, offering a glimpse into early California history. The store symbolizes Woodside's heritage and commitment to preserving its historical and rural character. It's a beloved community landmark and popular spot for visitors exploring the town. Properties near the historic Woodside Store area are highly sought after, and our team can help you find listings in this charming location.</>
  },
  {
    question: "Can I build or renovate a home in Woodside?",
    answer: <>Yes, but Woodside has strict building regulations to preserve natural beauty and rural character. New construction and major renovations require Planning Commission review, environmental assessments, tree removal permits (heavily restricted), and compliance with fire safety standards. Expect 6-18 months for permitting. Design review focuses on minimizing environmental impact, preserving views, and maintaining dark skies (limiting exterior lighting). Work with architects and builders experienced in Woodside's requirements. Despite complexity, many buyers choose to build custom estates on vacant land. <Link to="/contact" className="text-blue-600 hover:underline">Let us connect you with trusted local contractors</Link> and guide you through the permitting landscape.</>
  },
  {
    question: "Is Woodside family-friendly?",
    answer: <>Woodside is extremely family-friendly, particularly for families who value outdoor activities, privacy, and excellent schools. Children enjoy horseback riding, hiking, exploring nature, and wide-open spaces. The community is safe, tight-knit, and supportive. However, families should consider: limited walkability (car-dependent for most activities), fewer neighborhood playmates due to low density, and longer drives to activities. The lifestyle suits families seeking a rural, active upbringing away from suburban density. Many successful tech families choose Woodside for these exact qualities. <Link to="/contact" className="text-blue-600 hover:underline">Talk to Cascade California Realty</Link> to find the perfect family estate.</>
  },
  {
    question: "How do I choose the right real estate agent for buying in Woodside?",
    answer: <>Choose a Woodside agent based on: luxury and equestrian property expertise, deep knowledge of zoning and land use regulations, experience with well/septic inspections and geological concerns, strong relationships with local inspectors and contractors, understanding of private road agreements and easements, and negotiation skills in the ultra-luxury market. Interview agents who have closed multiple Woodside transactions and can provide references. The right agent saves you time and money by navigating the unique complexities of this exclusive market. At <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty</Link>, our specialists bring decades of combined experience in Woodside's distinctive real estate landscape.</>
  }
];

export function WoodsideFAQ() {
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
        title="Best Realtor in Woodside | Manoj Thomas - Top Woodside Real Estate Agent 2025"
        description="Looking for the best realtor in Woodside? Manoj Thomas is the #1 rated Woodside real estate agent with 15+ years experience, $1B+ sales. Expert in Woodside homes and neighborhoods."
        canonical="https://cascaderealtors.com/woodside"
        city="Woodside"
        county="San Mateo County"
        coordinates={{ lat: 37.4299, lng: -122.2539 }}
      />
      <FAQHeader />
      <FAQHero
        title="Woodside Real Estate FAQ"
        description="Everything you need to know about buying a home in Woodside. Expert answers from a Bay Area real estate professional with 15+ years of experience in luxury and equestrian properties."
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
      <RelatedCities currentCity="woodside" />

      <Footer />
    </div>
  );
}
