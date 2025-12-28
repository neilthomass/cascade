import { Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-gray-800">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <div className="text-xl font-light tracking-[0.2em] mb-1">CASCADE</div>
              <div className="text-[10px] font-light text-gray-500 tracking-[0.2em]">CALIFORNIA REALTY</div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-md">
              Full service boutique residential real estate brokerage firm servicing all of the San Francisco Bay Area.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/CascadeRealty/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/cascaderealty" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm tracking-[0.2em] mb-6">NAVIGATION</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li><a href="/#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#properties" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm tracking-[0.2em] mb-6">CONTACT</h3>
            <ul className="space-y-3 text-gray-400 font-light text-sm">
              <li><a href="tel:+14087577353" className="hover:text-white transition-colors">(408) 757-7353</a></li>
              <li><a href="mailto:info@cascadecaliforniarealty.com" className="hover:text-white transition-colors">info@cascadecaliforniarealty.com</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-500 text-sm font-light tracking-wide">
            © {currentYear} Cascade California Realty Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}