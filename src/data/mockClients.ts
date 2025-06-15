
import { Client } from '@/types/client';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '(416) 123-4567',
    email: 'sarah.johnson@email.com',
    address: '123 Bay St, Toronto, ON M5J 2R8',
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
    phone: '(905) 987-6543',
    email: 'michael.chen@email.com',
    address: '456 Dundas St W, Mississauga, ON L5B 1H3',
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
    phone: '(613) 456-7890',
    email: 'jessica.williams@email.com',
    address: '789 Rideau St, Ottawa, ON K1N 5Y4',
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
    phone: '(519) 321-0987',
    email: 'david.rodriguez@email.com',
    address: '321 Richmond St, London, ON N6A 3C2',
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
    phone: '(705) 654-3210',
    email: 'amanda.thompson@email.com',
    address: '654 Algonquin Ave, North Bay, ON P1B 4W3',
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
  },
  {
    id: '6',
    name: 'Robert Taylor',
    phone: '(905) 234-5678',
    email: 'robert.taylor@email.com',
    address: '125 Main St E, Hamilton, ON L8N 1G7',
    creditScore: 595,
    stage: 'New Lead',
    aiSummary: 'Decent credit, union job, stable income, good prospect',
    fullAiSummary: 'Credit score 595 with steady payment history. Union steelworker with 5 years employment. Monthly income $4,800. Minor derogatory marks but overall strong candidate.',
    employer: 'Stelco',
    jobTitle: 'Steelworker',
    monthlyIncome: 4800,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '🏭 Union Job'],
    communications: [],
    createdAt: '2024-01-16T09:15:00Z'
  },
  {
    id: '7',
    name: 'Lisa Anderson',
    phone: '(289) 345-6789',
    email: 'lisa.anderson@email.com',
    address: '987 Upper James St, Hamilton, ON L9C 3A2',
    creditScore: 480,
    stage: 'Presenting Options',
    aiSummary: 'Rebuilding credit, steady job, needs competitive rate',
    fullAiSummary: 'Credit score 480 following consumer proposal completion. Employed at Tim Hortons management for 18 months. Income $3,400/month. Good payment history since proposal.',
    employer: 'Tim Hortons',
    jobTitle: 'Assistant Manager',
    monthlyIncome: 3400,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg']
    },
    alerts: ['🔄 Credit Rebuilding', '🔥 Ready to Present'],
    communications: [],
    createdAt: '2024-01-12T14:30:00Z'
  },
  {
    id: '8',
    name: 'James Wilson',
    phone: '(226) 456-7890',
    email: 'james.wilson@email.com',
    address: '246 King St, Kitchener, ON N2G 2M4',
    creditScore: 525,
    stage: 'Docs In',
    aiSummary: 'Tech worker, good income, thin file due to immigration',
    fullAiSummary: 'Credit score 525 with limited Canadian credit history. Recent immigrant working in tech sector. Monthly income $5,200. Strong employment but needs to establish credit.',
    employer: 'BlackBerry',
    jobTitle: 'Software Developer',
    monthlyIncome: 5200,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🌍 New Canadian', '💻 Tech Sector'],
    communications: [],
    createdAt: '2024-01-14T16:20:00Z'
  },
  {
    id: '9',
    name: 'Michelle Brown',
    phone: '(705) 567-8901',
    email: 'michelle.brown@email.com',
    address: '135 Cedar St, Sudbury, ON P3E 1B2',
    creditScore: 445,
    stage: 'New Lead',
    aiSummary: 'Mining sector, irregular income, deep subprime',
    fullAiSummary: 'Credit score 445 with multiple late payments. Works in mining with seasonal layoffs. Average monthly income $3,800. Requires specialized subprime lender.',
    employer: 'Vale Canada',
    jobTitle: 'Equipment Operator',
    monthlyIncome: 3800,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['⚠️ Deep Subprime', '⛏️ Mining Sector'],
    communications: [],
    createdAt: '2024-01-16T11:45:00Z'
  },
  {
    id: '10',
    name: 'Christopher Davis',
    phone: '(807) 678-9012',
    email: 'christopher.davis@email.com',
    address: '789 Arthur St, Thunder Bay, ON P7E 5R2',
    creditScore: 610,
    stage: 'Funding',
    aiSummary: 'Healthcare worker, approved prime rate, finalizing docs',
    fullAiSummary: 'Credit score 610 with excellent payment history. Registered nurse at Thunder Bay Regional. Monthly income $4,600. Approved at prime rate pending final documentation.',
    employer: 'Thunder Bay Regional Health Sciences Centre',
    jobTitle: 'Registered Nurse',
    monthlyIncome: 4600,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🎉 Prime Approved', '🏥 Healthcare'],
    communications: [],
    createdAt: '2024-01-10T13:20:00Z'
  },
  {
    id: '11',
    name: 'Patricia Garcia',
    phone: '(519) 789-0123',
    email: 'patricia.garcia@email.com',
    address: '456 Wyandotte St E, Windsor, ON N9A 3H8',
    creditScore: 535,
    stage: 'Docs In',
    aiSummary: 'Auto worker, good income, recent credit issues',
    fullAiSummary: 'Credit score 535 following recent divorce. Ford assembly line worker for 8 years. Monthly income $4,200. Recent credit issues but strong employment history.',
    employer: 'Ford Motor Company',
    jobTitle: 'Assembly Line Worker',
    monthlyIncome: 4200,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg']
    },
    alerts: ['🚗 Auto Industry', '📄 Missing Income Docs'],
    communications: [],
    createdAt: '2024-01-13T09:30:00Z'
  },
  {
    id: '12',
    name: 'Daniel Martinez',
    phone: '(905) 890-1234',
    email: 'daniel.martinez@email.com',
    address: '321 Steeles Ave E, Brampton, ON L6W 2Y9',
    creditScore: 495,
    stage: 'Presenting Options',
    aiSummary: 'Young professional, building credit, needs guidance',
    fullAiSummary: 'Credit score 495 with limited credit history. Recent college graduate in accounting. Monthly income $2,900. Good prospect for credit building programs.',
    employer: 'H&R Block',
    jobTitle: 'Tax Preparer',
    monthlyIncome: 2900,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['👨‍🎓 Recent Graduate', '🔥 Ready to Present'],
    communications: [],
    createdAt: '2024-01-12T15:45:00Z'
  },
  {
    id: '13',
    name: 'Jennifer Rodriguez',
    phone: '(613) 901-2345',
    email: 'jennifer.rodriguez@email.com',
    address: '654 Bank St, Ottawa, ON K1S 3T2',
    creditScore: 605,
    stage: 'New Lead',
    aiSummary: 'Government worker, excellent stability, prime candidate',
    fullAiSummary: 'Credit score 605 with stable credit profile. Federal government employee for 6 years. Monthly income $4,100. Excellent candidate for prime lending.',
    employer: 'Government of Canada',
    jobTitle: 'Policy Analyst',
    monthlyIncome: 4100,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '🏛️ Government'],
    communications: [],
    createdAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '14',
    name: 'Kevin Thompson',
    phone: '(705) 012-3456',
    email: 'kevin.thompson@email.com',
    address: '987 Memorial Ave, Orillia, ON L3V 6H3',
    creditScore: 465,
    stage: 'Docs In',
    aiSummary: 'Construction worker, seasonal income, subprime candidate',
    fullAiSummary: 'Credit score 465 with irregular payment history. Construction foreman with seasonal work patterns. Average monthly income $3,600. Needs specialized financing.',
    employer: 'PCL Construction',
    jobTitle: 'Construction Foreman',
    monthlyIncome: 3600,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg']
    },
    alerts: ['🏗️ Construction', '📄 Income Verification Needed'],
    communications: [],
    createdAt: '2024-01-14T10:15:00Z'
  },
  {
    id: '15',
    name: 'Maria Gonzalez',
    phone: '(289) 123-4567',
    email: 'maria.gonzalez@email.com',
    address: '147 King St W, Oshawa, ON L1J 2J9',
    creditScore: 555,
    stage: 'Presenting Options',
    aiSummary: 'Healthcare aide, stable job, fair credit rating',
    fullAiSummary: 'Credit score 555 with improving payment pattern. Personal support worker at long-term care facility. Monthly income $2,800. Good candidate for near-prime rates.',
    employer: 'Lakeridge Health',
    jobTitle: 'Personal Support Worker',
    monthlyIncome: 2800,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🏥 Healthcare', '🔥 Ready to Present'],
    communications: [],
    createdAt: '2024-01-11T16:30:00Z'
  },
  {
    id: '16',
    name: 'Ryan Clark',
    phone: '(705) 234-5678',
    email: 'ryan.clark@email.com',
    address: '258 Lakeshore Dr, North Bay, ON P1A 2C4',
    creditScore: 510,
    stage: 'New Lead',
    aiSummary: 'Small business owner, variable income, needs documentation',
    fullAiSummary: 'Credit score 510 with mixed payment history. Owns small landscaping business. Variable monthly income averaging $3,200. Requires business income verification.',
    employer: 'Self-Employed',
    jobTitle: 'Business Owner',
    monthlyIncome: 3200,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '💼 Business Owner'],
    communications: [],
    createdAt: '2024-01-16T08:45:00Z'
  },
  {
    id: '17',
    name: 'Ashley White',
    phone: '(519) 345-6789',
    email: 'ashley.white@email.com',
    address: '369 Dundas St, Woodstock, ON N4S 1B8',
    creditScore: 485,
    stage: 'Docs In',
    aiSummary: 'Retail manager, consistent income, credit challenges',
    fullAiSummary: 'Credit score 485 with recent financial difficulties. Retail store manager for 3 years. Monthly income $3,100. Working to rebuild credit standing.',
    employer: 'Walmart Canada',
    jobTitle: 'Store Manager',
    monthlyIncome: 3100,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg']
    },
    alerts: ['🛒 Retail', '💪 Credit Rebuilding'],
    communications: [],
    createdAt: '2024-01-13T12:20:00Z'
  },
  {
    id: '18',
    name: 'Steven Lee',
    phone: '(416) 456-7890',
    email: 'steven.lee@email.com',
    address: '741 Don Mills Rd, Toronto, ON M3C 1T2',
    creditScore: 625,
    stage: 'Funding',
    aiSummary: 'IT professional, good credit, approved prime plus',
    fullAiSummary: 'Credit score 625 with solid credit history. IT support specialist at major bank. Monthly income $4,800. Approved at prime plus 2% pending final verification.',
    employer: 'TD Bank',
    jobTitle: 'IT Support Specialist',
    monthlyIncome: 4800,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🎉 Approved', '💻 IT Professional'],
    communications: [],
    createdAt: '2024-01-09T14:10:00Z'
  },
  {
    id: '19',
    name: 'Nicole Walker',
    phone: '(905) 567-8901',
    email: 'nicole.walker@email.com',
    address: '852 Hurontario St, Mississauga, ON L5G 3H4',
    creditScore: 470,
    stage: 'New Lead',
    aiSummary: 'Customer service rep, credit repair needed, willing borrower',
    fullAiSummary: 'Credit score 470 with multiple collection accounts. Customer service representative for 2 years. Monthly income $2,600. Motivated to improve credit situation.',
    employer: 'Bell Canada',
    jobTitle: 'Customer Service Representative',
    monthlyIncome: 2600,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '⚠️ Credit Repair Needed'],
    communications: [],
    createdAt: '2024-01-16T10:30:00Z'
  },
  {
    id: '20',
    name: 'Brian Hall',
    phone: '(613) 678-9012',
    email: 'brian.hall@email.com',
    address: '963 Merivale Rd, Ottawa, ON K1Z 6A8',
    creditScore: 540,
    stage: 'Presenting Options',
    aiSummary: 'Trades worker, apprentice wages, potential for growth',
    fullAiSummary: 'Credit score 540 with limited credit history. Electrician apprentice in 3rd year. Monthly income $3,000. Good prospect as income will increase upon certification.',
    employer: 'IBEW Local 586',
    jobTitle: 'Electrician Apprentice',
    monthlyIncome: 3000,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg']
    },
    alerts: ['⚡ Trades Worker', '🔥 Ready to Present'],
    communications: [],
    createdAt: '2024-01-12T11:15:00Z'
  },
  {
    id: '21',
    name: 'Stephanie Young',
    phone: '(705) 789-0123',
    email: 'stephanie.young@email.com',
    address: '174 Pine St, Timmins, ON P4N 2K3',
    creditScore: 515,
    stage: 'Docs In',
    aiSummary: 'Bank teller, stable employment, fair credit profile',
    fullAiSummary: 'Credit score 515 with steady payment history. Bank teller for 4 years with consistent employment. Monthly income $2,700. Good candidate for competitive rates.',
    employer: 'RBC Royal Bank',
    jobTitle: 'Bank Teller',
    monthlyIncome: 2700,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🏦 Banking', '📄 Income Docs Pending'],
    communications: [],
    createdAt: '2024-01-14T13:45:00Z'
  },
  {
    id: '22',
    name: 'Justin King',
    phone: '(519) 890-1234',
    email: 'justin.king@email.com',
    address: '285 Grand River Ave, Cambridge, ON N1R 1N5',
    creditScore: 580,
    stage: 'New Lead',
    aiSummary: 'Manufacturing worker, union benefits, solid prospect',
    fullAiSummary: 'Credit score 580 with stable credit profile. Manufacturing technician with union job security. Monthly income $4,400. Strong candidate for competitive financing.',
    employer: 'Toyota Motor Manufacturing Canada',
    jobTitle: 'Manufacturing Technician',
    monthlyIncome: 4400,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '🏭 Manufacturing'],
    communications: [],
    createdAt: '2024-01-16T15:20:00Z'
  },
  {
    id: '23',
    name: 'Rachel Green',
    phone: '(289) 901-2345',
    email: 'rachel.green@email.com',
    address: '396 Main St W, North Bay, ON P1B 2T8',
    creditScore: 490,
    stage: 'Docs In',
    aiSummary: 'Teacher, summer income gaps, needs special consideration',
    fullAiSummary: 'Credit score 490 with seasonal income patterns. Elementary school teacher with 10 months annual income. Monthly income $3,800 during school year. Requires teacher-specific lending.',
    employer: 'Near North District School Board',
    jobTitle: 'Elementary Teacher',
    monthlyIncome: 3800,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg']
    },
    alerts: ['👩‍🏫 Teacher', '📚 Seasonal Income'],
    communications: [],
    createdAt: '2024-01-13T14:50:00Z'
  },
  {
    id: '24',
    name: 'Mark Adams',
    phone: '(613) 012-3456',
    email: 'mark.adams@email.com',
    address: '507 Somerset St W, Ottawa, ON K1R 5J7',
    creditScore: 635,
    stage: 'Funding',
    aiSummary: 'Consultant, variable income, approved with conditions',
    fullAiSummary: 'Credit score 635 with good payment history. Independent management consultant with variable income. Average monthly income $5,400. Approved pending income verification.',
    employer: 'Self-Employed',
    jobTitle: 'Management Consultant',
    monthlyIncome: 5400,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🎉 Approved Conditional', '💼 Consultant'],
    communications: [],
    createdAt: '2024-01-08T16:25:00Z'
  },
  {
    id: '25',
    name: 'Laura Scott',
    phone: '(705) 123-4567',
    email: 'laura.scott@email.com',
    address: '618 Regent St, Sudbury, ON P3E 3Z8',
    creditScore: 455,
    stage: 'New Lead',
    aiSummary: 'Single parent, part-time work, challenging credit situation',
    fullAiSummary: 'Credit score 455 with recent credit challenges. Part-time retail worker and single parent. Monthly income $2,200. Requires specialized subprime lender with flexible terms.',
    employer: 'Canadian Tire',
    jobTitle: 'Sales Associate',
    monthlyIncome: 2200,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '👩‍👧‍👦 Single Parent'],
    communications: [],
    createdAt: '2024-01-16T12:40:00Z'
  },
  {
    id: '26',
    name: 'Andrew Mitchell',
    phone: '(519) 234-5678',
    email: 'andrew.mitchell@email.com',
    address: '729 University Ave W, Windsor, ON N9A 5R1',
    creditScore: 565,
    stage: 'Presenting Options',
    aiSummary: 'Security guard, steady hours, improving credit score',
    fullAiSummary: 'Credit score 565 with upward trend in payments. Security supervisor working rotating shifts. Monthly income $3,300. Credit score improving steadily over 12 months.',
    employer: 'Securitas Canada',
    jobTitle: 'Security Supervisor',
    monthlyIncome: 3300,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg']
    },
    alerts: ['🛡️ Security', '🔥 Ready to Present'],
    communications: [],
    createdAt: '2024-01-11T09:55:00Z'
  },
  {
    id: '27',
    name: 'Kimberly Turner',
    phone: '(905) 345-6789',
    email: 'kimberly.turner@email.com',
    address: '840 Mohawk Rd E, Hamilton, ON L8V 2R6',
    creditScore: 520,
    stage: 'Docs In',
    aiSummary: 'Pharmacy tech, healthcare benefits, stable employment',
    fullAiSummary: 'Credit score 520 with consistent payment history. Pharmacy technician at major hospital. Monthly income $3,400. Strong employment in healthcare sector with benefits.',
    employer: 'Hamilton Health Sciences',
    jobTitle: 'Pharmacy Technician',
    monthlyIncome: 3400,
    documents: {
      license: true,
      income: false,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['💊 Pharmacy', '🏥 Healthcare'],
    communications: [],
    createdAt: '2024-01-13T15:10:00Z'
  },
  {
    id: '28',
    name: 'Gregory Phillips',
    phone: '(807) 456-7890',
    email: 'gregory.phillips@email.com',
    address: '951 Arthur St W, Thunder Bay, ON P7E 5P8',
    creditScore: 475,
    stage: 'New Lead',
    aiSummary: 'Forestry worker, seasonal layoffs, irregular income',
    fullAiSummary: 'Credit score 475 with payment difficulties during layoff periods. Forestry equipment operator with seasonal work. Monthly income varies $2,800-$4,200. Needs specialized forestry worker financing.',
    employer: 'Resolute Forest Products',
    jobTitle: 'Equipment Operator',
    monthlyIncome: 3500,
    documents: {
      license: false,
      income: false,
      images: []
    },
    alerts: ['✨ New Lead', '🌲 Forestry'],
    communications: [],
    createdAt: '2024-01-16T13:25:00Z'
  },
  {
    id: '29',
    name: 'Melissa Campbell',
    phone: '(705) 567-8901',
    email: 'melissa.campbell@email.com',
    address: '162 Dunlop St E, Barrie, ON L4M 1A8',
    creditScore: 595,
    stage: 'Presenting Options',
    aiSummary: 'Insurance broker, commission income, good credit standing',
    fullAiSummary: 'Credit score 595 with strong credit profile. Licensed insurance broker with established client base. Monthly income $4,100. Good candidate for competitive rates with commission income verification.',
    employer: 'Intact Insurance',
    jobTitle: 'Insurance Broker',
    monthlyIncome: 4100,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['🛡️ Insurance', '🔥 Ready to Present'],
    communications: [],
    createdAt: '2024-01-10T17:40:00Z'
  },
  {
    id: '30',
    name: 'Joseph Parker',
    phone: '(613) 678-9012',
    email: 'joseph.parker@email.com',
    address: '273 Carling Ave, Ottawa, ON K1S 2E1',
    creditScore: 545,
    stage: 'Delivered',
    aiSummary: 'Recent delivery, mechanic, strong repeat customer potential',
    fullAiSummary: 'Credit score 545, recently completed successful financing. Licensed automotive technician with 8 years experience. Monthly income $3,900. Excellent payment history on previous loan.',
    employer: 'Canadian Tire Automotive',
    jobTitle: 'Automotive Technician',
    monthlyIncome: 3900,
    documents: {
      license: true,
      income: true,
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
    },
    alerts: ['✅ Recent Delivery', '🔧 Mechanic'],
    communications: [
      {
        id: '30',
        type: 'text',
        content: 'Thanks for everything! The financing process was smooth and I love my new car!',
        timestamp: '2024-01-14T19:30:00Z',
        direction: 'inbound'
      }
    ],
    createdAt: '2024-01-05T12:15:00Z'
  }
];
