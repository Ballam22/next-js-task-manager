// util/jwt.ts
import jwt from 'jsonwebtoken';

// Type assertion for environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    {
      expiresIn: (JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'], // Fallback to 1 day
    } satisfies jwt.SignOptions, // Explicit type satisfaction
  );
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};
