import { Award, GraduationCap, Building2, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section id="about" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">LEADERSHIP</p>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Meet Manoj Thomas
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Founder & CEO
          </p>
        </div>

        {/* Manoj Thomas Profile */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-32">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <ImageWithFallback
              src="https://cascadecaliforniarealty.com/wp-content/uploads/2021/10/manoj-hs.png"
              alt="Manoj Thomas - Founder & CEO"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-12">
              A seasoned professional with fifteen years of experience in San Francisco Bay Area real estate, Manoj combines deep market knowledge with unwavering dedication to his clients. He keeps their best interests at the forefront and guides them through one of the biggest investments of their lives.
            </p>

            {/* Awards */}
            <div className="space-y-6 mb-12 pb-12 border-b border-gray-200">
              <h3 className="text-sm tracking-[0.2em] text-gray-900 mb-6">AWARDS & RECOGNITION</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gray-900 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-900">Platinum Award</p>
                    <p className="text-sm text-gray-600">BayEast Association of Realtors, 2021-2023</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gray-900 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-900">Pinnacle Award</p>
                    <p className="text-sm text-gray-600">BayEast Association of Realtors, 2020</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gray-900 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-900">Grand Master Award</p>
                    <p className="text-sm text-gray-600">BayEast Association of Realtors, 2016-2019</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 gap-8">
              <div>
                <Building2 className="w-8 h-8 text-gray-900 mb-4" />
                <h4 className="text-gray-900 mb-2">Active Investor</h4>
            <p className="text-gray-600 font-light leading-relaxed">
                  An active investor himself, he uses firsthand experience to guide aspiring investors
                </p>
              </div>
              <div>
                <GraduationCap className="w-8 h-8 text-gray-900 mb-4" />
                <h4 className="text-gray-900 mb-2">Executive MBA</h4>
                <p className="text-gray-600 font-light leading-relaxed">
                  Haas School of Business at UC Berkeley, 2018
                </p>
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