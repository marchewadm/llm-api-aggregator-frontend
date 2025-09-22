import * as z from 'zod';

export const validatePassphraseSchema = z.object({
  passphrase: z.string().min(1, { message: 'This field has to be filled' })
});
