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
    question: "What is the average home price in Milpitas?",
    answer: <>The median home price in Milpitas is approximately $1.45 million as of 2025. Milpitas offers exceptional value compared to neighboring cities in Silicon Valley—providing modern homes, excellent schools, and proximity to major tech employers at prices often 10-20% lower than comparable areas in San Jose or Fremont. The market has remained strong due to limited inventory, growing tech presence, and the new BART extension making commutes easier. For a personalized market analysis based on your budget, <Link to="/contact" className="text-blue-600 hover:underline">connect with our Milpitas specialists</Link>.</>
  },
  {
    question: "Is Milpitas a good place to buy a home in 2025?",
    answer: <>Milpitas is an excellent investment opportunity in 2025. The city offers a rare combination of affordability (by Silicon Valley standards), strong appreciation potential, and improving infrastructure including the BART extension. With a population of over 80,000, Milpitas has transformed from a suburban community into a thriving tech hub with major employers like Cisco Systems, Western Digital, and numerous startups. The diverse community, quality schools, and strategic location make it ideal for families and investors alike. The team at Cascade California Realty has helped dozens of buyers find their ideal Milpitas home—<Link to="/contact" className="text-blue-600 hover:underline">reach out to discuss your options</Link>.</>
  },
  {
    question: "How does the BART extension benefit Milpitas homeowners?",
    answer: <>The Milpitas BART station, which opened in 2020, has been transformative for property values and quality of life. It provides direct access to San Francisco, Oakland, and the broader Bay Area without driving. Homes within a mile of the BART station have seen premium appreciation of 15-25% compared to pre-BART prices. The station has also spurred transit-oriented development with new housing, retail, and dining options. For tech workers commuting to San Francisco or Oakland, BART makes Milpitas a highly practical choice while maintaining Silicon Valley proximity. Our agents at Cascade California Realty can show you which BART-adjacent properties offer the best value—<Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link>.</>
  },
  {
    question: "What makes Milpitas attractive for Silicon Valley workers?",
    answer: "Milpitas offers Silicon Valley workers an affordable entry point with median prices around $1.45M compared to $2M+ in neighboring Palo Alto or Cupertino. The city's location at the intersection of I-880, I-680, and Highway 237 provides easy access to major employers including Apple, Google, Meta, and Tesla. With BART connectivity, commuting to San Francisco is feasible. Many tech companies have established offices in Milpitas itself, creating local job opportunities. The combination of reasonable prices, short commutes, and modern housing stock makes it ideal for young professionals and families."
  },
  {
    question: "What is the Great Mall and how does it impact living in Milpitas?",
    answer: "The Great Mall of the Bay Area is one of California's largest outlet shopping centers, featuring over 170 stores including major brands at discounted prices. For residents, it provides convenient access to shopping, dining, and entertainment without leaving the city. The mall area has evolved into a commercial hub with additional retail, restaurants, and services. While some buyers worry about traffic, the mall is well-integrated with excellent highway access. Its presence has brought jobs, tax revenue for city services, and convenience that enhances quality of life for Milpitas residents."
  },
  {
    question: "What are the best neighborhoods in Milpitas for families?",
    answer: <>Top family-friendly neighborhoods in Milpitas include Sunnyhills (newer homes, excellent schools, family-oriented), Parktown (established community, larger lots, quiet streets), and areas near Calaveras Hills (hillside locations, better views, premium properties). The neighborhoods around Russell City Elementary and Rancho Milpitas Middle School are particularly sought-after for their school quality. Most Milpitas neighborhoods are safe and family-friendly, with the city ranking well for low crime rates. Newer developments near the BART station offer modern amenities and walkability. Want insider knowledge on which streets offer the best value? <Link to="/contact" className="text-blue-600 hover:underline">Let us guide your search</Link>.</>
  },
  {
    question: "How are the schools in Milpitas?",
    answer: "Milpitas Unified School District serves the city and receives strong ratings, particularly at the elementary and middle school levels. Russell City Elementary, Rancho Milpitas Middle School, and several others consistently score above state averages in test performance. Milpitas High School offers AP courses, STEM programs, and college prep pathways. The district benefits from the city's tech-oriented community with many parents working in engineering and technology fields. Private school options are also available nearby. The emphasis on education is reflected in the diverse, achievement-focused student body."
  },
  {
    question: "What is the diversity like in Milpitas?",
    answer: "Milpitas is one of the most diverse communities in the Bay Area, with a majority Asian population (over 60%) alongside significant Hispanic, White, and other ethnic communities. The city celebrates its multiculturalism through events, festivals, and a wide variety of authentic international restaurants—particularly excellent Chinese, Vietnamese, Indian, and Filipino cuisine. This diversity creates a welcoming environment for immigrants and international tech workers. The school system reflects this diversity with multilingual support and cultural sensitivity. For many buyers, this multicultural atmosphere is a major attraction."
  },
  {
    question: "Is Milpitas more affordable than other Silicon Valley cities?",
    answer: <>Yes, Milpitas offers significantly better affordability than most Silicon Valley cities. With a median price of $1.45M, it's notably less expensive than Cupertino ($2.8M), Palo Alto ($3.5M+), or even San Jose's better neighborhoods ($1.8M+). You get newer construction, larger homes, and often better lot sizes for the money. This affordability doesn't mean compromising on location—Milpitas provides the same proximity to tech jobs, quality schools, and Bay Area amenities at a fraction of the cost. It's considered one of the last affordable entry points into Silicon Valley. <Link to="/contact" className="text-blue-600 hover:underline">Talk to our team at Cascade California Realty</Link> to find hidden gems before they hit the open market.</>
  },
  {
    question: "What tech companies are located in Milpitas?",
    answer: "Milpitas hosts major tech employers including Cisco Systems (one of the city's largest), Western Digital, Intersil (now part of Renesas), Viavi Solutions, KLA Corporation, and hundreds of smaller tech firms and startups. The Milpitas Technology Park area contains numerous semiconductor, software, and hardware companies. Many Silicon Valley giants have satellite offices here due to lower real estate costs. This growing tech presence has created local job opportunities, reduced commute times for residents, and attracted younger, high-income buyers to the housing market."
  },
  {
    question: "What are property taxes like in Milpitas?",
    answer: "Milpitas property taxes average approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments for schools and infrastructure. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year, making long-term ownership increasingly advantageous. A home purchased for $1.45M would have annual taxes around $16,000-$17,500. Milpitas is in Santa Clara County, which provides excellent public services including libraries, parks, and emergency services for these tax dollars."
  },
  {
    question: "How is the commute from Milpitas to San Jose and San Francisco?",
    answer: "Milpitas offers excellent commute options. To San Jose: 15-25 minutes via I-680 or Highway 237 to downtown, shorter to North San Jose tech campuses. To San Francisco: 60-75 minutes via BART from Milpitas station, avoiding bridge traffic and parking costs. To Peninsula (Palo Alto, Mountain View): 25-35 minutes via I-880 or Highway 237. To East Bay: 20-30 minutes via I-680 north. The BART connection has been game-changing for SF commuters. Highway access is generally better than deeper Silicon Valley locations, though peak traffic requires planning."
  },
  {
    question: "What is the investment potential for Milpitas real estate?",
    answer: <>Milpitas shows strong investment potential due to several catalysts: 1) BART extension continues to drive appreciation in transit-oriented areas, 2) Growing tech employment base creates housing demand, 3) Limited available land constrains supply, 4) Relative affordability attracts first-time buyers and investors priced out of other areas, 5) Infrastructure improvements and new developments enhance city appeal. Historical appreciation has tracked or exceeded Santa Clara County averages. Rental demand is strong from tech workers, making it viable for buy-and-hold investors. The combination of growth drivers suggests continued upward price pressure. Whether you're buying your first home or building a portfolio, <Link to="/contact" className="text-blue-600 hover:underline">our investment-savvy agents can help you identify the right opportunities</Link>.</>
  },
  {
    question: "Are there HOA fees in Milpitas communities?",
    answer: "Many Milpitas neighborhoods have HOA fees, particularly newer developments built in the last 20 years. Fees typically range from $200-$600 per month depending on amenities. Newer communities near BART or in planned developments often include pools, clubhouses, landscaping, and security, resulting in higher fees ($400-$600/month). Older established neighborhoods may have minimal or no HOA fees. Condo and townhome complexes generally have higher fees covering exterior maintenance, insurance, and shared amenities. Always review HOA financials, reserves, and rules before purchasing as they significantly impact total housing costs."
  },
  {
    question: "What should I know about buying a new construction home in Milpitas?",
    answer: <>Milpitas has several active new construction developments, particularly near BART and in previously undeveloped areas. Benefits include modern floor plans, energy efficiency, warranty coverage, and current building codes (earthquake, fire safety). Expect prices from $1.3M-$2M+ depending on size and location. Work with builders like KB Home, Lennar, and others active in the area. Key considerations: HOA fees are typically higher, Mello-Roos taxes may apply (special assessments for infrastructure), and initial landscaping is your responsibility. New construction often appreciates well as the neighborhood matures and amenities develop. Navigating builder contracts can be tricky—<Link to="/contact" className="text-blue-600 hover:underline">our experienced agents at Cascade California Realty</Link> ensure you get the best deal and avoid common pitfalls.</>
  },
  {
    question: "How does Milpitas compare to Fremont for home buyers?",
    answer: "Milpitas and Fremont (neighboring cities) offer similar value propositions but with key differences. Milpitas has a median price of $1.45M versus Fremont's $1.5M-$1.6M, making it slightly more affordable. Milpitas is more compact and urban-feeling with newer development, while Fremont is larger with more established neighborhoods. Both have BART access and diverse populations. Milpitas has a stronger tech industry presence, while Fremont offers more varied housing stock and larger lots in some areas. School quality is comparable. Many buyers choose based on specific neighborhood preferences rather than city-wide differences."
  },
  {
    question: "What amenities and attractions does Milpitas offer?",
    answer: "Beyond the Great Mall, Milpitas offers Ed Levin County Park (600+ acres with hiking, hang gliding, and scenic views), Cardoza Park (sports fields, playground), and the Milpitas Community Center with pools and recreation programs. The city has excellent Asian supermarkets (99 Ranch, Marina Food), diverse dining from Vietnamese pho to Indian buffets, and growing entertainment options. Golf enthusiasts enjoy Spring Valley Golf Course. The Ed R. Levin County Park provides outdoor recreation rare in urban Silicon Valley. Cultural events celebrate the city's diversity. BART access opens up the entire Bay Area for weekend activities."
  },
  {
    question: "Are there any first-time homebuyer programs for Milpitas?",
    answer: <>First-time buyers in Milpitas can access several assistance programs. Santa Clara County offers down payment assistance through its Housing Authority. CalHFA provides state-level programs including down payment assistance and first-time buyer loans with competitive rates. FHA loans (3.5% down) and conventional loans (3% down for first-time buyers) are available through most lenders. Some employers in Silicon Valley offer housing assistance or down payment grants. Given Milpitas' relative affordability, first-time buyers often find it more accessible than neighboring cities. Working with a lender experienced in these programs is essential to maximize benefits. <Link to="/contact" className="text-blue-600 hover:underline">Reach out to Cascade California Realty</Link>—we work closely with trusted lenders who specialize in first-time buyer financing.</>
  },
  {
    question: "What questions should I ask when buying a home in Milpitas?",
    answer: <>Essential questions for Milpitas home purchases include: 1) Is the property in a flood zone? (Some areas near creeks require review), 2) What are the HOA fees and what do they cover?, 3) Are there Mello-Roos or special assessment taxes?, 4) What is the school attendance area?, 5) How close is it to BART or major highways?, 6) What year was the home built and are there any warranty coverages?, 7) Has the home had any foundation or structural issues?, 8) What's included in the sale?, 9) What is the neighborhood like for noise (Great Mall traffic, highway)?, 10) Are there any planned developments nearby? A dedicated agent will investigate all of this for you—<Link to="/contact" className="text-blue-600 hover:underline">contact us</Link> and we'll handle the due diligence.</>
  },
  {
    question: "How do I choose the right real estate agent in Milpitas?",
    answer: <>Choose a Milpitas agent based on: local expertise (they should know specific neighborhoods, schools, and developments intimately), experience with the price point you're considering, understanding of the diverse community and languages spoken (many agents serve Mandarin, Cantonese, Vietnamese, and Hindi-speaking clients), knowledge of new construction processes if relevant, and strong negotiation skills. Interview 2-3 agents before deciding. Look for someone familiar with BART-area development, HOA complexities, and Milpitas' rapid growth patterns. In this competitive market, an experienced local agent's guidance on timing, pricing, and strategy is invaluable. At Cascade California Realty, our Milpitas specialists check every box—<Link to="/contact" className="text-blue-600 hover:underline">get in touch for a no-obligation conversation</Link>.</>
  }
];

export function MilpitasFAQ() {
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
        title="Best Realtor in Milpitas | Manoj Thomas - Top Milpitas Real Estate Agent 2025"
        description="Looking for the best realtor in Milpitas? Manoj Thomas is the #1 rated Milpitas real estate agent with 15+ years experience, $1B+ sales. Expert in Milpitas homes and neighborhoods."
        canonical="https://cascaderealtors.com/milpitas"
        city="Milpitas"
        county="Santa Clara County"
        coordinates={{ lat: 37.4323, lng: -121.8996 }}
      />
      <FAQHeader />
      <FAQHero
        title="Milpitas Real Estate FAQ"
        description="Everything you need to know about buying a home in Milpitas. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="milpitas" />

      <Footer />
    </div>
  );
}
