import { handleAxiosError } from '@/utils/utils';
import { getApiProvidersClient } from '@/api/apiProviderClient';
import type { Router } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

export async function getApiProvidersService(router: Router) {
  try {
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const { setApiProviders } = chatStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await getApiProvidersClient(accessToken.value!);

    setApiProviders(response.data.apiProviders);
  } catch (err) {
    handleAxiosError(err, router);
  }
}
