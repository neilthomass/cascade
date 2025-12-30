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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Peninsula Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows the Peninsula inside and out.
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
              placeholder="Tell us about your Peninsula home buying needs"
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
    question: "What is the average home price on the Peninsula?",
    answer: <>The median home price on the Peninsula (San Mateo County) ranges from $1.4M to $4M+ depending on the city. Affluent communities like Atherton ($7M+), Hillsborough ($4M+), and Woodside ($3M+) are among the nation's most expensive. Mid-Peninsula cities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link> ($2.3M), <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link> ($2.1M), and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> ($2.5M) are strong markets. <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link> and South San Francisco ($1.2M-$1.4M) offer more accessible entry points. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for detailed market analysis.</>
  },
  {
    question: "What cities are on the Peninsula?",
    answer: <>The Peninsula encompasses San Mateo County cities between San Francisco and Silicon Valley. Major cities include: North Peninsula—<Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link>, South San Francisco, <Link to="/san-bruno" className="text-blue-600 hover:underline">San Bruno</Link>, Millbrae. Mid-Peninsula—<Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link>, <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link>, <Link to="/belmont" className="text-blue-600 hover:underline">Belmont</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>. South Peninsula—<Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link>, <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link>, Atherton, Woodside, Portola Valley. Coastal communities include Half Moon Bay and Pacifica. Each offers distinct character, price points, and lifestyle.</>
  },
  {
    question: "Why is the Peninsula a good place to buy a home?",
    answer: "The Peninsula offers an unparalleled combination of San Francisco and Silicon Valley access, excellent schools, Mediterranean climate, and established communities. Major employers like Meta, Oracle, YouTube (Google), and South San Francisco biotech companies provide local jobs. Caltrain connects seamlessly to SF and San Jose. The region features charming downtowns (Burlingame Broadway, San Carlos Laurel Street), coastal access (Half Moon Bay, Pacifica), spectacular hiking, and diverse dining. Strong school districts and limited housing supply support property values. The Peninsula lifestyle balances urban convenience with suburban quality of life."
  },
  {
    question: "What are the best cities on the Peninsula for families?",
    answer: <>Top family cities include <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link> (excellent schools, Laurel Street downtown, community events), <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link> (walkable Broadway, top schools, charming neighborhoods), <Link to="/belmont" className="text-blue-600 hover:underline">Belmont</Link> (quiet hills, good schools), <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link> (lagoons, safe planned community, great for young families), and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> (near Stanford, excellent schools). Hillsborough offers estate living with outstanding schools. Each provides excellent education options, safety, and family-oriented amenities at different price points.</>
  },
  {
    question: "How competitive is the Peninsula housing market?",
    answer: <>The Peninsula market is highly competitive due to limited inventory and strong demand from tech workers. Desirable cities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>, and <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link> regularly see multiple offers with 5-15% over asking for well-priced homes. North Peninsula cities like <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link> and South San Francisco are slightly less intense but still competitive. Success requires full pre-approval, competitive offers, and quick decisions. An experienced Peninsula agent is essential for navigating bidding situations and understanding micro-market dynamics.</>
  },
  {
    question: "What are the Peninsula's best school districts?",
    answer: <>The Peninsula features several top-performing districts. Hillsborough City School District consistently ranks among California's best. Other excellent districts include San Carlos (all schools highly rated), Burlingame (strong elementary through high school), Menlo Park City Elementary, and Las Lomitas. Top high schools include Carlmont (Belmont), Burlingame High, and Menlo-Atherton. Private options like Sacred Heart Prep, Menlo School, Nueva, and Crystal Springs Uplands provide additional choices. School quality significantly impacts home prices—homes in top districts command 15-25% premiums over comparable properties.</>
  },
  {
    question: "What is the commute like from the Peninsula?",
    answer: <>The Peninsula's central location offers excellent commute options. Caltrain provides fast service to San Francisco (25-40 min from mid-Peninsula) and San Jose (30-45 min). BART connects <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link>, South San Francisco, <Link to="/san-bruno" className="text-blue-600 hover:underline">San Bruno</Link>, and Millbrae to SF and the East Bay. SFO airport is centrally located for business travelers. Highway 101 and I-280 run north-south. Tech shuttles serve major employers including Meta (Menlo Park), Google (Mountain View), and Apple (Cupertino). Commute times: to SF 25-45 min, to Silicon Valley 15-35 min depending on exact locations.</>
  },
  {
    question: "What are first-time buyer options on the Peninsula?",
    answer: <>First-time buyers find the most accessible Peninsula options in North County: <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link> offers condos ($600K-$900K) and single-family homes ($1.1M-$1.4M). South San Francisco and Pacifica provide similar price points. Condos in <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link>, <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link>, and <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link> range $700K-$1M with good amenities. Down payment assistance programs, FHA loans, and tech company housing benefits help qualified buyers. Starting with a condo in a central Peninsula location often makes more sense than stretching for a house in a distant area.</>
  },
  {
    question: "Is Peninsula real estate a good investment?",
    answer: "Peninsula real estate has historically been an excellent long-term investment. The region's location between San Francisco and Silicon Valley, limited developable land (ocean, bay, and mountains constrain growth), top schools, and high incomes drive sustained demand. Historical appreciation averages 5-7% annually, with stronger performance in premier school districts. Multiple employment centers (SF, South SF biotech, Silicon Valley tech) diversify economic risk. Strong rental demand from tech workers supports investment properties. Best for buyers planning 5+ year holds who value the Peninsula lifestyle and can weather market cycles."
  },
  {
    question: "What are property taxes on the Peninsula?",
    answer: "Peninsula (San Mateo County) property taxes average approximately 1.1-1.2% of assessed value annually, based on California's Proposition 13 (1% base rate plus local bonds and assessments). A $2M home typically pays $22,000-$24,000 annually. Prop 13 limits annual increases to 2%, providing long-term predictability. San Mateo County charges a transfer tax of $1.10 per $1,000 (some cities add local taxes). School parcel taxes are common in most districts ($200-$800 annually). Newer developments may have Mello-Roos assessments. Factor total tax obligations when comparing properties."
  },
  {
    question: "How do I find the best realtor on the Peninsula?",
    answer: <>Finding the best Peninsula realtor requires evaluating expertise across the region's diverse cities. An agent who specializes in <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame's</Link> family neighborhoods may differ from one expert in <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park's</Link> tech-focused market or coastal Half Moon Bay. Look for agents with strong transaction history in your target cities, understanding of Peninsula commute patterns, and experience navigating competitive bidding. Interview multiple agents, verify references, and assess their negotiation track record. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for expert Peninsula guidance.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor on the Peninsula?",
    answer: <>Manoj Thomas brings 15+ years of Peninsula expertise, over $1 billion in career sales, and 415+ successful transactions to every client engagement. His comprehensive knowledge spans from <Link to="/daly-city" className="text-blue-600 hover:underline">Daly City</Link> to <Link to="/menlo-park" className="text-blue-600 hover:underline">Menlo Park</Link>, with deep expertise in family-favorite cities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>, and <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link>. Understanding school districts, commute dynamics, and competitive market strategies, Manoj delivers tailored guidance for every Peninsula buyer and seller. His track record of success and deep relationships make him the clear choice. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> today.</>
  },
  {
    question: "What are the hidden costs of buying on the Peninsula?",
    answer: "Beyond purchase price, Peninsula buyers should budget for: closing costs (2-3%), transfer taxes (county plus city where applicable), title insurance, inspections ($500-$1,500), and immediate updates. Ongoing costs include property taxes (1.1-1.2%), homeowners insurance ($1,500-$5,000/year), earthquake insurance (strongly recommended, $2,000-$5,000/year), and HOA fees for condos ($400-$1,200/month). School parcel taxes add $200-$800 annually in most districts. Coastal properties may have additional insurance requirements. Budget 1-2% of home value annually for maintenance. Older homes may need foundation or systems updates."
  },
  {
    question: "What types of homes are available on the Peninsula?",
    answer: <>The Peninsula offers diverse housing options. Mid-century homes predominate in <Link to="/san-mateo" className="text-blue-600 hover:underline">San Mateo</Link>, <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link>, and <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>. <Link to="/foster-city" className="text-blue-600 hover:underline">Foster City</Link> features 1960s-70s planned community with lagoons. Grand estates characterize Hillsborough, Atherton, and Woodside. Coastal Half Moon Bay offers beach access and rural feel. Modern condos and townhomes are found throughout, especially near Caltrain. <Link to="/redwood-city" className="text-blue-600 hover:underline">Redwood City</Link> has seen significant new downtown development. Historic homes exist in select neighborhoods. Each property type suits different lifestyles, commute needs, and budgets.</>
  },
  {
    question: "What makes the Peninsula lifestyle special?",
    answer: <>The Peninsula offers a unique lifestyle combining urban access and suburban charm. Residents enjoy easy commutes to both San Francisco and Silicon Valley while living in walkable communities like <Link to="/burlingame" className="text-blue-600 hover:underline">Burlingame</Link> and <Link to="/san-carlos" className="text-blue-600 hover:underline">San Carlos</Link>. Weekend activities include hiking in the coastal hills, beach trips to Half Moon Bay, wine tasting in the foothills, and world-class dining. The Mediterranean climate provides comfortable year-round weather. Strong schools, safe neighborhoods, and diverse communities make it ideal for families. SFO airport access facilitates travel. The Peninsula perfectly balances suburban tranquility with urban convenience and natural beauty.</>
  }
];

export function PeninsulaFAQ() {
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
        title="Best Realtor on the Peninsula | Manoj Thomas - Top Peninsula Real Estate Agent 2025"
        description="Looking for the best realtor on the Peninsula? Manoj Thomas is the #1 rated Peninsula real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for Burlingame, San Carlos, Menlo Park, San Mateo, Redwood City, and all Peninsula cities."
        canonical="https://cascaderealtors.com/peninsula"
        city="Peninsula"
        county="San Mateo County"
        coordinates={{ lat: 37.5072, lng: -122.2605 }}
      />
      <FAQHeader />
      <FAQHero
        title="Peninsula Real Estate FAQ"
        description="Everything you need to know about buying a home on the Peninsula—San Mateo County cities between San Francisco and Silicon Valley. Expert answers from a top-rated real estate professional with 15+ years of local experience."
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
