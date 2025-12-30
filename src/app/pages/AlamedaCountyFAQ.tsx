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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Alameda County Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows Alameda County inside and out.
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
              placeholder="Tell us about your Alameda County home buying needs"
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
    question: "What is the average home price in Alameda County?",
    answer: <>The median home price in Alameda County is approximately $1.1-$1.3 million as of 2024, offering better value than Santa Clara or San Mateo counties. Prices vary significantly: <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> averages $1.6M, <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> around $1.4M, <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link> varies from $600K-$2M by neighborhood, while <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> and <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> range $1.1-$1.4M. The county offers excellent Bay Area access at more accessible price points than the Peninsula or South Bay. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for neighborhood-specific analysis.</>
  },
  {
    question: "What cities are in Alameda County?",
    answer: <>Alameda County includes 14 cities with diverse character: <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link> (the largest, with vibrant urban neighborhoods), <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> (tech-focused, excellent schools), <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> (upscale Tri-Valley), <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> (fast-growing, BART access), <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> (wine country, suburban feel), Hayward, <Link to="/union-city" className="text-blue-600 hover:underline">Union City</Link>, <Link to="/newark" className="text-blue-600 hover:underline">Newark</Link>, Alameda, Berkeley, Albany, Emeryville, Piedmont (enclave with top schools), and San Leandro. Each offers distinct lifestyles at varying price points.</>
  },
  {
    question: "Why is Alameda County a good place to buy a home?",
    answer: "Alameda County offers compelling value for Bay Area buyers. The East Bay provides more affordable housing than the Peninsula while maintaining excellent Silicon Valley and San Francisco access via BART and highways. The county features diverse communities, excellent schools (especially in Fremont, Pleasanton, Dublin, and Piedmont), UC Berkeley, vibrant urban culture in Oakland, wine country in Livermore, and beautiful weather. Strong job growth in Oakland and Fremont, combined with BART connectivity, makes Alameda County attractive for tech workers seeking space and value."
  },
  {
    question: "What are the best cities in Alameda County for families?",
    answer: <>Top family cities include <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> (top schools, downtown charm, Tri-Valley lifestyle), <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> (newer homes, good schools, BART), <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> (excellent schools, diverse community, tech jobs), <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> (wine country, family-oriented), and Piedmont (exclusive schools, safe neighborhoods within Oakland). <Link to="/oakland" className="text-blue-600 hover:underline">Oakland's</Link> Montclair and Rockridge neighborhoods also offer excellent family environments with urban amenities. Each provides strong schools, safe communities, and family activities.</>
  },
  {
    question: "How competitive is the Alameda County housing market?",
    answer: <>Alameda County's market varies by city. Highly desirable areas like <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link>, Piedmont, and top <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> neighborhoods see multiple offers and competitive bidding. <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> and <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> are competitive but slightly less intense. <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link> varies by neighborhood—hot areas like Rockridge and Montclair are very competitive, while others offer more negotiating room. Overall, well-priced homes in good school districts sell quickly. An experienced agent helps navigate varying dynamics across the county.</>
  },
  {
    question: "What are Alameda County's best school districts?",
    answer: <>Alameda County has several excellent school districts. Piedmont Unified consistently ranks among California's best. Pleasanton Unified and Dublin Unified are top-performers in the Tri-Valley. <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> Unified is highly regarded, particularly Mission San Jose High School. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> Valley Joint Unified serves that community well. In <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link>, magnet schools and select neighborhood schools offer quality options. Albany Unified is excellent for that small city. School quality significantly impacts home values, with top districts commanding premiums.</>
  },
  {
    question: "What is the commute like from Alameda County?",
    answer: <>Alameda County offers excellent transit connectivity. BART serves <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link>, <Link to="/union-city" className="text-blue-600 hover:underline">Union City</Link>, <Link to="/dublin" className="text-blue-600 hover:underline">Dublin/Pleasanton</Link>, <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link>, Berkeley, and connects to SF (35-50 min) and SFO. Highway 880 links to Silicon Valley (45-60 min to San Jose). I-580 connects the Tri-Valley to Oakland and beyond. From <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link>, many tech workers commute to Milpitas, Santa Clara, and San Jose (20-40 min). <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> commutes are longer but BART extension helps. Tech shuttles serve some employers. Hybrid work has expanded location flexibility.</>
  },
  {
    question: "What are first-time buyer options in Alameda County?",
    answer: <>Alameda County offers the Bay Area's best first-time buyer opportunities. <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link> neighborhoods like Fruitvale and East Oakland have condos under $500K and houses under $700K. Hayward and San Leandro offer single-family homes $800K-$1M. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> condos start around $600K. <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> and <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> condos range $700K-$900K. Down payment assistance programs, FHA loans, and Oakland first-time buyer programs help qualified purchasers. The county provides genuine homeownership opportunities while maintaining Bay Area job access.</>
  },
  {
    question: "Is Alameda County real estate a good investment?",
    answer: "Alameda County real estate offers strong investment potential with better entry points than pricier Bay Area markets. Historical appreciation has been solid, supported by BART expansion, tech job growth, and migration from more expensive areas. Fremont benefits from proximity to Tesla and Silicon Valley employers. Oakland's ongoing development attracts investment. The Tri-Valley (Pleasanton, Dublin, Livermore) continues growing with excellent schools. Rental demand is strong throughout, particularly near BART. Best for buyers seeking Bay Area appreciation potential with more accessible prices and stronger rental yields."
  },
  {
    question: "What are property taxes in Alameda County?",
    answer: "Alameda County property taxes average approximately 1.1-1.4% of assessed value annually, varying by city and special assessments. California's Proposition 13 sets the base rate at 1%, with additional local bonds and parcel taxes. A $1.2M home typically pays $13,200-$16,800 annually. Some cities have additional parcel taxes for schools or services. Mello-Roos assessments are common in newer Dublin and Livermore developments, adding $3,000-$8,000 annually. Prop 13 limits annual increases to 2%, providing long-term predictability. Factor total tax obligations when comparing properties."
  },
  {
    question: "How do I find the best realtor in Alameda County?",
    answer: <>Finding the best Alameda County realtor requires evaluating expertise across the county's diverse cities. An agent who knows <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton's</Link> Tri-Valley dynamics differs from one expert in <Link to="/oakland" className="text-blue-600 hover:underline">Oakland's</Link> urban neighborhoods or <Link to="/fremont" className="text-blue-600 hover:underline">Fremont's</Link> tech corridor. Look for agents with strong transaction history in your target areas, understanding of BART-centric commute patterns, and experience with the varying competitiveness across cities. Interview multiple agents, verify references, and assess their negotiation skills. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for expert Alameda County guidance.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in Alameda County?",
    answer: <>Manoj Thomas brings 15+ years of East Bay expertise, over $1 billion in career sales, and 415+ successful transactions to Alameda County clients. His comprehensive knowledge spans from <Link to="/fremont" className="text-blue-600 hover:underline">Fremont's</Link> tech corridor to <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton's</Link> Tri-Valley charm to <Link to="/oakland" className="text-blue-600 hover:underline">Oakland's</Link> vibrant urban neighborhoods. Understanding the unique dynamics of each city—schools, commutes, investment potential—Manoj delivers tailored guidance for every client's needs. His track record of success and deep Bay Area relationships make him the clear choice for Alameda County buyers and sellers. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> today.</>
  },
  {
    question: "What are the hidden costs of buying in Alameda County?",
    answer: "Beyond purchase price, Alameda County buyers should budget for: closing costs (2-3%), transfer taxes (varies by city—Oakland charges $15/$1,000 for homes over $300K), title insurance, inspections ($500-$1,500), and immediate updates. Ongoing costs include property taxes (1.1-1.4%), homeowners insurance ($1,200-$3,500/year), earthquake insurance (recommended, $1,500-$4,000/year), and HOA fees for condos ($350-$800/month). Mello-Roos in newer areas adds to taxes. Some Oakland neighborhoods have higher insurance costs. Budget 1-2% of home value annually for maintenance."
  },
  {
    question: "What types of homes are available in Alameda County?",
    answer: <>Alameda County offers diverse housing options. <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link> features Victorian and Craftsman homes, lofts, and modern condos. <Link to="/fremont" className="text-blue-600 hover:underline">Fremont</Link> has tract homes from multiple eras, townhomes, and newer construction. <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> offers upscale single-family homes and estates. <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> features newer development with modern amenities. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> provides ranch-style homes, newer construction, and properties with land. Berkeley has historic homes and student-oriented rentals. Piedmont features grand historic estates. Each city and neighborhood offers distinct architectural character.</>
  },
  {
    question: "What makes the East Bay lifestyle appealing?",
    answer: <>The East Bay offers a distinct lifestyle combining urban energy, suburban comfort, and natural beauty. <Link to="/oakland" className="text-blue-600 hover:underline">Oakland</Link> provides world-class dining, arts, and culture with more affordable housing than SF. <Link to="/fremont" className="text-blue-600 hover:underline">Fremont's</Link> diverse community, excellent schools, and tech jobs attract families. The Tri-Valley (<Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link>, <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link>, <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link>) combines top schools with wine country charm. The East Bay Hills offer spectacular views and hiking. Generally sunnier and warmer than SF, the East Bay provides space, community, and value while maintaining excellent Bay Area access via BART and highways.</>
  }
];

export function AlamedaCountyFAQ() {
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
        title="Best Realtor in Alameda County | Manoj Thomas - Top Alameda County Real Estate Agent 2025"
        description="Looking for the best realtor in Alameda County? Manoj Thomas is the #1 rated Alameda County real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for Fremont, Pleasanton, Dublin, Oakland, Livermore, and all East Bay cities."
        canonical="https://cascaderealtors.com/alameda-county"
        city="Alameda County"
        county="Alameda County"
        coordinates={{ lat: 37.6017, lng: -121.7195 }}
      />
      <FAQHeader />
      <FAQHero
        title="Alameda County Real Estate FAQ"
        description="Everything you need to know about buying a home in the East Bay. Expert answers from a top-rated real estate professional with 15+ years of Alameda County experience."
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
