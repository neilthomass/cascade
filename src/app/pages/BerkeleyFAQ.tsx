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
    question: "What is the average home price in Berkeley?",
    answer: "The median home price in Berkeley is approximately $1.4 million as of 2024. However, prices vary significantly by neighborhood—from around $800,000 in South Berkeley to well over $2 million in the Berkeley Hills and Claremont areas. The city's proximity to UC Berkeley, excellent schools, and vibrant culture keep property values strong despite market fluctuations."
  },
  {
    question: "How does UC Berkeley affect the housing market?",
    answer: "UC Berkeley has a profound impact on the local housing market. The university creates steady demand for rental properties, making multi-unit properties attractive investments. Areas near campus see higher rental yields but also more competition. The university's reputation attracts faculty, researchers, and educated professionals who value Berkeley's intellectual culture, supporting strong long-term appreciation. Student housing demand also creates opportunities for accessory dwelling units (ADUs)."
  },
  {
    question: "Is Berkeley a good place to invest in real estate?",
    answer: "Berkeley offers compelling investment potential for several reasons: limited housing supply due to strict zoning and geography (hills limit development), strong rental demand from UC Berkeley students and employees, educated and stable tenant pool, progressive rent control laws that protect tenant occupancy, and proximity to San Francisco and Silicon Valley job markets. However, investors should understand Berkeley's tenant-friendly regulations and factor in potentially longer hold periods for maximum appreciation."
  },
  {
    question: "What are the best neighborhoods in Berkeley for families?",
    answer: "Top family-friendly Berkeley neighborhoods include Rockridge (excellent schools, shopping on College Avenue, BART access), Claremont (large homes, top-rated schools, proximity to trails), North Berkeley (walkable village, strong community, good schools), and Thousand Oaks (quiet streets, parks, mid-century homes). The Berkeley Hills offer larger lots and views but require cars for daily errands. Berkeley Unified School District is highly regarded, though quality varies by specific school."
  },
  {
    question: "What is Berkeley's culture and community like?",
    answer: "Berkeley is known for its progressive politics, environmental consciousness, and intellectual culture. The city has a rich history of activism and free speech dating to the 1960s. You'll find diverse communities, from university professors to artists to tech workers. The city values sustainability (extensive bike lanes, zero waste initiatives), supports local businesses, and has active neighborhood associations. Political engagement is high, and residents take civic participation seriously. This progressive culture isn't for everyone, but those who align with these values find it deeply satisfying."
  },
  {
    question: "How is Berkeley's dining and food scene?",
    answer: "Berkeley's dining scene is exceptional and diverse. The city is considered the birthplace of California cuisine (Chez Panisse), with farm-to-table dining, international cuisines (especially Asian, Mediterranean, and Mexican), numerous coffee roasters and cafes, and the famous Berkeley Bowl grocery stores with extensive produce selections. The Gourmet Ghetto in North Berkeley, Fourth Street shopping district, and Telegraph Avenue offer concentrated dining options. Food quality and ingredient sourcing are taken seriously, with many organic and locally-sourced options."
  },
  {
    question: "What are Berkeley's property taxes?",
    answer: "Berkeley property taxes are approximately 1.25-1.35% of assessed value annually, slightly higher than some Bay Area cities due to local bonds and assessments. Thanks to Proposition 13, your assessed value can only increase by a maximum of 2% per year, making long-term ownership advantageous. New buyers are assessed at purchase price, so a home bought for $1.4M would have annual taxes around $17,500-$18,900. Some neighborhoods have additional assessments for infrastructure improvements."
  },
  {
    question: "How competitive is Berkeley's housing market?",
    answer: "Berkeley's housing market remains competitive due to extremely limited inventory. Single-family homes in desirable neighborhoods often receive multiple offers and sell at or above asking price. The city's restrictive zoning and geographic constraints (hills, bay) limit new construction. Successful buyers typically need strong financing, quick decision-making, and willingness to compete. However, the market has more breathing room than peak years, with some properties sitting longer if overpriced. Working with a local agent who knows Berkeley's micro-markets is essential."
  },
  {
    question: "What is the supply situation for housing in Berkeley?",
    answer: "Berkeley faces a severe housing shortage due to multiple factors: geographic constraints (hills and bay limit developable land), restrictive zoning (much of the city is zoned for single-family only), neighborhood opposition to development, historic preservation requirements, and slow permit processes. This limited supply keeps prices high and inventory low. While the city is trying to encourage ADUs and some multi-family development near transit, significant supply increases are unlikely. This scarcity supports long-term value but makes finding the right home more challenging."
  },
  {
    question: "What are the Berkeley Unified School District schools like?",
    answer: "Berkeley Unified School District (BUSD) serves all of Berkeley with a diverse range of schools. Top-performing schools include Berkeley High (comprehensive with strong AP programs), Willard Middle School, and several elementary schools like Cragmont, Malcolm X, and Oxford. The district values diversity and uses a controlled choice enrollment system rather than strict neighborhood assignment. Schools vary in test scores and programs, so researching specific schools is important. Many families also choose private schools like Crowden, The Athenian School, or Prospect Sierra for alternative approaches."
  },
  {
    question: "How much do I need to earn to buy a house in Berkeley?",
    answer: "To comfortably afford Berkeley's median home price of $1.4 million, you typically need a household income of $315,000-$420,000, assuming a 20% down payment and following the 28% debt-to-income guideline. First-time buyers often start with condos, smaller homes in South Berkeley, or consider multi-unit properties where rental income helps qualify. Some buyers stretch affordability by relying on dual tech incomes, stock compensation, or family assistance for down payments. Remember to budget for higher property taxes and maintenance costs for older homes."
  },
  {
    question: "What are the differences between North Berkeley and South Berkeley?",
    answer: "North Berkeley (above University Avenue) tends to have higher home prices, more established neighborhoods, proximity to Gourmet Ghetto dining, and access to top-performing schools. South Berkeley (below University) offers more affordable entry points, more diverse communities, proximity to Ashby BART, and increasing development and investment. South Berkeley has seen significant gentrification and appreciation in recent years. Both areas have distinct character—North Berkeley is more leafy and residential, while South Berkeley is more urban and diverse."
  },
  {
    question: "What is the commute like from Berkeley?",
    answer: "Berkeley offers excellent transit access for Bay Area commuters. BART provides direct service to San Francisco (30-40 minutes) and East Bay employment centers. AC Transit buses connect to Oakland and other East Bay cities. For South Bay/Silicon Valley commutes, expect 45-90 minutes via BART to Millbrae/SFO then Caltrain, or driving via I-880. Remote work has made Berkeley more attractive for those with flexible schedules. Bike commuting is popular for local trips thanks to extensive bike lanes. Traffic on major arteries (University, Shattuck, Telegraph) can be heavy during rush hour."
  },
  {
    question: "Are there first-time homebuyer programs available in Berkeley?",
    answer: "First-time buyers in Berkeley can access several assistance programs. The City of Berkeley occasionally offers down payment assistance programs (check current availability). CalHFA provides state-level down payment assistance and low-interest loans. Federal programs include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with 3-5% down. Some programs have income limits. Berkeley also has inclusionary zoning requiring affordable units in new developments, available through lottery. Given high prices, many first-time buyers start with condos or consider house-hacking multi-unit properties."
  },
  {
    question: "What should I look for when buying an older Berkeley home?",
    answer: "Many Berkeley homes date from the early 1900s and require careful evaluation. Key concerns include: foundation condition (seismic upgrades may be needed), outdated electrical systems, old plumbing (galvanized pipes), earthquake retrofitting status, pest damage (termites and dry rot in older wood structures), roof condition, and asbestos/lead paint in pre-1978 homes. Berkeley has seismic safety requirements for unreinforced masonry and soft-story buildings. Budget 1-2% of home value annually for maintenance. Get comprehensive inspections including foundation, pest, roof, and sewer lateral. The character and location often justify the maintenance costs."
  },
  {
    question: "What is the Berkeley Hills area like?",
    answer: "The Berkeley Hills offer stunning views, larger lots, more privacy, and premium pricing (often $2M+). Homes range from mid-century modern to contemporary estates. Benefits include proximity to hiking trails (Tilden Park), cooler temperatures, and often better air quality. Downsides include steep streets (some challenging in winter), limited walkability to retail/dining, higher fire risk (managed through vegetation management and building codes), and car-dependency. Many hills properties have environmental constraints affecting expansions. These areas attract buyers prioritizing space, views, and nature over walkable urban amenities."
  },
  {
    question: "How does Berkeley's rent control affect property investment?",
    answer: "Berkeley has strong rent control ordinances limiting annual rent increases (typically 2-3% per year) for buildings built before 1980. This protects tenant stability but affects investor returns. However, once a unit becomes vacant, landlords can raise rent to market rate (vacancy decontrol). Multi-unit properties still generate good returns due to high absolute rents and strong demand, but require longer hold periods. Properties built after 1995 are exempt from rent control. Investors should understand the Rent Stabilization Board regulations, just cause eviction requirements, and factor in lower turnover when analyzing potential investments."
  },
  {
    question: "What makes Rockridge a desirable Berkeley neighborhood?",
    answer: "Rockridge (technically split between Berkeley and Oakland) is highly desirable for its walkable village atmosphere, College Avenue shopping and dining corridor, BART access for commuters, top-rated schools, beautiful Craftsman and Tudor homes, strong community identity, and tree-lined streets. The neighborhood has excellent cafes, restaurants, and independent shops. Homes typically range from $1.3M to $2.5M+ depending on size and condition. The area attracts young families and professionals who value walkability, transit access, and community engagement. Competition for homes here is fierce, with properties often selling quickly."
  },
  {
    question: "Is earthquake insurance necessary in Berkeley?",
    answer: "While not legally required, earthquake insurance is highly recommended in Berkeley given its location near the Hayward Fault. Standard homeowner's policies do NOT cover earthquake damage. The California Earthquake Authority (CEA) offers policies through participating insurers, typically costing $2,000-$5,000 annually for a $1.4M home with a 10-15% deductible. Many owners self-insure for smaller quakes but want protection against catastrophic events. Retrofitted homes and newer construction have lower premiums. Consider your risk tolerance, financial reserves, and whether you could rebuild without insurance when deciding."
  },
  {
    question: "What questions should I ask when buying a Berkeley home?",
    answer: "Essential questions for Berkeley home purchases include: 1) What is the foundation type and seismic retrofit status? 2) When was the roof, electrical, and plumbing last updated? 3) What school attendance area is this in? 4) Are there any unpermitted additions or work? 5) What's the rental history for multi-unit properties? 6) Are there any deferred maintenance issues? 7) What are the neighbors like? 8) Is the home in a fire hazard zone? 9) What's included in the sale? 10) Has the sewer lateral been inspected/replaced? Berkeley's older housing stock requires thorough due diligence."
  }
];

export function BerkeleyFAQ() {
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
        title="Berkeley Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your Berkeley real estate questions. Learn about home prices, schools, neighborhoods, and buying in Berkeley from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/berkeley-faq"
        city="Berkeley"
        coordinates={{ lat: 37.8716, lng: -122.2727 }}
      />
      <FAQHeader />
      <FAQHero
        title="Berkeley Real Estate FAQ"
        description="Everything you need to know about buying a home in Berkeley. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="berkeley" />

      <Footer />
    </div>
  );
}
