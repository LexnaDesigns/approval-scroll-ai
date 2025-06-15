
import { Client } from '@/types/client';
import { Phone, MessageSquare, Mail, FileText, Target, CheckCircle, Skull, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  onClearAlert 
}: ClientCardProps) => {
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

  const cardClasses = `
    bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden 
    hover:shadow-xl transition-all duration-300 animate-fade-in
    ${isHotLead ? 'animate-pulse ring-2 ring-orange-400 ring-opacity-75' : ''}
    ${hasManagerAlert ? 'ring-2 ring-red-400 ring-opacity-75' : ''}
  `;

  return (
    <div className={cardClasses}>
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors relative"
        onClick={() => onSelect(client)}
      >
        {/* Manager Alert Badge */}
        {hasManagerAlert && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-red-500 text-white animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Manager Review
            </Badge>
          </div>
        )}

        {/* Hot Lead Indicator */}
        {isHotLead && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-orange-500 text-white animate-pulse">
              🔥 Ready to Present
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between mb-3 mt-8">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg ${isHotLead ? 'animate-pulse' : ''}`}>
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{client.name}</h3>
              <p className={`font-bold text-sm ${getCreditScoreColor(client.creditScore)}`}>
                Credit Score: {client.creditScore}
              </p>
            </div>
          </div>
          <Badge className={`${getStageColor(client.stage)} text-white px-3 py-1`}>
            {client.stage}
          </Badge>
        </div>

        {/* AI Summary */}
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          {client.aiSummary}
        </p>

        {/* Recent Communication Indicator */}
        {client.communications.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 flex items-center space-x-2">
              <MessageSquare className="h-3 w-3" />
              <span>
                Last contact: {new Date(client.communications[client.communications.length - 1].timestamp).toLocaleString()}
              </span>
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Document Status */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            {client.documents.license ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-red-500" />
            )}
            <span className="text-xs text-gray-600">License</span>
          </div>
          <div className="flex items-center space-x-1">
            {client.documents.income ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <div className="h-4 w-4 rounded-full border-2 border-red-500" />
            )}
            <span className="text-xs text-gray-600">Income</span>
          </div>
        </div>

        {/* Document Thumbnails */}
        {client.documents.images.length > 0 && (
          <div className="flex space-x-2 mb-3">
            {client.documents.images.slice(0, 3).map((image, index) => (
              <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-gray-500" />
              </div>
            ))}
            {client.documents.images.length > 3 && (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-600">+{client.documents.images.length - 3}</span>
              </div>
            )}
          </div>
        )}

        {/* Alerts */}
        {client.alerts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {client.alerts.map((alert, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {alert}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'call')}
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'text')}
            className="hover:bg-green-50 hover:border-green-300"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'email')}
            className="hover:bg-purple-50 hover:border-purple-300"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'docRequest')}
            className="hover:bg-orange-50 hover:border-orange-300"
          >
            <FileText className="h-4 w-4" />
          </Button>
          {hasManagerAlert && onClearAlert && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onClearAlert();
              }}
              className="hover:bg-red-50 hover:border-red-300 text-red-600"
            >
              <AlertTriangle className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => onAction(client, 'present')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Target className="h-4 w-4 mr-1" />
            Present
          </Button>
          <Button
            size="sm"
            onClick={() => onAction(client, 'approve')}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            ✓ Approve
          </Button>
          <Button
            size="sm"
            onClick={() => onAction(client, 'close')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Close
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onAction(client, 'kill')}
            className="hover:bg-red-700"
          >
            <Skull className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
