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
    question: "What is the average home price in Newark?",
    answer: "The median home price in Newark is approximately $1.2 million as of 2024, making it one of the more affordable options in the Bay Area. Prices vary by neighborhood and property type—townhomes and condos start around $700,000-$900,000, while single-family homes typically range from $1.1M to $1.5M. Compared to neighboring Fremont ($1.4M) and Union City ($1.1M), Newark offers competitive pricing with excellent access to major employment centers."
  },
  {
    question: "Is Newark a good place for first-time homebuyers?",
    answer: "Newark is an excellent choice for first-time buyers in the Bay Area. With a median price of $1.2M compared to $1.35M in San Francisco or $1.4M in Fremont, it offers relative affordability while maintaining proximity to tech jobs. The community is family-oriented with good schools in the Newark Unified School District, and the city's growing downtown area is adding new amenities. First-time buyers often start with townhomes or condos and later upgrade to single-family homes within the city."
  },
  {
    question: "How does Newark's affordability compare to other Bay Area cities?",
    answer: "Newark stands out as one of the more affordable Bay Area communities while still offering excellent quality of life. At $1.2M median home price, it's notably less expensive than San Francisco ($1.35M), Palo Alto ($3.5M+), or even neighboring Fremont ($1.4M). However, it provides similar access to employment centers via the Dumbarton Bridge to Meta and Peninsula tech companies, and Highway 880/84 to Silicon Valley. For buyers seeking Bay Area proximity without premium pricing, Newark delivers exceptional value."
  },
  {
    question: "What are the best neighborhoods in Newark for families?",
    answer: "Newark's family-friendly neighborhoods include the areas around Newark Memorial High School, with tree-lined streets and well-maintained homes. The neighborhoods near Silliman Activity and Family Aquatic Center offer recreational amenities and community atmosphere. Areas close to Ardenwood Elementary and Schilling Elementary are popular with young families for their walkability and school proximity. The newer developments near Newark Boulevard feature modern homes with community parks. Each area offers good access to shopping, schools, and the growing downtown district."
  },
  {
    question: "How good are the schools in Newark?",
    answer: "Newark Unified School District serves the community with several well-regarded schools. Elementary schools like Schilling, Snow, and Coyote Hills provide solid foundations, while Newark Memorial High School offers comprehensive programs including college prep and career technical education. The district has focused on improving facilities and technology integration. While test scores are competitive within Alameda County, families also have access to private school options in neighboring Fremont and Newark. Many residents choose Newark for its affordable housing while commuting their children to neighboring districts."
  },
  {
    question: "What is the commute like from Newark to major tech companies?",
    answer: "Newark offers exceptional commute access to Bay Area employment centers. The Dumbarton Bridge provides direct access to Meta/Facebook (15-20 minutes), Stanford (25 minutes), and Peninsula tech companies. Via Highway 880 and 84, Silicon Valley employers like Apple, Google, and Tesla are 25-35 minutes away. BART access is available in nearby Fremont (Union City station), offering transit options to San Francisco (60 minutes). For Peninsula commuters, Newark's location is particularly advantageous, offering reverse commutes with less traffic than those coming from San Jose or East Bay."
  },
  {
    question: "What are the property taxes like in Newark?",
    answer: "Newark property taxes are approximately 1.2-1.3% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments for schools and infrastructure. For a median-priced home at $1.2M, annual property taxes would be around $14,400-$15,600. Thanks to Proposition 13, your assessed value can only increase by a maximum of 2% annually regardless of market appreciation, providing long-term tax predictability. Newark is within Alameda County, which has consistent tax assessment practices."
  },
  {
    question: "What makes Newark a growing community?",
    answer: "Newark is experiencing significant growth and revitalization. The downtown area along Newark Boulevard is seeing new restaurants, shops, and services. The city has invested in infrastructure improvements and community facilities like the Silliman Activity Center. Population has grown steadily to nearly 50,000 residents, bringing new commercial development and amenities. The city's strategic location between Silicon Valley and the Peninsula makes it attractive to young professionals and families. NewPark Mall provides regional shopping, and new mixed-use developments are adding housing and retail options."
  },
  {
    question: "What outdoor recreation is available in Newark?",
    answer: "Newark offers exceptional outdoor recreation, particularly through the Don Edwards San Francisco Bay National Wildlife Refuge. This 30,000-acre refuge features walking trails, bird watching, and environmental education centers. The refuge's salt marshes and wetlands attract over 280 bird species and provide peaceful nature experiences minutes from home. The city also maintains numerous community parks, the Silliman Family Aquatic Center, and has easy access to the Bay Trail for cycling and walking. Coyote Hills Regional Park in neighboring Fremont is just minutes away for hiking and picnicking."
  },
  {
    question: "Is Newark a good investment for real estate?",
    answer: "Newark presents strong investment potential for several reasons. The city's affordability relative to surrounding areas attracts first-time buyers and move-up buyers from more expensive markets. Its proximity to major employers via the Dumbarton Bridge positions it well as remote work decreases but Peninsula jobs remain. The growing downtown and community improvements are enhancing quality of life and property values. Historical appreciation has been steady, and the limited housing supply in the Bay Area supports continued growth. For investors, the combination of relative affordability, strong rental demand, and infrastructure investment creates positive fundamentals."
  },
  {
    question: "What is the Don Edwards Wildlife Refuge and why does it matter?",
    answer: "The Don Edwards San Francisco Bay National Wildlife Refuge is a major asset for Newark residents. As the largest urban wildlife refuge in the country, it provides 30,000 acres of wetlands, salt marshes, and mudflats right in Newark's backyard. The refuge offers hiking trails, environmental education programs, and bird watching opportunities for over 280 species. It creates a natural buffer that prevents over-development and provides quality of life benefits. For homebuyers, proximity to this pristine natural area is a unique selling point—offering urban convenience with nature preserve access rarely found in Bay Area communities."
  },
  {
    question: "How does Newark's Dumbarton Bridge location benefit residents?",
    answer: "The Dumbarton Bridge is Newark's secret weapon for Peninsula access. This direct connection crosses the Bay, providing 15-20 minute commutes to Meta/Facebook, Stanford, and Menlo Park—far shorter than routes from San Jose or other East Bay cities. For Peninsula workers priced out of Palo Alto or Menlo Park's $3M+ housing, Newark offers $1.2M medians with similar commute times. The bridge also accesses Peninsula shopping, dining, and recreation. During the tech boom, this strategic location becomes increasingly valuable as Peninsula housing remains unaffordable for most buyers."
  },
  {
    question: "What shopping and dining options are available in Newark?",
    answer: "Newark provides diverse shopping and dining through NewPark Mall, a regional shopping center with major retailers, restaurants, and entertainment options. Newark Boulevard's downtown area has seen growth in local restaurants, cafes, and service businesses. The city's multicultural population supports diverse cuisines including Indian, Mexican, Chinese, and American fare. While Newark's commercial district is growing, residents also have easy access to Fremont's extensive shopping districts and Union City's amenities. The city is actively working to expand its downtown dining and entertainment options."
  },
  {
    question: "What are HOA fees like in Newark communities?",
    answer: "HOA fees in Newark vary significantly by property type and community. Townhome communities typically charge $300-$500 monthly, covering exterior maintenance, landscaping, insurance, and often water/garbage. Condo complexes may range from $350-$600 monthly depending on amenities and building age. Single-family home communities with HOAs usually charge $50-$150 monthly for common area maintenance and amenities. Always review HOA financials, reserve funds, and any planned special assessments before purchasing. Well-managed HOAs maintain property values and ensure community upkeep."
  },
  {
    question: "How competitive is the Newark housing market?",
    answer: "Newark's housing market competitiveness varies by price point and property type. Well-priced homes under $1.3M often receive multiple offers, especially move-in ready single-family properties. Townhomes and condos for first-time buyers can be very competitive with quick sales. However, the market is generally less frenzied than San Francisco or Peninsula cities. Successful buyers get pre-approved (not just pre-qualified), work with experienced local agents who understand Newark's neighborhoods, and act quickly when the right property appears. Offering clean terms and being flexible on closing timelines can make your offer stand out."
  },
  {
    question: "Are there first-time homebuyer programs available in Newark?",
    answer: "First-time buyers in Newark can access several assistance programs. California Housing Finance Agency (CalHFA) offers down payment assistance and competitive loan programs. Alameda County provides the First Time Homebuyer Program with down payment assistance for qualifying buyers. FHA loans require just 3.5% down, and conventional loans now offer 3% down options. VA loans are available for veterans with 0% down. Local lenders familiar with Newark can guide you through available programs, income limits, and qualification requirements. Many first-time buyers successfully purchase in Newark using these programs combined with the city's relative affordability."
  },
  {
    question: "What is Newark's downtown revitalization bringing to the community?",
    answer: "Newark's downtown revitalization along Newark Boulevard is transforming the city's core. New restaurants, coffee shops, and retail businesses are opening, creating a walkable downtown atmosphere. The city has invested in streetscape improvements, pedestrian amenities, and public gathering spaces. Mixed-use developments are adding housing above ground-floor retail. Community events and farmers markets activate the downtown area. While still developing compared to established downtowns, Newark's vision includes creating a vibrant city center where residents can gather, dine, and shop locally. This ongoing transformation is enhancing property values and quality of life."
  },
  {
    question: "How does Newark's population growth affect the housing market?",
    answer: "Newark's population of nearly 50,000 represents steady growth that supports the housing market. Unlike some Bay Area cities with restrictive housing policies, Newark has balanced growth with infrastructure investment. The growing population brings commercial development, improved amenities, and enhanced city services. For homebuyers, this growth trajectory is positive—it indicates demand, supports property appreciation, and justifies the city's investments in schools, parks, and infrastructure. The community remains family-oriented while attracting young professionals priced out of more expensive areas. This demographic diversity creates a stable, sustainable housing market."
  },
  {
    question: "What should I know about buying a home in Newark versus Fremont or Union City?",
    answer: "Newark offers a distinct value proposition compared to neighbors Fremont and Union City. At $1.2M median versus Fremont's $1.4M, Newark provides $200,000 in savings while offering similar school quality and Peninsula access. Compared to Union City ($1.1M), Newark has superior Dumbarton Bridge access for Peninsula commuters and the Don Edwards Wildlife Refuge amenity. Newark is smaller and more tight-knit than Fremont, with less traffic congestion. However, Fremont offers more shopping and dining options. For buyers prioritizing affordability, Peninsula access, and a growing community, Newark often delivers the best balance."
  },
  {
    question: "How do I choose the right real estate agent in Newark?",
    answer: "Choosing a Newark real estate agent requires finding someone with deep local expertise. Look for agents who specialize in Newark and understand its distinct neighborhoods, school boundaries, and commute patterns. They should know about the Dumbarton Bridge advantage, wildlife refuge proximity, and downtown development plans. Ask about their transaction volume in Newark (10+ deals annually shows active involvement), references from past Newark clients, and their negotiation track record. An experienced Newark agent will help you understand value differences between neighborhoods, identify properties with appreciation potential, and navigate competitive situations effectively."
  }
];

export function NewarkFAQ() {
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
        title="Newark Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your Newark real estate questions. Learn about home prices, schools, neighborhoods, and buying in Newark from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/newark-faq"
        city="Newark"
        coordinates={{ lat: 37.5296, lng: -122.0402 }}
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
            Newark Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Newark. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="newark" />

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
