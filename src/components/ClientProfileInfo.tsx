
import { Client } from '@/types/client';
import { Phone, Mail, MapPin, Briefcase, DollarSign, Navigation, Clock, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { geocodeAddress, calculateDistance, estimateDrivingTime } from '@/utils/mapUtils';
import { useMemo } from 'react';

interface ClientProfileInfoProps {
  client: Client;
}

export const ClientProfileInfo = ({ client }: ClientProfileInfoProps) => {
  const dealerAddress = '811 Gardiners Rd, Kingston, ON K7M 7E6';
  
  const distanceInfo = useMemo(() => {
    const clientCoords = geocodeAddress(client.address);
    const dealerCoords = geocodeAddress(dealerAddress);
    
    if (!clientCoords || !dealerCoords) {
      return null;
    }
    
    const distance = calculateDistance(
      clientCoords.lat,
      clientCoords.lng,
      dealerCoords.lat,
      dealerCoords.lng
    );
    
    const drivingTime = estimateDrivingTime(distance);
    
    return { distance, drivingTime };
  }, [client.address]);

  return (
    <div className="w-1/2 p-6 border-r border-gray-200">
      <ScrollArea className="h-full">
        {/* AI Summary */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">AI Credit Summary</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
            {client.fullAiSummary}
          </p>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{client.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{client.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{client.address}</span>
            </div>
          </div>
        </div>

        {/* Distance & Travel Info */}
        {distanceInfo && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Distance to Dealership</h3>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-3">
                <Navigation className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">{distanceInfo.distance} km away</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Est. {distanceInfo.drivingTime} drive</span>
              </div>
            </div>
          </div>
        )}

        {/* Employment Info */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Employment Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Briefcase className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-gray-700 font-medium">{client.jobTitle}</p>
                <p className="text-gray-600 text-sm">{client.employer}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">${client.monthlyIncome.toLocaleString()}/month</span>
            </div>
          </div>
        </div>

        {/* Document Gallery */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
          <div className="grid grid-cols-3 gap-3">
            {client.documents.images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                <FileText className="h-8 w-8 text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        {client.alerts.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Alerts</h3>
            <div className="flex flex-wrap gap-2">
              {client.alerts.map((alert, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {alert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
