
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/client';
import { useToast } from '@/hooks/use-toast';

export const useUpdateClientStage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
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

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
      mutationFn: async (clientId: string) => {
          const { error } = await supabase.from('clients').delete().eq('id', clientId);
          if (error) throw error;
      },
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['clients'] });
          toast({ title: "Client lead removed" });
      },
      onError: (error) => {
          toast({ title: 'Error deleting client', description: error.message, variant: 'destructive' });
      }
  });
};
