import { Search, MapPin, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div id="home" className="relative bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1685514823717-7e1ff6ee0563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY2NzkxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
        {/* Hero Content */}
        <div className="max-w-3xl mb-16">
          <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs tracking-[0.2em]">
            SAN FRANCISCO BAY AREA
          </div>
          <h1 className="text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-[1.1]">
            Find Your Dream<br />Home Today
          </h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            Premium residential real estate services with over $100M in annual sales
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-4xl mb-20">
          <div className="bg-white p-6 lg:p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter location or property type"
                  className="w-full pl-12 pr-4 py-4 border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 transition-all text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <button className="px-10 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl">
          <div className="text-white">
            <div className="text-5xl font-light mb-3 tracking-tight">$100M+</div>
            <div className="text-sm text-gray-400 tracking-wide">ANNUAL SALES</div>
          </div>
          <div className="text-white border-l-0 md:border-l border-white/20 md:pl-12">
            <div className="text-5xl font-light mb-3 tracking-tight">325+</div>
            <div className="text-sm text-gray-400 tracking-wide">TRANSACTIONS</div>
          </div>
          <div className="text-white border-l-0 md:border-l border-white/20 md:pl-12">
            <div className="text-5xl font-light mb-3 tracking-tight">350+</div>
            <div className="text-sm text-gray-400 tracking-wide">HAPPY CLIENTS</div>
          </div>
        </div>
      </div>
    </div>
  );
}