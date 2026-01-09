import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Ruler, MapPin } from 'lucide-react';
import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    const crores = price / 10000000;
    return `₹${crores.toFixed(2)} Cr`;
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-950">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.mainImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-amber-500 text-blue-950 px-3 py-1 rounded-full text-xs font-bold uppercase">
             {property.type}
        </div>
        <div className="absolute top-4 right-4 bg-blue-950 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
             {property.status.replace('-', ' ')}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
            <div>
                 <h3 className="text-xl font-serif font-bold text-blue-950 line-clamp-1 group-hover:text-amber-600 transition-colors">{property.title}</h3>
                 <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin size={14} className="mr-1 text-amber-500" />
                    <span>{property.location.city}, {property.location.state}</span>
                 </div>
            </div>
            <p className="text-lg font-bold text-blue-950 whitespace-nowrap">
                {formatPrice(property.price)}
                {property.status === 'for-rent' && <span className="text-sm text-gray-500 font-normal">/mo</span>}
            </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 text-gray-600">
             <div className="flex items-center gap-2">
                 <Bed size={18} />
                 <span className="text-sm font-medium">{property.specs.bedrooms || '-'} Beds</span>
             </div>
             <div className="flex items-center gap-2">
                 <Bath size={18} />
                 <span className="text-sm font-medium">{property.specs.bathrooms || '-'} Baths</span>
             </div>
             <div className="flex items-center gap-2">
                 <Ruler size={18} />
                 <span className="text-sm font-medium">{property.specs.sqft.toLocaleString()} Sq Ft</span>
             </div>
        </div>

        <div className="mt-6">
             <Link href={`/property/${property.id}`} className="block w-full text-center py-3 bg-blue-950 hover:bg-amber-500 text-white hover:text-blue-950 rounded-lg font-bold transition-all duration-300">
                View Details
             </Link>
        </div>
      </div>
    </div>
  );
}
