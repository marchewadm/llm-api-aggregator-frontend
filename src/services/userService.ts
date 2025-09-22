import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { displaySuccessNotification, handleAxiosError } from '@/utils/utils';
import {
  getUserProfileClient,
  updateUserProfileClient,
  updateUserPasswordClient,
  updateUserPassphraseClient
} from '@/api/userClient';
import type { Router } from 'vue-router';
import type {
  PartialProfileAccountDetails,
  ProfilePasswordDetails
} from '@/types/settingsProfile.types';

export async function getUserProfileService(router: Router) {
  try {
    const userStore = useUserStore();
    const { setUserProfile } = userStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await getUserProfileClient(accessToken.value!);

    setUserProfile(response.data);
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateUserProfileService(
  partialProfileAccount: PartialProfileAccountDetails,
  router: Router
) {
  try {
    const userStore = useUserStore();
    const { updateUserProfile } = userStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await updateUserProfileClient(partialProfileAccount, accessToken.value!);

    displaySuccessNotification(response.data.message);

    if (response.data.name) {
      updateUserProfile({ name: response.data.name });
    }
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateUserPasswordService(
  profilePasswordDetails: ProfilePasswordDetails,
  router: Router
) {
  try {
    const userStore = useUserStore();
    const { $reset } = userStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await updateUserPasswordClient(profilePasswordDetails, accessToken.value!);

    $reset();
    await router.push({ name: 'Home' });
    displaySuccessNotification(response.data.message);
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateUserPassphraseService(router: Router) {
  try {
    const userStore = useUserStore();
    const { accessToken } = storeToRefs(userStore);

    const response = await updateUserPassphraseClient(accessToken.value!);

    return response.data.passphrase;
  } catch (err) {
    handleAxiosError(err, router);
  }
}
