import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { displaySuccessNotification, handleAxiosError } from '@/utils/utils';
import { getApiKeysClient, updateApiKeysClient } from '@/api/apiKeysClient';
import { usePassphraseValidationBus } from '@/utils/eventBus';
import type { Router } from 'vue-router';
import type { Passphrase } from '@/types/passphrase.types';
import type { UpdateApiKeys } from '@/types/apiKeys.types';

export async function getApiKeysService(passphraseData: Passphrase, router: Router) {
  try {
    const userStore = useUserStore();
    const { accessToken } = storeToRefs(userStore);
    const { setUserApiKeys } = userStore;
    const { emitSuccess } = usePassphraseValidationBus();

    const response = await getApiKeysClient(passphraseData, accessToken.value!);
    setUserApiKeys(response.data.apiKeysDetails);
    emitSuccess();
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateApiKeysService(apiKeys: UpdateApiKeys, router: Router) {
  try {
    const userStore = useUserStore();
    const { accessToken } = storeToRefs(userStore);

    const response = await updateApiKeysClient(apiKeys, accessToken.value!);
    displaySuccessNotification(response.data.message);

    return response;
  } catch (err) {
    handleAxiosError(err, router);
  }
}
