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
    question: "What is the average home price in San Mateo?",
    answer: "The median home price in San Mateo is approximately $1.75 million as of 2024. San Mateo's central Peninsula location between San Francisco and Silicon Valley makes it highly desirable, with prices varying by neighborhood—from around $1.2 million for condos to over $3 million for larger single-family homes in prime areas like San Mateo Park and Baywood. The city's strong school district and downtown amenities continue to support robust home values."
  },
  {
    question: "Is San Mateo a good place to buy a home in 2025?",
    answer: "San Mateo offers excellent value for homebuyers in 2025. Its central Peninsula location provides easy access to both San Francisco (20 minutes via Caltrain) and Silicon Valley, making it ideal for tech professionals and families. The city features a vibrant downtown with diverse dining and shopping, highly-rated schools, and strong community amenities. Long-term appreciation potential remains solid due to limited inventory, excellent transportation options, and the area's economic stability."
  },
  {
    question: "What are the best neighborhoods in San Mateo for families?",
    answer: "Top family-friendly neighborhoods in San Mateo include San Mateo Park (tree-lined streets, excellent schools, upscale homes), Baywood (quiet residential area, close to parks), Hillsdale (more affordable, good schools, shopping nearby), and Aragon (newer developments, family-oriented). The Hayward Park area offers a mix of starter homes and established properties. All neighborhoods benefit from the city's highly-rated San Mateo Union High School District and numerous parks and recreational facilities."
  },
  {
    question: "How much do I need to earn to buy a house in San Mateo?",
    answer: "To comfortably afford a median-priced home in San Mateo ($1.75M), you typically need a household income of $375,000-$475,000, assuming a 20% down payment and following the 28% debt-to-income guideline. First-time buyers often start with condos or townhomes in the $1-1.3M range, which require lower income thresholds. Many buyers in San Mateo are dual-income tech households or equity-rich move-up buyers from other Bay Area cities."
  },
  {
    question: "What is the commute like from San Mateo?",
    answer: "San Mateo offers exceptional commute options. Caltrain provides direct service to San Francisco (30-40 minutes) and Silicon Valley destinations including Palo Alto, Mountain View, and San Jose. Highway 101 and I-280 provide car access north and south. San Francisco International Airport is just 15 minutes away. For San Francisco commuters, the Baby Bullet train makes the trip in under 30 minutes. Tech shuttle stops serve major employers. This central location is a key reason for San Mateo's popularity."
  },
  {
    question: "What makes San Mateo's downtown special?",
    answer: "Downtown San Mateo features over 200 restaurants, cafes, and shops along vibrant B Street and Third Avenue. The diverse dining scene includes everything from upscale Italian and Japanese to casual Mexican and American fare. Regular events like the Farmers Market, Summer Sounds concerts, and holiday celebrations create community atmosphere. The downtown Caltrain station makes it a true transit-oriented neighborhood. Recent developments have added modern apartments and condos, creating an increasingly urban, walkable environment."
  },
  {
    question: "How are the schools in San Mateo?",
    answer: "San Mateo schools are highly rated. The San Mateo Union High School District serves the area with schools including San Mateo High, Aragon High, and Hillsdale High, all receiving strong ratings. Elementary and middle schools are part of separate districts (San Mateo-Foster City, Belmont-Redwood Shores) with generally good performance. Many families also consider private school options. The city's commitment to education, combined with engaged parent communities, contributes to strong academic outcomes and is a major draw for families."
  },
  {
    question: "What are property taxes like in San Mateo?",
    answer: "San Mateo property taxes are approximately 1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation. A home purchased for $1.75M would have annual taxes around $21,000. New buyers are assessed at purchase price. Some newer developments may have additional Mello-Roos taxes, so always verify the exact tax rate for specific properties."
  },
  {
    question: "What types of homes are available in San Mateo?",
    answer: "San Mateo offers diverse housing stock including classic California bungalows and Tudors from the 1920s-40s, mid-century modern homes from the 1950s-60s, contemporary remodels, newer townhome developments, and downtown condos. The Hillsdale and Beresford areas feature more ranch-style homes on larger lots. San Mateo Park and Baywood have stately older homes on tree-lined streets. Recent years have seen significant new construction of townhomes and condos, particularly near downtown and El Camino Real."
  },
  {
    question: "Is San Mateo a good investment for real estate?",
    answer: "San Mateo represents a strong real estate investment due to several factors: central Peninsula location, limited available land for new construction, excellent schools attracting families, major employers nearby, and superior transportation infrastructure including Caltrain and highway access. The city's ongoing downtown revitalization continues to add amenities and draw residents. Historically, San Mateo has shown steady appreciation, with lower volatility than San Francisco while maintaining stronger growth than outer Bay Area markets. The 5-10 year outlook remains positive given fundamental supply-demand dynamics."
  },
  {
    question: "What should I know about buying a condo in San Mateo?",
    answer: "San Mateo condos range from downtown high-rises to townhome-style developments. Downtown condos ($700K-$1.5M) offer walkability to restaurants and Caltrain. HOA fees typically range from $400-$800/month depending on amenities. Key considerations include: reviewing HOA financial health and reserves, understanding any pending assessments, checking noise between units, and evaluating parking (some buildings include 1-2 spaces, others charge separately). Many newer developments offer modern amenities like fitness centers and rooftop decks. Condos provide a more affordable entry point to San Mateo living."
  },
  {
    question: "How competitive is the San Mateo housing market?",
    answer: "San Mateo's market competitiveness varies by price point and property type. Well-priced homes in desirable neighborhoods often receive multiple offers, particularly in the $1.5-2.5M range popular with families. Downtown condos may have more negotiating room. Successful buyers typically get fully pre-approved, work with experienced local agents, write clean offers with minimal contingencies, and act decisively. Spring and summer see the most competition as families want to move before school starts. The market has moderated from 2021-22 peaks but remains competitive for premium properties."
  },
  {
    question: "What is San Mateo's proximity to major tech employers?",
    answer: "San Mateo is ideally positioned for tech workers, with major employers within 15-30 minutes. Facebook/Meta (15 min), Google Mountain View (25 min), Apple (35 min), and numerous other Silicon Valley companies are easily accessible via 101 or Caltrain. San Francisco tech companies like Salesforce and Twitter are 30 minutes away. YouTube and Google's San Bruno offices are just 10 minutes north. Many residents work remotely but appreciate being centrally located for occasional office visits. This geographic advantage has long supported San Mateo's home values."
  },
  {
    question: "What are the hidden costs of buying a home in San Mateo?",
    answer: "Beyond the purchase price, San Mateo buyers should budget for: closing costs (2-3% of purchase price), property transfer tax, title insurance, inspection fees ($500-$1,500), potential HOA fees for condos/townhomes, homeowners insurance ($2,000-$3,000/year), earthquake insurance (optional but recommended, $1,000-$3,000/year), and ongoing maintenance. Older homes may need updates to electrical, plumbing, or foundation. Many buyers invest in remodeling kitchens and bathrooms within the first few years. Budget an additional 1-2% of home value annually for maintenance and repairs."
  },
  {
    question: "What are San Mateo's parks and recreation options?",
    answer: "San Mateo offers over 15 parks and recreational facilities. Central Park (16 acres) features a Japanese Tea Garden, playground, and picnic areas. Coyote Point Recreation Area offers waterfront trails, a beach, and museum. Laurelwood Park, Beresford Park, and Joinville Park serve neighborhood needs with playgrounds and sports fields. The Bay Trail provides miles of walking and cycling paths. The city maintains a community center, senior center, and multiple libraries. Golf enthusiasts enjoy Crystal Springs Golf Course. This extensive park system is a major quality-of-life benefit for residents."
  },
  {
    question: "How does San Mateo compare to neighboring cities like Burlingame and Redwood City?",
    answer: "San Mateo offers a middle ground between Burlingame and Redwood City. Burlingame has a more upscale, quaint downtown with higher median prices ($2.2M+), while Redwood City is slightly more affordable ($1.5M median) with a growing downtown scene. San Mateo's downtown is larger and more diverse than Burlingame's, with better restaurant variety. All three cities have good schools and Caltrain access. San Mateo tends to attract buyers wanting downtown vibrancy without San Francisco prices, more diversity than Burlingame, and better established amenities than Redwood City."
  },
  {
    question: "What is the future development outlook for San Mateo?",
    answer: "San Mateo is experiencing significant development, particularly downtown. Recent and planned projects include mixed-use buildings with ground-floor retail and residential above, new hotels, and office space conversions to residential. The city's 2040 General Plan emphasizes transit-oriented development near Caltrain, downtown density, and maintaining neighborhood character in residential areas. Bay Meadows redevelopment added hundreds of homes and retail near the Hillsdale Caltrain station. These changes are modernizing San Mateo while preserving its Peninsula charm, likely supporting continued home value appreciation."
  },
  {
    question: "Are there first-time homebuyer programs available in San Mateo?",
    answer: "First-time buyers in San Mateo can access several programs. CalHFA (California Housing Finance Agency) offers down payment assistance and favorable loan terms for qualifying buyers. San Mateo County's Below Market Rate (BMR) program occasionally offers affordable units through lottery. Federal programs include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with as little as 3% down for first-timers. Many lenders offer first-time buyer programs with reduced rates or fees. Income limits apply to most assistance programs, so consult with a knowledgeable lender early in your search."
  },
  {
    question: "What should I look for when touring homes in San Mateo?",
    answer: "When viewing San Mateo homes, evaluate: foundation condition (many older homes need seismic retrofitting), roof age and condition, electrical and plumbing updates, drainage and grading (some hillside areas have issues), noise from El Camino Real or Highway 101 if nearby, parking (especially important for downtown properties), and renovation potential. Check for signs of deferred maintenance. Assess the specific microclimate—downtown areas get less fog than hillside neighborhoods. Consider proximity to parks, schools, and Caltrain based on your needs. A thorough inspection is essential given the age of much of San Mateo's housing stock."
  },
  {
    question: "How do I choose the right real estate agent in San Mateo?",
    answer: "Choose a San Mateo agent with: deep local knowledge of specific neighborhoods and their characteristics, recent transaction history in your price range (check if they've closed deals in the last 6 months), understanding of micro-market trends, strong negotiation skills in multiple-offer situations, and excellent communication. Interview 2-3 agents before deciding. Ask about their strategy for competitive offers, knowledge of local schools and amenities, and how they'll help you evaluate properties. Look for someone who listens to your needs rather than pushing you toward specific areas. In San Mateo's competitive market, an experienced local agent is invaluable."
  }
];

export function SanMateoFAQ() {
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
        title="San Mateo Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in San Mateo. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.5630, lng: -122.3255 }}
      />
      <FAQHeader />
      <FAQHero
        title="San Mateo Real Estate FAQ"
        description="Everything you need to know about buying a home in San Mateo. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="san-mateo" />

      <Footer />
    </div>
  );
}
