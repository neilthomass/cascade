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
    question: "What is the average home price in Redwood City?",
    answer: <>The median home price in Redwood City is approximately $1.8 million as of 2024. Prices vary significantly by neighborhood—homes in eastern Redwood City start around $1.2 million, while properties in premium areas like Emerald Hills can exceed $3 million. The city's strong job market, excellent schools through Redwood City School District, and Caltrain access contribute to steady appreciation despite market fluctuations. For a personalized market analysis tailored to your budget, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our Redwood City specialists</Link>.</>
  },
  {
    question: "Is Redwood City a good place to buy a home in 2025?",
    answer: <>Redwood City offers excellent value for buyers in 2025. The city's ongoing downtown revitalization has created a vibrant urban core with new restaurants, shops, and entertainment. Major tech companies have offices nearby, supporting strong employment. The combination of good schools, diverse neighborhoods, transit access, and more affordable prices compared to nearby Palo Alto and Menlo Park makes Redwood City an attractive investment for both families and professionals. The team at Cascade California Realty has helped many buyers find their perfect Redwood City home—<Link to="/contact" className="text-blue-600 hover:underline">let's discuss your goals</Link>.</>
  },
  {
    question: "What are the best neighborhoods in Redwood City for families?",
    answer: <>Top family-friendly neighborhoods in Redwood City include Emerald Hills (excellent schools, quiet tree-lined streets, large lots), Mt. Carmel (safe community, strong schools, parks), Friendly Acres (central location, family-oriented), and Redwood Shores (waterfront living, newer construction, resort-like amenities). Each neighborhood offers access to the highly-rated Redwood City School District and proximity to parks, libraries, and family activities. Choosing the right neighborhood is a big decision—<Link to="/contact" className="text-blue-600 hover:underline">connect with us</Link> to explore which area best fits your family's lifestyle.</>
  },
  {
    question: "How does Redwood City's downtown revitalization affect home values?",
    answer: <>Redwood City's downtown revitalization has significantly boosted property values, particularly in walkable areas near the Caltrain station. The transformation brought upscale dining, entertainment venues, farmers markets, and cultural events, making downtown a destination. Homes within walking distance of downtown have appreciated faster than outlying areas. This urban renewal attracts young professionals and empty nesters who value walkability and vibrant street life, creating strong demand and price stability. Want to know which blocks are appreciating fastest? <Link to="/contact" className="text-blue-600 hover:underline">Our local experts can share the latest insights</Link>.</>
  },
  {
    question: "What tech companies are in or near Redwood City?",
    answer: <>Redwood City and surrounding areas host numerous tech companies including Oracle (headquarters), Electronic Arts, Box, Equinix, and Informatica. Nearby Menlo Park houses Meta (Facebook), while Google and other Silicon Valley giants are within a short commute. This tech concentration creates high-paying jobs, attracts educated professionals, and supports robust housing demand. Many tech workers choose Redwood City for its relative affordability compared to Palo Alto while maintaining easy access to major employers. If you're relocating for work, <Link to="/contact" className="text-blue-600 hover:underline">we can help you find a home that minimizes your commute</Link>.</>
  },
  {
    question: "How much do I need to earn to buy a house in Redwood City?",
    answer: <>To comfortably afford a median-priced home in Redwood City ($1.8M), you typically need a household income of $400,000-$500,000, assuming a 20% down payment ($360,000) and following the 28% debt-to-income ratio guideline. Tech industry salaries in the area often support these price points. First-time buyers may start with condos or townhomes in the $800,000-$1.2M range, requiring incomes of $180,000-$275,000. Down payment assistance programs can help qualifying buyers. <Link to="/contact" className="text-blue-600 hover:underline">Talk to our team</Link> about financing strategies and lender recommendations.</>
  },
  {
    question: "What makes Redwood City's location attractive?",
    answer: <>Redwood City's central Peninsula location offers unmatched convenience. Caltrain provides direct access to San Francisco (35 minutes) and San Jose (25 minutes), making it ideal for commuters. Highway 101 and 280 run through the city for car commuters. San Francisco Airport is 20 minutes north, while San Jose Airport is 25 minutes south. The weather is notably warmer and sunnier than San Francisco, with less fog than coastal areas. This 'climate best by government test' slogan reflects the mild year-round conditions. Ready to experience Redwood City's ideal location for yourself? <Link to="/contact" className="text-blue-600 hover:underline">Schedule a neighborhood tour with us</Link>.</>
  },
  {
    question: "What are the property taxes in Redwood City?",
    answer: <>Redwood City property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments for schools and services. Thanks to Prop 13, your assessed value increases by a maximum of 2% annually regardless of market appreciation. A home purchased for $1.8M would have annual taxes around $20,000-$21,600. San Mateo County's efficient services and excellent schools make this tax rate competitive with neighboring cities. Our agents at Cascade California Realty can walk you through the full cost picture—<Link to="/contact" className="text-blue-600 hover:underline">get in touch</Link>.</>
  },
  {
    question: "How is the Redwood City School District?",
    answer: <>Redwood City School District serves elementary and middle school students with generally good ratings. Top-performing schools include Clifford Elementary, Roy Cloud Elementary, and Kennedy Middle School. The district has invested in STEM programs and facility improvements. For high school, students attend Sequoia Union High School District schools, including Sequoia High and Woodside High. Many families also consider private schools like Sacred Heart Schools Atherton or Nueva School, which are easily accessible from Redwood City. Need help finding a home in a specific school zone? <Link to="/contact" className="text-blue-600 hover:underline">We specialize in matching families with the right neighborhoods</Link>.</>
  },
  {
    question: "What is Emerald Hills like in Redwood City?",
    answer: <>Emerald Hills is Redwood City's most prestigious neighborhood, featuring large custom homes on spacious lots with stunning hillside views. Properties typically range from $2.5M to over $5M for estates. The area offers privacy, excellent schools, proximity to top-rated Woodside Elementary, and easy access to I-280. Residents enjoy a semi-rural atmosphere with hiking trails and open space while being just minutes from downtown Redwood City's amenities. This neighborhood attracts executives, established professionals, and families seeking luxury and tranquility. Interested in Emerald Hills listings? <Link to="/contact" className="text-blue-600 hover:underline">Our team can arrange private showings</Link>.</>
  },
  {
    question: "What is Redwood Shores and why is it popular?",
    answer: <>Redwood Shores is a master-planned waterfront community on the bay with resort-like amenities including a lagoon, walking paths, parks, and beach access. Built primarily in the 1960s-80s with continued development, it offers single-family homes ($1.5M-$3M+) and townhomes ($900K-$1.5M). Oracle's headquarters anchors the area, creating walkable employment. The neighborhood features excellent schools, low crime, and a strong sense of community. Its unique waterfront setting, modern planning, and tech proximity make it highly desirable for professionals and families. Curious about waterfront living? <Link to="/contact" className="text-blue-600 hover:underline">Let us show you what Redwood Shores has to offer</Link>.</>
  },
  {
    question: "How diverse is Redwood City's community?",
    answer: <>Redwood City is one of the Peninsula's most ethnically and economically diverse communities, earning its slogan 'Climate Best by Government Test, People Best by Their Own Request.' The city has significant Hispanic/Latino (approximately 40%), Asian (15%), and White (40%) populations, along with established communities from various backgrounds. This diversity is reflected in excellent ethnic restaurants, cultural events, and inclusive neighborhoods. Downtown features authentic Mexican taquerias alongside upscale dining, while markets cater to various cuisines. This multicultural atmosphere attracts residents who value diversity and authentic experiences. At Cascade California Realty, we celebrate this diversity and would love to <Link to="/contact" className="text-blue-600 hover:underline">introduce you to Redwood City's vibrant communities</Link>.</>
  },
  {
    question: "What is the commute like from Redwood City?",
    answer: <>Redwood City offers excellent commute options. Caltrain provides frequent service to San Francisco (35-40 minutes) and San Jose (25 minutes) with express trains during peak hours. The station is being upgraded for electrified service. By car, Highway 101 runs through the city for South Bay commutes, while I-280 provides scenic access to San Francisco (30-40 minutes) and Los Altos/Cupertino (20 minutes). SamTrans buses serve the area. Many tech campuses in Menlo Park, Palo Alto, and Mountain View are within 15-20 minutes, making reverse commutes easy. Tell us where you work, and <Link to="/contact" className="text-blue-600 hover:underline">we'll help you find the ideal neighborhood for your commute</Link>.</>
  },
  {
    question: "Are there good restaurants and amenities in Redwood City?",
    answer: <>Redwood City's downtown transformation brought exceptional dining and entertainment. Broadway and adjacent streets feature upscale restaurants like Vesta, Grill & Vine, and Donato Enoteca alongside authentic taquerias, Asian cuisine, and casual cafes. The Fox Theatre hosts concerts and events. Farmers markets operate twice weekly. Century cinema, boutique shopping, and nightlife round out the urban experience. Whole Foods, Trader Joe's, and Safeway serve grocery needs. The combination of walkable urbanism and diverse dining rivals larger Peninsula cities while maintaining a neighborhood feel.</>
  },
  {
    question: "What are the hidden costs of buying a home in Redwood City?",
    answer: <>Beyond the purchase price, Redwood City buyers should budget for: closing costs (2-3% of purchase price), property transfer tax ($5.50 per $1,000 of purchase price in San Mateo County), title insurance, inspection fees ($500-$1,500), HOA fees for condos/townhomes ($300-$800+/month), and ongoing maintenance. Older homes may need foundation work, seismic retrofitting, or updating. Properties in Emerald Hills or hillside areas may have higher insurance due to fire risk. Budget 1-2% of home value annually for maintenance and repairs. We're happy to <Link to="/contact" className="text-blue-600 hover:underline">help you understand the full financial picture</Link> before you make an offer.</>
  },
  {
    question: "Is Redwood City safe?",
    answer: <>Redwood City's safety varies by neighborhood. Areas like Emerald Hills, Mt. Carmel, Redwood Shores, and Friendly Acres have low crime rates and strong community watch programs. Downtown has improved significantly with revitalization, though property crime can occur. Eastern Redwood City neighborhoods have higher crime rates but are seeing improvements. Overall, Redwood City's crime statistics are moderate for the Bay Area. The police department is responsive, and neighborhood associations actively promote safety. Research specific neighborhoods and visit at different times before buying. We know which streets and blocks offer the best security—<Link to="/contact" className="text-blue-600 hover:underline">ask us for candid neighborhood insights</Link>.</>
  },
  {
    question: "What types of homes are available in Redwood City?",
    answer: <>Redwood City offers diverse housing stock reflecting different eras of development. Options include: charming 1920s-1950s bungalows and ranch homes in central neighborhoods ($1.2M-$2M), luxury custom homes in Emerald Hills ($2.5M-$5M+), modern townhomes and condos downtown ($800K-$1.5M), waterfront properties in Redwood Shores ($1.5M-$3M+), and newer construction developments. This variety allows buyers with different budgets and lifestyle preferences to find suitable properties, from starter condos to executive estates. Not sure which style suits you? <Link to="/contact" className="text-blue-600 hover:underline">We'll help you explore your options</Link>.</>
  },
  {
    question: "How is the investment potential for Redwood City real estate?",
    answer: <>Redwood City offers strong investment potential driven by multiple factors: ongoing downtown revitalization, major tech employers creating job growth, Caltrain electrification improving transit, excellent schools attracting families, and relative affordability versus nearby Palo Alto/Menlo Park. The city's climate, diversity, and urban amenities appeal to millennials and Gen Z tech workers. Housing supply constraints throughout the Peninsula support long-term appreciation. Areas near downtown and Caltrain offer highest growth potential, while established neighborhoods provide stability. Five-year hold periods typically show strong returns. For a detailed investment analysis, <Link to="/contact" className="text-blue-600 hover:underline">consult with our Redwood City market specialists</Link>.</>
  },
  {
    question: "What should I know about buying near downtown Redwood City?",
    answer: <>Downtown Redwood City properties offer walkability, dining, entertainment, and easy Caltrain access, making them popular with young professionals and empty nesters. Condos and townhomes ($700K-$1.5M) dominate, though some single-family homes exist. Consider: HOA fees and rules, street parking limitations, noise from restaurants/bars on weekends, ongoing construction as development continues, and potential for future appreciation as the area matures. Units near the Caltrain station command premiums. The lifestyle suits those who prioritize urban convenience over yard space and quiet. <Link to="/contact" className="text-blue-600 hover:underline">Reach out to Cascade California Realty</Link> to tour the best downtown listings.</>
  },
  {
    question: "How do I choose the right real estate agent in Redwood City?",
    answer: <>Choose a Redwood City agent based on: deep knowledge of specific neighborhoods (Emerald Hills differs greatly from downtown or Redwood Shores), experience with local market dynamics, strong negotiation skills for competitive situations, connections to inspectors and contractors familiar with area-specific issues (hillside properties, older foundation types), and references from recent clients. Interview 2-3 agents before deciding. Look for someone who asks about your lifestyle priorities and budget rather than just showing listings. An experienced local agent provides invaluable guidance on schools, commutes, and neighborhood character. The agents at Cascade California Realty bring exactly this expertise—<Link to="/contact" className="text-blue-600 hover:underline">let's start a conversation about your home search</Link>.</>
  }
];

export function RedwoodCityFAQ() {
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
        title="Best Realtor in Redwood City | Manoj Thomas - Top Redwood City Real Estate Agent 2025"
        description="Looking for the best realtor in Redwood City? Manoj Thomas is the #1 rated Redwood City real estate agent with 15+ years experience, $1B+ sales. Expert in Redwood City homes and neighborhoods."
        canonical="https://cascaderealtors.com/redwood-city"
        city="Redwood City"
        county="San Mateo County"
        coordinates={{ lat: 37.4852, lng: -122.2364 }}
      />
      <FAQHeader />
      <FAQHero
        title="Redwood City Real Estate FAQ"
        description="Everything you need to know about buying a home in Redwood City. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="redwood-city" />

      <Footer />
    </div>
  );
}
