import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { toRawDeep, displayErrorNotification } from '@/utils/utils';
import type { ApiProviderState, ApiKeyState } from '@/types/apiKeys.types';

export async function setApiKeyFormFields(setFieldValue: Function) {
  const userStore = useUserStore();
  const { apiKeys } = storeToRefs(userStore);

  apiKeys.value.forEach((apiKey) => {
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      apiProviderId: apiKey.apiProvider?.apiProviderId
    });
  });
}

export function onApiProviderSelect(apiProvider: ApiProviderState, id: number) {
  const userStore = useUserStore();
  const { apiKeys } = storeToRefs(userStore);

  if (apiProvider.isSelected) return;

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (index === -1) return;

  apiKeys.value[index].apiProvider = apiProvider;
  apiKeys.value[index].isOpen = false;

  // Disable the selected AI model, so it can't be selected again if the key is in use
  apiProvider.isSelected = true;
}

export function onApiKeyAdd(apiKey: ApiKeyState, setFieldValue: Function) {
  const userStore = useUserStore();
  const { apiKeys } = storeToRefs(userStore);

  if (apiKey.key && apiKey.apiProvider) {
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      apiProviderId: apiKey.apiProvider.apiProviderId
    });

    // If new API key was successfully added, create a new empty input field
    apiKeys.value.push({
      id: apiKeys.value.length,
      key: undefined,
      apiProvider: undefined,
      isOpen: false,
      isRevealed: false
    });
  } else {
    displayErrorNotification('Please provide a valid API key first.');
  }
}

export function onApiKeyUpdate(apiKey: ApiKeyState, setFieldValue: Function, values: any) {
  if (values.apiKeys?.[apiKey.id].key && values.apiKeys?.[apiKey.id].apiProviderId) {
    setFieldValue(`apiKeys.${apiKey.id}`, {
      key: apiKey.key,
      apiProviderId: apiKey.apiProvider!.apiProviderId
    });
  }
}

export function onApiKeyRemove(id: number, setValues: Function, values: any) {
  const chatStore = useChatStore();
  const userStore = useUserStore();

  const { apiKeys } = storeToRefs(userStore);
  const { apiProviders } = storeToRefs(chatStore);

  const index = apiKeys.value.findIndex((apiKey) => apiKey.id === id);
  if (index === -1) return;

  const indexApiProvider = apiProviders.value.findIndex(
    (apiProvider) => apiProvider.lowerCaseName === apiKeys.value[index].apiProvider?.lowerCaseName
  );

  apiProviders.value[indexApiProvider].isSelected = false;

  apiKeys.value.splice(index, 1);

  const rawValues = structuredClone(toRawDeep(values));
  rawValues.apiKeys?.splice(index, 1);

  setValues(rawValues);
}
