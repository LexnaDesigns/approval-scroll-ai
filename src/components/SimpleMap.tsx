
import React from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  label: string;
  color: string;
}

interface SimpleMapProps {
  locations: Location[];
  distance?: string;
}

export const SimpleMap = ({ locations, distance }: SimpleMapProps) => {
  // Calculate bounds for all locations
  const lats = locations.map(loc => loc.lat);
  const lngs = locations.map(loc => loc.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Add padding to bounds
  const padding = 0.05;
  const bounds = {
    minLat: minLat - padding,
    maxLat: maxLat + padding,
    minLng: minLng - padding,
    maxLng: maxLng + padding
  };

  // Convert lat/lng to SVG coordinates
  const latLngToSVG = (lat: number, lng: number) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 300;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 200;
    return { x, y };
  };

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
      
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 h-48 overflow-hidden">
        {/* Grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Map content */}
        <svg className="w-full h-full" viewBox="0 0 300 200">
          {/* Connection line between locations */}
          {locations.length === 2 && (
            <line
              x1={latLngToSVG(locations[0].lat, locations[0].lng).x}
              y1={latLngToSVG(locations[0].lat, locations[0].lng).y}
              x2={latLngToSVG(locations[1].lat, locations[1].lng).x}
              y2={latLngToSVG(locations[1].lat, locations[1].lng).y}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.8"
            />
          )}

          {/* Location markers */}
          {locations.map((location, index) => {
            const pos = latLngToSVG(location.lat, location.lng);
            return (
              <g key={index}>
                {/* Marker shadow */}
                <circle
                  cx={pos.x + 1}
                  cy={pos.y + 1}
                  r="8"
                  fill="rgba(0,0,0,0.2)"
                />
                {/* Marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="8"
                  fill={location.color}
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Inner dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="3"
                  fill="white"
                />
                {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y - 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#374151"
                  fontWeight="600"
                >
                  {location.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Compass */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full p-2 shadow-sm">
          <div className="w-6 h-6 relative">
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-600">N</div>
            <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-red-500 transform -translate-x-0.5"></div>
          </div>
        </div>
      </div>

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
