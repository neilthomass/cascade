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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Silicon Valley Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows Silicon Valley inside and out.
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
              placeholder="Tell us about your Silicon Valley home buying needs"
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
    question: "What is the average home price in Silicon Valley?",
    answer: <>The median home price in Silicon Valley ranges from $1.5 million to $3.5 million depending on the city. Cities like <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link>, <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link>, and <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> command premium prices of $3M+, while <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> and <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link> offer more accessible entry points around $1.5M-$2M. The region's position as the global technology hub drives sustained demand and strong property values. For a personalized market analysis, <Link to="/contact" className="text-blue-600 hover:underline">contact our team</Link>.</>
  },
  {
    question: "What cities are included in Silicon Valley?",
    answer: <>Silicon Valley encompasses several cities in Santa Clara and San Mateo counties. Major cities include <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> (the largest), <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link>, <Link to="/mountain-view" className="text-blue-600 hover:underline">Mountain View</Link>, <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link>, <Link to="/santa-clara" className="text-blue-600 hover:underline">Santa Clara</Link>, <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link>, <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link>, <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link>, <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link>, <Link to="/campbell" className="text-blue-600 hover:underline">Campbell</Link>, and <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link>. Some definitions also include <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> and Peninsula cities like <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> and <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link>.</>
  },
  {
    question: "Why is Silicon Valley a good place to buy a home?",
    answer: "Silicon Valley offers unparalleled economic opportunity, with headquarters of Apple, Google, Meta, Netflix, Adobe, Nvidia, and hundreds of innovative startups. The region features excellent schools, Mediterranean climate with 300+ sunny days, world-class dining and entertainment, and proximity to beaches, mountains, and wine country. Property values have shown strong long-term appreciation due to limited housing supply and sustained demand from high-income tech workers. The concentration of talent and capital makes it a unique place to live and invest."
  },
  {
    question: "What are the best neighborhoods in Silicon Valley for families?",
    answer: <>Top family neighborhoods include <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link> (charming downtown, excellent schools), <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link> (top-rated schools, safe neighborhoods), <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> (large lots, award-winning schools), <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> (walkable, near Stanford), and <Link to="/san-jose" className="text-blue-600 hover:underline">Willow Glen in San Jose</Link> (tree-lined streets, community feel). Each offers excellent public schools, low crime rates, family-oriented activities, and access to parks and recreational facilities.</>
  },
  {
    question: "How competitive is the Silicon Valley housing market?",
    answer: "Silicon Valley remains one of the most competitive housing markets in the nation. Well-priced homes in desirable neighborhoods often receive 5-15 offers within days of listing. Successful buyers typically need to be fully pre-approved, offer above asking price (5-15% over in hot markets), minimize contingencies, and act decisively. Tech industry cycles affect competition levels, but demand consistently exceeds supply due to geographic constraints and strong job growth. Working with an experienced local agent is essential for navigating multiple-offer situations."
  },
  {
    question: "What is the commute like within Silicon Valley?",
    answer: <>Silicon Valley commutes vary significantly by location. Living near your workplace is ideal—commutes within the same city average 15-20 minutes. <Link to="/mountain-view" className="text-blue-600 hover:underline">Mountain View</Link> to <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> is 20-35 minutes. Caltrain connects Peninsula cities to San Francisco efficiently. Major tech campuses offer shuttles. Highway 101 and 280 are primary arteries, with 85 and 17 serving south county. Traffic peaks 7-9 AM and 4-7 PM. Many tech companies now offer hybrid work, making location more flexible. Consider proximity to your employer when choosing a neighborhood.</>
  },
  {
    question: "What are the best schools in Silicon Valley?",
    answer: <>Silicon Valley boasts some of California's highest-performing schools. Top districts include Palo Alto Unified, Cupertino Union, Los Gatos-Saratoga, and Mountain View-Los Altos. Schools in <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link>, <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link>, <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link>, and <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> consistently rank in the top 5% statewide. Renowned private schools include Harker, Castilleja, Menlo School, and Bellarmine. Many families specifically choose homes based on school attendance boundaries—something we help clients navigate carefully.</>
  },
  {
    question: "What are first-time buyer options in Silicon Valley?",
    answer: <>First-time buyers can find opportunities in <Link to="/san-jose" className="text-blue-600 hover:underline">East San Jose</Link> and <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link> for single-family homes under $1.3M. Condos and townhomes in <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link>, <Link to="/santa-clara" className="text-blue-600 hover:underline">Santa Clara</Link>, and <Link to="/mountain-view" className="text-blue-600 hover:underline">Mountain View</Link> start around $700K-$1M. Down payment assistance programs, FHA loans, and tech company housing programs can help. Many first-time buyers also explore <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> for better value while maintaining Silicon Valley access.</>
  },
  {
    question: "Is Silicon Valley real estate a good investment?",
    answer: "Silicon Valley real estate has proven to be an excellent long-term investment. Historical appreciation has averaged 5-8% annually over the past 30 years, with some periods seeing dramatic gains. Factors supporting continued appreciation include limited land supply (mountains and bay constrain growth), strong job creation, high incomes, and global demand. While the market experiences cyclical volatility tied to tech industry health, patient investors have been rewarded. Rental income potential is strong due to high rents and consistent demand from tech workers."
  },
  {
    question: "What property taxes should I expect in Silicon Valley?",
    answer: "Silicon Valley property taxes are approximately 1.1-1.3% of assessed value annually, based on California's Proposition 13 (1% base rate plus local bonds and assessments). A $2M home would pay roughly $22,000-$26,000 annually. Prop 13 limits annual increases to 2%, providing long-term predictability regardless of market appreciation. Newer developments may have Mello-Roos taxes adding $2,000-$10,000 annually. When comparing homes, factor in total tax obligations including special assessments."
  },
  {
    question: "How do I find the best realtor in Silicon Valley?",
    answer: <>Finding the best Silicon Valley realtor requires evaluating local expertise, transaction volume, negotiation skills, and client satisfaction. Look for agents with deep knowledge of specific neighborhoods, experience with tech industry clients (understanding stock compensation, RSUs, and relocation), and proven success in competitive bidding situations. Interview multiple agents, check references, and review their recent transaction history. The right agent should ask about your needs, explain market dynamics clearly, and have strong relationships with other agents, lenders, and inspectors. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> to experience world-class service.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in Silicon Valley?",
    answer: <>Manoj Thomas has established himself as Silicon Valley's premier real estate professional through 15+ years of dedicated service, over $1 billion in career sales, and 415+ successful transactions. His deep understanding of the tech industry, including stock-based compensation and relocation logistics, uniquely positions him to serve Silicon Valley's sophisticated clientele. Clients consistently praise his market knowledge, negotiation expertise, and personalized attention. Whether you're buying your first home or a luxury estate, Manoj's proven track record and commitment to excellence make him the clear choice. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> to experience the difference.</>
  },
  {
    question: "What are the hidden costs of buying in Silicon Valley?",
    answer: "Beyond the purchase price, Silicon Valley buyers should budget for: closing costs (2-3%), property transfer taxes ($1.10-$3.30 per $1,000 depending on city), title insurance, inspections ($500-$1,500), moving costs, and immediate repairs or upgrades. Ongoing costs include property taxes (1.1-1.3%), homeowners insurance ($1,500-$4,000/year), earthquake insurance ($2,000-$5,000/year recommended), and HOA fees for condos ($400-$1,200/month). Some cities have additional parcel taxes for schools or parks. Budget 1-2% of home value annually for maintenance."
  },
  {
    question: "Should I buy now or wait in Silicon Valley?",
    answer: "Timing the Silicon Valley market is notoriously difficult. While prices fluctuate with tech industry cycles, long-term appreciation has consistently rewarded patient homeowners. Consider: if you plan to stay 5+ years, buying when you find the right home often makes sense. Interest rates, your personal finances, and life circumstances matter more than trying to perfectly time the market. In competitive periods, more inventory and motivated sellers can create opportunities. Our team can help you analyze current conditions and develop a strategy aligned with your goals."
  },
  {
    question: "What types of homes are available in Silicon Valley?",
    answer: <>Silicon Valley offers diverse housing options. Single-family homes range from 1950s ranch-style in <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link> to modern new construction in <Link to="/mountain-view" className="text-blue-600 hover:underline">Mountain View</Link>. Historic Victorians and Craftsman homes are found in <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> and <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link>. Luxury estates on large lots are available in <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> and <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos Hills</Link>. Condos and townhomes provide lower-cost entry points throughout the region. New developments offer modern amenities and energy efficiency. Each property type has distinct advantages depending on your lifestyle and investment goals.</>
  }
];

export function SiliconValleyFAQ() {
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
        title="Best Realtor in Silicon Valley | Manoj Thomas - Top Silicon Valley Real Estate Agent 2025"
        description="Looking for the best realtor in Silicon Valley? Manoj Thomas is the #1 rated Silicon Valley real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for San Jose, Palo Alto, Mountain View, Sunnyvale, and all Silicon Valley cities."
        canonical="https://cascaderealtors.com/silicon-valley"
        city="Silicon Valley"
        county="Santa Clara County"
        coordinates={{ lat: 37.3875, lng: -122.0575 }}
      />
      <FAQHeader />
      <FAQHero
        title="Silicon Valley Real Estate FAQ"
        description="Everything you need to know about buying a home in Silicon Valley, the world's premier technology hub. Expert answers from a top-rated real estate professional with 15+ years of local experience."
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
