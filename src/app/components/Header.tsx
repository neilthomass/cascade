import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-end gap-1 group">
                <img src="/images/logo.webp" alt="Cascade California Realty Logo" className="h-16 w-auto mb-1" />
                <div className="pb-0.5 text-center">
                  <div className="text-xl font-bold text-gray-900 tracking-[0.2em]">CASCADE</div>
                  <div className="text-[10px] font-light text-gray-500 tracking-[0.2em] mt-0.5">CALIFORNIA REALTY</div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              <button onClick={() => scrollToSection('home')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Our Team
              </button>
              <button onClick={() => scrollToSection('properties')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm tracking-wide px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300">
                Contact
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-6 border-t border-gray-100">
              <div className="flex flex-col gap-6">
                <button onClick={() => scrollToSection('home')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Our Team
                </button>
                <button onClick={() => scrollToSection('properties')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Portfolio
                </button>
                <button onClick={() => scrollToSection('testimonials')} className="text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors text-left">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-sm tracking-wide px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 text-center">
                  Contact
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}