import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
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
    <section id="properties" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">FEATURED PROPERTIES</h2>
          <p className="text-xl text-gray-600">Discover Your Dream Home in the Bay Area</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-64">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-md">
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-md">
                  {property.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-900">{property.price}</span>
                  <button className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-colors">
            VIEW ALL PROPERTIES
          </button>
        </div>
      </div>
    </section>
  );
}
