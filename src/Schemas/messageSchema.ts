import { z } from 'zod';

export const messageSchema = z.object({
    content : z
    .string()
    .min(1, 'Content must be at least 1 characters long')
    .max(400, 'Content must be at most 400 characters long')
  });