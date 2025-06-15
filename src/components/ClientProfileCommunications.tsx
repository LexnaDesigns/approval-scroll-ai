
import { Client } from '@/types/client';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClientProfileCommunicationActions } from './ClientProfileCommunicationActions';

interface ClientProfileCommunicationsProps {
  client: Client;
  // Add handler to pass down for actions (text/email)
  onAction?: (client: Client, action: string) => void;
}

export const ClientProfileCommunications = ({
  client,
  onAction,
}: ClientProfileCommunicationsProps) => {
  // Show in "oldest first" (scroll down for most recent, like social)
  const comms = [...client.communications].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="w-1/2 p-6 flex flex-col h-full">
      <h3 className="font-semibold text-gray-900 mb-4">Communication History</h3>
      <ScrollArea className="flex-1 min-h-0 rounded-lg bg-white/50 border">
        <div className="flex flex-col space-y-4 px-1 py-3 min-h-[300px]">
          {comms.length > 0 ? (
            comms.map((comm) => (
              <div
                key={comm.id}
                className={`p-4 rounded-lg ${comm.direction === 'outbound' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {comm.type.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(comm.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{comm.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No communications yet</p>
            </div>
          )}
        </div>
      </ScrollArea>
      {onAction && (
        <ClientProfileCommunicationActions
          client={client}
          onAction={onAction}
        />
      )}
    </div>
  );
};
