import { Home } from 'lucide-react';

export function Hero() {
  return (
    <header id="home" className="relative bg-white" role="banner" aria-label="Cascade California Realty - Bay Area Luxury Real Estate">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1685514823717-7e1ff6ee0563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY2NzkxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl">
          <div className="text-white">
            <div className="text-5xl font-light mb-3 tracking-tight">$100M+</div>
            <div className="text-sm text-gray-400 tracking-wide">ANNUAL SALES</div>
          </div>
          <div className="text-white border-l-0 md:border-l border-white/20 md:pl-12">
            <div className="text-5xl font-light mb-3 tracking-tight">415+</div>
            <div className="text-sm text-gray-400 tracking-wide">TRANSACTIONS</div>
          </div>
          <div className="text-white border-l-0 md:border-l border-white/20 md:pl-12">
            <div className="text-5xl font-light mb-3 tracking-tight">100%</div>
            <div className="text-sm text-gray-400 tracking-wide">SATISFACTION RATE</div>
          </div>
        </div>
      </div>
    </header>
  );
}