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
      const response = await fetch('https://cascaderealtors.com/api/contact', {
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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Explore Hillsborough?</h2>
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
              placeholder="Tell us about your luxury home search"
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
    question: "What is the average home price in Hillsborough?",
    answer: <>The median home price in Hillsborough is approximately $5.5 million, making it one of the most exclusive communities in the San Francisco Bay Area. However, prices range dramatically—from $3-4 million for smaller homes or properties needing renovation, to $10 million, $20 million, or more for premier estates on large lots. Many properties feature sprawling grounds of one to several acres, with custom architecture and luxury amenities that command premium pricing. For current pricing insights tailored to your search, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team</Link>.</>
  },
  {
    question: "Why are Hillsborough homes so expensive?",
    answer: <>Hillsborough's ultra-luxury pricing reflects several unique factors: strict half-acre minimum lot requirements ensure spacious properties with privacy, the town's complete ban on commercial development creates an exclusive residential sanctuary, top-rated Hillsborough City School District attracts affluent families, and the prestigious address carries significant social cachet. The limited inventory of only about 1,500 homes, combined with high demand from tech executives and business leaders, drives sustained appreciation. At Cascade California Realty, we help buyers navigate this exclusive market with confidence.</>
  },
  {
    question: "What is the minimum lot size in Hillsborough?",
    answer: "Hillsborough requires a minimum lot size of 0.5 acres (approximately 21,780 square feet), with many properties exceeding one acre or more. This generous land requirement ensures privacy, expansive gardens, and the ability to create true estate living. The large lots are a defining characteristic of the community and contribute significantly to property values. Some of the most prestigious estates sit on 2-5 acres or more with extensive grounds, tennis courts, pools, and guest houses."
  },
  {
    question: "Are there any commercial businesses in Hillsborough?",
    answer: "No, Hillsborough has zero commercial development—no stores, restaurants, gas stations, or office buildings. This is by design and strictly enforced through zoning regulations that have been in place since the town's incorporation in 1910. Residents travel to nearby Burlingame, San Mateo, or other Peninsula cities for shopping and dining. This complete absence of commercial activity is a key feature that maintains the town's tranquil, exclusively residential character and contributes to its prestige."
  },
  {
    question: "How are the schools in Hillsborough?",
    answer: "Hillsborough City School District is consistently ranked among the top public school districts in California, with exceptional test scores and college preparation. The district serves grades K-8 with three elementary schools (North, South, and West) and one middle school (Crocker). Students then typically attend Burlingame High School or private schools like Crystal Springs Uplands, Nueva School, or Menlo School. The outstanding public schools are a major draw for families and significantly impact property values."
  },
  {
    question: "What is the entry-level price for a home in Hillsborough?",
    answer: <>Entry-level homes in Hillsborough typically start around $3-4 million, usually for smaller properties (under 3,000 square feet) or homes requiring significant renovation on minimum half-acre lots. These represent opportunities for buyers to enter the market and potentially add value through updates. However, truly move-in-ready homes with modern amenities and good condition typically start closer to $5-6 million. Given the median of $5.5 million, budget at least $4 million to find viable options. <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link> to explore available properties in your price range.</>
  },
  {
    question: "What types of homes are common in Hillsborough?",
    answer: <>Hillsborough features an eclectic mix of architectural styles reflecting different eras: grand Mediterranean and Italian Renaissance estates from the 1920s-30s, mid-century modern masterpieces from the 1950s-60s, traditional Georgian and Colonial revival homes, and contemporary custom estates built in recent decades. Many properties are architecturally significant, and several homes are designated historic landmarks. Buyers can find everything from 1920s estates needing restoration to ultra-modern new construction with smart home technology. If you have a specific architectural style in mind, <Link to="/contact" className="text-blue-600 hover:underline">let Cascade California Realty know</Link>—we can curate a tailored selection.</>
  },
  {
    question: "Is Hillsborough a good investment?",
    answer: <>Hillsborough has demonstrated strong long-term appreciation due to its scarcity, prestige, excellent schools, and proximity to Silicon Valley wealth. While the ultra-luxury market can be more volatile than mid-range housing, Hillsborough's limited supply (only about 1,500 homes) and consistent demand from high-net-worth buyers provide stability. Properties here are often generational holdings. The investment case is strongest for buyers planning to hold 10+ years and those who value the lifestyle and school quality alongside financial returns. Our team at Cascade California Realty can provide detailed market analysis to inform your decision—<Link to="/contact" className="text-blue-600 hover:underline">get in touch</Link>.</>
  },
  {
    question: "What are property taxes like in Hillsborough?",
    answer: "Hillsborough property taxes are approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments and school bonds. For a $5.5 million home, expect annual property taxes around $60,000-$66,000. Thanks to Prop 13, your assessment can only increase 2% per year regardless of market appreciation, making long-term ownership increasingly advantageous. New buyers are assessed at purchase price, and supplemental tax bills are common in the first year."
  },
  {
    question: "What are the HOA fees in Hillsborough?",
    answer: "Most Hillsborough properties are single-family estates with no HOA fees. However, a few small enclaves or shared-driveway situations may have modest HOA or road maintenance associations. The town itself provides excellent municipal services funded through property taxes, including top-tier police protection, well-maintained roads, and beautiful landscaping. Budget for private estate maintenance, landscaping (often $2,000-$5,000+ monthly for large properties), and utilities rather than HOA dues."
  },
  {
    question: "How private and secure is Hillsborough?",
    answer: <>Hillsborough offers exceptional privacy and security. Large lot sizes (minimum 0.5 acres) provide natural buffer between homes, mature trees and landscaping create secluded estates, and the town has its own highly-rated police department with extremely low crime rates. Many properties have gated entries, security systems, and privacy hedges. The residential-only nature means minimal through-traffic. Hillsborough consistently ranks as one of the safest communities in California, making it ideal for families and executives seeking discretion. Cascade California Realty understands the importance of privacy for our clients—<Link to="/contact" className="text-blue-600 hover:underline">let us know your requirements</Link>.</>
  },
  {
    question: "What is the commute like from Hillsborough?",
    answer: "Hillsborough offers excellent Peninsula location for commuters. San Francisco is 20-30 minutes via Highway 280 or I-280 (traffic dependent), Silicon Valley and Palo Alto are 25-35 minutes south on 280, SFO Airport is just 15 minutes away, and Caltrain stations in nearby Burlingame or San Mateo provide transit alternatives. The central Peninsula location is a major advantage—you're never far from tech campuses, the city, or the airport. Many residents work in venture capital, tech, or finance with flexible schedules."
  },
  {
    question: "Can I build or renovate a home in Hillsborough?",
    answer: <>Yes, but Hillsborough has strict building regulations and design review processes. All exterior changes require approval from the Planning Department and often the Design Review Board to ensure compatibility with the neighborhood character. The town encourages architectural excellence and maintains high standards. Many buyers purchase older estates with renovation plans—budget extra time (6-12 months) for permitting beyond typical construction timelines. Working with architects and contractors experienced in Hillsborough's requirements is essential. <Link to="/contact" className="text-blue-600 hover:underline">Ask us</Link> about properties with renovation potential and trusted local contractors.</>
  },
  {
    question: "What amenities and activities are available in Hillsborough?",
    answer: "While Hillsborough has no commercial district, it offers beautiful parks, trails, and open spaces. The Hillsborough Recreation Department provides excellent youth and adult programs. Many homes have private amenities like tennis courts, pools, and sport courts. Residents join nearby private clubs: Burlingame Country Club, Peninsula Golf & Country Club, or Sharon Heights Golf & Country Club. The town hosts community events and has a tight-knit feel despite the large estates. Shopping and dining are minutes away in Burlingame or San Mateo."
  },
  {
    question: "Is Hillsborough family-friendly?",
    answer: <>Absolutely. Hillsborough is quintessentially family-oriented with award-winning K-8 schools, extremely safe streets with very low crime, spacious yards perfect for children and pets, active community programs and events, and neighbors who share similar family values. The lack of commercial activity means no traffic congestion and safe environments for kids to play. Many families span multiple generations here—children who grew up in Hillsborough often return to raise their own families, testament to the strong community and quality of life. Our Cascade California Realty agents are happy to share neighborhood insights for families—<Link to="/contact" className="text-blue-600 hover:underline">contact us</Link> to learn more.</>
  },
  {
    question: "What should I know before buying a home in Hillsborough?",
    answer: <>Key considerations for Hillsborough buyers include: budget beyond purchase price for estate maintenance, landscaping, and utilities (large homes on big lots have significant operating costs); understand the strict design review process if planning renovations; there are no stores or restaurants in town—you'll drive to nearby cities for everything; excellent schools are a major draw but high school options require research (Burlingame High or private schools); and the market moves slower than typical Bay Area real estate—expect longer marketing times but also serious, qualified buyers. The experts at Cascade California Realty can walk you through every consideration—<Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link>.</>
  },
  {
    question: "How competitive is the Hillsborough real estate market?",
    answer: <>Hillsborough's ultra-luxury market is less frenetic than mid-range Bay Area housing but still competitive for the best properties. Well-priced, well-maintained estates in desirable locations attract multiple qualified buyers. However, the market is more nuanced—buyers at this price point conduct extensive due diligence, often taking weeks to evaluate properties. Off-market transactions are common, and relationships with experienced luxury real estate agents matter significantly. Properties can sit longer than mass-market homes, but quality estates with proper pricing sell reliably. Cascade California Realty maintains access to exclusive off-market listings—<Link to="/contact" className="text-blue-600 hover:underline">inquire about pocket listings</Link>.</>
  },
  {
    question: "What are the property maintenance costs in Hillsborough?",
    answer: "Hillsborough estate maintenance is substantial. Budget for: landscaping and grounds keeping ($2,000-$5,000+ monthly depending on acreage), pool maintenance ($300-500/month), utilities for large homes ($1,000-2,000+ monthly), property insurance ($5,000-15,000+ annually, more for high-value estates), estate management or housekeeping, and ongoing repairs and updates. A $5-10 million estate might require $100,000-200,000+ annually in operating costs beyond mortgage and taxes. Many owners employ estate managers to coordinate maintenance."
  },
  {
    question: "Are there any first-time buyer opportunities in Hillsborough?",
    answer: <>Hillsborough is not a first-time buyer market in the traditional sense—there are no affordable housing programs or entry-level pricing. However, "first-time" luxury buyers (perhaps moving from a starter home or relocating with significant equity/income) might consider smaller properties needing updates in the $3-4 million range. These homes offer opportunity to enter this prestigious community and add value through renovation. Working with a real estate professional experienced in Hillsborough's luxury market is essential for identifying these opportunities. <Link to="/contact" className="text-blue-600 hover:underline">Reach out to Cascade California Realty</Link> to discuss your options.</>
  },
  {
    question: "How do I choose the right real estate agent for Hillsborough?",
    answer: <>Selecting an agent for Hillsborough requires finding someone with specific luxury market expertise: deep knowledge of Hillsborough's unique regulations, zoning, and design review process; established relationships with other agents and off-market deal flow; experience with $5M+ transactions and sophisticated buyers; understanding of estate features, architecture, and land value; and discretion working with high-net-worth clients. Interview multiple agents, ask about recent Hillsborough sales, and ensure they understand the nuances of this exclusive market. Track record in ultra-luxury matters immensely. At Cascade California Realty, we specialize in Peninsula luxury real estate with over 15 years of experience—<Link to="/contact" className="text-blue-600 hover:underline">start a conversation with our team</Link>.</>
  }
];

export function HillsboroughFAQ() {
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
        title="Best Realtor in Hillsborough | Manoj Thomas - Top Hillsborough Real Estate Agent 2025"
        description="Looking for the best realtor in Hillsborough? Manoj Thomas is the #1 rated Hillsborough real estate agent with 15+ years experience, $1B+ sales. Expert in Hillsborough homes and neighborhoods."
        canonical="https://cascaderealtors.com/hillsborough"
        city="Hillsborough"
        county="San Mateo County"
        coordinates={{ lat: 37.5741, lng: -122.3794 }}
      />
      <FAQHeader />
      <FAQHero
        title="Hillsborough Real Estate FAQ"
        description="Everything you need to know about buying a luxury estate in Hillsborough. Expert answers from a Bay Area real estate professional with 15+ years of experience in ultra-luxury properties."
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
      <RelatedCities currentCity="hillsborough" />

      <Footer />
    </div>
  );
}
