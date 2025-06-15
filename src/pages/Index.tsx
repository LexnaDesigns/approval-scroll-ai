
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          hotLeadsCount={hotLeads.size}
          managerAlertsCount={managerAlerts.size}
        />

        <main className="p-4 max-w-2xl mx-auto">
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

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Index;
