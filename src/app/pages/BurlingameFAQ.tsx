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
    question: "What is the average home price in Burlingame?",
    answer: "The median home price in Burlingame is approximately $2.4 million as of 2024, making it one of the Peninsula's most prestigious communities. Prices vary by neighborhood—from around $1.5 million for condos and smaller homes to $5 million or more for estates in Burlingame Hills. The city's excellent schools, downtown charm, and convenient location justify premium pricing. Single-family homes consistently appreciate due to limited inventory and high demand."
  },
  {
    question: "Is Burlingame a good place to buy a home in 2025?",
    answer: "Burlingame offers exceptional value for buyers in 2025. The city combines small-town charm with world-class amenities, including excellent public schools, a walkable downtown on Broadway, and unbeatable transit access via Caltrain and proximity to SFO Airport. With a population of just over 30,000, Burlingame maintains a tight-knit community feel while offering Peninsula convenience. The stable market, strong school district, and limited housing supply support long-term appreciation."
  },
  {
    question: "What makes Broadway Avenue in Burlingame special?",
    answer: "Broadway Avenue is Burlingame's vibrant downtown corridor, featuring over 300 shops, restaurants, and services in a charming, walkable environment. This tree-lined shopping district offers everything from upscale boutiques to casual eateries, creating a true Main Street experience. Unlike mall-based shopping, Broadway preserves small-town character with local businesses, outdoor dining, and community events. Proximity to Broadway is a major selling point for homes, with walkability adding significant value."
  },
  {
    question: "How are the schools in Burlingame?",
    answer: "Burlingame School District is consistently rated among the top districts in San Mateo County, with excellent API scores and test results. The district serves approximately 3,000 students across five elementary schools, one intermediate school, and feeds into top-rated high schools. Strong parent involvement, well-funded programs, and experienced teachers create exceptional educational outcomes. Many families specifically choose Burlingame for the schools, making homes in the district highly sought-after."
  },
  {
    question: "What are the best neighborhoods in Burlingame?",
    answer: "Top Burlingame neighborhoods include Burlingame Hills (luxury estates with views, larger lots), Ray Park (family-friendly, excellent schools, mid-century homes), and Downtown/Central Burlingame (walkable to Broadway, charming older homes). The Easton Addition offers craftsman-style homes on tree-lined streets, while the Lyon-Hoag area provides more affordable entry points. Each neighborhood has distinct character—Hills for luxury and views, Ray Park for families, Downtown for walkability."
  },
  {
    question: "How is Caltrain access from Burlingame?",
    answer: "Burlingame has two Caltrain stations—Burlingame and Broadway—providing exceptional Peninsula transit access. Commuters can reach San Francisco in 25-30 minutes or Silicon Valley in 30-45 minutes. The stations are walkable from many neighborhoods, particularly downtown and central areas. With Caltrain electrification and expanded service, the value of proximity to stations continues to increase. Many buyers prioritize walkability to Caltrain for work commutes and reducing car dependency."
  },
  {
    question: "How close is Burlingame to SFO Airport?",
    answer: "Burlingame is immediately adjacent to San Francisco International Airport, just 5-10 minutes away by car. This proximity is a major advantage for frequent travelers, business professionals, and anyone valuing easy airport access. Despite the closeness, most residential areas experience minimal aircraft noise due to flight paths and the city's layout. The airport also provides employment opportunities and supports local businesses. Proximity to SFO without significant noise impact adds unique value."
  },
  {
    question: "What are the tree-lined streets like in Burlingame?",
    answer: "Burlingame is renowned for its stunning tree canopy, with mature trees lining virtually every street creating a distinctive green, park-like atmosphere. Species include coast live oak, California redwood, and various ornamentals that provide year-round beauty. The tree-lined streets add character, shade, and environmental benefits while creating pleasant walking environments. This urban forest is protected by city ordinances and actively maintained, contributing significantly to Burlingame's desirable aesthetic and quality of life."
  },
  {
    question: "What is the commute like from Burlingame?",
    answer: "Burlingame offers excellent commute options in all directions. San Francisco is 15-25 minutes via Highway 101 or 25-30 minutes on Caltrain. Silicon Valley destinations range from 20-45 minutes depending on location and traffic. The city's central Peninsula location minimizes commute times compared to outlying areas. Multiple access points to 101 and 280 provide flexibility. For airport workers, SFO is just minutes away. The combination of highway and Caltrain access is a major selling point."
  },
  {
    question: "Are there parks and recreation in Burlingame?",
    answer: "Burlingame offers extensive parks and recreation, including Washington Park (65 acres with sports fields, playgrounds, and trails), Bayside Park along the Bay with walking paths, and Ray Park with community facilities. The Recreation Department offers year-round programs for all ages. Tree-lined streets encourage walking and biking. The downtown area hosts farmers markets and community events. This combination of formal parks, neighborhood green spaces, and community programs creates an active, family-friendly lifestyle."
  },
  {
    question: "How competitive is the Burlingame housing market?",
    answer: "Burlingame's housing market is highly competitive, especially for well-maintained homes in desirable neighborhoods like Burlingame Hills and Ray Park. Limited inventory and strong demand often result in multiple offers and sales at or above asking price. Buyers typically need strong pre-approvals, quick decision-making, and sometimes creative offers. Homes in top school attendance areas and walkable to downtown or Caltrain receive particular interest. Working with an experienced local agent familiar with Burlingame's micro-markets is essential."
  },
  {
    question: "What types of homes are available in Burlingame?",
    answer: "Burlingame features diverse housing stock including: mid-century modern homes (especially in Ray Park and Easton Addition), craftsman bungalows (downtown areas), Spanish and Tudor revivals (central neighborhoods), luxury estates (Burlingame Hills), contemporary new construction, and condos/townhomes. Most homes were built between 1920-1970, offering character and established neighborhoods. Lot sizes range from small urban lots to expansive hillside parcels. This variety accommodates different budgets, though prices generally start around $1.5M."
  },
  {
    question: "What is the investment potential in Burlingame real estate?",
    answer: "Burlingame offers strong investment potential due to multiple factors: limited housing supply, consistently high demand, excellent schools attracting families, strong rental market, Peninsula job growth, and infrastructure improvements (Caltrain electrification). Historical appreciation has been solid, and the city's desirability continues increasing. Proximity to major employment centers (SF, Silicon Valley, airport) provides economic stability. Quality of life factors—downtown, schools, parks—support long-term value. For 5-10+ year holds, Burlingame typically outperforms regional averages."
  },
  {
    question: "What are property taxes in Burlingame?",
    answer: "Burlingame property taxes are approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments. On a median $2.4M home, annual taxes would be around $26,000-$29,000. Thanks to Prop 13, assessed value increases are capped at 2% per year regardless of market appreciation, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price. Burlingame's well-funded schools and city services justify the investment."
  },
  {
    question: "How walkable is Burlingame?",
    answer: "Burlingame is one of the Peninsula's most walkable cities, particularly in neighborhoods near Broadway downtown. Residents can walk to 300+ shops and restaurants, Caltrain stations, parks, and services. Tree-lined streets, sidewalks throughout, and pedestrian-friendly intersections encourage walking. The downtown core is almost entirely walkable, and many neighborhoods are within a 15-20 minute walk of Broadway. This walkability is unusual for Peninsula suburbs and adds significant lifestyle value and property appeal."
  },
  {
    question: "What are HOA fees like in Burlingame condos?",
    answer: "Burlingame condo HOA fees typically range from $400-$800 per month depending on the complex, age, amenities, and size. Fees cover building insurance, common area maintenance, water/garbage, and reserve funds. Burlingame has fewer large condo complexes than neighboring cities, with many smaller, well-maintained buildings. When evaluating condos, review HOA financial documents, reserve funds, and recent special assessments. Well-managed HOAs maintain property values and provide hassle-free living."
  },
  {
    question: "What should I look for when buying a home in Burlingame?",
    answer: "When buying in Burlingame, prioritize: school attendance area (if you have children), walkability to downtown Broadway, Caltrain access, lot size and orientation, home condition and update needs, tree coverage and landscaping, neighborhood character, and parking availability. Key inspections include foundation, roof, electrical/plumbing systems, and sewer lateral. Understand any HOA or neighborhood restrictions. Consider future needs—will you want to expand or remodel? Work with an agent familiar with Burlingame's neighborhoods and disclosure requirements."
  },
  {
    question: "Is there new construction in Burlingame?",
    answer: "Burlingame has limited new construction due to being fully built-out, with most growth coming from teardowns and rebuilds or renovations. Occasionally, developers purchase older homes on larger lots for new construction, particularly in areas zoning permits. Small infill projects and ADU (Accessory Dwelling Unit) additions are more common than large developments. This limited new supply supports property values. Buyers seeking modern homes often choose renovated properties or new builds replacing older structures. The city's development review process ensures quality and neighborhood compatibility."
  },
  {
    question: "What is the lifestyle like in Burlingame?",
    answer: "Burlingame offers a refined, family-oriented lifestyle combining Peninsula convenience with small-town charm. Residents enjoy walking to downtown for coffee and shopping, dining at excellent restaurants, attending community events, and using nearby parks. The strong sense of community, excellent schools, and safe neighborhoods attract professionals and families. Proximity to San Francisco, Silicon Valley, and SFO provides career opportunities while maintaining suburban quality of life. Tree-lined streets, architectural diversity, and civic pride create a distinctive, highly desirable environment."
  },
  {
    question: "How do I choose a real estate agent in Burlingame?",
    answer: "Choose a Burlingame agent based on: deep local knowledge (they should know neighborhoods, schools, and market trends intimately), recent transaction history in Burlingame (10+ deals annually shows active involvement), familiarity with different property types and price points, communication style matching your preferences, and references from past clients. Interview 2-3 agents before deciding. Look for someone who asks about your needs rather than just promoting themselves. In Burlingame's competitive market, an experienced local agent's guidance on pricing, negotiations, and inspections is invaluable."
  }
];

export function BurlingameFAQ() {
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
        title="Burlingame Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in Burlingame. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.5841, lng: -122.3660 }}
      />
      <FAQHeader />
      <FAQHero
        title="Burlingame Real Estate FAQ"
        description="Everything you need to know about buying a home in Burlingame. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="burlingame" />

      <Footer />
    </div>
  );
}
