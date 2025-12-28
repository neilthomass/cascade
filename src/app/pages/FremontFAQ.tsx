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
    question: "What is the average home price in Fremont?",
    answer: "The median home price in Fremont is approximately $1.55 million as of 2024. Fremont offers relatively more space and newer construction compared to nearby cities, making it attractive for families and tech workers. Prices vary by neighborhood—Mission San Jose with its acclaimed schools commands premium prices, while areas like Niles and Warm Springs offer more diverse price points. The city's strong job market, particularly with Tesla's presence, and excellent schools support long-term appreciation."
  },
  {
    question: "Is Fremont a good place to buy a home in 2025?",
    answer: "Fremont is an excellent choice for home buyers in 2025. The city offers a compelling combination of top-rated schools (particularly in Mission San Jose), major employers like Tesla, diverse housing stock, and strong community values. With BART access for Peninsula commutes, proximity to Silicon Valley tech jobs, and a large, diverse population of 230,504, Fremont provides suburban comfort with urban accessibility. The city's continued growth and infrastructure investments support long-term value appreciation."
  },
  {
    question: "What are the best neighborhoods in Fremont?",
    answer: "Fremont's top neighborhoods each offer unique advantages. Mission San Jose is renowned for its exceptional schools and family-friendly environment, commanding the highest prices. Warm Springs benefits from the new BART station and proximity to tech companies. Niles offers historic charm and more affordable options with a village-like atmosphere. Ardenwood features newer developments with modern amenities and well-maintained properties. Each neighborhood has excellent parks, shopping, and strong community engagement."
  },
  {
    question: "How are the schools in Fremont?",
    answer: "Fremont Unified School District serves the city and includes some of the Bay Area's highest-performing schools. Mission San Jose High School consistently ranks among California's top public schools, with exceptional test scores and college preparation. The district benefits from strong parent involvement and diverse student populations. Elementary and middle schools like Weibel, Hirsch, and Hopkins Junior High also achieve high marks. The emphasis on education is a major draw for families moving to Fremont."
  },
  {
    question: "How does living near the Tesla factory affect Fremont real estate?",
    answer: "Tesla's Fremont factory has significantly impacted the local real estate market. The facility employs thousands of workers, creating steady housing demand and supporting property values. The Warm Springs and southern Fremont areas particularly benefit from proximity to the factory. Tesla's presence has attracted supporting businesses and talent to the city, contributing to economic vitality. While this brings employment opportunities, it also means the local market can be influenced by Tesla's business cycles."
  },
  {
    question: "What is BART access like in Fremont?",
    answer: "Fremont has excellent BART access with two stations: Fremont Station (serving older parts of the city) and Warm Springs/South Fremont Station (opened in 2017). These stations provide direct connections to Silicon Valley, Oakland, San Francisco, and the East Bay. The Warm Springs station has particularly boosted development and property values in southern Fremont. BART commutes to downtown San Francisco take about 50-60 minutes, making Fremont viable for city workers seeking more space and better schools."
  },
  {
    question: "What outdoor activities are available in Fremont?",
    answer: "Fremont offers exceptional outdoor recreation, highlighted by Mission Peak Regional Preserve. The iconic Mission Peak hike is a local favorite, offering challenging trails and panoramic Bay Area views from the 2,517-foot summit. The city has over 50 parks, including Central Park with lakes and sports facilities, and Quarry Lakes Regional Recreation Area for swimming, fishing, and picnicking. The extensive trail system connects neighborhoods and provides excellent biking and walking routes throughout the city."
  },
  {
    question: "How much do I need to earn to buy a house in Fremont?",
    answer: "To comfortably afford Fremont's median home price of $1.55 million, you typically need a household income of $350,000-$450,000, assuming a 20% down payment and following the 28% debt-to-income ratio guideline. This income level is achievable for dual-income tech households, which are common in Fremont. First-time buyers might start with condos or townhomes in the $800,000-$1.2 million range, requiring lower incomes around $200,000-$300,000."
  },
  {
    question: "What are the property taxes in Fremont?",
    answer: "Fremont property taxes are approximately 1.2-1.3% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments for schools and infrastructure. For a $1.55 million home, expect annual taxes around $18,600-$20,150. Thanks to Prop 13, your assessed value increases by only 2% maximum per year, making long-term ownership increasingly advantageous. New developments may have Mello-Roos assessments, so always review the property tax bill before purchasing."
  },
  {
    question: "Is Fremont good for tech workers?",
    answer: "Fremont is ideal for tech workers, offering proximity to Silicon Valley, Peninsula, and East Bay tech hubs. The city is home to Tesla's factory and numerous tech companies. BART access makes commutes to major employers manageable, while the relatively spacious homes and strong schools attract tech families. Many residents work at companies in San Jose, Milpitas, Newark, and the broader Bay Area. The diverse, educated population and modern infrastructure cater well to tech professionals seeking suburban quality of life."
  },
  {
    question: "What is the diversity like in Fremont?",
    answer: "Fremont is one of the most diverse cities in America, with a population of 230,504 representing numerous ethnicities, cultures, and backgrounds. The city has significant Asian-American, Hispanic, Caucasian, and African-American communities living harmoniously. This diversity is reflected in excellent international restaurants, cultural festivals, and community events. The Fremont Unified School District benefits from this multicultural environment, preparing students for global citizenship. This diversity is often cited as one of Fremont's greatest strengths."
  },
  {
    question: "How does Fremont compare to other East Bay cities?",
    answer: "Fremont offers a unique combination of factors compared to other East Bay cities. It's larger and more suburban than neighboring Newark or Union City, with better schools and more amenities. Compared to Pleasanton or Livermore, Fremont has better public transit (BART) and more diversity. Versus Oakland or Berkeley, Fremont offers newer construction, more space, lower crime, and better schools, though less urban amenities. The $1.55 million median price is competitive given the quality of schools, safety, and space offered."
  },
  {
    question: "What types of homes are available in Fremont?",
    answer: "Fremont's housing stock is diverse, ranging from condos and townhomes starting around $650,000 to luxury single-family homes over $3 million in Mission San Jose. The city has many single-family homes from the 1960s-1980s in established neighborhoods, newer developments in Warm Springs and southern areas built in the 2000s-2020s, and historic properties in Niles. Lot sizes vary from small urban lots to quarter-acre+ parcels. Many homes feature modern updates, and newer construction often includes energy-efficient features."
  },
  {
    question: "Is Fremont a good investment for real estate?",
    answer: "Fremont presents strong investment potential based on several factors. The city's excellent schools consistently attract families willing to pay premium prices. Tesla and other major employers provide economic stability and housing demand. BART access and proximity to Silicon Valley support long-term value. The diverse economy reduces risk from any single industry downturn. Population growth and limited new construction maintain supply constraints. Historically, Fremont has shown steady appreciation, and the fundamentals supporting this trend remain solid."
  },
  {
    question: "What is the commute like from Fremont to major employment centers?",
    answer: "Fremont offers reasonable commutes to major Bay Area employment centers. Silicon Valley companies in San Jose and Milpitas are 15-30 minutes by car. BART provides 50-60 minute commutes to San Francisco and 20-30 minutes to Oakland. Peninsula employers (Palo Alto, Mountain View) are 30-40 minutes via 880 or Dumbarton Bridge. Tesla's Fremont factory means many residents have very short commutes. Traffic can be heavy during peak hours, but BART and flexible work arrangements have improved commute quality for many."
  },
  {
    question: "What amenities and shopping are available in Fremont?",
    answer: "Fremont has extensive shopping and amenities for its 230,504 residents. The city features the Pacific Commons shopping district with major retailers, restaurants, and a movie theater. Fremont Hub and other centers provide grocery stores, services, and dining. The diverse population supports excellent international cuisine, particularly Indian, Chinese, and Afghan restaurants. The city has modern recreation facilities, libraries, and community centers. While not as urban as San Francisco, Fremont offers suburban convenience with most needs met locally."
  },
  {
    question: "Are there any first-time homebuyer programs in Fremont?",
    answer: "First-time buyers in Fremont can access several assistance programs. Alameda County offers down payment assistance programs for eligible buyers. CalHFA provides state-level programs including down payment assistance and favorable loan terms. Federal programs like FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with 3% down are available. Some employers, particularly in tech, offer housing assistance benefits. Income limits and other requirements vary by program, so consult with a local lender familiar with Fremont's market."
  },
  {
    question: "What should I know about Fremont's climate and weather?",
    answer: "Fremont enjoys a mild Mediterranean climate with warm, dry summers and cool, wet winters. Summer temperatures typically range from 60-80°F, with occasional heat waves reaching the 90s. The city gets less fog than coastal areas but more than inland valleys, creating comfortable conditions. Winters are mild with temperatures in the 40-60°F range. Annual rainfall averages about 15 inches, mostly falling November-March. The pleasant weather supports year-round outdoor activities like hiking Mission Peak and enjoying the city's many parks."
  },
  {
    question: "How safe is Fremont compared to other Bay Area cities?",
    answer: "Fremont consistently ranks as one of the safest cities in the Bay Area and California. The city's crime rates are below state and national averages for both violent and property crimes. Neighborhoods like Mission San Jose, Ardenwood, and Warm Springs are particularly safe. The Fremont Police Department is well-regarded and maintains strong community relationships. This safety is a major attraction for families and contributes to the city's high quality of life. However, as with any city, safety varies by neighborhood, so research specific areas."
  },
  {
    question: "What is the rental market like in Fremont?",
    answer: "Fremont's rental market is strong, supporting investment property potential. Single-family homes typically rent for $3,500-$5,500+ per month depending on size and location. Condos and townhomes rent for $2,500-$3,800. High demand comes from Tesla employees, tech workers, and families wanting to try neighborhoods before buying. Vacancy rates are generally low, and quality properties rent quickly. California's rental laws favor tenants, so landlords should understand regulations. The strong rental market provides options for investors and flexibility for those not ready to buy."
  }
];

export function FremontFAQ() {
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
        title="Fremont Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your Fremont real estate questions. Learn about home prices, schools, neighborhoods, and buying in Fremont from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/fremont-faq"
        city="Fremont"
        coordinates={{ lat: 37.5485, lng: -121.9886 }}
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
            Fremont Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Fremont. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="fremont" />

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
