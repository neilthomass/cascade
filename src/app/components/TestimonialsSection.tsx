import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Martinez',
      role: 'Homebuyer',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY2NzUzNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      text: 'Working with Cascade California Realty was an incredible experience. They found us the perfect home in San Francisco and made the entire process smooth and stress-free. Their attention to detail and market knowledge is unmatched!'
    },
    {
      id: 2,
      name: 'David Chen',
      role: 'Property Investor',
      image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGhvbWV8ZW58MXx8fHwxNzY2NzcxODA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      text: 'As an investor, I needed a team that understood the Bay Area market inside and out. Cascade delivered beyond my expectations. They helped me secure multiple properties with excellent ROI. Highly recommend!'
    },
    {
      id: 3,
      name: 'Emily Thompson',
      role: 'First-time Buyer',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnR8ZW58MXx8fHwxNzY2NzUzNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 5,
      text: 'Being a first-time homebuyer can be overwhelming, but the team at Cascade made it easy. They patiently walked me through every step and answered all my questions. I couldn\'t be happier with my new home!'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">TESTIMONIALS</p>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Client Stories
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            What our happy clients say about us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 p-10 hover:border-gray-900 transition-colors duration-300 group">
              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-8 h-[1px] bg-gray-900"></div>
                ))}
              </div>

              <p className="text-gray-700 font-light leading-relaxed mb-10 text-lg">{testimonial.text}</p>

              <div className="pt-6 border-t border-gray-200">
                <div className="font-light text-gray-900 mb-1">{testimonial.name}</div>
                <div className="text-sm text-gray-500 tracking-wide">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}