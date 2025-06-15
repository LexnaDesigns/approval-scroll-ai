
-- Allow public insert access for communications table so the message simulator can work
CREATE POLICY "Allow public insert access for all" ON public.communications FOR INSERT WITH CHECK (true);

-- Allow public update access for communications table 
CREATE POLICY "Allow public update access for all" ON public.communications FOR UPDATE USING (true);

-- Allow public delete access for communications table
CREATE POLICY "Allow public delete access for all" ON public.communications FOR DELETE USING (true);
