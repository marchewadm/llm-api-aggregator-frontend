import * as z from 'zod';
import { validatePassphraseSchema } from '@/schemas/passphrase.schemas';

export type Passphrase = z.infer<typeof validatePassphraseSchema>;
