import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['active', 'on-hold', 'completed']).optional(),
});
