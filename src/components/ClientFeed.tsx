
import { Client } from '@/types/client';
import { ClientCard } from '@/components/ClientCard';
import { Loader2 } from 'lucide-react';

interface ClientFeedProps {
  clients: Client[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onAction: (client: Client, action: string) => void;
  onSelect: (client: Client) => void;
  hotLeads: Set<string>;
  managerAlerts: Set<string>;
  clearManagerAlert: (clientId: string) => void;
}

export const ClientFeed = ({ 
  clients, 
  isLoading, 
  isError, 
  error,
  onAction,
  onSelect,
  hotLeads,
  managerAlerts,
  clearManagerAlert
}: ClientFeedProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
        <span className="ml-2 text-gray-500">Loading Clients...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading clients: {error?.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onAction={onAction}
          onSelect={onSelect}
          isHotLead={hotLeads.has(client.id)}
          hasManagerAlert={managerAlerts.has(client.id)}
          onClearAlert={() => clearManagerAlert(client.id)}
        />
      ))}
    </div>
  );
};
