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
    question: "What is the average home price in Moraga?",
    answer: <>The median home price in Moraga is approximately $1.7 million as of 2024, making it one of the premier communities in Contra Costa County. Prices vary based on location, size, and condition—from around $1.2 million for smaller homes to $3 million or more for luxury estates in sought-after neighborhoods. Despite premium pricing, Moraga often offers better value compared to neighboring Lafayette and Orinda, while maintaining comparable schools and community quality. For a detailed analysis of current pricing in specific Moraga neighborhoods, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team</Link> for personalized insights.</>
  },
  {
    question: "Why is Moraga considered a hidden gem in the East Bay?",
    answer: <>Moraga is often called the East Bay's best-kept secret because it offers the same exceptional schools, safety, and quality of life as Orinda and Lafayette but with a more intimate, close-knit community feel. The town maintains its small-town character with local shops, tree-lined streets, and strong neighborhood connections. Many buyers are pleasantly surprised to find they can get more house for their money in Moraga compared to neighboring cities, while still enjoying top-tier schools and a family-oriented environment. At Cascade California Realty, we've helped dozens of families discover Moraga's unique charm—<Link to="/contact" className="text-blue-600 hover:underline">let us show you why locals love it here</Link>.</>
  },
  {
    question: "How good are the schools in Moraga?",
    answer: <>Moraga schools are exceptional, consistently ranking among the best in California. The Moraga School District serves elementary and middle school students with highly-rated schools like Camino Pablo Elementary, Donald Rheem Elementary, Joaquin Moraga Intermediate, and Los Perales Elementary. High school students attend Campolindo High School, renowned for academic excellence, strong athletics, and high college acceptance rates. Many families specifically move to Moraga for the school district, and the community's investment in education is evident through active parent involvement and strong test scores. If schools are a priority for your family, <Link to="/contact" className="text-blue-600 hover:underline">we'd be happy to guide you</Link> to homes in the best attendance zones.</>
  },
  {
    question: "What makes Campolindo High School special?",
    answer: <>Campolindo High School is one of the Bay Area's premier public high schools, consistently ranking in the top tier of California schools. The school offers rigorous academics with extensive AP courses, exceptional college counseling, and impressive college acceptance rates to top universities including UC Berkeley, Stanford, and Ivy League schools. Beyond academics, Campolindo excels in athletics, arts, and extracurricular programs. The school's supportive community, experienced teachers, and strong parent involvement create an environment where students thrive academically and socially.</>
  },
  {
    question: "How does Saint Mary's College benefit Moraga residents?",
    answer: <>Saint Mary's College adds significant value to Moraga living. Residents enjoy access to cultural events, lectures, art exhibitions, and athletic events on campus. The college's beautiful 420-acre campus offers scenic trails for walking and running. The RecPlex facility provides fitness and recreation opportunities. The college also brings economic vitality and a youthful energy to the community while maintaining respectful town-gown relations. For families, the proximity to higher education can inspire students and provide easy access to college resources.</>
  },
  {
    question: "Is Moraga a safe place to raise a family?",
    answer: <>Moraga is exceptionally safe and is consistently rated as one of the safest communities in the Bay Area. The town has very low crime rates, vigilant neighborhood watch programs, and responsive local law enforcement through the Moraga Police Services. The family-oriented community culture means neighbors look out for each other. Safe streets, well-lit neighborhoods, and a strong sense of community make Moraga an ideal place for families with children. Many residents cite safety as a primary reason they chose Moraga. Our team at Cascade California Realty knows these neighborhoods intimately—<Link to="/contact" className="text-blue-600 hover:underline">connect with us</Link> to find the perfect street for your family.</>
  },
  {
    question: "What is the community culture like in Moraga?",
    answer: <>Moraga has a distinctly close-knit, family-oriented community culture. Unlike larger suburban areas, Moraga residents actively participate in local events, support local businesses, and know their neighbors. The town hosts community gatherings including farmers markets, Fourth of July celebrations, and school events that bring people together. Parents are highly involved in schools and youth sports. The Moraga Community Foundation and various volunteer organizations foster civic engagement. This small-town feel, despite proximity to major Bay Area employment centers, is what many residents treasure most.</>
  },
  {
    question: "How does Moraga compare in price to Orinda and Lafayette?",
    answer: <>Moraga typically offers better value than neighboring Orinda and Lafayette while maintaining comparable quality of life. While Moraga's median home price is around $1.7 million, similar homes in Orinda or Lafayette often command premiums of 10-20% or more. All three communities share excellent schools, safety, and natural beauty, but Moraga's slightly lower prices make it attractive to buyers seeking value. Some attribute this to Moraga's smaller commercial district and quieter profile, but many residents consider this an advantage rather than a drawback. Wondering which Lamorinda town fits your budget? <Link to="/contact" className="text-blue-600 hover:underline">Get in touch</Link> for a no-pressure comparison.</>
  },
  {
    question: "What types of homes are available in Moraga?",
    answer: <>Moraga offers diverse housing options, from ranch-style homes built in the 1960s-70s to contemporary custom estates. Many properties sit on larger lots (10,000+ square feet) with mature landscaping and privacy. Common architectural styles include California ranch, traditional, Mediterranean, and contemporary. Neighborhoods like Sanders Ranch, Rheem Valley, and Moraga Country Club offer distinct character. Most homes feature 3-5 bedrooms, updated kitchens, and indoor-outdoor living spaces. The real estate inventory tends to be limited, making desirable properties competitive when they hit the market. <Link to="/contact" className="text-blue-600 hover:underline">Contact Cascade California Realty</Link> to learn about upcoming listings before they go public.</>
  },
  {
    question: "What amenities and activities does Moraga offer?",
    answer: <>Moraga provides excellent recreational amenities despite its small size. The Moraga Commons is a central gathering place with restaurants, shops, and services. Rancho Laguna Park offers sports fields, playgrounds, and trails. The Hacienda de las Flores hosts weddings and community events in a beautiful historic setting. Moraga Country Club provides golf and social activities for members. Extensive trail systems connect to regional parks for hiking and biking. Youth sports programs are robust, with strong community support for Little League, soccer, basketball, and more. The town also enjoys easy access to Lafayette and Orinda for additional dining and shopping.</>
  },
  {
    question: "How is the commute from Moraga to San Francisco and Oakland?",
    answer: <>Moraga offers reasonable commutes to major Bay Area employment centers. San Francisco is approximately 30-40 minutes via Highway 24 and the Caldecott Tunnel during off-peak hours, though rush hour can extend this to 60-75 minutes. Oakland and Berkeley are 20-30 minutes away. Many commuters use the Orinda BART station (10 minutes away) for public transit access. Walnut Creek, a major East Bay employment hub, is just 15-20 minutes away. While not the closest suburb to San Francisco, Moraga's quality of life and family amenities make the commute worthwhile for many professionals.</>
  },
  {
    question: "What should first-time buyers know about buying in Moraga?",
    answer: <>First-time buyers should understand that Moraga is a competitive market with limited inventory. Successful buyers typically: work with a local agent who knows the market intimately, get fully pre-approved before starting their search, act quickly when the right property appears, and understand that homes often receive multiple offers. The high median price means significant down payments are required. However, buying in Moraga is often a long-term investment in quality of life, schools, and community. Many families buy smaller starter homes with plans to upgrade later while staying in the community. If you're new to the process, the experts at Cascade California Realty specialize in guiding first-time buyers—<Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link> to get started.</>
  },
  {
    question: "Is Moraga a good investment for real estate?",
    answer: <>Moraga represents a strong long-term real estate investment. The community's excellent schools, safety, and limited housing supply support property values. Homes in top school districts historically appreciate well, and Moraga's schools are among the best. The town's desirability among families ensures consistent demand. While not immune to market cycles, Moraga has shown resilience in downturns due to its fundamental strengths. Properties here tend to hold value better than surrounding areas. For buyers planning to stay 5-10+ years, particularly families with school-age children, Moraga offers both lifestyle and financial value. <Link to="/contact" className="text-blue-600 hover:underline">Talk with our team</Link> about investment potential in today's market.</>
  },
  {
    question: "What is the Moraga School District like?",
    answer: <>The Moraga School District is highly regarded and consistently receives top ratings from GreatSchools and other educational ranking organizations. The district serves approximately 2,500 students across four schools: Camino Pablo, Donald Rheem, and Los Perales elementary schools, plus Joaquin Moraga Intermediate. The district emphasizes academic excellence, small class sizes, and individualized attention. Parent involvement is exceptionally high, with active PTAs and volunteer programs. The district benefits from strong community financial support and experienced educators. Standardized test scores typically exceed state and national averages significantly.</>
  },
  {
    question: "What are the property taxes in Moraga?",
    answer: <>Moraga property taxes are approximately 1.1-1.2% of assessed value annually, including the base 1% Proposition 13 rate plus local assessments and bonds. For a median-priced home of $1.7 million, annual property taxes would be roughly $18,700-$20,400. Thanks to Prop 13, assessed value increases are capped at 2% annually regardless of market appreciation, providing long-term tax predictability. New buyers are assessed at purchase price. Moraga's tax rate is comparable to other Contra Costa County communities and reflects investment in excellent schools and community services.</>
  },
  {
    question: "How family-friendly is Moraga?",
    answer: <>Moraga is exceptionally family-friendly and is often described as the ideal place to raise children. The community prioritizes families with excellent schools, safe neighborhoods, and abundant youth activities. Parents actively participate in schools, sports, and community organizations. Children can safely ride bikes around neighborhoods, and many walk to school. The town hosts family-oriented events year-round. Strong community values and neighbor connections create a supportive environment for raising children. Many adults who grew up in Moraga choose to return to raise their own families, testament to the positive childhood experiences the community provides.</>
  },
  {
    question: "What are the downsides of living in Moraga?",
    answer: <>While Moraga offers many advantages, potential buyers should consider: limited commercial development means fewer shops and restaurants compared to Lafayette or Walnut Creek, requiring short drives for many errands; commutes to San Francisco can be long during peak hours; the median home price of $1.7 million is expensive, though still lower than neighboring Orinda; wildfire risk exists as with many Bay Area foothill communities, requiring brush clearance and awareness; and social/cultural diversity is more limited than in larger urban areas. The trade-off is a quiet, safe, family-oriented lifestyle that many find worth these compromises. Want an honest assessment of whether Moraga is right for you? <Link to="/contact" className="text-blue-600 hover:underline">Our agents give straightforward advice</Link>—no pressure, just facts.</>
  },
  {
    question: "What is the best time to buy a home in Moraga?",
    answer: <>Moraga's real estate market is active year-round, though spring (March-May) typically sees the most inventory as families aim to move before the next school year. Competition is highest in spring and early summer. Fall can offer opportunities as some sellers become motivated to close before the holidays. Winter has the least inventory but also fewer competing buyers. However, in Moraga's tight market, the best strategy is to be ready to act whenever the right property appears regardless of season. Working with an experienced local agent who knows upcoming listings before they hit the market is often more valuable than timing the season. The team at Cascade California Realty often hears about properties before they're listed—<Link to="/contact" className="text-blue-600 hover:underline">get on our radar</Link> so you don't miss out.</>
  },
  {
    question: "What questions should I ask when buying a home in Moraga?",
    answer: <>Essential questions for Moraga home purchases include: 1) Which specific schools does this address feed into (boundaries can affect desirability)? 2) What is the property's wildfire risk and defensible space compliance? 3) Has the property had any foundation, drainage, or slope stability issues (common in hillside lots)? 4) What are the neighborhood rules and HOA restrictions if applicable? 5) How old are major systems (roof, HVAC, water heater)? 6) Is the property in a flood zone or have drainage concerns? 7) What is included in the sale (appliances, outdoor features)? 8) What comparable sales support the asking price? A good agent will help investigate each thoroughly before making an offer—<Link to="/contact" className="text-blue-600 hover:underline">our Moraga specialists</Link> know exactly what to look for.</>
  },
  {
    question: "How do I choose the right real estate agent for buying in Moraga?",
    answer: <>Choose a Moraga real estate agent based on: deep local knowledge of specific Moraga neighborhoods and schools, active involvement in the community (they should know the area personally, not just professionally), recent transaction history in Moraga (5+ deals per year shows market expertise), strong relationships with other local agents (many Moraga listings sell through agent networks before public marketing), references from recent Moraga buyers, and communication style that matches your needs. Interview 2-3 agents who specialize in the Lamorinda area. In Moraga's competitive market with limited inventory, an experienced local agent's insights and connections are invaluable. When you're ready, <Link to="/contact" className="text-blue-600 hover:underline">meet the Cascade California Realty team</Link>—we'd love the chance to earn your trust.</>
  }
];

export function MoragaFAQ() {
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
        title="Best Realtor in Moraga | Manoj Thomas - Top Moraga Real Estate Agent 2025"
        description="Looking for the best realtor in Moraga? Manoj Thomas is the #1 rated Moraga real estate agent with 15+ years experience, $1B+ sales. Expert in Moraga homes and neighborhoods."
        canonical="https://cascaderealtors.com/moraga"
        city="Moraga"
        county="Contra Costa County"
        coordinates={{ lat: 37.8349, lng: -122.1297 }}
      />
      <FAQHeader />
      <FAQHero
        title="Moraga Real Estate FAQ"
        description="Everything you need to know about buying a home in Moraga. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="moraga" />

      <Footer />
    </div>
  );
}
