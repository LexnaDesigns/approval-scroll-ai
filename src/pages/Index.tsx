
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Client } from '@/types/client';
import { useClientActivity } from '@/hooks/useClientActivity';
import { useClients } from '@/hooks/useClients';
import { useUpdateClientStage, useDeleteClient } from '@/hooks/useClientMutations';
import { ClientFeed } from '@/components/ClientFeed';
import { Header } from '@/components/Header';
import { AppModals } from '@/components/AppModals';

const Index = () => {
  const { clients, isLoading, isError, error } = useClients();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDocRequestModal, setShowDocRequestModal] = useState(false);
  const [showCloseDealModal, setShowCloseDealModal] = useState(false);
  const [showPresentVehicleModal, setShowPresentVehicleModal] = useState(false);
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  // Liked client state (pin liked to top)
  const [likedClientIds, setLikedClientIds] = useState<Set<string>>(new Set());

  // For "Kill" modal functionality
  const [killModal, setKillModal] = useState<{ open: boolean, client: Client | null }>({ open: false, client: null });

  const { hotLeads, managerAlerts, clearManagerAlert } = useClientActivity(clients);

  const updateStageMutation = useUpdateClientStage();
  const deleteClientMutation = useDeleteClient();

  const handleLikeClient = (client: Client) => {
    setLikedClientIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(client.id)) {
        newSet.delete(client.id);
      } else {
        newSet.add(client.id);
      }
      return newSet;
    });
  };
  const isLikedFor = (client: Client) => likedClientIds.has(client.id);

  const handleClientAction = (client: Client, action: string) => {
    setActiveClient(client);

    switch (action) {
      case 'call':
        window.open(`tel:${client.phone}`, '_self');
        break;
      case 'text':
        setShowTextModal(true);
        break;
      case 'email':
        setShowEmailModal(true);
        break;
      case 'docs':
        setShowDocRequestModal(true);
        break;
      case 'present':
        setShowPresentVehicleModal(true);
        break;
      case 'close':
        setShowCloseDealModal(true);
        break;
      case 'kill':
        // Open kill reason modal instead of direct delete
        setKillModal({ open: true, client });
        break;
    }
  };

  const updateClientStage = (clientId: string, newStage: Client['stage']) => {
    updateStageMutation.mutate({ clientId, newStage });
  };

  const handleCompleteCloseDeal = (clientId: string) => {
    updateClientStage(clientId, 'Delivered');
    setShowCloseDealModal(false);
  };

  const handleSidebarClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  // Confirm kill lead (with reason)
  const handleKillLead = (reason: string) => {
    if (killModal.client) {
      deleteClientMutation.mutate(killModal.client.id);
      setKillModal({ open: false, client: null });
      // Optionally, show reason in toast:
      // import { toast } from '@/hooks/use-toast';
      // toast({ title: `Removed: ${killModal.client.name}`, description: `Reason: ${reason}`, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Static Sidebar */}
      <Sidebar 
        onClose={() => {}} 
        onClientSelect={handleSidebarClientSelect}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Header 
          onMenuClick={() => {}}
          hotLeadsCount={hotLeads.size}
          managerAlertsCount={managerAlerts.size}
        />

        <main className="p-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Client Feed</h2>
            <p className="text-gray-600">Stay connected with your clients and track their journey</p>
          </div>

          <ClientFeed
            clients={clients}
            isLoading={isLoading}
            isError={isError}
            error={error as Error | null}
            onAction={handleClientAction}
            onSelect={(client: Client) => setSelectedClient(client)}
            hotLeads={hotLeads}
            managerAlerts={managerAlerts}
            clearManagerAlert={clearManagerAlert}
            // Add for liking/pinning
            likedClientIds={likedClientIds}
            onLikeClient={handleLikeClient}
            isLikedFor={isLikedFor}
          />
        </main>
      </div>

      <AppModals
        selectedClient={selectedClient}
        onCloseProfile={() => setSelectedClient(null)}
        onClientAction={handleClientAction}
        onUpdateStage={updateClientStage}
        activeClient={activeClient}
        showPresentVehicleModal={showPresentVehicleModal}
        onClosePresentVehicleModal={() => setShowPresentVehicleModal(false)}
        showTextModal={showTextModal}
        onCloseTextModal={() => setShowTextModal(false)}
        showEmailModal={showEmailModal}
        onCloseEmailModal={() => setShowEmailModal(false)}
        showDocRequestModal={showDocRequestModal}
        onCloseDocRequestModal={() => setShowDocRequestModal(false)}
        showCloseDealModal={showCloseDealModal}
        onCloseCloseDealModal={() => setShowCloseDealModal(false)}
        onCompleteCloseDeal={handleCompleteCloseDeal}
      />

      {/* KILL Reason Modal */}
      <KillReasonModal
        isOpen={killModal.open}
        client={killModal.client}
        onCancel={() => setKillModal({ open: false, client: null })}
        onConfirm={handleKillLead}
      />
    </div>
  );
};

import { KillReasonModal } from '@/components/KillReasonModal';
