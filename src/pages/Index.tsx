
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
  
  const { hotLeads, managerAlerts, clearManagerAlert } = useClientActivity(clients);
  
  const updateStageMutation = useUpdateClientStage();
  const deleteClientMutation = useDeleteClient();

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
        deleteClientMutation.mutate(client.id);
        if (selectedClient?.id === client.id) {
            setSelectedClient(null);
        }
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Static Sidebar */}
      <Sidebar onClose={() => {}} />

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
            onSelect={setSelectedClient}
            hotLeads={hotLeads}
            managerAlerts={managerAlerts}
            clearManagerAlert={clearManagerAlert}
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
    </div>
  );
};

export default Index;
