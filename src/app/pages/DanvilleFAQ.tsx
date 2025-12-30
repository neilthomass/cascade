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
      const response = await fetch('https://www.cascaderealtors.com/api/contact', {
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
    question: "What is the average home price in Danville?",
    answer: <>The median home price in Danville is approximately $2.2 million as of 2025. However, prices vary significantly by neighborhood and property type. Standard single-family homes typically range from $1.5M to $3M, while luxury properties in exclusive communities like Blackhawk often exceed $3 million, with many estates priced at $5 million or more. The town's excellent schools, charming downtown, and rural luxury appeal continue to support strong property values. For personalized pricing insights based on your specific needs, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our Danville specialists</Link>.</>
  },
  {
    question: "What makes Blackhawk such an exclusive community?",
    answer: <>Blackhawk is one of the Bay Area's most prestigious gated communities, featuring luxury estates on large lots, world-class amenities including two championship golf courses, country club facilities, and 24/7 security. Homes in Blackhawk typically start at $3 million and can exceed $10 million for custom estates. The community offers a resort-like lifestyle with tennis courts, fitness centers, fine dining, and meticulously maintained grounds, all while maintaining privacy and exclusivity. Our team at Cascade California Realty has extensive experience with Blackhawk properties - <Link to="/contact" className="text-blue-600 hover:underline">let us guide you through available listings</Link>.</>
  },
  {
    question: "Is Danville a good place to buy a home in 2025?",
    answer: <>Danville is an excellent choice for homebuyers in 2025, particularly families seeking top-tier schools and a small-town atmosphere. The San Ramon Valley Unified School District consistently ranks among California's best, with multiple schools receiving state and national recognition. The town's combination of charming downtown, excellent amenities, proximity to Mt. Diablo, and strong community values make it a sound long-term investment. Limited inventory and high demand continue to support appreciation. <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link> to explore current opportunities before they're gone.</>
  },
  {
    question: "What are the best neighborhoods in Danville?",
    answer: <>Danville's top neighborhoods include Blackhawk (luxury gated community with golf courses), Downtown Danville area (walkable to shops and restaurants, strong community feel), areas near Alamo border (larger lots, excellent schools), and Diablo (exclusive hillside community with country club). Each offers distinct character: Blackhawk provides resort-style luxury, downtown areas offer village charm, while Diablo and surrounding hills provide privacy and views. Your choice depends on lifestyle preferences and budget - <Link to="/contact" className="text-blue-600 hover:underline">our local experts can help match you with the perfect neighborhood</Link>.</>
  },
  {
    question: "How are the schools in Danville?",
    answer: <>Danville schools are exceptional, served by the highly-rated San Ramon Valley Unified School District. Elementary schools like Green Valley and Valley View consistently score 9-10 on GreatSchools ratings. Monte Vista and San Ramon Valley High Schools are among the state's top performers, offering excellent academics, athletics, and extracurricular programs. Many families specifically move to Danville for the schools, making it a primary driver of real estate demand and property values. If school proximity is your priority, <Link to="/contact" className="text-blue-600 hover:underline">let Cascade California Realty help you find homes in your preferred attendance zones</Link>.</>
  },
  {
    question: "What is downtown Danville like?",
    answer: <>Downtown Danville offers a charming, walkable Main Street experience with boutique shops, restaurants, cafes, and wine bars. The tree-lined streets create a small-town atmosphere despite the Bay Area location. Popular spots include Peasant & The Pear, Bridges Restaurant, and numerous local boutiques. The downtown hosts farmers' markets, art festivals, and community events throughout the year. Living within walking distance to downtown is highly desirable and commands premium pricing. Curious about homes near downtown? <Link to="/contact" className="text-blue-600 hover:underline">Get in touch with our team</Link> for current availability.</>
  },
  {
    question: "Are there equestrian properties available in Danville?",
    answer: <>Yes, Danville is known for its equestrian properties, particularly in areas near Diablo and on larger parcels in the hills. These properties typically feature horse stables, riding arenas, pastures, and trails with access to Mt. Diablo State Park's extensive trail system. Equestrian estates usually sit on 2-10+ acre lots and range from $3 million to $10 million+. The area's rural character and proximity to riding trails make it one of the Bay Area's premier equestrian communities. Finding the right equestrian property requires specialized knowledge - <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty can help you find your dream horse property</Link>.</>
  },
  {
    question: "How far is Danville from San Francisco and Silicon Valley?",
    answer: "Danville is approximately 35 miles east of San Francisco (45-60 minutes via I-680 and I-580) and about 30 miles north of San Jose (35-50 minutes via I-680). The commute to major tech hubs like San Ramon's Bishop Ranch, Pleasanton, or Walnut Creek is 15-25 minutes. While the commute is longer than closer suburbs, many residents find the trade-off worthwhile for Danville's schools, space, and quality of life. Remote work trends have made the location even more attractive."
  },
  {
    question: "What recreational activities are available in Danville?",
    answer: "Danville offers extensive recreational opportunities. Mt. Diablo State Park provides world-class hiking, mountain biking, and horseback riding with stunning Bay Area views. The Iron Horse Trail runs through town for walking and cycling. Blackhawk features two championship golf courses. The town maintains numerous parks, sports fields, and community facilities. Nearby activities include wine tasting in Livermore Valley (20 minutes), boating at Lake Del Valle, and easy access to Bay Area cultural attractions."
  },
  {
    question: "What are property taxes like in Danville?",
    answer: <>Danville property taxes are approximately 1.2-1.3% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments and bonds. For a $2.2 million home, expect annual property taxes around $26,000-$28,600. Thanks to Prop 13, your assessed value can only increase 2% per year regardless of market appreciation, making long-term ownership advantageous. New buyers are assessed at purchase price. Some neighborhoods have additional HOA fees, particularly gated communities. Need help understanding total ownership costs? <Link to="/contact" className="text-blue-600 hover:underline">Our advisors can walk you through the numbers</Link>.</>
  },
  {
    question: "Is Danville a good investment for real estate?",
    answer: <>Danville is considered a strong real estate investment due to several factors: top-rated schools driving consistent demand from families, limited available land restricting new inventory, affluent demographics supporting high home values, and desirable lifestyle amenities. The town has shown steady appreciation over decades with less volatility than urban markets. Properties in premium neighborhoods like Blackhawk and near top schools tend to hold value best. The 5-10 year outlook remains positive given ongoing demand. <Link to="/contact" className="text-blue-600 hover:underline">Discuss investment strategies with Cascade California Realty</Link> to maximize your returns.</>
  },
  {
    question: "What is the lot size like for homes in Danville?",
    answer: "Danville lot sizes vary significantly by neighborhood. Standard residential lots typically range from 7,000 to 15,000 square feet (1/4 to 1/3 acre). Premium neighborhoods and hillside properties often feature 1/2 acre to 2+ acre lots. Equestrian properties and estates can span 5-20+ acres. Compared to denser Bay Area suburbs, Danville offers notably more land, with many properties featuring extensive landscaping, pools, outdoor living spaces, and room for RV parking or accessory structures."
  },
  {
    question: "How does Danville compare to other East Bay suburbs?",
    answer: <>Danville stands out among East Bay suburbs for its combination of top schools, small-town character, and luxury housing. Compared to Walnut Creek (more urban, better shopping), San Ramon (newer development, more tech workers), or Pleasanton (larger town, more diverse housing), Danville offers a more intimate, established community feel with higher-end properties. It's generally pricier than most East Bay suburbs but offers superior schools, more land, and a unique village atmosphere that many find worth the premium. Not sure which East Bay community fits your lifestyle? <Link to="/contact" className="text-blue-600 hover:underline">We can help you compare options</Link>.</>
  },
  {
    question: "What are HOA fees like in Danville communities?",
    answer: <>HOA fees in Danville vary widely by community. Standard neighborhoods may have $50-$200 monthly for basic landscaping and amenities. Luxury communities like Blackhawk range from $400-$1,000+ monthly, covering extensive amenities including golf courses, security, common area maintenance, and club facilities. Some neighborhoods have no HOA at all. Always review HOA financials, reserves, and planned assessments before purchasing. Higher fees in premium communities typically provide substantial amenities and services. <Link to="/contact" className="text-blue-600 hover:underline">Our team can help you analyze HOA documents</Link> and understand what you're paying for.</>
  },
  {
    question: "What is the climate like in Danville?",
    answer: "Danville enjoys a Mediterranean climate with warm, dry summers and mild, wet winters. Summer temperatures typically reach 85-95°F, occasionally exceeding 100°F during heat waves, while winters are mild with temperatures in the 40s-60s. The area receives about 20 inches of annual rainfall, mostly November through March. Danville is sunnier and warmer than coastal areas like San Francisco, with less fog and more distinct seasons. The climate is ideal for outdoor living, with many homes featuring pools and extensive outdoor spaces."
  },
  {
    question: "Are there new construction opportunities in Danville?",
    answer: <>New construction in Danville is limited due to strict zoning, limited available land, and strong slow-growth policies that protect the town's character. Most new homes are custom builds on existing lots or tear-down/rebuilds. Occasionally, small developments of 10-20 homes appear in former ranch land or approved subdivisions. Blackhawk continues some luxury custom home development. For buyers seeking new construction, expect higher prices ($2.5M+) and longer timelines. Most inventory consists of well-maintained existing homes from the 1970s-2000s. <Link to="/contact" className="text-blue-600 hover:underline">Ask us about upcoming new construction opportunities</Link> - we often hear about them before they hit the market.</>
  },
  {
    question: "What should I know about buying in Blackhawk?",
    answer: <>Buying in Blackhawk requires understanding its unique characteristics: membership fees ($15,000-$30,000 initiation plus $800-$1,200 monthly dues) for country club access, strict architectural guidelines for modifications, gates and security protocols, and a resort-style lifestyle focus. Properties range from $3M condos to $10M+ estates. The community includes two golf courses, multiple clubhouses, restaurants, tennis, fitness facilities, and extensive social activities. It's ideal for luxury buyers seeking amenities, security, and an active lifestyle, but the fees and restrictions aren't for everyone. <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty specializes in Blackhawk transactions</Link> - we can help you navigate the community's requirements.</>
  },
  {
    question: "How competitive is the Danville housing market?",
    answer: <>Danville's housing market is moderately to highly competitive, especially for well-priced homes in top school districts or desirable neighborhoods. Premium properties often receive multiple offers and sell at or above asking price. Homes in excellent condition near award-winning schools typically sell within 2-4 weeks. Luxury properties in Blackhawk or large estates may take longer to sell due to smaller buyer pool. Working with a local agent who knows the micro-markets is essential, as is being pre-approved and ready to act quickly on the right property. <Link to="/contact" className="text-blue-600 hover:underline">Partner with our Danville experts</Link> to gain a competitive edge.</>
  },
  {
    question: "What are the hidden costs of buying a home in Danville?",
    answer: <>Beyond the purchase price, Danville buyers should budget for: closing costs (2-3% of purchase price), property transfer taxes, title insurance, inspections ($800-$2,000), HOA fees if applicable ($50-$1,000+/month), landscaping and pool maintenance ($300-$800/month for larger properties), higher utility costs in summer heat, and potential upgrades to older homes. Many properties have pools, extensive landscaping, or are on septic systems, all requiring ongoing maintenance. Budget 1-2% of home value annually for maintenance on luxury properties. <Link to="/contact" className="text-blue-600 hover:underline">Get a comprehensive cost breakdown from our team</Link> before you start your search.</>
  },
  {
    question: "Is Danville family-friendly?",
    answer: <>Danville is exceptionally family-friendly, which is why many buyers specifically seek it out. The town offers top-rated schools, safe neighborhoods, numerous parks and sports facilities, family-oriented community events, and a strong sense of community. The downtown is walkable and hosts family events like farmers' markets and festivals. Youth sports programs are excellent and highly popular. The combination of safety, schools, outdoor activities, and community engagement makes Danville one of the Bay Area's premier family destinations, directly reflected in sustained real estate demand. Ready to find your family's forever home? <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty is here to help</Link>.</>
  }
];

export function DanvilleFAQ() {
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
        title="Best Realtor in Danville | Manoj Thomas - Top Danville Real Estate Agent 2025"
        description="Looking for the best realtor in Danville? Manoj Thomas is the #1 rated Danville real estate agent with 15+ years experience, $1B+ sales. Expert in Danville homes and neighborhoods."
        canonical="https://cascaderealtors.com/danville"
        city="Danville"
        county="Contra Costa County"
        coordinates={{ lat: 37.8216, lng: -121.9999 }}
      />
      <FAQHeader />
      <FAQHero
        title="Danville Real Estate FAQ"
        description="Everything you need to know about buying a home in Danville. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="danville" />

      <Footer />
    </div>
  );
}
