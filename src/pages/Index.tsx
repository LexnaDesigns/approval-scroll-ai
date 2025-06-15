
import { useState, useEffect } from 'react';
import { ClientCard } from '@/components/ClientCard';
import { ClientProfile } from '@/components/ClientProfile';
import { TextComposeModal } from '@/components/TextComposeModal';
import { EmailComposeModal } from '@/components/EmailComposeModal';
import { DocRequestModal } from '@/components/DocRequestModal';
import { CloseDealModal } from '@/components/CloseDealModal';
import { Sidebar } from '@/components/Sidebar';
import { Menu, X } from 'lucide-react';
import { Client } from '@/types/client';
import { mockClients } from '@/data/mockClients';
import { useClientActivity } from '@/hooks/useClientActivity';

const Index = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDocRequestModal, setShowDocRequestModal] = useState(false);
  const [showCloseDealModal, setShowCloseDealModal] = useState(false);
  const [activeClient, setActiveClient] = useState<Client | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { hotLeads, managerAlerts, markAsApproved, clearManagerAlert } = useClientActivity(clients, setClients);

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
      case 'docRequest':
        setShowDocRequestModal(true);
        break;
      case 'approve':
        markAsApproved(client.id, client.name);
        break;
      case 'close':
        setShowCloseDealModal(true);
        break;
      case 'kill':
        setClients(prev => prev.filter(c => c.id !== client.id));
        break;
    }
  };

  const updateClientStage = (clientId: string, newStage: Client['stage']) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, stage: newStage } : client
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:justify-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">🚗💥 THE APPROVAL BOARD</h1>
            <p className="text-sm text-gray-600">Social-Style CRM for Subprime Auto Finance</p>
            {(hotLeads.size > 0 || managerAlerts.size > 0) && (
              <div className="flex justify-center space-x-4 mt-1">
                {hotLeads.size > 0 && (
                  <span className="text-xs text-orange-600 font-medium animate-pulse">
                    🔥 {hotLeads.size} Hot Lead{hotLeads.size > 1 ? 's' : ''}
                  </span>
                )}
                {managerAlerts.size > 0 && (
                  <span className="text-xs text-red-600 font-medium animate-pulse">
                    🚨 {managerAlerts.size} Alert{managerAlerts.size > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="lg:hidden w-10"></div>
        </header>

        {/* Main Feed */}
        <main className="p-4 max-w-2xl mx-auto">
          <div className="space-y-4">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onAction={handleClientAction}
                onSelect={setSelectedClient}
                isHotLead={hotLeads.has(client.id)}
                hasManagerAlert={managerAlerts.has(client.id)}
                onClearAlert={() => clearManagerAlert(client.id)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Modals */}
      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onAction={handleClientAction}
          onUpdateStage={updateClientStage}
        />
      )}

      {showTextModal && activeClient && (
        <TextComposeModal
          client={activeClient}
          onClose={() => setShowTextModal(false)}
        />
      )}

      {showEmailModal && activeClient && (
        <EmailComposeModal
          client={activeClient}
          onClose={() => setShowEmailModal(false)}
        />
      )}

      {showDocRequestModal && activeClient && (
        <DocRequestModal
          client={activeClient}
          onClose={() => setShowDocRequestModal(false)}
        />
      )}

      {showCloseDealModal && activeClient && (
        <CloseDealModal
          client={activeClient}
          onClose={() => setShowCloseDealModal(false)}
          onComplete={(clientId) => {
            updateClientStage(clientId, 'Delivered');
            setShowCloseDealModal(false);
          }}
        />
      )}

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
