
import { Client } from '@/types/client';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ClientProfileHeaderProps {
  client: Client;
  onClose: () => void;
}

export const ClientProfileHeader = ({ client, onClose }: ClientProfileHeaderProps) => {
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
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {client.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <p className={`font-semibold text-lg ${getCreditScoreColor(client.creditScore) === 'text-green-600' ? 'text-green-200' : getCreditScoreColor(client.creditScore) === 'text-yellow-600' ? 'text-yellow-200' : 'text-red-200'}`}>
              Credit Score: {client.creditScore}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={`${getStageColor(client.stage)} text-white px-4 py-2 text-sm`}>
            {client.stage}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
