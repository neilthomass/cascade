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
    question: "What is the average home price in Union City?",
    answer: <>The median home price in Union City is approximately $1.15 million as of 2024. This makes Union City one of the more affordable options in the Bay Area, particularly compared to neighboring cities like Fremont ($1.4M) or San Jose ($1.5M+). Prices vary by neighborhood, with newer developments near the BART station commanding higher prices, while older established neighborhoods offer more affordable options, typically ranging from $900,000 to $1.4 million depending on size and condition. For a personalized market analysis based on your specific criteria, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team at Cascade California Realty</Link>.</>
  },
  {
    question: "Is Union City a good place to buy a home in 2025?",
    answer: <>Union City is an excellent choice for homebuyers in 2025, especially those looking for value in the Bay Area. The city offers a unique combination of affordability, BART connectivity, diverse community, and central location between San Jose and Oakland/San Francisco. With ongoing development around the BART station and improving amenities, Union City has strong appreciation potential. It's particularly attractive for first-time buyers, young families, and tech workers seeking more affordable options without sacrificing convenient access to major employment centers. The agents at Cascade California Realty have helped dozens of families find their perfect Union City home—<Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link> to discuss your goals.</>
  },
  {
    question: "How does Union City compare to Fremont for affordability?",
    answer: <>Union City is notably more affordable than neighboring Fremont, with median home prices around $1.15 million compared to Fremont's $1.4 million—a savings of approximately $250,000. Both cities share similar amenities including BART access, good schools through the New Haven Unified School District, and proximity to major tech hubs. Union City offers better value for buyers who want similar quality of life at a lower price point. The trade-off is that Fremont has more established neighborhoods and slightly higher-rated schools in some areas, but Union City's affordability makes homeownership achievable for many buyers who would be priced out of Fremont. Wondering which city is right for you? <Link to="/contact" className="text-blue-600 hover:underline">Let's chat</Link>—we know both markets inside and out.</>
  },
  {
    question: "What are the benefits of Union City's BART access?",
    answer: <>Union City has a major BART station that provides direct connections to San Francisco (45-50 minutes), Oakland (30 minutes), and San Jose via connecting transit. This makes it ideal for commuters working throughout the Bay Area. The BART station area has seen significant transit-oriented development with new apartments, retail, and dining options. For homeowners, BART access means you can live in a more affordable area while maintaining easy access to high-paying jobs in SF and Silicon Valley. The station also increases property values—homes within walking distance of BART typically command a premium and appreciate faster than those farther away. If BART proximity is a priority for you, <Link to="/contact" className="text-blue-600 hover:underline">connect with Cascade California Realty</Link> and we'll share our curated list of transit-friendly listings.</>
  },
  {
    question: "Why is Union City's central location valuable?",
    answer: <>Union City's location is one of its greatest assets. Positioned between San Jose (20 miles south) and Oakland/San Francisco (30-40 miles north), it offers balanced access to the entire Bay Area. This is perfect for couples where one partner works in Silicon Valley and the other in SF, or for families wanting to be central to everything. You can reach San Jose in 25 minutes, Oakland in 20 minutes, and San Francisco in 40-45 minutes via I-880 or BART. The central location also means access to amenities in all directions—San Jose shopping, SF culture, and East Bay outdoor recreation are all within easy reach.</>
  },
  {
    question: "What makes Union City attractive for commuters?",
    answer: <>Union City is a commuter's dream with multiple transportation options. BART provides direct rail service to SF, Oakland, and connects to Caltrain/VTA for San Jose. I-880 runs through the city offering highway access north and south, while Highway 84 provides a direct route to the Peninsula via the Dumbarton Bridge. For South Bay tech workers, commutes to Fremont's Tesla plant (10 min), Newark (5 min), Milpitas (15 min), or even Palo Alto (30 min via Dumbarton) are very manageable. The flexibility of both BART and highway access means you're not locked into one commute pattern—valuable as jobs change over time.</>
  },
  {
    question: "What are the schools like in Union City?",
    answer: <>Union City is served primarily by the New Haven Unified School District, which provides solid educational options with several highly-rated schools. James Logan High School is the main comprehensive high school, with strong STEM programs and sports. Elementary schools like Kitayama and Alvarado have good reputations. The district has been investing in facilities and technology. While not rated as highly as some parts of Fremont or Cupertino, New Haven Unified offers quality education and many families are very satisfied. For families prioritizing schools, research specific elementary school boundaries as quality varies by neighborhood. Private school options are also available in nearby Fremont and Newark. Our team at Cascade California Realty can help you identify homes within the school boundaries that matter most—<Link to="/contact" className="text-blue-600 hover:underline">get in touch</Link> to learn more.</>
  },
  {
    question: "Is Union City good for first-time homebuyers?",
    answer: <>Union City is one of the best options in the Bay Area for first-time homebuyers. The median price of $1.15 million, while still high, is significantly more accessible than most Bay Area cities. First-time buyers can find condos starting around $600,000-$700,000 and townhomes in the $800,000-$950,000 range, making homeownership achievable on tech salaries or dual incomes. The city offers good appreciation potential, meaning your first home investment should grow over time. With BART access and central location, you won't sacrifice career opportunities by choosing affordability. Many first-time buyers use Union City as an entry point to build equity, then either stay long-term or trade up later. Navigating your first purchase can feel overwhelming—<Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty specializes in guiding first-time buyers</Link> through every step of the process.</>
  },
  {
    question: "What is the diversity like in Union City?",
    answer: <>Union City is one of the most diverse cities in the Bay Area and California, with a rich multicultural community. The population includes significant Asian American (particularly Filipino, Indian, and Chinese), Hispanic, and Caucasian communities. This diversity is reflected in the city's excellent variety of restaurants, grocery stores, cultural events, and places of worship. For many families, especially those from diverse backgrounds themselves, this multicultural environment is a major selling point—children grow up exposed to many cultures, and there are abundant options for ethnic groceries and authentic cuisine. The diversity creates a welcoming, inclusive atmosphere that many residents highly value.</>
  },
  {
    question: "What are the best neighborhoods in Union City?",
    answer: <>Popular Union City neighborhoods include the Decoto area near BART (walkable to transit, newer developments, good restaurants), Alvarado-Niles (historic charm, established homes, quiet streets), and newer developments near the Mission Boulevard corridor. The area around Quarry Lakes offers proximity to beautiful recreation areas and trails. Union Landing shopping area provides convenient retail and dining. Each neighborhood has distinct character—newer areas near BART are more urban and transit-oriented, while older neighborhoods like Alvarado offer larger lots and mature trees. When choosing, consider proximity to BART (if you'll use it), school boundaries, and whether you prefer newer construction or established neighborhoods. Want a neighborhood tour? <Link to="/contact" className="text-blue-600 hover:underline">Contact Cascade California Realty</Link> and we'll show you the areas that best fit your lifestyle.</>
  },
  {
    question: "How much do I need to earn to buy a home in Union City?",
    answer: <>To comfortably afford a median-priced home in Union City ($1.15 million), you typically need a household income of $250,000-$300,000, assuming a 20% down payment ($230,000) and following the 28% debt-to-income guideline. This is more achievable than San Francisco or Peninsula cities requiring $350,000-$400,000+. For first-time buyers targeting condos ($600,000-$700,000) or townhomes ($800,000-$900,000), household incomes of $150,000-$200,000 can work. Many tech workers, healthcare professionals, or dual-income couples can qualify. Using FHA loans (3.5% down) or first-time buyer programs can reduce the income needed, making Union City accessible to more buyers. Unsure about your budget? <Link to="/contact" className="text-blue-600 hover:underline">We can connect you with trusted lenders</Link> who can help you understand your options.</>
  },
  {
    question: "What are the property taxes in Union City?",
    answer: <>Union City property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local Alameda County bonds and assessments. This is slightly lower than San Francisco (1.18%) and similar to other East Bay cities. For a $1.15 million home, expect annual property taxes around $12,650-$13,800. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation. New buyers are assessed at purchase price, so if you buy at $1.15M, that becomes your initial assessed value. This makes long-term ownership increasingly affordable as market values rise faster than assessments.</>
  },
  {
    question: "What amenities and shopping are available in Union City?",
    answer: <>Union City has significantly improved its retail and dining options in recent years. Union Landing is a major shopping center with Target, Best Buy, Ross, and various restaurants. The BART station area has seen new development with diverse restaurants, cafes, and services. You'll find excellent ethnic grocery stores including 99 Ranch Market, Seafood City (Filipino), and Indian groceries, reflecting the city's diversity. For major shopping, Fremont's Pacific Commons and NewPark Mall are 10 minutes away. The city has several parks including the beautiful Quarry Lakes Regional Park for hiking, fishing, and picnicking. While not as amenity-rich as larger cities, Union City offers solid everyday conveniences with easy access to neighboring cities for more options.</>
  },
  {
    question: "What recreation and outdoor activities are available in Union City?",
    answer: <>Union City offers excellent outdoor recreation, highlighted by Quarry Lakes Regional Park—a 450-acre park with swimming lagoons, fishing, hiking trails, and picnic areas. It's one of the best outdoor amenities in the area and a major draw for active families. The city has numerous neighborhood parks, sports fields, and the Union City Aquatic Center. You're also close to regional trails including the Alameda Creek Trail (12-mile walking/biking path), and it's a short drive to Mission Peak in Fremont for hiking, or the Bay Trail for waterfront access. Coyote Hills Regional Park is nearby for wildlife viewing and trails. For a more affordable Bay Area city, Union City punches above its weight in outdoor recreation options.</>
  },
  {
    question: "Is Union City safe? What's the crime rate like?",
    answer: <>Union City has a moderate crime rate, generally safer than Oakland or parts of San Jose, but with slightly higher property crime than Fremont or some Peninsula cities. Like most Bay Area cities, car break-ins and package theft do occur, especially near shopping areas. Violent crime is relatively low. The police department is responsive and the city has invested in community policing programs. Safety varies by neighborhood—the Decoto and Alvarado areas are generally considered very safe, while some apartment complexes near major roads have had more issues. Overall, most residents feel safe and families are comfortable raising children here. Standard precautions (locking cars, securing packages, home security systems) are recommended as anywhere in the Bay Area.</>
  },
  {
    question: "What is the rental market like in Union City?",
    answer: <>Union City has a strong rental market, which is good news for homeowners considering renting out a property or building an ADU. Single-family homes typically rent for $3,500-$4,500/month depending on size and condition. Apartments and condos rent for $2,200-$3,000 for 1-2 bedrooms. The proximity to BART, affordability compared to SF, and central location make Union City attractive to renters working throughout the Bay Area. If you're considering buying and renting out rooms or building an ADU (Accessory Dwelling Unit), the rental income can significantly help with mortgage payments. The city has been supportive of ADU development, and many homeowners are building units to generate income or house family members. Interested in investment properties? <Link to="/contact" className="text-blue-600 hover:underline">Reach out to our team</Link> for insights on ADU-friendly properties and rental income potential.</>
  },
  {
    question: "What are the HOA fees like in Union City?",
    answer: <>HOA fees in Union City vary significantly by property type and age. Condos typically have HOA fees ranging from $300-$600 per month, covering building insurance, common area maintenance, water/garbage, and reserves. Townhome communities generally charge $200-$400 per month. Newer developments near BART may have higher fees ($400-$600) but often include more amenities like gyms, pools, or landscaping. Single-family homes in planned communities might have minimal HOA fees ($50-$150/month) for common areas and neighborhood amenities. Always review HOA financial documents before purchasing—look for healthy reserves (typically 6+ months of expenses), no recent special assessments, and reasonable fee history. Low fees aren't always good if they indicate deferred maintenance. Our agents at Cascade California Realty know which HOAs are well-managed—<Link to="/contact" className="text-blue-600 hover:underline">ask us for insider knowledge</Link> before you commit.</>
  },
  {
    question: "How competitive is the Union City housing market?",
    answer: <>Union City's market competitiveness has moderated from the intense bidding wars of 2020-2021 but remains competitive, especially for well-priced homes in good condition. Entry-level properties under $1 million often see multiple offers, while homes above $1.3 million may sit longer and have more room for negotiation. Well-maintained homes near BART or in top school areas typically sell quickly, sometimes over asking. To be competitive, buyers should: get fully pre-approved (not just pre-qualified), be ready to act quickly when the right property appears, consider waiving some contingencies if comfortable, and work with an experienced local agent who knows Union City. The market is more balanced than San Francisco or Peninsula cities, giving buyers more negotiating power. Having an agent who knows the local dynamics can make all the difference—<Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty has a proven track record</Link> in Union City.</>
  },
  {
    question: "What are the future development plans for Union City?",
    answer: <>Union City has ambitious development plans, particularly around the BART station area (Intermodal Station District), with planned high-density residential, office space, retail, and improved pedestrian connectivity. The city is encouraging transit-oriented development to create a more walkable urban core. Infrastructure improvements are ongoing, including road upgrades and park enhancements. The city is also promoting ADU development to increase housing supply. These improvements should enhance property values over time, particularly for homes near BART and major corridors. The development plans aim to transform Union City from a primarily suburban bedroom community into a more complete city with jobs, housing, and amenities. For buyers, this suggests good long-term appreciation potential as the city continues evolving.</>
  },
  {
    question: "Should I buy in Union City or keep renting?",
    answer: <>The buy vs. rent decision in Union City depends on your timeline and financial situation. With median rents around $3,500 for a 3-bedroom and home prices at $1.15 million, buying typically makes sense if you plan to stay 5+ years and can afford the down payment ($230,000 for 20% down). Union City offers better buy vs. rent economics than SF or the Peninsula—monthly ownership costs (mortgage, taxes, insurance) on a $1.15M home are around $6,500-$7,000, but you're building equity and benefiting from appreciation and Prop 13 tax protection. If you can afford it and plan to stay in the Bay Area, buying in Union City is often the better long-term financial decision. Renters have flexibility but miss out on equity building and are subject to rent increases. Ready to make the move from renting to owning? <Link to="/contact" className="text-blue-600 hover:underline">Talk to Cascade California Realty</Link> and we'll help you crunch the numbers for your situation.</>
  }
];

export function UnionCityFAQ() {
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
        title="Best Realtor in Union City | Manoj Thomas - Top Union City Real Estate Agent 2025"
        description="Looking for the best realtor in Union City? Manoj Thomas is the #1 rated Union City real estate agent with 15+ years experience, $1B+ sales. Expert in Union City homes and neighborhoods."
        canonical="https://cascaderealtors.com/union-city"
        city="Union City"
        county="Alameda County"
        coordinates={{ lat: 37.5934, lng: -122.0439 }}
      />
      <FAQHeader />
      <FAQHero
        title="Union City Real Estate FAQ"
        description="Everything you need to know about buying a home in Union City. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="union-city" />

      <Footer />
    </div>
  );
}
