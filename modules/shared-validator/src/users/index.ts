import { z } from 'zod';

const UserEmail = z.string().email().min(5);
const Username = z.string().min(3);

export const SignUpPreCheckPayload = z.object({
  email: UserEmail,
  name: Username,
});

export const SignUpPreCheckResponse = z.object({
  token: z.string(),
  credential_id: z.string(),
});

export const UserResponse = z.object({
  name: z.string(),
  email: z.string(),
});

export const UserPayload = z.object({
  name: Username,
  email: UserEmail,
  token: z.string(),
});
