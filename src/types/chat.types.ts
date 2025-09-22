export type ChatRoom = {
  roomUuid: string;
  lastMessage: string;
  apiProviderId: number;
};

export type ChatRoomDetails = {
  roomUuid?: string;
  aiModel: string;
  customInstructions?: string;
  messages: ChatMessageDetails[];
};

export type ChatRoomDetailsPayload = ChatRoomDetails & {
  apiProviderId: number;
};

export type ChatMessage = {
  message: string;
  roomUuid?: string;
  apiProviderId?: number;
};

export type ChatMessageDetails = {
  message: string;
  imageUrl?: string;
  role: 'user' | 'assistant';
  apiProviderId?: number;
  isDeliveredRealTime?: boolean;
};
