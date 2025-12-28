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
    question: "What is the average home price in South San Francisco?",
    answer: "The median home price in South San Francisco is approximately $1.2 million as of 2024. This makes it more affordable than neighboring cities like San Francisco ($1.35M), Daly City, and San Mateo. Prices vary by property type—condos start around $600,000-$800,000, while single-family homes typically range from $1M to $1.5M. The city's strong biotech employment base and excellent location keep property values stable with steady appreciation potential."
  },
  {
    question: "Why is South San Francisco called the 'Biotech Capital of the World'?",
    answer: "South San Francisco earned this title due to its concentration of biotechnology and pharmaceutical companies, most notably Genentech, which has been headquartered here since 1976. The iconic 'South San Francisco, The Industrial City' hillside sign overlooks a thriving biotech corridor with companies like Amgen, AbbVie, and hundreds of life sciences startups. This industry cluster provides thousands of high-paying jobs and has transformed the city into a global hub for pharmaceutical innovation and research."
  },
  {
    question: "Is South San Francisco a good place to buy a home in 2025?",
    answer: "South San Francisco offers excellent value for 2025 homebuyers. With median prices about 10-15% lower than neighboring cities, strong employment growth in biotech, BART access for commuters, and proximity to SFO airport, it's an attractive option for professionals and families. The city is undergoing significant redevelopment downtown with new housing, retail, and amenities. For buyers seeking Peninsula location with San Francisco access at a more accessible price point, South San Francisco is worth serious consideration."
  },
  {
    question: "How is the commute from South San Francisco?",
    answer: "South San Francisco offers excellent commute options. BART's Yellow and Red lines connect to San Francisco (20-25 minutes to downtown) and throughout the East Bay. For Peninsula and South Bay workers, Highway 101 and 280 provide direct routes, with many biotech jobs within the city itself. SFO airport is just 5-10 minutes away, making it ideal for frequent travelers. Caltrain stations in nearby San Bruno and Millbrae offer another commute alternative. The central location provides flexibility for various work destinations."
  },
  {
    question: "What are the best neighborhoods in South San Francisco for families?",
    answer: "Top family-friendly neighborhoods include Westborough (quiet residential streets, good schools, parks), Buri Buri (established neighborhood, larger lots, community feel), and Winston Manor (newer homes, family-oriented, close to schools). The Terrabay area offers newer construction with bay views. These neighborhoods feature South San Francisco Unified schools, parks like Orange Memorial Park and Centennial Way, and safe, walkable streets. Many families appreciate the diversity, strong community connections, and more spacious homes compared to San Francisco."
  },
  {
    question: "How are the schools in South San Francisco?",
    answer: "South San Francisco Unified School District serves the city with 10 elementary schools, 3 middle schools, and 2 high schools, plus several charter options. Well-regarded schools include Buri Buri Elementary, Parkway Heights Middle School, and South San Francisco High School. The district has invested in facilities upgrades and academic programs. While test scores vary by school, many families find solid educational options, especially when compared to the significant cost savings versus higher-ranked districts. Private school options are available in nearby communities."
  },
  {
    question: "What makes South San Francisco more affordable than neighboring cities?",
    answer: "Several factors contribute to South San Francisco's relative affordability: historically industrial zoning (now transitioning), less prestigious reputation compared to Burlingame or San Mateo, and more diverse housing stock including condos and townhomes. The city has more multi-family housing and higher density in some areas. However, this affordability gap is narrowing as buyers discover the value proposition—excellent location, BART access, strong employment, and improving amenities. Smart buyers are recognizing South San Francisco as an undervalued Peninsula city."
  },
  {
    question: "What major employers are in South San Francisco?",
    answer: "South San Francisco is home to major biotechnology and pharmaceutical employers. Genentech (Roche) is the largest with over 13,000 employees. Other significant employers include Amgen, AbbVie, Exelixis, Theravance Biopharma, and Coherus BioSciences. The city's business parks house hundreds of life sciences companies and startups. This concentration of high-paying biotech jobs provides economic stability, attracts educated professionals, and supports the local housing market. Many homeowners work within walking or short driving distance of their jobs."
  },
  {
    question: "How close is South San Francisco to SFO Airport?",
    answer: "South San Francisco is exceptionally close to San Francisco International Airport (SFO)—just 3-4 miles or 5-10 minutes by car depending on your neighborhood. This proximity is a major advantage for frequent travelers, airport employees, and those who value easy access for business or leisure trips. BART also connects directly to SFO. However, buyers should consider potential aircraft noise in certain neighborhoods, particularly areas under flight paths. Many homes are not significantly impacted, but it's worth checking during property visits."
  },
  {
    question: "What is the investment potential for South San Francisco real estate?",
    answer: "South San Francisco shows strong investment potential based on several factors: growing biotech employment creating housing demand, ongoing downtown revitalization, BART access increasing desirability, relative affordability compared to neighbors, and limited Bay Area housing supply. The city is actively planning mixed-use developments and infrastructure improvements. Historical appreciation has been steady, and the narrowing price gap with adjacent cities suggests continued growth. For investors seeking Peninsula exposure with better price entry points, South San Francisco merits serious consideration."
  },
  {
    question: "How diverse is South San Francisco?",
    answer: "South San Francisco is one of the Bay Area's most diverse cities. With a population of approximately 66,000, the city has significant Asian (primarily Filipino and Chinese), Hispanic, and White populations, creating a vibrant multicultural community. This diversity is reflected in excellent restaurants, cultural events, and community organizations. Many residents appreciate the welcoming atmosphere and variety of perspectives. The diversity also extends to housing options and price points, making it accessible to various income levels and family types."
  },
  {
    question: "What amenities and attractions does South San Francisco offer?",
    answer: "South San Francisco offers growing amenities including downtown dining and shopping along Grand Avenue, the Sign Hill Trail with panoramic bay views, Orange Memorial Park with sports facilities and a skate park, and the Bay Trail for walking and cycling. The city hosts farmers markets, cultural festivals, and community events. Nearby attractions include Oyster Point Marina, multiple shopping centers, and easy access to San Francisco, Peninsula, and airport amenities. Recent development has added restaurants, breweries, and entertainment options, with more planned for downtown revitalization areas."
  },
  {
    question: "What are property taxes in South San Francisco?",
    answer: "South San Francisco property taxes run approximately 1.15-1.20% of assessed value annually, slightly lower than San Francisco but similar to other San Mateo County cities. This includes the base 1% Proposition 13 rate plus local bonds and assessments. A home purchased for $1.2M would have annual property taxes around $13,800-$14,400. Like all California properties, Prop 13 limits annual assessment increases to 2%, providing long-term tax predictability. New buyers are assessed at purchase price, making it important to budget accordingly when comparing to a seller's current tax bill."
  },
  {
    question: "Is South San Francisco good for young professionals?",
    answer: "South San Francisco is increasingly attractive for young professionals, especially those in biotech, healthcare, and tech industries. Benefits include: walkable BART access to San Francisco nightlife and culture, growing local restaurant and brewery scene, more affordable entry point than SF proper, proximity to outdoor recreation (trails, bay access), and shorter commutes if working locally. The city is younger and more dynamic than typical suburbs, with new developments targeting professionals. While not as urban as San Francisco, it offers a practical balance of affordability, location, and lifestyle for career-focused buyers."
  },
  {
    question: "What should I know about buying a condo in South San Francisco?",
    answer: "South San Francisco has numerous condo developments, particularly near downtown and BART stations, ranging from $600,000 to $900,000 for 2-bedroom units. Key considerations include: HOA fees ($400-$700/month typical), building age and condition, parking (often included), BART noise in some locations, and rental restrictions if you're considering investment. Newer developments near El Camino Real and downtown offer modern amenities. Condos provide an affordable entry point and low-maintenance lifestyle. Always review HOA financials, reserves, and meeting minutes before purchasing. Many condos attract young professionals and downsizers."
  },
  {
    question: "How does South San Francisco compare to Daly City?",
    answer: "South San Francisco and Daly City are neighboring cities with similarities and differences. Both offer more affordable Peninsula living than San Francisco, BART access, and diverse populations. South San Francisco has stronger employment (biotech corridor), slightly higher median prices ($1.2M vs. $1.1M), and more commercial development. Daly City is larger (100,000+ residents vs. 66,000) with more extensive BART service and established neighborhoods. Both experience fog, though South San Francisco's bay-facing areas get more sun. Choice often comes down to specific neighborhood preference, commute needs, and desired community character."
  },
  {
    question: "What are the hidden costs of buying a home in South San Francisco?",
    answer: "Beyond purchase price, budget for: closing costs (2-3% of price), San Mateo County transfer tax ($1.10 per $1,000), title insurance, home inspection ($500-$1,000), HOA fees for condos ($400-$700/month), homeowners insurance ($1,500-$2,500/year), potential aircraft noise mitigation if under flight paths, and typical Peninsula maintenance costs. Some older homes may need foundation work, electrical/plumbing updates, or energy efficiency improvements. Earthquake insurance is recommended but not required ($1,000-$3,000/year). Properties near biotech facilities should be evaluated for any environmental considerations, though modern facilities have strict regulations."
  },
  {
    question: "What is the best time of year to buy a home in South San Francisco?",
    answer: "South San Francisco's market follows typical Bay Area patterns with spring (March-May) bringing the most inventory and competition. Summer sees continued activity, especially from families coordinating with school schedules. Fall can offer opportunities with less competition, and winter typically has the least inventory but also fewer buyers. However, South San Francisco's market is less seasonal than some Peninsula cities due to year-round biotech hiring and relocations. The best time depends more on your personal readiness, financing, and finding the right property than seasonal timing. Good opportunities arise throughout the year."
  },
  {
    question: "Are there first-time homebuyer programs available in South San Francisco?",
    answer: "First-time buyers in South San Francisco can access several programs: CalHFA offers down payment assistance and affordable loan programs for qualified buyers throughout California. San Mateo County has the Mortgage Assistance Program providing loans up to $200,000 for down payment and closing costs (income limits apply). Federal programs include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with as little as 3% down. The city occasionally offers BMR (Below Market Rate) units through new developments. Working with a knowledgeable local agent helps identify all available assistance options."
  },
  {
    question: "What questions should I ask when buying a home in South San Francisco?",
    answer: "Essential questions for South San Francisco purchases include: 1) Is the property under an airport flight path (check noise levels)? 2) What is the commute time to your workplace at peak hours? 3) Which school attendance boundaries does the property fall within? 4) Are there any planned developments nearby? 5) What are the HOA fees and what do they cover? 6) Has the property been tested for foundation issues or soil stability? 7) What is included in the sale? 8) How long has it been on market and why is the seller moving? 9) What is the neighborhood's walkability and access to amenities? Your agent should help investigate each thoroughly and provide local market context."
  }
];

export function SouthSanFranciscoFAQ() {
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
            South San Francisco Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in South San Francisco. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="south-san-francisco" />

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
