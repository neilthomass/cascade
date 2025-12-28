import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      address: '5069 Pharlap Ave, San Jose, CA',
      type: 'First-Time Buyer',
      price: '$720K',
      rating: 5,
      image: '/images/5069-pharlap-ave-hero.webp',
      text: 'When we started looking for a house, we weren\'t sure how to proceed. Manoj walked us through the process and really simplified it for us. He was very patient and understanding, and never pushed us into buying something we weren\'t fully satisfied with. He showed great professionalism and utmost respect for our choices. We would highly recommend Manoj to anybody.'
    },
    {
      id: 2,
      address: '1824 Pine Hollow Cir, San Jose, CA',
      type: 'First-Time Buyer',
      price: '$820K',
      rating: 5,
      image: '/images/pine_hollow.webp',
      text: 'Since we were first time buyers, we were initially overwhelmed with all the details. But Manoj guided us through the entire process with ease. He provided detailed analysis on all the houses we were interested in before we considered making an offer. His attention to detail gave us confidence in making a decision quickly. He was always available to answer our queries.'
    },
    {
      id: 3,
      address: '214 Kent Place, San Ramon, CA',
      type: 'First-Time Buyer',
      price: '$875K',
      rating: 5,
      image: '/images/kent.webp',
      text: 'Manoj is an excellent agent and a gem of a person. Throughout our search, he was patient and answered all our questions. He even stopped us from making hasty decisions. With his guidance, the whole process from offer to closing went very smoothly. We highly recommend him.'
    },
    {
      id: 4,
      address: '7156 Emerald Ave, Dublin, CA',
      type: 'Home Seller',
      price: '$840K',
      rating: 5,
      image: '/images/emerald.webp',
      text: 'Manoj is truly professional and well organized. I have dealt with other agents and Manoj outperforms all of them. He communicates very well with customers and clients. Looking forward to doing more transactions with him.'
    },
    {
      id: 5,
      address: '3440 65th Ave, Oakland, CA',
      type: 'Multi-Family Buyer',
      price: '$782K',
      rating: 5,
      image: '/images/65th.webp',
      text: 'I have purchased two homes using Manoj\'s services and was highly satisfied both times. He is not pushy, he is a great negotiator, and he is always on your side. I have seen many buyers get burned with agents who did not know the market or were not good at negotiation. I don\'t think I will ever use another agent\'s services in the Bay Area.'
    },
    {
      id: 6,
      address: 'San Jose, CA',
      type: 'First-Time Buyer',
      price: '$1.27M',
      rating: 5,
      image: '',
      text: 'Manoj is excellent at guiding first time buyers like myself. He explained all the details about home ownership and gave a fair, unbiased opinion. His communication and negotiation skills really helped close the deal in our favor. The entire process was smooth with no hiccups. I would highly recommend Manoj to anyone looking to own a home.'
    }
  ];

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % testimonials.length);
  }, [currentIndex, testimonials.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, testimonials.length, goToSlide]);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-32 bg-white">
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
          {/* Main Card */}
          <div className="grid lg:grid-cols-2 gap-0 bg-gray-50 overflow-hidden">
            {/* Image Section */}
            <div
              className={`relative aspect-[4/3] lg:aspect-auto bg-gray-200 transition-all duration-500 ease-out ${
                isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            >
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.address}
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

              {/* Price Badge */}
              <div className="absolute top-6 left-6 bg-gray-900 text-white px-4 py-2">
                <span className="text-lg font-light">{current.price}</span>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`p-10 lg:p-16 flex flex-col justify-center transition-all duration-500 ease-out ${
                isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-gray-200 mb-8" />

              {/* Testimonial Text */}
              <blockquote className="text-xl lg:text-2xl text-gray-800 font-light leading-relaxed mb-10">
                "{current.text}"
              </blockquote>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gray-900 text-gray-900" />
                ))}
              </div>

              {/* Address & Type */}
              <div className="pt-6 border-t border-gray-200">
                <div className="text-gray-900 font-medium mb-1">{current.address}</div>
                <div className="text-sm text-gray-500 tracking-wide">{current.type}</div>
              </div>
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
                    index === currentIndex
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

        </div>

        {/* Properties Map */}
        <div className="mt-20">
          <h3 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8">
            Our Transactions
          </h3>
          <div className="overflow-hidden" style={{ height: 485 }}>
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=1P_jfwFUk4ODIY_Rr-dvx0KkRCUxP7og&ehbc=2E312F&noprof=1"
              width="100%"
              height="560"
              style={{ border: 0, position: 'relative', top: -60 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Properties Map"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
