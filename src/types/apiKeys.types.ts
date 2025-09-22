import * as z from 'zod';
import { apiKeysSchema } from '@/schemas/apiKeys.schemas';

export type ApiProviderState = {
  name: string;
  lowerCaseName: string;
  aiModels: string[];
  apiProviderId: number;
  isSelected: boolean;
};

export type ApiProviderDetails = {
  id: number;
  name: string;
  aiModels: string[];
};

export type ApiKeyState = {
  id: number;
  key?: string;
  apiProvider?: ApiProviderState;
  isOpen: boolean;
  isRevealed: boolean;
};

export type ApiKeyDetails = {
  id: number;
  key: string;
  apiProviderId: number;
  apiProviderName: string;
  apiProviderLowerCaseName: string;
};

export type UpdateApiKeys = z.infer<typeof apiKeysSchema>;
