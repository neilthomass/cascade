import { Link } from 'react-router-dom';

interface CityLink {
  name: string;
  path: string;
  price: string;
}

// Define all cities with their related neighbors
const cityData: Record<string, { county: string; neighbors: string[] }> = {
  'sfo': { county: 'San Francisco', neighbors: ['daly-city', 'south-san-francisco', 'oakland', 'berkeley'] },
  'san-jose': { county: 'Santa Clara', neighbors: ['santa-clara', 'milpitas', 'campbell', 'los-gatos', 'saratoga', 'cupertino'] },
  'saratoga': { county: 'Santa Clara', neighbors: ['los-gatos', 'cupertino', 'san-jose', 'campbell'] },
  'los-altos': { county: 'Santa Clara', neighbors: ['palo-alto', 'mountain-view', 'cupertino', 'sunnyvale'] },
  'mountain-view': { county: 'Santa Clara', neighbors: ['palo-alto', 'los-altos', 'sunnyvale'] },
  'palo-alto': { county: 'Santa Clara', neighbors: ['menlo-park', 'los-altos', 'mountain-view', 'atherton'] },
  'sunnyvale': { county: 'Santa Clara', neighbors: ['mountain-view', 'cupertino', 'santa-clara', 'los-altos'] },
  'cupertino': { county: 'Santa Clara', neighbors: ['sunnyvale', 'saratoga', 'los-altos', 'san-jose'] },
  'santa-clara': { county: 'Santa Clara', neighbors: ['san-jose', 'sunnyvale', 'milpitas'] },
  'milpitas': { county: 'Santa Clara', neighbors: ['san-jose', 'fremont', 'santa-clara'] },
  'campbell': { county: 'Santa Clara', neighbors: ['los-gatos', 'san-jose', 'saratoga'] },
  'los-gatos': { county: 'Santa Clara', neighbors: ['campbell', 'saratoga', 'san-jose'] },
  'pleasanton': { county: 'Alameda', neighbors: ['dublin', 'san-ramon', 'fremont'] },
  'dublin': { county: 'Alameda', neighbors: ['pleasanton', 'san-ramon', 'fremont'] },
  'san-ramon': { county: 'Contra Costa', neighbors: ['dublin', 'pleasanton', 'danville', 'walnut-creek'] },
  'walnut-creek': { county: 'Contra Costa', neighbors: ['lafayette', 'danville', 'orinda', 'san-ramon'] },
  'danville': { county: 'Contra Costa', neighbors: ['san-ramon', 'walnut-creek', 'lafayette'] },
  'lafayette': { county: 'Contra Costa', neighbors: ['orinda', 'walnut-creek', 'moraga'] },
  'orinda': { county: 'Contra Costa', neighbors: ['lafayette', 'moraga', 'berkeley'] },
  'moraga': { county: 'Contra Costa', neighbors: ['lafayette', 'orinda'] },
  'fremont': { county: 'Alameda', neighbors: ['newark', 'union-city', 'milpitas', 'pleasanton'] },
  'newark': { county: 'Alameda', neighbors: ['fremont', 'union-city'] },
  'union-city': { county: 'Alameda', neighbors: ['fremont', 'hayward', 'newark'] },
  'hayward': { county: 'Alameda', neighbors: ['union-city', 'fremont', 'oakland', 'alameda'] },
  'alameda': { county: 'Alameda', neighbors: ['oakland', 'berkeley'] },
  'berkeley': { county: 'Alameda', neighbors: ['oakland', 'alameda', 'orinda'] },
  'oakland': { county: 'Alameda', neighbors: ['berkeley', 'alameda', 'hayward', 'sfo'] },
  'san-mateo': { county: 'San Mateo', neighbors: ['burlingame', 'foster-city', 'belmont', 'redwood-city'] },
  'burlingame': { county: 'San Mateo', neighbors: ['san-mateo', 'hillsborough', 'south-san-francisco'] },
  'redwood-city': { county: 'San Mateo', neighbors: ['san-carlos', 'menlo-park', 'atherton', 'woodside'] },
  'menlo-park': { county: 'San Mateo', neighbors: ['palo-alto', 'atherton', 'redwood-city', 'woodside'] },
  'atherton': { county: 'San Mateo', neighbors: ['menlo-park', 'redwood-city', 'woodside'] },
  'woodside': { county: 'San Mateo', neighbors: ['atherton', 'portola-valley', 'redwood-city', 'menlo-park'] },
  'portola-valley': { county: 'San Mateo', neighbors: ['woodside', 'menlo-park', 'palo-alto'] },
  'foster-city': { county: 'San Mateo', neighbors: ['san-mateo', 'belmont', 'redwood-city'] },
  'san-carlos': { county: 'San Mateo', neighbors: ['belmont', 'redwood-city', 'san-mateo'] },
  'belmont': { county: 'San Mateo', neighbors: ['san-carlos', 'san-mateo', 'foster-city', 'hillsborough'] },
  'hillsborough': { county: 'San Mateo', neighbors: ['burlingame', 'san-mateo', 'belmont'] },
  'daly-city': { county: 'San Mateo', neighbors: ['sfo', 'south-san-francisco', 'pacifica'] },
  'south-san-francisco': { county: 'San Mateo', neighbors: ['daly-city', 'burlingame', 'sfo'] },
  'pacifica': { county: 'San Mateo', neighbors: ['daly-city', 'half-moon-bay', 'sfo'] },
  'half-moon-bay': { county: 'San Mateo', neighbors: ['pacifica', 'woodside', 'redwood-city'] },
};

