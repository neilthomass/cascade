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
    question: "What is the average home price in Santa Clara?",
    answer: "The median home price in Santa Clara is approximately $1.65 million as of 2025. Prices vary by neighborhood and property type, with single-family homes in established neighborhoods typically ranging from $1.4M to $2.5M+. Condos and townhomes offer more affordable entry points starting around $800,000. Santa Clara's proximity to major tech employers like Intel, NVIDIA, and Apple, combined with excellent schools, supports strong property values and steady appreciation."
  },
  {
    question: "Is Santa Clara a good place for first-time home buyers?",
    answer: "Santa Clara offers excellent opportunities for first-time buyers, especially those working in tech. The city provides more affordable entry points than neighboring Palo Alto or Cupertino while maintaining access to top employers and excellent schools. First-time buyers often start with condos near Santa Clara University or townhomes in newer developments. The city's strong job market, including Intel's headquarters and proximity to other tech giants, provides economic stability that supports homeownership for career professionals starting out."
  },
  {
    question: "How does Santa Clara's location benefit homeowners?",
    answer: "Santa Clara occupies a prime central Silicon Valley location with exceptional connectivity. Residents enjoy easy access to Highway 101, 280, and 880, plus San Jose Mineta Airport just minutes away. Caltrain provides direct service to San Francisco and Peninsula tech campuses. The city is equidistant from San Jose and Mountain View, making commutes manageable to most major Bay Area employers. This central location also means proximity to shopping, dining, and entertainment throughout Silicon Valley."
  },
  {
    question: "What makes Intel and other tech employers important to Santa Clara real estate?",
    answer: "Intel's global headquarters in Santa Clara employs thousands of high-earning professionals, creating strong housing demand and price stability. Beyond Intel, the city hosts NVIDIA, Applied Materials, and numerous other tech companies. This concentration of well-compensated tech workers supports the housing market even during economic downturns. Many buyers work at these companies or nearby Apple, Google, and other tech giants, making Santa Clara's location highly desirable for career growth and home value appreciation."
  },
  {
    question: "What is the Levi's Stadium area like for homebuyers?",
    answer: "The Levi's Stadium district has transformed Santa Clara's profile, bringing world-class sports and entertainment. While the stadium itself is primarily commercial, the surrounding area features newer residential developments, improved infrastructure, and enhanced amenities. Homes near the stadium benefit from excellent freeway access and proximity to Great America. The area attracts buyers who want modern construction, walkability to events, and appreciation potential from ongoing development. Property values in this district have shown strong growth since the stadium opened."
  },
  {
    question: "Is Santa Clara family-friendly? What about schools?",
    answer: "Santa Clara is highly family-friendly with excellent schools through Santa Clara Unified School District. Many schools receive strong ratings, and the district invests in technology education fitting the community's tech-oriented culture. The city offers numerous parks, recreation programs, and family activities. Neighborhoods like Rivermark and Granada Park are particularly popular with families due to good schools, safe streets, and community amenities. The presence of Santa Clara University also enriches the educational and cultural environment."
  },
  {
    question: "What role does Santa Clara University play in the local real estate market?",
    answer: "Santa Clara University brings cultural richness, educational opportunities, and economic stability to the city. The campus employs faculty and staff who often purchase homes locally, and the university attracts students whose families sometimes invest in property. The area around campus features charming neighborhoods with historic homes and tree-lined streets. SCU's presence contributes to the city's strong schools focus and provides community events, athletic programs, and educational resources that enhance quality of life for all residents."
  },
  {
    question: "How does Great America affect Santa Clara real estate?",
    answer: "California's Great America theme park is a major entertainment destination that adds vibrancy to Santa Clara. While residential areas are separated from the park itself, the attraction contributes to the city's appeal for families and provides seasonal employment opportunities. The surrounding area includes newer developments and benefits from excellent freeway access. Great America, combined with Levi's Stadium, positions Santa Clara as an entertainment hub, which attracts buyers seeking an active lifestyle with easy access to attractions."
  },
  {
    question: "What are the property taxes in Santa Clara?",
    answer: "Santa Clara property taxes run approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments. On a median $1.65M home, annual property taxes would be roughly $18,150-$19,800. Thanks to Prop 13, your assessed value increases by a maximum of 2% annually regardless of market appreciation, making long-term ownership advantageous. New buyers are assessed at purchase price, and Santa Clara's taxes are comparable to other Santa Clara County cities."
  },
  {
    question: "What are the best neighborhoods in Santa Clara for families?",
    answer: "Top family neighborhoods include Rivermark (newer homes, excellent schools, parks), Granada Park (established area, tree-lined streets), Old Quad (historic charm near SCU), and Briarwood (quiet streets, good schools). Each offers strong schools, low crime, and family amenities. Rivermark is particularly popular with tech workers due to modern homes and walkability. Granada Park attracts families seeking established neighborhoods with character. Prices vary, with Rivermark commanding premium prices while Old Quad offers more variety in price points."
  },
  {
    question: "How does Santa Clara compare to other Silicon Valley cities for affordability?",
    answer: "Santa Clara offers better value than Palo Alto, Los Altos, or Cupertino while providing similar access to tech jobs and quality schools. With a median price of $1.65M versus $2M+ in neighboring cities, buyers get more space and amenities for their budget. The city provides an excellent entry point to Silicon Valley homeownership without sacrificing location or lifestyle. Compared to San Jose, Santa Clara commands slightly higher prices but offers stronger schools and more cohesive neighborhoods."
  },
  {
    question: "What is the commute like from Santa Clara to major tech employers?",
    answer: "Santa Clara offers excellent commute access to Silicon Valley's major employers. Apple's Cupertino campus is 10-15 minutes away, Google in Mountain View is 15-20 minutes, and Intel's Santa Clara headquarters is within the city. Caltrain provides transit to San Francisco in about 75 minutes. Highway 101, 280, and 880 access means most Peninsula and South Bay locations are reachable within 30 minutes outside rush hour. Many residents bike to work at nearby companies, enhancing quality of life."
  },
  {
    question: "Are there condos and townhomes available in Santa Clara?",
    answer: "Santa Clara has excellent condo and townhome inventory, particularly appealing to first-time buyers and professionals. Prices start around $700,000-$800,000 for condos and $900,000+ for townhomes. Popular complexes include those near Santa Clara University, Rivermark area townhomes, and developments near Levi's Stadium. HOA fees typically range from $350-$600 monthly, covering maintenance, insurance, and amenities. These properties offer affordable entry to homeownership in an expensive market while maintaining access to schools and employers."
  },
  {
    question: "What is the home buying process like in Santa Clara?",
    answer: "Santa Clara's competitive market typically requires strong offers and quick decisions. The process includes: 1) Get pre-approved for a mortgage with substantial down payment (20%+ preferred), 2) Work with an agent who knows Santa Clara's neighborhoods and school boundaries, 3) Act quickly when properties hit the market—many sell within days, 4) Make competitive offers, often over asking in hot markets, 5) Complete inspections and due diligence, 6) Close in 30-45 days. Cash offers and minimal contingencies strengthen your position significantly."
  },
  {
    question: "Should I buy near Intel or other major tech campuses?",
    answer: "Buying near major employers like Intel offers advantages including shorter commutes, walkability or bikeability to work, and strong rental demand if you relocate. However, consider that tech campuses can expand or contract, affecting local traffic and character. Areas near Intel headquarters offer good value and access to amenities. Neighborhoods within 2-3 miles of major employers tend to hold value well, as they're always desirable to the large employee base. Diversification of employers in Santa Clara reduces risk compared to single-company towns."
  },
  {
    question: "What are the hidden costs of buying a home in Santa Clara?",
    answer: "Beyond the purchase price, budget for: closing costs (2-3% of price), property transfer tax, title insurance, inspection fees ($500-$1,500), homeowners insurance ($2,000-$3,500 annually), HOA fees for condos/townhomes ($350-$600+ monthly), and potential repairs or upgrades. Mello-Roos taxes apply in some newer developments, adding $2,000-$5,000 annually. Older homes may need foundation work, electrical upgrades, or HVAC replacement. Many buyers underestimate landscaping and maintenance costs in Silicon Valley's climate."
  },
  {
    question: "Are there any first-time homebuyer programs available in Santa Clara?",
    answer: "First-time buyers can access several programs including CalHFA down payment assistance, conventional loans with 3% down, FHA loans (3.5% down), and VA loans (0% down for veterans). Santa Clara County offers programs through the Housing Authority, though availability varies. The city's Below Market Rate (BMR) program occasionally offers affordable units through lottery. Income limits apply to most programs. Given high prices, many first-time buyers also receive family gifts for down payments, which are permitted with proper documentation."
  },
  {
    question: "What questions should I ask when buying a home in Santa Clara?",
    answer: "Essential questions include: 1) Are there any Mello-Roos or special assessment taxes? 2) What school boundaries does the property fall within? 3) What is the commute time to major employers during peak hours? 4) Has the property had any foundation, plumbing, or electrical work? 5) What are the neighbors like and neighborhood dynamics? 6) Are there any planned developments nearby? 7) What's included in HOA fees (for condos/townhomes)? 8) When were major systems (HVAC, roof, water heater) last replaced? Your agent should help investigate thoroughly."
  },
  {
    question: "How competitive is the Santa Clara housing market?",
    answer: "Santa Clara's housing market is highly competitive, especially for well-priced single-family homes in good school districts. Properties in desirable neighborhoods often receive multiple offers and sell above asking price. Successful buyers typically need: full pre-approval, significant down payment (20%+), flexibility on closing timeline, and willingness to waive some contingencies. Working with an experienced local agent is crucial. The market is slightly less frenzied than Palo Alto but more competitive than San Jose. Off-market deals and coming-soon listings can reduce competition."
  },
  {
    question: "What makes Santa Clara an affordable entry point to Silicon Valley?",
    answer: "Santa Clara offers Silicon Valley's lowest barrier to entry while maintaining proximity to major employers and quality schools. At $1.65M median versus $2M+ in Palo Alto or Los Altos, buyers gain 15-25% more purchasing power. The city's condo and townhome market provides sub-$1M options rare elsewhere in the area. Strong fundamentals—Intel headquarters, Santa Clara University, central location, good schools—support appreciation while current pricing remains accessible. For tech professionals starting families, Santa Clara delivers maximum value in the heart of Silicon Valley."
  }
];

export function SantaClaraFAQ() {
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
        title="Santa Clara Real Estate FAQ | Home Buying Guide 2025"
        description="Expert answers to common Santa Clara home buying questions. Learn about prices, neighborhoods, and more from a Bay Area realtor with 15+ years experience."
        canonical="https://cascaderealtors.com/santa-clara"
        city="Santa Clara"
        coordinates={{ lat: 37.3541, lng: -121.9552 }}
      />
      <FAQHeader />
      <FAQHero
        title="Santa Clara Real Estate FAQ"
        description="Everything you need to know about buying a home in Santa Clara. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="santa-clara" />

      <Footer />
    </div>
  );
}
