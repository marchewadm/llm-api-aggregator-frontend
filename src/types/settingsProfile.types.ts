import * as z from 'zod';
import { profileAccountSchema, profilePasswordSchema } from '@/schemas/settingsProfile.schemas';

const partialProfileAccountSchema = profileAccountSchema.partial();

export type PartialProfileAccountDetails = z.infer<typeof partialProfileAccountSchema>;

export type ProfilePasswordDetails = z.infer<typeof profilePasswordSchema>;
