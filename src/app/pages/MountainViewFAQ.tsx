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
    question: "What is the average home price in Mountain View?",
    answer: "The median home price in Mountain View is approximately $2.1 million as of 2025. Prices vary significantly by property type—condos and townhomes typically range from $1.5 million to $1.8 million, while single-family homes often exceed $3 million, especially in desirable neighborhoods like Old Mountain View and Cuesta Park. The city's proximity to Google headquarters and other major tech employers has consistently driven strong appreciation in home values."
  },
  {
    question: "Is Mountain View a good place to invest in real estate?",
    answer: "Mountain View offers exceptional investment potential for 2025 and beyond. As home to Google's global headquarters and surrounded by major tech companies like Meta, LinkedIn, and Microsoft, the area benefits from strong employment fundamentals. Excellent Caltrain connectivity makes commuting easy to San Francisco and throughout the Peninsula. The limited housing supply combined with high-paying tech jobs creates sustained demand. Long-term appreciation has consistently outpaced many Bay Area markets."
  },
  {
    question: "What are the best neighborhoods in Mountain View?",
    answer: "Top neighborhoods in Mountain View include Old Mountain View (charming downtown feel, walkable to Castro Street, historic homes), Cuesta Park (highly rated schools, family-friendly, newer construction), Waverly Park (quiet streets, excellent schools, convenient location), and Shoreline (waterfront proximity, tech worker favorite, modern condos). Each offers distinct character—Old Mountain View attracts those wanting walkability and charm, while Cuesta Park appeals to families prioritizing top schools and newer homes."
  },
  {
    question: "How is Castro Street and the downtown area?",
    answer: "Castro Street is Mountain View's vibrant downtown corridor featuring diverse restaurants, cafes, breweries, and local shops. The area has a walkable, small-town feel despite being in the heart of Silicon Valley. Popular spots include Tied House brewery, Scratch restaurants, and numerous international cuisines. Farmers markets, outdoor dining, and community events create a lively atmosphere. Living near Castro Street commands a premium but offers unmatched walkability and lifestyle amenities in an otherwise car-dependent region."
  },
  {
    question: "How does Caltrain access affect Mountain View home values?",
    answer: "Mountain View has two Caltrain stations—Mountain View and San Antonio—providing exceptional transit connectivity. This is a major value driver, enabling car-free commutes to San Francisco (45 minutes), Palo Alto, Redwood City, and San Jose. Homes within walking distance of Caltrain stations typically command 10-15% premiums. With the ongoing Caltrain electrification project improving service frequency and speed, transit-oriented properties are expected to appreciate further. Many tech workers prioritize Caltrain access when choosing where to live."
  },
  {
    question: "What tech companies are near Mountain View?",
    answer: "Mountain View is surrounded by tech giants. Google's main campus (Googleplex) is headquartered here, employing over 20,000 workers. Within a 10-mile radius are Meta (Menlo Park), LinkedIn (Sunnyvale), Microsoft (Mountain View/Sunnyvale), Intuit (Mountain View), Samsung (San Jose), and hundreds of startups. NASA Ames Research Park borders the city. This concentration of high-paying employers creates exceptional housing demand and supports premium home prices. Many residents can bike or take shuttles to work."
  },
  {
    question: "How much do I need to earn to buy a home in Mountain View?",
    answer: "To comfortably afford Mountain View's median home price of $2.1 million, you typically need a household income of $450,000-$550,000, assuming a 20% down payment ($420,000) and following the 28% debt-to-income ratio guideline. For condos starting around $1.5 million, incomes of $325,000-$400,000 are generally sufficient. Many Mountain View buyers work in tech with equity compensation that helps with down payments. Dual-income tech households are common in the area."
  },
  {
    question: "What are the schools like in Mountain View?",
    answer: "Mountain View is primarily served by Mountain View Whisman School District for elementary and middle schools, with students attending Mountain View Los Altos High School District for high school. Top-rated schools include Stevenson Elementary, Bubb Elementary, and Crittenden Middle School. Los Altos High School (serving parts of Mountain View) is highly regarded. Test scores and college preparation rates are strong. Many families specifically target homes in Cuesta Park and Waverly Park areas for their school assignments. Private school options are also available nearby."
  },
  {
    question: "Are there options for first-time buyers in Mountain View?",
    answer: "First-time buyers in Mountain View face challenges due to high prices but have several strategies. Condos and townhomes ($1.5M-$1.8M range) offer more accessible entry points than single-family homes. Some buyers target neighborhoods bordering Mountain View in Sunnyvale or Los Altos for better value. FHA loans with 3.5% down payment and conventional loans with 3% down can reduce upfront costs, though PMI applies. Many tech employees leverage stock options and signing bonuses for down payments. Dual-income tech households often succeed as first-time buyers here."
  },
  {
    question: "What is the commute like from Mountain View?",
    answer: "Mountain View offers excellent commute options. Caltrain provides direct access to San Francisco (45 min), Palo Alto (8 min), Redwood City (18 min), and San Jose (25 min). Highway 101 runs through the city for South Bay access, though traffic can be heavy during peak hours. Highway 85 provides routes to West San Jose and Los Gatos. Google, LinkedIn, Meta, and other major employers operate shuttle services from Mountain View neighborhoods. Biking is popular with extensive trails. The central Peninsula location minimizes commute times in multiple directions."
  },
  {
    question: "What are property taxes in Mountain View?",
    answer: "Mountain View property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments for schools and services. For a home purchased at $2.1 million, expect annual property taxes around $23,100-$25,200. Prop 13 limits assessment increases to 2% annually regardless of market appreciation, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price. Santa Clara County reassesses upon transfer of ownership."
  },
  {
    question: "How competitive is the Mountain View housing market?",
    answer: "Mountain View's housing market is highly competitive, especially for well-located single-family homes and properties near Caltrain or top schools. Desirable listings often receive multiple offers, particularly in the $2M-$3M range popular with tech professionals. Homes in Old Mountain View and Cuesta Park can sell above asking price. Successful buyers typically: get fully pre-approved with large down payments, write clean offers with minimal contingencies, act quickly on new listings, and work with agents experienced in competing with tech-savvy buyers who often pay all cash or make very strong offers."
  },
  {
    question: "What is the rental market like in Mountain View?",
    answer: "Mountain View has a strong rental market driven by Google employees and other tech workers. Single-family homes rent for $5,000-$8,000+ monthly, while 2-bedroom condos typically rent for $4,000-$5,500. Vacancy rates are low and turnover is relatively quick. Many property owners successfully rent to tech professionals on shorter-term assignments. Proximity to Caltrain, Castro Street, and major employers commands premium rents. Some buyers purchase investment properties or house-hack by renting rooms to offset mortgage costs. Rental income can help with qualification for some buyers."
  },
  {
    question: "What are the HOA fees like in Mountain View condos?",
    answer: "Mountain View condo HOA fees typically range from $500-$900 per month depending on the complex, amenities, and age. Fees cover building insurance, exterior maintenance, common areas, water/garbage, and reserve funds. Complexes with pools, gyms, or doormen have higher fees. When evaluating condos, review HOA financial documents, reserve fund levels, and special assessment history. Well-managed HOAs maintain property values better. Some newer luxury developments near Castro Street or Shoreline can have fees exceeding $1,000 monthly but include more extensive amenities and services."
  },
  {
    question: "Should I buy near Google headquarters?",
    answer: "Buying near Google's campus in Mountain View has several advantages: walkability or short bike commute for Google employees, proximity to amenities Google has attracted to the area, strong rental demand if you relocate, and consistent appreciation due to employment concentration. However, these benefits are priced in—homes within a mile of Googleplex command premiums. Consider whether the convenience justifies the cost versus living slightly farther away with Caltrain or shuttle access. Google's long-term presence and continued expansion support sustained property values in the area."
  },
  {
    question: "What types of homes are common in Mountain View?",
    answer: "Mountain View has diverse housing stock. Old Mountain View features charming Craftsman and California bungalows from the early 1900s, often remodeled. Mid-century ranch homes (1950s-70s) are common throughout the city. Cuesta Park has many homes from the 1980s-90s. Newer construction includes modern townhomes and condos near Castro Street and El Camino Real. Many older homes have been significantly renovated or rebuilt to modern standards. Lots are typically 5,000-7,000 square feet for single-family homes. Condos range from 1970s complexes to new luxury developments."
  },
  {
    question: "How does Mountain View compare to Palo Alto or Los Altos?",
    answer: "Mountain View offers better value than neighboring Palo Alto (median $3.5M+) and Los Altos (median $4M+) while maintaining excellent schools, tech employment access, and quality of life. You get more house for your money in Mountain View. Castro Street rivals University Avenue (Palo Alto) for dining and walkability. Caltrain access is comparable or better. Schools are strong, though Palo Alto and Los Altos have slight edges in test scores. Mountain View attracts buyers who want Silicon Valley benefits without paying the Palo Alto premium, making it popular with practical tech professionals."
  },
  {
    question: "What questions should I ask when buying a home in Mountain View?",
    answer: "Essential questions for Mountain View home purchases include: 1) What school attendance area is the property in? 2) How far is the walk/bike to Caltrain stations? 3) What is the noise level from Highway 101 or flight paths? 4) Has the home been updated or are major systems original? 5) What are the property taxes and any supplemental assessments? 6) For condos, what are HOA reserves and any planned special assessments? 7) Is the home in a flood zone (near Shoreline)? 8) What is included in the sale? 9) How long has it been on market and why is the seller moving? 10) Are there any pending development projects nearby?"
  },
  {
    question: "What is the process for buying a home in Mountain View?",
    answer: "The Mountain View home buying process typically takes 30-45 days from accepted offer to closing. Key steps: 1) Get pre-approved for a mortgage with a lender familiar with high-cost Bay Area markets, 2) Work with a local agent who knows Mountain View neighborhoods and competing with tech buyers, 3) Tour properties and attend open houses quickly as good listings move fast, 4) Make competitive offers—often above asking for desirable homes, 5) Complete inspections within 17 days typically, 6) Remove contingencies when satisfied, 7) Final loan approval and closing. Be prepared to move quickly and compete with well-qualified tech industry buyers."
  },
  {
    question: "Are there any hidden costs of buying in Mountain View?",
    answer: "Beyond the purchase price, Mountain View buyers should budget for: closing costs (2-3% of purchase price), property transfer tax (varies by price, roughly $1.15 per $1,000), title insurance, inspection fees ($500-$1,500), HOA fees for condos ($500-$900+/month), earthquake insurance (recommended, $1,500-$3,000 annually), potential seismic retrofitting for older homes, and landscape maintenance (many properties have significant yards). Some neighborhoods have Mello-Roos taxes or special assessments. Budget 1-2% of home value annually for maintenance, especially for older homes that may need updated systems, roofing, or HVAC."
  }
];

export function MountainViewFAQ() {
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
            Mountain View Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Mountain View. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="mountain-view" />

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
