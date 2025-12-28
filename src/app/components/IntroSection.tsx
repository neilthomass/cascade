import { ChevronRight } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-8">PREMIUM SERVICE</p>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-8 leading-tight">
            Expert Real Estate<br />Services You Can Trust
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Cascade California Realty is a full-service boutique residential brokerage
            serving the San Francisco Bay Area.
            We take pride in delivering personalized guidance tailored to each client.
          </p>
        </div>
      </div>
    </section>
  );
}