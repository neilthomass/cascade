-- Seed additional agents for the team
-- Run with: wrangler d1 execute cascade-testimonials --file=seed-agents.sql --remote

INSERT INTO agent_bios (
  name, title, bio_text, email, phone,
  years_experience, lifetime_sales, avg_sale_price, clients_count,
  education, awards, certifications, specialties, languages, areas_served,
  display_order, is_active
) VALUES
(
  'Wilker Ambooken',
  'Senior Real Estate Agent',
  'Wilker brings a wealth of experience in residential and commercial real estate. His attention to detail and client-first approach has earned him a reputation as one of the most trusted agents in the Bay Area. Wilker specializes in helping first-time homebuyers navigate the complex real estate market.',
  'wilker@cascadecaliforniarealty.com',
  '(925) 555-0102',
  8,
  '$150M+',
  '$850K',
  120,
  '["UC Davis, B.S. Economics"]',
  '["Top Producer 2023"]',
  '["Licensed Realtor", "SRES"]',
  '["First-Time Buyers", "Investment Properties"]',
  '["English", "Malayalam"]',
  '["Fremont", "Newark", "Union City"]',
  2,
  1
),
(
  'Jacob Pulickal',
  'Real Estate Specialist',
  'Jacob is passionate about helping families find their perfect home. With a background in finance and a keen eye for market trends, he provides valuable insights to both buyers and sellers. Jacob is known for his negotiation skills and ability to close deals efficiently.',
  'jacob@cascadecaliforniarealty.com',
  '(925) 555-0103',
  5,
  '$75M+',
  '$720K',
  85,
  '["Santa Clara University, B.A. Finance"]',
  '["Rising Star Award 2024"]',
  '["Licensed Realtor"]',
  '["Luxury Homes", "Relocation Services"]',
  '["English", "Hindi"]',
  '["San Jose", "Milpitas", "Santa Clara"]',
  3,
  1
),
(
  'Daud Shirzai',
  'Real Estate Agent',
  'Daud combines his technical background with real estate expertise to provide data-driven advice to his clients. He excels at market analysis and helping clients make informed decisions. His multilingual abilities make him an invaluable resource for diverse communities.',
  'daud@cascadecaliforniarealty.com',
  '(925) 555-0104',
  3,
  '$40M+',
  '$680K',
  50,
  '["San Jose State University, B.S. Computer Science"]',
  '["Rookie of the Year 2023"]',
  '["Licensed Realtor"]',
  '["Tech Professionals", "Condo Specialists"]',
  '["English", "Dari", "Pashto"]',
  '["Sunnyvale", "Mountain View", "Cupertino"]',
  4,
  1
);
