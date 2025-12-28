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
    question: "What is the average home price in Belmont?",
    answer: "The median home price in Belmont is approximately $2 million as of 2025. Prices vary by neighborhood and property type, with hillside homes offering Bay views commanding premium prices, often reaching $2.5-3.5 million or more. Flatter areas closer to El Camino Real typically range from $1.6-2.2 million for single-family homes. Condos and townhomes offer more accessible entry points starting around $900,000-1.2 million."
  },
  {
    question: "Is Belmont a good value compared to neighboring cities?",
    answer: "Belmont offers exceptional value compared to its neighbors San Carlos and Hillsborough. While San Carlos has similar amenities and median prices around $2.2-2.4 million, Belmont provides comparable schools and location at a slight discount. Compared to Hillsborough, where homes average $4-6 million, Belmont delivers similar Peninsula quality of life at roughly half the price. The city's central location, excellent schools, and diverse housing stock make it a smart investment."
  },
  {
    question: "What are the best neighborhoods in Belmont for hill views?",
    answer: "The most sought-after hill neighborhoods in Belmont include Sterling Downs, Hallmark, and the upper reaches of Cipriani Boulevard. These areas offer stunning Bay, canyon, and hillside views with premium pricing. Homes in these neighborhoods typically feature larger lots, mid-century modern architecture, and spectacular vistas. Water Hill Road and Alameda de las Pulgas (upper sections) also provide excellent views. Expect to pay $2.5 million and up for view properties in prime condition."
  },
  {
    question: "How close is Belmont to major tech employers like Oracle?",
    answer: "Belmont is exceptionally positioned for tech commuters. Oracle's Redwood City campus is just 5-10 minutes away via Highway 101. Facebook/Meta in Menlo Park is 10-15 minutes, Google in Mountain View is 20-25 minutes, and Apple in Cupertino is about 30 minutes. The central Peninsula location provides easy access to both San Francisco (25-30 minutes) and South Bay employers. Highway 101 and 280 are both readily accessible, offering commute flexibility."
  },
  {
    question: "What makes the Belmont-Redwood Shores School District special?",
    answer: "The Belmont-Redwood Shores School District consistently ranks among the top districts in San Mateo County. Schools like Nesbit Elementary, Ralston Middle School, and Carlmont High School receive excellent ratings. The district benefits from strong community support, experienced teachers, and robust programs in academics, arts, and athletics. Parent involvement is high, and test scores consistently exceed state averages. Many families specifically move to Belmont for these schools, making them a major driver of home values."
  },
  {
    question: "How is freeway access from Belmont?",
    answer: "Belmont offers outstanding freeway access to both Highway 101 and Interstate 280. Highway 101 runs along the eastern edge of the city with multiple on-ramps (Ralston Avenue, Belmont/San Carlos), providing quick access to San Francisco, SFO Airport, and Silicon Valley. Interstate 280, accessible via Ralston or Highway 92, offers a more scenic commute with less traffic. This dual freeway access is a major advantage, allowing residents to choose routes based on traffic conditions and destinations."
  },
  {
    question: "What types of neighborhoods does Belmont offer?",
    answer: "Belmont features remarkably diverse neighborhoods. The flats near El Camino Real offer traditional suburban living with post-war homes on smaller lots. Mid-hillside areas like Barrett Avenue feature 1950s-60s ranches with moderate views. Upper hillside neighborhoods showcase dramatic mid-century modern homes with panoramic vistas. Downtown Belmont Village provides walkable charm with local shops and restaurants. This diversity means buyers can find everything from starter condos to luxury view estates within one city."
  },
  {
    question: "Why is Belmont called the 'central Peninsula' location?",
    answer: "Belmont sits at the geographic center of the San Francisco Peninsula, roughly equidistant from San Francisco and San Jose. This central position means shorter commutes in every direction compared to peninsula endpoints. Whether working in the city, Peninsula, or South Bay, Belmont provides balanced access. The location also means easy access to San Francisco International Airport (15-20 minutes), plus proximity to shopping, dining, and recreation throughout the Bay Area."
  },
  {
    question: "Are there good public transportation options in Belmont?",
    answer: "Belmont is served by Caltrain at the Belmont Station downtown, providing direct service to San Francisco (30-40 minutes) and San Jose (45-50 minutes). SamTrans bus routes connect to neighboring cities and BART stations. While Belmont doesn't have BART, nearby stations in Millbrae (15 minutes) and San Bruno provide access to the regional network. Most residents drive given the suburban layout, but public transit options exist for city commuters and occasional use."
  },
  {
    question: "What is Belmont's investment potential?",
    answer: "Belmont offers strong long-term investment potential due to several factors: limited housing supply constrained by hillside geography, top-rated schools driving family demand, and central Peninsula location. The city has historically appreciated in line with broader Peninsula markets, typically 4-6% annually over long periods. Belmont's relative affordability compared to San Carlos and Hillsborough means potential for price convergence. Strong rental demand from tech workers provides income property opportunities."
  },
  {
    question: "What are property taxes like in Belmont?",
    answer: "Belmont property taxes are approximately 1.18-1.25% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments. On a $2 million home, expect annual taxes around $24,000-25,000. Prop 13 limits annual increases to 2% regardless of market appreciation, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price. Belmont's effective tax rate is similar to other San Mateo County cities."
  },
  {
    question: "What is the community like in Belmont?",
    answer: "Belmont offers a family-oriented, suburban community with strong neighborhood connections. The city hosts regular events like the Belmont Greek Festival and summer concerts. Downtown Belmont Village provides a walkable gathering spot with restaurants, coffee shops, and local businesses. The community is diverse, well-educated, and civic-minded. Parks like Twin Pines and Water Dog Lake Park are popular gathering spots. The atmosphere is more relaxed than nearby urban areas while maintaining Peninsula sophistication."
  },
  {
    question: "How competitive is the Belmont housing market?",
    answer: "Belmont's housing market competitiveness varies by price point and property type. Well-priced homes in good school areas often receive multiple offers, especially in the $1.8-2.5 million range popular with families. View properties and unique hillside homes may take longer to sell due to smaller buyer pools. The market is generally less frenzied than San Francisco but more competitive than outer suburbs. Successful buyers get pre-approved, act decisively, and work with agents who know local nuances."
  },
  {
    question: "What are the main drawbacks of living in Belmont?",
    answer: "Belmont's primary drawbacks include: higher property costs compared to East Bay or South Bay cities, hillside locations mean challenging terrain with narrow, winding roads, limited walkability outside the downtown village area, and typical Peninsula fog patterns affecting some neighborhoods. The city lacks major retail centers or extensive nightlife. Hillside homes may face foundation concerns or higher maintenance costs. Some areas have challenging school commutes. However, most residents find these minor compared to the benefits."
  },
  {
    question: "Does Belmont have outdoor recreation opportunities?",
    answer: "Belmont offers excellent outdoor recreation for Peninsula suburbia. Water Dog Lake Park features hiking trails with Bay views and a small lake. Twin Pines Park provides playgrounds, sports fields, and community programs. The city connects to regional trail networks, including paths leading to the Bay Trail. Nearby San Carlos and Redwood City offer additional parks. While not wilderness, Belmont provides substantial green space and easy access to Peninsula open space preserves in the nearby hills."
  },
  {
    question: "What should I know about hillside homes in Belmont?",
    answer: "Belmont's hillside homes offer dramatic views but require special consideration. Key issues include: foundation conditions and seismic retrofitting needs, drainage and erosion management, narrow access roads making moving difficult, and potentially higher insurance costs. Many hillside homes were built in the 1950s-70s with mid-century modern design. Budget for specialized inspections covering foundation, geology, and drainage. The views and privacy are spectacular, but these properties require more maintenance and expertise than flatland homes."
  },
  {
    question: "How far is Belmont from San Francisco Airport?",
    answer: "San Francisco International Airport (SFO) is approximately 15-20 minutes from Belmont via Highway 101, making it one of the closest Peninsula cities to the airport. This proximity is a major advantage for frequent travelers. The short distance means less stress for early flights and convenient access for pickups and drop-offs. In non-peak traffic, you can reach SFO in under 15 minutes from many Belmont neighborhoods. This airport access adds significant value for business travelers and vacation-minded families."
  },
  {
    question: "What is the rental market like in Belmont?",
    answer: "Belmont's rental market is strong, driven by tech workers, families seeking good schools, and professionals wanting Peninsula access. Single-family homes rent for $4,500-7,500+ monthly depending on size and location. Condos and townhomes rent for $3,000-5,000. Vacancy rates are typically low due to limited supply and high demand. Many investors purchase properties for long-term appreciation while generating rental income. The combination of Oracle proximity, good schools, and central location makes Belmont rentals consistently desirable."
  },
  {
    question: "How does Belmont compare to other Peninsula cities for families?",
    answer: "Belmont ranks highly for families among Peninsula cities. The Belmont-Redwood Shores schools rival San Carlos, Burlingame, and Menlo Park while offering relatively lower home prices. The city provides a suburban, safe environment with good parks and community programs. Compared to Redwood City (more urban) or San Mateo (larger and busier), Belmont offers a quieter, more residential feel. It lacks the ultra-exclusivity of Hillsborough or Atherton but provides similar quality of life at accessible price points for upper-middle-class families."
  },
  {
    question: "What are the hidden costs of buying in Belmont?",
    answer: "Beyond the purchase price, Belmont buyers should budget for: closing costs (2-3% of purchase), property transfer taxes, HOA fees for condos/townhomes ($400-800/month), earthquake insurance ($2,000-4,000 annually), potentially higher homeowner's insurance for hillside properties, and landscaping/maintenance costs for larger lots. Hillside homes may need foundation inspections ($500-1,500) and geological surveys. Older homes might require seismic retrofitting ($10,000-50,000+), electrical panel upgrades, or sewer lateral replacement. Factor in 1-2% of home value annually for maintenance, higher for hillside properties."
  }
];

export function BelmontFAQ() {
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
        title="Belmont Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in Belmont. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.5202, lng: -122.2758 }}
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
            Belmont Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Belmont. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="belmont" />

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
