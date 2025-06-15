
import { Client } from '@/types/client';
import { Phone, Mail, Target, CheckCircle, Menu, FilePlus2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface ClientProfileActionsProps {
  client: Client;
  onAction: (client: Client, action: string) => void;
  onKillRequest?: (client: Client) => void;
}

export const ClientProfileActions = ({
  client,
  onAction,
  onKillRequest,
}: ClientProfileActionsProps) => {
  return (
    <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t gap-3 sm:gap-0">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(client, 'call')}
          className="rounded-xl border-2 border-gray-200 text-gray-700 bg-white hover:border-blue-400 hover:bg-blue-50 flex items-center px-4"
        >
          <Phone className="h-5 w-5 mr-2" />
          <span className="font-semibold">Call</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(client, 'text')}
          className="rounded-xl border-2 border-gray-200 text-gray-700 bg-white hover:border-green-400 hover:bg-green-50 flex items-center px-4"
        >
          <Menu className="h-5 w-5 mr-2" />
          <span className="font-semibold">Text</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(client, 'email')}
          className="rounded-xl border-2 border-gray-200 text-gray-700 bg-white hover:border-purple-400 hover:bg-purple-50 flex items-center px-4"
        >
          <Mail className="h-5 w-5 mr-2" />
          <span className="font-semibold">Email</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(client, 'docs')}
          className="rounded-xl border-2 border-gray-200 text-gray-700 bg-white hover:border-orange-400 hover:bg-orange-50 flex items-center px-4"
        >
          <FilePlus2 className="h-5 w-5 mr-2" />
          <span className="font-semibold">Docs</span>
        </Button>
      </div>

      <div className="flex space-x-2 mt-2 sm:mt-0">
        <Button
          size="sm"
          onClick={() => onAction(client, 'present')}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center px-4"
        >
          <Target className="h-5 w-5 mr-2" />
          Present Vehicle
        </Button>
        <Button
          size="sm"
          onClick={() => onAction(client, 'close')}
          className="rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center px-4"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Close Deal
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onKillRequest ? onKillRequest(client) : onAction(client, 'kill')}
          className="rounded-xl font-semibold flex items-center px-4 bg-red-600 hover:bg-red-700 text-white"
        >
          <X className="h-5 w-5 mr-2" />
          Kill Lead
        </Button>
      </div>
    </div>
  );
};
