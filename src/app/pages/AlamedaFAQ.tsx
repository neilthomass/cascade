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
    question: "What is the average home price in Alameda?",
    answer: <>The median home price in Alameda is approximately $1.25 million as of 2024. This unique island community offers excellent value compared to nearby San Francisco, with prices varying by neighborhood and property type. Single-family Victorian homes in the West End typically range from $1.4M to $2.5M, while East End properties and condos offer more affordable entry points around $800,000 to $1.2M. Alameda's island charm, top-rated schools, and beach access make it a competitive market with strong appreciation potential. For a personalized market analysis tailored to your budget, <Link to="/contact" className="text-blue-600 hover:underline">connect with Cascade California Realty</Link>.</>
  },
  {
    question: "Why is Alameda called an island community?",
    answer: <>Alameda is a true island city located in San Francisco Bay, separated from Oakland by a narrow tidal canal. The island is connected to the mainland by four bridges and two underwater tubes. This unique geography creates a distinct small-town atmosphere despite being minutes from downtown Oakland and San Francisco. The island location means stunning waterfront views, miles of beaches, and a walkable, bike-friendly community with a strong neighborhood identity. Many residents appreciate the feeling of living in a beach town while having easy access to major Bay Area job centers. Curious about island living? <Link to="/contact" className="text-blue-600 hover:underline">Reach out to our team</Link> for insider insights on Alameda's unique neighborhoods.</>
  },
  {
    question: "What makes Alameda's Victorian homes special?",
    answer: <>Alameda is home to one of the highest concentrations of Victorian and Craftsman architecture in California, with over 3,000 preserved historic homes dating from the 1870s-1920s. The West End Gold Coast neighborhood features stunning Queen Anne Victorians with turrets, wraparound porches, and original details like stained glass and carved woodwork. Many have been meticulously restored and maintained. These homes typically offer 2,500-4,000 square feet with period charm, though buyers should budget for ongoing maintenance. The city's Historic Preservation Ordinance protects these architectural treasures, contributing to Alameda's unique character. Cascade California Realty has deep expertise in historic properties—<Link to="/contact" className="text-blue-600 hover:underline">let us help you find your dream Victorian</Link>.</>
  },
  {
    question: "Is Alameda a good place for families?",
    answer: <>Alameda is consistently ranked as one of the Bay Area's top communities for families. Key factors include excellent public schools (Alameda Unified School District has several California Distinguished Schools), safe neighborhoods with low crime rates, abundant parks and beaches, strong community engagement, and family-oriented events year-round. The island's beaches, playgrounds, and recreational facilities provide endless outdoor activities. Many neighborhoods have tree-lined streets where children bike and play safely. The tight-knit community offers small-town values with big-city access, making it ideal for raising children. Our team at Cascade specializes in matching families with the perfect neighborhood—<Link to="/contact" className="text-blue-600 hover:underline">reach out</Link> for personalized guidance.</>
  },
  {
    question: "How are the schools in Alameda?",
    answer: <>Alameda Unified School District consistently performs above state averages, with several schools earning California Distinguished School status. Popular elementary schools include Earhart, Franklin, Lincoln, and Paden, each serving distinct neighborhoods. Alameda has two well-regarded public high schools: Alameda High School and Encinal High School, both offering strong academics, arts, and athletics programs. The district emphasizes STEM education and offers numerous enrichment programs. Many families specifically move to Alameda for the schools, and homes in top school boundaries command premium prices. Private school options are also available, including St. Joseph Notre Dame High School. Want to find a home in your preferred school boundary? <Link to="/contact" className="text-blue-600 hover:underline">Contact Cascade California Realty</Link> for expert guidance.</>
  },
  {
    question: "What is Crown Memorial State Beach?",
    answer: <>Crown Memorial State Beach is Alameda's crown jewel—a 2.5-mile sandy beach along the San Francisco Bay offering stunning views of the city skyline and Bay Bridge. This family-friendly beach features calm waters protected by a breakwater, making it ideal for swimming, kiteboarding, paddleboarding, and kayaking. The adjacent Crab Cove Visitor Center offers marine education programs. The beach area includes picnic facilities, a bike path, and Alameda Beach, a popular community gathering spot. Having a state beach in your backyard is a rare amenity that significantly enhances quality of life and property values in Alameda. Looking for a home near the beach? <Link to="/contact" className="text-blue-600 hover:underline">Let Cascade show you what's available</Link>.</>
  },
  {
    question: "How is the commute from Alameda to San Francisco and Oakland?",
    answer: <>Alameda offers excellent access to Bay Area job centers. Downtown Oakland is just 5-10 minutes via the Posey or Webster Street tubes. San Francisco is 20-30 minutes by car via the Bay Bridge or 30-40 minutes via AC Transit transbay buses. Many residents bike or drive to nearby BART stations in Oakland (Lake Merritt, Fruitvale, or Coliseum stations are all within 2 miles). Ferry service from nearby Oakland's Jack London Square provides a scenic 30-minute commute to San Francisco's Ferry Building. The convenient location without the urban density makes Alameda ideal for commuters seeking a suburban lifestyle. Our agents know which streets offer the quickest routes—<Link to="/contact" className="text-blue-600 hover:underline">ask us about commute-friendly neighborhoods</Link>.</>
  },
  {
    question: "What is Park Street in Alameda?",
    answer: <>Park Street is Alameda's historic downtown corridor, running through the heart of the island. This vibrant, walkable neighborhood features over 100 locally-owned shops, restaurants, cafes, and boutiques housed in charming historic buildings. From artisan coffee shops to craft breweries, ethnic restaurants to upscale dining, Park Street offers diverse options for every taste. The monthly Park Street Art & Wine Faire and year-round events create a strong community atmosphere. Living near Park Street means walkability to daily needs, contributing to Alameda's small-town feel. Homes within walking distance of Park Street are highly desirable—<Link to="/contact" className="text-blue-600 hover:underline">let Cascade help you find one</Link>.</>
  },
  {
    question: "What neighborhoods are best in Alameda?",
    answer: <>Alameda's top neighborhoods each offer distinct character. The West End/Gold Coast features stunning Victorian homes, tree-lined streets, and proximity to Crown Beach. The East End offers more affordable options with growing commercial amenities and newer construction. Bay Farm Island, connected by bridge, provides newer homes, excellent schools, and a suburban feel with water views. The Central neighborhood near Park Street offers walkability and convenience. The Marina Village and Harbor Bay areas provide waterfront living with modern amenities. Each neighborhood has strong community identity, so visiting and exploring before buying is essential. <Link to="/contact" className="text-blue-600 hover:underline">Schedule a neighborhood tour with Cascade</Link> to find your perfect fit.</>
  },
  {
    question: "Is Alameda a good investment for real estate?",
    answer: <>Alameda represents strong investment potential for several reasons: limited housing supply due to island geography, consistent demand from families seeking top schools, increasing Bay Area housing costs driving buyers to more affordable alternatives, and ongoing development at Alameda Point creating new amenities. Historic appreciation rates have been solid, typically 4-6% annually, with stronger performance during boom years. The combination of Victorian charm, beach access, excellent schools, and proximity to job centers creates sustained demand. Long-term holds (5+ years) have historically performed well, especially for well-maintained homes in desirable neighborhoods. For investment-focused property searches, <Link to="/contact" className="text-blue-600 hover:underline">consult with Cascade California Realty</Link>.</>
  },
  {
    question: "What is Alameda Point?",
    answer: <>Alameda Point is the site of the former Naval Air Station on the western tip of the island, currently undergoing one of the Bay Area's largest urban redevelopment projects. The 2,800-acre site is being transformed into a mixed-use community with housing, parks, commercial space, and waterfront access. New residential developments offer modern homes with bay views at various price points. The Point features open space, historic hangars converted to creative offices and retail, breweries, distilleries, and entertainment venues. USS Hornet Museum and regular flea markets attract visitors. Development continues through 2030, promising to significantly enhance Alameda's amenities and property values. Interested in new construction at the Point? <Link to="/contact" className="text-blue-600 hover:underline">Cascade can guide you through the options</Link>.</>
  },
  {
    question: "What are property taxes in Alameda?",
    answer: <>Alameda property taxes are approximately 1.15% of assessed value annually, including the base 1% Proposition 13 rate plus local parcel taxes for schools, infrastructure, and services. California's Prop 13 limits annual assessed value increases to 2% regardless of market appreciation, providing long-term predictability. New buyers are assessed at purchase price, so a home bought for $1.25M would have annual taxes around $14,400. Additional parcel taxes support Alameda schools and services but typically add less than $1,000 annually. Compared to the high home values, property taxes remain reasonable due to Prop 13 protections. Have questions about total ownership costs? <Link to="/contact" className="text-blue-600 hover:underline">Get in touch with our team</Link>.</>
  },
  {
    question: "Does Alameda have good restaurants and dining?",
    answer: <>Alameda's dining scene has evolved dramatically, offering diverse options from casual to upscale. Park Street features numerous restaurants including farm-to-table bistros, authentic ethnic cuisine (Thai, Japanese, Mexican, Italian), craft breweries, and artisan coffee shops. Webster Street provides additional dining options, and Alameda Point's developing waterfront has attracted breweries and restaurants with bay views. Notable local favorites include Trabocco for Italian, Burma Superstar for Burmese, and Spirits Alley with multiple craft beverage producers. The island's compact size means you're never far from excellent dining, and new restaurants continue opening as the community grows. Want to live within walking distance of your favorite spots? <Link to="/contact" className="text-blue-600 hover:underline">Tell us your must-haves</Link>.</>
  },
  {
    question: "Is Alameda safe?",
    answer: <>Alameda consistently ranks as one of the safest communities in the Bay Area, with crime rates significantly below regional and state averages. The Alameda Police Department maintains strong community relationships and visible presence. Property crime rates are low compared to neighboring cities, and violent crime is rare. The island geography and limited access points contribute to security. Neighborhoods are walkable with active street life, and residents report feeling safe walking day or night. Family-friendly atmosphere and strong community engagement further enhance safety. This safety record is a major draw for families and significantly impacts property values. Ready to explore this welcoming community? <Link to="/contact" className="text-blue-600 hover:underline">Connect with Cascade California Realty</Link>.</>
  },
  {
    question: "What outdoor activities are available in Alameda?",
    answer: <>Alameda offers exceptional outdoor recreation for an urban island. Crown Memorial State Beach provides swimming, kiteboarding, kayaking, and paddleboarding. The Bay Trail offers miles of scenic paths for walking, running, and cycling around the island perimeter. Over 30 city parks include Crown Beach, Washington Park, and Alameda Beach with playgrounds, sports fields, and picnic areas. The estuary offers sailing and rowing opportunities. Many residents bike as primary transportation on flat, bike-friendly streets. Golf enthusiasts enjoy Chuck Corica Golf Complex with bay views. The mild climate allows year-round outdoor activities, a major quality-of-life benefit. Prioritize outdoor living? <Link to="/contact" className="text-blue-600 hover:underline">Let Cascade find you a home near your favorite trails</Link>.</>
  },
  {
    question: "How does Alameda compare to other Bay Area cities?",
    answer: <>Alameda offers a unique combination of small-town atmosphere with big-city access that few Bay Area communities match. Compared to San Francisco, Alameda is more affordable, family-friendly, and spacious while maintaining cultural amenities. Compared to Oakland, Alameda offers lower crime, better schools, and beach access while being immediately adjacent. Compared to Peninsula suburbs, Alameda provides more character and walkability at similar or lower prices. The island setting creates stronger community identity than sprawling suburbs. While lacking some urban intensity, Alameda's Victorian architecture, beaches, schools, and tight-knit community make it a distinctive choice for Bay Area homebuyers seeking balance. Considering multiple cities? <Link to="/contact" className="text-blue-600 hover:underline">Cascade serves the entire Bay Area</Link> and can help you compare.</>
  },
  {
    question: "What is the home buying process in Alameda?",
    answer: <>Buying in Alameda typically follows standard Bay Area practices with some unique considerations. Start with mortgage pre-approval, then work with an agent familiar with Alameda's distinct neighborhoods and Victorian home considerations. Homes in desirable areas and good school boundaries receive multiple offers, often selling at or above asking price. Expect 30-45 days from offer to closing. For Victorian homes, conduct thorough inspections for foundation, electrical, plumbing, and seismic retrofitting needs. Review disclosure packages carefully. In competitive situations, clean offers with minimal contingencies and personal letters often succeed. The experts at Cascade California Realty guide clients through every step—<Link to="/contact" className="text-blue-600 hover:underline">get in touch</Link> to start your journey.</>
  },
  {
    question: "Are there first-time homebuyer programs in Alameda?",
    answer: <>First-time buyers in Alameda can access several assistance programs. California state programs like CalHFA offer down payment assistance and affordable interest rates. Alameda County sponsors programs for moderate-income buyers. Federal options include FHA loans (3.5% down), VA loans (0% down for veterans), and conventional loans with as low as 3% down. Some Alameda Point developments include below-market-rate units through lottery. Local lenders often have special programs for Bay Area buyers. Given Alameda's median prices around $1.25M, many first-time buyers start with condos or smaller homes, building equity before moving to larger properties. <Link to="/contact" className="text-blue-600 hover:underline">Reach out to Cascade</Link>—we can connect you with trusted lenders familiar with these programs.</>
  },
  {
    question: "What should I know about buying a Victorian home in Alameda?",
    answer: <>Buying an Alameda Victorian requires special considerations. Hire inspectors experienced with historic homes to evaluate foundation (many older homes need seismic retrofitting), electrical systems (knob-and-tube wiring requires updating), plumbing (galvanized pipes may need replacement), and structural elements. Check for lead paint and asbestos in pre-1978 homes. Review any Historic Preservation restrictions if the home is designated. Budget 1-3% of home value annually for maintenance—historic homes require more upkeep. Many Victorians have been extensively remodeled with modern systems while preserving period details. Despite maintenance demands, these homes offer unmatched character, craftsmanship, and strong appreciation in Alameda's protected historic districts. Cascade has helped many clients navigate historic home purchases—<Link to="/contact" className="text-blue-600 hover:underline">tap into our expertise</Link>.</>
  },
  {
    question: "What makes Alameda special compared to other Bay Area cities?",
    answer: <>Alameda's unique combination of attributes sets it apart: true island geography creating distinct community identity, one of California's largest concentrations of Victorian architecture, 2.5 miles of public beaches in an urban setting, top-rated schools with small-town values, walkable neighborhoods with local businesses, easy access to San Francisco and Oakland job centers without urban density, strong sense of community with active neighborhood engagement, and family-friendly atmosphere with low crime. The island offers beach-town lifestyle with city proximity—a rare combination in the Bay Area. This distinctive character, limited housing supply, and quality of life make Alameda increasingly desirable and support strong long-term property values. Ready to make Alameda home? <Link to="/contact" className="text-blue-600 hover:underline">Start your search with Cascade California Realty</Link>.</>
  }
];

export function AlamedaFAQ() {
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
        title="Best Realtor in Alameda | Manoj Thomas - Top Alameda Real Estate Agent 2025"
        description="Looking for the best realtor in Alameda? Manoj Thomas is the #1 rated Alameda real estate agent with 15+ years experience, $1B+ sales. Expert in Alameda homes and neighborhoods."
        canonical="https://cascaderealtors.com/alameda"
        city="Alameda"
        county="Alameda County"
        coordinates={{ lat: 37.7652, lng: -122.2416 }}
      />
      <FAQHeader />
      <FAQHero
        title="Alameda Real Estate FAQ"
        description="Everything you need to know about buying a home in Alameda. Expert answers from a Bay Area real estate professional with 15+ years of experience."
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
      <RelatedCities currentCity="alameda" />

      <Footer />
    </div>
  );
}
