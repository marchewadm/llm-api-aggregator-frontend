import { useStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import type { ApiKeyState, ApiKeyDetails } from '@/types/apiKeys.types';
import type { UserProfile, PartialUserProfile } from '@/types/user.types';

export const useUserStore = defineStore('user', () => {
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);
  const avatar = ref<string | null>(null);
  const isPassphrase = ref<boolean | null>(null);
  const accessToken = useStorage<string | null>('accessToken', null);
  const apiKeys = ref<ApiKeyState[]>([]);

  const chatStore = useChatStore();
  const { apiProviders } = storeToRefs(chatStore);

  // Option Stores have its own reset method but Setup Stores don't - that's why we need to create our own reset method with "$" prefix
  const $reset = () => {
    name.value = null;
    email.value = null;
    avatar.value = null;
    isPassphrase.value = null;
    accessToken.value = null;
    apiKeys.value = [];
  };

  const resetApiKeys = () => {
    apiKeys.value = [];
  };

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  };

  const setUserProfile = (userProfile: UserProfile) => {
    name.value = userProfile.name;
    email.value = userProfile.email;
    avatar.value = userProfile.avatar;
    isPassphrase.value = userProfile.isPassphrase;
  };

  const setUserApiKeys = (apiKeysDetails: ApiKeyDetails[]) => {
    apiKeysDetails.forEach((apiKey) => {
      const apiProvider = apiProviders.value.find(
        (apiProvider) => apiProvider.lowerCaseName === apiKey.apiProviderLowerCaseName
      );

      if (!apiProvider) {
        return;
      }

      apiProvider.isSelected = true;

      apiKeys.value.push({
        id: apiKeys.value.length,
        key: apiKey.key,
        apiProvider,
        isOpen: false,
        isRevealed: false
      });
    });

    // Add an empty api key object to the array to allow the user to add a new api key
    apiKeys.value.push({
      id: apiKeys.value.length,
      isOpen: false,
      isRevealed: false
    });
  };

  const updateUserProfile = (partialUserProfile: PartialUserProfile) => {
    // Email won't be updated immediately due to the verification process, that's why it's not included here.
    if (partialUserProfile.name) {
      name.value = partialUserProfile.name;
    }
  };

  const isUserAuthenticated = computed(() => accessToken.value !== null);

  return {
    name,
    email,
    avatar,
    isPassphrase,
    accessToken,
    apiKeys,
    $reset,
    resetApiKeys,
    setAccessToken,
    setUserProfile,
    setUserApiKeys,
    updateUserProfile,
    isUserAuthenticated
  };
});
