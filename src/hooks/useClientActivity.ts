
import { useState, useEffect, useCallback, useRef } from 'react';
import { Client } from '@/types/client';
import { MessageSimulator, MessageUpdate } from '@/services/messageSimulator';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useClientActivity = (clients: Client[]) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [hotLeads, setHotLeads] = useState<Set<string>>(new Set());
  const [managerAlerts, setManagerAlerts] = useState<Set<string>>(new Set());

  const handleMessageUpdate = useCallback(async (update: MessageUpdate) => {
    // Only process if user is authenticated
    if (!user) return;

    // Try to persist communication to Supabase, but don't block on errors
    try {
      const { error } = await supabase.from('communications').insert({
          id: update.communication.id,
          client_id: update.clientId,
          user_id: user.id, // Add user_id for RLS
          type: update.communication.type,
          content: update.communication.content,
          timestamp: update.communication.timestamp,
          direction: update.communication.direction,
      });

      if (error) {
        console.error("Error inserting communication:", error);
        // Don't show error toast to user, just log it
      } else {
        // Only invalidate query if successful
        await queryClient.invalidateQueries({ queryKey: ['clients'] });
      }
    } catch (error) {
      console.error("Failed to save communication:", error);
      // Continue without blocking the UI
    }

    // Handle hot leads
    if (update.isHotLead) {
      setHotLeads(prev => new Set([...prev, update.clientId]));
    }
  }, [queryClient, user]);

  // Use a ref to give the simulator access to the latest clients array
  // without re-triggering the useEffect that creates the simulator.
  const clientsRef = useRef(clients);
  clientsRef.current = clients;

  useEffect(() => {
    if (clients.length === 0 || !user) return; // Don't start simulator until clients are loaded and user is authenticated
    
    const simulator = new MessageSimulator(handleMessageUpdate);
    simulator.start(() => clientsRef.current);

    return () => {
      simulator.stop();
    };
  }, [handleMessageUpdate, clients.length, user]);

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
    clearManagerAlert
  };
};
