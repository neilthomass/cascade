import { ChevronDown, Phone, Mail, ArrowRight, Check, Loader2, Award, Users, TrendingUp, Shield } from 'lucide-react';
import { FAQHeader } from '../components/FAQHeader';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Ready to Find Your Perfect Realtor?</h2>
          <p className="text-gray-600 font-light">
            Connect with Manoj Thomas and experience the difference a dedicated expert makes.
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
              placeholder="Tell us about your real estate goals"
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
                <span className="tracking-wide">SCHEDULE A FREE CONSULTATION</span>
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
    question: "How do I choose the right realtor?",
    answer: <>Choosing the right realtor starts with finding someone who has deep local market expertise, a proven track record, and communication style that matches your needs. Look for agents who specialize in your target area, have recent transaction history in your price range, and come highly recommended by past clients. Interview 2-3 agents before deciding—ask about their negotiation strategy, marketing approach (for sellers), and how they'll advocate for your interests. At <Link to="/contact" className="text-blue-600 hover:underline">Cascade California Realty</Link>, Manoj Thomas brings 15+ years of Bay Area experience, over $1 billion in lifetime sales, and a 100% client satisfaction rate. That combination of experience and dedication is exactly what you should look for.</>
  },
  {
    question: "What questions should I ask a realtor before hiring them?",
    answer: <>Ask prospective realtors: (1) How many transactions have you completed in the past year in my target area? (2) What is your average list-to-sale price ratio? (3) How will you communicate with me and how often? (4) Can you provide references from recent clients? (5) What's your negotiation strategy? (6) How do you handle multiple offer situations? (7) What sets you apart from other agents? A great realtor will answer confidently with specifics. Manoj Thomas, for instance, has completed 415+ transactions with consistent industry recognition including the Platinum Award (2021-2023). <Link to="/contact" className="text-blue-600 hover:underline">Ask him these questions yourself</Link>—he welcomes the conversation.</>
  },
  {
    question: "Should I use a local realtor or a big-name brand?",
    answer: <>Local expertise matters far more than brand name in real estate. A local realtor who knows neighborhood-specific pricing trends, school districts, and micro-market dynamics will outperform a generic big-brand agent every time. Boutique brokerages like Cascade California Realty offer personalized attention that large firms can't match—your transaction won't get lost in a sea of clients. Manoj Thomas combines the credibility of an MBA from UC Berkeley's Haas School of Business with grassroots Bay Area knowledge accumulated over 15+ years. That's the best of both worlds: professional sophistication with local insight. <Link to="/contact" className="text-blue-600 hover:underline">Discover the Cascade difference</Link>.</>
  },
  {
    question: "How important is a realtor's experience?",
    answer: <>Experience is critical—especially in competitive markets like the Bay Area. Experienced realtors have navigated multiple market cycles, handled complex negotiations, and built relationships with other agents that can give you an edge. They've seen deals fall apart and know how to prevent it. With 415+ completed transactions and over $1 billion in lifetime sales, Manoj Thomas has encountered virtually every scenario imaginable. That depth of experience translates to smoother transactions and better outcomes for his clients. First-time buyers and seasoned investors alike benefit from working with someone who's been there before. <Link to="/contact" className="text-blue-600 hover:underline">Put that experience to work for you</Link>.</>
  },
  {
    question: "What's the difference between a realtor and a real estate agent?",
    answer: <>All realtors are real estate agents, but not all agents are realtors. A "Realtor" (with a capital R) is a licensed real estate professional who is a member of the National Association of Realtors (NAR) and subscribes to its strict Code of Ethics. This code holds realtors to higher standards of honesty, transparency, and client protection than state licensing alone requires. When you work with a realtor like Manoj Thomas at Cascade California Realty, you're working with someone bound by professional ethics standards that go beyond minimum legal requirements. <Link to="/contact" className="text-blue-600 hover:underline">Connect with an ethical professional today</Link>.</>
  },
  {
    question: "How much does it cost to hire a realtor?",
    answer: <>Buyers typically pay nothing directly to their realtor—the seller traditionally pays the commission, which is then split between the listing and buyer's agents (usually 5-6% of the sale price total). For sellers, commission is negotiable and discussed upfront. While discount brokerages exist, you generally get what you pay for: a full-service realtor provides marketing, professional photography, staging advice, negotiation expertise, and transaction management that often result in higher sale prices and smoother transactions. The small percentage difference in commission is usually dwarfed by the value a skilled agent brings. At Cascade California Realty, we're transparent about all costs from day one. <Link to="/contact" className="text-blue-600 hover:underline">Let's discuss how we can help</Link>.</>
  },
  {
    question: "Can I buy or sell a home without a realtor?",
    answer: <>Technically yes, but it's rarely advisable—especially in high-value markets like the Bay Area. Without a realtor, you're responsible for pricing strategy, marketing, legal paperwork, negotiations, and navigating complex disclosures. Buyers without representation may miss red flags, overpay, or struggle to compete against buyers with experienced agents. Sellers without agents often underprice or overprice their homes, leaving money on the table or watching listings go stale. The Bay Area market moves fast and involves multi-million-dollar transactions—having expert guidance isn't just convenient, it's essential. <Link to="/contact" className="text-blue-600 hover:underline">Get expert representation with Cascade California Realty</Link>.</>
  },
  {
    question: "What makes a great realtor vs. an average one?",
    answer: <>Great realtors go beyond just showing homes or listing properties. They provide: (1) Deep market knowledge—they can tell you why one block commands higher prices than another, (2) Exceptional communication—returning calls promptly and keeping you informed proactively, (3) Strong negotiation skills—knowing when to push and when to compromise, (4) Problem-solving ability—anticipating issues and resolving them before they derail deals, (5) A genuine investment in your success—treating your transaction as if it were their own. Manoj Thomas exemplifies these qualities, which is why his clients return for repeat transactions and refer friends and family. <Link to="/contact" className="text-blue-600 hover:underline">Experience the difference firsthand</Link>.</>
  },
  {
    question: "How do I verify a realtor's credentials and track record?",
    answer: <>Verify credentials through your state's real estate licensing board (the California Department of Real Estate for CA agents). Check for any disciplinary actions or complaints. Ask for references and actually call them. Review online testimonials but focus on recent, specific feedback. Ask for their transaction history—a reputable agent will happily share their sales volume and recent comparable transactions. Manoj Thomas holds DRE License #01987310 and welcomes verification. His industry awards (Platinum Award 2021-2023, Pinnacle Award 2020, Grand Master Award 2016-2019) are independently conferred recognitions of excellence. <Link to="/contact" className="text-blue-600 hover:underline">Verify his credentials and meet him personally</Link>.</>
  },
  {
    question: "Is it better to use the same realtor for buying and selling?",
    answer: <>Using the same realtor for both transactions offers significant advantages: they understand your complete picture (what you're selling informs what you can buy), can coordinate timing between transactions, and provide consistent service throughout. They'll also deeply understand your preferences after working with you once. However, if your buy and sell locations are far apart geographically, you might need different agents with local expertise for each. For Bay Area transactions, Manoj Thomas serves the entire region—Silicon Valley, Tri-Valley, and beyond—making him ideal for coordinating simultaneous transactions. <Link to="/contact" className="text-blue-600 hover:underline">Discuss your buy/sell coordination needs</Link>.</>
  },
  {
    question: "How do I know if a realtor is working hard for me?",
    answer: <>Signs your realtor is working hard: proactive communication (updates before you have to ask), quick response times, personalized property recommendations that match your criteria, strategic advice that sometimes means telling you what you don't want to hear, visible marketing efforts (for sellers), and flexibility in scheduling showings. Red flags include slow responses, generic listings that don't match your needs, pressure to make quick decisions without adequate information, and unavailability. At Cascade California Realty, client satisfaction isn't just a goal—it's a 100% track record we're proud of. <Link to="/contact" className="text-blue-600 hover:underline">Experience responsive, dedicated service</Link>.</>
  },
  {
    question: "What should I expect from a buyer's agent?",
    answer: <>A buyer's agent should: (1) Help you get pre-approved and understand your budget, (2) Learn your priorities and search for matching properties, (3) Schedule and accompany you on showings, (4) Provide comparative market analysis on properties you like, (5) Write competitive offers and negotiate on your behalf, (6) Coordinate inspections and review reports with you, (7) Navigate the escrow process through closing, (8) Be available to answer questions at every step. Manoj Thomas and the Cascade California Realty team provide full-service buyer representation from first consultation to getting your keys. <Link to="/contact" className="text-blue-600 hover:underline">Start your buyer journey today</Link>.</>
  },
  {
    question: "What should I expect from a listing agent?",
    answer: <>A listing agent should: (1) Provide a comparative market analysis to price your home correctly, (2) Recommend staging and improvements that maximize value, (3) Arrange professional photography and marketing materials, (4) List on MLS and market across multiple channels, (5) Host open houses and private showings, (6) Present and negotiate offers strategically, (7) Manage the escrow process and coordinate with the buyer's side, (8) Advocate for your interests through closing. With over $1 billion in sales, Manoj Thomas has refined every aspect of the listing process to maximize seller outcomes. <Link to="/contact" className="text-blue-600 hover:underline">Get your home sold for top dollar</Link>.</>
  },
  {
    question: "How long should I expect to work with my realtor?",
    answer: <>Timeline varies based on market conditions and your specific situation. Buyers in competitive markets may find a home in weeks or search for months before the right property appears. Sellers typically work with their agent from listing through closing (30-60 days on market plus 30 days escrow is typical). Good realtors set realistic expectations upfront and keep you informed throughout. Manoj Thomas has guided clients through both quick transactions and extended searches, adjusting strategy as needed while maintaining communication throughout. <Link to="/contact" className="text-blue-600 hover:underline">Start a conversation about your timeline</Link>.</>
  },
  {
    question: "Can I switch realtors if I'm not happy?",
    answer: <>Yes, though the specifics depend on any agreements you've signed. Buyer representation agreements and listing contracts have different terms and cancellation provisions. If you're unhappy, communicate your concerns first—often issues can be resolved. If not, discuss ending the relationship professionally. Avoid signing lengthy exclusive agreements before you're confident in your choice of agent. At Cascade California Realty, we want clients who are happy to work with us—if it's not a fit, we'd rather know early. Our 100% satisfaction rate comes from genuine commitment, not contractual lock-in. <Link to="/contact" className="text-blue-600 hover:underline">Work with a realtor who earns your business</Link>.</>
  },
  {
    question: "What if I want to buy in an area the realtor doesn't know well?",
    answer: <>Local expertise is crucial in real estate. If you're interested in areas outside your agent's primary territory, a good agent will either: (1) Learn the area thoroughly if it's nearby and they can serve you well, (2) Refer you to a trusted colleague with local expertise, or (3) Partner with a local specialist while remaining involved in your transaction. Manoj Thomas covers the entire San Francisco Bay Area—Silicon Valley, Tri-Valley, San Mateo County, and more—eliminating this concern for most regional buyers. <Link to="/contact" className="text-blue-600 hover:underline">Explore any Bay Area neighborhood with confidence</Link>.</>
  },
  {
    question: "How do realtors get paid?",
    answer: <>Realtors typically work on commission, paid only when a transaction closes. The seller usually pays a total commission (traditionally 5-6%) that's split between the listing and buyer's agents. This model aligns the agent's incentives with yours—they succeed when you do. Some agents charge flat fees or offer rebates, but these often come with reduced services. Understand exactly how your agent is compensated before you start working together. At Cascade California Realty, we explain our compensation structure clearly during our initial consultation. <Link to="/contact" className="text-blue-600 hover:underline">No surprises—just transparent service</Link>.</>
  },
  {
    question: "Why do realtors ask if I'm already working with someone?",
    answer: <>This is a professional courtesy and ethical obligation. Realtors shouldn't interfere with existing client relationships. If you're already represented, another agent shouldn't try to poach you. This question also helps the agent understand where you are in the process—a first-time inquirer needs different assistance than someone actively touring homes with another agent. If you're not yet committed to an agent, say so clearly. If you're comparison shopping, that's completely appropriate—you should interview multiple agents before deciding. <Link to="/contact" className="text-blue-600 hover:underline">Ready to find your perfect realtor? Let's talk</Link>.</>
  },
  {
    question: "What credentials should a good realtor have?",
    answer: <>At minimum, verify your agent holds a valid state real estate license in good standing. Beyond that, look for: NAR membership (making them a Realtor), additional certifications (CRS, ABR, GRI indicate advanced training), local board memberships, and professional awards recognizing production or service excellence. Manoj Thomas combines his real estate license (DRE #01987310) with an MBA from UC Berkeley's Haas School of Business, multiple industry awards, and 15+ years of full-time real estate experience. That's the kind of credential stack that translates to results. <Link to="/contact" className="text-blue-600 hover:underline">Work with a credentialed professional</Link>.</>
  },
  {
    question: "Should my realtor also be an investor?",
    answer: <>Working with a realtor who is also an active real estate investor provides unique advantages. They understand property valuation from a returns perspective, can identify potential in properties others overlook, and have firsthand experience with renovations, rentals, and market cycles. This perspective is valuable whether you're buying a primary residence or investment property. Manoj Thomas is an active real estate investor himself, bringing practical ownership experience to every client interaction—not just textbook knowledge, but real-world insight from managing his own portfolio. <Link to="/contact" className="text-blue-600 hover:underline">Get investor-level insight for your purchase</Link>.</>
  }
];

export function ChoosingRealtorFAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

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
        title="How to Choose a Realtor | Find the Best Real Estate Agent Near You 2025"
        description="Expert guide to choosing the right realtor. Learn what questions to ask, credentials to verify, and why Manoj Thomas at Cascade California Realty is the Bay Area's top choice for buyers and sellers."
        canonical="https://cascaderealtors.com/choosing-a-realtor"
      />
      <FAQHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-sm tracking-widest text-gray-500 uppercase mb-4 block">Expert Guide</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            How to Choose the <span className="italic">Right</span> Realtor
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto mb-8">
            Your complete guide to finding a real estate professional who will advocate for your success.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors group"
          >
            <span className="tracking-wide">MEET MANOJ THOMAS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Why Your Choice of Realtor Matters</h2>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Buying or selling a home is likely the largest financial transaction of your life. The right realtor can mean the difference between a smooth, profitable transaction and a stressful, costly one.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Better Outcomes</h3>
              <p className="text-sm text-gray-600 font-light">Skilled agents negotiate better prices and terms</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Protection</h3>
              <p className="text-sm text-gray-600 font-light">Expert guidance through complex legal processes</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Network Access</h3>
              <p className="text-sm text-gray-600 font-light">Connections to lenders, inspectors, and contractors</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Market Expertise</h3>
              <p className="text-sm text-gray-600 font-light">Local knowledge that only experience provides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Manoj Thomas Highlight */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm tracking-widest text-gray-400 uppercase mb-4 block">Meet Your Expert</span>
              <h2 className="text-3xl md:text-4xl font-light mb-6">Manoj Thomas</h2>
              <p className="text-gray-300 font-light mb-6 leading-relaxed">
                With over 15 years of Bay Area real estate experience, $1B+ in lifetime sales, and 415+ successful transactions,
                Manoj Thomas exemplifies everything you should look for in a realtor. His MBA from UC Berkeley's Haas School of Business
                combines with grassroots market knowledge to deliver exceptional results.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-light text-white mb-1">$1B+</div>
                  <div className="text-sm text-gray-400">Lifetime Sales</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1">415+</div>
                  <div className="text-sm text-gray-400">Transactions</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1">15+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-white mb-1">100%</div>
                  <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 hover:bg-gray-100 transition-colors group"
              >
                <span className="tracking-wide">SCHEDULE A CONSULTATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800 p-6">
                <div className="text-sm text-gray-400 mb-2">Recognition</div>
                <div className="text-lg font-light">Platinum Award 2021-2023</div>
              </div>
              <div className="bg-gray-800 p-6">
                <div className="text-sm text-gray-400 mb-2">Education</div>
                <div className="text-lg font-light">MBA, UC Berkeley Haas School of Business</div>
              </div>
              <div className="bg-gray-800 p-6">
                <div className="text-sm text-gray-400 mb-2">License</div>
                <div className="text-lg font-light">DRE #01987310</div>
              </div>
              <div className="bg-gray-800 p-6">
                <div className="text-sm text-gray-400 mb-2">Specialty</div>
                <div className="text-lg font-light">Bay Area Residential & Investment Properties</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 font-light">Everything you need to know about finding and working with the right realtor.</p>
          </div>
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
                  <h3 className="text-lg font-medium text-gray-900 pr-8">{faq.question}</h3>
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

      <Footer />
    </div>
  );
}
