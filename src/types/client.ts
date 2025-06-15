
export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  creditScore: number;
  stage: 'New Lead' | 'Docs In' | 'Presenting Options' | 'Funding' | 'Delivered' | 'Killed';
  aiSummary: string;
  fullAiSummary: string;
  employer: string;
  jobTitle: string;
  monthlyIncome: number;
  documents: {
    license: boolean;
    income: boolean;
    images: string[];
  };
  alerts: string[];
  communications: Communication[];
  createdAt: string;
}

export interface Communication {
  id: string;
  type: 'text' | 'email' | 'call' | 'ai';
  content: string;
  timestamp: string;
  direction: 'inbound' | 'outbound';
}
