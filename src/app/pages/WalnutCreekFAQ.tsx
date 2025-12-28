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
    question: "What is the average home price in Walnut Creek?",
    answer: "The median home price in Walnut Creek is approximately $1.1 million as of 2025. Walnut Creek offers excellent value compared to San Francisco while maintaining high quality of life. Prices vary by neighborhood and property type—condos and townhomes in downtown areas start around $600,000-$800,000, while single-family homes in desirable neighborhoods like Northgate, Larkey, and Rudgear Estates range from $1.2M to $3M+. The market has remained stable with steady appreciation due to the city's strong schools, walkable downtown, and convenient BART access."
  },
  {
    question: "Is Walnut Creek a good place to buy a home in 2025?",
    answer: "Walnut Creek is an excellent choice for homebuyers in 2025. The city offers a rare combination of suburban tranquility, urban amenities, and excellent transportation access. With highly-rated schools in the Walnut Creek School District, a vibrant downtown with over 200 restaurants and shops, direct BART access to San Francisco, and proximity to Mount Diablo hiking trails, Walnut Creek appeals to families, professionals, and retirees alike. The market provides better value than neighboring Lafayette and Orinda while offering similar quality of life. Long-term appreciation potential remains strong due to limited new construction and sustained demand."
  },
  {
    question: "What are the best neighborhoods in Walnut Creek for families?",
    answer: "Top family-friendly neighborhoods in Walnut Creek include Northgate (excellent schools, parks, and community feel), Larkey (walkable to downtown, mature trees, award-winning elementary school), Tice Valley (newer homes, cul-de-sacs, highly rated schools), and Rudgear Estates (spacious lots, top schools, quiet streets). Indian Valley and Skycrest offer more affordable options with good schools and family amenities. Most neighborhoods feature safe streets, easy access to parks, hiking trails, and the downtown area. The Walnut Creek School District consistently ranks among the best in the Bay Area, making nearly any neighborhood attractive for families."
  },
  {
    question: "How much do I need to earn to buy a house in Walnut Creek?",
    answer: "To comfortably afford the median-priced home in Walnut Creek ($1.1M), you typically need a household income of $250,000-$325,000, assuming a 20% down payment and following the 28% debt-to-income guideline. This makes Walnut Creek more accessible than San Francisco or Palo Alto while offering comparable amenities. First-time buyers often start with condos or townhomes in the $600,000-$800,000 range, which require approximately $140,000-$180,000 in household income. Consider that lower property taxes compared to newer developments and the ability to walk/BART instead of owning multiple cars can offset higher mortgage payments."
  },
  {
    question: "What makes Walnut Creek's downtown so appealing?",
    answer: "Walnut Creek's downtown is considered one of the Bay Area's premier suburban downtowns, featuring over 200 restaurants, cafes, and shops within a highly walkable 20-block area. Broadway Plaza, an upscale outdoor shopping center, anchors the retail scene with Nordstrom, Macy's, Apple, and dozens of boutiques. The downtown offers diverse dining from casual cafes to fine dining, a thriving arts scene with Lesher Center for the Arts, weekly farmers markets, and numerous festivals throughout the year. The pedestrian-friendly streets, outdoor patios, and Mediterranean climate create a vibrant urban village atmosphere. Many residents can walk or bike to dinner, shopping, and entertainment, reducing car dependency."
  },
  {
    question: "How convenient is BART access from Walnut Creek?",
    answer: "Walnut Creek offers excellent BART access with the Walnut Creek BART station located in the heart of downtown. Direct service to San Francisco takes approximately 45 minutes, making commuting to the city highly feasible without driving. The Pleasant Hill/Contra Costa Centre station provides additional access from the northern part of town. Many residents use BART for daily commutes to San Francisco, Oakland, or East Bay employment centers. The station's central location allows many downtown residents to walk or bike to BART. Ample parking (though it fills early on weekdays) makes park-and-ride commuting convenient for those living further from the station."
  },
  {
    question: "Why is Walnut Creek popular with retirees?",
    answer: "Walnut Creek has become a top retirement destination in the Bay Area due to its exceptional combination of amenities, walkability, and access to services. The downtown's concentration of restaurants, shops, and entertainment allows for car-free living. World-class medical facilities, including John Muir Health and Kaiser Permanente, provide top-tier healthcare. The mild climate, extensive park system, and Mount Diablo hiking trails support active lifestyles. Numerous 55+ communities and luxury condos offer low-maintenance living options. The vibrant arts and culture scene (Lesher Center, art galleries, concerts) provides enrichment opportunities. Strong public safety and a welcoming community atmosphere make it feel safe and socially connected."
  },
  {
    question: "What are the property taxes in Walnut Creek?",
    answer: "Walnut Creek property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments. This is slightly lower than many newer developments in the area. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation, making long-term ownership increasingly advantageous. A home purchased for $1.1M would have annual taxes around $12,100-$13,200. Contra Costa County property taxes are generally lower than those in San Mateo or Santa Clara counties, providing cost savings compared to Peninsula or South Bay locations."
  },
  {
    question: "What are the schools like in Walnut Creek?",
    answer: "Walnut Creek School District consistently ranks among the top school districts in California, with many schools receiving California Distinguished School awards and National Blue Ribbon recognition. Elementary schools like Walnut Creek Elementary, Buena Vista Elementary, and Indian Valley Elementary score in the top percentiles statewide. Las Lomas High School and Northgate High School both offer excellent academic programs, AP courses, and college preparation. The district benefits from strong community support, active parent involvement, and stable funding. Many families specifically move to Walnut Creek for the schools. Private school options including Athenian School and Berean Christian High School are also nearby."
  },
  {
    question: "How does Walnut Creek compare to nearby Lafayette and Orinda?",
    answer: "Walnut Creek offers more urban amenities and diversity compared to Lafayette and Orinda at a lower price point. While Lafayette and Orinda feature slightly higher-rated schools and more expensive homes, Walnut Creek provides superior walkability, dining variety, entertainment options, and direct downtown BART access. Walnut Creek's downtown is far more developed with Broadway Plaza and 200+ restaurants versus Lafayette's smaller downtown. All three cities offer excellent schools, safety, and quality of life. Walnut Creek appeals to those wanting more urban energy and convenience, while Lafayette and Orinda suit buyers preferring quieter, more residential suburban environments. Walnut Creek's value proposition—better amenities at lower prices—makes it increasingly popular."
  },
  {
    question: "What outdoor recreation is available in Walnut Creek?",
    answer: "Walnut Creek offers exceptional outdoor recreation access. Mount Diablo State Park, just minutes away, provides over 20,000 acres of hiking, mountain biking, and rock climbing with panoramic Bay Area views. The Iron Horse Regional Trail, a 32-mile paved path, runs through Walnut Creek perfect for walking, running, and cycling. Heather Farm Park features sports fields, gardens, a dog park, and community center. The Shell Ridge Open Space offers miles of trails for hiking and mountain biking. Borges Ranch provides historical farm experiences and nature education. Lime Ridge Open Space and Acalanes Ridge offer additional hiking options. The mild climate allows year-round outdoor activities, and many neighborhoods have tree-lined streets perfect for walking."
  },
  {
    question: "What are the HOA fees like in Walnut Creek condos and townhomes?",
    answer: "HOA fees in Walnut Creek condos and townhomes typically range from $300-$700 per month depending on amenities, building age, and unit size. Downtown luxury condos with concierge, pools, and gyms may have fees of $800-$1,200 monthly. Fees generally cover building insurance, common area maintenance, water/garbage, landscaping, and reserve funds. Before purchasing, review HOA financial documents, reserve fund status, and any planned special assessments. Well-managed HOAs with adequate reserves indicate responsible governance. Some communities include utilities or amenities like pools and fitness centers, making higher fees worthwhile. Compare fees to similar properties and understand what's included."
  },
  {
    question: "Is Walnut Creek a good investment for rental properties?",
    answer: "Walnut Creek can be an excellent rental investment market due to steady demand from young professionals, families, and retirees. The BART access attracts commuters who prefer renting near transit. Strong job markets in nearby employment centers (Bishop Ranch, San Ramon, Concord) create rental demand. The excellent schools drive family renters willing to pay premium rents. Average rental rates for single-family homes range from $3,500-$6,000+ monthly depending on size and location, while condos rent for $2,500-$4,000. Cap rates typically range from 3-4%, similar to other desirable Bay Area suburbs. Long-term appreciation potential and steady rental demand make Walnut Creek attractive for buy-and-hold investors, though cash flow may be modest."
  },
  {
    question: "What medical facilities are available in Walnut Creek?",
    answer: "Walnut Creek offers world-class medical facilities, anchored by John Muir Health Walnut Creek Medical Center, a nationally recognized hospital with comprehensive services including cardiac care, cancer treatment, emergency services, and surgical specialties. Kaiser Permanente's Walnut Creek Medical Center provides integrated healthcare for Kaiser members. Numerous specialist medical offices, imaging centers, urgent care facilities, and outpatient surgery centers are located throughout the city. The concentration of top-tier healthcare makes Walnut Creek particularly attractive for retirees and families. The proximity to UCSF Benioff Children's Hospital Oakland and other regional medical centers provides access to specialized care when needed."
  },
  {
    question: "What is the commute like from Walnut Creek?",
    answer: "Walnut Creek offers excellent commute options. BART provides direct service to San Francisco (45 min), Oakland (25 min), and Berkeley (20 min) without driving. Highway 24 connects to Berkeley and Oakland in 20-30 minutes, while I-680 provides access to San Ramon, Pleasanton, and the South Bay in 30-45 minutes. Reverse commutes to Bishop Ranch business park (10 min), Concord (15 min), or the Tri-Valley are quick and easy. Peak traffic on Highway 24 westbound can be heavy, but the BART option alleviates this. Many tech companies offer shuttle services from BART stations. The central location provides reasonable access to most Bay Area employment centers, and remote work flexibility has made location even more valuable for quality of life."
  },
  {
    question: "What types of homes are available in Walnut Creek?",
    answer: "Walnut Creek offers diverse housing options including single-family homes (ranging from 1950s ranches to modern custom homes), townhomes, condos, and luxury high-rise residences. Downtown luxury condos appeal to professionals and retirees seeking walkable urban living. Established neighborhoods feature mid-century and traditional homes on 6,000-10,000 sq ft lots. Newer developments in areas like Tice Valley offer contemporary homes with modern amenities. Historic neighborhoods near downtown have charming older homes with mature landscaping. Price points range from $600,000 condos to $5M+ estate properties. First-time buyers often start with condos or townhomes, while families typically seek single-family homes with yards. The variety ensures options for different budgets and lifestyle preferences."
  },
  {
    question: "Are there any first-time homebuyer programs available in Walnut Creek?",
    answer: "First-time buyers in Walnut Creek can access several programs including CalHFA (California Housing Finance Agency) down payment assistance loans, FHA loans requiring just 3.5% down, conventional loans with 3% down, and VA loans (0% down for eligible veterans). Contra Costa County occasionally offers down payment assistance for qualifying buyers. The County also administers affordable housing programs through its Inclusionary Housing program. First-time buyers should work with lenders familiar with these programs. While Walnut Creek doesn't have city-specific programs like San Francisco's BMR, the combination of slightly lower prices, state programs, and conventional low-down-payment options makes homeownership more accessible than in San Francisco or Peninsula cities."
  },
  {
    question: "What is Broadway Plaza and why is it significant?",
    answer: "Broadway Plaza is Walnut Creek's premier outdoor shopping destination, featuring over 70 luxury retailers including Nordstrom, Neiman Marcus, Macy's, Apple, Tiffany & Co., and numerous boutiques and restaurants. Recently renovated, the center combines high-end shopping with a beautiful outdoor environment featuring fountains, landscaping, and pedestrian-friendly walkways. The plaza hosts events throughout the year and serves as a social gathering place. Its success has anchored downtown Walnut Creek's economic vitality and appeal. Proximity to Broadway Plaza is a selling point for nearby homes, as residents can walk to shopping, dining, and entertainment. The center draws visitors from throughout the Bay Area, contributing to Walnut Creek's reputation as a retail and dining destination."
  },
  {
    question: "What are the hidden costs of buying a home in Walnut Creek?",
    answer: "Beyond the purchase price, Walnut Creek buyers should budget for: closing costs (2-3% of purchase price), property transfer tax (Contra Costa County charges $1.10 per $1,000 of purchase price), title insurance, inspection fees ($500-$1,500), HOA fees for condos/townhomes ($300-$700+/month), homeowners insurance ($1,500-$3,000 annually), and potential landscaping/maintenance costs. Older homes may need updating, roof replacement, or HVAC systems. Some properties have Mello-Roos taxes or community facility district fees. Budget for regular maintenance (1-2% of home value annually). Unlike San Francisco, earthquake retrofitting is less commonly required, but earthquake insurance is still recommended ($800-$2,000 annually). Water costs can be higher during drought years with landscape irrigation."
  },
  {
    question: "How do I choose the right real estate agent in Walnut Creek?",
    answer: "Choose a Walnut Creek agent based on: deep local knowledge of specific neighborhoods and school boundaries, proven transaction history in Walnut Creek (ask for recent sales data), strong negotiation skills (important in competitive markets), excellent communication and responsiveness, and client references. Interview 2-3 agents before deciding. A good agent knows inventory trends, upcoming listings, neighborhood nuances, local inspectors and contractors, and pricing strategies. They should ask thoughtful questions about your needs rather than just showing properties. Experience with Walnut Creek's specific market—understanding BART proximity values, school district boundaries, and neighborhood characteristics—is crucial. Look for someone who balances professionalism with personal attention and has your best interests as priority."
  }
];

export function WalnutCreekFAQ() {
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
            Walnut Creek Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Walnut Creek. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="walnut-creek" />

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
