
import { useState } from 'react';
import { Client } from '@/types/client';
import { Phone, MessageSquare, Mail, FileText, Target, CheckCircle, Skull, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientActionsProps {
  client: Client;
  onAction: (client: Client, action: string) => void;
  hasManagerAlert: boolean;
  onClearAlert?: () => void;
}

export const ClientActions = ({ client, onAction, hasManagerAlert, onClearAlert }: ClientActionsProps) => {
  const [showApproveCheck, setShowApproveCheck] = useState(false);

  const handleApprove = () => {
    setShowApproveCheck(true);
    onAction(client, 'approve');
    setTimeout(() => setShowApproveCheck(false), 2000);
  };

  return (
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
  );
};
