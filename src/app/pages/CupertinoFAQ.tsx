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
    question: "What is the average home price in Cupertino?",
    answer: "The median home price in Cupertino is approximately $2.8 million as of 2025. This reflects Cupertino's status as one of the most desirable cities in the Bay Area, driven by its world-renowned school district and proximity to Apple Park. Prices vary by neighborhood—homes near top-performing schools like Monta Vista High or in established neighborhoods like Rancho Rinconada can exceed $3 million, while condos and townhomes start around $1.2-1.5 million."
  },
  {
    question: "Why are Cupertino schools so highly rated?",
    answer: "Cupertino Union School District consistently ranks among California's top school districts, with multiple National Blue Ribbon School designations. The district benefits from exceptional funding (both public and community foundation support), highly engaged parents, and a student body that consistently achieves outstanding test scores. High schools like Monta Vista and Lynbrook regularly send students to top universities. The schools' emphasis on STEM education, along with robust arts and athletics programs, creates a comprehensive educational experience that attracts families worldwide."
  },
  {
    question: "How has Apple Park influenced Cupertino's real estate market?",
    answer: "Apple Park, Apple's iconic headquarters, has significantly impacted Cupertino's real estate market since its opening in 2017. The campus brings 12,000+ highly compensated employees to the area daily, increasing demand for housing. Home values within a few miles of Apple Park have appreciated faster than surrounding areas. The 'Apple effect' extends beyond direct employee purchases—the prestige and economic stability associated with having a global tech leader headquartered here attracts international buyers and investors. The well-maintained campus has also enhanced the city's overall aesthetic appeal."
  },
  {
    question: "What are the best neighborhoods for families in Cupertino?",
    answer: "Top family-friendly neighborhoods in Cupertino include: Rancho Rinconada (highly walkable, mature trees, excellent elementary schools), the Monta Vista area (proximity to top-rated high school, larger lots), Main Street Cupertino district (walkable downtown, community events, newer developments), Garden Gate (well-established, central location), and Blackberry Farm (newer homes, parks, family-oriented). Each neighborhood offers access to outstanding schools, and many feature neighborhood associations that organize community activities."
  },
  {
    question: "Is Cupertino a good investment for long-term property appreciation?",
    answer: "Cupertino has historically shown strong, consistent appreciation due to several factors: limited housing supply (the city is largely built-out), sustained demand from tech industry growth, exceptional schools attracting families, and proximity to major employers (Apple, major tech companies in surrounding cities). While prices are already high, the fundamentals supporting long-term value remain strong. Buyers planning to hold properties for 7+ years have historically seen excellent returns. The city's commitment to maintaining its character while allowing limited smart growth suggests continued stability."
  },
  {
    question: "What is the property tax rate in Cupertino?",
    answer: "Property taxes in Cupertino are approximately 1.1-1.2% of assessed value annually, which includes the base 1% California Proposition 13 rate plus local bonds and assessments for schools and services. For a $2.8 million home, annual property taxes would be around $30,800-$33,600. Thanks to Prop 13, your assessed value increases by a maximum of 2% annually, regardless of market appreciation. New buyers are assessed at purchase price, making long-term ownership increasingly advantageous as market values rise faster than assessed values."
  },
  {
    question: "How diverse is Cupertino's community?",
    answer: "Cupertino is one of the most diverse cities in California, with a population of approximately 60,381 representing cultures from around the world. The city has a significant Asian American population (over 60%), along with substantial White, Hispanic, and other communities. This diversity is reflected in the city's excellent international restaurants, cultural celebrations, and multilingual services. The Cupertino community values inclusivity and cross-cultural understanding, with various community organizations promoting cultural exchange. This multicultural environment is often cited as a major attraction for families."
  },
  {
    question: "What should I know about buying a home near Monta Vista High School?",
    answer: "Homes in the Monta Vista High School attendance area command premium prices due to the school's outstanding reputation. Expect to pay $200,000-$400,000+ more than comparable homes in other areas. Key considerations: verify the current attendance boundaries (they can change), understand that academic pressure can be intense, budget for supplementary educational expenses (tutoring, test prep, extracurriculars), and recognize that resale values tend to hold strong due to consistent demand. Many families specifically target this area when relocating to the Bay Area for tech jobs."
  },
  {
    question: "Are there any new housing developments in Cupertino?",
    answer: "Cupertino has limited new construction due to its built-out status, but several developments have emerged: Main Street Cupertino has added mixed-use residential projects with condos and townhomes, the Vallco redevelopment plans continue to evolve (though delayed), and occasional infill projects replace older homes. The city has been cautious about high-density development to preserve its character. New construction typically commands premium prices but offers modern amenities, energy efficiency, and low maintenance. ADU (Accessory Dwelling Unit) construction has also increased as homeowners maximize property value."
  },
  {
    question: "How much do I need to earn to afford a home in Cupertino?",
    answer: "To comfortably afford a median-priced $2.8 million home in Cupertino, you typically need a household income of $600,000-$750,000, assuming a 20% down payment ($560,000) and following traditional debt-to-income guidelines. Many Cupertino buyers are dual-income tech professionals, executives, or international buyers with significant cash reserves. First-time buyers often start with condos ($1.2-1.5M) requiring $400,000-$500,000 in household income. Stock compensation from tech companies and family assistance are common factors in Cupertino home purchases."
  },
  {
    question: "What amenities and attractions does Cupertino offer?",
    answer: "Cupertino offers diverse amenities including: Main Street Cupertino (dining, shopping, weekend farmers market), Memorial Park (sports fields, recreation center, amphitheater for summer concerts), De Anza College (community education, cultural events, Flint Center performances), excellent library system, Blackberry Farm (historic farm and park), extensive trail network connecting to nearby open spaces, and world-class Asian restaurants and grocery stores. The city also hosts community events like the Lunar New Year celebration and summer concerts. Proximity to Stanford Shopping Center, Santana Row, and San Jose attractions adds to the appeal."
  },
  {
    question: "How competitive is the Cupertino housing market?",
    answer: "Cupertino's housing market is highly competitive, especially during the spring/summer home-buying season and in top school attendance areas. Well-priced homes typically receive multiple offers and can sell $200,000-$500,000 over asking price. Successful buyers need: strong pre-approval or proof of funds (cash buyers common), willingness to waive contingencies (especially in competitive situations), quick decision-making (homes can go pending within days), and often personal letters to sellers. Working with an agent who knows Cupertino's micro-markets and can craft competitive offers is essential. Off-market deals are also common."
  },
  {
    question: "What are the typical HOA fees for Cupertino condos and townhomes?",
    answer: "Cupertino condo and townhome HOA fees typically range from $400-$800 per month, though newer or amenity-rich communities can charge $800-$1,200+. Fees generally cover building insurance, exterior maintenance, landscaping, water/garbage, and reserve funds. Some communities include amenities like pools, clubhouses, or gyms. Always review HOA financial statements, reserve fund levels, and pending assessments before purchasing. Cupertino HOAs tend to be well-managed given the affluent resident base, but older complexes may face large assessments for roof replacement, seismic upgrades, or exterior work."
  },
  {
    question: "How does Cupertino compare to neighboring cities like Saratoga or Los Altos?",
    answer: "Cupertino offers excellent schools comparable to Saratoga and Los Altos but typically at lower price points (though still very expensive by national standards). Saratoga features larger lots, more secluded properties, and a more suburban feel with slightly higher prices. Los Altos has larger lots, highly rated Los Altos School District, and a more established old-money feel with prices often exceeding Cupertino's. Cupertino's advantages include greater diversity, proximity to Apple Park and tech jobs, more commercial amenities, and slightly better freeway access. All three cities offer exceptional quality of life and strong property value retention."
  },
  {
    question: "What is Main Street Cupertino and why is it desirable?",
    answer: "Main Street Cupertino is a walkable downtown district that has transformed from a strip mall into a mixed-use community hub. It features restaurants, cafes, shops, a weekly farmers market, and newer residential developments (condos and townhomes). The area appeals to buyers who want a more urban, walkable lifestyle while still accessing top Cupertino schools. Proximity to community events, De Anza College, and tech company shuttles makes it especially attractive to young professionals and empty nesters. Properties near Main Street command premiums for the convenience and community atmosphere."
  },
  {
    question: "Are there any first-time buyer programs available in Cupertino?",
    answer: "While Cupertino's high prices make first-time buying challenging, several programs can help: CalHFA offers statewide down payment assistance and competitive rates, FHA loans allow 3.5% down (though on $2.8M median prices, that's still $98,000), conventional loans with 3% down for qualified buyers, and some credit unions offer special programs for tech employees. Santa Clara County occasionally offers down payment assistance for moderate-income buyers, though income limits may exclude higher earners. Many Cupertino first-time buyers receive family assistance or purchase condos as entry points before trading up to single-family homes."
  },
  {
    question: "What are the commute options from Cupertino?",
    answer: "Cupertino offers several commute options: driving to Apple Park (5-10 minutes), other South Bay tech companies (10-30 minutes via highways 280, 85, or 101), San Francisco (45-90 minutes depending on route and traffic), and Peninsula cities (20-40 minutes). Many major tech companies (Apple, Google, LinkedIn, Facebook) provide private shuttle buses with Cupertino stops. While Cupertino lacks direct BART or Caltrain access, the city is centrally located in Silicon Valley. Remote work has made commute times less critical for many buyers. Biking infrastructure is improving, and the city is very walkable for local errands."
  },
  {
    question: "What should I look for when buying an older home in Cupertino?",
    answer: "When buying older Cupertino homes (1950s-1970s construction common), check for: foundation condition and seismic retrofitting needs, outdated electrical systems (knob-and-tube wiring, insufficient amperage), old plumbing (galvanized pipes, polybutylene, sewer lateral condition), roof age and type, HVAC system condition, single-pane windows and insulation quality, and potential environmental issues (asbestos, lead paint). Many buyers plan for $200,000-$500,000+ in renovations post-purchase. Get thorough inspections from specialists (foundation, sewer, chimney). Some buyers prefer fixer-uppers for lot value and customization opportunities, especially in prime school areas where land value often exceeds improvement value."
  },
  {
    question: "How important is De Anza College to Cupertino's appeal?",
    answer: "De Anza College enhances Cupertino's community significantly, though it's often overlooked. The college provides: continuing education opportunities for residents, cultural events and performances at the Flint Center (though currently undergoing renovations), athletic facilities that serve the broader community, and workforce development programs. Its presence adds intellectual vitality and serves as a transfer pathway for students heading to UC and CSU systems. The attractive campus and surrounding area contribute to Cupertino's overall aesthetic. Proximity to De Anza can be a selling point for families with high school students or residents interested in lifelong learning."
  },
  {
    question: "What questions should I ask when buying a home in Cupertino?",
    answer: "Essential questions for Cupertino home purchases include: 1) What is the exact school attendance area (verify with district)? 2) Has the home been seismically retrofitted? 3) What is the age and condition of major systems (roof, HVAC, water heater)? 4) Are there any unpermitted additions or work? 5) What is the sewer lateral condition? 6) Has there been any water damage or foundation issues? 7) What are the neighbors like (important in this community-oriented city)? 8) Are there any planned developments nearby? 9) What's included in the sale? 10) Why is the seller moving? Your agent should help you investigate each thoroughly and understand Cupertino's unique market dynamics."
  }
];

export function CupertinoFAQ() {
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
        title="Cupertino Real Estate FAQ | Home Buying Guide 2025"
        description="Expert answers to common Cupertino home buying questions. Learn about prices, neighborhoods, and more from a Bay Area realtor with 15+ years experience."
        canonical="https://cascaderealtors.com/cupertino"
        city="Cupertino"
        coordinates={{ lat: 37.3230, lng: -122.0322 }}
      />
      <FAQHeader />
      <FAQHero
        title="Cupertino Real Estate FAQ"
        description="Everything you need to know about buying a home in Cupertino. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="cupertino" />

      <Footer />
    </div>
  );
}
