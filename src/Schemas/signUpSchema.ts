import {z} from 'zod';

export const usernameValidation = z
  .string()
  .min(3, 'Username must be at least 3 characters long')
  .max(20, 'Username must be at most 20 characters long')
  .refine(value => /^[a-zA-Z0-9_]+$/.test(value), {
    message: 'Username must contain only letters, numbers, and underscores',
  });

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:'invalid eamil address'}),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    
})