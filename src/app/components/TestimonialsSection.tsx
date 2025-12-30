import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Testimonial {
  id: string;
  address: string;
  type: string;
  price: string;
  rating: number;
  image: string;
  text: string;
}

interface ApiTestimonial {
  id: number;
  property_address: string;
  testimonial_text: string;
  photo_url: string | null;
  display_type: string | null;
  display_price: string | null;
  approved_at: string;
}

const TESTIMONIALS_API = 'https://cascaderealtors.com/api/testimonials/approved';

function mapApiTestimonial(api: ApiTestimonial): Testimonial {
  return {
    id: `${api.id}`,
    address: api.property_address,
    type: api.display_type || 'Client',
    price: api.display_price || '',
    rating: 5,
    image: api.photo_url || '',
    text: api.testimonial_text,
  };
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved testimonials from API
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(TESTIMONIALS_API);
        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.testimonials && data.testimonials.length > 0) {
          const apiTestimonials = data.testimonials.map(mapApiTestimonial);
          setTestimonials(apiTestimonials);
          setCurrentIndex(1);
          setEnableTransition(false);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  // Clone first and last slides for infinite loop effect
  const extendedTestimonials = [
    testimonials[testimonials.length - 1],
    ...testimonials,
    testimonials[0],
  ];

  const goToSlide = useCallback((index: number) => {
    setEnableTransition(true);
    setCurrentIndex(index + 1);
  }, []);

  const nextSlide = useCallback(() => {
    setEnableTransition(true);
    setCurrentIndex(prev => {
      if (prev >= testimonials.length + 1) return prev;
      return prev + 1;
    });
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setEnableTransition(true);
    setCurrentIndex(prev => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  }, []);

  // Handle infinite loop reset after transition ends
  useEffect(() => {
    if (!enableTransition) return;

    if (currentIndex === 0 || currentIndex === testimonials.length + 1) {
      const timeout = setTimeout(() => {
        setEnableTransition(false);
        if (currentIndex === 0) {
          setCurrentIndex(testimonials.length);
        } else {
          setCurrentIndex(1);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, testimonials.length, enableTransition]);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Get the actual index for the dots
  const actualIndex = currentIndex === 0
    ? testimonials.length - 1
    : currentIndex === testimonials.length + 1
      ? 0
      : currentIndex - 1;

  // Don't render while loading or if no testimonials
  if (loading) {
    return (
      <section id="testimonials" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">TESTIMONIALS</p>
            <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Client Stories
            </h2>
          </div>
          <div className="bg-gray-50 p-16 text-center">
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <section id="testimonials" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">TESTIMONIALS</p>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Client Stories
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Hear from homeowners and investors we've helped
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides Container */}
          <div className="overflow-hidden">
            <div
              className={`flex ${enableTransition ? 'transition-transform duration-500 ease-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="w-full flex-shrink-0">
                  {/* Main Card */}
                  <div className="grid lg:grid-cols-2 gap-0 bg-gray-50 overflow-hidden">
                    {/* Image Section */}
                    <div className="relative aspect-[4/3] lg:aspect-auto bg-gray-200">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.address}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <div className="w-16 h-16 border-2 border-gray-300 mx-auto mb-4 flex items-center justify-center">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            <p className="text-sm tracking-wide">Property Image</p>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Content Section */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center">
                      {/* Quote Icon */}
                      <Quote className="w-12 h-12 text-gray-200 mb-8" />

                      {/* Testimonial Text */}
                      <blockquote className="text-xl lg:text-2xl text-gray-800 font-light leading-relaxed mb-10">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gray-900 text-gray-900" />
                        ))}
                      </div>

                      {/* Address & Type */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="text-gray-900 font-medium mb-1">{testimonial.address}</div>
                        <div className="text-sm text-gray-500 tracking-wide">{testimonial.type}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-[2px] transition-all duration-300 ${
                    index === actualIndex
                      ? 'w-8 bg-gray-900'
                      : 'w-4 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Submit testimonial link */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 font-light mb-2">Worked with us recently?</p>
            <Link
              to="/submit-testimonial"
              className="text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              Share your experience
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
