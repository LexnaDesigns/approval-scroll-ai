
import { Client } from '@/types/client';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@email.com',
    address: '123 Main St, Toronto, ON M5V 3A8',
    creditScore: 580,
    stage: 'Presenting Options',
    aiSummary: 'Thin credit, stable job, $3,200 income, ready to present',
    fullAiSummary: 'Credit score 580 with thin file. Stable employment at Rogers Communications for 2 years. Monthly gross income $3,200. No major derogatory marks but limited credit history. Good candidate for subprime approval with reasonable terms.',
    employer: 'Rogers Communications',
    jobTitle: 'Customer Service Representative',
    monthlyIncome: 3200,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🔥 Ready to Present'],
    communications: [
      {
        id: '1',
        type: 'text',
        content: 'Hi Sarah! I have some great financing options ready for you. When would be a good time to chat?',
        timestamp: '2024-01-15T10:30:00Z',
        direction: 'outbound'
      },
      {
        id: '2',
        type: 'text',
        content: 'Perfect! I can talk now if you have a few minutes',
        timestamp: '2024-01-15T10:32:00Z',
        direction: 'inbound'
      }
    ],
    createdAt: '2024-01-14T09:00:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    phone: '(555) 987-6543',
    email: 'michael.chen@email.com',
    address: '456 Oak Ave, Vancouver, BC V6B 2K9',
    creditScore: 520,
    stage: 'Docs In',
    aiSummary: 'Previous bankruptcy, recovering credit, $2,800 income, needs cosigner',
    fullAiSummary: 'Credit score 520 with previous bankruptcy discharged 18 months ago. Currently employed at Canadian Tire for 8 months. Monthly income $2,800. Will likely need a cosigner or larger down payment for approval.',
    employer: 'Canadian Tire',
    jobTitle: 'Sales Associate',
    monthlyIncome: 2800,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg']
    },
    alerts: ['⚠️ Previous Bankruptcy', '📄 Missing Income Docs'],
    communications: [
      {
        id: '3',
        type: 'email',
        content: 'Thank you for your interest! I need to collect a few more documents to complete your application.',
        timestamp: '2024-01-15T14:20:00Z',
        direction: 'outbound'
      }
    ],
    createdAt: '2024-01-13T11:15:00Z'
  },
  {
    id: '3',
    name: 'Jessica Williams',
    phone: '(555) 456-7890',
    email: 'jessica.williams@email.com',
    address: '789 Pine St, Calgary, AB T2P 1M7',
    creditScore: 640,
    stage: 'New Lead',
    aiSummary: 'Good credit, self-employed, variable income, promising lead',
    fullAiSummary: 'Credit score 640 with good payment history. Self-employed contractor with variable income averaging $4,200/month. Good candidate for approval with proper income documentation.',
    employer: 'Self-Employed',
    jobTitle: 'Contractor',
    monthlyIncome: 4200,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '💼 Self-Employed'],
    communications: [],
    createdAt: '2024-01-15T16:45:00Z'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    phone: '(555) 321-0987',
    email: 'david.rodriguez@email.com',
    address: '321 Elm St, Montreal, QC H3B 2Y7',
    creditScore: 450,
    stage: 'Funding',
    aiSummary: 'Deep subprime, approved at 18.9%, $5K down, funding in progress',
    fullAiSummary: 'Credit score 450 with multiple collection accounts. Approved through Iceberg Finance at 18.9% APR with $5,000 down payment. Funding documentation in progress.',
    employer: 'Metro Inc.',
    jobTitle: 'Warehouse Worker',
    monthlyIncome: 2600,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🎉 Approved - Funding'],
    communications: [
      {
        id: '4',
        type: 'call',
        content: 'Congratulations! Your loan has been approved. We just need to finalize the paperwork.',
        timestamp: '2024-01-15T13:00:00Z',
        direction: 'outbound'
      }
    ],
    createdAt: '2024-01-10T08:30:00Z'
  },
  {
    id: '5',
    name: 'Amanda Thompson',
    phone: '(555) 654-3210',
    email: 'amanda.thompson@email.com',
    address: '654 Cedar Rd, Ottawa, ON K1P 5Z6',
    creditScore: 520,
    stage: 'Docs In',
    aiSummary: 'Young buyer, thin file, stable income, good first-time buyer',
    fullAiSummary: 'Credit score 520 with limited credit history due to age (22). Stable employment at Shoppers Drug Mart for 14 months. Good candidate for first-time buyer programs.',
    employer: 'Shoppers Drug Mart',
    jobTitle: 'Pharmacy Assistant',
    monthlyIncome: 2400,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['👶 First-Time Buyer'],
    communications: [
      {
        id: '5',
        type: 'text',
        content: 'Hi Amanda! Thanks for sending your documents. Everything looks good so far!',
        timestamp: '2024-01-15T11:15:00Z',
        direction: 'outbound'
      }
    ],
    createdAt: '2024-01-12T14:20:00Z'
  }
];
