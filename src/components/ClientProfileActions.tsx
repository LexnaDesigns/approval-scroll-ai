
import { Client } from '@/types/client';
import { Phone, MessageSquare, Mail, FileText, Target, CheckCircle, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientProfileActionsProps {
  client: Client;
  onAction: (client: Client, action: string) => void;
}

export const ClientProfileActions = ({ client, onAction }: ClientProfileActionsProps) => {
  return (
    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={() => onAction(client, 'call')}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        <Button
          variant="outline"
          onClick={() => onAction(client, 'text')}
          className="hover:bg-green-50 hover:border-green-300"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Text
        </Button>
        <Button
          variant="outline"
          onClick={() => onAction(client, 'email')}
          className="hover:bg-purple-50 hover:border-purple-300"
        >
          <Mail className="h-4 w-4 mr-2" />
          Email
        </Button>
        <Button
          variant="outline"
          onClick={() => onAction(client, 'docRequest')}
          className="hover:bg-orange-50 hover:border-orange-300"
        >
          <FileText className="h-4 w-4 mr-2" />
          Doc Request
        </Button>
      </div>
      
      <div className="flex space-x-3">
        <Button
          onClick={() => onAction(client, 'present')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Target className="h-4 w-4 mr-2" />
          Present Options
        </Button>
        <Button
          onClick={() => onAction(client, 'close')}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Close Deal
        </Button>
        <Button
          variant="destructive"
          onClick={() => onAction(client, 'kill')}
          className="hover:bg-red-700"
        >
          <Skull className="h-4 w-4 mr-2" />
          Kill Lead
        </Button>
      </div>
    </div>
  );
};
