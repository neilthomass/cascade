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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Bay Area Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows the Bay Area inside and out.
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
              placeholder="Tell us about your Bay Area home buying needs"
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
    question: "What is the average home price in the Bay Area?",
    answer: <>Bay Area home prices vary dramatically by region. San Francisco's median is approximately $1.3M, Silicon Valley cities like <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> and <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link> reach $3M+, while the East Bay offers more accessible options with <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> around $1.4M and Contra Costa County cities starting under $1M. The Peninsula ranges from $1.5M-$4M depending on location. Overall, the Bay Area remains one of the most expensive housing markets in the nation, driven by the concentration of tech employment and limited housing supply.</>
  },
  {
    question: "What areas are included in the Bay Area?",
    answer: <>The San Francisco Bay Area encompasses nine counties: San Francisco, San Mateo, Santa Clara, Alameda, Contra Costa, Marin, Sonoma, Napa, and Solano. Key sub-regions include Silicon Valley (<Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link>, <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link>, <Link to="/mountain-view" className="text-blue-600 hover:underline">Mountain View</Link>), the Peninsula (<Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link>, <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link>), the East Bay (<Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link>, <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link>, <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link>), and North Bay (Marin, Sonoma). Each offers distinct lifestyles, price points, and community characteristics.</>
  },
  {
    question: "Why is the Bay Area a good place to buy a home?",
    answer: "The Bay Area offers unmatched economic opportunity with the world's highest concentration of tech companies, venture capital, and innovation. The region features diverse communities, world-class universities (Stanford, UC Berkeley), exceptional cultural amenities, Mediterranean climate, and access to beaches, mountains, and wine country within an hour's drive. Despite high prices, the Bay Area's strong job market, limited housing supply, and quality of life support long-term property appreciation, making it attractive for both lifestyle and investment."
  },
  {
    question: "What are the best neighborhoods in the Bay Area for families?",
    answer: <>Top family neighborhoods span the region. In the South Bay: <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link>, <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link>, <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link>, and <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> offer excellent schools and safe streets. In the East Bay: <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link>, <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link>, and <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> provide suburban comfort with top schools. On the Peninsula: <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>, and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> combine community feel with excellent amenities. Each area offers different price points while maintaining high quality of life.</>
  },
  {
    question: "How competitive is the Bay Area housing market?",
    answer: "The Bay Area housing market is among the most competitive in the nation. Desirable properties often receive multiple offers within days, with successful buyers offering above asking price and minimizing contingencies. Competition varies by sub-market—hot areas like Cupertino or Palo Alto see intense bidding wars, while outer East Bay and some Peninsula cities offer more balanced conditions. Factors affecting competition include interest rates, tech employment trends, and seasonal patterns. Working with an experienced local agent who understands micro-market dynamics is essential."
  },
  {
    question: "What is the commute like in the Bay Area?",
    answer: <>Bay Area commutes are notoriously challenging, making home location critical. BART connects the East Bay to San Francisco and SFO. Caltrain runs from San Francisco through the Peninsula to San Jose. Tech shuttles serve many Silicon Valley campuses. Major highways (101, 280, 880, 680) experience significant congestion. Average commutes range from 30-60+ minutes depending on route. The rise of hybrid work has expanded location options for many tech workers. Consider your employer's location, flexibility policies, and transit options when choosing where to buy. Cities like <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> and <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> offer BART access to both SF and South Bay.</>
  },
  {
    question: "What are the best school districts in the Bay Area?",
    answer: <>The Bay Area boasts many top-rated school districts. Highest-performing include Palo Alto Unified, Cupertino Union, Los Gatos-Saratoga, and Pleasanton Unified in public schools. San Ramon Valley, Fremont Unified, and Dublin Unified also rank highly. Prestigious private schools include Harker, Menlo School, and Crystal Springs Uplands. <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link> and <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> are particularly known for their exceptional public schools. School quality significantly impacts home prices, with homes in top districts commanding 10-20% premiums.</>
  },
  {
    question: "What are first-time buyer options in the Bay Area?",
    answer: <>First-time buyers find the best value in the outer East Bay (Antioch, Pittsburg, Brentwood) with homes under $700K, and the Tri-Valley (<Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link>, <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link>) around $1M. Condos throughout the region offer lower entry points—$600K-$900K in many areas. Down payment assistance programs, FHA loans, and tech company housing benefits help qualified buyers. Consider starting with a condo in a desirable area versus a house in a distant suburb—appreciation potential and lifestyle should factor into your decision.</>
  },
  {
    question: "Is Bay Area real estate a good investment?",
    answer: "Bay Area real estate has historically been an excellent long-term investment. Despite cyclical volatility tied to tech industry health, the region has delivered consistent appreciation over 20-30 year periods. Factors supporting continued growth include limited housing supply (geographic constraints and development restrictions), strong job creation, high incomes, and global appeal. The Bay Area's innovation economy attracts talent and capital from worldwide. For investors planning to hold 7+ years, the fundamentals remain compelling, though timing and location selection matter significantly."
  },
  {
    question: "What property taxes should I expect in the Bay Area?",
    answer: "Bay Area property taxes range from 1.0-1.4% of assessed value annually, depending on location. California's Proposition 13 caps the base rate at 1%, with additional local bonds and assessments. A $1.5M home typically pays $15,000-$21,000 annually. Prop 13 limits annual increases to 2%, protecting long-term owners from market-driven tax spikes. Some cities have transfer taxes (0.5-1.5% of sale price). New developments may include Mello-Roos taxes adding $3,000-$15,000 annually. Factor total tax obligations into your budget when comparing properties."
  },
  {
    question: "How do I find the best realtor in the Bay Area?",
    answer: <>Finding the best Bay Area realtor requires evaluating regional expertise, transaction history, and client satisfaction. The Bay Area's diverse sub-markets demand specialized knowledge—an agent expert in <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> may not know <Link to="/walnut-creek" className="text-blue-600 hover:underline">Walnut Creek</Link> intimately. Look for agents with strong local track records, understanding of tech industry clients, and proven negotiation skills in competitive situations. Interview multiple agents, verify references, and assess their communication style. The right agent becomes a trusted advisor throughout your homeownership journey. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for expert guidance.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in the Bay Area?",
    answer: <>Manoj Thomas has earned recognition as the Bay Area's premier real estate professional through 15+ years of dedicated service, over $1 billion in career sales, and 415+ successful transactions across the region. His expertise spans Silicon Valley, the Peninsula, and the East Bay, giving clients comprehensive market insight. Manoj's deep understanding of the tech industry—including stock-based compensation, relocation logistics, and H-1B considerations—uniquely positions him to serve Bay Area's diverse clientele. His track record, client testimonials, and commitment to excellence speak for themselves. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> today.</>
  },
  {
    question: "What are the hidden costs of buying in the Bay Area?",
    answer: "Beyond purchase price, Bay Area buyers should budget for: closing costs (2-3%), transfer taxes (varies by city, up to 1.5% in San Francisco), title insurance, inspections ($500-$2,000), and immediate repairs. Ongoing costs include property taxes (1.0-1.4%), homeowners insurance ($1,500-$5,000/year), earthquake insurance (recommended, $2,000-$6,000/year), and HOA fees for condos ($400-$1,500/month). Some areas have parcel taxes for schools. Budget 1-2% of home value annually for maintenance. Homes in wildfire zones may require additional fire insurance."
  },
  {
    question: "What types of homes are available in the Bay Area?",
    answer: <>The Bay Area offers incredible housing diversity. San Francisco features Victorian and Edwardian row houses, modern condos, and lofts. The Peninsula has ranch-style homes, new construction, and luxury estates. Silicon Valley ranges from 1950s ranches in <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link> to historic Victorians in <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> and luxury properties in <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos Hills</Link>. The East Bay includes bungalows in <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link>, newer developments in <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link>, and estates in <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link>. Each style offers distinct advantages for different lifestyles.</>
  },
  {
    question: "Should I buy now or wait in the Bay Area?",
    answer: "Timing the Bay Area market is challenging even for experts. Long-term trends favor appreciation, but short-term volatility exists. Consider: if you plan to stay 5+ years, buying when you find the right home usually makes sense. Interest rates, your financial readiness, and life circumstances matter more than market timing. In slower periods, you may find more negotiating power; in hot markets, competition intensifies but so does urgency to act. Our team can help you evaluate current conditions and develop a strategy aligned with your goals and timeline."
  }
];

export function BayAreaFAQ() {
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
        title="Best Realtor in Bay Area | Manoj Thomas - Top Bay Area Real Estate Agent 2025"
        description="Looking for the best realtor in the Bay Area? Manoj Thomas is the #1 rated Bay Area real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for San Francisco, Silicon Valley, East Bay, and Peninsula home buyers."
        canonical="https://cascaderealtors.com/bay-area"
        city="Bay Area"
        county="Bay Area"
        coordinates={{ lat: 37.5585, lng: -122.2711 }}
      />
      <FAQHeader />
      <FAQHero
        title="Bay Area Real Estate FAQ"
        description="Everything you need to know about buying a home in the San Francisco Bay Area. Expert answers from a top-rated real estate professional with 15+ years of regional experience."
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
