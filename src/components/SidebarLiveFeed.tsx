
import React from 'react';
import { Client } from '@/types/client';
import { Clock, Phone, Mail, MessageSquare, AlertTriangle } from 'lucide-react';

interface SidebarLiveFeedProps {
  clients: Client[];
  onClientSelect: (client: Client) => void;
}

export const SidebarLiveFeed = ({ clients, onClientSelect }: SidebarLiveFeedProps) => {
  // Get recent communications from all clients
  const recentCommunications = clients
    .flatMap(client => 
      client.communications.map(comm => ({
        ...comm,
        clientName: client.name,
        client: client
      }))
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);

  const getCommIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'text': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const commTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - commTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <Clock className="h-4 w-4 mr-2 text-blue-600" />
          Live Feed
        </h3>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {recentCommunications.length === 0 ? (
          <p className="text-xs text-gray-500 italic">No recent activity</p>
        ) : (
          recentCommunications.map((comm) => {
            const Icon = getCommIcon(comm.type);
            return (
              <div
                key={`${comm.id}-${comm.client.id}`}
                onClick={() => onClientSelect(comm.client)}
                className="bg-white rounded-lg border border-gray-100 p-3 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="flex items-start space-x-2">
                  <div className={`p-1.5 rounded-full ${
                    comm.type === 'call' ? 'bg-green-100' :
                    comm.type === 'email' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <Icon className={`h-3 w-3 ${
                      comm.type === 'call' ? 'text-green-600' :
                      comm.type === 'email' ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {comm.clientName}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {comm.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {getTimeAgo(comm.timestamp)}
                    </p>
                  </div>
                  {comm.direction === 'incoming' && (
                    <AlertTriangle className="h-3 w-3 text-orange-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
