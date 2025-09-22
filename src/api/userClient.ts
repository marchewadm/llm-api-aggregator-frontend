import axios from 'axios';
import type { UserProfile } from '@/types/user.types';
import type {
  PartialProfileAccountDetails,
  ProfilePasswordDetails
} from '@/types/settingsProfile.types';

const PREFIX_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export async function getUserProfileClient(accessToken: string) {
  return axios.get<UserProfile>(PREFIX_URL, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

// TODO: Update the return type
export async function updateUserProfileClient(
  partialProfileAccount: PartialProfileAccountDetails,
  accessToken: string
) {
  return axios.patch<{ message: string; name?: string }>(
    `${PREFIX_URL}/update-profile`,
    partialProfileAccount,
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  );
}

export async function updateUserPasswordClient(
  profilePassword: ProfilePasswordDetails,
  accessToken: string
) {
  return axios.patch<{ message: string }>(`${PREFIX_URL}/update-password`, profilePassword, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

export async function updateUserPassphraseClient(accessToken: string) {
  return axios.patch<{ passphrase: string }>(`${PREFIX_URL}/update-passphrase`, null, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
