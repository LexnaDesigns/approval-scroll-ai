
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface ClientMapProps {
  clientAddress: string;
}

export const ClientMap = ({ clientAddress }: ClientMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<string>('');
  const [mapError, setMapError] = useState<string>('');
  const dealerAddress = '811 Gardiners Rd, Kingston, ON K7M 7E6';

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance);
  };

  useEffect(() => {
    const initMap = async () => {
      // Check if Google Maps is available
      if (typeof window.google === 'undefined') {
        setMapError('Google Maps not loaded. Please add your Google Maps API key.');
        return;
      }

      if (!mapRef.current) return;

      try {
        const geocoder = new window.google.maps.Geocoder();
        
        // Geocode client address
        const clientResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: clientAddress }, (results, status) => {
            if (status === 'OK' && results) {
              resolve(results);
            } else {
              reject(new Error('Failed to geocode client address'));
            }
          });
        });

        // Geocode dealer address
        const dealerResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address: dealerAddress }, (results, status) => {
            if (status === 'OK' && results) {
              resolve(results);
            } else {
              reject(new Error('Failed to geocode dealer address'));
            }
          });
        });

        const clientLocation = clientResult[0].geometry.location;
        const dealerLocation = dealerResult[0].geometry.location;

        // Calculate distance
        const dist = calculateDistance(
          clientLocation.lat(),
          clientLocation.lng(),
          dealerLocation.lat(),
          dealerLocation.lng()
        );
        setDistance(`${dist} km`);

        // Create map
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 8,
          center: clientLocation,
          mapTypeId: 'roadmap',
        });

        // Add client marker
        new window.google.maps.Marker({
          position: clientLocation,
          map: map,
          title: 'Client Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3B82F6"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });

        // Add dealer marker
        new window.google.maps.Marker({
          position: dealerLocation,
          map: map,
          title: 'Dealer Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EF4444"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        });

        // Add polyline between locations
        new window.google.maps.Polyline({
          path: [clientLocation, dealerLocation],
          geodesic: true,
          strokeColor: '#3B82F6',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          map: map,
        });

        // Adjust map bounds to show both markers
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(clientLocation);
        bounds.extend(dealerLocation);
        map.fitBounds(bounds);

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to load map. Please check the addresses.');
      }
    };

    initMap();
  }, [clientAddress]);

  if (mapError) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600">{mapError}</p>
        <p className="text-xs text-gray-500 mt-1">
          Distance calculation unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Location & Distance</h4>
        {distance && (
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {distance} away
          </span>
        )}
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-48 bg-gray-200 rounded-lg"
        style={{ minHeight: '192px' }}
      />
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Client</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Dealer (Kingston)</span>
        </div>
      </div>
    </div>
  );
};
