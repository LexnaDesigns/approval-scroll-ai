
import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@/types/client';
import { MessageSimulator, MessageUpdate } from '@/services/messageSimulator';
import { toast } from '@/hooks/use-toast';

export const useClientActivity = (clients: Client[], setClients: React.Dispatch<React.SetStateAction<Client[]>>) => {
  const [hotLeads, setHotLeads] = useState<Set<string>>(new Set());
  const [managerAlerts, setManagerAlerts] = useState<Set<string>>(new Set());

  const handleMessageUpdate = useCallback((update: MessageUpdate) => {
    // Update client communications and show toast if needed
    setClients(prevClients => {
      if (update.needsManagerAttention) {
        const client = prevClients.find(c => c.id === update.clientId);
        if (client) {
          toast({
            title: "🚨 Manager Attention Required",
            description: `${client.name} needs your review - they're asking about pricing/terms`,
            duration: 8000,
          });
        }
      }
      
      return prevClients.map(client => {
        if (client.id === update.clientId) {
          return {
            ...client,
            communications: [...client.communications, update.communication]
          };
        }
        return client;
      });
    });

    // Handle manager alerts
    if (update.needsManagerAttention) {
      setManagerAlerts(prev => new Set([...prev, update.clientId]));
    }

    // Handle hot leads
    if (update.isHotLead) {
      setHotLeads(prev => new Set([...prev, update.clientId]));
    }
  }, [setClients]);

  // Use a ref to give the simulator access to the latest clients array
  // without re-triggering the useEffect that creates the simulator.
  const clientsRef = useRef(clients);
  clientsRef.current = clients;

  useEffect(() => {
    const simulator = new MessageSimulator(handleMessageUpdate);
    simulator.start(() => clientsRef.current);

    return () => {
      simulator.stop();
    };
  }, [handleMessageUpdate]);

  const markAsApproved = useCallback((clientId: string, clientName: string) => {
    setHotLeads(prev => new Set([...prev, clientId]));
    
    toast({
      title: "🔥 Lead is Hot!",
      description: `${clientName} is approved and ready to present - income verified!`,
      duration: 5000,
    });
  }, []);

  const clearManagerAlert = useCallback((clientId: string) => {
    setManagerAlerts(prev => {
      const newSet = new Set(prev);
      newSet.delete(clientId);
      return newSet;
    });
  }, []);

  return {
    hotLeads,
    managerAlerts,
    markAsApproved,
    clearManagerAlert
  };
};
