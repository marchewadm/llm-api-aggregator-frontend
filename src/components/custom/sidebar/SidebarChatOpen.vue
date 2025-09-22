<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import ButtonChatOpen from '@/components/custom/button/ButtonChatOpen.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

const router = useRouter();
const chatStore = useChatStore();
const chatSidebarStore = useChatSidebarStore();

const { chatRooms } = storeToRefs(chatStore);
const { isChatSidebarVisible } = storeToRefs(chatSidebarStore);

const onStartNewChat = () => {
  router.push({ name: 'ChatCreate' });
};

const isChatRoomsEmpty = computed(() => chatRooms.value.length < 1);
</script>

<template>
  <div
    class="flex flex-col gap-2 overflow-y-auto"
    v-show="isChatSidebarVisible"
  >
    <ButtonIcon
      iconName="plus"
      size="default"
      variant="default"
      class="w-full justify-between"
      @click="onStartNewChat"
    >
      <template #optionalTextOnLeft>
        <span class="text-base tracking-tighter">New chat</span>
      </template>
    </ButtonIcon>
    <ButtonChatOpen
      v-for="chat in chatRooms"
      :key="chat.roomUuid"
      :chatTitle="chat.lastMessage"
      :chatRoomUuid="chat.roomUuid"
      :apiProviderId="chat.apiProviderId"
    />
    <p
      class="text-sm italic font-medium mt-5 mx-auto"
      v-show="isChatRoomsEmpty"
    >
      No chats yet.
    </p>
  </div>
</template>
