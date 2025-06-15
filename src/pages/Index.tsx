import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ClientCard } from '@/components/ClientCard';
import { ClientProfile } from '@/components/ClientProfile';
import { TextComposeModal } from '@/components/TextComposeModal';
import { EmailComposeModal } from '@/components/EmailComposeModal';
import { DocRequestModal } from '@/components/DocRequestModal';
import { CloseDealModal } from '@/components/CloseDealModal';
import { Sidebar } from '@/components/Sidebar';
import { Menu, Loader2 } from 'lucide-react';
import { Client } from '@/types/client';
import { useClientActivity } from '@/hooks/useClientActivity';
import { toast } from '@/components/ui/use-toast';

const mapRawClientToClient = (rawClient: any): Client => ({
  id: rawClient.id,
  name: rawClient.name,
  phone: rawClient.phone,
  email: rawClient.email,
  address: rawClient.address,
  creditScore: rawClient.credit_score || 0,
  stage: rawClient.stage,
  aiSummary: rawClient.ai_summary,
  fullAiSummary: rawClient.full_ai_summary,
  employer: rawClient.employer,
  jobTitle: rawClient.job_title,
  monthlyIncome: rawClient.monthly_income,
  documents: {
      license: rawClient.has_license || false,
      income: rawClient.has_income_proof || false,
      images: rawClient.document_images || [],
  },
  alerts: rawClient.alerts || [],
  communications: (rawClient.communications || []).map((comm: any) => ({
      id: comm.id,
      type: comm.type,
      content: comm.content,
      timestamp: comm.timestamp,
      direction: comm.direction,
  })),
  createdAt: rawClient.created_at,
});

const useUpdateClientStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async ({ clientId, newStage }: { clientId: string, newStage: Client['stage'] }) => {
          const { error } = await supabase
              .from('clients')
              .update({ stage: newStage })
              .eq('id', clientId);
          if (error) throw error;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
      onError: (error) => {
          toast({ title: 'Error updating stage', description: error.message, variant: 'destructive' });
      }
  });
};

const useDeleteClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async (clientId: string) => {
          const { error } = await supabase.from('clients').delete().eq('id', clientId);
          if (error) throw error;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['clients'] });
      },
      onError: (error) => {
          toast({ title: 'Error deleting client', description: error.message, variant: 'destructive' });
      }
  });
};


const Index = () => {
  const queryClient = useQueryClient();
  
  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*, communications(*)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  };

  const { data: rawClients, isLoading, isError, error } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const clients = useMemo(() => {
    if (!rawClients) return [];
    return rawClients.map(mapRawClientToClient);
  }, [rawClients]);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDocRequestModal, setShowDocRequestModal] = useState(false);
  const [showCloseDealModal, setShowCloseDealModal] = useState(false);
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
        updateStageMutation.mutate({ clientId: client.id, newStage: 'Presenting Options' });
        toast({ title: 'Stage Updated', description: `${client.name} is now in 'Presenting Options' stage.` });
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
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
              <span className="ml-2 text-gray-500">Loading Clients...</span>
            </div>
          )}
          {isError && (
             <div className="text-red-500 text-center py-10">
              Error loading clients: {error.message}
            </div>
          )}
          {!isLoading && !isError && (
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
          )}
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
