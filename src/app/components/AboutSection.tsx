import { Users, Award, Star, TrendingUp } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ABOUT CASCADE</h2>
          <p className="text-xl text-gray-600">Best-in-Class Market Services</p>
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