const cityInfo: Record<string, { name: string; price: string }> = {
  'sfo': { name: 'San Francisco', price: '$1.35M' },
  'san-jose': { name: 'San Jose', price: '$1.45M' },
  'saratoga': { name: 'Saratoga', price: '$4.2M' },
  'los-altos': { name: 'Los Altos', price: '$4.5M' },
  'mountain-view': { name: 'Mountain View', price: '$2.1M' },
  'palo-alto': { name: 'Palo Alto', price: '$3.8M' },
  'sunnyvale': { name: 'Sunnyvale', price: '$1.9M' },
  'cupertino': { name: 'Cupertino', price: '$2.8M' },
  'santa-clara': { name: 'Santa Clara', price: '$1.65M' },
  'milpitas': { name: 'Milpitas', price: '$1.45M' },
  'campbell': { name: 'Campbell', price: '$1.8M' },
  'los-gatos': { name: 'Los Gatos', price: '$2.9M' },
  'pleasanton': { name: 'Pleasanton', price: '$1.6M' },
  'dublin': { name: 'Dublin', price: '$1.35M' },
  'san-ramon': { name: 'San Ramon', price: '$1.5M' },
  'walnut-creek': { name: 'Walnut Creek', price: '$1.1M' },
  'danville': { name: 'Danville', price: '$2.2M' },
  'lafayette': { name: 'Lafayette', price: '$2.1M' },
  'orinda': { name: 'Orinda', price: '$2M' },
  'moraga': { name: 'Moraga', price: '$1.7M' },
  'fremont': { name: 'Fremont', price: '$1.55M' },
  'newark': { name: 'Newark', price: '$1.2M' },
  'union-city': { name: 'Union City', price: '$1.15M' },
  'hayward': { name: 'Hayward', price: '$950K' },
  'alameda': { name: 'Alameda', price: '$1.25M' },
  'berkeley': { name: 'Berkeley', price: '$1.4M' },
  'oakland': { name: 'Oakland', price: '$850K' },
  'san-mateo': { name: 'San Mateo', price: '$1.75M' },
  'burlingame': { name: 'Burlingame', price: '$2.4M' },
  'redwood-city': { name: 'Redwood City', price: '$1.8M' },
  'menlo-park': { name: 'Menlo Park', price: '$3.2M' },
  'atherton': { name: 'Atherton', price: '$7.5M' },
  'woodside': { name: 'Woodside', price: '$4.5M' },
  'portola-valley': { name: 'Portola Valley', price: '$4.8M' },
  'foster-city': { name: 'Foster City', price: '$1.9M' },
  'san-carlos': { name: 'San Carlos', price: '$2.2M' },
  'belmont': { name: 'Belmont', price: '$2M' },
  'hillsborough': { name: 'Hillsborough', price: '$5.5M' },
  'daly-city': { name: 'Daly City', price: '$1.1M' },
  'south-san-francisco': { name: 'South San Francisco', price: '$1.2M' },
  'pacifica': { name: 'Pacifica', price: '$1.3M' },
  'half-moon-bay': { name: 'Half Moon Bay', price: '$1.9M' },
};

interface RelatedCitiesProps {
  currentCity: string;
}

export function RelatedCities({ currentCity }: RelatedCitiesProps) {
  const data = cityData[currentCity];
  if (!data) return null;

  const relatedCities: CityLink[] = data.neighbors
    .filter(path => cityInfo[path])
    .map(path => ({
      name: cityInfo[path].name,
      path: `/${path}`,
      price: cityInfo[path].price,
    }));

  if (relatedCities.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Explore Nearby Cities</h2>
        <p className="text-gray-500 font-light mb-8">
          Compare real estate options in neighboring communities
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedCities.map((city) => (
            <Link
              key={city.path}
              to={city.path}
              className="group p-4 border border-gray-200 hover:border-gray-900 transition-colors"
            >
              <div className="text-gray-900 font-medium group-hover:text-gray-600 transition-colors">
                {city.name}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Median: {city.price}
              </div>
            </Link>
          ))}
        </div>

        {/* Browse all cities link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            We serve 40+ Bay Area cities across Santa Clara, San Mateo, Alameda, and Contra Costa counties.
          </p>
        </div>
      </div>
    </section>
  );
}
