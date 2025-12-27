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
    <section className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">CLIENT TESTIMONIALS</h2>
          <p className="text-xl text-blue-200">What Our Happy Clients Say About Us</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white text-gray-900 p-8 rounded-lg shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-12 h-12 text-blue-900 opacity-20" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-6 italic">{testimonial.text}</p>

              <div className="flex items-center gap-4 border-t pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
