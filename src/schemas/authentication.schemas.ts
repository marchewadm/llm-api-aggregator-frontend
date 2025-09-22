import * as z from 'zod';

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'This field has to be filled' })
      .max(50, { message: 'Name must be at most 50 characters long' }),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled' })
      .email('This is not a valid email'),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    password2: z.string().min(8, { message: 'Password must be at least 8 characters long' })
  })
  .refine((data) => data.password === data.password2, {
    message: 'Passwords do not match',
    path: ['password2']
  });

export const loginUserSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email('This is not a valid email'),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});

export const resetUserPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email('This is not a valid email')
});
