import { Award, GraduationCap, Building2, TrendingUp } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="pt-32 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Profile Section */}
        <div className="bg-white mb-20">
          <div className="flex flex-row">
            {/* Left: Photo */}
            <div className="w-32 sm:w-48 md:w-64 lg:w-80 flex-shrink-0 bg-gray-100">
              <img
                src="/images/manoj-hs.webp"
                alt="Manoj Thomas"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Right: Content */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Name & Title */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-1">
                  Manoj Thomas
                </h2>
                <p className="text-xs sm:text-sm tracking-[0.15em] text-gray-500">
                  FOUNDER & CEO
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8 pb-4 sm:pb-6 lg:pb-8 border-b border-gray-200">
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">15+</div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">YEARS</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">$1B+</div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">LIFETIME SALES</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">$1.8M</div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">AVG SALE</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-900">350+</div>
                  <div className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500">CLIENTS</div>
                </div>
              </div>

              {/* Bio */}
              <p className="hidden sm:block text-sm md:text-base text-gray-700 font-light leading-relaxed mb-6 lg:mb-8">
                A seasoned professional with fifteen years of experience in San Francisco Bay Area real estate, Manoj combines deep market knowledge with unwavering dedication to his clients. As an active investor himself, he brings firsthand experience to guide clients through one of the biggest investments of their lives.
              </p>

              {/* Credentials & Awards */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-900 text-white">
                  <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Berkeley MBA</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Platinum 2021–23</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Pinnacle 2020</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-gray-300 text-gray-700">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Grand Master 2016–19</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Industry Experts</h3>
            <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
              Thought leaders who add meaningful value to the community and their clients' lives
            </p>
          </div>

          <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
              <Award className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Experienced Agents</h3>
            <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
              Skilled at navigating the market with a deep understanding of industry trends
            </p>
          </div>

          <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
              <Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Committed Team</h3>
            <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
              United by a shared vision and commitment to excellence at every level
            </p>
          </div>

          <div className="bg-white p-5 lg:p-10 border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-900 flex items-center justify-center mb-4 lg:mb-8">
              <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <h3 className="text-base lg:text-xl mb-2 lg:mb-4 text-gray-900 tracking-tight">Amazing Reviews</h3>
            <p className="text-gray-600 font-light leading-relaxed text-xs lg:text-sm">
              Building trust and reputation through exceptional service and client satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
