
import { Client } from '@/types/client';
import { ClientHeader } from '@/components/ClientHeader';
import { ClientAlerts } from '@/components/ClientAlerts';
import { ClientSummary } from '@/components/ClientSummary';
import { ClientDocuments } from '@/components/ClientDocuments';
import { ClientActions } from '@/components/ClientActions';
import { Heart, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  onClearAlert,
  // No change here: passing onAction upward for profile modal, but not using actions here
}: ClientCardProps & { isLiked?: boolean; onLike?: (client: Client) => void }) => {
  // Add: Accept isLiked and onLike props
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'bg-blue-100 text-blue-800';
      case 'Docs In': return 'bg-yellow-100 text-yellow-800';
      case 'Presenting Options': return 'bg-purple-100 text-purple-800';
      case 'Funding': return 'bg-orange-100 text-orange-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 650) return 'bg-green-100 text-green-700';
    if (score >= 550) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 relative">
      <ClientAlerts isHotLead={isHotLead} hasManagerAlert={hasManagerAlert} />

      <div 
        className="p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => onSelect(client)}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{client.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge className={`${getCreditScoreColor(client.creditScore)} text-xs font-medium px-2 py-1`}>
                  Score: {client.creditScore}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${getStageColor(client.stage)} text-xs font-medium px-3 py-1.5 rounded-full`}>
              {client.stage}
            </Badge>
            {/* Add Like button here */}
            {typeof (onSelect as any)?.onLike !== "undefined" ? null : null}
          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">{client.aiSummary}</p>
        </div>

        {/* Status Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {isHotLead && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">
              🔥 Hot deal
            </div>
          )}
          {client.documents.license && client.documents.income && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              ✅ Docs in
            </div>
          )}
          {client.creditScore >= 650 && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              💰 Good income
            </div>
          )}
        </div>

        {/* Document Status */}
        <ClientDocuments 
          documents={client.documents} 
          communications={client.communications} 
        />
      </div>

      {/* Social Actions */}
      <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Like button */}
          <button
            onClick={e => {
              e.stopPropagation();
              if ((onSelect as any)?.onLike) {
                ((onSelect as any).onLike)(client);
              }
            }}
            aria-label="Like"
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors focus:outline-none group"
          >
            <Heart className={`h-5 w-5 group-hover:scale-110 ${((onSelect as any)?.isLikedFor?.(client)) ? 'text-red-600 fill-red-100' : ''}`} />
            <span className="text-sm font-medium select-none">{((onSelect as any)?.isLikedFor?.(client)) ? 'Liked' : 'Like'}</span>
          </button>
          <button 
            onClick={e => {
              e.stopPropagation();
              onSelect(client);
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">View Profile</span>
          </button>
        </div>
        {/* Action bar removed for cleaner look */}
      </div>
    </div>
  );
};

