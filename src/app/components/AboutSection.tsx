import { Users, Award, Star, TrendingUp, GraduationCap, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ABOUT CASCADE</h2>
          <p className="text-xl text-gray-600">Best-in-Class Market Services</p>
        </div>

        {/* Manoj Thomas - Founder & CEO Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-96 md:h-auto">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NjgzMTQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Manoj Thomas - Founder & CEO"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">MANOJ THOMAS</h3>
                <p className="text-xl text-blue-900 font-semibold mb-4">Founder & CEO</p>
                <div className="w-20 h-1 bg-blue-900"></div>
              </div>

              <p className="text-gray-700 mb-6">
                Manoj is a seasoned real estate professional who brings fifteen years of experience in the San Francisco Bay area real estate with extensive market knowledge, and unsurpassed dedication to his clients. He always keeps his clients' best interests in mind and guides them through one of the biggest investments of their lives.
              </p>

              {/* Awards */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-900" />
                  Awards & Recognition
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Platinum Award of the BayEast Association of Realtors (2021-2023)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Pinnacle Award of the BayEast Association of Realtors (2020)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Grand Master Award of the BayEast Association of Realtors (2016-2019)</span>
                  </li>
                </ul>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Active Investor</p>
                    <p className="text-gray-600">Experienced in California's real estate market, guiding aspiring investors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-900 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Education</p>
                    <p className="text-gray-600">Executive MBA, Haas School of Business at UC Berkeley (2018)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">COMMITTED TEAM</h3>
            <p className="text-gray-600">
              Our team commitment has improved bottom line results. Good leadership and shared vision usually 
              contribute to our workplace where employees show commitment on all levels.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">INDUSTRY EXPERTS</h3>
            <p className="text-gray-600">
              We have a team of thought leaders and influencers of the real estate industry; they add meaningful 
              value to the community and their clients' lives, and use that influence to build up the businesses.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">AMAZING REVIEWS</h3>
            <p className="text-gray-600">
              Gaining trust is no easy feat in the time of the empowered buyer, but our amazing reviews gain 
              consumer trust and also help Cascade California Realty's overall reputation and success.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">EXPERIENCED AGENTS</h3>
            <p className="text-gray-600">
              Our team of experienced real estate agents know how to navigate the market and understand the pulse 
              of the industry. Their experience is valuable and worth the costs involved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}