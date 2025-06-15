
-- Drop existing tables and types to ensure a clean setup
DROP TABLE IF EXISTS public.communications;
DROP TABLE IF EXISTS public.clients;
DROP TYPE IF EXISTS public.client_stage;
DROP TYPE IF EXISTS public.communication_type;
DROP TYPE IF EXISTS public.communication_direction;

-- Create custom ENUM types for better data integrity
CREATE TYPE public.client_stage AS ENUM ('New Lead', 'Docs In', 'Presenting Options', 'Funding', 'Delivered', 'Killed');
CREATE TYPE public.communication_type AS ENUM ('text', 'email', 'call', 'ai');
CREATE TYPE public.communication_direction AS ENUM ('inbound', 'outbound');

-- Create the clients table
CREATE TABLE public.clients (
  id text PRIMARY KEY,
  name text NOT NULL,
  phone text,
  email text,
  address text,
  credit_score integer,
  stage public.client_stage,
  ai_summary text,
  full_ai_summary text,
  employer text,
  job_title text,
  monthly_income integer,
  has_license boolean,
  has_income_proof boolean,
  document_images text[],
  alerts text[],
  created_at timestamptz
);

-- Create the communications table
CREATE TABLE public.communications (
  id text PRIMARY KEY,
  client_id text NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  type public.communication_type NOT NULL,
  content text NOT NULL,
  "timestamp" timestamptz NOT NULL,
  direction public.communication_direction NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;

-- For now, allow public read access so we can see the data.
-- We should implement proper authentication and policies later.
CREATE POLICY "Allow public read access for all" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Allow public read access for all" ON public.communications FOR SELECT USING (true);

-- Insert all mock clients into the 'clients' table
INSERT INTO public.clients (id, name, phone, email, address, credit_score, stage, ai_summary, full_ai_summary, employer, job_title, monthly_income, has_license, has_income_proof, document_images, alerts, created_at) VALUES
('1', 'Sarah Johnson', '(416) 123-4567', 'sarah.johnson@email.com', '123 Bay St, Toronto, ON M5J 2R8', 580, 'Presenting Options', 'Thin credit, stable job, $3,200 income, ready to present', 'Credit score 580 with thin file. Stable employment at Rogers Communications for 2 years. Monthly gross income $3,200. No major derogatory marks but limited credit history. Good candidate for subprime approval with reasonable terms.', 'Rogers Communications', 'Customer Service Representative', 3200, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🔥 Ready to Present'], '2024-01-14T09:00:00Z'),
('2', 'Michael Chen', '(905) 987-6543', 'michael.chen@email.com', '456 Dundas St W, Mississauga, ON L5B 1H3', 520, 'Docs In', 'Previous bankruptcy, recovering credit, $2,800 income, needs cosigner', 'Credit score 520 with previous bankruptcy discharged 18 months ago. Currently employed at Canadian Tire for 8 months. Monthly income $2,800. Will likely need a cosigner or larger down payment for approval.', 'Canadian Tire', 'Sales Associate', 2800, true, false, ARRAY['/placeholder.svg'], ARRAY['⚠️ Previous Bankruptcy','📄 Missing Income Docs'], '2024-01-13T11:15:00Z'),
('3', 'Jessica Williams', '(613) 456-7890', 'jessica.williams@email.com', '789 Rideau St, Ottawa, ON K1N 5Y4', 640, 'New Lead', 'Good credit, self-employed, variable income, promising lead', 'Credit score 640 with good payment history. Self-employed contractor with variable income averaging $4,200/month. Good candidate for approval with proper income documentation.', 'Self-Employed', 'Contractor', 4200, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','💼 Self-Employed'], '2024-01-15T16:45:00Z'),
('4', 'David Rodriguez', '(519) 321-0987', 'david.rodriguez@email.com', '321 Richmond St, London, ON N6A 3C2', 450, 'Funding', 'Deep subprime, approved at 18.9%, $5K down, funding in progress', 'Credit score 450 with multiple collection accounts. Approved through Iceberg Finance at 18.9% APR with $5,000 down payment. Funding documentation in progress.', 'Metro Inc.', 'Warehouse Worker', 2600, true, true, ARRAY['/placeholder.svg','/placeholder.svg','/placeholder.svg'], ARRAY['🎉 Approved - Funding'], '2024-01-10T08:30:00Z'),
('5', 'Amanda Thompson', '(705) 654-3210', 'amanda.thompson@email.com', '654 Algonquin Ave, North Bay, ON P1B 4W3', 520, 'Docs In', 'Young buyer, thin file, stable income, good first-time buyer', 'Credit score 520 with limited credit history due to age (22). Stable employment at Shoppers Drug Mart for 14 months. Good candidate for first-time buyer programs.', 'Shoppers Drug Mart', 'Pharmacy Assistant', 2400, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['👶 First-Time Buyer'], '2024-01-12T14:20:00Z'),
('6', 'Robert Taylor', '(905) 234-5678', 'robert.taylor@email.com', '125 Main St E, Hamilton, ON L8N 1G7', 595, 'New Lead', 'Decent credit, union job, stable income, good prospect', 'Credit score 595 with steady payment history. Union steelworker with 5 years employment. Monthly income $4,800. Minor derogatory marks but overall strong candidate.', 'Stelco', 'Steelworker', 4800, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','🏭 Union Job'], '2024-01-16T09:15:00Z'),
('7', 'Lisa Anderson', '(289) 345-6789', 'lisa.anderson@email.com', '987 Upper James St, Hamilton, ON L9C 3A2', 480, 'Presenting Options', 'Rebuilding credit, steady job, needs competitive rate', 'Credit score 480 following consumer proposal completion. Employed at Tim Hortons management for 18 months. Income $3,400/month. Good payment history since proposal.', 'Tim Hortons', 'Assistant Manager', 3400, true, true, ARRAY['/placeholder.svg'], ARRAY['🔄 Credit Rebuilding','🔥 Ready to Present'], '2024-01-12T14:30:00Z'),
('8', 'James Wilson', '(226) 456-7890', 'james.wilson@email.com', '246 King St, Kitchener, ON N2G 2M4', 525, 'Docs In', 'Tech worker, good income, thin file due to immigration', 'Credit score 525 with limited Canadian credit history. Recent immigrant working in tech sector. Monthly income $5,200. Strong employment but needs to establish credit.', 'BlackBerry', 'Software Developer', 5200, true, false, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🌍 New Canadian','💻 Tech Sector'], '2024-01-14T16:20:00Z'),
('9', 'Michelle Brown', '(705) 567-8901', 'michelle.brown@email.com', '135 Cedar St, Sudbury, ON P3E 1B2', 445, 'New Lead', 'Mining sector, irregular income, deep subprime', 'Credit score 445 with multiple late payments. Works in mining with seasonal layoffs. Average monthly income $3,800. Requires specialized subprime lender.', 'Vale Canada', 'Equipment Operator', 3800, false, false, ARRAY[]::text[], ARRAY['⚠️ Deep Subprime','⛏️ Mining Sector'], '2024-01-16T11:45:00Z'),
('10', 'Christopher Davis', '(807) 678-9012', 'christopher.davis@email.com', '789 Arthur St, Thunder Bay, ON P7E 5R2', 610, 'Funding', 'Healthcare worker, approved prime rate, finalizing docs', 'Credit score 610 with excellent payment history. Registered nurse at Thunder Bay Regional. Monthly income $4,600. Approved at prime rate pending final documentation.', 'Thunder Bay Regional Health Sciences Centre', 'Registered Nurse', 4600, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🎉 Prime Approved','🏥 Healthcare'], '2024-01-10T13:20:00Z'),
('11', 'Patricia Garcia', '(519) 789-0123', 'patricia.garcia@email.com', '456 Wyandotte St E, Windsor, ON N9A 3H8', 535, 'Docs In', 'Auto worker, good income, recent credit issues', 'Credit score 535 following recent divorce. Ford assembly line worker for 8 years. Monthly income $4,200. Recent credit issues but strong employment history.', 'Ford Motor Company', 'Assembly Line Worker', 4200, true, false, ARRAY['/placeholder.svg'], ARRAY['🚗 Auto Industry','📄 Missing Income Docs'], '2024-01-13T09:30:00Z'),
('12', 'Daniel Martinez', '(905) 890-1234', 'daniel.martinez@email.com', '321 Steeles Ave E, Brampton, ON L6W 2Y9', 495, 'Presenting Options', 'Young professional, building credit, needs guidance', 'Credit score 495 with limited credit history. Recent college graduate in accounting. Monthly income $2,900. Good prospect for credit building programs.', 'H&R Block', 'Tax Preparer', 2900, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['👨‍🎓 Recent Graduate','🔥 Ready to Present'], '2024-01-12T15:45:00Z'),
('13', 'Jennifer Rodriguez', '(613) 901-2345', 'jennifer.rodriguez@email.com', '654 Bank St, Ottawa, ON K1S 3T2', 605, 'New Lead', 'Government worker, excellent stability, prime candidate', 'Credit score 605 with stable credit profile. Federal government employee for 6 years. Monthly income $4,100. Excellent candidate for prime lending.', 'Government of Canada', 'Policy Analyst', 4100, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','🏛️ Government'], '2024-01-16T14:20:00Z'),
('14', 'Kevin Thompson', '(705) 012-3456', 'kevin.thompson@email.com', '987 Memorial Ave, Orillia, ON L3V 6H3', 465, 'Docs In', 'Construction worker, seasonal income, subprime candidate', 'Credit score 465 with irregular payment history. Construction foreman with seasonal work patterns. Average monthly income $3,600. Needs specialized financing.', 'PCL Construction', 'Construction Foreman', 3600, true, false, ARRAY['/placeholder.svg'], ARRAY['🏗️ Construction','📄 Income Verification Needed'], '2024-01-14T10:15:00Z'),
('15', 'Maria Gonzalez', '(289) 123-4567', 'maria.gonzalez@email.com', '147 King St W, Oshawa, ON L1J 2J9', 555, 'Presenting Options', 'Healthcare aide, stable job, fair credit rating', 'Credit score 555 with improving payment pattern. Personal support worker at long-term care facility. Monthly income $2,800. Good candidate for near-prime rates.', 'Lakeridge Health', 'Personal Support Worker', 2800, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🏥 Healthcare','🔥 Ready to Present'], '2024-01-11T16:30:00Z'),
('16', 'Ryan Clark', '(705) 234-5678', 'ryan.clark@email.com', '258 Lakeshore Dr, North Bay, ON P1A 2C4', 510, 'New Lead', 'Small business owner, variable income, needs documentation', 'Credit score 510 with mixed payment history. Owns small landscaping business. Variable monthly income averaging $3,200. Requires business income verification.', 'Self-Employed', 'Business Owner', 3200, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','💼 Business Owner'], '2024-01-16T08:45:00Z'),
('17', 'Ashley White', '(519) 345-6789', 'ashley.white@email.com', '369 Dundas St, Woodstock, ON N4S 1B8', 485, 'Docs In', 'Retail manager, consistent income, credit challenges', 'Credit score 485 with recent financial difficulties. Retail store manager for 3 years. Monthly income $3,100. Working to rebuild credit standing.', 'Walmart Canada', 'Store Manager', 3100, true, false, ARRAY['/placeholder.svg'], ARRAY['🛒 Retail','💪 Credit Rebuilding'], '2024-01-13T12:20:00Z'),
('18', 'Steven Lee', '(416) 456-7890', 'steven.lee@email.com', '741 Don Mills Rd, Toronto, ON M3C 1T2', 625, 'Funding', 'IT professional, good credit, approved prime plus', 'Credit score 625 with solid credit history. IT support specialist at major bank. Monthly income $4,800. Approved at prime plus 2% pending final verification.', 'TD Bank', 'IT Support Specialist', 4800, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🎉 Approved','💻 IT Professional'], '2024-01-09T14:10:00Z'),
('19', 'Nicole Walker', '(905) 567-8901', 'nicole.walker@email.com', '852 Hurontario St, Mississauga, ON L5G 3H4', 470, 'New Lead', 'Customer service rep, credit repair needed, willing borrower', 'Credit score 470 with multiple collection accounts. Customer service representative for 2 years. Monthly income $2,600. Motivated to improve credit situation.', 'Bell Canada', 'Customer Service Representative', 2600, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','⚠️ Credit Repair Needed'], '2024-01-16T10:30:00Z'),
('20', 'Brian Hall', '(613) 678-9012', 'brian.hall@email.com', '963 Merivale Rd, Ottawa, ON K1Z 6A8', 540, 'Presenting Options', 'Trades worker, apprentice wages, potential for growth', 'Credit score 540 with limited credit history. Electrician apprentice in 3rd year. Monthly income $3,000. Good prospect as income will increase upon certification.', 'IBEW Local 586', 'Electrician Apprentice', 3000, true, true, ARRAY['/placeholder.svg'], ARRAY['⚡ Trades Worker','🔥 Ready to Present'], '2024-01-12T11:15:00Z'),
('21', 'Stephanie Young', '(705) 789-0123', 'stephanie.young@email.com', '174 Pine St, Timmins, ON P4N 2K3', 515, 'Docs In', 'Bank teller, stable employment, fair credit profile', 'Credit score 515 with steady payment history. Bank teller for 4 years with consistent employment. Monthly income $2,700. Good candidate for competitive rates.', 'RBC Royal Bank', 'Bank Teller', 2700, true, false, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🏦 Banking','📄 Income Docs Pending'], '2024-01-14T13:45:00Z'),
('22', 'Justin King', '(519) 890-1234', 'justin.king@email.com', '285 Grand River Ave, Cambridge, ON N1R 1N5', 580, 'New Lead', 'Manufacturing worker, union benefits, solid prospect', 'Credit score 580 with stable credit profile. Manufacturing technician with union job security. Monthly income $4,400. Strong candidate for competitive financing.', 'Toyota Motor Manufacturing Canada', 'Manufacturing Technician', 4400, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','🏭 Manufacturing'], '2024-01-16T15:20:00Z'),
('23', 'Rachel Green', '(289) 901-2345', 'rachel.green@email.com', '396 Main St W, North Bay, ON P1B 2T8', 490, 'Docs In', 'Teacher, summer income gaps, needs special consideration', 'Credit score 490 with seasonal income patterns. Elementary school teacher with 10 months annual income. Monthly income $3,800 during school year. Requires teacher-specific lending.', 'Near North District School Board', 'Elementary Teacher', 3800, true, false, ARRAY['/placeholder.svg'], ARRAY['👩‍🏫 Teacher','📚 Seasonal Income'], '2024-01-13T14:50:00Z'),
('24', 'Mark Adams', '(613) 012-3456', 'mark.adams@email.com', '507 Somerset St W, Ottawa, ON K1R 5J7', 635, 'Funding', 'Consultant, variable income, approved with conditions', 'Credit score 635 with good payment history. Independent management consultant with variable income. Average monthly income $5,400. Approved pending income verification.', 'Self-Employed', 'Management Consultant', 5400, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🎉 Approved Conditional','💼 Consultant'], '2024-01-08T16:25:00Z'),
('25', 'Laura Scott', '(705) 123-4567', 'laura.scott@email.com', '618 Regent St, Sudbury, ON P3E 3Z8', 455, 'New Lead', 'Single parent, part-time work, challenging credit situation', 'Credit score 455 with recent credit challenges. Part-time retail worker and single parent. Monthly income $2,200. Requires specialized subprime lender with flexible terms.', 'Canadian Tire', 'Sales Associate', 2200, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','👩‍👧‍👦 Single Parent'], '2024-01-16T12:40:00Z'),
('26', 'Andrew Mitchell', '(519) 234-5678', 'andrew.mitchell@email.com', '729 University Ave W, Windsor, ON N9A 5R1', 565, 'Presenting Options', 'Security guard, steady hours, improving credit score', 'Credit score 565 with upward trend in payments. Security supervisor working rotating shifts. Monthly income $3,300. Credit score improving steadily over 12 months.', 'Securitas Canada', 'Security Supervisor', 3300, true, true, ARRAY['/placeholder.svg'], ARRAY['🛡️ Security','🔥 Ready to Present'], '2024-01-11T09:55:00Z'),
('27', 'Kimberly Turner', '(905) 345-6789', 'kimberly.turner@email.com', '840 Mohawk Rd E, Hamilton, ON L8V 2R6', 520, 'Docs In', 'Pharmacy tech, healthcare benefits, stable employment', 'Credit score 520 with consistent payment history. Pharmacy technician at major hospital. Monthly income $3,400. Strong employment in healthcare sector with benefits.', 'Hamilton Health Sciences', 'Pharmacy Technician', 3400, true, false, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['💊 Pharmacy','🏥 Healthcare'], '2024-01-13T15:10:00Z'),
('28', 'Gregory Phillips', '(807) 456-7890', 'gregory.phillips@email.com', '951 Arthur St W, Thunder Bay, ON P7E 5P8', 475, 'New Lead', 'Forestry worker, seasonal layoffs, irregular income', 'Credit score 475 with payment difficulties during layoff periods. Forestry equipment operator with seasonal work. Monthly income varies $2,800-$4,200. Needs specialized forestry worker financing.', 'Resolute Forest Products', 'Equipment Operator', 3500, false, false, ARRAY[]::text[], ARRAY['✨ New Lead','🌲 Forestry'], '2024-01-16T13:25:00Z'),
('29', 'Melissa Campbell', '(705) 567-8901', 'melissa.campbell@email.com', '162 Dunlop St E, Barrie, ON L4M 1A8', 595, 'Presenting Options', 'Insurance broker, commission income, good credit standing', 'Credit score 595 with strong credit profile. Licensed insurance broker with established client base. Monthly income $4,100. Good candidate for competitive rates with commission income verification.', 'Intact Insurance', 'Insurance Broker', 4100, true, true, ARRAY['/placeholder.svg','/placeholder.svg'], ARRAY['🛡️ Insurance','🔥 Ready to Present'], '2024-01-10T17:40:00Z'),
('30', 'Joseph Parker', '(613) 678-9012', 'joseph.parker@email.com', '273 Carling Ave, Ottawa, ON K1S 2E1', 545, 'Delivered', 'Recent delivery, mechanic, strong repeat customer potential', 'Credit score 545, recently completed successful financing. Licensed automotive technician with 8 years experience. Monthly income $3,900. Excellent payment history on previous loan.', 'Canadian Tire Automotive', 'Automotive Technician', 3900, true, true, ARRAY['/placeholder.svg','/placeholder.svg','/placeholder.svg'], ARRAY['✅ Recent Delivery','🔧 Mechanic'], '2024-01-05T12:15:00Z');

-- Insert all communications into the 'communications' table
INSERT INTO public.communications (id, client_id, type, content, "timestamp", direction) VALUES
('1', '1', 'text', 'Hi Sarah! I have some great financing options ready for you. When would be a good time to chat?', '2024-01-15T10:30:00Z', 'outbound'),
('2', '1', 'text', 'Perfect! I can talk now if you have a few minutes', '2024-01-15T10:32:00Z', 'inbound'),
('3', '2', 'email', 'Thank you for your interest! I need to collect a few more documents to complete your application.', '2024-01-15T14:20:00Z', 'outbound'),
('4', '4', 'call', 'Congratulations! Your loan has been approved. We just need to finalize the paperwork.', '2024-01-15T13:00:00Z', 'outbound'),
('5', '5', 'text', 'Hi Amanda! Thanks for sending your documents. Everything looks good so far!', '2024-01-15T11:15:00Z', 'outbound'),
('30', '30', 'text', 'Thanks for everything! The financing process was smooth and I love my new car!', '2024-01-14T19:30:00Z', 'inbound');
