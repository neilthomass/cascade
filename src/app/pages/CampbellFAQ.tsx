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
  answer: React.ReactNode;
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
      const response = await fetch('https://www.cascaderealtors.com/api/contact', {
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
    question: "What is the average home price in Campbell?",
    answer: <>The median home price in Campbell is approximately $1.8 million as of 2025. Campbell offers a great value proposition in Santa Clara County, with prices typically lower than neighboring Los Gatos while maintaining excellent schools and amenities. Homes range from $1.2 million for smaller properties to $3 million or more for larger estates near downtown or the Los Gatos border. The city's desirable location and strong schools support steady appreciation. For a personalized market analysis based on your specific criteria, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our Campbell specialists</Link>.</>
  },
  {
    question: "Is Campbell a good place to buy a home in 2025?",
    answer: <>Campbell is an excellent choice for homebuyers in 2025. The city combines small-town charm with Silicon Valley convenience, offering walkable downtown streets, excellent schools in the Campbell Union School District, and easy access to major tech employers. Campbell provides better value than neighboring Los Gatos and Saratoga while offering similar quality of life. The strong job market, top-rated schools, and community character make it ideal for long-term appreciation. <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link> to explore available homes in Campbell's most sought-after neighborhoods.</>
  },
  {
    question: "How does Campbell compare to Los Gatos in terms of pricing?",
    answer: <>Campbell homes are typically 20-30% more affordable than comparable properties in Los Gatos, making it an attractive alternative for buyers seeking similar amenities at better prices. While Los Gatos median prices often exceed $2.5 million, Campbell's $1.8 million median provides access to excellent schools, charming downtown areas, and the same Los Gatos-Saratoga school district in some neighborhoods. Many buyers choose Campbell for its value while still enjoying proximity to Los Gatos' amenities. Our team at Cascade California Realty can help you compare properties across both cities - <Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link> to discuss your options.</>
  },
  {
    question: "What makes Campbell's downtown special?",
    answer: <>Campbell's downtown is known for its charming, walkable character with local shops, restaurants, and community events. The historic downtown features tree-lined streets, Victorian-era buildings, and a strong sense of community. Regular events like the Campbell Farmers' Market and the Boogie Music Festival draw residents together. Unlike the chain-dominated shopping areas common in Silicon Valley, Campbell's downtown maintains its small-town character while offering modern conveniences like craft breweries, coffee shops, and diverse dining options. Homes within walking distance of downtown are highly desirable - <Link to="/contact" className="text-blue-600 hover:underline">ask us about current listings</Link> in this area.</>
  },
  {
    question: "What is the Pruneyard Shopping Center?",
    answer: <>The Pruneyard is Campbell's premier shopping, dining, and entertainment destination. This open-air complex features over 100 stores, restaurants, a movie theater, and year-round events. The Pruneyard combines national retailers with local businesses and offers everything from casual dining to upscale restaurants. It's a major community gathering place that hosts concerts, farmers' markets, and seasonal celebrations. The proximity to the Pruneyard is a major selling point for Campbell homes, as it provides walkable access to shopping and entertainment. Looking for homes near this amenity? <Link to="/contact" className="text-blue-600 hover:underline">Let Cascade California Realty show you what's available</Link>.</>
  },
  {
    question: "Tell me about the Los Gatos Creek Trail in Campbell.",
    answer: <>The Los Gatos Creek Trail is a 9.7-mile paved path that runs through Campbell, connecting to neighboring cities. This scenic trail is perfect for walking, jogging, cycling, and enjoying nature while staying in an urban setting. The trail provides access to parks, connects neighborhoods, and offers a safe route for commuters and recreation. Many Campbell homebuyers specifically seek properties near the trail for the outdoor lifestyle it enables. The trail connects to Vasona Lake County Park and extends through multiple cities, making it a regional recreation asset. If trail access is on your wishlist, <Link to="/contact" className="text-blue-600 hover:underline">our agents can identify homes along the route</Link>.</>
  },
  {
    question: "What are Campbell's best neighborhoods for families?",
    answer: <>Top family-friendly neighborhoods in Campbell include the areas near Leigh High School, the Campbell Park neighborhood, and streets near downtown with easy walking access to schools and parks. The Campbell Union School District serves the elementary and middle schools with strong academics and community involvement. Neighborhoods bordering Los Gatos often feed into the highly-rated Los Gatos-Saratoga Union High School District. Look for quiet, tree-lined streets with parks nearby and proximity to the Los Gatos Creek Trail for the best family living experience. <Link to="/contact" className="text-blue-600 hover:underline">Get in touch with Cascade California Realty</Link> for guidance on which neighborhoods align with your family's priorities.</>
  },
  {
    question: "How are the schools in Campbell?",
    answer: <>Campbell is served by the Campbell Union School District for elementary and middle schools, which has several highly-rated schools with strong academic programs and involved parent communities. High school students attend Campbell Union High School District schools, including Westmont High, Branham High, and Prospect High. Some Campbell neighborhoods feed into the prestigious Los Gatos-Saratoga Union High School District. The combination of good public schools and proximity to private school options makes Campbell attractive for families prioritizing education. School boundaries can be complex - <Link to="/contact" className="text-blue-600 hover:underline">contact our team</Link> to ensure you're looking in the right attendance areas.</>
  },
  {
    question: "What is the commute like from Campbell to major tech companies?",
    answer: <>Campbell offers excellent commute access to Silicon Valley employers. Apple, Google, and other major tech companies are typically 15-25 minutes away via Highway 17, 85, or 280. Downtown San Jose is about 10-15 minutes, while the Peninsula (Palo Alto, Mountain View) is 20-30 minutes depending on traffic. The central location makes Campbell ideal for dual-income families working at different companies. VTA light rail access and proximity to highways provide multiple commute options, though most residents drive. We help many tech professionals find the perfect Campbell home - <Link to="/contact" className="text-blue-600 hover:underline">share your commute requirements</Link> and we'll suggest ideal neighborhoods.</>
  },
  {
    question: "What community events happen in Campbell?",
    answer: <>Campbell hosts numerous community events throughout the year. The Campbell Boogie Music Festival is a signature event each June, bringing live music, food, and activities to downtown. The weekly Campbell Farmers' Market runs year-round, offering local produce and community gathering. Other events include the Campbell Christmas Parade, summer concerts in the park, and various festivals at the Pruneyard. The Ainsley House historic property hosts events and tours. This active event calendar creates a strong sense of community that many residents value. It's part of what makes Campbell such a great place to call home - <Link to="/contact" className="text-blue-600 hover:underline">let us help you find your spot</Link> in this welcoming community.</>
  },
  {
    question: "Is Campbell a good investment for real estate?",
    answer: <>Campbell represents strong investment potential in the Bay Area market. The combination of excellent schools, limited housing inventory, strong job market proximity, and community amenities supports long-term appreciation. Properties near downtown, the Pruneyard, or in top school attendance areas tend to appreciate fastest. Campbell's more affordable entry point compared to Los Gatos provides better value with similar appreciation patterns. The city's commitment to maintaining its charm while supporting smart development should continue supporting property values. For strategic investment advice tailored to Campbell, <Link to="/contact" className="text-blue-600 hover:underline">speak with the experts at Cascade California Realty</Link>.</>
  },
  {
    question: "How much do I need to earn to buy a house in Campbell?",
    answer: <>To comfortably afford a median-priced Campbell home ($1.8 million), you typically need a household income of $400,000-$500,000, assuming a 20% down payment and following the 28% debt-to-income guideline. Many Silicon Valley tech workers meet these income requirements through dual incomes or stock compensation. First-time buyers might start with condos or townhomes in the $800,000-$1.2 million range, which require $180,000-$250,000 in household income. Local lenders familiar with tech compensation can help structure loans for buyers with significant equity compensation. <Link to="/contact" className="text-blue-600 hover:underline">Reach out to Cascade California Realty</Link> - we work with trusted lenders who understand complex compensation packages.</>
  },
  {
    question: "What types of homes are available in Campbell?",
    answer: <>Campbell's housing stock includes diverse options: mid-century ranch homes (very common, typically 1,200-1,800 sq ft on 6,000-8,000 sq ft lots), updated contemporary homes, charming Craftsman and Victorian homes near downtown, newer townhomes and condos, and custom estates on larger lots near the Los Gatos border. Many homes were built in the 1950s-1970s and have been updated. The variety allows buyers to find everything from starter condos to luxury estates, though single-family homes on standard lots dominate the market. Whatever style you're looking for, <Link to="/contact" className="text-blue-600 hover:underline">our Campbell specialists</Link> can match you with properties that fit your vision.</>
  },
  {
    question: "What are property taxes like in Campbell?",
    answer: <>Campbell property taxes run approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds and assessments. For a $1.8 million home, expect annual property taxes around $19,800-$21,600. California's Prop 13 caps annual increases at 2% regardless of market appreciation, making long-term ownership increasingly attractive. New buyers are assessed at purchase price. Some neighborhoods have additional Mello-Roos or HOA fees, particularly in newer developments, so always verify total housing costs beyond base taxes. <Link to="/contact" className="text-blue-600 hover:underline">Contact Cascade California Realty</Link> for a complete breakdown of costs for any property you're considering.</>
  },
  {
    question: "Are there parks and recreation facilities in Campbell?",
    answer: <>Campbell offers excellent parks and recreation despite its small size. Campbell Park features sports fields, picnic areas, and community facilities. Los Gatos Creek Trail provides miles of outdoor recreation. The Campbell Community Center offers classes, programs, and activities for all ages. Neighboring parks like Vasona Lake County Park and the Los Gatos Creek County Park are minutes away. The city maintains numerous smaller neighborhood parks throughout residential areas. This combination of local and regional parks provides ample outdoor recreation opportunities for families and active residents. Want to live near green space? <Link to="/contact" className="text-blue-600 hover:underline">Tell us your lifestyle priorities</Link> and we'll find the right neighborhood.</>
  },
  {
    question: "What is the housing market competition like in Campbell?",
    answer: <>Campbell's housing market is competitive but not as intense as neighboring cities. Well-priced homes in desirable neighborhoods near good schools or downtown often receive multiple offers and sell within 1-2 weeks. Homes may sell 5-15% over asking in hot markets, though this varies by price point and condition. Buyers should be pre-approved, act quickly on new listings, and work with agents who know Campbell's micro-markets. The competition is especially strong for updated homes in top school areas, while homes needing work or in less desirable locations may sit longer and offer negotiating room. Having an experienced local agent makes all the difference - <Link to="/contact" className="text-blue-600 hover:underline">partner with Cascade California Realty</Link> for a competitive edge.</>
  },
  {
    question: "What should I know about HOAs and community restrictions in Campbell?",
    answer: <>Most single-family homes in Campbell have no HOA fees, though you'll find HOAs in condo and townhome communities with fees ranging from $300-$600 per month. These fees typically cover exterior maintenance, insurance, common areas, and sometimes amenities like pools. Campbell has city ordinances regarding property maintenance, parking, and development, but fewer restrictions than many newer planned communities. Always review CC&Rs for any property with an HOA. The lack of HOA fees in most single-family neighborhoods is attractive to buyers wanting more freedom and lower monthly costs. Need help navigating HOA documents? <Link to="/contact" className="text-blue-600 hover:underline">Our team can walk you through the details</Link>.</>
  },
  {
    question: "How walkable is Campbell?",
    answer: <>Campbell's walkability varies by neighborhood. Downtown Campbell is highly walkable with shops, restaurants, and services within easy walking distance. Neighborhoods within a half-mile of downtown enjoy excellent walkability to amenities. Most other areas require driving for daily errands, though many neighborhoods have good sidewalk connectivity to schools and parks. The Los Gatos Creek Trail provides walking/biking routes through much of the city. While not as walkable as San Francisco or dense urban areas, Campbell offers better walkability than typical suburban Silicon Valley cities, especially near downtown. If walkability matters to you, <Link to="/contact" className="text-blue-600 hover:underline">let Cascade California Realty guide you</Link> to the most pedestrian-friendly pockets of Campbell.</>
  },
  {
    question: "What makes Campbell different from other Silicon Valley cities?",
    answer: <>Campbell stands out for maintaining small-town character while being centrally located in Silicon Valley. Unlike many neighboring cities dominated by office parks and chain retail, Campbell has a genuine downtown with independent businesses and community events. The city's manageable size (43,342 residents) creates a tight-knit community feel rare in the Bay Area. The combination of good schools, charming neighborhoods, the Pruneyard, and the Los Gatos Creek Trail creates a unique lifestyle. Campbell offers Silicon Valley convenience with more character and better value than many neighboring cities. Ready to discover Campbell for yourself? <Link to="/contact" className="text-blue-600 hover:underline">Schedule a neighborhood tour with Cascade California Realty</Link>.</>
  },
  {
    question: "What questions should I ask when buying a home in Campbell?",
    answer: <>Essential questions for Campbell home purchases include: 1) Which school attendance area is the property in (both elementary and high school)? 2) What is the age and condition of major systems (roof, foundation, HVAC, plumbing)? 3) Has the property had any additions or remodeling, and were permits obtained? 4) What are the average utility costs? 5) Is the property in a flood zone (some areas near Los Gatos Creek)? 6) What is the parking situation and are there any easements? 7) How close is the property to highways (noise considerations near 17/880)? 8) What is included in the sale? A knowledgeable agent should help investigate each thoroughly. <Link to="/contact" className="text-blue-600 hover:underline">Contact Cascade California Realty</Link> and we'll make sure every question gets answered before you make an offer.</>
  }
];

export function CampbellFAQ() {
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
        title="Best Realtor in Campbell | Manoj Thomas - Top Campbell Real Estate Agent 2025"
        description="Looking for the best realtor in Campbell? Manoj Thomas is the #1 rated Campbell real estate agent with 15+ years experience, $1B+ sales. Expert in Campbell homes and downtown."
        canonical="https://cascaderealtors.com/campbell"
        city="Campbell"
        county="Santa Clara County"
        coordinates={{ lat: 37.2872, lng: -121.9500 }}
      />
      <FAQHeader />
      <FAQHero
        title="Campbell Real Estate FAQ"
        description="Everything you need to know about buying a home in Campbell. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="campbell" />

      <Footer />
    </div>
  );
}
