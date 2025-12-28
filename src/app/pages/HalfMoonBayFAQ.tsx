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
    question: "What is the average home price in Half Moon Bay?",
    answer: "The median home price in Half Moon Bay is approximately $1.9 million as of 2024. This coastal San Mateo County community offers a unique combination of oceanfront properties, agricultural land, and traditional single-family homes. Prices vary significantly based on ocean views, with beachfront properties commanding premium prices often exceeding $3 million, while inland homes start around $1.2 million. The limited housing supply and strict coastal development regulations help maintain strong property values."
  },
  {
    question: "Is Half Moon Bay a good place to buy a home in 2025?",
    answer: "Half Moon Bay offers compelling value for buyers seeking coastal living with a small-town atmosphere. The city's strict growth controls limit new development, creating scarcity that supports long-term appreciation. Key advantages include pristine beaches, agricultural heritage, and a tight-knit community feel just 30 miles from San Francisco. However, buyers should consider the commute factor (45-60 minutes to SF via Highway 92) and occasional fog. For those prioritizing quality of life over urban convenience, Half Moon Bay remains an excellent investment."
  },
  {
    question: "What are the best neighborhoods in Half Moon Bay for families?",
    answer: "Top family-friendly areas in Half Moon Bay include Miramar (beach access, community atmosphere), Princeton-by-the-Sea (harbor views, excellent schools nearby), and the Highlands area (newer homes, more sunny days). The downtown Main Street area offers walkability to shops and restaurants. Families appreciate the Cabrillo Unified School District, low crime rates, and abundance of outdoor activities. El Granada and Moss Beach, just north of Half Moon Bay, offer similar small-town charm with slightly more affordable options."
  },
  {
    question: "How much do I need to earn to buy a house in Half Moon Bay?",
    answer: "To comfortably afford a median-priced home in Half Moon Bay ($1.9M), you typically need a household income of $425,000-$550,000, assuming a 20% down payment ($380,000) and following the 28% debt-to-income guideline. Many buyers are Silicon Valley professionals, remote workers, or retirees downsizing from the Peninsula. The high entry price reflects the coastal premium and limited inventory. Some buyers offset costs through vacation rentals, though local regulations restrict short-term rentals in many areas."
  },
  {
    question: "What is the commute like from Half Moon Bay to San Francisco and Silicon Valley?",
    answer: "The commute from Half Moon Bay requires careful consideration. To San Francisco, expect 45-60 minutes via Highway 92 to Highway 280 or Highway 1 north, depending on traffic and weather. Silicon Valley commutes run 30-50 minutes to Palo Alto or Mountain View. Highway 92 crosses the Santa Cruz Mountains and can be affected by fog, accidents, or landslides. Many residents work remotely, have flexible schedules, or commute 2-3 days per week. The scenic drive offers a mental transition between work and coastal living."
  },
  {
    question: "What are the property taxes in Half Moon Bay?",
    answer: "Half Moon Bay property taxes are approximately 1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local bonds and assessments for schools and services. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year regardless of market appreciation. A home purchased for $1.9M would have annual taxes around $22,800. San Mateo County has relatively efficient tax collection and good public services, making the rate competitive for coastal California."
  },
  {
    question: "Are there any restrictions on building or renovating in Half Moon Bay?",
    answer: "Yes, Half Moon Bay has significant development restrictions due to coastal zone regulations. Any construction near the coast requires Coastal Commission approval, which can be a lengthy process. The city emphasizes preserving agricultural land, ocean views, and small-town character. Setback requirements, height limits (usually 28 feet), and design review are standard. Historic properties have additional constraints. Budget extra time and costs for permits compared to inland communities. Working with architects and contractors experienced in coastal permitting is essential."
  },
  {
    question: "What is the weather like in Half Moon Bay?",
    answer: "Half Moon Bay has a distinct microclimate characterized by cool, foggy summers and mild, clearer winters—the opposite of most Bay Area communities. Summer temperatures typically range from 55-65°F with frequent morning fog that burns off by afternoon, though some days remain overcast. Winter brings clearer skies and temperatures from 45-60°F. Areas east of Highway 1 and in the Highlands get more sun. The consistent cool weather appeals to those who dislike heat but can feel chilly for sun-seekers. Layered clothing is essential year-round."
  },
  {
    question: "What are the schools like in Half Moon Bay?",
    answer: "Half Moon Bay is served by the Cabrillo Unified School District, which includes Cunha Intermediate School and Half Moon Bay High School. Elementary schools include Hatch Elementary and Farallone View Elementary. The district offers small class sizes and strong community involvement. Test scores are generally above state averages, though not as high as some Peninsula districts. The community values outdoor education, with programs emphasizing environmental science and ocean studies. Many families also consider private schools in nearby areas for additional options."
  },
  {
    question: "What outdoor activities are available in Half Moon Bay?",
    answer: "Half Moon Bay offers exceptional outdoor recreation. Beaches include Half Moon Bay State Beach, Mavericks (famous for big-wave surfing), and Pescadero beaches to the south. The Coastal Trail provides miles of scenic walking and biking. The area is renowned for horseback riding, with multiple stables and trail systems. Popular activities include surfing, kayaking, fishing from Pillar Point Harbor, and exploring tide pools. Nearby Purisima Creek Redwoods offers hiking in old-growth forests. The moderate year-round temperatures make outdoor activities accessible in all seasons."
  },
  {
    question: "How is the local economy and job market in Half Moon Bay?",
    answer: "Half Moon Bay's local economy centers on agriculture (pumpkin farms, flower nurseries, Christmas tree farms), tourism (restaurants, hotels, shops), and fishing (Pillar Point Harbor). The famous Half Moon Bay Pumpkin Festival attracts hundreds of thousands annually. However, most residents commute to San Francisco, Peninsula, or Silicon Valley for professional employment. The rise of remote work has increased the population of tech workers and professionals. Local retail and service jobs exist but typically at lower wages than the Peninsula. The economy is stable but not a major employment center."
  },
  {
    question: "What is the investment potential for Half Moon Bay real estate?",
    answer: "Half Moon Bay real estate offers strong long-term investment potential due to limited supply, coastal location, and proximity to major employment centers. Historical appreciation has tracked or exceeded Bay Area averages. Key investment advantages include strict growth controls (preventing oversupply), increasing demand for coastal lifestyle properties, and the shift to remote work making location-dependent commuting less critical. Risks include commute times if remote work reverses, climate change impacts on coastal properties, and higher maintenance costs in the marine environment. 10+ year holds typically show strong returns."
  },
  {
    question: "Are there agricultural properties available in Half Moon Bay?",
    answer: "Yes, Half Moon Bay retains significant agricultural heritage with farms, nurseries, and equestrian properties available, though they're increasingly rare and expensive. Properties with agricultural zoning or coastal side designations offer unique opportunities but come with restrictions on development. Many farms grow pumpkins, Christmas trees, flowers, or artichokes. Agricultural properties typically require larger down payments (25-30%) and specialized lenders. Buyers should understand water rights, land use restrictions, and the economics of farming. Some properties allow residential use with agricultural operations, offering a unique coastal farming lifestyle."
  },
  {
    question: "What are the HOA fees and costs in Half Moon Bay developments?",
    answer: "Half Moon Bay has limited HOA communities compared to suburban areas, as much of the housing stock consists of single-family homes without associations. Where HOAs exist (primarily newer developments and townhome complexes), fees typically range from $200-$600 per month covering common area maintenance, landscaping, and sometimes water. Beachfront condo complexes may have higher fees ($500-$1,000+) due to coastal maintenance requirements. Always review HOA financials for adequate reserves and any special assessments, particularly for communities with coastal exposure requiring ongoing erosion mitigation."
  },
  {
    question: "How does the coastal location affect home maintenance in Half Moon Bay?",
    answer: "Coastal living in Half Moon Bay requires additional maintenance awareness. Salt air accelerates corrosion of metal fixtures, requiring regular inspection and replacement. Exterior paint needs more frequent attention, and wood siding requires proper sealing. Windows and doors need quality weatherstripping due to wind and moisture. Landscaping must account for salt tolerance and deer resistance. Roof maintenance is critical given winter rains. Budget 1.5-2% of home value annually for maintenance versus 1% inland. Despite higher costs, proper maintenance preserves value in this sought-after coastal market."
  },
  {
    question: "What is the housing inventory situation in Half Moon Bay?",
    answer: "Half Moon Bay has extremely limited housing inventory due to geographic constraints (ocean to the west, mountains to the east) and strict coastal development regulations. Typically only 20-40 homes are on the market at any time, creating a competitive environment. New construction is rare and highly regulated. This scarcity supports price appreciation but means buyers need patience and flexibility. Properties often sell quickly when priced correctly. The limited inventory also means less diversity in home styles and price points compared to larger markets. Working with an agent who knows the local market is essential."
  },
  {
    question: "Are there any concerns about coastal erosion or sea level rise in Half Moon Bay?",
    answer: "Coastal erosion and sea level rise are important considerations for Half Moon Bay properties, particularly those near the ocean. Some areas have experienced bluff erosion, and long-term projections show increased risks from rising seas and storm intensity. Properties closest to the water may have disclosure requirements about coastal hazards. Buyers should review geological reports, obtain specialized coastal property inspections, and understand setback requirements. Not all properties are equally affected—elevated homes on stable ground face less risk than bluff-top or low-lying properties. Insurance costs and availability can be affected for high-risk properties."
  },
  {
    question: "What makes Half Moon Bay different from other coastal California towns?",
    answer: "Half Moon Bay stands out for maintaining authentic small-town character despite proximity to major tech centers. Unlike heavily developed coastal areas, it has preserved agricultural land, local businesses, and community traditions like the Pumpkin Festival. The population of about 12,500 creates a genuine community feel where locals know each other. Compared to Santa Cruz (more urban) or Carmel (more touristy), Half Moon Bay offers working farms alongside coastal living. The community actively resists over-development, prioritizing quality of life over growth. This authenticity increasingly rare in the Bay Area makes Half Moon Bay uniquely appealing."
  },
  {
    question: "What should I know about insurance for Half Moon Bay homes?",
    answer: "Insurance for Half Moon Bay properties requires special attention. Standard homeowner's insurance doesn't cover earthquake damage, and separate earthquake insurance is highly recommended given the proximity to the San Andreas Fault. Coastal properties may face higher premiums and deductibles due to wind and water exposure. Flood insurance may be required for properties in FEMA flood zones. Some carriers have limited availability for coastal properties due to wildfire or landslide risks in nearby mountain areas. Shop multiple insurers and consider working with an insurance broker experienced in coastal properties to find comprehensive coverage at competitive rates."
  },
  {
    question: "How do I choose the right real estate agent for Half Moon Bay?",
    answer: "Choosing a Half Moon Bay real estate agent requires finding someone with deep local expertise. Look for agents who live in or specialize in the Coastside communities, understand coastal permitting and restrictions, and have closed multiple transactions in Half Moon Bay specifically. They should know the microclimates, school attendance boundaries, water and septic issues common to the area, and the tight-knit community dynamics. Interview agents about their experience with coastal properties, agricultural land, and working with the Coastal Commission. References from recent buyers in Half Moon Bay are invaluable. The right agent makes navigating this unique market significantly easier."
  }
];

export function HalfMoonBayFAQ() {
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
            Half Moon Bay Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Half Moon Bay. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="half-moon-bay" />

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
