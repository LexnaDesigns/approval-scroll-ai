
import { Client } from '@/types/client';
import { Phone, Mail, Menu, FilePlus2, Check, X, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientActionsProps {
  client: Client;
  onAction: (client: Client, action: string) => void;
  hasManagerAlert: boolean;
  onClearAlert?: () => void;
}

// Redesigned action bar to match the new UI (square icon buttons, blue for vehicle, green for close, red for kill, no "Present Vehicle" text)
export const ClientActions = ({ client, onAction, hasManagerAlert, onClearAlert }: ClientActionsProps) => {
  return (
    <div className="bg-gray-50 px-3 py-2 flex items-center justify-between border-t">
      <div className="flex space-x-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAction(client, 'call')}
          className="h-9 w-9 p-0 hover:bg-blue-50 hover:border-blue-300"
        >
          <Phone className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAction(client, 'text')}
          className="h-9 w-9 p-0 hover:bg-gray-100 hover:border-gray-300"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAction(client, 'email')}
          className="h-9 w-9 p-0 hover:bg-purple-50 hover:border-purple-300"
        >
          <Mail className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAction(client, 'docs')}
          className="h-9 w-9 p-0 hover:bg-orange-50 hover:border-orange-300"
        >
          <FilePlus2 className="h-4 w-4" />
        </Button>
        {hasManagerAlert && onClearAlert && (
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onClearAlert();
            }}
            className="h-9 w-9 p-0 hover:bg-red-50 hover:border-red-300 text-red-600"
          >
            {/* Use X to indicate alert clear */}
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex space-x-1">
        <Button
          size="sm"
          onClick={() => onAction(client, 'present')}
          className="bg-blue-600 hover:bg-blue-700 text-white h-9 w-9 p-0"
        >
          <Car className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          onClick={() => onAction(client, 'close')}
          className="bg-green-600 hover:bg-green-700 text-white h-9 w-9 p-0"
        >
          <Check className="h-5 w-5" />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onAction(client, 'kill')}
          className="hover:bg-red-700 h-9 w-9 p-0"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
