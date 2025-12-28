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
            Get personalized guidance from a local expert with 15+ years of Bay Area experience.
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
    question: "What is the average home price in Pleasanton?",
    answer: "The median home price in Pleasanton is approximately $1.6 million as of 2024. This reflects the city's exceptional school district, desirable location in the Tri-Valley, and family-friendly atmosphere. Prices vary by neighborhood—from around $1.2 million for townhomes to $3 million or more for larger estates in areas like Ruby Hill. Compared to nearby South Bay cities, Pleasanton offers excellent value for the quality of schools and lifestyle amenities."
  },
  {
    question: "Is Pleasanton a good investment for homebuyers in 2025?",
    answer: "Pleasanton represents outstanding value for homebuyers in 2025, especially compared to the South Bay. With a median home price of $1.6 million versus $2+ million in Palo Alto or Los Gatos, you get significantly more house and land. The city's top-rated Pleasanton Unified School District, low crime rates, and strong community make it highly desirable for families. Long-term appreciation has been steady, and remote work trends have increased demand for Tri-Valley homes with more space."
  },
  {
    question: "What makes Pleasanton schools so highly rated?",
    answer: "Pleasanton Unified School District consistently ranks among California's best public school systems. The district features multiple National Blue Ribbon schools, excellent test scores averaging in the top 10% statewide, comprehensive STEM programs, and robust arts and athletics. High schools like Amador Valley and Foothill regularly send graduates to top universities. Small class sizes and strong parent involvement create an outstanding educational environment that drives home values."
  },
  {
    question: "What is downtown Pleasanton like?",
    answer: "Downtown Pleasanton offers charming small-town appeal with tree-lined streets, boutique shops, farm-to-table restaurants, and weekly farmers markets. Main Street features historic buildings alongside modern amenities, creating a walkable, community-focused atmosphere. Popular spots include the Firehouse Arts Center, numerous wine-tasting rooms, and family-friendly events year-round. The downtown area perfectly balances suburban comfort with urban sophistication—a major draw for families seeking quality of life."
  },
  {
    question: "How close is Pleasanton to wine country?",
    answer: "Pleasanton is ideally located just minutes from Livermore Valley Wine Country, one of California's premier wine regions with 50+ wineries and tasting rooms. You can reach most Livermore wineries in 10-15 minutes, making weekend wine tasting incredibly convenient. Pleasanton itself has several tasting rooms downtown, and the region hosts events like Harvest Wine Celebration and Restaurant Week. This proximity to wine country adds tremendous lifestyle value without the tourist crowds of Napa."
  },
  {
    question: "What is Ruby Hill and why is it desirable?",
    answer: "Ruby Hill is Pleasanton's premier golf course community, featuring an award-winning 18-hole championship course designed by Jack Nicklaus' Golden Bear Golf. The neighborhood offers luxury homes ranging from $1.8M to $4M+, many with golf course views and upscale amenities. Residents enjoy clubhouse dining, tennis courts, swimming pools, and a tight-knit community. The location on Pleasanton's western edge provides easy access to I-680 while maintaining a secluded, resort-like atmosphere."
  },
  {
    question: "Does Pleasanton have BART access?",
    answer: "Yes, Pleasanton has two BART stations: West Dublin/Pleasanton and Dublin/Pleasanton stations on the Blue Line. This provides direct access to San Francisco (45-55 minutes), Oakland (25-30 minutes), and Silicon Valley via connecting transit. The BART access makes Pleasanton attractive for commuters who want suburban living with urban connectivity. Park-and-ride facilities accommodate thousands of vehicles, and both stations have nearby shopping and dining options."
  },
  {
    question: "How much do I need to earn to buy a home in Pleasanton?",
    answer: "To comfortably afford Pleasanton's median home price of $1.6 million, you typically need a household income of $350,000-$450,000, assuming a 20% down payment ($320,000) and following the 28% debt-to-income guideline. Many buyers are dual-income tech professionals, executives, or small business owners. Some stretch their budgets given the exceptional schools and quality of life. First-time buyers often start with townhomes or condos in the $1-1.3M range, requiring lower income thresholds."
  },
  {
    question: "Why is Pleasanton so popular with families?",
    answer: "Pleasanton ranks as one of America's best places to raise a family due to its combination of top-rated schools, extremely low crime rates, abundant parks and recreation, and strong community culture. The city offers 50+ parks, excellent youth sports programs, family-oriented events year-round, and safe neighborhoods where kids can bike to school. The downtown area is stroller-friendly, and there are numerous family activities from the Alameda County Fairgrounds to local pools and libraries. Quality of life here is exceptional."
  },
  {
    question: "How does Pleasanton compare to other Tri-Valley cities?",
    answer: "Pleasanton is often considered the crown jewel of the Tri-Valley, alongside Dublin, San Ramon, Livermore, and Danville. It offers a perfect balance: better schools than most neighbors, more charming downtown than Dublin, more affordable than Danville, and more polished than Livermore. Median home prices are competitive with comparable quality. The city's planning has preserved its character while adding modern amenities, making it the first choice for many Bay Area families seeking suburban excellence."
  },
  {
    question: "What are the property taxes in Pleasanton?",
    answer: "Pleasanton property taxes run approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and Mello-Roos assessments in newer developments. For a $1.6M home, expect around $17,600-$19,200 yearly. Prop 13 protects longtime owners by capping annual increases at 2%, but new buyers are assessed at purchase price. Some Ruby Hill and newer neighborhoods have additional HOA fees. Overall, tax rates are competitive with other high-quality Bay Area suburbs."
  },
  {
    question: "What are the commute options from Pleasanton?",
    answer: "Pleasanton offers excellent commute flexibility. BART provides direct access to San Francisco and East Bay employment centers. I-580 connects to Oakland and Silicon Valley, while I-680 reaches San Jose in 35-45 minutes without traffic. Many residents work remotely, reducing commute concerns. The ACE Train serves long-distance commuters to South Bay. Reverse commutes to Livermore Labs or East Bay are particularly easy. Traffic is manageable compared to Peninsula routes, making Pleasanton ideal for professionals seeking work-life balance."
  },
  {
    question: "Are there any first-time homebuyer programs in Pleasanton?",
    answer: "While Pleasanton doesn't have city-specific programs given its higher price point, buyers can access California and federal assistance. CalHFA offers down payment assistance and below-market-rate loans. Federal programs include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with 3% down for first-timers. Some employers in the Bay Area offer housing assistance or equity programs. A knowledgeable local agent can guide you through available options and lender connections to make Pleasanton more accessible."
  },
  {
    question: "What is the Pleasanton lifestyle like?",
    answer: "Pleasanton offers an upscale suburban lifestyle with small-town charm. Residents enjoy weekend farmers markets, downtown dining, wine tasting in Livermore Valley, youth sports on impeccable fields, and community events like the Scottish Highland Games and Alameda County Fair. The city balances family focus with sophistication—yoga studios, boutique fitness, craft breweries, and farm-to-table restaurants complement traditional parks and schools. It's a place where neighbors know each other, kids bike safely, and quality of life takes priority."
  },
  {
    question: "What types of homes are available in Pleasanton?",
    answer: "Pleasanton offers diverse housing stock including: single-family homes on quarter-acre+ lots ($1.5-3M+), luxury estates in Ruby Hill and gated communities ($2-5M+), newer planned developments with modern amenities ($1.6-2.5M), townhomes and condos ($900K-1.4M), and some older ranch homes with remodel potential ($1.3-1.8M). Most homes feature yards, attached garages, and updated interiors. Architectural styles range from California ranch to Mediterranean and contemporary. Inventory is typically limited, making this a competitive market."
  },
  {
    question: "How safe is Pleasanton?",
    answer: "Pleasanton consistently ranks as one of California's safest cities, with violent crime rates 70% below the national average. The city's well-funded police department, active neighborhood watch programs, and community engagement contribute to exceptional safety. Property crime is also significantly lower than state averages. Schools have strong safety protocols, and parks and recreation areas are well-maintained and monitored. This safety record is a primary reason families choose Pleasanton despite higher home prices—peace of mind is invaluable."
  },
  {
    question: "What should I know about HOA fees in Pleasanton?",
    answer: "HOA fees in Pleasanton vary widely by property type. Condos and townhomes typically charge $300-$600 monthly for landscaping, common area maintenance, insurance, and reserves. Planned developments may have $100-$250 monthly fees covering neighborhood amenities like pools, playgrounds, and landscaping. Ruby Hill golf community has higher fees ($400-$700+) including club access. Single-family homes in older neighborhoods often have no HOA. Always review HOA financials, CC&Rs, and meeting minutes before purchasing to understand obligations and community governance."
  },
  {
    question: "Why should I choose Pleasanton over South Bay cities?",
    answer: "Pleasanton offers better value than comparable South Bay cities—for $1.6M in Pleasanton, you get significantly more house and land than in Palo Alto, Los Gatos, or Saratoga. School quality is equally excellent, crime is lower, and you avoid crushing traffic and density. You gain larger yards, newer homes, better parking, and genuine community feel. The trade-off is a slightly longer commute to some tech campuses, but with remote work flexibility and BART access, many families find Pleasanton's superior quality of life worth it."
  },
  {
    question: "What questions should I ask when buying in Pleasanton?",
    answer: "Essential questions for Pleasanton home purchases include: 1) Which school attendance boundaries does the home fall within? 2) Are there any Mello-Roos or special assessments? 3) What's included in HOA fees if applicable? 4) Has the home been updated (many are 20-30 years old)? 5) What's the neighborhood character and demographics? 6) How close is BART or freeway access? 7) Are there any planned developments nearby? 8) What's the seller's timeline and motivation? 9) What are comparable recent sales? Your agent should help investigate each thoroughly."
  },
  {
    question: "How do I choose the right real estate agent in Pleasanton?",
    answer: "Choose a Pleasanton agent based on: deep local expertise (they should know school boundaries, neighborhood nuances, and market trends intimately), transaction volume in Pleasanton specifically (10+ deals per year), references from families who've bought here, knowledge of the Tri-Valley, and strong negotiation skills. Interview 2-3 agents before deciding. Look for someone who understands what drives Pleasanton's market—schools, family amenities, value proposition versus South Bay—and can guide you to the right neighborhood for your needs and budget."
  }
];

export function PleasantonFAQ() {
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
        title="Pleasanton Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your Pleasanton real estate questions. Learn about home prices, schools, neighborhoods, and buying in Pleasanton from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/pleasanton-faq"
        city="Pleasanton"
        coordinates={{ lat: 37.6624, lng: -121.8747 }}
      />
      <FAQHeader />
      <FAQHero
        title="Pleasanton Real Estate FAQ"
        description="Everything you need to know about buying a home in Pleasanton. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="pleasanton" />

      <Footer />
    </div>
  );
}
