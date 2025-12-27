import { ChevronRight } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-4">Let us find the home of your dreams.</p>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Cascade California Realty Inc is a full service boutique residential real estate brokerage firm 
            servicing all of the San Francisco Bay Area with more than 100 million US dollars in annual sales. 
            We take pride in providing personalized real estate services to our clients. We are a well accomplished 
            team of Architects, Structural Engineers, top B-School MBAs, Engineers and Entrepreneurs.
          </p>
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            VIEW LISTINGS
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
