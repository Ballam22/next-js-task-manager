import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
// src/routes/auth.ts
import express from 'express';
import {
  type RegisterInput,
  registerSchema,
} from '../../../validation/registerSchema';
import prisma from '../prismaClient';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  // Validate the incoming request body using Zod
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: result.error.errors, // Array of detailed error messages
    });
  }

  const { username, email, password } = result.data as RegisterInput;

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    // Respond with the created user (omit sensitive info)
    return res.status(201).json({
      message: 'User created successfully',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
