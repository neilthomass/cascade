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
            Get personalized guidance from a local expert with 15+ years of Bay Area experience.
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
    question: "What is the average home price in Los Gatos?",
    answer: "The median home price in Los Gatos is approximately $2.9 million as of 2025. However, prices vary significantly by property type and location—townhomes and condos in downtown start around $1.5 million, while luxury hillside estates in neighborhoods like Surmont or Belgatos can exceed $10 million. The town's exceptional schools, mountain setting, and charming downtown have made it one of Silicon Valley's most sought-after communities."
  },
  {
    question: "Is Los Gatos a good place to buy a home in 2025?",
    answer: "Los Gatos offers excellent value for buyers seeking a balance of small-town charm and proximity to Silicon Valley. The town's highly-rated schools, walkable downtown, abundant hiking trails, and strong sense of community make it ideal for families and outdoor enthusiasts. With limited housing inventory due to hillside geography and strict development controls, Los Gatos properties have shown consistent long-term appreciation. The market appeals to tech professionals seeking refuge from urban density while maintaining access to major employers."
  },
  {
    question: "What are the best neighborhoods in Los Gatos for families?",
    answer: "Top family-friendly neighborhoods in Los Gatos include Belgatos (newer homes, excellent schools, family-oriented), Downtown Los Gatos (walkability, community events, proximity to shops), Los Gatos-Almaden area (established homes, good schools), and Surmont (larger lots, mountain views, quiet streets). All areas benefit from the highly-regarded Los Gatos Union School District and Los Gatos High School. The entire town is remarkably family-friendly, with safe streets, abundant parks, and a strong community focus on children and education."
  },
  {
    question: "How much do I need to earn to buy a house in Los Gatos?",
    answer: "To comfortably afford a median-priced home in Los Gatos ($2.9M), you typically need a household income of $650,000-$800,000, assuming a 20% down payment ($580,000) and following the 28% debt-to-income guideline. Many Los Gatos buyers are dual-income tech professionals or entrepreneurs. Entry-level townhomes starting around $1.5M require approximately $350,000-$400,000 in household income. First-time buyers often start with condos or townhomes near downtown before upgrading to single-family homes."
  },
  {
    question: "What makes Los Gatos' historic downtown special?",
    answer: "Los Gatos' downtown is one of the Bay Area's most charming commercial districts, featuring tree-lined streets, locally-owned boutiques, upscale restaurants, and preserved historic buildings. The weekly farmers market, summer concerts in the plaza, and community events create a vibrant small-town atmosphere. Residents can walk to acclaimed restaurants like Manresa, Forbes Mill Steakhouse, and numerous cafes. The downtown's pedestrian-friendly design, mountain backdrop, and tight-knit community feel set it apart from typical suburban centers."
  },
  {
    question: "What are the schools like in Los Gatos?",
    answer: "Los Gatos boasts some of the Bay Area's top-rated schools. Los Gatos High School consistently ranks among California's best public high schools, with excellent academic programs, high college placement rates, and strong athletics. The Los Gatos Union School District serves elementary and middle school students with highly-rated schools. Many families specifically move to Los Gatos for the schools, which benefit from strong community support, involved parents, and substantial funding. Private school options are also available in nearby areas."
  },
  {
    question: "What is it like to live in the Los Gatos hills?",
    answer: "Hillside living in Los Gatos offers privacy, spectacular views, larger lots, and direct access to hiking trails and natural beauty. Homes range from mid-century moderns to contemporary estates, many with oak-studded lots of 1+ acres. Considerations include narrow, winding roads, wildfire risk (requiring proper insurance and defensible space), and distance from downtown services. Many hillside properties feature panoramic valley views, mature landscaping, and serene settings. The hills attract buyers seeking a retreat-like atmosphere while remaining close to Silicon Valley."
  },
  {
    question: "What outdoor activities are available in Los Gatos?",
    answer: "Los Gatos is an outdoor enthusiast's paradise with immediate access to hiking, biking, and nature. Popular trails include the Los Gatos Creek Trail (paved path to the bay), trails in the Sierra Azul Open Space Preserve, and nearby St. Joseph's Hill. Mountain bikers enjoy the extensive trail networks in the surrounding hills. The town also offers Vasona Lake County Park for kayaking and picnicking. Residents can be on a hiking trail within minutes from home, making it ideal for active lifestyles."
  },
  {
    question: "How is the restaurant scene in Los Gatos?",
    answer: "Los Gatos punches well above its size in dining quality, featuring multiple Michelin-rated restaurants and acclaimed chefs. Manresa (three Michelin stars) is one of California's finest restaurants. The downtown corridor offers everything from upscale steakhouses to casual Italian bistros, farm-to-table cafes, and authentic international cuisine. The Wine Room, Nick's Next Door, and Oak & Rye are local favorites. The concentration of quality restaurants rivals much larger cities, making Los Gatos a foodie destination."
  },
  {
    question: "What are the property taxes in Los Gatos?",
    answer: "Los Gatos property taxes are approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments for schools and services. A home purchased for $2.9M would have annual property taxes around $31,900-$34,800. Thanks to Prop 13, your assessed value increases by a maximum of 2% per year regardless of market appreciation. New buyers are assessed at purchase price. Santa Clara County also has parcel taxes that support local services and excellent schools."
  },
  {
    question: "What is the commute like from Los Gatos to Silicon Valley companies?",
    answer: "Los Gatos offers relatively easy access to major Silicon Valley employers. Commute times vary: San Jose (15-25 minutes), Cupertino/Apple (20-25 minutes), Mountain View/Google (25-35 minutes), and Palo Alto (30-40 minutes) depending on traffic and exact location. Highway 17 provides access over the hill to Santa Cruz (30-40 minutes). Many Los Gatos residents work remotely or have flexible schedules, taking advantage of the town's quality of life. The rise of remote work has made Los Gatos increasingly attractive to tech workers."
  },
  {
    question: "Are there HOA fees in Los Gatos homes?",
    answer: "Many single-family homes in Los Gatos have no HOA fees, particularly older properties and hillside estates. Townhomes and condos typically have HOA fees ranging from $400-$800 per month, covering exterior maintenance, landscaping, common areas, insurance, and sometimes utilities. Some planned communities like Belgatos have modest HOA fees ($100-$300/month) covering common areas and amenities. Always review HOA documents, reserve funds, and any pending special assessments before purchasing. Lower HOA fees are one advantage of Los Gatos compared to newer Silicon Valley developments."
  },
  {
    question: "What are the wildfire risks in Los Gatos?",
    answer: "Parts of Los Gatos, particularly hillside areas, are designated as high or very high fire hazard severity zones. Homeowners should maintain defensible space, use fire-resistant landscaping and materials, and carry adequate insurance. The town has strong emergency preparedness programs and evacuation plans. Many hillside properties have been updated with fire-resistant roofing and ember-resistant vents. Despite the risks, most residents find the benefits of hillside living worthwhile when properly prepared. Insurance costs are higher in fire zones, so factor this into your budget."
  },
  {
    question: "Can you negotiate home prices in Los Gatos?",
    answer: "Negotiation possibilities in Los Gatos depend on market conditions, property condition, and days on market. In competitive periods, well-priced homes in desirable neighborhoods often receive multiple offers at or above asking. However, you can sometimes negotiate on: homes listed over 30 days, properties requiring updates or repairs, homes with unique features limiting buyer pool, or during slower winter months. Even in competitive situations, negotiating on inspection issues, closing timeline, or included items can add value. An experienced local agent's market knowledge is crucial for successful negotiations."
  },
  {
    question: "What is the investment potential of Los Gatos real estate?",
    answer: "Los Gatos has demonstrated strong long-term appreciation due to limited inventory, excellent schools, desirable location, and consistent demand from affluent buyers. The town's strict hillside development regulations, environmental protections, and geographic constraints limit new construction, supporting property values. While short-term fluctuations occur with tech market cycles, Los Gatos' quality of life attracts stable, high-income residents. Properties near downtown and in top school attendance areas tend to appreciate most consistently. The combination of scarcity, schools, and lifestyle amenities makes Los Gatos a solid long-term real estate investment."
  },
  {
    question: "What should I know about buying a hillside home in Los Gatos?",
    answer: "Hillside homes in Los Gatos require special due diligence. Key considerations include: foundation and soil stability (hire a geotechnical engineer), drainage systems and water intrusion risk, septic systems vs. sewer connection, road access and maintenance, fire insurance availability and cost, defensible space requirements, and tree ordinances. Many hillside properties have stunning views, privacy, and natural beauty, but come with higher maintenance costs and insurance. Work with agents and inspectors experienced with hillside properties to understand the unique challenges and maintenance requirements."
  },
  {
    question: "How competitive is the Los Gatos housing market?",
    answer: "The Los Gatos housing market is highly competitive, especially for well-priced homes in desirable neighborhoods and top school areas. Properties often sell quickly with multiple offers, particularly in the $2-4M range popular with tech families. Buyers typically need: strong pre-approval letters, ability to compete on price, minimal contingencies, and quick decision-making. Luxury properties over $5M may have more negotiating room. The market is less frenetic than Palo Alto but more competitive than surrounding communities due to limited inventory. Working with an experienced local agent who knows the market is essential."
  },
  {
    question: "What makes Los Gatos different from other Silicon Valley towns?",
    answer: "Los Gatos stands out for its small-town atmosphere combined with sophistication and natural beauty. Unlike denser Silicon Valley towns, Los Gatos has preserved its historic character, limits commercial development, and maintains extensive open space. The downtown's charm, exceptional restaurants, hiking trail access, and strong community identity create a lifestyle different from typical suburban tech hubs. Residents describe a genuine sense of community with local events, farmers markets, and neighborhood connections. The mountain setting provides a retreat-like quality while maintaining proximity to major employers."
  },
  {
    question: "What are the hidden costs of buying a home in Los Gatos?",
    answer: "Beyond the purchase price, Los Gatos buyers should budget for: closing costs (2-3% of purchase price), property transfer tax ($1.10 per $1,000 in Santa Clara County), title insurance, inspection fees including potential geotechnical reports ($500-$2,000), HOA fees for townhomes/condos, higher insurance costs especially in fire zones, ongoing landscape maintenance for larger lots, potential septic system maintenance for hillside properties, and tree care (Los Gatos has a tree ordinance). Hillside properties may require retaining wall maintenance, drainage system upkeep, and higher utility costs."
  },
  {
    question: "How do I choose the right real estate agent in Los Gatos?",
    answer: "Choose a Los Gatos agent based on: deep local knowledge (they should know neighborhoods, schools, and property values intimately), experience with your property type (hillside homes require different expertise than downtown condos), strong negotiation skills in competitive markets, references from recent clients, and understanding of disclosure requirements for hillside properties. Interview 2-3 agents before deciding. Look for someone who asks about your lifestyle needs and can guide you through Los Gatos' unique market dynamics. In this competitive market, an experienced local agent's insights on neighborhoods, pricing, and strategy are invaluable."
  }
];

export function LosGatosFAQ() {
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
        title="Los Gatos Real Estate FAQ | Home Buying Guide 2025"
        description="Expert answers to common Los Gatos home buying questions. Learn about prices, neighborhoods, and more from a Bay Area realtor with 15+ years experience."
        canonical="https://cascaderealtors.com/los-gatos"
        city="Los Gatos"
        coordinates={{ lat: 37.2358, lng: -121.9624 }}
      />
      <FAQHeader />
      <FAQHero
        title="Los Gatos Real Estate FAQ"
        description="Everything you need to know about buying a home in Los Gatos. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="los-gatos" />

      <Footer />
    </div>
  );
}
