
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/client';
import { useMemo } from 'react';

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

export const useClients = () => {
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

  return { clients, isLoading, isError, error };
};
