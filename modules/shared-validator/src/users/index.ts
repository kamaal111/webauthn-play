import { z } from 'zod';

export const UserResponse = z.object({
  name: z.string().nullable(),
  email: z.string(),
});

export const UserPayload = z.object({
  name: z.string().optional(),
  email: z.string().email().min(5),
});
