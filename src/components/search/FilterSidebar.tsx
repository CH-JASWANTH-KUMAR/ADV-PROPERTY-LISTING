'use client';

import { Button } from "@/components/ui/Button";

interface FilterSidebarProps {
  filters: {
    propertyTypes: string[];
    priceMin: string;
    priceMax: string;
    bedrooms: number | null;
    amenities: string[];
  };
  setFilters: (filters: any) => void;
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const handlePropertyTypeChange = (type: string) => {
    const newTypes = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter(t => t !== type)
      : [...filters.propertyTypes, type];
    setFilters({ ...filters, propertyTypes: newTypes });
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };

  const handleBedroomSelect = (num: number) => {
    setFilters({ ...filters, bedrooms: filters.bedrooms === num ? null : num });
  };

  const clearFilters = () => {
    setFilters({
      propertyTypes: [],
      priceMin: '',
      priceMax: '',
      bedrooms: null,
      amenities: [],
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md space-y-8 sticky top-28">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-blue-950 text-lg">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-amber-600 hover:text-amber-700 font-medium">Clear All</button>
      </div>

      <div>
        <h3 className="font-semibold text-blue-950 mb-4">Property Type</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.propertyTypes.includes('house')}
              onChange={() => handlePropertyTypeChange('house')}
              className="h-4 w-4 rounded border-gray-300 text-blue-950 focus:ring-blue-950" 
            />
            <span className="text-gray-700">House</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.propertyTypes.includes('apartment') || filters.propertyTypes.includes('condo')}
              onChange={() => {
                handlePropertyTypeChange('apartment');
                handlePropertyTypeChange('condo');
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-950 focus:ring-blue-950" 
            />
            <span className="text-gray-700">Apartment / Condo</span>
          </label>
           <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={filters.propertyTypes.includes('office') || filters.propertyTypes.includes('retail')}
              onChange={() => {
                handlePropertyTypeChange('office');
                handlePropertyTypeChange('retail');
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue-950 focus:ring-blue-950" 
            />
            <span className="text-gray-700">Commercial</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-blue-950 mb-4">Price Range</h3>
        <div className="flex gap-4">
           <input 
             type="number" 
             placeholder="Min" 
             value={filters.priceMin}
             onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950" 
           />
           <input 
             type="number" 
             placeholder="Max" 
             value={filters.priceMax}
             onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-950" 
           />
        </div>
      </div>

       <div>
        <h3 className="font-semibold text-blue-950 mb-4">Bedrooms</h3>
        <div className="flex gap-2">
           {[1, 2, 3, 4, 5].map((num) => (
             <button 
               key={num} 
               onClick={() => handleBedroomSelect(num)}
               className={`h-10 w-10 rounded-md border-2 transition-colors text-sm font-medium ${
                 filters.bedrooms === num 
                   ? 'border-blue-950 bg-blue-950 text-white' 
                   : 'border-gray-300 text-gray-700 hover:border-blue-950'
               }`}
             >
               {num === 5 ? '5+' : num}
             </button>
           ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-blue-950 mb-4">Amenities</h3>
        <div className="space-y-3">
           {['Pool', 'Waterfront', 'Gym', 'Parking', 'Doorman'].map((amenity) => (
             <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-950 focus:ring-blue-950" 
                />
                <span className="text-gray-700">{amenity}</span>
            </label>
           ))}
        </div>
      </div>
    </div>
  );
}
