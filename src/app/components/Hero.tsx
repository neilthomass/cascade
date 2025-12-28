import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <header id="home" className="relative bg-white" role="banner" aria-label="Cascade California Realty - Bay Area Luxury Real Estate">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Grid */}
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-6 lg:px-12 xl:px-20 py-20 lg:py-32">
            <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">
              SAN FRANCISCO BAY AREA
            </p>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-[1.1]">
              Find Your Dream<br />
              <span className="text-gray-400">Home Today</span>
            </h1>
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-10 max-w-lg">
              With over 15 years of experience and $1B+ in lifetime sales, we guide you through every step of your real estate journey in Silicon Valley.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#properties"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-900 px-8 py-4 text-sm tracking-wide hover:border-gray-900 transition-colors duration-300"
              >
                View Portfolio
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[50vh] lg:h-auto">
            <img
              src="/images/sleeperave.webp"
              alt="Luxury home in Silicon Valley"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Featured Property Tag */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6">
              <p className="text-xs tracking-[0.15em] text-gray-500 mb-2">RECENTLY SOLD</p>
              <p className="text-lg text-gray-900 font-light">Sleeper Ave, Mountain View</p>
              <p className="text-gray-500 text-sm">$3.2M</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            <div className="px-6 lg:px-12 py-8">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">15+</div>
              <div className="text-xs tracking-[0.1em] text-gray-500">YEARS EXPERIENCE</div>
            </div>
            <div className="px-6 lg:px-12 py-8">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">$1B+</div>
              <div className="text-xs tracking-[0.1em] text-gray-500">LIFETIME SALES</div>
            </div>
            <div className="px-6 lg:px-12 py-8">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">415+</div>
              <div className="text-xs tracking-[0.1em] text-gray-500">TRANSACTIONS</div>
            </div>
            <div className="px-6 lg:px-12 py-8">
              <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">5.0</div>
              <div className="text-xs tracking-[0.1em] text-gray-500">CLIENT RATING</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}