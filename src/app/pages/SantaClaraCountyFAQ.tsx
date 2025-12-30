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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Santa Clara County Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows Santa Clara County inside and out.
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
              placeholder="Tell us about your Santa Clara County home buying needs"
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
    question: "What is the average home price in Santa Clara County?",
    answer: <>The median home price in Santa Clara County is approximately $1.6 million as of 2024, though prices vary significantly by city. Premium areas like <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link>, <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link>, and <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> exceed $3M, while <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> offers homes starting around $1M-$1.5M. <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link> and <Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link> provide more accessible entry points. The county's position as the heart of Silicon Valley drives sustained demand. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for current pricing in your target cities.</>
  },
  {
    question: "What cities are in Santa Clara County?",
    answer: <>Santa Clara County includes 15 cities: <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> (the largest, and California's 3rd largest city), <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link>, <Link to="/santa-clara" className="text-blue-600 hover:underline">Santa Clara</Link>, <Link to="/mountain-view" className="text-blue-600 hover:underline">Mountain View</Link>, <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link>, <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link>, <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link>, <Link to="/campbell" className="text-blue-600 hover:underline">Campbell</Link>, <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link>, <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link>, <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link>, <Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link>, Morgan Hill, Monte Sereno, and Los Altos Hills. Each offers distinct character, from urban San Jose to rural Gilroy, providing options for every lifestyle and budget.</>
  },
  {
    question: "Why is Santa Clara County a good place to buy a home?",
    answer: "Santa Clara County offers exceptional quality of life combined with unparalleled economic opportunity. Home to Apple, Google, Nvidia, Adobe, and hundreds of tech companies, the county provides stable, high-paying employment. The region features excellent schools (including top-ranked Cupertino and Palo Alto districts), Mediterranean climate with 300+ sunny days, diverse communities, world-class dining, and easy access to beaches, mountains, and wine country. Limited housing supply and strong demand support long-term property appreciation."
  },
  {
    question: "What are the best cities in Santa Clara County for families?",
    answer: <>Top family-friendly cities include <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link> (renowned schools, safe neighborhoods), <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> (large lots, top schools, village atmosphere), <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link> (charming downtown, excellent schools), <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> (near Stanford, walkable, great schools), and Willow Glen in <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> (tree-lined streets, community feel). Each offers different price points while maintaining excellent schools, low crime, and family-oriented amenities.</>
  },
  {
    question: "How competitive is the Santa Clara County housing market?",
    answer: <>Santa Clara County remains one of the most competitive housing markets in California. Well-priced homes in desirable areas like <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link>, <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link>, and <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> often receive 5-15 offers. Successful buyers need full pre-approval, often offer above asking, and minimize contingencies. Tech industry cycles affect competition—hiring booms intensify bidding wars, while slowdowns create opportunities. An experienced local agent is essential for navigating this dynamic market. <Link to="/contact" className="text-blue-600 hover:underline">Let's discuss your strategy</Link>.</>
  },
  {
    question: "What are Santa Clara County's best school districts?",
    answer: <>Santa Clara County boasts some of California's highest-performing schools. Top districts include Cupertino Union (consistently ranked #1 in the state), Palo Alto Unified, Los Gatos-Saratoga, Fremont Union High School District, and Mountain View-Los Altos. Cities with the best schools include <Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link>, <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link>, <Link to="/los-altos" className="text-blue-600 hover:underline">Los Altos</Link>, and <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link>. Prestigious private options include Harker, Bellarmine, Presentation, and Castilleja. School quality significantly impacts home values, with top districts commanding 15-25% premiums.</>
  },
  {
    question: "What is the commute like from Santa Clara County cities?",
    answer: <>Santa Clara County offers excellent access to major tech employers. From <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link>: Apple (Cupertino) 15-25 min, Google (Mountain View) 20-30 min, Meta (Menlo Park) 30-45 min. VTA light rail connects many cities, and Caltrain provides Peninsula/SF access. Highways 101, 280, 85, and 17 serve the county. From south county cities like <Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link>, commutes are longer (45-60+ min to main tech hubs). Hybrid work has increased flexibility, but location near your employer remains valuable.</>
  },
  {
    question: "What are first-time buyer options in Santa Clara County?",
    answer: <>First-time buyers find the best value in <Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link> and Morgan Hill (single-family homes $900K-$1.2M), <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link> and East <Link to="/san-jose" className="text-blue-600 hover:underline">San Jose</Link> ($1M-$1.3M), and condos throughout the county ($600K-$1M). Down payment assistance programs through the City of San Jose and Santa Clara County help qualified buyers. FHA loans, VA loans for veterans, and tech company housing benefits provide additional paths to homeownership. Consider starting with a condo in a desirable location versus a house in a distant suburb.</>
  },
  {
    question: "Is Santa Clara County real estate a good investment?",
    answer: "Santa Clara County real estate has delivered exceptional long-term returns. Historical appreciation averages 6-8% annually over 30 years, with Silicon Valley's innovation economy supporting sustained demand. Limited land supply (mountains and bay constrain development) and high barriers to new construction protect values. Tech industry cycles create short-term volatility, but patient investors have been rewarded. Strong rental demand from tech workers provides income potential. Best for buyers planning to hold 5+ years who can weather market fluctuations."
  },
  {
    question: "What are property taxes in Santa Clara County?",
    answer: "Santa Clara County property taxes average approximately 1.2-1.25% of assessed value annually. This includes California's Proposition 13 base rate of 1% plus local bonds and assessments. A $1.6M home would pay roughly $19,200-$20,000 annually. Prop 13 limits annual increases to 2%, providing predictability. The county also charges a transfer tax of $1.10 per $1,000 of sale price. Newer developments may have Mello-Roos taxes adding $3,000-$10,000 annually. Factor total tax obligations when comparing properties across different cities."
  },
  {
    question: "How do I find the best realtor in Santa Clara County?",
    answer: <>Finding the best Santa Clara County realtor means evaluating local expertise, transaction volume, and client satisfaction. Look for agents with deep knowledge of specific cities—<Link to="/cupertino" className="text-blue-600 hover:underline">Cupertino</Link> and <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> have different dynamics than <Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link> or <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link>. Experience with tech industry clients (understanding RSUs, IPO timing, relocation) is valuable. Verify transaction history, check reviews, and interview multiple agents. The right agent provides market insight, negotiation expertise, and trusted guidance. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for personalized service.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in Santa Clara County?",
    answer: <>Manoj Thomas has earned recognition as Santa Clara County's premier real estate professional through 15+ years of dedicated service, over $1 billion in career sales, and 415+ successful transactions throughout the county. His expertise spans from <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> to <Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link>, giving clients comprehensive market insight. Manoj's understanding of tech industry compensation, relocation needs, and the unique dynamics of Silicon Valley uniquely positions him to serve the county's sophisticated buyers and sellers. His track record speaks for itself. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> today.</>
  },
  {
    question: "What are the hidden costs of buying in Santa Clara County?",
    answer: "Beyond purchase price, budget for: closing costs (2-3% of price), transfer tax ($1.10/$1,000), title insurance, inspections ($500-$1,500), and immediate repairs/updates. Ongoing costs include property taxes (1.2-1.25%), homeowners insurance ($1,500-$4,000/year), earthquake insurance (recommended, $2,000-$5,000/year), and HOA fees for condos ($400-$1,200/month). Mello-Roos in newer developments adds $3,000-$10,000 annually. Some cities have additional parcel taxes. Budget 1-2% of home value annually for maintenance. Older homes may need foundation, electrical, or plumbing updates."
  },
  {
    question: "What types of homes are available in Santa Clara County?",
    answer: <>Santa Clara County offers diverse housing options. Single-family homes range from 1950s ranch-style in <Link to="/sunnyvale" className="text-blue-600 hover:underline">Sunnyvale</Link> to modern new construction in <Link to="/milpitas" className="text-blue-600 hover:underline">Milpitas</Link>. Historic homes are found in <Link to="/palo-alto" className="text-blue-600 hover:underline">Palo Alto</Link> and <Link to="/los-gatos" className="text-blue-600 hover:underline">Los Gatos</Link>. Luxury estates on large lots are available in <Link to="/saratoga" className="text-blue-600 hover:underline">Saratoga</Link> and Los Altos Hills. Condos and townhomes provide lower-cost entry throughout. South county (<Link to="/gilroy" className="text-blue-600 hover:underline">Gilroy</Link>, Morgan Hill) offers larger lots and newer construction at more accessible prices.</>
  },
  {
    question: "Is earthquake insurance necessary in Santa Clara County?",
    answer: "While not legally required, earthquake insurance is strongly recommended in Santa Clara County due to proximity to the San Andreas and Hayward faults. Standard homeowner's insurance excludes earthquake damage. California Earthquake Authority (CEA) policies cost approximately $2,000-$5,000 annually with high deductibles (typically 15%). Newer construction and retrofitted homes qualify for lower premiums. Many homeowners self-insure for minor damage while maintaining coverage for catastrophic events. Consider your risk tolerance and ability to absorb potential losses when deciding coverage levels."
  }
];

export function SantaClaraCountyFAQ() {
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
        title="Best Realtor in Santa Clara County | Manoj Thomas - Top Santa Clara County Real Estate Agent 2025"
        description="Looking for the best realtor in Santa Clara County? Manoj Thomas is the #1 rated Santa Clara County real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for San Jose, Cupertino, Palo Alto, Sunnyvale, and all county cities."
        canonical="https://cascaderealtors.com/santa-clara-county"
        city="Santa Clara County"
        county="Santa Clara County"
        coordinates={{ lat: 37.3541, lng: -121.9552 }}
      />
      <FAQHeader />
      <FAQHero
        title="Santa Clara County Real Estate FAQ"
        description="Everything you need to know about buying a home in Santa Clara County, the heart of Silicon Valley. Expert answers from a top-rated real estate professional with 15+ years of local experience."
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
