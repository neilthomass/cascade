import { ChevronDown, Phone, Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { FAQHeader } from '../components/FAQHeader';
import { FAQHero } from '../components/FAQHero';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
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
      const response = await fetch('https://cascaderealtors.com/api/contact', {
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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your San Mateo County Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows San Mateo County inside and out.
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
              placeholder="Tell us about your San Mateo County home buying needs"
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
    question: "What is the average home price in San Mateo County?",
    answer: <>The median home price in San Mateo County is approximately $1.7-$1.9 million as of 2024, making it one of the most expensive counties in California. Affluent areas like Atherton (median $7M+), Hillsborough ($4M+), and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> ($2.5M+) command premium prices. More accessible cities include <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link> ($1.2M), South San Francisco ($1.3M), and <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link> ($1.5M). The county's Peninsula location between San Francisco and Silicon Valley drives consistent demand. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for current market analysis.</>
  },
  {
    question: "What cities are in San Mateo County?",
    answer: <>San Mateo County, commonly known as "The Peninsula," includes 20 cities and towns: <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link>, South San Francisco, <Link to="/san-bruno" className="text-blue-600 hover:underline">San Bruno</Link>, Millbrae, <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link>, <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link>, <Link to="/belmont" className="text-blue-600 hover:underline">Belmont</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>, <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link>, <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link>, Atherton, Hillsborough, Woodside, Portola Valley, Half Moon Bay, Pacifica, Brisbane, Colma, and East Palo Alto. Each offers distinct character, from coastal Half Moon Bay to elite Atherton.</>
  },
  {
    question: "Why is San Mateo County a good place to buy a home?",
    answer: "San Mateo County offers an ideal Peninsula lifestyle with easy access to both San Francisco and Silicon Valley. The county features excellent schools (several districts rank among California's best), diverse communities, spectacular coastal access, and proximity to SFO airport. Major employers include Meta, Oracle, YouTube (Google), and biotech companies in South San Francisco. The Mediterranean climate, outdoor recreation (hiking, beaches, golf), and vibrant downtown areas in cities like Burlingame and San Carlos enhance quality of life. Limited housing supply supports strong property values."
  },
  {
    question: "What are the best cities in San Mateo County for families?",
    answer: <>Top family cities include <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link> (excellent schools, charming downtown, safe neighborhoods), <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link> (walkable Broadway district, top schools), <Link to="/belmont" className="text-blue-600 hover:underline">Belmont</Link> (quiet hills, good schools), <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link> (planned community, lagoons, great for families), and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> (near Stanford, excellent schools). Hillsborough and Woodside offer luxury estates with top-tier schools for those seeking larger properties. Each provides excellent schools, low crime, and family amenities at different price points.</>
  },
  {
    question: "How competitive is the San Mateo County housing market?",
    answer: <>San Mateo County's market is highly competitive due to limited inventory and strong demand from Peninsula and Silicon Valley workers. Desirable cities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>, and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> regularly see multiple offers with 5-15% over asking. Success requires full pre-approval, competitive offers, and quick decision-making. The county's geographic constraints (ocean to the west, bay to the east) limit new development, maintaining pressure on existing inventory. An experienced local agent is essential for navigating bidding situations.</>
  },
  {
    question: "What are San Mateo County's best school districts?",
    answer: <>San Mateo County features several top-performing districts. Hillsborough City School District consistently ranks among California's best. Other excellent districts include San Carlos, Burlingame, Menlo Park City, and Las Lomitas (Atherton/Menlo Park). Woodside, Portola Valley, and Los Lomitas Elementary districts serve affluent communities with exceptional results. Top high schools include Burlingame High, Carlmont (Belmont), and Menlo-Atherton. Private options include Sacred Heart Prep, Menlo School, and Nueva School. School quality significantly impacts home values, with top districts commanding 15-25% premiums.</>
  },
  {
    question: "What is the commute like from San Mateo County?",
    answer: <>San Mateo County's central Peninsula location provides excellent connectivity. Caltrain offers fast service to San Francisco (25-40 min) and San Jose (30-45 min). BART connects <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link>, South San Francisco, <Link to="/san-bruno" className="text-blue-600 hover:underline">San Bruno</Link>, and Millbrae to SF and the East Bay. SamTrans buses serve local routes. Highway 101 runs north-south, while I-280 offers a scenic alternative. SFO airport is centrally located. Tech shuttles serve major employers. Commute times: to SF 20-45 min, to Silicon Valley 20-40 min depending on location. Hybrid work has expanded location flexibility for many professionals.</>
  },
  {
    question: "What are first-time buyer options in San Mateo County?",
    answer: <>First-time buyers find the most accessible options in <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link>, South San Francisco, and Pacifica (single-family homes $1.1M-$1.4M). Condos and townhomes throughout the county start around $700K-$1M. <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link> and <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link> offer condo options near transit. Down payment assistance programs, FHA loans, and tech company housing benefits help qualified buyers. Consider coastal communities like Half Moon Bay and Pacifica for better value, though commutes may be longer. Starting with a condo in a desirable area often makes more sense than stretching for a house in a distant location.</>
  },
  {
    question: "Is San Mateo County real estate a good investment?",
    answer: "San Mateo County real estate has historically delivered strong appreciation due to its Peninsula location between SF and Silicon Valley. Limited developable land (coastal mountains, bay, existing development) constrains supply while demand from tech workers remains robust. The county benefits from multiple employment centers (SF, South SF biotech, Silicon Valley tech), diversifying economic risk. Long-term appreciation has averaged 5-7% annually, with higher rates in desirable cities. Best for buyers planning 5+ year holds who value the Peninsula lifestyle and can weather market cycles."
  },
  {
    question: "What are property taxes in San Mateo County?",
    answer: "San Mateo County property taxes average approximately 1.1-1.2% of assessed value annually, based on California's Proposition 13 (1% base rate plus local bonds and assessments). A $1.8M home would pay roughly $19,800-$21,600 annually. Prop 13 limits annual increases to 2%, providing long-term predictability. The county charges a transfer tax of $1.10 per $1,000 of sale price (some cities add local transfer taxes). Newer developments may have Mello-Roos assessments. Parcel taxes for schools are common in many districts. Factor total tax obligations when comparing properties."
  },
  {
    question: "How do I find the best realtor in San Mateo County?",
    answer: <>Finding the best San Mateo County realtor requires evaluating Peninsula-specific expertise. The county's diverse cities—from coastal Pacifica to elite Atherton—demand specialized knowledge. Look for agents with strong transaction history in your target cities, understanding of the Peninsula commute and lifestyle factors, and experience with the area's competitive bidding environment. Tech industry familiarity is valuable given the client base. Interview multiple agents, verify references, and assess their negotiation skills. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for expert Peninsula guidance.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in San Mateo County?",
    answer: <>Manoj Thomas brings 15+ years of Peninsula expertise, over $1 billion in career sales, and 415+ successful transactions to San Mateo County clients. His deep knowledge spans from <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link> to <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link>, with particular expertise in family-friendly cities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>, and <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link>. His understanding of tech industry clients, Peninsula lifestyle priorities, and the county's competitive dynamics positions him to deliver exceptional results. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> to experience the difference.</>
  },
  {
    question: "What are the hidden costs of buying in San Mateo County?",
    answer: "Beyond purchase price, San Mateo County buyers should budget for: closing costs (2-3%), transfer taxes (county + some cities charge additional), title insurance, inspections ($500-$1,500), and immediate updates. Ongoing costs include property taxes (1.1-1.2%), homeowners insurance ($1,500-$5,000/year), earthquake insurance (recommended, $2,000-$5,000/year), and HOA fees for condos/townhomes ($400-$1,200/month). School parcel taxes add $200-$800 annually in most districts. Coastal properties may have additional considerations (erosion, access). Budget 1-2% of home value annually for maintenance."
  },
  {
    question: "What types of homes are available in San Mateo County?",
    answer: <>San Mateo County offers diverse housing. Mid-century homes predominate in <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link>, <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, and <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>. <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link> features 1960s-70s planned development with lagoons. Grand estates characterize Hillsborough, Atherton, and Woodside. Coastal communities like Half Moon Bay offer beach access. Modern condos and townhomes are found throughout, especially near transit. <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link> has seen significant new development downtown. Historic Victorians exist in select neighborhoods. Each property type suits different lifestyles and budgets.</>
  },
  {
    question: "What makes the Peninsula lifestyle special?",
    answer: <>The Peninsula (San Mateo County) offers a unique blend of urban access and natural beauty. Residents enjoy easy commutes to both San Francisco and Silicon Valley while living in charming communities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link> and <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>. Weekend activities include hiking in the coastal hills, beach trips to Half Moon Bay, wine tasting in the foothills, and world-class dining. The Mediterranean climate provides comfortable year-round weather. Strong schools, safe neighborhoods, and diverse communities make it ideal for families. SFO airport access facilitates travel. The Peninsula balances suburban tranquility with urban convenience.</>
  }
];

export function SanMateoCountyFAQ() {
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
        title="Best Realtor in San Mateo County | Manoj Thomas - Top San Mateo County Real Estate Agent 2025"
        description="Looking for the best realtor in San Mateo County? Manoj Thomas is the #1 rated San Mateo County real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for Burlingame, San Carlos, Menlo Park, Redwood City, and all Peninsula cities."
        canonical="https://cascaderealtors.com/san-mateo-county"
        city="San Mateo County"
        county="San Mateo County"
        coordinates={{ lat: 37.4969, lng: -122.3331 }}
      />
      <FAQHeader />
      <FAQHero
        title="San Mateo County Real Estate FAQ"
        description="Everything you need to know about buying a home on the Peninsula. Expert answers from a top-rated real estate professional with 15+ years of San Mateo County experience."
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

      <Footer />
    </div>
  );
}
