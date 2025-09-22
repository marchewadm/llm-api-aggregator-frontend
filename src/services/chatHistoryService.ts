import { toRaw } from 'vue';
import { storeToRefs } from 'pinia';
import { HttpStatusCode } from 'axios';
import { useUserStore } from '@/stores/userStore';
import { useChatStore } from '@/stores/chatStore';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { displayErrorNotification, handleAxiosError } from '@/utils/utils';
import {
  getChatHistoryClient,
  postChatHistoryClient,
  postChatHistoryImageClient
} from '@/api/chatHistoryClient';
import type { Router } from 'vue-router';
import type { ChatMessage, ChatRoomDetailsPayload } from '@/types/chat.types';

export async function getChatHistoryService(roomUuid: string, router: Router) {
  try {
    const userStore = useUserStore();
    const chatStore = useChatStore();
    const { setChatHistory } = chatStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await getChatHistoryClient(roomUuid, accessToken.value!);

    setChatHistory(response.data);
  } catch (err) {
    const httpStatusCode = handleAxiosError(err, router);

    if (httpStatusCode !== HttpStatusCode.Unauthorized) {
      router.push({ name: 'ChatCreate' });
    }
  }
}

export async function postChatHistoryService(
  { roomUuid, message }: ChatMessage,
  router: Router,
  image?: File
) {
  try {
    const chatStore = useChatStore();
    const userStore = useUserStore();
    let imageUrl: string | undefined;

    const { accessToken } = storeToRefs(userStore);
    const { aiModel, apiProvider, chatMessages, customInstructions } = storeToRefs(chatStore);

    if (!apiProvider.value || !aiModel.value) {
      return displayErrorNotification('You must select an AI model before sending a message.');
    }

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const response = await postChatHistoryImageClient(
        formData,
        apiProvider.value,
        accessToken.value!
      );

      imageUrl = response.data.imageUrl;
    }

    const chatHistoryPayload: ChatRoomDetailsPayload = {
      roomUuid,
      apiProviderId: apiProvider.value.apiProviderId,
      aiModel: aiModel.value,
      customInstructions: customInstructions.value,
      messages: structuredClone(toRaw(chatMessages.value))
    };

    chatHistoryPayload.messages.push({ message, role: 'user', imageUrl });

    const response = await postChatHistoryClient(
      chatHistoryPayload,
      apiProvider.value,
      accessToken.value!
    );

    return response.data;
  } catch (err) {
    const httpStatusCode = handleAxiosError(err, router);

    if (httpStatusCode === HttpStatusCode.Forbidden) {
      const alertDialogStore = useAlertDialogStore();
      const { togglePassphraseAlertDialog } = alertDialogStore;

      togglePassphraseAlertDialog();
    }
  }
}
