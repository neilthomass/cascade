import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQHeroProps {
  title: string;
  description: string;
}

export function FAQHero({ title, description }: FAQHeroProps) {
  return (
    <section className="bg-gray-50 pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back to Home</span>
        </Link>
        <p className="text-sm tracking-[0.2em] text-gray-500 mb-4">HOMEBUYER GUIDE</p>
        <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
}
