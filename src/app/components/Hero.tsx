import { Search, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <div id="home" className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1685514823717-7e1ff6ee0563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY2NzkxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          opacity: 0.2
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            DREAM
          </h1>
          <p className="text-2xl md:text-3xl mb-2">your next home with us</p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Street, City, State, or Zip"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none text-gray-900"
                />
              </div>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none appearance-none text-gray-900">
                  <option>All Statuses</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Sold</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="rounded" />
                Featured
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="rounded" />
                Represented The Buyer
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="rounded" />
                Represented The Seller
              </label>
              <button className="text-blue-900 hover:underline text-left">More</button>
            </div>

            <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Properties
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2">01</div>
            <div className="text-sm text-gray-300 mb-1">/</div>
            <div className="font-semibold mb-1">BEST-IN-CLASS</div>
            <div className="text-gray-300">Exceptional Client Service</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">02</div>
            <div className="text-sm text-gray-300 mb-1">/</div>
            <div className="font-semibold mb-1">TOP AGENTS</div>
            <div className="text-gray-300">325+ Transactions</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">03</div>
            <div className="text-sm text-gray-300 mb-1">/</div>
            <div className="font-semibold mb-1">HAPPY CLIENTS</div>
            <div className="text-gray-300">350+ Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
