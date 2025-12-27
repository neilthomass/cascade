import { MapPin, Bed, Bath, Square, Heart, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export function PropertiesSection() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const properties = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Njc0NTkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Modern Family Home',
      location: 'San Francisco, CA',
      price: '$2,450,000',
      beds: 4,
      baths: 3,
      sqft: '3,200',
      status: 'For Sale',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzY2NzQxNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Luxury Villa with Pool',
      location: 'Palo Alto, CA',
      price: '$4,850,000',
      beds: 5,
      baths: 4,
      sqft: '5,400',
      status: 'For Sale',
      featured: true
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1520106392146-ef585c111254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjY4Mjc5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Downtown Apartment',
      location: 'San Jose, CA',
      price: '$1,250,000',
      beds: 2,
      baths: 2,
      sqft: '1,450',
      status: 'For Sale',
      featured: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1630270744694-d4679f92ac9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBob21lJTIwZ2FyZGVufGVufDF8fHx8MTc2NjgzNTI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Garden Estate',
      location: 'Oakland, CA',
      price: '$3,200,000',
      beds: 4,
      baths: 3,
      sqft: '4,100',
      status: 'For Sale',
      featured: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2Njc0NTkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Contemporary Residence',
      location: 'Berkeley, CA',
      price: '$2,850,000',
      beds: 3,
      baths: 2,
      sqft: '2,800',
      status: 'For Sale',
      featured: false
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzY2NzQxNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Executive Home',
      location: 'Mountain View, CA',
      price: '$5,500,000',
      beds: 6,
      baths: 5,
      sqft: '6,200',
      status: 'For Sale',
      featured: true
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <section id="properties" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">PORTFOLIO</p>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
            Featured Properties
          </h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Discover exceptional homes in the San Francisco Bay Area
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(property.id) ? 'fill-gray-900 text-gray-900' : 'text-gray-900'
                    }`}
                  />
                </button>
                {property.featured && (
                  <div className="absolute top-6 left-6 bg-gray-900 text-white px-4 py-2 text-xs tracking-wider">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl text-gray-900 group-hover:text-gray-600 transition-colors">{property.title}</h3>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>

                <div className="text-2xl text-gray-900">{property.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="px-10 py-4 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 tracking-wide">
            VIEW ALL PROPERTIES
          </button>
        </div>
      </div>
    </section>
  );
}