import { ChevronRight } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-8">PREMIUM SERVICE</p>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
            Personalized Real Estate<br />Services You Can Trust
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Cascade California Realty Inc is a full service boutique residential real estate brokerage firm 
            servicing all of the San Francisco Bay Area with more than 100 million US dollars in annual sales. 
            We take pride in providing personalized real estate services to our clients.
          </p>
        </div>
      </div>
    </section>
  );
}