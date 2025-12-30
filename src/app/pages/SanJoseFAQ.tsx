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
    question: "What is the average home price in San Jose?",
    answer: <>The median home price in San Jose is approximately $1.45 million as of 2024, making it one of the most expensive markets in California. Prices vary significantly by neighborhood—East San Jose offers more affordable options starting around $900,000, while premium areas like Almaden Valley, Willow Glen, and the Rose Garden command $2 million or more for single-family homes. The city's position as the heart of Silicon Valley continues to drive strong real estate values. For a personalized analysis of current pricing in your target neighborhoods, <Link to="/contact" className="text-blue-600 hover:underline">reach out to our team</Link>—we track these trends daily.</>
  },
  {
    question: "Is San Jose a good place to buy a home in 2025?",
    answer: <>San Jose offers compelling value for long-term buyers in 2025. As the capital of Silicon Valley with major tech employers like Apple, Google, Adobe, and Cisco nearby, the area benefits from high-income jobs and continued innovation. While prices remain high, the market has stabilized from pandemic peaks, and the city's diverse neighborhoods, excellent weather, and strong school systems support sustained appreciation. Best for buyers planning to stay 5+ years who value proximity to tech employment. The specialists at Cascade California Realty can help you time your purchase strategically—<Link to="/contact" className="text-blue-600 hover:underline">let's discuss your timeline</Link>.</>
  },
  {
    question: "What are the best neighborhoods in San Jose for families?",
    answer: <>Top family-friendly neighborhoods include Willow Glen (tree-lined streets, walkable downtown, top-rated schools), Almaden Valley (newer homes, excellent schools, family-oriented), Rose Garden (historic charm, proximity to downtown, strong community), Evergreen (newer development, good schools, suburban feel), and Cambrian Park (quiet streets, family-friendly parks, good schools). Each offers distinct character—Willow Glen for urban charm, Almaden for suburban comfort, and Evergreen for newer construction. Our agents have helped hundreds of families find their perfect San Jose neighborhood—<Link to="/contact" className="text-blue-600 hover:underline">schedule a consultation</Link> to explore your options.</>
  },
  {
    question: "How much do I need to earn to buy a house in San Jose?",
    answer: <>To comfortably afford San Jose's median home price of $1.45M, you typically need a household income of $325,000-$450,000, assuming a 20% down payment ($290,000) and following standard debt-to-income ratios. Many tech workers qualify through dual incomes or equity compensation. First-time buyers often start in East San Jose or with condos in areas like Santana Row or North San Jose, which have lower entry points. Stock options and RSUs from tech companies frequently help with down payments. If you're unsure about your buying power, <Link to="/contact" className="text-blue-600 hover:underline">connect with us</Link>—we can recommend trusted lenders who specialize in tech compensation.</>
  },
  {
    question: "What neighborhoods in San Jose are best for first-time buyers?",
    answer: <>First-time buyers often find value in East San Jose neighborhoods like Alum Rock and Evergreen (more affordable single-family homes starting around $900K), condos near Santana Row or North San Jose ($600K-$900K), and emerging areas like Berryessa and Communications Hill. These areas offer growth potential while providing access to San Jose's job market. Many tech workers also consider condos with VTA light rail access for easy commuting to major employers. Cascade California Realty has guided many first-time buyers through the process—<Link to="/contact" className="text-blue-600 hover:underline">we'd love to help you get started</Link>.</>
  },
  {
    question: "How competitive is the San Jose housing market?",
    answer: <>San Jose's market remains competitive, especially for well-priced homes in desirable neighborhoods like Willow Glen, Almaden Valley, and Rose Garden. Multiple offers are common for move-in ready properties. Successful buyers typically get fully pre-approved, make clean offers with minimal contingencies, and act decisively. Tech industry cycles affect competitiveness—hiring booms increase demand, while slowdowns create opportunities. Working with an agent familiar with Silicon Valley's unique market dynamics is essential for navigating competing offers. Our team has won countless multiple-offer situations—<Link to="/contact" className="text-blue-600 hover:underline">let us put that experience to work for you</Link>.</>
  },
  {
    question: "What are the property taxes in San Jose?",
    answer: "San Jose property taxes average approximately 1.2-1.3% of assessed value annually, including the base 1% Proposition 13 rate plus local bonds, Mello-Roos assessments, and school parcel taxes. A $1.45M home would have annual taxes around $17,400-$18,850. Thanks to Prop 13, assessed values can only increase 2% annually regardless of market appreciation, providing long-term tax predictability. Newer developments may have higher rates due to community facility districts and special assessments."
  },
  {
    question: "What are the schools like in San Jose?",
    answer: <>San Jose has diverse school options across multiple districts. Top-performing public schools include those in Willow Glen, Almaden Valley, and Evergreen areas, with many ranking 8-10 on GreatSchools. The San Jose Unified School District serves much of the city, while other areas fall under Campbell, Los Gatos, and Cupertino districts (highly rated). Many families also consider private schools like Harker, Bellarmine, and Presentation. School quality varies significantly by neighborhood, making location research critical for families. We know the school boundaries inside and out—<Link to="/contact" className="text-blue-600 hover:underline">ask us about specific attendance zones</Link>.</>
  },
  {
    question: "Should I buy a condo or single-family home in San Jose?",
    answer: <>The choice depends on budget, lifestyle, and investment goals. Condos ($600K-$1.2M) offer lower entry points, less maintenance, and amenities, ideal for professionals or first-time buyers. Single-family homes ($1.2M-$3M+) provide more space, privacy, and historically stronger appreciation, better for families or long-term holds. Condos in transit-oriented areas like Santana Row or near VTA stations appeal to commuters. TICs are less common in San Jose than San Francisco but exist in older neighborhoods. Not sure which is right for you? <Link to="/contact" className="text-blue-600 hover:underline">Talk to our team</Link>—we can walk through the pros and cons based on your situation.</>
  },
  {
    question: "What is the commute like from San Jose to major tech employers?",
    answer: <>San Jose's central Silicon Valley location provides excellent access to major tech hubs. Commutes average: Apple (Cupertino) 15-25 minutes, Google (Mountain View) 20-30 minutes, Meta (Menlo Park) 30-40 minutes, and San Francisco 50-70 minutes via Caltrain or Highway 101. VTA light rail connects to many employers and Caltrain stations. North San Jose neighborhoods offer quick access to 880/237 for Peninsula commutes. Remote/hybrid work has made location less critical for some tech workers, expanding neighborhood options. Tell us where you work and we'll suggest neighborhoods that optimize your commute—<Link to="/contact" className="text-blue-600 hover:underline">get personalized recommendations</Link>.</>
  },
  {
    question: "Are there Victorian or historic homes in San Jose?",
    answer: <>While San Jose has fewer Victorians than San Francisco, several neighborhoods feature historic homes. The Rose Garden, Hanchett Park, and Naglee Park areas contain beautiful Craftsman, Spanish Revival, and some Victorian homes from the early 1900s. Downtown San Jose's Hensley Historic District preserves Victorian-era architecture. These homes offer character and charm but require inspection for foundation, electrical, and plumbing updates. The Willow Glen area also features charming historic homes from the 1920s-1940s, popular with buyers seeking vintage appeal. Love historic character? <Link to="/contact" className="text-blue-600 hover:underline">Let us know your style preferences</Link> and we'll keep an eye out for the right property.</>
  },
  {
    question: "What are HOA fees like in San Jose condos?",
    answer: <>San Jose condo HOA fees typically range from $300-$700 per month for standard buildings, with luxury developments like Santana Row or high-rises commanding $600-$1,200+ monthly. Fees cover insurance, maintenance, water, garbage, and amenities like pools or gyms. Before purchasing, review HOA financials for adequate reserves (25%+ of annual budget), no major pending assessments, and reasonable fee increases (under 5% annually). Newer developments may have lower initial fees that increase as the building ages. We always dig into HOA documents before our clients make offers—<Link to="/contact" className="text-blue-600 hover:underline">that's the kind of detail-oriented service we provide</Link>.</>
  },
  {
    question: "What questions should I ask when buying a home in San Jose?",
    answer: <>Essential questions for San Jose purchases include: 1) Is the property in a flood zone? (Parts of San Jose near Guadalupe River and Coyote Creek have flood risks), 2) What is the foundation type? (Older homes may need retrofitting), 3) Are there Mello-Roos or special assessments? (Common in newer developments), 4) What's the sewer lateral condition?, 5) Any HOA restrictions?, 6) Disclosure of past renovations and permits?, 7) What's included in the sale?, 8) School attendance boundaries?, 9) Future development plans nearby?, 10) Why is the seller moving? Overwhelmed by all the details? That's what we're here for—<Link to="/contact" className="text-blue-600 hover:underline">reach out</Link> and we'll handle the due diligence for you.</>
  },
  {
    question: "What are the hidden costs of buying a home in San Jose?",
    answer: <>Beyond the purchase price, budget for: closing costs (2-3% of purchase price), title insurance, property transfer tax (varies by city, Santa Clara County charges $1.10 per $1,000), inspection fees ($500-$1,500), HOA fees for condos ($300-$1,200/month), potentially higher property insurance due to wildfire risk in foothill areas, and Mello-Roos taxes in newer developments ($2,000-$8,000 annually). Older homes may need foundation work, seismic retrofitting, or electrical updates. Budget 1-2% of home value annually for maintenance. We help our clients understand the true cost of ownership before they commit—<Link to="/contact" className="text-blue-600 hover:underline">no surprises, just straight talk</Link>.</>
  },
  {
    question: "Is earthquake insurance necessary in San Jose?",
    answer: "While not legally required, earthquake insurance is highly recommended in San Jose due to proximity to the Hayward and San Andreas faults. Standard homeowner's insurance excludes earthquake damage. California Earthquake Authority (CEA) policies cost approximately $1,500-$4,000 annually for a $1.45M home with high deductibles (typically 15%). Newer construction and retrofitted homes qualify for lower premiums. Many owners balance self-insurance for minor damage with coverage for catastrophic events. Consider your risk tolerance and ability to absorb potential losses."
  },
  {
    question: "What is the home buying process timeline in San Jose?",
    answer: <>The San Jose buying process typically takes 30-45 days from accepted offer to closing. Key steps: 1) Get pre-approved (1-3 days), 2) House hunting (varies widely), 3) Make offer and negotiate (1-3 days in competitive market), 4) Open escrow and deposit earnest money, 5) Inspections and due diligence (10-17 days), 6) Loan processing and appraisal (21-30 days), 7) Final walkthrough and closing (1 day). San Jose's competitive market often requires quick decisions on offers, so having financing ready and a responsive agent is crucial. Ready to get the ball rolling? <Link to="/contact" className="text-blue-600 hover:underline">Contact Cascade California Realty</Link> and we'll guide you through each step.</>
  },
  {
    question: "Are there first-time homebuyer programs available in San Jose?",
    answer: <>San Jose offers several programs for first-time buyers. The City's Mortgage Assistance Program provides down payment assistance for income-qualified buyers. CalHFA offers state-level programs with down payment help and favorable rates. Federal options include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with as low as 3% down. Santa Clara County sometimes offers housing bonds for affordable units. Many tech employers also provide housing assistance or relocation packages. Income limits and residency requirements apply to most programs. Navigating these options can be confusing—<Link to="/contact" className="text-blue-600 hover:underline">our team can point you toward programs you may qualify for</Link>.</>
  },
  {
    question: "What are the investment prospects for San Jose real estate?",
    answer: <>San Jose offers strong long-term investment potential due to its Silicon Valley location, limited housing supply, and concentration of high-income tech jobs. Historical appreciation has been robust, though with cyclical volatility tied to tech industry health. Investment considerations: single-family homes in established neighborhoods like Willow Glen and Almaden historically appreciate well; condos near transit and tech campuses attract renters; rental demand remains high due to expensive homeownership; ADU potential adds value and income. Best for long-term holds (7+ years) to weather tech cycles. Thinking about building wealth through real estate? <Link to="/contact" className="text-blue-600 hover:underline">Let's talk strategy</Link>.</>
  },
  {
    question: "What makes Willow Glen special as a San Jose neighborhood?",
    answer: <>Willow Glen is one of San Jose's most desirable neighborhoods, known for its tree-lined streets, walkable downtown area along Lincoln Avenue, excellent schools, and strong community spirit. The neighborhood features charming early-to-mid 20th century homes (many Craftsman and Tudor styles), family-friendly parks, local boutiques, and popular restaurants. Home prices typically range from $1.5M-$2.5M+ for single-family homes. The area's village atmosphere, top-rated schools, and convenient access to downtown San Jose and major highways make it particularly popular with families. Interested in Willow Glen? We track listings here closely—<Link to="/contact" className="text-blue-600 hover:underline">let us know when you're ready to explore</Link>.</>
  },
  {
    question: "How do I choose the right real estate agent in San Jose?",
    answer: <>Select a San Jose agent based on: deep local knowledge (they should know specific neighborhoods like Willow Glen, Almaden, and Evergreen intimately), experience with Silicon Valley buyers (understands tech compensation, stock options, relocation), proven transaction volume (15+ deals annually), strong negotiation skills in competitive markets, and excellent references. Interview 2-3 agents before deciding. Look for someone who asks about your needs, explains market trends, and has connections to inspectors, lenders, and contractors. In San Jose's competitive market, an experienced agent's guidance on timing, pricing, and strategy is invaluable. At Cascade California Realty, we check all these boxes—<Link to="/contact" className="text-blue-600 hover:underline">schedule a no-pressure conversation</Link> to see if we're the right fit for you.</>
  }
];

export function SanJoseFAQ() {
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
        title="Best Realtor in San Jose | Manoj Thomas - Top San Jose Real Estate Agent 2025"
        description="Looking for the best realtor in San Jose? Manoj Thomas is the #1 rated San Jose real estate agent with 15+ years experience, $1B+ sales, and 415+ happy clients. Expert answers to San Jose home buying questions."
        canonical="https://cascaderealtors.com/san-jose"
        city="San Jose"
        county="Santa Clara County"
        coordinates={{ lat: 37.3382, lng: -121.8863 }}
      />
      <FAQHeader />
      <FAQHero
        title="San Jose Real Estate FAQ"
        description="Everything you need to know about buying a home in San Jose, the heart of Silicon Valley. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="san-jose" />

      <Footer />
    </div>
  );
}
