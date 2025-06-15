
import { useState, useEffect, useCallback } from 'react';
import { Client } from '@/types/client';
import { MessageSimulator, MessageUpdate } from '@/services/messageSimulator';
import { toast } from '@/hooks/use-toast';

export const useClientActivity = (clients: Client[], setClients: React.Dispatch<React.SetStateAction<Client[]>>) => {
  const [hotLeads, setHotLeads] = useState<Set<string>>(new Set());
  const [managerAlerts, setManagerAlerts] = useState<Set<string>>(new Set());

  const handleMessageUpdate = useCallback((update: MessageUpdate) => {
    // Update client communications
    setClients(prev => prev.map(client => {
      if (client.id === update.clientId) {
        return {
          ...client,
          communications: [...client.communications, update.communication]
        };
      }
      return client;
    }));

    // Handle manager alerts
    if (update.needsManagerAttention) {
      setManagerAlerts(prev => new Set([...prev, update.clientId]));
      
      const client = clients.find(c => c.id === update.clientId);
      if (client) {
        toast({
          title: "🚨 Manager Attention Required",
          description: `${client.name} needs your review - they're asking about pricing/terms`,
          duration: 8000,
        });
      }
    }

    // Handle hot leads
    if (update.isHotLead) {
      setHotLeads(prev => new Set([...prev, update.clientId]));
    }
  }, [clients, setClients]);

  useEffect(() => {
    const simulator = new MessageSimulator(handleMessageUpdate);
    simulator.start(clients);

    return () => {
      simulator.stop();
    };
  }, [clients, handleMessageUpdate]);

  const markAsApproved = useCallback((clientId: string) => {
    setHotLeads(prev => new Set([...prev, clientId]));
    
    const client = clients.find(c => c.id === clientId);
    if (client) {
      toast({
        title: "🔥 Lead is Hot!",
        description: `${client.name} is approved and ready to present - income verified!`,
        duration: 5000,
      });
    }
  }, [clients]);

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
