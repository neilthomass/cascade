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
    question: "What is the average home price in Dublin?",
    answer: "The median home price in Dublin is approximately $1.35 million as of 2025. Dublin offers excellent value in the Tri-Valley area, with prices generally lower than comparable communities in Palo Alto or Pleasanton. Single-family homes typically range from $1.1 million to $2 million depending on size, age, and neighborhood. New construction in developments near the BART station commands premium prices, while established neighborhoods offer more variety in pricing. The city's strong schools and BART access have driven steady appreciation over the past decade."
  },
  {
    question: "Is Dublin a good investment for homebuyers in 2025?",
    answer: "Dublin represents an excellent investment opportunity in 2025, particularly for families and commuters. The city is one of the most affordable options in the Tri-Valley with direct BART access to San Francisco and the Peninsula. Ongoing development, top-rated Dublin Unified schools, and master-planned communities make it attractive for young families. The city's population has grown significantly, and new retail, dining, and employment centers continue to emerge. For buyers priced out of Pleasanton or San Ramon, Dublin offers similar amenities at a better value with strong long-term appreciation potential."
  },
  {
    question: "How does Dublin compare to other Tri-Valley cities?",
    answer: "Dublin offers the best value proposition in the Tri-Valley. While Pleasanton and Danville command higher prices, Dublin provides comparable schools, newer housing stock, and direct BART access at 15-20% lower prices. Compared to San Ramon, Dublin has more new construction and a younger demographic. The city's strategic location between Pleasanton and Livermore provides easy access to employment centers, shopping at both Dublin Town Center and Livermore outlets, and excellent freeway connectivity via I-580 and I-680. For buyers seeking Tri-Valley quality of life at a more accessible price point, Dublin is often the best choice."
  },
  {
    question: "What are the best neighborhoods in Dublin for families?",
    answer: "Top family-friendly neighborhoods in Dublin include Schaefer Ranch (newer homes, parks, community feel), Jordan Ranch (planned community with trails and recreation), Positano (luxury homes near downtown), and neighborhoods around Fallon Middle School. The East Dublin area near Dublin Crossing offers walkability to shopping and dining. Many families prefer newer developments built after 2000 for modern floor plans and energy efficiency. All Dublin neighborhoods benefit from highly-rated Dublin Unified schools, including Dublin High School and Fallon Middle School, both consistently ranked among the best in the Bay Area."
  },
  {
    question: "How is BART access in Dublin?",
    answer: "Dublin offers two BART stations: West Dublin/Pleasanton and Dublin/Pleasanton, providing exceptional public transit access. The stations connect directly to San Francisco (approximately 45-55 minutes), Oakland (30 minutes), and Peninsula cities via transfer. This makes Dublin ideal for commuters working in tech hubs while wanting more affordable housing and family-friendly neighborhoods. Neighborhoods within walking or biking distance of BART stations command premium prices but offer car-free commuting options. The BART extension has been a major driver of Dublin's growth and development over the past two decades."
  },
  {
    question: "What new developments are happening in Dublin?",
    answer: "Dublin continues to see significant new construction and development. The Dublin Crossing area features mixed-use development with retail, dining, and residential options. Several new housing developments are underway in East Dublin with modern townhomes and single-family homes. The city has approved additional retail and restaurant projects around the BART stations. Commercial development includes new office parks attracting tech and biotech companies. Infrastructure improvements include road widening, new parks, and trail systems. This ongoing development keeps Dublin feeling vibrant and modern while supporting long-term property values."
  },
  {
    question: "How are the schools in Dublin?",
    answer: "Dublin Unified School District is one of the highest-rated school districts in the Bay Area. Dublin High School consistently ranks in the top 5% of California high schools with excellent API scores, strong athletics, and comprehensive programs. Fallon Middle School is similarly well-regarded. Elementary schools throughout Dublin receive high ratings, with many scoring 9/10 or 10/10 on GreatSchools. The district benefits from strong parent involvement, excellent funding, and modern facilities. The quality of schools is a primary driver of home values in Dublin and attracts families from throughout the Bay Area."
  },
  {
    question: "What shopping and dining options are available in Dublin?",
    answer: "Dublin offers exceptional shopping and dining for a suburban city. Dublin Town Center is a major outdoor lifestyle center with retail, restaurants, and entertainment. The city has numerous shopping plazas along Dublin Boulevard and Amador Valley Boulevard featuring national chains and local favorites. Dublin's dining scene has grown significantly with diverse options including Indian, Chinese, American, and Italian cuisines. Proximity to San Ramon's City Center Bishop Ranch and Livermore Premium Outlets provides additional shopping options within 10-15 minutes. The ongoing development continues to bring new restaurants and retailers to the city."
  },
  {
    question: "Is Dublin good for young families?",
    answer: "Dublin is one of the best cities in the Bay Area for young families. The city has excellent schools, numerous parks and playgrounds, modern housing, low crime rates, and a strong sense of community. Master-planned neighborhoods often include tot lots, pools, and community centers. The city hosts family-friendly events throughout the year and maintains extensive trail systems for outdoor recreation. The demographic skews younger than neighboring cities, creating a vibrant community of families with school-age children. Many families move to Dublin specifically for the combination of affordability, schools, and family-oriented amenities."
  },
  {
    question: "How much do I need to earn to buy a home in Dublin?",
    answer: "To comfortably afford a median-priced home in Dublin ($1.35M), you typically need a household income of $300,000-$350,000, assuming a 20% down payment ($270,000) and following the 28% debt-to-income ratio guideline. Many Dublin buyers are dual-income tech professionals or families moving from more expensive Bay Area cities. First-time buyers often start with townhomes or condos in the $800,000-$1,000,000 range, requiring incomes around $200,000-$250,000. Some newer developments offer slightly smaller homes that provide entry points around $1 million."
  },
  {
    question: "What is the commute like from Dublin?",
    answer: "Dublin offers excellent commute options. BART provides direct access to San Francisco (45-55 min), Oakland (30 min), and Peninsula cities. Driving to Silicon Valley via I-680 takes 30-45 minutes to San Jose, 20-30 minutes to Fremont. The reverse commute to Livermore or Tracy is quick and easy. I-580 provides access to the Peninsula and East Bay. Many residents work locally in San Ramon, Pleasanton, or Livermore, enjoying short 10-20 minute commutes. The combination of BART, major freeways, and growing local employment makes Dublin highly accessible while offering more affordable housing than cities closer to job centers."
  },
  {
    question: "Are there HOA fees in Dublin neighborhoods?",
    answer: "Many Dublin neighborhoods, particularly newer planned communities, have HOA fees ranging from $100-$400 per month. These fees typically cover common area maintenance, landscaping, community amenities (pools, parks, playgrounds), and sometimes trash service. Newer developments tend to have higher fees but offer more amenities. Older neighborhoods may have minimal or no HOA fees. Always review HOA documents, including reserves, restrictions, and planned assessments. While HOA fees add to monthly costs, they often maintain property values and provide amenities that enhance quality of life, especially for families."
  },
  {
    question: "What are property taxes like in Dublin?",
    answer: "Dublin property taxes are approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments and bonds. For a $1.35 million home, expect annual property taxes around $14,850-$16,200. Thanks to Prop 13, your tax increase is capped at 2% annually regardless of market appreciation. New buyers are assessed at purchase price. Some neighborhoods have additional Mello-Roos taxes or CFD assessments that can add $2,000-$5,000 annually, particularly in newer developments. Always verify specific property tax amounts before purchasing, as they vary by neighborhood and purchase year."
  },
  {
    question: "How is the investment potential for Dublin real estate?",
    answer: "Dublin offers strong long-term investment potential. The city has experienced steady appreciation driven by: limited new land for development, excellent schools attracting families, BART connectivity, growing employment base, and influx of buyers from more expensive Bay Area cities. Historical appreciation has averaged 5-7% annually over the past decade. New construction and ongoing development keep the city modern and desirable. The Tri-Valley's strong economy, tech sector growth, and quality of life support continued demand. For investors, Dublin offers better cash flow than San Francisco or Peninsula markets while maintaining solid appreciation prospects."
  },
  {
    question: "What should I know about buying new construction in Dublin?",
    answer: "Dublin has significant new construction, particularly in East Dublin and around BART stations. Benefits include modern floor plans, energy efficiency, warranties, and new appliances. Considerations include: higher HOA fees, potential Mello-Roos taxes (typically $3,000-$8,000 annually for 20-30 years), smaller lots compared to older neighborhoods, and premium pricing. New construction often sells quickly, sometimes before completion. Work with an agent experienced in new builds to navigate builder contracts, upgrades, and negotiations. Despite higher initial costs, new construction appeals to buyers wanting move-in ready homes with minimal maintenance and modern features."
  },
  {
    question: "How does Dublin's proximity to Livermore outlets benefit residents?",
    answer: "Dublin residents enjoy 10-15 minute access to the Livermore Premium Outlets, one of Northern California's premier shopping destinations. This proximity provides convenient access to over 130 brand-name stores offering designer and premium brands at outlet prices. Combined with Dublin's own shopping at Dublin Town Center and nearby San Ramon's Bishop Ranch, residents have exceptional retail variety. The outlets also attract visitors from throughout the Bay Area, supporting the local economy. For families, having quality shopping nearby without San Francisco prices or traffic is a significant lifestyle benefit unique to the Tri-Valley location."
  },
  {
    question: "What makes Dublin attractive for people relocating to the Bay Area?",
    answer: "Dublin appeals to Bay Area newcomers for several reasons: more affordable than Peninsula or South Bay cities, excellent schools without San Francisco or Palo Alto prices, new housing stock with modern amenities, master-planned communities that feel welcoming, BART connectivity for easy exploration of the Bay Area, lower crime than urban areas, and a balanced suburban lifestyle. Many tech professionals relocating for jobs in San Francisco or Silicon Valley choose Dublin for the value proposition—getting a larger, newer home with top schools while maintaining reasonable access to employment centers. The city's growth and development create an energetic, forward-looking atmosphere attractive to newcomers."
  },
  {
    question: "Are there any first-time homebuyer programs available in Dublin?",
    answer: "First-time buyers in Dublin can access several assistance programs. CalHFA (California Housing Finance Agency) offers down payment assistance and lower interest rates for qualifying buyers. Conventional loans now allow as little as 3% down for first-time buyers. FHA loans require 3.5% down. Some local lenders offer special programs for Bay Area first-time buyers. Alameda County may have periodic programs for income-qualified buyers. While Dublin doesn't have city-specific programs like San Francisco's BMR, the combination of state and conventional low-down payment options makes homeownership accessible. Working with a knowledgeable lender familiar with first-time buyer programs is essential."
  },
  {
    question: "What questions should I ask when buying a home in Dublin?",
    answer: "Essential questions for Dublin home purchases include: 1) Are there Mello-Roos or CFD taxes, and when do they expire? 2) What are the total HOA fees and what do they cover? 3) Is the home in a flood zone (some areas near creeks require flood insurance)? 4) Which schools serve the property? 5) How old are major systems (roof, HVAC, water heater)? 6) Has there been any pest damage or foundation issues? 7) What is included in the sale? 8) Why is the seller moving? 9) How long has the property been on the market? 10) Are there any planned developments or construction nearby? Your agent should thoroughly investigate each item and review all disclosure documents carefully."
  },
  {
    question: "How do I choose the right real estate agent for buying in Dublin?",
    answer: "Choose a Dublin agent based on: deep local knowledge (they should know Dublin neighborhoods, schools, and developments intimately), transaction volume in Dublin and Tri-Valley (10+ deals annually shows active involvement), understanding of new construction processes if you're considering new builds, strong negotiation skills for multiple offer situations, references from past Dublin buyers, and communication style that matches your preferences. Interview 2-3 agents before deciding. An experienced Dublin agent will understand Mello-Roos, HOA structures, school boundaries, and the nuances of different neighborhoods. They should also have relationships with local lenders, inspectors, and service providers to facilitate a smooth transaction."
  }
];

export function DublinFAQ() {
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
        title="Dublin Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your Dublin real estate questions. Learn about home prices, schools, neighborhoods, and buying in Dublin from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/dublin-faq"
        city="Dublin"
        coordinates={{ lat: 37.7022, lng: -121.9358 }}
      />
      <FAQHeader />
      <FAQHero
        title="Dublin Real Estate FAQ"
        description="Everything you need to know about buying a home in Dublin. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="dublin" />

      <Footer />
    </div>
  );
}
