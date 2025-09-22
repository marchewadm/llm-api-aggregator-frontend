import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ChatRoom, ChatMessageDetails, ChatRoomDetails } from '@/types/chat.types';
import type { ApiProviderState, ApiProviderDetails } from '@/types/apiKeys.types';

export const useChatStore = defineStore('chat', () => {
  const aiModel = ref<string | null>(null);
  const apiProvider = ref<ApiProviderState | null>(null);
  const apiProviders = ref<ApiProviderState[]>([]);
  const chatRooms = ref<ChatRoom[]>([]);
  const isNewChatRoom = ref<boolean>(false);
  const chatMessages = ref<ChatMessageDetails[]>([]);
  const customInstructions = ref<string>('You are a helpful assistant.');

  const resetChatHistory = () => {
    aiModel.value = null;
    chatMessages.value = [];
    customInstructions.value = 'You are a helpful assistant.';
  };

  const setChatRooms = (chatRoomsData: ChatRoom[]) => {
    chatRooms.value = chatRoomsData.map((chatRoom) => {
      return {
        roomUuid: chatRoom.roomUuid,
        lastMessage: chatRoom.lastMessage,
        apiProviderId: chatRoom.apiProviderId
      };
    });
  };

  const setChatHistory = (chatRoomDetails: Required<ChatRoomDetails>) => {
    aiModel.value = chatRoomDetails.aiModel;
    customInstructions.value = chatRoomDetails.customInstructions;

    apiProvider.value =
      apiProviders.value.find((apiProvider) => {
        return apiProvider.aiModels.includes(chatRoomDetails.aiModel);
      }) ?? null;

    chatMessages.value = chatRoomDetails.messages.map((messageObject, idx, array) => {
      const message: ChatMessageDetails = {
        message: messageObject.message,
        imageUrl: messageObject.imageUrl,
        role: messageObject.role,
        apiProviderId: messageObject.apiProviderId
      };

      // If the value of isNewChatRoom is true, the last message in the array is the most recent and was delivered in real-time to the user. This is used to determine if the message should be animated as typewriter text when the user is redirected to the active chat room from creating a new chat room route.
      if (idx === array.length - 1 && isNewChatRoom.value) {
        message.isDeliveredRealTime = true;
        isNewChatRoom.value = false;
      }

      return message;
    });
  };

  const setApiProviders = (apiProvidersData: ApiProviderDetails[]) => {
    apiProviders.value = apiProvidersData.map((apiProvider) => {
      return {
        name: apiProvider.name,
        lowerCaseName: apiProvider.name.toLowerCase(),
        aiModels: apiProvider.aiModels,
        apiProviderId: apiProvider.id,
        isSelected: false
      };
    });
  };

  const updateChatRoomLastMessage = (roomUuid: string, lastMessage: string) => {
    chatRooms.value = chatRooms.value.map((chatRoom) =>
      chatRoom.roomUuid === roomUuid ? { ...chatRoom, lastMessage } : chatRoom
    );
  };

  return {
    aiModel,
    apiProvider,
    apiProviders,
    chatRooms,
    isNewChatRoom,
    chatMessages,
    customInstructions,
    resetChatHistory,
    setChatRooms,
    setChatHistory,
    setApiProviders,
    updateChatRoomLastMessage
  };
});
