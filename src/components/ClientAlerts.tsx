
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface ClientAlertsProps {
  isHotLead: boolean;
  hasManagerAlert: boolean;
}

export const ClientAlerts = ({ isHotLead, hasManagerAlert }: ClientAlertsProps) => {
  if (!isHotLead && !hasManagerAlert) return null;

  return (
    <div className="absolute top-2 right-2 flex gap-1">
      {hasManagerAlert && (
        <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Alert
        </Badge>
      )}
      {isHotLead && (
        <Badge className="bg-orange-500 text-white text-xs px-2 py-1 animate-pulse">
          🔥 Hot
        </Badge>
      )}
    </div>
  );
};
