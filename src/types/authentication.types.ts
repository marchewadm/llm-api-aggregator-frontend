import * as z from 'zod';
import {
  registerUserSchema,
  loginUserSchema,
  resetUserPasswordSchema
} from '@/schemas/authentication.schemas';

export type AuthenticationForm = 'login' | 'register' | 'resetPassword';

export type RegisterUser = z.infer<typeof registerUserSchema>;

export type LoginUser = z.infer<typeof loginUserSchema>;

export type ResetUserPassword = z.infer<typeof resetUserPasswordSchema>;
