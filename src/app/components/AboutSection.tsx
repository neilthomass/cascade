import { Award, GraduationCap, Building2, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section id="about" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white p-8 lg:p-16 mb-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Photo + Name */}
            <div className="lg:col-span-4">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Headshot */}
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-6 ring-4 ring-gray-100">
                  <ImageWithFallback
                    src="https://cascadecaliforniarealty.com/wp-content/uploads/2021/10/manoj-hs.png"
                    alt="Manoj Thomas"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Name & Title */}
                <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-2">
                  Manoj Thomas
                </h2>
                <p className="text-sm tracking-[0.15em] text-gray-500 mb-6">
                  FOUNDER & CEO
                </p>

                {/* Berkeley Badge */}
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200">
                  <GraduationCap className="w-5 h-5 text-gray-700" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Executive MBA</p>
                    <p className="text-xs text-gray-500">UC Berkeley Haas '18</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-8">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-gray-200">
                <div>
                  <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">15+</div>
                  <div className="text-xs tracking-[0.1em] text-gray-500">YEARS EXPERIENCE</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">$100M+</div>
                  <div className="text-xs tracking-[0.1em] text-gray-500">ANNUAL SALES</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-light text-gray-900 mb-1">350+</div>
                  <div className="text-xs tracking-[0.1em] text-gray-500">CLIENTS SERVED</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-lg text-gray-700 font-light leading-relaxed mb-10">
                A seasoned professional with fifteen years of experience in San Francisco Bay Area real estate, Manoj combines deep market knowledge with unwavering dedication to his clients. As an active investor himself, he brings firsthand experience to guide clients through one of the biggest investments of their lives.
              </p>

              {/* Awards */}
              <div>
                <h3 className="text-xs tracking-[0.15em] text-gray-500 mb-4">RECOGNITION</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Platinum Award 2021–23</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Pinnacle Award 2020</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">Grand Master 2016–19</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">BayEast Association of Realtors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1 bg-white">
          <div className="bg-white p-12 hover:bg-gray-50 transition-colors duration-300 group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-300">
              <TrendingUp className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl mb-4 text-gray-900 tracking-tight">Industry Experts</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Thought leaders who add meaningful value to the community and their clients' lives
            </p>
          </div>

          <div className="bg-white p-12 hover:bg-gray-50 transition-colors duration-300 group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-300">
              <Award className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl mb-4 text-gray-900 tracking-tight">Experienced Agents</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Skilled at navigating the market with a deep understanding of industry trends
            </p>
          </div>

          <div className="bg-white p-12 hover:bg-gray-50 transition-colors duration-300 group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-300">
              <Building2 className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl mb-4 text-gray-900 tracking-tight">Committed Team</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              United by a shared vision and commitment to excellence at every level
            </p>
          </div>

          <div className="bg-white p-12 hover:bg-gray-50 transition-colors duration-300 group">
            <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-8 group-hover:bg-gray-900 transition-colors duration-300">
              <TrendingUp className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl mb-4 text-gray-900 tracking-tight">Amazing Reviews</h3>
            <p className="text-gray-600 font-light leading-relaxed">
              Building trust and reputation through exceptional service and client satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
