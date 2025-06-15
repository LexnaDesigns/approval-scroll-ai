
import { Client } from '@/types/client';
import { ClientProfileHeader } from '@/components/ClientProfileHeader';
import { ClientProfileInfo } from '@/components/ClientProfileInfo';
import { ClientProfileCommunications } from '@/components/ClientProfileCommunications';
import { ClientProfileActions } from '@/components/ClientProfileActions';

interface ClientProfileProps {
  client: Client;
  onClose: () => void;
  onAction: (client: Client, action: string) => void;
  onUpdateStage: (clientId: string, newStage: string) => void;
}

export const ClientProfile = ({ client, onClose, onAction, onUpdateStage }: ClientProfileProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        <ClientProfileHeader client={client} onClose={onClose} />
        
        <div className="flex h-[calc(90vh-200px)]">
          <ClientProfileInfo client={client} />
          <ClientProfileCommunications client={client} />
        </div>

        <ClientProfileActions client={client} onAction={onAction} />
      </div>
    </div>
  );
};
