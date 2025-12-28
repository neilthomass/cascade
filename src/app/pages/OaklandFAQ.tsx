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
    question: "What is the average home price in Oakland?",
    answer: "The median home price in Oakland is approximately $850,000 as of 2024-2025. However, prices vary significantly by neighborhood—from around $500,000 in East Oakland to over $2 million in affluent areas like Rockridge, Montclair, and the Oakland Hills. The market has seen strong appreciation driven by spillover demand from San Francisco and tech workers seeking more space and value."
  },
  {
    question: "Is Oakland a good place to buy a home in 2025?",
    answer: "Oakland offers compelling value for buyers in 2025. With a median price point substantially lower than San Francisco while offering similar Bay Area benefits, Oakland attracts diverse buyers including families, young professionals, and investors. The city's ongoing revitalization, cultural richness, Lake Merritt amenities, and excellent transit access to SF make it an increasingly desirable market with strong long-term appreciation potential."
  },
  {
    question: "What are the best neighborhoods in Oakland for families?",
    answer: "Top family-friendly Oakland neighborhoods include Rockridge (excellent schools, walkable village, BART access), Montclair (hillside community, strong schools, local shopping district), Piedmont Avenue (tree-lined streets, parks, community feel), and Crocker Highlands (quiet, safe, good schools). Redwood Heights and Glenview also offer family-friendly environments with relatively affordable single-family homes and access to good Oakland Unified schools."
  },
  {
    question: "What are the up-and-coming neighborhoods in Oakland?",
    answer: "Several Oakland neighborhoods are experiencing significant revitalization and appreciation. Temescal is already established but continuing to grow with new restaurants and shops. Uptown/Downtown Oakland has seen massive development with new housing and cultural venues. Fruitvale is gentrifying with improved transit access and commercial development. West Oakland and Jingletown/Fruitvale industrial areas are attracting artists and developers. These areas offer appreciation potential but require careful property evaluation."
  },
  {
    question: "How much do I need to earn to buy a house in Oakland?",
    answer: "To comfortably afford Oakland's median-priced home ($850,000), you typically need a household income of $200,000-$250,000, assuming a 20% down payment and following the 28% debt-to-income guideline. This is significantly more accessible than San Francisco while still requiring substantial income. First-time buyers often start with condos, smaller homes in outer neighborhoods, or consider multi-family properties where rental income helps with qualification."
  },
  {
    question: "What is the difference between Oakland and San Francisco real estate?",
    answer: "Oakland offers approximately 35-40% lower median home prices than San Francisco ($850K vs $1.35M), larger lot sizes, more single-family detached homes, and easier parking. Oakland has a more diverse cultural scene, Lake Merritt, and a thriving arts community. While SF has more corporate headquarters, Oakland provides excellent BART access for commuting. Oakland's property taxes are similar (around 1.2%), but HOA fees tend to be lower. Both markets benefit from Bay Area appreciation trends."
  },
  {
    question: "What should I know about Lake Merritt neighborhoods?",
    answer: "The Lake Merritt area is Oakland's crown jewel, featuring a 3.4-mile scenic lake loop, farmer's market, restaurants, and cultural venues. Surrounding neighborhoods like Grand Lake/Lakeshore, Adams Point, and Cleveland Heights offer walkability, proximity to downtown, and strong community feel. Home prices around the lake range from $700,000 for condos to $1.5M+ for larger homes. The area attracts young professionals and families seeking urban amenities with outdoor access. Weekend foot traffic can be heavy but adds vibrancy."
  },
  {
    question: "Is Oakland experiencing urban revitalization?",
    answer: "Yes, Oakland has undergone significant revitalization over the past decade. Uptown and Downtown have seen major development including residential towers, restaurants, and the thriving First Friday art scene. The Fox Theater restoration catalyzed cultural growth. Emeryville border areas have benefited from tech company presence. Transit-oriented development around BART stations continues. However, revitalization is uneven across the city—some neighborhoods are rapidly changing while others lag behind. This creates both opportunities and displacement concerns."
  },
  {
    question: "What are Oakland's best neighborhoods for investment?",
    answer: "Investment-focused buyers often target Fruitvale (improving transit access, Latino cultural district), West Oakland (BART proximity, appreciation potential), and Temescal (already hot, continued growth). Multi-family properties in these areas can generate strong rental income. Established neighborhoods like Rockridge and Montclair offer stable appreciation but lower cash flow. Consider property condition, school quality, crime statistics, and proximity to BART. Oakland's rent control laws (enacted 2017) affect properties built before 1983, impacting investment returns."
  },
  {
    question: "How is the Oakland arts and culture scene?",
    answer: "Oakland has one of the most vibrant arts scenes in the Bay Area. First Fridays in Uptown draw thousands for gallery openings, street performances, and food vendors. The Fox Theater hosts major concerts and events. The Oakland Museum (OMCA) showcases California art and history. Numerous galleries, artist collectives, and live music venues thrive throughout the city. This cultural richness attracts creative professionals and contributes to neighborhood desirability, particularly in Temescal, Uptown, West Oakland, and Fruitvale districts."
  },
  {
    question: "What is the Oakland Unified School District like?",
    answer: "Oakland Unified School District (OUSD) serves the city with a mix of traditional public schools, charter schools, and magnet programs. Quality varies significantly by school—some highly-rated schools like Hillcrest, Montclair, and Thornhill Elementary compete with private options, while others struggle. Many families prioritize living in specific school catchment areas. GreatSchools ratings, school tours, and talking to current parents are essential. Some families choose private schools (numerous options available) or charter schools like Oakland Charter Academy."
  },
  {
    question: "How does San Francisco spillover affect Oakland real estate?",
    answer: "San Francisco's high housing costs have driven significant demand spillover to Oakland. Tech workers, young families, and professionals priced out of SF increasingly choose Oakland for better value, larger homes, and easier parking while maintaining BART access to SF jobs. This trend accelerated during the pandemic with remote work flexibility. The spillover effect has driven Oakland appreciation rates and increased competition for homes in desirable neighborhoods, while also raising concerns about displacement and gentrification in historically working-class communities."
  },
  {
    question: "What are the property taxes in Oakland?",
    answer: "Oakland property taxes are approximately 1.20-1.25% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments (Alameda County, BART, OUSD, etc.). Like all California properties, Prop 13 caps annual increases at 2% regardless of market appreciation, making long-term ownership advantageous. A home purchased for $850,000 would have annual taxes around $10,200-$10,600. Some neighborhoods have additional special assessments for infrastructure improvements."
  },
  {
    question: "What are the hidden costs of buying a home in Oakland?",
    answer: "Beyond purchase price, Oakland buyers should budget for: closing costs (2-3% of purchase price), county transfer tax ($1.10 per $1,000), title insurance, inspection fees ($500-$1,500), and potential earthquake retrofitting. Many older Oakland homes need foundation work, electrical upgrades, or plumbing replacement. HOA fees for condos range $300-$700/month. Property insurance can be higher in fire-prone Oakland Hills. Some neighborhoods require sewer lateral inspections and compliance. Budget 1-2% of home value annually for maintenance."
  },
  {
    question: "What is Oakland's diversity like as a community?",
    answer: "Oakland is one of the most diverse cities in America, with significant African American, Latino, Asian, and white populations creating rich cultural neighborhoods. Chinatown offers authentic Asian cuisine and markets. The Fruitvale district is a thriving Latino cultural center. Historically African American neighborhoods like West Oakland maintain cultural significance despite gentrification pressures. This diversity creates vibrant food scenes, cultural festivals, and community events. However, rapid appreciation has raised concerns about displacement and maintaining the city's multicultural character."
  },
  {
    question: "How competitive is the Oakland housing market?",
    answer: "Oakland's market competitiveness varies by neighborhood and price point. Desirable areas like Rockridge, Montclair, and Piedmont Avenue often see multiple offers and bidding wars, especially for well-maintained single-family homes under $1.2M. Up-and-coming neighborhoods may have more negotiating room. Successful buyers typically: get fully pre-approved, work with agents who know Oakland's diverse neighborhoods intimately, act quickly on new listings, and write competitive offers. The market is less frenzied than peak SF but still requires preparation and decisiveness."
  },
  {
    question: "What should I look for when buying in the Oakland Hills?",
    answer: "Oakland Hills properties offer stunning views, larger lots, and relative quiet, but require special considerations. Key concerns include: wildfire risk (2021 Caldecott fire reminder, need for defensible space and insurance), steep driveways and hillside foundations (inspection critical), limited public transit, and microclimate variations (some areas get much more fog). Budget for specialized insurance, potential earthquake retrofitting, and vegetation management. Winding roads can be challenging for emergency access. Despite these factors, Hills homes command premium prices for views and privacy."
  },
  {
    question: "Are there first-time homebuyer programs in Oakland?",
    answer: "Oakland and Alameda County offer several first-time buyer assistance programs. The Oakland Housing Authority provides down payment assistance for qualifying buyers. CalHFA offers state-level programs including down payment assistance and affordable conventional loans. Federal programs include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional 3% down options. The City of Oakland sometimes has affordable housing opportunities through inclusionary zoning requirements. Income limits apply to most programs. Check current availability as funding changes frequently."
  },
  {
    question: "What questions should I ask when buying a home in Oakland?",
    answer: "Essential questions for Oakland home purchases include: 1) What is the foundation type and condition? (many older homes have settling issues), 2) Has the home been seismically retrofitted? 3) What is the sewer lateral condition? (Oakland has inspection requirements), 4) Are there any permit issues or unpermitted work? 5) What school is the home zoned for? 6) What is the neighborhood crime situation? 7) Is the area prone to fog or fire risk? 8) What's included in the sale? 9) Has there been any water damage? Your agent should help investigate each thoroughly."
  },
  {
    question: "How do I choose the right real estate agent in Oakland?",
    answer: "Choose an Oakland agent based on: deep neighborhood knowledge (Oakland's diversity requires local expertise), transaction volume in Oakland specifically (10+ deals per year), understanding of Oakland's unique challenges (permits, schools, crime variation), communication style, references from past clients, and cultural competency. Interview 2-3 agents before deciding. Look for someone who asks about your priorities and honestly discusses neighborhood trade-offs. Oakland's market requires an agent who understands its opportunities and challenges beyond treating it as 'cheaper San Francisco.'"
  }
];

export function OaklandFAQ() {
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
        title="Oakland Real Estate FAQ - Home Buying Guide | Cascade California Realty"
        description="Expert answers to your Oakland real estate questions. Learn about home prices, schools, neighborhoods, and buying in Oakland from a 15+ year Bay Area expert."
        canonical="https://cascaderealtors.com/oakland-faq"
        city="Oakland"
        coordinates={{ lat: 37.8044, lng: -122.2712 }}
      />
      <FAQHeader />
      <FAQHero
        title="Oakland Real Estate FAQ"
        description="Everything you need to know about buying a home in Oakland. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="oakland" />

      <Footer />
    </div>
  );
}
