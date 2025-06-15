
import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@/types/client';
import { MessageSimulator, MessageUpdate } from '@/services/messageSimulator';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useClientActivity = (clients: Client[]) => {
  const queryClient = useQueryClient();
  const [hotLeads, setHotLeads] = useState<Set<string>>(new Set());
  const [managerAlerts, setManagerAlerts] = useState<Set<string>>(new Set());

  const handleMessageUpdate = useCallback(async (update: MessageUpdate) => {
    // Persist communication to Supabase
    const { error } = await supabase.from('communications').insert({
        id: update.communication.id,
        client_id: update.clientId,
        type: update.communication.type,
        content: update.communication.content,
        timestamp: update.communication.timestamp,
        direction: update.communication.direction,
    });

    if (error) {
        toast({
            title: "Error saving message",
            description: error.message,
            variant: "destructive",
        });
        console.error("Error inserting communication:", error);
        return;
    }
    
    // Invalidate query to refetch data
    await queryClient.invalidateQueries({ queryKey: ['clients'] });

    if (update.needsManagerAttention) {
      const client = clients.find(c => c.id === update.clientId);
      if (client) {
        toast({
          title: "🚨 Manager Attention Required",
          description: `${client.name} needs your review - they're asking about pricing/terms`,
          duration: 8000,
        });
      }
    }
    
    // Handle manager alerts
    if (update.needsManagerAttention) {
      setManagerAlerts(prev => new Set([...prev, update.clientId]));
    }

    // Handle hot leads
    if (update.isHotLead) {
      setHotLeads(prev => new Set([...prev, update.clientId]));
    }
  }, [clients, queryClient]);

  // Use a ref to give the simulator access to the latest clients array
  // without re-triggering the useEffect that creates the simulator.
  const clientsRef = useRef(clients);
  clientsRef.current = clients;

  useEffect(() => {
    if (clients.length === 0) return; // Don't start simulator until clients are loaded
    
    const simulator = new MessageSimulator(handleMessageUpdate);
    simulator.start(() => clientsRef.current);

    return () => {
      simulator.stop();
    };
  }, [handleMessageUpdate, clients.length]);

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
