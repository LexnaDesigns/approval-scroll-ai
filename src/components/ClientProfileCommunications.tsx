
import { Client } from '@/types/client';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClientProfileCommunicationsProps {
  client: Client;
}

export const ClientProfileCommunications = ({ client }: ClientProfileCommunicationsProps) => {
  return (
    <div className="w-1/2 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Communication History</h3>
      <ScrollArea className="h-full">
        <div className="space-y-4">
          {client.communications.length > 0 ? (
            client.communications.map((comm) => (
              <div key={comm.id} className={`p-4 rounded-lg ${comm.direction === 'outbound' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}>
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
    </div>
  );
};
