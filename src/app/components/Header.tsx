import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button onClick={() => scrollToSection('home')} className="flex items-center">
                <div className="text-2xl font-bold text-blue-900">
                  CASCADE
                  <span className="block text-xs font-normal text-gray-600">CALIFORNIA REALTY</span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-900 transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('properties')} className="text-gray-700 hover:text-blue-900 transition-colors">
                Our Properties
              </button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-900 transition-colors">
                About Cascade
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-900 transition-colors">
                Contact
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-900 transition-colors text-left">
                  Home
                </button>
                <button onClick={() => scrollToSection('properties')} className="text-gray-700 hover:text-blue-900 transition-colors text-left">
                  Our Properties
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-900 transition-colors text-left">
                  About Cascade
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-900 transition-colors text-left">
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