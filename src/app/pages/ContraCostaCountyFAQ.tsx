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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Contra Costa County Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows Contra Costa County inside and out.
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
              placeholder="Tell us about your Contra Costa County home buying needs"
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
    question: "What is the average home price in Contra Costa County?",
    answer: <>The median home price in Contra Costa County is approximately $850,000-$950,000 as of 2024, offering significant value compared to other Bay Area counties. Prices vary widely: <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> averages $1.1M, <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> around $1.4M, <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> $1.8M+, while Concord, Pittsburg, and Antioch offer homes under $700K. Lafayette and Orinda command $1.5M-$2.5M. The county provides diverse options from luxury Lamorinda estates to affordable East County homes. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for detailed pricing by area.</>
  },
  {
    question: "What cities are in Contra Costa County?",
    answer: <>Contra Costa County includes 19 cities spanning from the bay to the delta. Major cities include: <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> (vibrant downtown, BART), <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> (Bishop Ranch corporate center), <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> (upscale, charming downtown), <Link to="/concord" className="text-blue-600 hover:underline">Concord</Link> (diverse, affordable), Lafayette, Orinda, Moraga (Lamorinda area), Pleasant Hill, Martinez (county seat), Richmond, Pittsburg, Antioch, Brentwood, Oakley, El Cerrito, and Hercules. The county offers remarkable diversity from urban BART-connected areas to rural delta communities.</>
  },
  {
    question: "Why is Contra Costa County a good place to buy a home?",
    answer: "Contra Costa County offers exceptional value for Bay Area buyers seeking space, quality schools, and suburban lifestyle. The county provides excellent BART access (Walnut Creek, Pleasant Hill, Concord, Richmond lines), top-rated schools in San Ramon Valley and Lamorinda, spectacular natural beauty (Mount Diablo, Iron Horse Trail, delta waterways), and diverse communities. Major employers include Chevron, Kaiser, and Bishop Ranch businesses. The county's varied price points accommodate first-time buyers to luxury estate seekers, all while maintaining Bay Area job access."
  },
  {
    question: "What are the best cities in Contra Costa County for families?",
    answer: <>Top family cities include <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> (excellent San Ramon Valley schools, newer homes, safe neighborhoods), <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> (top schools, charming downtown, family-oriented), <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> (vibrant downtown, good schools, parks), and the Lamorinda communities of Lafayette, Orinda, and Moraga (top-tier schools, community feel). Brentwood and Oakley offer newer, larger homes at more accessible prices for families prioritizing space. Each provides excellent schools, safe neighborhoods, and family activities.</>
  },
  {
    question: "How competitive is the Contra Costa County housing market?",
    answer: <>Market competitiveness varies significantly across Contra Costa County. Premium areas like <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link>, <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link>, and Lamorinda see multiple offers on desirable properties. <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> remains competitive, especially for BART-accessible locations. Central County cities like <Link to="/concord" className="text-blue-600 hover:underline">Concord</Link> and Pleasant Hill offer more balanced conditions. East County (Antioch, Brentwood, Oakley) generally provides more negotiating room. Overall, well-priced homes in good school districts sell quickly throughout the county. Local expertise helps navigate varying dynamics.</>
  },
  {
    question: "What are Contra Costa County's best school districts?",
    answer: <>Contra Costa County features several top-performing districts. San Ramon Valley Unified (serving <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link>, <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link>, Alamo) consistently ranks among California's best with nationally recognized schools like California High and Dougherty Valley High. Lamorinda districts (Lafayette, Orinda, Acalanes Union High) deliver excellent results. <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> and Pleasant Hill schools perform well. Private options include Athenian School and Bentley School. School quality strongly correlates with home prices, with San Ramon Valley and Lamorinda districts commanding significant premiums.</>
  },
  {
    question: "What is the commute like from Contra Costa County?",
    answer: <>Contra Costa County offers multiple commute options. BART serves <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link>, Pleasant Hill, <Link to="/concord" className="text-blue-600 hover:underline">Concord</Link>, and Richmond, providing 35-55 minute rides to SF. Highway 680 connects to Silicon Valley (45-75 min to San Jose depending on location). Highway 24 links through the Caldecott Tunnel to Oakland/Berkeley. From <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> and <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link>, I-680 reaches Silicon Valley; many tech workers commute via corporate shuttles. East County commutes are longest. Bishop Ranch in San Ramon provides local employment. Hybrid work has expanded location flexibility significantly.</>
  },
  {
    question: "What are first-time buyer options in Contra Costa County?",
    answer: <>Contra Costa County offers excellent first-time buyer opportunities. East County cities provide the best value: Antioch and Pittsburg have single-family homes under $600K, Brentwood and Oakley around $650K-$800K. Central County offers condos in <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link>, Pleasant Hill, and <Link to="/concord" className="text-blue-600 hover:underline">Concord</Link> for $500K-$700K. Richmond and El Cerrito provide BART-accessible options under $800K. Down payment assistance programs, FHA loans, and conventional loans with 3% down help qualified buyers enter the market. The county offers genuine homeownership opportunities for Bay Area first-time buyers.</>
  },
  {
    question: "Is Contra Costa County real estate a good investment?",
    answer: "Contra Costa County real estate offers solid investment potential with more accessible entry points than pricier Bay Area markets. Historical appreciation has been strong, particularly in western areas near BART and in top school districts. San Ramon and Danville benefit from corporate employment and excellent schools. Walnut Creek's downtown renaissance has driven appreciation. East County offers growth potential as development continues. Strong rental demand exists throughout, especially near BART and corporate centers. Best for buyers seeking Bay Area fundamentals with better value and stronger rental yields than Peninsula markets."
  },
  {
    question: "What are property taxes in Contra Costa County?",
    answer: "Contra Costa County property taxes average approximately 1.1-1.4% of assessed value annually, depending on location and special assessments. California's Proposition 13 establishes the 1% base rate, with additional local bonds and parcel taxes. A $900K home typically pays $9,900-$12,600 annually. San Ramon Valley and Lamorinda districts have parcel taxes for schools. Newer developments in Brentwood, San Ramon, and Oakley often have Mello-Roos assessments adding $2,000-$6,000 annually. Prop 13 limits annual increases to 2%. Factor total tax obligations when comparing properties across cities."
  },
  {
    question: "How do I find the best realtor in Contra Costa County?",
    answer: <>Finding the best Contra Costa County realtor requires evaluating expertise across the county's diverse sub-markets. An agent who knows Lamorinda's luxury market differs from one specializing in East County's growth areas or <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek's</Link> downtown condos. Look for agents with strong transaction history in your target cities, understanding of commute patterns and school district nuances, and experience navigating varying competitiveness levels. Interview multiple agents, verify references, and assess negotiation skills. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for expert Contra Costa County guidance.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in Contra Costa County?",
    answer: <>Manoj Thomas brings 15+ years of Bay Area expertise, over $1 billion in career sales, and 415+ successful transactions to Contra Costa County clients. His comprehensive knowledge spans from <Link to="/danville" className="text-blue-600 hover:underline">Danville's</Link> luxury market to <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek's</Link> downtown renaissance to <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon's</Link> corporate corridor. Understanding school districts, commute patterns, and investment potential across the county, Manoj delivers tailored guidance for every client's needs. His track record and deep Bay Area relationships make him the clear choice for Contra Costa County real estate. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> today.</>
  },
  {
    question: "What are the hidden costs of buying in Contra Costa County?",
    answer: "Beyond purchase price, Contra Costa County buyers should budget for: closing costs (2-3%), transfer taxes (county and some city taxes apply), title insurance, inspections ($500-$1,500), and immediate updates. Ongoing costs include property taxes (1.1-1.4%), homeowners insurance ($1,200-$3,500/year), earthquake insurance (recommended, $1,500-$4,000/year), and HOA fees where applicable ($300-$700/month). Mello-Roos in newer developments adds significantly. Some hillside areas have higher fire insurance costs. School parcel taxes are common. Budget 1-2% of home value annually for maintenance."
  },
  {
    question: "What types of homes are available in Contra Costa County?",
    answer: <>Contra Costa County offers remarkable housing diversity. <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> and Blackhawk feature luxury estates and golf course properties. Lamorinda (Lafayette, Orinda, Moraga) has hillside homes with views and character. <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> provides downtown condos to hillside estates. <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> offers planned communities with amenities. <Link to="/concord" className="text-blue-600 hover:underline">Concord</Link> and Pleasant Hill have mid-century homes and newer condos. East County (Brentwood, Oakley, Antioch) features newer construction, larger lots, and master-planned communities. Each area offers distinct character and price points to match varied lifestyles.</>
  },
  {
    question: "What makes Contra Costa County's lifestyle appealing?",
    answer: <>Contra Costa County offers a distinctive lifestyle combining outdoor recreation, community feel, and Bay Area access. Mount Diablo State Park provides world-class hiking and views. The Iron Horse Regional Trail spans the county for biking and running. <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek's</Link> vibrant downtown offers dining and entertainment. <Link to="/danville" className="text-blue-600 hover:underline">Danville's</Link> charming downtown and weekly farmers market create community. The delta offers boating and waterfront living. Generally warmer and sunnier than the coast, the county provides space, quality schools, and value while maintaining Bay Area connectivity via BART and highways.</>
  }
];

export function ContraCostaCountyFAQ() {
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
        title="Best Realtor in Contra Costa County | Manoj Thomas - Top Contra Costa County Real Estate Agent 2025"
        description="Looking for the best realtor in Contra Costa County? Manoj Thomas is the #1 rated Contra Costa County real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for Walnut Creek, San Ramon, Danville, Concord, and all county cities."
        canonical="https://cascaderealtors.com/contra-costa-county"
        city="Contra Costa County"
        county="Contra Costa County"
        coordinates={{ lat: 37.9161, lng: -121.9018 }}
      />
      <FAQHeader />
      <FAQHero
        title="Contra Costa County Real Estate FAQ"
        description="Everything you need to know about buying a home in Contra Costa County. Expert answers from a top-rated real estate professional with 15+ years of Bay Area experience."
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
