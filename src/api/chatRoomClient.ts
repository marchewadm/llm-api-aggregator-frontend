import axios from 'axios';
import type { ChatRoom } from '@/types/chat.types';

const PREFIX_URL = `${import.meta.env.VITE_BACKEND_URL}/chat-room`;

export async function getChatRoomsClient(accessToken: string) {
  return axios.get<{ chatRooms: ChatRoom[] }>(`${PREFIX_URL}/all`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}
