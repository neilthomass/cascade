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
    question: "What is the average home price in Sunnyvale?",
    answer: "The median home price in Sunnyvale is approximately $1.9 million as of 2025. Sunnyvale offers excellent value compared to neighboring cities like Cupertino ($3+ million median) and Los Altos ($4+ million median), while still providing top-rated schools, proximity to major tech employers, and a central Bay Area location. Prices vary by neighborhood—Lakewood and Cherry Chase command premium prices, while other areas offer more accessible entry points."
  },
  {
    question: "Is Sunnyvale a good place to buy a home in 2025?",
    answer: "Sunnyvale is an excellent choice for home buyers in 2025. The city offers strong value relative to neighboring cities, with a median home price around $1.9M compared to $3M+ in Cupertino and $4M+ in Los Altos. You get access to highly-rated Sunnyvale School District schools, proximity to Apple, LinkedIn, Google, and other major tech employers, plus a central Bay Area location that makes commuting anywhere convenient. The city's diverse dining scene and family-friendly neighborhoods make it ideal for long-term homeownership."
  },
  {
    question: "What are the best neighborhoods in Sunnyvale for families?",
    answer: "Top family-friendly neighborhoods in Sunnyvale include Lakewood (premium area with excellent schools, well-maintained homes, and strong community), Cherry Chase (highly desirable for schools and walkability), and the areas around downtown Murphy Avenue (vibrant downtown access, excellent restaurants, good schools). Each offers strong schools, safe streets, and easy access to parks. The Sunnyvale School District serves most of the city and is known for high-performing elementary and middle schools."
  },
  {
    question: "How does Sunnyvale compare to Cupertino and Los Altos for home buyers?",
    answer: "Sunnyvale offers exceptional value compared to Cupertino and Los Altos. While Cupertino's median home price exceeds $3 million and Los Altos tops $4 million, Sunnyvale's $1.9 million median provides similar quality of life at nearly half the cost. You get access to excellent schools (Sunnyvale School District), proximity to the same tech employers (Apple, Google, LinkedIn), diverse dining options, and a central location. For buyers seeking value without compromising on amenities, schools, or location, Sunnyvale is hard to beat."
  },
  {
    question: "What tech companies are near Sunnyvale?",
    answer: "Sunnyvale is at the heart of Silicon Valley's tech corridor. Apple's massive campus is in neighboring Cupertino (5-10 minute drive), LinkedIn headquarters is in Sunnyvale, Google has major offices throughout Mountain View (adjacent city), and numerous other tech companies have offices in or near Sunnyvale. The central location means easy commutes to San Jose, Palo Alto, and San Francisco via Caltrain or Highway 101/280. Many tech professionals choose Sunnyvale specifically for its proximity to multiple major employers."
  },
  {
    question: "How are the schools in Sunnyvale?",
    answer: "Sunnyvale School District serves most of the city and is highly regarded, with several schools receiving excellent ratings. Many families specifically choose Sunnyvale for the school quality combined with more affordable housing than Cupertino or Palo Alto. Elementary schools like Cumberland, Vargas, and Cherry Chase Elementary are particularly well-regarded. For high school, students typically attend Fremont High School (Sunnyvale School District) or Homestead High School (Fremont Union High School District), both offering strong academics and programs."
  },
  {
    question: "What is the dining scene like in Sunnyvale?",
    answer: "Sunnyvale boasts one of the Bay Area's most diverse dining scenes. Downtown Murphy Avenue features excellent restaurants ranging from upscale American to authentic international cuisines. The city's diverse population supports outstanding Chinese, Indian, Vietnamese, Japanese, Korean, and Mexican restaurants. Whether you're looking for casual family dining, ethnic food, or fine dining, Sunnyvale delivers. The concentration of high-quality restaurants rivals much larger cities, making it a foodie destination within the South Bay."
  },
  {
    question: "What makes Sunnyvale's location so convenient?",
    answer: "Sunnyvale's central Bay Area location is one of its biggest advantages. You can reach San Francisco in 45-60 minutes via Caltrain or Highway 101, San Jose in 15-20 minutes, Palo Alto in 10-15 minutes, and Santa Cruz beaches in 45 minutes. Highways 101, 280, and 237 provide easy access throughout the region. The central location means you're never far from anywhere you need to be—whether commuting to San Francisco, attending events in San Jose, or enjoying weekend trips to wine country or the coast."
  },
  {
    question: "What are property taxes like in Sunnyvale?",
    answer: "Sunnyvale property taxes are approximately 1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments. For a home purchased at the $1.9 million median price, annual property taxes would be around $22,800. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation, providing long-term tax predictability. New buyers are assessed at purchase price."
  },
  {
    question: "How much income do I need to buy a home in Sunnyvale?",
    answer: "To comfortably afford Sunnyvale's median home price of $1.9M, you typically need a household income of $425,000-$550,000, assuming a 20% down payment and following the 28% debt-to-income guideline. Many tech professionals in the area meet this threshold given Silicon Valley salaries. First-time buyers might consider condos or townhomes with lower price points, or look at neighborhoods outside the premium areas like Lakewood and Cherry Chase for more accessible options."
  },
  {
    question: "What are the best areas in Sunnyvale for first-time buyers?",
    answer: "First-time buyers in Sunnyvale should explore condos and townhomes throughout the city, which offer more accessible entry points than single-family homes. Areas near downtown Murphy Avenue provide walkability and urban amenities. Neighborhoods slightly further from the premium Lakewood and Cherry Chase areas can offer better value while still providing access to good schools and convenient location. The key advantage is that even more affordable Sunnyvale properties still offer the city's excellent schools, central location, and proximity to tech employers."
  },
  {
    question: "Is downtown Sunnyvale (Murphy Avenue) a good place to live?",
    answer: "Downtown Sunnyvale around Murphy Avenue is excellent for buyers who value walkability and urban amenities. The area features a vibrant downtown with diverse restaurants, cafes, shops, and weekend farmers market. You get small-town charm with big-city dining options, plus easy access to Caltrain for commuting to San Francisco or San Jose. Properties near downtown tend to be well-maintained, and the neighborhood has strong community feel. Families appreciate being able to walk to restaurants, parks, and community events."
  },
  {
    question: "What is the commute like from Sunnyvale to San Francisco?",
    answer: "Sunnyvale to San Francisco commutes typically take 45-60 minutes. Caltrain offers direct service from Sunnyvale Station to San Francisco (about 60-75 minutes), which many professionals prefer for the ability to work during the commute. Driving via Highway 101 takes 45-60 minutes in good traffic, longer during peak hours. Highway 280 offers a more scenic alternative with similar timing. Many tech workers commute 2-3 days per week with remote work flexibility, making the commute manageable."
  },
  {
    question: "How competitive is the Sunnyvale housing market?",
    answer: "Sunnyvale's housing market is competitive but less frenzied than neighboring Cupertino or Palo Alto. Well-priced homes in desirable neighborhoods like Lakewood and Cherry Chase often receive multiple offers and sell at or above asking. Properties in good school areas attract strong buyer interest. However, the market has more inventory than ultra-competitive nearby cities, giving buyers slightly more negotiating room. Working with an experienced local agent who knows Sunnyvale's micro-neighborhoods is essential for navigating the market successfully."
  },
  {
    question: "What should I know about Lakewood neighborhood in Sunnyvale?",
    answer: "Lakewood is Sunnyvale's most prestigious neighborhood, known for tree-lined streets, well-maintained homes, excellent schools, and strong property values. Homes typically range from $2.5M-$4M+, commanding premium prices for the area's reputation and amenities. The neighborhood features larger lots, mature landscaping, and a strong sense of community. Families choose Lakewood for the combination of top schools, safe streets, and proximity to tech employers. Competition for homes here is intense, with properties often selling quickly with multiple offers."
  },
  {
    question: "Are there any first-time homebuyer programs for Sunnyvale?",
    answer: "First-time buyers in Sunnyvale can access several assistance programs including CalHFA state-level down payment assistance, FHA loans requiring only 3.5% down, conventional loans with 3% down, and VA loans for veterans requiring 0% down. Some employers in the area, particularly tech companies, offer housing assistance benefits. The high cost of Bay Area housing means many first-time buyers start with condos or townhomes to build equity before upgrading to single-family homes. Income limits apply to most programs."
  },
  {
    question: "What are HOA fees like for Sunnyvale condos and townhomes?",
    answer: "Sunnyvale condo and townhome HOA fees typically range from $300-$700 per month depending on the complex, amenities, and age of the building. Fees generally cover building insurance, common area maintenance, landscaping, water/garbage, and reserve funds. When evaluating properties, request HOA financial documents and meeting minutes to check for deferred maintenance or upcoming special assessments. Well-managed HOAs with adequate reserves are essential for protecting your investment."
  },
  {
    question: "What is unique about living in Sunnyvale compared to other South Bay cities?",
    answer: "Sunnyvale uniquely combines excellent value, top schools, central location, and diverse amenities. Unlike Cupertino or Los Altos with their premium prices, Sunnyvale offers similar quality of life at significantly lower cost. The city's diversity creates an outstanding restaurant scene rivaling much larger cities. You get small-town feel around downtown Murphy Avenue combined with Silicon Valley convenience and tech employer access. The central location means easy access to San Francisco, San Jose, beaches, and wine country. It's the rare Bay Area city offering the complete package without the premium price tag."
  },
  {
    question: "How do I choose the right real estate agent in Sunnyvale?",
    answer: "Choose a Sunnyvale agent based on: deep local knowledge of specific neighborhoods like Lakewood, Cherry Chase, and downtown areas; experience with the competitive South Bay market; strong track record of successful transactions in Sunnyvale specifically; understanding of school boundaries and district differences; and excellent negotiation skills for multiple-offer situations. Interview 2-3 agents and ask for recent Sunnyvale references. In a market where a $1.9M median means high stakes, an experienced local agent's guidance on pricing, strategy, and neighborhood selection is invaluable."
  },
  {
    question: "What questions should I ask when buying a home in Sunnyvale?",
    answer: "Essential questions for Sunnyvale home purchases include: 1) Which school attendance areas does the property fall within? (boundaries matter significantly), 2) What is the home's foundation type and condition? 3) Has the property been seismically retrofitted? 4) What is the age and condition of major systems (roof, HVAC, water heater)? 5) Are there any HOA fees or restrictions? 6) What's the neighborhood's walkability and proximity to parks/amenities? 7) How close are major tech employers for commuting? 8) What work has been done and were permits pulled? 9) Why is the seller moving? A knowledgeable local agent will help investigate each thoroughly."
  }
];

export function SunnyvaleFAQ() {
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
        title="Sunnyvale Real Estate FAQ | Home Buying Guide 2025"
        description="Expert answers to common Sunnyvale home buying questions. Learn about prices, neighborhoods, and more from a Bay Area realtor with 15+ years experience."
        canonical="https://cascaderealtors.com/sunnyvale"
        city="Sunnyvale"
        coordinates={{ lat: 37.3688, lng: -122.0363 }}
      />
      <FAQHeader />
      <FAQHero
        title="Sunnyvale Real Estate FAQ"
        description="Everything you need to know about buying a home in Sunnyvale. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="sunnyvale" />

      <Footer />
    </div>
  );
}
