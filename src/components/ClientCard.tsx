
import { Client } from '@/types/client';
import { Phone, MessageSquare, Mail, FileText, Target, CheckCircle, Skull, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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
  const [showApproveCheck, setShowApproveCheck] = useState(false);

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

  const handleApprove = () => {
    setShowApproveCheck(true);
    onAction(client, 'approve');
    setTimeout(() => setShowApproveCheck(false), 2000);
  };

  const cardClasses = `
    bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden 
    hover:shadow-lg transition-all duration-300 animate-fade-in
    ${isHotLead ? 'animate-pulse ring-2 ring-orange-400 ring-opacity-75' : ''}
    ${hasManagerAlert ? 'ring-2 ring-red-400 ring-opacity-75' : ''}
  `;

  return (
    <div className={cardClasses}>
      {/* Compact Header */}
      <div 
        className="p-3 cursor-pointer hover:bg-gray-50 transition-colors relative"
        onClick={() => onSelect(client)}
      >
        {/* Alert Badges - Smaller and positioned better */}
        <div className="absolute top-2 right-2 flex gap-1">
          {hasManagerAlert && (
            <Badge className="bg-red-500 text-white text-xs px-2 py-1 animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Alert
            </Badge>
          )}
          {isHotLead && (
            <Badge className="bg-orange-500 text-white text-xs px-2 py-1 animate-pulse">
              🔥 Hot
            </Badge>
          )}
        </div>

        {/* Client Info - More Compact */}
        <div className="flex items-center justify-between mb-2 pr-16">
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
        </div>

        {/* AI Summary - Condensed */}
        <p className="text-gray-700 text-xs mb-2 leading-relaxed">
          {client.aiSummary}
        </p>

        {/* Document Status & Communication - Single Line */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              {client.documents.license ? (
                <CheckCircle className="h-3 w-3 text-green-500" />
              ) : (
                <div className="h-3 w-3 rounded-full border border-red-500" />
              )}
              <span>ID</span>
            </div>
            <div className="flex items-center space-x-1">
              {client.documents.income ? (
                <CheckCircle className="h-3 w-3 text-green-500" />
              ) : (
                <div className="h-3 w-3 rounded-full border border-red-500" />
              )}
              <span>Income</span>
            </div>
          </div>
          
          {client.communications.length > 0 && (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Compact Action Bar */}
      <div className="bg-gray-50 px-3 py-2 flex items-center justify-between border-t">
        <div className="flex space-x-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'call')}
            className="h-7 w-7 p-0 hover:bg-blue-50 hover:border-blue-300"
          >
            <Phone className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'text')}
            className="h-7 w-7 p-0 hover:bg-green-50 hover:border-green-300"
          >
            <MessageSquare className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'email')}
            className="h-7 w-7 p-0 hover:bg-purple-50 hover:border-purple-300"
          >
            <Mail className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction(client, 'docRequest')}
            className="h-7 w-7 p-0 hover:bg-orange-50 hover:border-orange-300"
          >
            <FileText className="h-3 w-3" />
          </Button>
          {hasManagerAlert && onClearAlert && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onClearAlert();
              }}
              className="h-7 w-7 p-0 hover:bg-red-50 hover:border-red-300 text-red-600"
            >
              <AlertTriangle className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <div className="flex space-x-1">
          <Button
            size="sm"
            onClick={() => onAction(client, 'present')}
            className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-2 text-xs"
          >
            <Target className="h-3 w-3 mr-1" />
            Present
          </Button>
          <Button
            size="sm"
            onClick={handleApprove}
            className={`h-7 w-7 p-0 transition-colors ${
              showApproveCheck 
                ? 'bg-green-600 text-white' 
                : 'bg-orange-600 hover:bg-orange-700 text-white'
            }`}
          >
            {showApproveCheck ? <Check className="h-3 w-3" /> : '✓'}
          </Button>
          <Button
            size="sm"
            onClick={() => onAction(client, 'close')}
            className="bg-green-600 hover:bg-green-700 text-white h-7 px-2 text-xs"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Close
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onAction(client, 'kill')}
            className="hover:bg-red-700 h-7 w-7 p-0"
          >
            <Skull className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
