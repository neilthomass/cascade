import { ChevronDown, Phone, Mail, ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
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
    question: "What is the average home price in Daly City?",
    answer: "The median home price in Daly City is approximately $1.1 million as of 2024, making it one of the most affordable options for homebuyers seeking proximity to San Francisco. Prices vary by neighborhood, with homes in Westlake and Serramonte areas ranging from $900,000 to $1.3 million for single-family homes. Condos and townhomes are available starting around $600,000, offering excellent entry points for first-time buyers."
  },
  {
    question: "Why is Daly City considered an affordable San Francisco-adjacent option?",
    answer: "Daly City offers exceptional value compared to San Francisco, with median home prices around $250,000 lower while maintaining BART access and a short commute to the city. You get more square footage, often larger lots, and the same access to Bay Area employment centers. The city's location right on the San Francisco border means you can enjoy urban amenities while building equity faster than in SF proper. For buyers priced out of San Francisco, Daly City represents smart value without sacrificing convenience."
  },
  {
    question: "Is Daly City good for first-time homebuyers?",
    answer: "Daly City is excellent for first-time buyers seeking Bay Area homeownership. The lower price point compared to San Francisco means smaller down payments and more manageable monthly payments while still offering excellent appreciation potential. The city has strong public transit via BART, good schools in certain areas, and a stable housing market. Many first-time buyers start here, build equity over 5-7 years, then either stay long-term or leverage their appreciation to move elsewhere. San Mateo County also offers first-time buyer programs and down payment assistance."
  },
  {
    question: "How is the BART access from Daly City?",
    answer: "Daly City offers exceptional BART access with two stations: Daly City BART (the original terminus and major hub) and Colma BART. The Daly City station connects to both the Red and Green lines, providing direct service to downtown San Francisco (15-20 minutes), SFO airport (20 minutes), and East Bay destinations. Many Daly City neighborhoods are within walking or short bus distance of BART. This transit access is a major draw for commuters and significantly enhances property values, especially for homes within a half-mile of stations."
  },
  {
    question: "What makes Daly City's community diverse?",
    answer: "Daly City is one of the Bay Area's most diverse cities, with a rich multicultural population. The city has a significant Filipino-American community (one of the largest in the U.S.), along with substantial Chinese, Latino, Pacific Islander, and other Asian communities. This diversity is reflected in the local businesses, restaurants, cultural events, and community organizations. The city celebrates numerous cultural festivals throughout the year, and neighborhood associations foster inclusive community engagement. For buyers seeking a welcoming, multicultural environment, Daly City offers authentic diversity."
  },
  {
    question: "Where can I find diverse dining options in Daly City?",
    answer: "Daly City's diverse population has created an exceptional dining scene. The city is famous for authentic Filipino restaurants along Mission Street and throughout Westlake, offering everything from traditional Filipino breakfast to specialty dishes. You'll find excellent Chinese restaurants (dim sum, Cantonese, Szechuan), Mexican taquerias, Vietnamese pho shops, and Pacific Islander cuisine. The Serramonte Center area and along Mission Street corridor host dozens of international eateries. For food enthusiasts, Daly City punches well above its weight class, with authentic cuisine you won't find elsewhere."
  },
  {
    question: "How easy is the commute from Daly City to San Francisco?",
    answer: "Commuting from Daly City to San Francisco is remarkably convenient. BART takes 15-20 minutes to reach downtown SF stations. By car, you're 10-15 minutes to SF neighborhoods via I-280 or Highway 1 during off-peak hours (allow 30-45 minutes during rush hour). Many residents bike into SF's Sunset District or take SamTrans buses. The proximity means you can easily access San Francisco for work, dining, and entertainment while enjoying lower housing costs. Remote workers especially appreciate having SF access without SF prices."
  },
  {
    question: "What should I know about Daly City's fog belt?",
    answer: "Daly City sits squarely in the Bay Area's fog belt, particularly neighborhoods closer to the coast and higher elevations. Summer fog is common, with marine layer often present until afternoon. This means cooler temperatures (typically 10-15 degrees cooler than inland areas), less sunshine, and a need for layered clothing year-round. However, the fog moderates temperatures—no extreme heat or cold—and keeps air quality excellent. Many residents love the cool climate, lower AC costs, and dramatic fog views. Neighborhoods like Westlake in the valley get less fog than hilltop areas."
  },
  {
    question: "What makes Westlake a desirable neighborhood in Daly City?",
    answer: "Westlake is Daly City's master-planned neighborhood, developed in the 1960s with a distinctive mid-century aesthetic. The neighborhood features curving streets, consistent architecture, Westlake Shopping Center, and proximity to Lake Merced. Westlake offers good schools, family-friendly parks, a tight-knit community feel, and slightly warmer weather than hilltop areas. Properties here range from townhomes to single-family homes, many with original character or tasteful updates. The neighborhood attracts families and first-time buyers seeking community atmosphere. Home values have steadily appreciated, and the area maintains strong demand."
  },
  {
    question: "Is Daly City a good real estate investment?",
    answer: "Daly City offers compelling investment potential. The city's proximity to San Francisco, BART access, and relative affordability create strong rental demand. Properties have shown consistent long-term appreciation, typically tracking 70-80% of San Francisco's gains with less volatility. The city's limited available land constrains supply, supporting prices. Rental yields are decent given lower purchase prices, and the diverse economy (healthcare, retail, services) provides employment stability. For buy-and-hold investors, Daly City offers appreciation potential with more manageable entry costs than San Francisco."
  },
  {
    question: "What are the property taxes in Daly City?",
    answer: "Daly City property taxes are approximately 1.15-1.20% of assessed value annually, slightly lower than San Francisco. This includes the base 1% Proposition 13 rate plus San Mateo County bonds and local assessments. Like all California properties, Prop 13 limits annual assessment increases to 2% regardless of market appreciation, with reassessment only upon sale. For a median-priced home at $1.1M, expect annual property taxes around $12,650. This is $5,000+ less annually than a comparable-priced San Francisco home, adding to Daly City's affordability advantage."
  },
  {
    question: "What are the best schools in Daly City?",
    answer: "Daly City is served by the Jefferson Union High School District and several elementary/middle school districts. Top-rated schools include Fernando Rivera Elementary, Westlake Elementary, and Lincoln Elementary. For high schools, students attend Westmoor High School or Jefferson High School, which offer solid academics and sports programs. Some families also access private schools or San Francisco's public school system if living near the border. School quality varies by neighborhood, so research specific attendance zones. Many families choose Daly City for affordability while supplementing with after-school programs or private tutoring."
  },
  {
    question: "How does Daly City compare to other Peninsula cities?",
    answer: "Daly City offers the most affordable Peninsula housing with superior San Francisco access compared to cities further south. While cities like San Mateo or Burlingame have slightly higher-rated schools and downtown areas, they cost $400,000-$600,000 more for comparable homes. Daly City's BART access beats most Peninsula cities (which rely on Caltrain). The tradeoff is more urban density, less downtown charm, and more fog than mid-Peninsula cities. For buyers prioritizing value, transit access, and SF proximity over schools and downtown aesthetics, Daly City wins."
  },
  {
    question: "What are the main neighborhoods in Daly City?",
    answer: "Daly City's main neighborhoods include: Westlake (master-planned, family-friendly, mid-century homes), St. Francis Heights (hilltop location, views, larger lots), Serramonte (shopping area, condos, diverse), Top of the Hill (elevated, views, fog), Crocker Amazon border (near SF, mixed residential), and Mission/Geneva area (commercial corridor, diverse). Each has distinct character—Westlake attracts families, St. Francis Heights offers space and views, Serramonte provides condo options for first-time buyers. Tour multiple neighborhoods to find your fit, as microclimates and community feel vary significantly across the city."
  },
  {
    question: "Should I buy a condo or single-family home in Daly City?",
    answer: "The choice depends on budget and lifestyle. Condos in Daly City start around $600,000-$700,000, offering affordable entry with amenities like parking and maintenance included. HOA fees run $400-$600/month typically. Single-family homes start around $900,000 and offer more space, yards, and stronger appreciation historically. First-time buyers often start with condos to enter the market, build equity, then upgrade to single-family homes. If you plan to stay 7+ years and can afford it, single-family homes generally outperform. Condos work well for commuters prioritizing convenience and lower maintenance."
  },
  {
    question: "What is the home buying process in Daly City?",
    answer: "Buying in Daly City follows the standard Bay Area process with typically less competition than San Francisco. Start by getting pre-approved for a mortgage (essential for competitive offers). Work with an agent familiar with Daly City's neighborhoods and microclimates. Most homes receive 1-3 offers rather than 10+, giving you more negotiating room. Standard contingencies apply: inspections, appraisal, loan approval. Closing typically takes 30-35 days. Key Daly City-specific considerations include fog patterns by neighborhood, proximity to BART, school districts, and whether hillside properties need geological inspections."
  },
  {
    question: "Are there any first-time homebuyer programs for Daly City?",
    answer: "Daly City buyers can access several first-time buyer programs. San Mateo County offers down payment assistance programs through the county housing authority. California state programs include CalHFA down payment assistance (3.5-10% help) and MyHome Assistance Program. Federal options include FHA loans (3.5% down), VA loans for veterans (0% down), and conventional loans with as low as 3% down. The city of Daly City occasionally has below-market-rate (BMR) units available through lottery. Income limits apply to most programs—consult with a lender to explore all options for maximizing affordability."
  },
  {
    question: "What are the pros and cons of living in Daly City?",
    answer: "Pros: Affordable SF-adjacent housing, excellent BART access, diverse community and dining, strong appreciation potential, lower property taxes than SF, larger homes for the price, and good highway access. Cons: Persistent fog and cool weather, less walkable downtown than some Peninsula cities, some areas have older housing stock needing updates, and schools are adequate but not top-tier. The city trades charm and weather for value and location. For buyers who prioritize homeownership affordability, diversity, and transit access over sunshine and top schools, Daly City is an excellent choice."
  },
  {
    question: "How competitive is the Daly City housing market?",
    answer: "Daly City's market is moderately competitive—more competitive than outer Bay Area suburbs but significantly less than San Francisco or Peninsula cities. Well-priced homes typically receive 2-4 offers, with properties selling at or slightly above asking price. Days on market average 20-30 for desirable properties. The market favors prepared buyers with pre-approval and flexibility, but you won't face the intense bidding wars common in SF. First-time buyers have a realistic chance here. Working with a local agent who knows neighborhood values helps you make competitive but not overpaying offers."
  },
  {
    question: "What questions should I ask when buying a home in Daly City?",
    answer: "Essential Daly City-specific questions include: 1) How much fog does this specific microclimate get? 2) What's the proximity to BART or bus lines? 3) Which school attendance zone is this property in? 4) Has the property had any foundation or hillside stability issues? 5) What's the neighborhood's demographics and community feel? 6) Are there any planned developments or zoning changes nearby? 7) What's included in the sale? 8) How long has it been on market and why? 9) Have there been any pest inspections or repairs? 10) What's the typical commute time to your workplace? Your agent should thoroughly investigate each area."
  }
];

export function DalyCityFAQ() {
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
        title="Daly City Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in Daly City. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.6879, lng: -122.4702 }}
      />
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
            Daly City Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Daly City. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="daly-city" />

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
