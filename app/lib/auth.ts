import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { userSchema } from '../validation/auth';

export function validateToken(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return userSchema.parse(decoded);
}

export function generateToken(user: z.infer<typeof userSchema>) {
  return jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
}
