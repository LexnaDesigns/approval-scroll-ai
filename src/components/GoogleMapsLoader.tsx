
import { useEffect, useState } from 'react';

interface GoogleMapsLoaderProps {
  children: React.ReactNode;
}

export const GoogleMapsLoader = ({ children }: GoogleMapsLoaderProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (typeof window.google !== 'undefined') {
      setIsLoaded(true);
      return;
    }

    // Check if API key is stored
    const storedKey = localStorage.getItem('google-maps-api-key');
    if (storedKey) {
      loadGoogleMaps(storedKey);
    } else {
      setShowKeyInput(true);
    }
  }, []);

  const loadGoogleMaps = async (key: string) => {
    if (typeof window.google !== 'undefined') {
      setIsLoaded(true);
      return;
    }

    try {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
        localStorage.setItem('google-maps-api-key', key);
        setShowKeyInput(false);
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setShowKeyInput(true);
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      setShowKeyInput(true);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      loadGoogleMaps(apiKey.trim());
    }
  };

  if (showKeyInput) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Google Maps API Key Required</h3>
          <p className="text-gray-600 mb-4 text-sm">
            To display maps and calculate distances, please enter your Google Maps API key. 
            You can get one from the Google Cloud Console.
          </p>
          <form onSubmit={handleApiKeySubmit}>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter Google Maps API key"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              required
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Load Maps
              </button>
              <button
                type="button"
                onClick={() => setShowKeyInput(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
