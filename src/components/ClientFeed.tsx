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
  // Accept these new props:
}: ClientFeedProps & {
  likedClientIds?: Set<string>;
  onLikeClient?: (client: Client) => void;
  isLikedFor?: (client: Client) => boolean;
}) => {
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

  // If we have a likedClients set, show liked ones on top
  let sortedClients = clients;
  if (typeof (onSelect as any)?.likedClientIds === "object") {
    const likeIds = Array.from((onSelect as any).likedClientIds || []);
    sortedClients = [
      ...clients.filter(c => likeIds.includes(c.id)),
      ...clients.filter(c => !likeIds.includes(c.id)),
    ];
  }

  return (
    <div className="space-y-4">
      {sortedClients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onAction={onAction}
          onSelect={(c: Client) => onSelect(c)}
          isHotLead={hotLeads.has(client.id)}
          hasManagerAlert={managerAlerts.has(client.id)}
          onClearAlert={() => clearManagerAlert(client.id)}
          // Pass like state/handler down
          isLiked={typeof (onSelect as any)?.isLikedFor === 'function' ? (onSelect as any).isLikedFor(client) : undefined}
          onLike={typeof (onSelect as any)?.onLikeClient === 'function' ? (onSelect as any).onLikeClient : undefined}
        />
      ))}
    </div>
  );
};
