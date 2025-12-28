import { Link } from 'react-router-dom';

export function FAQHeader() {
  return (
    <header className="bg-gray-900 text-white py-6">
      <div className="w-full px-16">
        <Link to="/" className="flex items-end gap-2">
          <img src="/images/logo.webp" alt="Cascade California Realty Logo" className="h-12 w-auto mb-1 brightness-0 invert" />
          <div>
            <div className="text-xl font-light tracking-[0.2em] mb-1">CASCADE</div>
            <div className="text-[10px] font-light text-gray-400 tracking-[0.2em]">CALIFORNIA REALTY</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
