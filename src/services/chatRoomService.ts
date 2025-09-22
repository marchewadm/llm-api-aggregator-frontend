import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { handleAxiosError } from '@/utils/utils';
import { getChatRoomsClient } from '@/api/chatRoomClient';
import type { Router } from 'vue-router';

export async function getChatRoomsService(router: Router) {
  try {
    const chatStore = useChatStore();
    const userStore = useUserStore();

    const { setChatRooms } = chatStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await getChatRoomsClient(accessToken.value!);

    setChatRooms(response.data.chatRooms);
  } catch (err) {
    handleAxiosError(err, router);
  }
}
