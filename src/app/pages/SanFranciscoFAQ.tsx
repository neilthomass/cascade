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
    question: "What is the average home price in San Francisco?",
    answer: <>The median home price in San Francisco is approximately $1.35 million as of 2024. However, prices vary dramatically by neighborhood—from around $800,000 for condos in outer neighborhoods to $5 million or more for single-family homes in Pacific Heights, Noe Valley, or Sea Cliff. The market has seen fluctuations with tech industry cycles, but long-term appreciation remains strong due to limited land and strict zoning. For a personalized analysis of current pricing in your target neighborhoods, <Link to="/contact" className="text-blue-600 hover:underline">connect with our team</Link> for up-to-date market insights.</>
  },
  {
    question: "Is San Francisco a good place to buy a home in 2025?",
    answer: <>San Francisco offers unique value for buyers in 2025. While prices have moderated from 2022 peaks, the city's limited housing supply, world-class amenities, and recovering tech sector support long-term appreciation. Key factors to consider include your timeline (5+ year holds typically perform well), neighborhood selection (some areas are appreciating faster than others), and the type of property (single-family homes have outperformed condos recently). The agents at Cascade California Realty can help you <Link to="/contact" className="text-blue-600 hover:underline">identify the right opportunities</Link> based on your specific goals.</>
  },
  {
    question: "What are the best neighborhoods in San Francisco for families?",
    answer: <>Top family-friendly neighborhoods include Noe Valley (excellent schools, stroller-friendly streets), Glen Park (quieter village feel, BART access), West Portal (tight-knit community, good public schools), and Forest Hill (larger homes, safe streets). The Sunset and Richmond districts offer more affordable single-family homes with good schools, though they experience more fog. Each neighborhood has distinct character, so visiting multiple times before buying is essential. <Link to="/contact" className="text-blue-600 hover:underline">Let us arrange personalized neighborhood tours</Link> to help you find the perfect fit for your family.</>
  },
  {
    question: "How much do I need to earn to buy a house in San Francisco?",
    answer: <>To comfortably afford a median-priced home in San Francisco ($1.35M), you typically need a household income of $300,000-$400,000, assuming a 20% down payment and following the 28% debt-to-income guideline. First-time buyers often start with condos or TICs (Tenancy in Common) which have lower price points. Down payment assistance programs and ADU (Accessory Dwelling Unit) rental income can also help qualify for more home. Our team at Cascade California Realty works closely with trusted lenders who can help you <Link to="/contact" className="text-blue-600 hover:underline">explore your financing options</Link>.</>
  },
  {
    question: "What is the difference between a condo and a TIC in San Francisco?",
    answer: <>In San Francisco, condos are individually owned units with separate deeds, while TICs (Tenancy in Common) involve shared ownership of the entire building with an agreement specifying which unit each owner occupies. TICs are typically 10-20% cheaper than comparable condos but have financing challenges (fewer lenders, higher rates) and require group decision-making. Many TICs can convert to condos through the city's lottery system, potentially adding significant value. Understanding these nuances is crucial—<Link to="/contact" className="text-blue-600 hover:underline">reach out to discuss</Link> which option makes the most sense for your situation.</>
  },
  {
    question: "What are the property taxes in San Francisco?",
    answer: <>San Francisco property taxes are approximately 1.18% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price, so a home bought for $1.5M would have annual taxes around $17,700. Want to understand the full cost of ownership? <Link to="/contact" className="text-blue-600 hover:underline">We can walk you through the numbers</Link>.</>
  },
  {
    question: "Should I buy a house or rent in San Francisco?",
    answer: <>The buy vs. rent decision in San Francisco depends on your timeline and financial situation. Generally, buying makes sense if you plan to stay 5+ years, can afford the down payment without depleting emergency funds, and value building equity. San Francisco's strong rent control laws make renting attractive for flexibility, but rents still average $3,500+ for a 1-bedroom. Long-term, owners benefit from Prop 13 tax protection and forced savings through equity buildup. If you're weighing your options, <Link to="/contact" className="text-blue-600 hover:underline">schedule a free consultation</Link> with Cascade California Realty to discuss your unique situation.</>
  },
  {
    question: "What is the home buying process in San Francisco?",
    answer: <>The San Francisco home buying process typically takes 30-45 days from accepted offer to closing. Key steps include: 1) Get pre-approved for a mortgage, 2) Work with a local real estate agent who knows SF's unique market, 3) Tour properties and understand disclosure packages, 4) Make competitive offers (often over asking in hot markets), 5) Complete inspections and contingency removals, 6) Final loan approval and closing. San Francisco's competitive market often requires quick decisions and strong offers. At Cascade California Realty, we guide clients through each step—<Link to="/contact" className="text-blue-600 hover:underline">get in touch to start your journey</Link>.</>
  },
  {
    question: "What are the hidden costs of buying a home in San Francisco?",
    answer: <>Beyond the purchase price, San Francisco buyers should budget for: closing costs (2-3% of purchase price), property transfer tax (varies by price, roughly $7,500 per $1M), title insurance, inspection fees ($500-$1,500), HOA fees for condos ($400-$1,000+/month), earthquake insurance (not included in standard policies), and potential seismic retrofitting. Older homes may need foundation work, and many buildings require expensive updates to comply with soft-story retrofit requirements. Our team helps buyers <Link to="/contact" className="text-blue-600 hover:underline">understand and plan for these costs</Link> before making an offer.</>
  },
  {
    question: "Is earthquake insurance required in San Francisco?",
    answer: <>Earthquake insurance is not legally required in San Francisco, but it's highly recommended given the seismic risk. Standard homeowner's insurance does NOT cover earthquake damage. The California Earthquake Authority (CEA) offers policies through participating insurers, typically costing $2,000-$5,000 annually for a $1M home with a 15% deductible. Many owners self-insure for smaller quakes but carry policies for catastrophic events. Newer construction and retrofitted buildings have lower premiums. <Link to="/contact" className="text-blue-600 hover:underline">Ask us about insurance considerations</Link> when evaluating properties.</>
  },
  {
    question: "What should I look for when buying a Victorian home in San Francisco?",
    answer: <>San Francisco's iconic Victorians require careful evaluation. Key concerns include: foundation condition (many need seismic upgrades or have settling issues), electrical systems (knob-and-tube wiring needs replacement), plumbing (galvanized pipes corrode), lead paint and asbestos (common in pre-1978 homes), and dry rot. Get specialized inspections for foundation, sewer lateral, and pest. Budget 1-3% of home value annually for maintenance. The charm is worth it for many buyers, but understand the commitment. Our agents have extensive experience with historic properties—<Link to="/contact" className="text-blue-600 hover:underline">let us help you find a well-maintained gem</Link>.</>
  },
  {
    question: "What are San Francisco's best neighborhoods for first-time buyers?",
    answer: <>First-time buyers in San Francisco often find value in: Outer Sunset and Outer Richmond (more affordable single-family homes), Excelsior and Portola (working-class neighborhoods with appreciation potential), Visitacion Valley and Bayview (gentrifying areas with lower entry points), and condos in SOMA, Mission Bay, or Dogpatch. TICs throughout the city offer another entry point. Consider proximity to BART/Muni, as many first-time buyers rely on public transit. <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link> to discover emerging opportunities in these neighborhoods.</>
  },
  {
    question: "How competitive is the San Francisco housing market?",
    answer: <>San Francisco's market competitiveness varies by price point and neighborhood. Entry-level homes and desirable family neighborhoods often see multiple offers and sell over asking price. Luxury properties and condos in certain areas may have more negotiating room. Successful buyers typically: get fully pre-approved (not just pre-qualified), write clean offers with minimal contingencies, include personal letters to sellers, and act quickly when the right property appears. Working with an experienced local agent is essential. The Cascade California Realty team knows how to <Link to="/contact" className="text-blue-600 hover:underline">position you for success</Link> in competitive situations.</>
  },
  {
    question: "What is the best time of year to buy a home in San Francisco?",
    answer: <>San Francisco's housing market is active year-round, but patterns emerge. Spring (March-May) has the most inventory but also the most competition. Summer sees continued activity, often with families wanting to move before school. Fall can offer opportunities as some sellers become motivated. Winter typically has less inventory but also less competition, and motivated sellers may accept lower offers. The best time depends more on your personal readiness than seasonal timing. <Link to="/contact" className="text-blue-600 hover:underline">Talk to our team</Link> about current market conditions and timing strategies.</>
  },
  {
    question: "Can I negotiate the price on a San Francisco home?",
    answer: <>Negotiation possibilities depend on market conditions, property condition, and seller motivation. In hot markets, many homes sell at or above asking with multiple offers. However, you can often negotiate on: homes with longer days on market (30+ days), properties with condition issues discovered in inspections, estate sales or motivated sellers, and during slower seasons. Even in competitive situations, negotiating on closing timeline or included items can add value. Your agent's negotiation skills matter significantly—and that's where having Cascade California Realty in your corner <Link to="/contact" className="text-blue-600 hover:underline">makes a real difference</Link>.</>
  },
  {
    question: "What are the HOA fees like in San Francisco condos?",
    answer: <>San Francisco condo HOA fees typically range from $400-$1,200 per month depending on building size, amenities, and age. Fees cover building insurance, common area maintenance, water/garbage, and reserve funds. Red flags include: unusually low fees (may indicate deferred maintenance), large special assessments in history, or underfunded reserves. Request HOA financial documents and meeting minutes before purchasing. High-rise buildings with doormen and amenities have the highest fees. We always review HOA financials with our clients—<Link to="/contact" className="text-blue-600 hover:underline">reach out to learn what to look for</Link>.</>
  },
  {
    question: "What is the commute like from different San Francisco neighborhoods?",
    answer: <>Commute times vary significantly by neighborhood and destination. Downtown workers benefit from: SOMA/Financial District (walk), Mission/Castro (15-20 min Muni), Sunset/Richmond (30-40 min Muni/bus). For South Bay tech commuters, Glen Park and Outer Mission offer 101 access, while Daly City border areas provide BART. Peninsula commuters often choose Potrero Hill or Dogpatch. Remote work has made neighborhoods like Outer Sunset more attractive as daily commutes become less frequent. <Link to="/contact" className="text-blue-600 hover:underline">Share your commute needs</Link> and we'll suggest neighborhoods that fit your lifestyle.</>
  },
  {
    question: "Are there any first-time homebuyer programs in San Francisco?",
    answer: <>San Francisco offers several first-time buyer assistance programs. MOHCD's Below Market Rate (BMR) program offers affordable units through lottery. DALP (Down Payment Assistance Loan Program) provides up to $500,000 in silent second loans for qualifying buyers. CalHFA offers state-level down payment assistance. Federal programs include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with 3% down. Income limits apply to most programs. Check current availability as funding fluctuates. The Cascade California Realty team can help you <Link to="/contact" className="text-blue-600 hover:underline">navigate these programs</Link> and connect with lenders who specialize in them.</>
  },
  {
    question: "What questions should I ask when buying a home in San Francisco?",
    answer: <>Essential questions for San Francisco home purchases include: 1) What is the foundation type and has it been retrofitted? 2) When was the roof last replaced? 3) What is the sewer lateral condition? 4) Are there any permits pulled for past work? 5) What's the rental history if it's a multi-unit? 6) What are the HOA reserves and any pending special assessments? 7) Has there been any water damage or mold? 8) What's included in the sale? 9) Why is the seller moving? Your agent should help investigate each thoroughly. At Cascade California Realty, we dig deep on due diligence—<Link to="/contact" className="text-blue-600 hover:underline">let us protect your investment</Link>.</>
  },
  {
    question: "How do I choose the right real estate agent in San Francisco?",
    answer: <>Choose a San Francisco agent based on: local expertise (they should know specific neighborhoods intimately), transaction volume (10+ deals per year shows active involvement), communication style (matches your preferences), references from past clients, and negotiation track record. Interview 2-3 agents before deciding. Look for someone who asks questions about your needs rather than just pitching themselves. In San Francisco's complex market, an experienced agent's guidance on disclosures, negotiations, and timing is invaluable. We'd love to earn your trust—<Link to="/contact" className="text-blue-600 hover:underline">schedule a no-pressure conversation</Link> with Cascade California Realty to see if we're the right fit.</>
  }
];

export function SanFranciscoFAQ() {
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
        title="Best Realtor in San Francisco | Manoj Thomas - Top San Francisco Real Estate Agent 2025"
        description="Looking for the best realtor in San Francisco? Manoj Thomas is the #1 rated San Francisco real estate agent with 15+ years experience, $1B+ sales. Expert in San Francisco homes and neighborhoods."
        canonical="https://cascaderealtors.com/san-francisco"
        city="San Francisco"
        county="San Francisco County"
        coordinates={{ lat: 37.7749, lng: -122.4194 }}
      />
      <FAQHeader />
      <FAQHero
        title="San Francisco Real Estate FAQ"
        description="Everything you need to know about buying a home in San Francisco. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="sfo" />

      <Footer />
    </div>
  );
}
