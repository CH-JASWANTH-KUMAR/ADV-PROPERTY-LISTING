'use client';

import { MapPin } from 'lucide-react';
import { Property } from '@/lib/types';

interface MapProps {
  properties?: Property[];
}

export function MapPlaceholder({ properties = [] }: MapProps) {
  // Get the first property's location for single property detail pages
  const property = properties[0];
  
  if (!property || !property.location.lat || !property.location.lng) {
    return (
      <div className="h-full min-h-[400px] rounded-2xl bg-gradient-to-br from-blue-50 to-amber-50 border-2 border-gray-200 overflow-hidden relative flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <MapPin size={32} className="text-white" />
          </div>
          <p className="text-gray-600 font-medium">Location information unavailable</p>
        </div>
      </div>
    );
  }

  // Google Maps embed URL - using environment variable for API key
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${property.location.lat},${property.location.lng}&zoom=14`;

  return (
    <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg relative">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '400px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${property.title} location`}
      />
    </div>
  );
}
