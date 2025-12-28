import { MapPin, Bed, Bath, Square } from 'lucide-react';

export function PropertiesSection() {

  const properties = [
    {
      id: 1,
      image: '/images/sleeperave.webp',
      title: '587 Sleeper Ave',
      location: 'Mountain View, CA',
      price: '$4,925,000',
      beds: 5,
      baths: 4,
      sqft: '3,336',
      link: 'https://www.redfin.com/CA/Mountain-View/587-Sleeper-Ave-94040/home/1423108'
    },
    {
      id: 2,
      image: '/images/shadowoaks.webp',
      title: '13962 Shadow Oaks Way',
      location: 'Saratoga, CA',
      price: '$3,850,000',
      beds: 4,
      baths: 3,
      sqft: '2,629',
      link: 'https://www.redfin.com/CA/Saratoga/13962-Shadow-Oaks-Way-95070/home/1623309'
    },
    {
      id: 3,
      image: '/images/wycombe.webp',
      title: '548 Wycombe Ct',
      location: 'San Ramon, CA',
      price: '$3,715,000',
      beds: 6,
      baths: 6.5,
      sqft: '5,632',
      link: 'https://www.redfin.com/CA/San-Ramon/548-Wycombe-Ct-94583/home/18242161'
    },
    {
      id: 4,
      image: '/images/scott.webp',
      title: '2000 Scott Lane',
      location: 'Los Altos, CA',
      price: '$3,330,000',
      beds: 3,
      baths: 2,
      sqft: '2,131',
      link: 'https://www.redfin.com/CA/Los-Altos/2000-Scott-Ln-94024/home/1216357'
    },
    {
      id: 5,
      image: '/images/williamsburg.webp',
      title: '20356 Williamsburg Lane',
      location: 'Saratoga, CA',
      price: '$3,325,000',
      beds: 4,
      baths: 2,
      sqft: '2,534',
      link: 'https://www.redfin.com/CA/Saratoga/20356-Williamsburg-Ln-95070/home/1688732'
    },
    {
      id: 6,
      image: '/images/novara.webp',
      title: '3242 Novara Way',
      location: 'Pleasanton, CA',
      price: '$3,300,000',
      beds: 5,
      baths: 6,
      sqft: '6,997',
      link: 'https://www.redfin.com/CA/Pleasanton/3242-Novara-Way-94566/home/1204973'
    }
  ];

  return (
    <section id="properties" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">PORTFOLIO</p>
          <h2 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
            Featured Transactions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <a
              key={property.id}
              href={property.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <div className="mb-3">
                  <h3 className="text-2xl text-gray-900">{property.title}</h3>
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
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}