import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-end gap-1 group">
              <img src="/images/logo.webp" alt="Cascade California Realty Logo" className="h-12 w-auto mb-1" />
              <div>
                <div className="text-xl font-light text-gray-900 tracking-[0.2em]">CASCADE</div>
                <div className="text-[10px] font-light text-gray-500 tracking-[0.2em] mt-0.5">CALIFORNIA REALTY</div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* 404 Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">ERROR 404</p>
          <h1 className="text-6xl lg:text-8xl font-light text-gray-900 mb-6 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span className="tracking-wide">BACK TO HOME</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm font-light tracking-wide">
            © {new Date().getFullYear()} Cascade California Realty Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
