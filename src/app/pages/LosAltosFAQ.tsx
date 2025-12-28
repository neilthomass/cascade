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
    question: "What is the average home price in Los Altos?",
    answer: "The median home price in Los Altos is approximately $4.5 million as of 2025, making it one of the most exclusive communities in Silicon Valley. Homes typically range from $3 million for smaller properties to over $8 million for larger estates. The premium pricing reflects Los Altos' exceptional school district, charming downtown, large lots with mature trees, and proximity to major tech companies. Unlike many Bay Area cities, Los Altos has maintained strict zoning that preserves its residential character and property values."
  },
  {
    question: "What makes Los Altos so desirable for homebuyers?",
    answer: "Los Altos is highly sought after for its award-winning Los Altos School District, consistently ranked among California's best. The city features a charming, walkable downtown with boutique shops and restaurants, tree-lined streets with mature landscaping, and large residential lots (often 10,000+ square feet). The family-friendly atmosphere, low crime rates, and strong sense of community make it ideal for raising children. Additionally, its central Silicon Valley location provides easy access to major employers while maintaining a quiet, residential feel."
  },
  {
    question: "Is Los Altos a good place for families?",
    answer: "Los Altos is exceptional for families and is often cited as one of the best family communities in the Bay Area. The Los Altos School District includes top-performing elementary and middle schools, with many families also having access to nearby Palo Alto High School or Mountain View-Los Altos High School. The city prioritizes pedestrian safety with excellent sidewalks and bike paths. Parks like Shoup Park and Grant Park offer recreational facilities, and the downtown Village area hosts family-friendly events throughout the year. The stable, educated community creates an ideal environment for children."
  },
  {
    question: "What are the best neighborhoods in Los Altos?",
    answer: "Top Los Altos neighborhoods include North Los Altos (larger lots, proximity to downtown), the Loyola Corners area (excellent schools, community feel), Rancho San Antonio neighborhoods (hillside views, larger estates), and areas near downtown (walkability, charming streets). The Los Altos Hills border offers more privacy and acreage. Each neighborhood features the city's signature tree-lined streets and well-maintained properties. Location within specific school attendance zones can significantly impact pricing, as can lot size and proximity to the downtown Village."
  },
  {
    question: "How are the schools in Los Altos?",
    answer: "The Los Altos School District is consistently ranked among the top 1% of California school districts. Elementary schools like Almond, Loyola, and Santa Rita regularly receive perfect or near-perfect API scores. Egan Junior High is highly regarded for its academic programs and extracurriculars. For high school, students typically attend Mountain View-Los Altos High School or may choose Los Altos High School, both excellent options. Many families specifically move to Los Altos for the schools, and the district's reputation significantly supports property values."
  },
  {
    question: "What is the Los Altos downtown like?",
    answer: "Downtown Los Altos, known as the Village, offers a charming, walkable main street with local boutiques, cafes, and restaurants. Unlike typical suburban shopping centers, it maintains a small-town character with independent businesses, tree-shaded sidewalks, and community gathering spaces. Popular spots include State Street for dining, specialty food stores like Draeger's Market, and various professional services. The downtown hosts farmers' markets and community events, creating a strong neighborhood identity. Proximity to the Village is a major selling point for many homes."
  },
  {
    question: "What should I budget for property taxes in Los Altos?",
    answer: "Los Altos property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local assessments. For a median-priced home at $4.5 million, expect annual taxes around $49,500-$54,000. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year, providing long-term predictability. New buyers are assessed at purchase price. Los Altos is in Santa Clara County, which has relatively moderate tax rates compared to some other Bay Area counties."
  },
  {
    question: "How much do I need to earn to buy a home in Los Altos?",
    answer: "To comfortably afford a median-priced Los Altos home ($4.5 million), you typically need a household income of $1-1.2 million annually, assuming a 20% down payment ($900,000) and following the 28% debt-to-income guideline. Many Los Altos buyers are tech executives, entrepreneurs, or dual-income professional couples. Some buyers have significant equity from previous home sales or stock compensation. Given the high price point, most buyers have substantial assets beyond income, including investment portfolios and business holdings."
  },
  {
    question: "Is Los Altos a good investment for real estate?",
    answer: "Los Altos has historically been an excellent long-term real estate investment, with consistent appreciation driven by limited inventory, strong schools, and proximity to Silicon Valley tech companies. The city's strict zoning protects against overdevelopment, maintaining property values. However, at the $4.5 million median price point, buyers should plan to hold for 5-10+ years to see meaningful appreciation. The market is less volatile than San Francisco or Oakland but still subject to tech industry cycles. The combination of scarcity, desirability, and wealthy buyer pool supports long-term value."
  },
  {
    question: "What are the property lot sizes like in Los Altos?",
    answer: "Los Altos is known for generous lot sizes, typically ranging from 8,000 to 15,000+ square feet for standard single-family homes, with some properties exceeding 20,000 square feet or even an acre. This is significantly larger than most Bay Area communities and contributes to the spacious, tree-lined feel. Larger lots allow for expansive gardens, pools, and outdoor living spaces. The city's zoning generally requires minimum lot sizes and restricts subdivisions, preserving the neighborhood character. Many properties feature mature oak, redwood, and other trees that create a park-like setting."
  },
  {
    question: "How is the commute from Los Altos to major tech companies?",
    answer: "Los Altos offers excellent access to major Silicon Valley employers. Commute times include: Google (Mountain View) 10-15 minutes, Apple (Cupertino) 15-20 minutes, Meta/Facebook (Menlo Park) 20-25 minutes, and Stanford University (Palo Alto) 10-15 minutes. The location provides easy access to Highway 280, El Camino Real, and local streets. San Francisco is approximately 40-50 minutes via Highway 280 or Caltrain (accessible in nearby Palo Alto or Mountain View). The central Silicon Valley location is a major draw for tech professionals seeking to minimize commute times."
  },
  {
    question: "What is the Los Altos lifestyle like?",
    answer: "Los Altos offers a quiet, suburban lifestyle focused on family, education, and community. Residents enjoy walkable neighborhoods, excellent dining and shopping in the Village, and numerous parks and recreational facilities. The community values privacy, with many homes set back from streets behind mature landscaping. Cultural activities include community theater, art galleries, and music performances. The city hosts events like summer concerts and farmers' markets. It's less urban than Palo Alto but more refined than typical suburbs, attracting successful professionals seeking a peaceful, upscale environment."
  },
  {
    question: "Are there any homes under $3 million in Los Altos?",
    answer: "Homes under $3 million in Los Altos are very rare and typically limited to smaller condos, townhomes, or properties needing significant renovation. The vast majority of single-family homes start at $3 million and quickly escalate based on lot size, location, and condition. Buyers with budgets under $3 million often consider neighboring communities like Mountain View, Sunnyvale, or Cupertino, which offer good schools and proximity to Los Altos at lower price points. However, for those specifically seeking the Los Altos School District and community, the premium pricing is considered worthwhile."
  },
  {
    question: "What should I look for when buying a home in Los Altos?",
    answer: "When buying in Los Altos, prioritize: school attendance boundaries (confirm which elementary school the property feeds to), lot size and usability (some lots have significant setback requirements), mature trees and landscaping (protected heritage trees can restrict remodeling), home condition and potential for expansion (many buyers renovate or rebuild), and proximity to downtown Village (walkability adds value). Also verify property boundaries, easements, and any town restrictions on development. Work with an agent familiar with Los Altos zoning and building requirements, as the city has specific regulations that can impact renovation plans."
  },
  {
    question: "How competitive is the Los Altos housing market?",
    answer: "The Los Altos market is highly competitive, especially for well-located homes in top school zones. Desirable properties often receive multiple offers and sell at or above asking price. Successful buyers typically need: strong pre-approval or proof of funds for all-cash purchases (common at this price point), quick decision-making ability, minimal contingencies, and willingness to compete. However, the ultra-luxury segment ($8M+) may have less competition and more room for negotiation. Working with an experienced local agent who has relationships in the community is essential for accessing off-market opportunities."
  },
  {
    question: "What are the zoning regulations in Los Altos?",
    answer: "Los Altos has strict zoning regulations designed to preserve its residential character. Most of the city is zoned for single-family homes only, with minimum lot sizes typically 7,500-10,000 square feet depending on the zone. The city limits building coverage to approximately 35-45% of lot area and enforces setback requirements. Heritage trees (certain species over specific sizes) are protected and require permits for removal. Any significant remodeling or new construction requires city approval and must comply with design guidelines. These restrictions maintain property values but can complicate renovation projects, so consult with an architect familiar with Los Altos regulations early in your planning."
  },
  {
    question: "Is Los Altos or Los Altos Hills better for families?",
    answer: "Both Los Altos and Los Altos Hills are excellent for families, with different advantages. Los Altos (the town) offers walkability to downtown Village, closer proximity to schools, more established neighborhoods, and easier access to services. Los Altos Hills is unincorporated, features larger lots (often 1+ acres), more privacy, hillside views, and rural character with horses and hiking trails. Los Altos Hills has no commercial areas, requiring driving for all shopping. Both share access to excellent schools. Families preferring suburban convenience typically choose Los Altos, while those seeking estate properties with land choose Los Altos Hills."
  },
  {
    question: "What are the pros and cons of buying in Los Altos?",
    answer: "Pros: Award-winning schools (consistently top-ranked), safe, family-friendly community, charming downtown Village, large lots with mature trees, central Silicon Valley location, strong property values, and excellent quality of life. Cons: Very high home prices (median $4.5M limits many buyers), expensive property taxes, limited housing inventory creates competitive market, strict zoning can complicate renovations, somewhat quiet lifestyle may feel too suburban for some, and limited diversity in housing stock (mostly single-family). For families prioritizing education and stability, the pros typically outweigh the cons, especially for long-term ownership."
  },
  {
    question: "Are there condos or townhomes available in Los Altos?",
    answer: "Los Altos has limited condo and townhome inventory compared to its single-family home stock, but some exist. Options include smaller condo complexes near downtown or along El Camino Real, and a few townhome communities. These typically range from $1.5-3 million depending on size, location, and condition. Condos and townhomes often appeal to downsizers who want to stay in Los Altos schools, empty nesters seeking lower maintenance, or buyers wanting Los Altos' location at a lower price point. HOA fees vary but expect $400-800+ monthly for most complexes, covering maintenance, insurance, and common area upkeep."
  },
  {
    question: "How do I choose the right real estate agent in Los Altos?",
    answer: "Choose a Los Altos agent based on: deep local knowledge (they should know specific streets, school zones, and neighborhood nuances), proven transaction volume in Los Altos specifically (not just general Bay Area experience), relationships with local builders and architects (helpful for renovation planning), understanding of Los Altos zoning and regulations, strong negotiation skills for competitive situations, and excellent references from past clients. Interview 2-3 agents before deciding. At the $4.5M median price point, your agent should be experienced with luxury properties and understand the expectations of high-net-worth buyers. Look for someone who asks detailed questions about your needs rather than just promoting themselves."
  }
];

export function LosAltosFAQ() {
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
            Los Altos Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Los Altos. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="los-altos" />

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
