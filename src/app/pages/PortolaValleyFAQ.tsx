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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Explore Portola Valley?</h2>
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
    question: "What is the average home price in Portola Valley?",
    answer: "The median home price in Portola Valley is approximately $4.8 million, making it one of the most exclusive communities in the Bay Area. Prices typically range from $3 million for smaller estates to well over $10 million for premium properties with extensive acreage. The high values reflect the town's rural luxury character, large lot sizes (many 1-5 acres), award-winning schools, and proximity to both Stanford University and Silicon Valley tech hubs."
  },
  {
    question: "Why are homes in Portola Valley so expensive?",
    answer: "Portola Valley's premium pricing reflects several unique factors: extremely limited housing inventory (population under 5,000), large lot sizes averaging 1-2 acres, rural character with strict development restrictions, top-rated Portola Valley School District, proximity to Stanford and major tech companies, extensive open space and trail access, and a highly educated, affluent community. The town's commitment to preserving its natural beauty and rural atmosphere creates scarcity that drives prices."
  },
  {
    question: "What is it like to live in Portola Valley?",
    answer: "Portola Valley offers a unique blend of rural tranquility and Silicon Valley convenience. Residents enjoy a peaceful, semi-rural lifestyle with large properties, mature trees, hiking trails, and equestrian facilities, yet are just minutes from Stanford, downtown Palo Alto, and Highway 280. The tight-knit community of about 4,500 people values privacy, nature, and outdoor recreation. Homes are set back from winding roads, and there are no sidewalks or streetlights, preserving the natural character. It's ideal for those who want space, privacy, and nature while maintaining easy access to world-class amenities and employment centers."
  },
  {
    question: "What are the schools like in Portola Valley?",
    answer: "Portola Valley is served by the highly-regarded Portola Valley School District, which consistently ranks among the top elementary school districts in California. The district includes Ormondale Elementary (K-4) and Corte Madera Elementary (5-8), both known for academic excellence, small class sizes, and strong parent involvement. For high school, most students attend Woodside High School or choose private options like Menlo School, Sacred Heart, or Castilleja. The combination of excellent public elementary/middle schools and proximity to elite private schools makes Portola Valley extremely attractive to families."
  },
  {
    question: "Is Portola Valley a good investment?",
    answer: "Portola Valley has historically been an excellent long-term real estate investment due to extreme supply constraints, proximity to wealth-generating tech industry, top schools, and quality-of-life factors that attract high-net-worth buyers. The town's strict zoning, large minimum lot sizes, and limited developable land ensure continued scarcity. Property values have appreciated consistently over decades, though the luxury market can experience more volatility than lower price points. Best suited for buyers with 10+ year horizons who value the lifestyle in addition to investment returns."
  },
  {
    question: "What outdoor activities are available in Portola Valley?",
    answer: "Portola Valley is an outdoor enthusiast's paradise. Residents have direct access to extensive trail networks including Windy Hill Open Space Preserve, Coal Creek Open Space Preserve, and hundreds of miles of trails in the nearby Santa Cruz Mountains. Popular activities include hiking, mountain biking, horseback riding (many properties have equestrian facilities), and trail running. The town also has parks, tennis courts, and easy access to Alpine Road for cycling. The climate allows year-round outdoor recreation, and the natural beauty rivals much more remote locations while being 5 minutes from Stanford."
  },
  {
    question: "How far is Portola Valley from San Francisco and Silicon Valley?",
    answer: "Portola Valley offers exceptional access to major employment and cultural centers. It's approximately 10 minutes to Stanford University and downtown Palo Alto, 15-20 minutes to major tech campuses like Google and Facebook, 30-35 minutes to San Francisco Airport, and 35-45 minutes to downtown San Francisco (traffic dependent). Highway 280 provides scenic commute routes north to SF and south to the Peninsula. This combination of rural seclusion and proximity to economic centers is a key driver of Portola Valley's appeal and value."
  },
  {
    question: "What is the lot size for homes in Portola Valley?",
    answer: "Portola Valley is known for exceptionally large lots compared to neighboring communities. Typical residential lots range from 1 to 5 acres, with many properties exceeding 5 acres. The town has strict minimum lot size requirements (often 1-2 acres depending on zone) that preserve the rural character. Large parcels allow for privacy, gardens, equestrian facilities, guest houses, and extensive landscaping. This spaciousness is increasingly rare on the Peninsula and contributes significantly to property values and quality of life."
  },
  {
    question: "Can you have horses in Portola Valley?",
    answer: "Yes, Portola Valley is one of the premier equestrian communities in the Bay Area. Many properties include stables, paddocks, arenas, and direct trail access. The town has a strong equestrian culture with riding trails throughout and connections to thousands of acres of open space preserves. Zoning allows for horse-keeping on appropriately-sized lots, and there are local boarding facilities and riding clubs. For horse enthusiasts who also need proximity to Silicon Valley employment, Portola Valley is virtually unmatched."
  },
  {
    question: "What are property taxes in Portola Valley?",
    answer: "Portola Valley property taxes are approximately 1.1-1.2% of assessed value annually, which includes the base 1% Proposition 13 rate plus local assessments and bonds for schools and services. For a median home valued at $4.8 million, annual property taxes would be approximately $53,000-$58,000. Thanks to Prop 13, your assessed value can only increase by a maximum of 2% per year, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price, so it's important to factor taxes into your total housing cost."
  },
  {
    question: "Is Portola Valley incorporated or part of another city?",
    answer: "Portola Valley is an incorporated town in San Mateo County, established in 1964. It has its own town government, planning commission, and strictly enforced zoning regulations that preserve its rural character. This local control has been essential in maintaining the community's unique character, preventing overdevelopment, and ensuring high-quality services while keeping the town small and exclusive. The incorporation gives residents significant voice in land use and development decisions."
  },
  {
    question: "What types of homes are available in Portola Valley?",
    answer: "Portola Valley homes are predominantly single-family estates on large lots. Architectural styles range from mid-century modern to Mediterranean, contemporary, traditional ranch, and craftsman. Many properties feature luxury amenities including pools, tennis courts, wine cellars, home theaters, and guest houses. Older homes from the 1950s-1970s often present opportunities for renovation or rebuilding. New construction and extensively remodeled homes command premium prices. There are no condos or townhomes—only single-family residences, which maintains the exclusive, low-density character."
  },
  {
    question: "How competitive is the Portola Valley housing market?",
    answer: "The Portola Valley market is highly competitive but with different dynamics than more urban areas. Inventory is extremely limited (often only 5-15 active listings), so desirable properties attract significant interest from well-qualified buyers. However, the ultra-luxury price point means a smaller buyer pool. Sales can happen quickly for well-priced, quality homes, especially during spring/fall. Cash buyers and those with large down payments are common. Working with an agent who knows the local market nuances and has relationships in the community is essential."
  },
  {
    question: "Are there any HOAs or community associations in Portola Valley?",
    answer: "Portola Valley has minimal HOA presence compared to more urban areas. Most single-family homes are not part of HOAs, though some newer developments or specific neighborhoods may have associations. The town itself has strict planning and architectural guidelines that serve a similar function to HOAs in preserving property values and aesthetic standards. Some properties may have equestrian association memberships or road maintenance agreements for private roads. Always verify specific HOA obligations during the purchase process."
  },
  {
    question: "What are the biggest benefits of living in Portola Valley?",
    answer: "Top benefits include: exceptional privacy and space (1-5 acre lots), top-tier schools in one of California's best districts, extensive trails and outdoor recreation literally at your doorstep, tight-knit, educated community with shared values around preservation and quality of life, rural tranquility while being 10 minutes from Stanford and world-class dining/culture, strong property value appreciation due to scarcity, safe environment with very low crime, and natural beauty with mature oaks and mountain views. It's ideal for successful professionals and families who want the best of both worlds."
  },
  {
    question: "What should I know before buying a home in Portola Valley?",
    answer: "Key considerations include: budget for the $4.8M+ median price and ~$50K+ annual property taxes, understand that homes require more maintenance due to size and rural setting, many properties are on septic systems (not sewer), well water is common, roads can be narrow and winding, expect longer driveways and property maintenance, fire safety and defensible space requirements in wildland-urban interface areas, limited commercial services within town (most shopping/dining in nearby Woodside or Palo Alto), and the lifestyle is quiet and rural—not suitable for those who prefer urban walkability. Work with an agent experienced in Portola Valley's unique market."
  },
  {
    question: "How does Portola Valley compare to nearby communities like Woodside, Atherton, and Los Altos Hills?",
    answer: "Portola Valley shares similarities with these exclusive Peninsula communities but has distinct characteristics. Compared to Woodside (its closest neighbor), Portola Valley has slightly smaller lots on average but better school ratings and more trails. Versus Atherton, Portola Valley is more rural and less formal, with more natural landscape and fewer manicured estates. Compared to Los Altos Hills, Portola Valley has similar rural character but better proximity to Stanford/Palo Alto and more extensive public trail access. All four communities offer luxury, privacy, and top schools, but Portola Valley uniquely combines large lots, trails, and Silicon Valley access."
  },
  {
    question: "What is the commute like from Portola Valley?",
    answer: "Portola Valley offers relatively easy commutes to major Peninsula employment centers despite its rural setting. Typical commute times: Stanford University (10 min), Palo Alto (15 min), Google/Facebook (20 min), San Mateo (25 min), San Francisco Airport (30-35 min), downtown San Francisco (40-50 min depending on traffic). Highway 280 access is excellent via Alpine Road. The scenic route along 280 is far more pleasant than Highway 101. Many residents work at nearby tech companies or Stanford, making commutes short. Remote work has made the location even more attractive as daily commutes decrease."
  },
  {
    question: "Are there fire risks in Portola Valley?",
    answer: "Like much of the Bay Area's wildland-urban interface, Portola Valley has fire risk, particularly during dry summer and fall months. The town has strict fire safety regulations including defensible space requirements, vegetation management, and building standards. Many properties require brush clearing and ongoing landscape maintenance for fire safety. CAL FIRE and local fire district provide excellent coverage. Homeowners should maintain defensible space, consider fire-resistant landscaping and building materials, and ensure adequate insurance. While risk exists, proper preparation and maintenance significantly mitigate it, and the lifestyle benefits outweigh concerns for most residents."
  },
  {
    question: "Can I build an ADU or guest house in Portola Valley?",
    answer: "Portola Valley's ADU regulations are more restrictive than many California communities due to the town's commitment to preserving low density. While ADUs are permitted under state law, local regulations limit size, placement, and impact on the rural character. Guest houses and secondary structures are common on larger properties but require planning approval. Many estates already include guest quarters or pool houses. If you're interested in building an ADU or guest house, consult with the town planning department early in your property search to understand specific requirements for properties you're considering. An experienced local agent can help identify properties with ADU potential."
  }
];

export function PortolaValleyFAQ() {
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
        title="Portola Valley Real Estate FAQ - Home Buying Guide | Cascade Realty"
        description="Everything you need to know about buying a home in Portola Valley. Expert answers from a Bay Area real estate professional with 15+ years of experience."
        coordinates={{ lat: 37.3841, lng: -122.2350 }}
      />
      <FAQHeader />
      <FAQHero
        title="Portola Valley Real Estate FAQ"
        description="Everything you need to know about buying a home in Portola Valley. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="portola-valley" />

      <Footer />
    </div>
  );
}
