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
    question: "What is the average home price in Orinda?",
    answer: "The median home price in Orinda is approximately $2 million as of 2025. Orinda is known for its premium real estate market, featuring spacious single-family homes on large lots with hillside views. Prices typically range from $1.5 million for smaller homes to $5 million or more for luxury estates with expansive properties. The higher price point reflects Orinda's exceptional schools, safe neighborhoods, and desirable semi-rural character while still being accessible to San Francisco and Oakland."
  },
  {
    question: "Why are Orinda schools so highly rated?",
    answer: "Orinda Union School District consistently ranks among the top school districts in California. The district serves a tight-knit community with strong parental involvement and excellent funding through local measures. Elementary schools like Sleepy Hollow, Wagner Ranch, and Glorietta receive top marks, while Orinda Intermediate School prepares students for highly-rated Miramonte High School. Test scores regularly exceed state averages, and students benefit from robust academic programs, arts education, and athletics. This educational excellence is a primary reason families choose Orinda."
  },
  {
    question: "Is Orinda a good place to raise a family?",
    answer: "Orinda is exceptional for families and is often cited as one of the best family communities in the Bay Area. The city offers award-winning public schools, extremely low crime rates, abundant parks and open spaces, and a genuine small-town atmosphere. The community is highly engaged with excellent youth programs, strong Little League and soccer programs, and family-oriented events at the Orinda Theatre and Community Center. The safe, walkable neighborhoods and nature access provide children with an ideal environment to grow up in."
  },
  {
    question: "How is the commute from Orinda to San Francisco?",
    answer: "Orinda offers excellent commute options to San Francisco despite its suburban setting. The Orinda BART station provides direct service to downtown San Francisco in about 25-30 minutes, making it highly convenient for daily commuters. By car via Highway 24 and the Caldecott Tunnel, the drive typically takes 30-45 minutes depending on traffic. Many residents appreciate the reverse commute to tech jobs in Walnut Creek and the East Bay, which is often just 10-15 minutes. The BART access is a major selling point for professionals who want suburban living with easy city access."
  },
  {
    question: "What is the lifestyle like in Orinda?",
    answer: "Orinda offers a peaceful, semi-rural lifestyle with a strong sense of community. Residents enjoy spacious properties, hillside views, and close proximity to nature trails while still having access to urban amenities. The downtown village features boutique shops, restaurants, and the beloved Orinda Theatre. Life revolves around outdoor activities—hiking in Briones Regional Park, family gatherings at parks, and community events. Despite being only 20 minutes from Oakland, Orinda maintains a quiet, safe atmosphere that feels worlds away from city life."
  },
  {
    question: "What outdoor activities are available in Orinda?",
    answer: "Orinda is a paradise for outdoor enthusiasts with immediate access to world-class hiking and biking. Briones Regional Park offers over 6,000 acres of trails with stunning views, while Tilden Regional Park is minutes away with hiking, a botanic garden, and Lake Anza. The Lafayette-Moraga Regional Trail is perfect for cycling and running. Many homes back directly onto open space, providing private trail access. The mild climate allows year-round outdoor recreation, and the community embraces an active, nature-oriented lifestyle."
  },
  {
    question: "Does Orinda have good shopping and dining?",
    answer: "While Orinda maintains a small-town character, it offers quality shopping and dining options. The Orinda Village features local restaurants, cafes, and specialty shops with a charming walkable atmosphere. Theatre Square and the areas around BART have additional retail and services. For larger shopping needs, Lafayette's downtown is 5 minutes away, and Walnut Creek's extensive retail district is 15 minutes away. Many residents appreciate the quieter local scene while having easy access to major shopping when needed."
  },
  {
    question: "What are property taxes like in Orinda?",
    answer: "Orinda property taxes are approximately 1.2-1.3% of assessed value annually, which includes the base 1% Proposition 13 rate plus Contra Costa County assessments and local school bonds. For a $2 million home, expect annual property taxes around $24,000-$26,000. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year, making long-term ownership predictable. The higher taxes support the exceptional school system and city services that make Orinda so desirable."
  },
  {
    question: "Is Orinda a safe place to live?",
    answer: "Orinda is one of the safest cities in the Bay Area with extremely low crime rates. Property crime and violent crime are both well below state and national averages. The combination of an engaged community, responsive police services, and the residential nature of the area contributes to the safety. Many neighborhoods have active homeowner associations and community watch programs. The hillside geography and limited through-traffic also enhance security. Safety is consistently cited as a top reason families choose Orinda."
  },
  {
    question: "What types of homes are available in Orinda?",
    answer: "Orinda real estate consists primarily of single-family homes on substantial lots, typically ranging from 0.25 to 2+ acres. Architectural styles include California ranch homes, mid-century modern, Mediterranean villas, and custom contemporary designs. Many homes feature hillside locations with expansive views of Mount Diablo, the hills, or wooded settings. Properties often include mature landscaping, pools, and outdoor entertaining spaces. There are few condos or townhomes—Orinda is predominantly a single-family home market appealing to families seeking space and privacy."
  },
  {
    question: "How is the Orinda real estate market performing?",
    answer: "Orinda's real estate market remains strong and stable, driven by consistent demand from families prioritizing top schools and quality of life. The market is less volatile than San Francisco, with steady appreciation over time. Inventory is typically limited, as many residents stay long-term once they find their ideal home. Well-priced homes in good condition often receive multiple offers, especially during spring and summer when families want to move before the school year. The $2 million median reflects the premium nature of the community."
  },
  {
    question: "What should I know about Orinda's fire risk?",
    answer: "Like many Bay Area hillside communities, Orinda is in a wildfire risk area and has experienced devastating fires in the past. The city has implemented rigorous fire safety measures including vegetation management requirements, home hardening standards, and evacuation planning. Homeowners should budget for defensible space maintenance and consider fire-resistant landscaping. Many homes have been retrofitted with fire-resistant materials. Insurance can be more expensive and harder to obtain—work with an insurance specialist familiar with California's FAIR Plan if needed. The risk is manageable with proper preparation."
  },
  {
    question: "Are there HOA fees in Orinda?",
    answer: "Most single-family homes in Orinda do not have HOA fees, which is one of the community's appeals—you have freedom over your property. Some planned developments and neighborhoods may have modest HOA fees ($100-$300/month) for shared amenities like tennis courts, pools, or private roads. Always review HOA documents before purchasing to understand any restrictions or fees. The lack of HOA fees in most areas means you have greater control over landscaping, exterior modifications, and property use."
  },
  {
    question: "What is the Orinda Theatre and why is it special?",
    answer: "The historic Orinda Theatre, built in 1941, is the heart of the community and a beloved local landmark. This Art Deco movie palace features classic architecture, a beautiful marquee, and a warm community atmosphere. The theatre shows first-run films and hosts special events, providing family entertainment and a gathering place. The annual Comedy Day and other events bring the community together. For many residents, the Theatre represents Orinda's village charm and tight-knit community spirit—it's not just a cinema but a social institution."
  },
  {
    question: "How does Orinda compare to neighboring Lafayette and Moraga?",
    answer: "Orinda, Lafayette, and Moraga form the highly desirable Lamorinda region, each with distinct character. Orinda is the most residential and hillside-focused with the most premium pricing and top-rated schools. Lafayette has a more vibrant downtown with shopping and dining, slightly lower prices, and excellent schools through the Acalanes Union High School District. Moraga offers a similar suburban feel to Orinda with slightly more affordable options. All three share excellent schools, BART access, and family-friendly environments. Orinda stands out for its peaceful, nature-oriented lifestyle and school quality."
  },
  {
    question: "Is Orinda a good investment for real estate?",
    answer: "Orinda is an excellent long-term real estate investment for several reasons: consistently strong demand from families, limited housing supply due to hillside geography and zoning, exceptional schools that maintain desirability, and proximity to employment centers via BART. Properties appreciate steadily, though not as dramatically as San Francisco. The investment case is strongest if you plan to hold 7+ years and can benefit from Prop 13 tax protections. Rental demand is solid from families relocating to the area. The quality of life and school system ensure ongoing appeal."
  },
  {
    question: "What is the weather like in Orinda?",
    answer: "Orinda enjoys a Mediterranean climate with warm, dry summers and mild, wet winters. Summer temperatures typically range from 75-90°F, though hillside locations can be warmer. Winters are cool (45-60°F) with most rainfall occurring December through March. Orinda gets more sun and less fog than San Francisco but more than inland areas like Walnut Creek. The climate is ideal for outdoor activities year-round and supports beautiful landscaping. Expect about 25 inches of rain annually, mostly concentrated in winter months."
  },
  {
    question: "What are the best neighborhoods in Orinda?",
    answer: "Orinda's most sought-after neighborhoods include Sleepy Hollow (prestigious homes, top elementary school, pool and tennis club), Orindawoods (private community, security gate, resort-style amenities), Miner Road area (large estates, privacy, views), and the Village area (walkability to downtown and BART). Each neighborhood has distinct character—some feature mid-century homes, others contemporary estates. All benefit from excellent schools and low crime. Choice often comes down to lot size preferences, view orientation, and proximity to schools or BART."
  },
  {
    question: "How is public transportation in Orinda?",
    answer: "Orinda's primary public transportation is the Orinda BART station, providing direct rail service to San Francisco, Oakland, and the East Bay. County Connection buses serve local routes and connect to neighboring communities. However, Orinda is primarily car-dependent for daily errands and activities—most residents rely on personal vehicles. The BART access is the major transit advantage, allowing residents to commute car-free to urban employment centers while enjoying suburban living. Plan on owning a car for local transportation."
  },
  {
    question: "What should I look for when buying a home in Orinda?",
    answer: "When buying in Orinda, key considerations include: hillside stability and drainage (many homes are on slopes), sewer lateral condition (older systems may need replacement), fire safety features and defensible space, HVAC systems (many older homes lack AC), foundation condition on hillside lots, roof condition and age, and school attendance boundaries if that's important. Get comprehensive inspections including geological review for hillside properties. Understand fire insurance requirements and costs. Review any CC&Rs or HOA rules. Work with an agent experienced in Orinda's unique hillside real estate market."
  }
];

export function OrindaFAQ() {
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
            Orinda Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Orinda. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="orinda" />

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
