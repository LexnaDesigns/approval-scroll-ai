
// Simple coordinate lookup for Canadian cities/addresses
const COORDINATE_DATABASE: Record<string, { lat: number; lng: number }> = {
  // Ontario cities
  'kingston': { lat: 44.2312, lng: -76.4860 },
  'ottawa': { lat: 45.4215, lng: -75.6972 },
  'toronto': { lat: 43.6532, lng: -79.3832 },
  'london': { lat: 42.9849, lng: -81.2453 },
  'hamilton': { lat: 43.2557, lng: -79.8711 },
  'kitchener': { lat: 43.4516, lng: -80.4925 },
  'windsor': { lat: 42.3149, lng: -83.0364 },
  'sudbury': { lat: 46.4917, lng: -80.9930 },
  'thunder bay': { lat: 48.3809, lng: -89.2477 },
  'barrie': { lat: 44.3894, lng: -79.6903 },
  'guelph': { lat: 43.5448, lng: -80.2482 },
  'peterborough': { lat: 44.3091, lng: -78.3197 },
  'belleville': { lat: 44.1628, lng: -77.3832 },
  'cornwall': { lat: 45.0218, lng: -74.7407 },
  'brockville': { lat: 44.5896, lng: -75.6840 },
  'cobourg': { lat: 44.0970, lng: -78.1648 },
  'picton': { lat: 44.0068, lng: -77.1394 },
  'napanee': { lat: 44.2495, lng: -76.9477 },
  'trenton': { lat: 44.1020, lng: -77.5647 },
  'deseronto': { lat: 44.2001, lng: -77.0516 }
};

export const geocodeAddress = (address: string): { lat: number; lng: number } | null => {
  const normalizedAddress = address.toLowerCase();
  
  // Try to find city name in the address
  for (const [city, coords] of Object.entries(COORDINATE_DATABASE)) {
    if (normalizedAddress.includes(city)) {
      // Add some random offset to simulate street-level precision
      const randomOffset = 0.01;
      return {
        lat: coords.lat + (Math.random() - 0.5) * randomOffset,
        lng: coords.lng + (Math.random() - 0.5) * randomOffset
      };
    }
  }
  
  // Default to Kingston area if no match found
  return {
    lat: 44.2312 + (Math.random() - 0.5) * 0.05,
    lng: -76.4860 + (Math.random() - 0.5) * 0.05
  };
};

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance);
};
