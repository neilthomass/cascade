import { ChevronDown, Phone, Mail, ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { RelatedCities } from '../components/RelatedCities';

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
    question: "What is the average home price in Hayward?",
    answer: "The median home price in Hayward is approximately $950,000 as of 2025, making it one of the most affordable BART-accessible cities in the Bay Area. This represents excellent value compared to neighboring communities—often 30-40% less expensive than Fremont or Union City. Prices vary by neighborhood, with Hayward Hills commanding premium prices around $1.2-1.5M, while flats and other areas offer entry points from $700,000-$900,000 for single-family homes."
  },
  {
    question: "Is Hayward a good investment for real estate in 2025?",
    answer: "Hayward presents compelling investment potential in 2025. The city offers the Bay Area affordability advantage with BART connectivity, making it attractive as housing costs push buyers eastward. Downtown Hayward is undergoing significant revitalization with new mixed-use developments and improved amenities. The proximity to Cal State East Bay brings steady rental demand, and major employers in the East Bay continue to expand. With a median price of $950,000 versus $1.35M in San Francisco, Hayward offers strong appreciation potential as the region grows."
  },
  {
    question: "What is the downtown Hayward revitalization about?",
    answer: "Downtown Hayward is experiencing a major transformation with over $1 billion in new development. The city has invested heavily in creating a walkable urban core with new restaurants, breweries, arts venues, and mixed-use housing. The Hayward BART station area is seeing particular growth with transit-oriented development. New projects include modern apartment buildings, retail spaces, and public plazas. This revitalization is attracting young professionals and families who want urban amenities at more affordable prices than Oakland or San Francisco."
  },
  {
    question: "How does Cal State East Bay impact the Hayward housing market?",
    answer: "Cal State East Bay significantly influences Hayward's real estate market by creating consistent rental demand and attracting faculty, staff, and students to the area. The university employs over 1,500 people and serves 15,000+ students, many of whom seek nearby housing. Properties near the campus are popular for both owner-occupants and investors seeking rental income. The university's presence also contributes to neighborhood stability, local businesses, and cultural amenities. Areas within 2-3 miles of campus tend to have strong rental markets and steady appreciation."
  },
  {
    question: "What are the benefits of BART access in Hayward?",
    answer: "Hayward offers two BART stations—Hayward BART and South Hayward BART—providing exceptional connectivity throughout the Bay Area. Commuters can reach downtown San Francisco in 45 minutes, Oakland in 20 minutes, and South Bay tech hubs via connecting transit. This BART access makes Hayward one of the most affordable BART-connected cities, attracting buyers who work throughout the region. Properties near BART stations command premiums and have historically shown stronger appreciation. The transit connectivity also reduces transportation costs and makes car-free or one-car living feasible."
  },
  {
    question: "What are the best neighborhoods in Hayward to buy a home?",
    answer: "Hayward's top neighborhoods vary by lifestyle and budget. Hayward Hills offers premium housing with stunning views, larger lots, and excellent schools, with prices from $1.2-1.5M. The neighborhoods near Cal State East Bay provide good value, strong rental potential, and proximity to the university's amenities. Downtown Hayward is ideal for urban-oriented buyers who want walkability and new development, with condos and townhomes from $500,000-$800,000. The Fairway Park area offers solid middle-class housing with good schools and parks. Mission-Foothill areas provide the most affordable entry points while still offering BART access."
  },
  {
    question: "What makes Hayward one of the most diverse cities in California?",
    answer: "Hayward ranks among California's most ethnically and culturally diverse cities, with significant Asian, Hispanic, Black, and White populations all well-represented. This diversity is reflected in the city's restaurants, cultural events, schools, and community organizations. Over 100 languages are spoken in Hayward Unified schools. The diversity creates a welcoming, multicultural environment and exposes residents to various traditions, cuisines, and perspectives. This cultural richness is a major draw for buyers seeking inclusive communities where their families can thrive."
  },
  {
    question: "Is Hayward good for first-time homebuyers?",
    answer: "Hayward is excellent for first-time homebuyers, offering the most affordable entry point into BART-connected Bay Area homeownership. With a median price of $950,000 versus $1.35M+ in San Francisco or Oakland, buyers can often purchase single-family homes rather than settling for condos. First-time buyers benefit from Alameda County down payment assistance programs, FHA loans with 3.5% down, and conventional loans with as little as 3% down. The diverse housing stock includes condos starting around $500,000, townhomes from $700,000, and single-family homes from $800,000+, providing options at various price points."
  },
  {
    question: "What is the school system like in Hayward?",
    answer: "Hayward is served by the Hayward Unified School District, which includes over 40 schools serving approximately 20,000 students. The district offers diverse programs including STEM academies, language immersion, and college prep pathways. Several schools have received California Distinguished School recognition. While district-wide test scores are mixed, individual schools vary significantly in performance—researching specific school attendance zones is essential. Many families also consider nearby Castro Valley Unified or private schools. The proximity to Cal State East Bay provides additional educational opportunities and resources."
  },
  {
    question: "How much do I need to earn to buy a home in Hayward?",
    answer: "To comfortably afford Hayward's median home price of $950,000, you typically need a household income of $210,000-$280,000, assuming a 20% down payment ($190,000) and following the 28% debt-to-income guideline. However, first-time buyers often qualify with less by using lower down payment programs (3-5% down) or by accepting higher debt ratios, potentially qualifying with incomes around $180,000-$200,000. Buyers should also budget for property taxes (approximately 1.2% of purchase price annually), insurance, HOA fees (for condos/townhomes), and maintenance costs."
  },
  {
    question: "What are property taxes like in Hayward?",
    answer: "Hayward property taxes are approximately 1.2-1.25% of assessed value annually, which includes the base 1% California Proposition 13 rate plus local bonds and assessments for schools and infrastructure. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation, providing long-term tax predictability. A home purchased for $950,000 would have annual property taxes around $11,400-$11,875 initially. New construction or recent major improvements may have additional Mello-Roos taxes that should be disclosed during purchase."
  },
  {
    question: "What is the commute from Hayward to San Francisco and Silicon Valley?",
    answer: "Hayward offers convenient commuting options to multiple job centers. To San Francisco: 45 minutes via BART or 40-50 minutes driving (traffic dependent) via I-880 and Bay Bridge. To Oakland: 20 minutes via BART or 25 minutes driving. To Silicon Valley: 30-40 minutes to San Jose via I-880, 25 minutes to Fremont. To Peninsula tech hubs: 35-45 minutes to Palo Alto via Dumbarton Bridge. BART access makes car-free commuting feasible for San Francisco workers. The central East Bay location provides flexibility for dual-income couples working in different areas."
  },
  {
    question: "Are there good parks and recreation options in Hayward?",
    answer: "Hayward offers excellent parks and recreation with over 40 parks totaling 600+ acres. Highlights include Garin Regional Park and Dry Creek Pioneer Regional Park, offering miles of hiking trails with stunning Bay views. The Hayward Shoreline offers birding, walking paths, and bayfront access. Hayward Japanese Gardens provides a beautiful cultural space. The city maintains numerous neighborhood parks, sports fields, and playgrounds. The Hayward Plunge is a historic indoor swimming facility. Proximity to East Bay Regional Parks provides access to thousands of additional acres for hiking, biking, and outdoor activities."
  },
  {
    question: "What are the hidden costs of buying a home in Hayward?",
    answer: "Beyond the purchase price, Hayward homebuyers should budget for: closing costs (2-3% of purchase price), property transfer tax, title insurance, inspection fees ($500-$1,500), property taxes (prorated at closing), homeowners insurance, and potential HOA fees for condos/townhomes ($250-$500+/month). Older homes may need seismic retrofitting, foundation work, or updated electrical/plumbing systems. Budget for ongoing maintenance (1-2% of home value annually). If buying near BART or major roads, consider soundproofing costs. Factor in utility costs, which can be higher for larger or older homes."
  },
  {
    question: "Is earthquake insurance necessary in Hayward?",
    answer: "Earthquake insurance is highly recommended in Hayward due to proximity to the Hayward Fault, one of the most dangerous fault lines in California. Standard homeowners insurance does NOT cover earthquake damage. The California Earthquake Authority (CEA) offers policies through participating insurers, typically costing $1,500-$3,500 annually for a $950,000 home with a 15% deductible. Given Hayward's seismic risk, many lenders and financial advisors strongly recommend coverage. When buying, ask sellers about earthquake retrofitting that may have been completed, which can reduce premiums and increase safety."
  },
  {
    question: "What should I look for when buying a home in Hayward?",
    answer: "When buying in Hayward, prioritize: foundation inspection (critical due to Hayward Fault seismic concerns), proof of earthquake retrofitting or budget for it, sewer lateral condition (older areas may need replacement), electrical systems in older homes (many need panel upgrades), BART proximity and noise considerations (some homes near tracks need soundproofing), flood zone status (parts of Hayward are in flood zones), school attendance zones if you have children, and HOA financial health for condos. Get specialized inspections for foundation, roof, and pest. Review neighborhood crime statistics and walkability scores for your specific location."
  },
  {
    question: "Can I negotiate the price on a Hayward home?",
    answer: "Negotiation possibilities in Hayward depend on market conditions and property specifics. As a more affordable Bay Area market, Hayward typically sees less intense bidding than San Francisco or Palo Alto, creating more room for negotiation. Opportunities exist with: homes on market 30+ days, properties needing repairs or updates, estate sales, sellers with specific timing needs, and during slower winter months. Even when offering list price, you can often negotiate on closing costs, repairs discovered during inspection, or included appliances/furniture. Your agent's local knowledge and negotiation skills are crucial for identifying opportunities."
  },
  {
    question: "What is the rental market like in Hayward?",
    answer: "Hayward's rental market is strong due to BART access, Cal State East Bay student demand, and affordability compared to western Bay Area cities. Single-family homes rent for $3,000-$4,500/month depending on size and location. Two-bedroom apartments average $2,500-$3,200/month. Properties near Cal State East Bay or BART stations command premium rents and have lower vacancy rates. Many investors purchase properties in Hayward for rental income, with typical gross rental yields of 3-4%. The diverse population and steady employment base create consistent rental demand across price points."
  },
  {
    question: "What are the future development plans for Hayward?",
    answer: "Hayward has ambitious development plans focused on creating a more vibrant urban core and leveraging BART connectivity. The city's Downtown Specific Plan includes over 3,000 new housing units, expanded retail/dining, office space, and public amenities near BART stations. The South Hayward BART area is also slated for transit-oriented development. Infrastructure improvements include street redesigns, new parks, and enhanced pedestrian/bike connectivity. The city is actively courting businesses and has streamlined development approvals. These investments aim to transform Hayward into a more dynamic urban center while maintaining affordability, potentially driving property appreciation for current buyers."
  },
  {
    question: "How do I choose the right real estate agent in Hayward?",
    answer: "Choose a Hayward agent based on: deep local knowledge of Hayward neighborhoods, schools, and development trends; experience with East Bay markets and pricing strategies; understanding of first-time buyer programs and financing options common in this price range; negotiation skills to maximize value in a less competitive market; references from recent Hayward buyers; and responsiveness and communication style that matches your needs. Interview 2-3 agents before deciding. Look for someone who asks about your specific needs, timeline, and budget rather than just pushing properties. An experienced Hayward agent will help you navigate neighborhood selection, identify value opportunities, and avoid potential pitfalls."
  }
];

export function HaywardFAQ() {
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
      {/* Header */}
      <header className="bg-gray-900 text-white py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="text-xl font-light tracking-[0.2em] mb-1">CASCADE</div>
          <div className="text-[10px] font-light text-gray-500 tracking-[0.3em]">CALIFORNIA REALTY</div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-4">HOMEBUYER GUIDE</p>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
            Hayward Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Hayward. Expert answers from a Bay Area real estate professional with 15+ years of experience.
          </p>
        </div>
      </section>

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
      <RelatedCities currentCity="hayward" />

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm font-light">
            © {new Date().getFullYear()} Cascade California Realty Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
