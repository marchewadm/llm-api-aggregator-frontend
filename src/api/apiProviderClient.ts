import axios from 'axios';
import type { ApiProviderDetails } from '@/types/apiKeys.types';

const PREFIX_URL = `${import.meta.env.VITE_BACKEND_URL}/api-provider`;

export async function getApiProvidersClient(accessToken: string) {
  return axios.get<{ apiProviders: ApiProviderDetails[] }>(`${PREFIX_URL}/all`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
