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
    question: "What is the average home price in Foster City?",
    answer: "The median home price in Foster City is approximately $1.9 million as of 2025. This planned community offers exceptional waterfront living on the San Francisco Bay, with many homes featuring lagoon access and stunning water views. Prices vary by location and water frontage—lagoon-front properties and homes with private docks command premium prices, while properties farther from the water are more moderately priced. The city's limited inventory and desirable location contribute to strong long-term appreciation."
  },
  {
    question: "What makes Foster City's lagoon system unique?",
    answer: "Foster City is built around a remarkable 200-acre network of interconnected lagoons that make it one of the most distinctive communities in the Bay Area. Many homes have direct lagoon access with private docks for kayaking, paddleboarding, and small boats. The lagoon system connects to the San Francisco Bay, offering residents unique waterfront living. Regular lagoon maintenance is managed by the city through special assessments, ensuring clean water and well-maintained channels. This engineered water system is central to the city's identity and lifestyle."
  },
  {
    question: "Is Foster City a safe place to live?",
    answer: "Foster City consistently ranks as one of the safest cities in California and the entire United States. The city has extremely low crime rates, well below state and national averages. Its planned community design with controlled access points, active neighborhood watch programs, well-lit streets, and responsive police services contribute to the exceptional safety. Many families choose Foster City specifically for its reputation as a secure environment to raise children. The city's island-like geography with limited entry points also enhances security."
  },
  {
    question: "What are the best schools in Foster City?",
    answer: "Foster City is served by the San Mateo-Foster City School District, which includes several highly-rated schools. Foster City Elementary and Brewer Island Elementary are popular elementary schools with strong academic programs. Bowditch Middle School serves the area and is known for quality education. Many families also consider the nearby Audubon Elementary. For high school, students attend San Mateo High School. Additionally, numerous private school options are available in nearby San Mateo and on the Peninsula. The schools benefit from strong community support and active parent involvement."
  },
  {
    question: "What are the HOA fees like in Foster City?",
    answer: "HOA fees in Foster City vary significantly depending on the property type and community. Single-family homes in lagoon communities typically have HOA fees ranging from $200-$600 per month, covering lagoon maintenance, common area upkeep, and amenities. Condominiums and townhomes generally have higher fees, ranging from $500-$1,000+ per month, which may include water, garbage, exterior maintenance, insurance, and building reserves. Properties with direct lagoon access and private docks often have additional assessments for waterway maintenance. Always review HOA financials and upcoming capital projects before purchasing."
  },
  {
    question: "Can I dock a boat at my Foster City home?",
    answer: "Many Foster City homes on the lagoon system include private dock access, allowing residents to keep small boats, kayaks, and paddleboards. Dock permits and size restrictions are regulated by the city. The lagoons accommodate boats up to certain size limits (typically small motorboats and sailboats), and the channels connect to the San Francisco Bay through controlled openings. Some homeowners associations have additional restrictions on boat types and sizes. Not all homes have lagoon access—waterfront properties command premium prices. If boating is important to you, ensure the property includes deeded dock rights."
  },
  {
    question: "Is Foster City a good investment for real estate in 2025?",
    answer: "Foster City represents a strong real estate investment for several reasons: limited housing inventory due to its fully-developed status, proximity to major tech employers in Silicon Valley and San Francisco, exceptional schools and safety that attract families, unique waterfront lifestyle that commands premium prices, and strong long-term appreciation history. The city's population of about 34,500 creates a tight-knit community feel while maintaining access to urban amenities. As a planned community with high quality of life, Foster City properties typically hold value well even during market corrections."
  },
  {
    question: "What is it like to live in a planned community like Foster City?",
    answer: "Foster City was meticulously designed in the 1960s as a master-planned community on reclaimed land. This planning is evident in the city's organized layout, extensive parks and recreational facilities, integrated lagoon system, wide bike paths and pedestrian-friendly streets, and cohesive architectural standards. Residents benefit from well-maintained public spaces, numerous parks and playgrounds, excellent city services, and a strong sense of community. The planned design means consistent neighborhood aesthetics and ample green spaces. However, some HOAs have strict rules about home modifications and landscaping to maintain the community's appearance."
  },
  {
    question: "What water activities are available in Foster City?",
    answer: "Foster City's lagoon system offers exceptional water recreation right from your backyard. Popular activities include kayaking and paddleboarding through the peaceful lagoons, small boat sailing (subject to size restrictions), windsurfing in the Bay, fishing from docks and lagoon shores, and stand-up paddleboarding. The city also has the Leo J. Ryan Park along the Bay with a public boat launch, windsurfing area, and beach access. Several parks feature lagoon access for non-waterfront residents. The mild climate allows year-round water activities, though summer offers the best conditions."
  },
  {
    question: "How is the commute from Foster City to San Francisco and Silicon Valley?",
    answer: "Foster City's central Peninsula location offers convenient access to major employment centers. To San Francisco (18 miles): 30-45 minutes via Highway 101 or US-92 to I-280, or use Caltrain from nearby San Mateo station. To Palo Alto/Stanford (15 miles): 20-30 minutes via Highway 101. To San Jose (30 miles): 35-50 minutes via Highway 101. The city is near SFO Airport (10 minutes), making business travel convenient. Traffic varies by time—morning commutes north and evening commutes south are heaviest. Many tech workers choose Foster City for its proximity to both San Francisco and Silicon Valley offices."
  },
  {
    question: "What are the property taxes in Foster City?",
    answer: "Foster City property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% California Proposition 13 rate plus local assessments and bonds. For a $1.9 million home, annual property taxes would be approximately $21,000-$23,000. Thanks to Prop 13, your assessed value can only increase 2% per year maximum, regardless of market appreciation, providing long-term tax predictability. New buyers are assessed at purchase price. Additional assessments may apply for specific services like lagoon maintenance. San Mateo County handles tax collection and assessments."
  },
  {
    question: "Are there parks and recreational facilities in Foster City?",
    answer: "Foster City offers exceptional recreational amenities for a city of its size. Major facilities include: Leo J. Ryan Park with Bay access, beach, and windsurfing area; multiple neighborhood parks throughout the city; extensive bike paths and walking trails connecting the entire community; Foster City Recreation Center with programs for all ages; Sea Cloud Park and Marlin Cove with lagoon access; numerous tot lots and playgrounds; and the Bay Trail for cycling and walking. The city's flat terrain and 20+ miles of bike paths make it ideal for families. Most neighborhoods are within walking distance of parks."
  },
  {
    question: "What should first-time buyers know about buying in Foster City?",
    answer: "First-time buyers considering Foster City should understand several key factors: The $1.9 million median price requires significant income (typically $400,000+ household income for comfortable affordability). HOA fees add to monthly housing costs beyond mortgage and taxes. Lagoon-front properties cost more but offer unique lifestyle benefits. The planned community has rules and regulations that preserve property values but limit exterior modifications. Proximity to jobs, schools, and amenities creates strong demand and limited inventory. Consider properties farther from lagoons for more affordable entry points. The city's safety and schools make it ideal for families willing to invest in quality of life."
  },
  {
    question: "How does Foster City handle flooding and sea level rise concerns?",
    answer: "Foster City was built on engineered fill in the 1960s and has comprehensive flood protection systems. The city maintains an extensive levee system that protects against Bay flooding, storm surge barriers, a sophisticated pump system to manage water levels, and regular levee maintenance and upgrades. While built at sea level, the city has invested heavily in infrastructure to address climate change concerns. Recent studies and improvements have enhanced the levee system. Flood insurance is typically required for properties in certain zones. The city actively monitors and plans for sea level rise, implementing adaptive strategies to ensure long-term safety."
  },
  {
    question: "What is the demographic makeup and community feel of Foster City?",
    answer: "Foster City has a population of approximately 34,500 and is known for its diverse, family-oriented community. The city has a significant Asian-American population (particularly Chinese and Indian families) alongside diverse residents from around the world, creating a multicultural environment. The demographics skew toward educated professionals working in tech and other industries, families with school-age children, and some retirees enjoying the peaceful lifestyle. The community is politically engaged, values education highly, and maintains a suburban, family-friendly atmosphere with community events, farmers markets, and neighborhood gatherings."
  },
  {
    question: "What are the differences between Foster City neighborhoods?",
    answer: "Foster City neighborhoods vary primarily by proximity to lagoons and development era. Lagoon-front communities like The Cove, Bounty Bay, and Marlin Cove offer direct water access and higher prices. Interior neighborhoods provide more affordable options while still benefiting from city amenities. The northern section near Highway 92 has easy freeway access. The southern areas are quieter and more residential. Older homes from the 1960s-70s may need updates but often have larger lots, while newer developments offer modern amenities and contemporary designs. Each neighborhood maintains the planned community aesthetic with parks, paths, and well-maintained common areas."
  },
  {
    question: "What is the process for buying a waterfront home in Foster City?",
    answer: "Buying a lagoon-front property in Foster City requires additional considerations beyond typical home purchases: Verify deeded dock rights and lagoon access in title documents; review HOA rules regarding boats, dock modifications, and waterway usage; inspect dock condition and understand maintenance responsibilities; check for special assessments related to lagoon maintenance; understand city permits required for dock improvements; review levee and flood protection for waterfront areas; consider flood insurance requirements and costs; and inspect bulkhead and seawall conditions. Work with a realtor experienced in Foster City waterfront properties who understands the unique aspects of lagoon living."
  },
  {
    question: "Are there shopping and dining options in Foster City?",
    answer: "Foster City offers convenient shopping and dining despite its residential character. The Metro Center on Chess Drive features grocery stores, restaurants, services, and retail shops. Numerous dining options range from casual to upscale, with strong representation of Asian cuisines reflecting the community's diversity. However, many residents also frequent nearby San Mateo (5 minutes away) with its vibrant downtown, Hillsdale Shopping Center, and extensive restaurant scene. The location provides easy access to Stanford Shopping Center, downtown Palo Alto, and San Francisco for major shopping. The city prioritizes maintaining its residential character while providing essential services."
  },
  {
    question: "How walkable and bike-friendly is Foster City?",
    answer: "Foster City is exceptionally pedestrian and bicycle-friendly thanks to its planned design. The city features over 20 miles of dedicated bike paths separated from vehicle traffic, wide sidewalks throughout residential areas, numerous pedestrian bridges over lagoons, flat terrain ideal for cycling and walking, and safe routes to schools allowing children to bike independently. Many residents bike to parks, shopping, and schools. The Bay Trail runs through the city, connecting to regional trail networks. While a car is still useful for commuting and major shopping, daily errands and recreation can often be accomplished on foot or by bike."
  },
  {
    question: "What should I know about homeowners insurance in Foster City?",
    answer: "Homeowners insurance in Foster City has unique considerations due to the city's waterfront location and geography. Standard policies typically cost more than inland areas due to proximity to water and flood risk. Flood insurance is often required for properties in FEMA flood zones, adding $500-$2,000+ annually depending on elevation and coverage. Earthquake insurance is recommended but optional, costing $1,500-$3,000+ for a $1.9M home. Lagoon-front properties may have additional requirements for dock coverage. Work with insurers experienced in waterfront properties to ensure adequate coverage for your specific situation and understand all required policies before closing."
  }
];

export function FosterCityFAQ() {
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
            Foster City Real Estate FAQ
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Everything you need to know about buying a home in Foster City. Expert answers from a Bay Area real estate professional with 15+ years of experience.
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
      <RelatedCities currentCity="foster-city" />

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
