'use client';

import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { Property } from '@/lib/types';

const MapPlaceholder = dynamic(
  () => import('@/components/search/MapPlaceholder').then(mod => ({ default: mod.MapPlaceholder })),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl">
        <div className="text-center">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-950 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4 animate-pulse">
            <MapPin size={32} className="text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading interactive map...</p>
        </div>
      </div>
    ),
  }
);

interface PropertyMapWrapperProps {
  properties: Property[];
}

export function PropertyMapWrapper({ properties }: PropertyMapWrapperProps) {
  return <MapPlaceholder properties={properties} />;
}
