import * as z from 'zod';

export const apiKeysSchema = z.object({
  apiKeys: z
    .array(
      z.object({
        key: z.string().min(1).optional(),
        apiProviderId: z.number().optional()
      })
    )
    .refine((apiKeys) => {
      return apiKeys.every((apiKey) => {
        return !apiKey.key || (apiKey.key && apiKey.apiProviderId);
      });
    }),
  passphrase: z.string().min(1)
});
