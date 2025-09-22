<script setup lang="ts">
import LayoutChat from '@/layouts/LayoutChat.vue';
import TextareaChat from '@/components/custom/textarea/TextareaChat.vue';
import MessageUser from '@/components/custom/message/MessageUser.vue';
import MessageAssistant from '@/components/custom/message/MessageAssistant.vue';
import MessageUserPending from '@/components/custom/message/MessageUserPending.vue';
import { ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { getChatHistoryService, postChatHistoryService } from '@/services/chatHistoryService';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';
import { getChatRoomsService } from '@/services/chatRoomService';

const route = useRoute();
const router = useRouter();

const chatStore = useChatStore();
const { chatMessages } = storeToRefs(chatStore);
const { resetChatHistory, updateChatRoomLastMessage } = chatStore;

const isPending = ref(false);
const pendingMessage = ref('');
const pendingImageUrl = ref<string | undefined>(undefined);

const onSendMessage = async (message: string, imageUrl?: string, imageFile?: File) => {
  if (isPending.value) return;

  pendingMessage.value = message;
  pendingImageUrl.value = imageUrl;
  isPending.value = true;

  const roomUuid = route.params.room_uuid as string;
  const response = await postChatHistoryService({ roomUuid, message }, router, imageFile);

  if (response) {
    chatMessages.value.push({ message, role: 'user', imageUrl });
    chatMessages.value.push({
      message: response.message,
      role: 'assistant',
      isDeliveredRealTime: true,
      apiProviderId: response.apiProviderId
    });

    updateChatRoomLastMessage(roomUuid, response.message);
  }

  isPending.value = false;
  pendingMessage.value = '';
  pendingImageUrl.value = undefined;
};

onBeforeRouteUpdate(async (to) => {
  const roomUuid = to.params.room_uuid as string;

  resetChatHistory();
  await getUserProfileService(router);
  await getApiProvidersService(router);
  await getChatRoomsService(router);
  await getChatHistoryService(roomUuid, router);
});

onBeforeRouteLeave(() => {
  resetChatHistory();
});
</script>

<template>
  <LayoutChat>
    <template #chatContent>
      <div class="mx-5 md:w-1/2 md:mx-auto">
        <div class="grid grid-cols-2 auto-rows-min gap-y-4">
          <template
            v-for="(messageObject, index) in chatMessages"
            :key="index"
          >
            <MessageUser
              v-if="messageObject.role === 'user'"
              :message="messageObject.message"
              :imageUrl="messageObject.imageUrl"
            />
            <MessageAssistant
              v-else
              :message="messageObject.message"
              :isAnimated="messageObject.isDeliveredRealTime"
              :apiProviderId="messageObject.apiProviderId!"
            />
          </template>
          <MessageUserPending
            :pendingMessage="pendingMessage"
            :pendingImageUrl="pendingImageUrl"
            v-if="isPending"
          />
        </div>
      </div>
    </template>
    <template #textareaContent>
      <TextareaChat @sendMessage="onSendMessage" />
    </template>
  </LayoutChat>
</template>
