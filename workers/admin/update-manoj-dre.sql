-- Add DRE number for Manoj
-- Run with: wrangler d1 execute cascade-testimonials --file=update-manoj-dre.sql --remote

UPDATE agent_bios SET dre_number = '01234567' WHERE name = 'Manoj Thomas';
