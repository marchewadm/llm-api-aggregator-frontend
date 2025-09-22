import axios from 'axios';
import type { Passphrase } from '@/types/passphrase.types';
import type { ApiKeyDetails, UpdateApiKeys } from '@/types/apiKeys.types';

const PREFIX_URL = `${import.meta.env.VITE_BACKEND_URL}/api-key`;

export async function getApiKeysClient(passphraseData: Passphrase, accessToken: string) {
  return axios.post<{ apiKeysDetails: ApiKeyDetails[] }>(PREFIX_URL, passphraseData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export async function updateApiKeysClient(apiKeys: UpdateApiKeys, accessToken: string) {
  return axios.patch<{ message: string }>(PREFIX_URL, apiKeys, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
