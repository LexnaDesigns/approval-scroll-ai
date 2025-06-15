
import { Client } from '@/types/client';
import { ClientHeader } from '@/components/ClientHeader';
import { ClientAlerts } from '@/components/ClientAlerts';
import { ClientSummary } from '@/components/ClientSummary';
import { ClientDocuments } from '@/components/ClientDocuments';
import { ClientActions } from '@/components/ClientActions';

interface ClientCardProps {
  client: Client;
  onAction: (client: Client, action: string) => void;
  onSelect: (client: Client) => void;
  isHotLead?: boolean;
  hasManagerAlert?: boolean;
  onClearAlert?: () => void;
}

export const ClientCard = ({ 
  client, 
  onAction, 
  onSelect, 
  isHotLead = false, 
  hasManagerAlert = false,
  onClearAlert 
}: ClientCardProps) => {
  const cardClasses = `
    bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden 
    hover:shadow-lg transition-all duration-300 animate-fade-in
    ${isHotLead ? 'animate-pulse ring-2 ring-orange-400 ring-opacity-75' : ''}
    ${hasManagerAlert ? 'ring-2 ring-red-400 ring-opacity-75' : ''}
  `;

  return (
    <div className={cardClasses}>
      <div 
        className="p-3 cursor-pointer hover:bg-gray-50 transition-colors relative"
        onClick={() => onSelect(client)}
      >
        <ClientAlerts isHotLead={isHotLead} hasManagerAlert={hasManagerAlert} />
        
        <div className="flex items-center justify-between mb-2 pr-16">
          <ClientHeader client={client} isHotLead={isHotLead} />
        </div>

        <ClientSummary aiSummary={client.aiSummary} />
        
        <ClientDocuments 
          documents={client.documents} 
          communications={client.communications} 
        />
      </div>

      <ClientActions 
        client={client}
        onAction={onAction}
        hasManagerAlert={hasManagerAlert}
        onClearAlert={onClearAlert}
      />
    </div>
  );
};
