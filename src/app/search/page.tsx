'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { MapPlaceholder } from "@/components/search/MapPlaceholder";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PROPERTIES } from "@/lib/data";
import { Property } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialStatus = searchParams.get('status');
  const initialType = searchParams.get('type');
  const initialSell = searchParams.get('sell');
  
  // Filter state
  const [filters, setFilters] = useState({
    propertyTypes: [] as string[],
    priceMin: '',
    priceMax: '',
    bedrooms: null as number | null,
    amenities: [] as string[],
  });

  // Filter properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property: Property) => {
      // URL Param Filters
      if (initialStatus && property.status !== initialStatus) return false;
      if (initialSell === 'true' && property.status !== 'for-sale') return false;
      if (initialType === 'commercial' && property.type !== 'commercial') return false;

      // Search query filter
      if (initialQuery) {
        const query = initialQuery.toLowerCase();
        const matchesQuery = 
          property.title.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query) ||
          property.location.state.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Property type filter
      if (filters.propertyTypes.length > 0) {
        if (!filters.propertyTypes.includes(property.category)) return false;
      }

      // Price filter
      if (filters.priceMin && property.price < parseInt(filters.priceMin)) return false;
      if (filters.priceMax && property.price > parseInt(filters.priceMax)) return false;

      // Bedrooms filter
      if (filters.bedrooms && property.specs.bedrooms) {
        if (property.specs.bedrooms < filters.bedrooms) return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          property.features.some(feature => feature.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [initialQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-5xl font-serif font-bold text-blue-950 mb-2">Find Your Next Property</h1>
          {initialQuery && (
            <p className="text-gray-600 text-lg">Showing results for &quot;{initialQuery}&quot; - {filteredProperties.length} properties found</p>
          )}
          {!initialQuery && (
            <p className="text-gray-600 text-lg">Showing {filteredProperties.length} properties</p>
          )}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
           <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Listenings Grid & Map */}
        <div className="lg:col-span-3 space-y-6">
           {/* Mobile Filter Toggle could go here */}
           
           {/* Map Removed as per request */}
           
           {filteredProperties.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {filteredProperties.map((property) => (
                 <PropertyCard key={property.id} property={property} />
               ))}
             </div>
           ) : (
             <div className="text-center py-20">
               <p className="text-xl text-gray-600 mb-4">No properties found matching your criteria</p>
               <p className="text-gray-400">Try adjusting your filters or search terms</p>
             </div>
           )}
           
           {/* Pagination Mock */}
           {filteredProperties.length > 0 && (
             <div className="flex justify-center mt-12 space-x-2">
               <button className="px-4 py-2 border-2 border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">Previous</button>
               <button className="px-4 py-2 bg-blue-950 text-white rounded-md font-bold">1</button>
               <button className="px-4 py-2 border-2 border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">2</button>
               <button className="px-4 py-2 border-2 border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">3</button>
               <button className="px-4 py-2 border-2 border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">Next</button>
             </div>
           )}
        </div>
      </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="text-gray-500">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}
