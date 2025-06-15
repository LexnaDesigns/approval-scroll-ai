
import { Client } from '@/types/client';
import { Badge } from '@/components/ui/badge';

interface ClientHeaderProps {
  client: Client;
  isHotLead: boolean;
}

export const ClientHeader = ({ client, isHotLead }: ClientHeaderProps) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'bg-blue-500';
      case 'Docs In': return 'bg-yellow-500';
      case 'Presenting Options': return 'bg-purple-500';
      case 'Funding': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 650) return 'text-green-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm ${isHotLead ? 'animate-pulse' : ''}`}>
        {client.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-base">{client.name}</h3>
        <div className="flex items-center space-x-3">
          <p className={`font-medium text-xs ${getCreditScoreColor(client.creditScore)}`}>
            {client.creditScore} FICO
          </p>
          <Badge className={`${getStageColor(client.stage)} text-white text-xs px-2 py-1`}>
            {client.stage}
          </Badge>
        </div>
      </div>
    </div>
  );
};
