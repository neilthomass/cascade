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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Explore Atherton Real Estate?</h2>
          <p className="text-gray-600 font-light">
            Get personalized guidance from a local expert with 15+ years of Bay Area luxury real estate experience.
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
              placeholder="Tell us about your luxury home buying needs"
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
    question: "What is the average home price in Atherton?",
    answer: "The median home price in Atherton is approximately $7.5 million, making it consistently one of America's most expensive ZIP codes. However, many properties exceed $20 million, with ultra-luxury estates ranging from $10 million to over $100 million. Atherton's strict zoning laws requiring minimum 1-acre lots and prohibition on commercial development maintain this exclusivity. The market features custom-built estates with extensive grounds, privacy, and world-class amenities."
  },
  {
    question: "Why is Atherton so expensive?",
    answer: "Atherton's extraordinary pricing reflects multiple factors: mandatory minimum 1-acre lot sizes limit supply to roughly 1,000 properties total, complete prohibition on commercial development preserves residential tranquility, proximity to Stanford University and Sand Hill Road venture capital firms, no sidewalks or streetlights maintaining privacy and estate character, and concentration of tech executives and billionaires creating intense demand. The town's governance strictly protects these characteristics, ensuring scarcity and exclusivity."
  },
  {
    question: "Who lives in Atherton?",
    answer: "Atherton residents include tech industry executives, venture capitalists, founders of major companies, entertainment industry leaders, professional athletes, and multi-generational wealth families. The town has the highest median household income in America and attracts individuals valuing extreme privacy and proximity to Silicon Valley's innovation centers. Many residents maintain low profiles despite extraordinary wealth, appreciating Atherton's discretion and lack of commercial activity."
  },
  {
    question: "What are the zoning requirements in Atherton?",
    answer: "Atherton enforces strict zoning to preserve its character. All residential lots must be minimum 1 acre, with many properties 2-5 acres or larger. No commercial businesses are permitted within town limits. Building restrictions limit height, maintain significant setbacks, and require extensive landscaping. Any construction or major renovation requires town approval with rigorous review processes. These regulations are vigorously enforced to maintain property values and community character."
  },
  {
    question: "What schools serve Atherton?",
    answer: "Atherton is primarily served by the highly-rated Menlo Park City School District for elementary and middle school, including Las Lomitas Elementary and Encinal School. For high school, students attend Menlo-Atherton High School in Atherton (Sequoia Union High School District). Many families also choose elite private schools including Menlo School, Sacred Heart Schools, and Phillips Academy. The combination of excellent public options and proximity to prestigious private institutions attracts families prioritizing education."
  },
  {
    question: "Is Atherton a good investment in 2025?",
    answer: "Atherton represents a unique investment proposition. The town's ultra-luxury market has shown remarkable resilience and appreciation over decades, supported by limited supply and consistent demand from high-net-worth individuals. However, properties at this price point require longer selling timelines and smaller buyer pools. Buyers should view Atherton as a lifestyle choice with long-term wealth preservation potential rather than a short-term investment. The town's proximity to Silicon Valley innovation and strict development controls support ongoing value."
  },
  {
    question: "What is the property tax rate in Atherton?",
    answer: "Atherton property taxes are approximately 1.13% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments. For a $7.5 million home, annual property taxes would be roughly $85,000. Thanks to Prop 13, assessed value increases are capped at 2% annually regardless of market appreciation, providing tax predictability for long-term owners. New purchases are assessed at purchase price, so buyers should budget accordingly for initial tax levels."
  },
  {
    question: "How close is Atherton to Stanford University and Silicon Valley?",
    answer: "Atherton is exceptionally well-positioned for Silicon Valley access. Stanford University is approximately 3-4 miles away (5-10 minute drive), Sand Hill Road venture capital corridor is under 2 miles, and major tech campuses including Meta (formerly Facebook) are within 10-15 minutes. San Francisco is 30-35 miles north via Highway 101 or 280. This proximity to innovation centers while maintaining complete residential privacy makes Atherton uniquely attractive to tech industry leaders."
  },
  {
    question: "What amenities are available in Atherton?",
    answer: "Atherton itself contains no commercial development, making it purely residential. However, the town is surrounded by amenities in neighboring communities. Menlo Park (adjacent) offers downtown shops, restaurants, and services. Palo Alto provides upscale retail, dining, and Stanford Shopping Center. Residents value Atherton's lack of commercial activity for the privacy and tranquility it provides, while enjoying quick access to world-class amenities minutes away in surrounding towns."
  },
  {
    question: "What types of homes are in Atherton?",
    answer: "Atherton features predominantly custom-built luxury estates on large lots. Typical properties include 6,000-15,000+ square foot residences with 5-8+ bedrooms, extensively landscaped grounds with mature trees, swimming pools, tennis courts, guest houses, wine cellars, home theaters, and smart home technology. Architectural styles vary from traditional estates to modern masterpieces, many designed by renowned architects. Properties emphasize privacy with long driveways, gates, and substantial setbacks from roads."
  },
  {
    question: "How competitive is the Atherton real estate market?",
    answer: "The Atherton market operates differently than typical residential real estate. With only 1,000 or so properties total and limited annual inventory (typically 20-40 active listings), buyers face extreme scarcity. However, the ultra-luxury price point means smaller buyer pools and longer marketing times than mass-market properties. Exceptional properties can generate multiple offers, while others may take 6-12+ months to find the right buyer. Off-market transactions are common, requiring relationships with specialized agents who know both buyers and sellers."
  },
  {
    question: "What are the hidden costs of owning an Atherton estate?",
    answer: "Beyond the purchase price, Atherton ownership requires substantial ongoing costs. Property taxes ($85,000+ annually for median-priced homes), estate maintenance including landscaping, pool service, and property management ($5,000-15,000+ monthly), utilities for large homes ($2,000-5,000+ monthly), homeowner's insurance ($15,000-50,000+ annually), and property improvements to maintain estate standards. Many owners employ household staff. Budget 1-2% of property value annually for maintenance, plus staffing and operational costs."
  },
  {
    question: "Can I build a new home in Atherton?",
    answer: "Yes, many buyers purchase Atherton properties specifically to build custom estates. The town's planning department oversees a rigorous approval process including architectural review, environmental assessment, and neighbor notification. Construction must comply with strict setback requirements, height limits, and landscaping standards. Buyers should engage architects experienced with Atherton's requirements. Many properties labeled as 'teardowns' sell for $5-10 million purely for the land value, with buyers planning to invest additional millions in custom construction."
  },
  {
    question: "What is the process for buying a home in Atherton?",
    answer: "Purchasing in Atherton requires specialized expertise. Work with an agent deeply knowledgeable about ultra-luxury Peninsula real estate and Atherton specifically. Many properties sell off-market through private networks. Buyers typically provide proof of funds or significant pre-approval, conduct extensive property inspections including environmental assessments, and negotiate purchase agreements that may include contingencies for land use approvals if renovation is planned. Closing can take 45-90 days. Discretion throughout the process is standard."
  },
  {
    question: "Are there any restrictions on development or renovations in Atherton?",
    answer: "Atherton imposes extensive development restrictions to preserve community character. All major construction or renovation requires town planning approval with architectural review. Restrictions include maximum building coverage relative to lot size, height limits, setback requirements from property lines, tree preservation ordinances (mature trees are highly protected), and landscape screening requirements. Even minor changes may require permits. The approval process can take months. Buyers planning significant changes should factor this timeline and regulatory environment into their planning."
  },
  {
    question: "What makes Atherton different from other wealthy Bay Area communities?",
    answer: "Atherton's distinguishing characteristics include its absolute prohibition on commercial development (unlike Palo Alto or Menlo Park), mandatory 1-acre minimum lots creating true estate living, lack of sidewalks and streetlights preserving privacy and dark skies, and consistently ranking as America's most expensive ZIP code. While neighboring communities like Los Altos Hills, Woodside, and Portola Valley also offer luxury, Atherton's flat terrain, proximity to Highway 280 and 101, and concentration of wealth create a unique market dynamic."
  },
  {
    question: "Is privacy truly better in Atherton compared to other areas?",
    answer: "Yes, Atherton offers exceptional privacy through multiple factors. Large lot sizes (minimum 1 acre) create substantial distance between homes, absence of sidewalks and through-traffic discourages casual visitors, mature landscaping and trees provide natural screening, town ordinances strictly limit commercial activity and public gathering places, and the concentrated wealth creates a community culture respecting discretion. Many tech executives and high-profile individuals choose Atherton specifically for this privacy, which is difficult to replicate elsewhere in the Bay Area."
  },
  {
    question: "What are the best strategies for buying in Atherton?",
    answer: "Successful Atherton buyers typically: engage specialized luxury real estate agents with Atherton transaction history and off-market access, maintain flexibility on property features (given limited inventory), have financing or proof of funds prepared in advance, consider properties needing renovation for better value, be prepared for longer timelines (3-12+ months to find the right property), and maintain discretion throughout the process. Many buyers start by renting in the area to understand micro-neighborhoods before committing to a purchase. Patience and relationship-building with the right agent are essential."
  },
  {
    question: "How does the Atherton market perform during economic downturns?",
    answer: "Atherton's ultra-luxury market shows different dynamics than broader real estate during economic stress. The town's residents often have diversified wealth less dependent on employment income or single asset classes. During downturns, prices may moderate but rarely crash, given limited supply and long-term demand from high-net-worth buyers viewing real estate as wealth preservation. Transaction volume may slow significantly as buyers wait for clarity, but properties don't flood the market. Recovery has historically been strong as new wealth generation in Silicon Valley creates sustained demand."
  },
  {
    question: "What questions should I ask when buying an Atherton estate?",
    answer: "Essential questions for Atherton purchases include: What are the exact lot dimensions and any easements? What renovations require town approval? What is the condition of major systems (HVAC, electrical, plumbing)? Are there any environmental issues or hazards? What are the actual annual operating costs? Are there water rights or well systems? What is the landscaping maintenance requirement? Are there any neighbor disputes or town violations? What is included in the sale (furnishings, art, etc.)? Has the seller completed all permitted work properly? A thorough due diligence process is essential at this price point."
  }
];

export function AthertonFAQ() {
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
        title="Atherton Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in Atherton. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.4613, lng: -122.1976 }}
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
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-4">ULTRA-LUXURY HOMEBUYER GUIDE</p>
          <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
            Atherton Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying an estate in America's most expensive ZIP code. Expert guidance from a Bay Area luxury real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="atherton" />

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
