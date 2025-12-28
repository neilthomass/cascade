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
    question: "What is the average home price in San Carlos?",
    answer: "The median home price in San Carlos is approximately $2.2 million as of 2024. This charming San Mateo County city offers exceptional value with its award-winning schools, walkable downtown, and strong community feel. Prices vary by neighborhood—homes in White Oaks and the Highlands typically command premium prices, while properties near downtown Laurel Street and the east side offer more accessible entry points. The market has remained resilient due to the city's excellent schools and family-friendly atmosphere."
  },
  {
    question: "Is San Carlos a good place to buy a home in 2025?",
    answer: "San Carlos is an excellent choice for homebuyers in 2025, especially for families. The city offers award-winning schools in the San Carlos School District, a tight-knit community atmosphere, and convenient Caltrain access to both San Francisco and Silicon Valley. With a population of just over 30,000, San Carlos maintains a small-town feel while offering modern amenities. The combination of strong schools, community events, and downtown charm makes it ideal for long-term investment. The walkable downtown along Laurel Street adds to the quality of life."
  },
  {
    question: "What are the best neighborhoods in San Carlos?",
    answer: "Top neighborhoods in San Carlos include White Oaks (highly sought-after for its tree-lined streets and larger lots), the Highlands (elevated location with views and newer construction), and the downtown area near Laurel Street (walkability and community feel). The Devonshire area is popular with families for its proximity to excellent schools, while Howard Park and Crestview Park neighborhoods offer mid-century homes with good value. Each neighborhood has distinct character, but all benefit from the city's exceptional schools and community atmosphere."
  },
  {
    question: "How good are the schools in San Carlos?",
    answer: "San Carlos School District is consistently ranked among the top school districts in California. The district includes highly-rated elementary schools like Arundel, Heather, and White Oaks, and Tierra Linda Middle School. For high school, students attend Sequoia High School in nearby Redwood City. The schools are known for strong academics, involved parent communities, and excellent extracurricular programs. Many families move to San Carlos specifically for the schools, making it one of the most family-friendly communities on the Peninsula."
  },
  {
    question: "What is downtown San Carlos like?",
    answer: "Downtown San Carlos, centered on Laurel Street, offers a charming, walkable village atmosphere with locally-owned shops, restaurants, cafes, and services. It's a true community gathering place where residents run into neighbors and friends. The downtown hosts regular farmers markets, the Art & Wine Faire, and other community events throughout the year. You'll find everything from family restaurants to boutique shops, creating a small-town feel rare in the Bay Area. The downtown's charm is a major draw for buyers seeking a connected community."
  },
  {
    question: "How much do I need to earn to buy a house in San Carlos?",
    answer: "To comfortably afford the median-priced home in San Carlos ($2.2M), you typically need a household income of $500,000-$650,000, assuming a 20% down payment and following standard debt-to-income guidelines. Many San Carlos buyers work in tech, finance, or other high-paying Bay Area industries. First-time buyers sometimes start with townhomes or smaller properties, which offer lower entry points while still providing access to the excellent schools. The premium pricing reflects the quality of schools, community, and location."
  },
  {
    question: "What is the commute like from San Carlos?",
    answer: "San Carlos offers excellent commute options with a Caltrain station providing direct service to both San Francisco (35-45 minutes) and Silicon Valley. By car, it's about 25 miles south of San Francisco via US-101 or I-280. The city's central Peninsula location makes it convenient for South Bay tech workers (15-25 minutes to Palo Alto, 20-30 minutes to Mountain View) and San Francisco commuters. Many residents bike to the Caltrain station. The convenient location without being directly in a major city is a key selling point."
  },
  {
    question: "What community events happen in San Carlos?",
    answer: "San Carlos hosts numerous community events that build its strong neighborhood feel. The annual Art & Wine Faire draws thousands for art, music, and food. The weekly farmers market on Laurel Street is a community gathering spot. Other events include Summer Nights on Laurel (street festival), Halloween festivities, holiday tree lighting, and various school events and fundraisers. The active Parks and Recreation Department offers programs year-round. These events foster connections and are a big part of why residents love living in San Carlos."
  },
  {
    question: "Are there condos or townhomes in San Carlos?",
    answer: "While San Carlos is primarily known for single-family homes, there are condo and townhome options, particularly near downtown and along El Camino Real. These typically range from $800,000 to $1.5 million depending on size and location. Townhomes offer an entry point into the San Carlos School District at a lower price than single-family homes. Some complexes include amenities like pools and clubhouses. However, inventory is limited compared to single-family homes, and they still provide access to the award-winning schools."
  },
  {
    question: "What is the property tax rate in San Carlos?",
    answer: "San Carlos property taxes are approximately 1.2-1.3% of assessed value annually, which includes the base 1% Proposition 13 rate plus San Mateo County bonds and local assessments. Thanks to Prop 13, your assessed value increases by a maximum of 2% per year regardless of market appreciation. A home purchased for $2.2M would have annual property taxes around $26,400-$28,600. New buyers are assessed at purchase price. The taxes support excellent schools and city services that maintain San Carlos's high quality of life."
  },
  {
    question: "Is San Carlos good for families?",
    answer: "San Carlos is exceptional for families and often called the 'City of Good Living.' The combination of award-winning schools, safe neighborhoods, abundant parks, and strong community makes it ideal for raising children. Kids can walk or bike to school, play in numerous parks (including Burton Park and Heather Park), and participate in community events. The small-town atmosphere means families know their neighbors and build lasting friendships. Many families stay in San Carlos from elementary through high school, creating stability and community connection."
  },
  {
    question: "What is White Oaks in San Carlos?",
    answer: "White Oaks is one of San Carlos's most desirable neighborhoods, known for tree-lined streets, larger lots, and proximity to White Oaks Elementary School (one of the top-rated schools in California). Homes in White Oaks typically feature traditional architecture, mature landscaping, and strong curb appeal. The neighborhood has a tight-knit community feel with families who've lived there for generations alongside newer residents. Properties in White Oaks command premium prices, often exceeding $3 million, due to the combination of schools, lot sizes, and neighborhood character."
  },
  {
    question: "How competitive is the San Carlos housing market?",
    answer: "The San Carlos market is highly competitive, especially for well-maintained homes in desirable neighborhoods and within the best school attendance areas. Properties often receive multiple offers and can sell above asking price. The limited inventory, combined with strong demand from families seeking the excellent schools, creates competition. Successful buyers typically work with experienced local agents, get fully pre-approved, and are prepared to act quickly. The market is most active in spring and early summer when families want to move before the school year starts."
  },
  {
    question: "What makes San Carlos different from other Peninsula cities?",
    answer: "San Carlos stands out for its genuine small-town community feel despite being on the Peninsula. Unlike some neighboring cities, San Carlos has a true downtown that serves as a community gathering place. The city's commitment to community events, excellent schools, and neighborhood character creates strong resident loyalty. It's large enough to have amenities but small enough (population ~30,000) that you'll see familiar faces. The combination of community, schools, location, and charm makes San Carlos unique among Peninsula cities."
  },
  {
    question: "Are there parks and recreation facilities in San Carlos?",
    answer: "San Carlos has excellent parks and recreation facilities throughout the city. Burton Park is the largest with sports fields, playground, picnic areas, and a recreation center offering classes and programs. Heather Park features tennis courts and play areas. Crestview Park and Laureola Park serve their neighborhoods. The city also has the San Carlos Library and community center. The Parks and Recreation Department offers year-round programs for all ages. The abundance of green space and activities contributes to San Carlos's family-friendly reputation."
  },
  {
    question: "What is the investment potential for San Carlos real estate?",
    answer: "San Carlos real estate has strong long-term investment potential due to limited housing supply, excellent schools, and desirable location. The city's strict development regulations preserve neighborhood character but limit new construction, supporting property values. Families often stay long-term due to schools, creating stable demand. Historical appreciation has been strong, though the market experiences cycles. The premium for school quality and community tends to hold value even in down markets. For buy-and-hold investors, San Carlos offers stability, though short-term appreciation varies with broader market conditions."
  },
  {
    question: "What should I know about buying a home in San Carlos?",
    answer: "Key considerations for San Carlos home purchases include: 1) School attendance boundaries—verify which schools serve the property, as this significantly affects value, 2) Lot size and location within neighborhoods vary considerably, 3) Many homes are older (1950s-1970s) and may need updates, 4) Foundation and drainage are important in hillside areas, 5) Competition is fierce for well-priced homes in top school areas, 6) Community involvement is high—expect active neighborhood groups and school participation. Working with an agent who knows San Carlos's neighborhoods and schools is essential."
  },
  {
    question: "How walkable is San Carlos?",
    answer: "San Carlos is quite walkable, especially in neighborhoods near downtown Laurel Street. Residents can walk to shops, restaurants, cafes, and services along Laurel. Many children walk or bike to school, and the city has good sidewalk coverage in established neighborhoods. The downtown area is particularly pedestrian-friendly with crosswalks and bike lanes. However, some hillside neighborhoods are less walkable due to elevation changes. The Caltrain station is within walking or biking distance for many residents. Overall, San Carlos offers above-average walkability for a suburban Peninsula city."
  },
  {
    question: "What are HOA fees like in San Carlos?",
    answer: "Most single-family homes in San Carlos do not have HOA fees, which is a significant advantage over some neighboring communities. Townhomes and condos typically have HOA fees ranging from $400-$800 per month, covering building maintenance, insurance, landscaping, and sometimes water/garbage. When evaluating properties with HOAs, review the HOA's financial statements, reserve funds, and any planned special assessments. The lack of HOA fees for most single-family homes is one reason many buyers prefer San Carlos, as it provides more control over property decisions."
  },
  {
    question: "How do I choose the right real estate agent in San Carlos?",
    answer: "Choose a San Carlos agent based on: deep knowledge of San Carlos neighborhoods and school boundaries (this is critical), experience with multiple transactions in the city (10+ San Carlos deals shows true local expertise), understanding of the competitive market dynamics, strong references from past San Carlos clients, and ability to navigate multiple-offer situations. Interview 2-3 agents before deciding. Look for someone who can explain the nuances between neighborhoods and schools. In San Carlos's tight-knit community, an agent with established relationships and reputation matters significantly."
  }
];

export function SanCarlosFAQ() {
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
        title="San Carlos Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in San Carlos. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.5072, lng: -122.2608 }}
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
            San Carlos Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in San Carlos. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="san-carlos" />

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
