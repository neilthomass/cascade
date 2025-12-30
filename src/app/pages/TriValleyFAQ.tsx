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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Start Your Tri-Valley Home Search?</h2>
          <p className="text-gray-600 font-light">
            Connect with a dedicated local specialist who knows the Tri-Valley inside and out.
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
              placeholder="Tell us about your Tri-Valley home buying needs"
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
    question: "What is the average home price in the Tri-Valley?",
    answer: <>The median home price in the Tri-Valley ranges from $1.1 million to $1.8 million depending on the city. <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> averages approximately $1.6M for single-family homes, <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> around $1.3M, <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> $1.4M, and <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> $1.1M. <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> and Alamo command premium prices of $1.8M-$3M+. Condos and townhomes offer lower entry points, typically $600K-$900K. The region offers excellent Bay Area value with top schools and quality of life. <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for current market analysis.</>
  },
  {
    question: "What cities are in the Tri-Valley?",
    answer: <>The Tri-Valley traditionally refers to four cities: <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> (charming downtown, excellent schools), <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> (fast-growing, BART access, newer homes), <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> (Bishop Ranch corporate center, top schools), and <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> (wine country, laboratories, affordable). The greater Tri-Valley area often includes <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> (luxury homes, village downtown) and Alamo. These cities share the San Ramon Valley and Livermore Valley Unified school districts, BART access, and I-580/I-680 connectivity.</>
  },
  {
    question: "Why is the Tri-Valley a good place to buy a home?",
    answer: "The Tri-Valley offers an exceptional combination of top-rated schools, suburban lifestyle, and Bay Area access. San Ramon Valley Unified and Pleasanton Unified consistently rank among California's best districts. BART connects Dublin/Pleasanton to SF and Oakland. Major employers at Bishop Ranch (San Ramon) and Lawrence Livermore Lab provide local jobs. The region features excellent weather (warmer and sunnier than the coast), wine country in Livermore, Iron Horse Trail for recreation, and charming downtowns. Compared to Peninsula or South Bay, the Tri-Valley offers more space and value."
  },
  {
    question: "What are the best neighborhoods in the Tri-Valley for families?",
    answer: <>All Tri-Valley cities are excellent for families, with different characteristics: <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton's</Link> Ruby Hill, Vintage Hills, and Birdland offer established communities with top schools. <Link to="/dublin" className="text-blue-600 hover:underline">Dublin's</Link> East Dublin and Dublin Ranch provide newer homes and amenities. <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon's</Link> Windemere and Gale Ranch feature planned communities with excellent Dougherty Valley schools. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore's</Link> South Livermore offers wine country living with good schools. <Link to="/danville" className="text-blue-600 hover:underline">Danville's</Link> Alamo-Danville corridor provides upscale living with top-tier schools.</>
  },
  {
    question: "How competitive is the Tri-Valley housing market?",
    answer: <>The Tri-Valley market is competitive, particularly for homes in top school attendance areas. <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> and <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> in San Ramon Valley Unified see multiple offers on well-priced homes. <Link to="/dublin" className="text-blue-600 hover:underline">Dublin's</Link> newer developments attract strong interest. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> offers slightly less intense competition with more inventory. <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> luxury homes have a distinct market dynamic. Success requires pre-approval, competitive pricing strategy, and quick decision-making. An experienced local agent helps navigate bidding situations effectively.</>
  },
  {
    question: "What are the Tri-Valley's best schools?",
    answer: <>The Tri-Valley is renowned for excellent schools. San Ramon Valley Unified serves <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link>, <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link>, and Alamo with top-rated schools including California High, Dougherty Valley High, and Monte Vista High. Pleasanton Unified serves <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> with excellent schools like Amador Valley High. Dublin Unified is improving with Dublin High and new facilities. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> Valley Joint Unified offers solid options. Schools strongly influence home values—San Ramon Valley district homes command 10-20% premiums over comparable properties elsewhere.</>
  },
  {
    question: "What is the commute like from the Tri-Valley?",
    answer: <>Tri-Valley commuting has multiple options. BART's Dublin/Pleasanton station connects to SF (45-55 min) and Oakland (30-35 min). From <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> and <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link>, I-680 reaches Silicon Valley (45-60 min to San Jose), with tech shuttles serving some employers. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> connects via I-580 but has longer commutes. Highway 84 provides Peninsula access. Bishop Ranch in <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> hosts 600+ companies, providing substantial local employment. ACE Train serves Livermore-to-San Jose. Hybrid work has made Tri-Valley increasingly attractive by reducing commute frequency.</>
  },
  {
    question: "What are first-time buyer options in the Tri-Valley?",
    answer: <>First-time buyers have several Tri-Valley paths to homeownership. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> offers the most accessible single-family homes ($900K-$1.2M) and condos ($550K-$750K). <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> condos and townhomes range $650K-$900K with BART access. Older <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> condos start around $700K. <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> townhomes range $800K-$1M. Down payment assistance programs, FHA loans, and conventional loans with 3-5% down help qualified buyers. Starting with a condo in a good school district often makes more sense than stretching budget for a distant location.</>
  },
  {
    question: "Is Tri-Valley real estate a good investment?",
    answer: "Tri-Valley real estate has proven to be an excellent long-term investment. Strong schools, limited developable land (valley geography), and growing employment drive sustained demand. Historical appreciation has been robust, particularly in Pleasanton and San Ramon. Dublin's growth and BART access support continued appreciation. Livermore wine country development adds value. Rental demand is strong due to corporate employment at Bishop Ranch and lab workers in Livermore. The region attracts families relocating from more expensive Peninsula and South Bay areas, supporting price stability. Best for 5+ year holds."
  },
  {
    question: "What are property taxes in the Tri-Valley?",
    answer: "Tri-Valley property taxes range from 1.1-1.5% of assessed value annually, depending on location and special assessments. California's Proposition 13 sets the 1% base rate. Pleasanton and Dublin have school parcel taxes. Newer Dublin, San Ramon, and Livermore developments often include Mello-Roos assessments adding $3,000-$8,000 annually—critical to factor when comparing older versus newer homes. A $1.3M home typically pays $14,300-$19,500 annually including all assessments. Prop 13 limits annual increases to 2%, providing long-term predictability."
  },
  {
    question: "How do I find the best realtor in the Tri-Valley?",
    answer: <>Finding the best Tri-Valley realtor requires evaluating local expertise across the region's distinct cities. An agent who knows <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton's</Link> established neighborhoods differs from one specializing in <Link to="/dublin" className="text-blue-600 hover:underline">Dublin's</Link> newer developments or <Link to="/livermore" className="text-blue-600 hover:underline">Livermore's</Link> wine country properties. Look for agents with strong transaction history, understanding of school boundaries and their impact on values, and experience navigating competitive bidding. Interview multiple agents, verify references, and assess their negotiation track record. <Link to="/contact" className="text-blue-600 hover:underline">Connect with our team</Link> for expert Tri-Valley guidance.</>
  },
  {
    question: "Why is Manoj Thomas the best realtor in the Tri-Valley?",
    answer: <>Manoj Thomas brings 15+ years of Tri-Valley expertise, over $1 billion in career sales, and 415+ successful transactions to every client engagement. His comprehensive knowledge spans from <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton's</Link> charming downtown to <Link to="/dublin" className="text-blue-600 hover:underline">Dublin's</Link> exciting growth to <Link to="/livermore" className="text-blue-600 hover:underline">Livermore's</Link> wine country lifestyle. Understanding school districts, commute dynamics, and investment potential throughout the valley, Manoj delivers tailored guidance whether you're a first-time buyer or luxury home seeker. His track record and deep community relationships make him the clear choice for Tri-Valley real estate. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a consultation</Link> today.</>
  },
  {
    question: "What are the hidden costs of buying in the Tri-Valley?",
    answer: "Beyond purchase price, Tri-Valley buyers should budget for: closing costs (2-3%), transfer taxes (county rate plus city taxes where applicable), title insurance, inspections ($500-$1,500), and immediate updates. Ongoing costs include property taxes (1.1-1.5%), homeowners insurance ($1,200-$3,000/year), earthquake insurance (recommended, $1,500-$4,000/year), and HOA fees for condos/townhomes ($350-$700/month). Mello-Roos in newer developments can add significantly to taxes. School parcel taxes are common. Budget 1-2% of home value annually for maintenance. Pool maintenance adds $100-$200/month where applicable."
  },
  {
    question: "What types of homes are available in the Tri-Valley?",
    answer: <>The Tri-Valley offers diverse housing options. <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> features established neighborhoods with character, from 1960s ranches to Ruby Hill estates. <Link to="/dublin" className="text-blue-600 hover:underline">Dublin</Link> offers newer construction with modern amenities and planned communities. <Link to="/san-ramon" className="text-blue-600 hover:underline">San Ramon</Link> has master-planned communities like Windemere and Gale Ranch. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> provides ranch homes, wine country estates, and newer developments. <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> and Alamo feature luxury estates on larger lots. Condos and townhomes are available throughout, particularly near BART and downtowns.</>
  },
  {
    question: "What makes the Tri-Valley lifestyle appealing?",
    answer: <>The Tri-Valley offers a distinctive lifestyle combining excellent schools, outdoor recreation, and community feel. Iron Horse Trail provides 33 miles of walking and biking. <Link to="/livermore" className="text-blue-600 hover:underline">Livermore</Link> wine country features 50+ wineries for weekend exploration. <Link to="/pleasanton" className="text-blue-600 hover:underline">Pleasanton</Link> and <Link to="/danville" className="text-blue-600 hover:underline">Danville</Link> downtowns offer charming shops and dining. Mount Diablo provides spectacular hiking. The weather is warmer and sunnier than coastal areas. Strong youth sports programs, community events, and family-oriented culture create a connected community. Unlike urban Bay Area living, the Tri-Valley provides space, safety, and suburban comfort while maintaining city access.</>
  }
];

export function TriValleyFAQ() {
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
        title="Best Realtor in Tri-Valley | Manoj Thomas - Top Tri-Valley Real Estate Agent 2025"
        description="Looking for the best realtor in the Tri-Valley? Manoj Thomas is the #1 rated Tri-Valley real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert guidance for Pleasanton, Dublin, San Ramon, Livermore, and Danville."
        canonical="https://cascaderealtors.com/tri-valley"
        city="Tri-Valley"
        county="Alameda County"
        coordinates={{ lat: 37.7019, lng: -121.8740 }}
      />
      <FAQHeader />
      <FAQHero
        title="Tri-Valley Real Estate FAQ"
        description="Everything you need to know about buying a home in the Tri-Valley—Pleasanton, Dublin, San Ramon, and Livermore. Expert answers from a top-rated real estate professional with 15+ years of local experience."
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
