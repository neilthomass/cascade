-- Add DRE number column to agent_bios
-- Run with: wrangler d1 execute cascade-testimonials --file=add-dre-column.sql --remote

ALTER TABLE agent_bios ADD COLUMN dre_number TEXT;
