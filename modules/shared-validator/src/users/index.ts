import { z } from 'zod';

export const UserPayload = z.object({
  name: z.string().optional(),
  email: z.string().email().min(5),
});
