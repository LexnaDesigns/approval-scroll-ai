
import React, { useMemo } from 'react';
import { SimpleMap } from './SimpleMap';
import { geocodeAddress, calculateDistance } from '@/utils/mapUtils';

interface ClientMapProps {
  clientAddress: string;
}

export const ClientMap = ({ clientAddress }: ClientMapProps) => {
  const dealerAddress = '811 Gardiners Rd, Kingston, ON K7M 7E6';
  
  const mapData = useMemo(() => {
    // Geocode addresses
    const clientCoords = geocodeAddress(clientAddress);
    const dealerCoords = geocodeAddress(dealerAddress);
    
    if (!clientCoords || !dealerCoords) {
      return null;
    }
    
    // Calculate distance
    const distance = calculateDistance(
      clientCoords.lat,
      clientCoords.lng,
      dealerCoords.lat,
      dealerCoords.lng
    );
    
    const locations = [
      {
        lat: clientCoords.lat,
        lng: clientCoords.lng,
        label: 'Client',
        color: '#3B82F6'
      },
      {
        lat: dealerCoords.lat,
        lng: dealerCoords.lng,
        label: 'Dealer',
        color: '#EF4444'
      }
    ];
    
    return {
      locations,
      distance: `${distance} km`
    };
  }, [clientAddress]);
  
  if (!mapData) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600">Unable to display map</p>
      </div>
    );
  }
  
  return (
    <SimpleMap 
      locations={mapData.locations} 
      distance={mapData.distance}
    />
  );
};
