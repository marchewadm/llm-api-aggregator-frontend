import * as z from 'zod';

// TODO: Consider creating a new, separate file for the constants
// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const profileAccountSchema = z.object({
  // avatar: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     'Only .jpg, .jpeg, .png and .webp formats are supported.'
  //   ),
  name: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .max(50, { message: 'Name must be at most 50 characters long' }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled' })
    .email('This is not a valid email')
});

export const profilePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    newPassword2: z.string().min(8, { message: 'Password must be at least 8 characters long' })
  })
  .refine((data) => data.newPassword === data.newPassword2, {
    message: 'Passwords do not match',
    path: ['newPassword2']
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from the current one',
    path: ['newPassword']
  });
