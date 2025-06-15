
import { Client } from '@/types/client';
import { Button } from '@/components/ui/button';
import { Menu, Mail } from 'lucide-react';

interface ClientProfileCommunicationActionsProps {
  client: Client;
  onAction: (client: Client, action: string) => void;
}

export const ClientProfileCommunicationActions = ({
  client,
  onAction,
}: ClientProfileCommunicationActionsProps) => (
  <div className="flex gap-3 pt-4 border-t mt-4">
    <Button
      variant="outline"
      size="sm"
      className="flex-1 rounded-xl border-2 border-gray-200 text-gray-700 bg-white hover:border-green-400 hover:bg-green-50 flex items-center justify-center font-semibold"
      onClick={() => onAction(client, 'text')}
    >
      <Menu className="h-5 w-5 mr-2" />
      Text with AI
    </Button>
    <Button
      variant="outline"
      size="sm"
      className="flex-1 rounded-xl border-2 border-gray-200 text-gray-700 bg-white hover:border-purple-400 hover:bg-purple-50 flex items-center justify-center font-semibold"
      onClick={() => onAction(client, 'email')}
    >
      <Mail className="h-5 w-5 mr-2" />
      Email with AI
    </Button>
  </div>
);
