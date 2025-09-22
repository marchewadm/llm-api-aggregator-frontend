<script setup lang="ts">
import typewriterData from '@/assets/typewriterData.json';
import LayoutChat from '@/layouts/LayoutChat.vue';
import TextareaChat from '@/components/custom/textarea/TextareaChat.vue';
import MessageUserPending from '@/components/custom/message/MessageUserPending.vue';
import ButtonChatTopicSuggestion from '@/components/custom/button/ButtonChatTopicSuggestion.vue';
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMotion } from '@vueuse/motion';
import { useMediaQuery } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { postChatHistoryService } from '@/services/chatHistoryService';

const isPending = ref(false);
const pendingMessage = ref('');
const pendingImageUrl = ref<string | undefined>(undefined);
const greetingHeadingRef = ref<HTMLHeadingElement | null>(null);
const buttonsContainerRef = ref<HTMLDivElement | null>(null);

const router = useRouter();

const isLargeScreen = useMediaQuery('(min-width: 1800px)');

const chatStore = useChatStore();
const { isNewChatRoom } = storeToRefs(chatStore);

let buttonTopicTitles: string[] = [];
let buttonTopicDescriptions: string[] = [];

const generateRandomButtonTopicSuggestions = () => {
  let buttonsCount = 4;
  const uniqueIndices = new Set<number>();

  if (!isLargeScreen.value) {
    buttonsCount = 1;
  }

  while (uniqueIndices.size < buttonsCount) {
    const i = Math.floor(Math.random() * typewriterData.title.length);

    if (!uniqueIndices.has(i)) {
      uniqueIndices.add(i);
      buttonTopicTitles.push(typewriterData.title[i]);
      buttonTopicDescriptions.push(typewriterData.text[i]);
    }
  }
};

const onSendMessage = async (message: string, imageUrl?: string, imageFile?: File) => {
  if (isPending.value) return;

  pendingMessage.value = message;
  pendingImageUrl.value = imageUrl;
  isPending.value = true;

  const response = await postChatHistoryService({ message }, router, imageFile);

  if (response) {
    isNewChatRoom.value = true;
    router.push({ name: 'ChatActive', params: { room_uuid: response.roomUuid } });
  } else {
    isPending.value = false;
    pendingMessage.value = '';
    pendingImageUrl.value = undefined;
  }
};

const onSelectTopicSuggestion = async (topicIndex: number) => {
  const message = `${buttonTopicTitles[topicIndex]} ${buttonTopicDescriptions[topicIndex]}`;
  await onSendMessage(message);
};

// When the screen size is large, generate 4 suggestions. Otherwise, generate 1 suggestion.
watch(isLargeScreen, () => {
  buttonTopicDescriptions = [];
  buttonTopicTitles = [];
  generateRandomButtonTopicSuggestions();
});

onBeforeMount(() => {
  generateRandomButtonTopicSuggestions();
});

onMounted(() => {
  // TODO: Consider improving these animations
  useMotion(greetingHeadingRef, {
    initial: {
      opacity: 0,
      y: 50
    },
    enter: {
      opacity: 1,
      y: 0
    }
  });

  useMotion(buttonsContainerRef, {
    initial: {
      opacity: 0,
      y: 25
    },
    enter: {
      opacity: 1,
      y: 0
    }
  });
});
</script>

<template>
  <LayoutChat>
    <template #chatContent>
      <div
        class="h-full flex justify-center items-center mx-5 md:mx-auto md:w-1/2"
        v-if="!isPending"
      >
        <h1
          class="text-2xl font-medium tracking-tight text-center"
          ref="greetingHeadingRef"
        >
          How can I help you today?
        </h1>
      </div>
      <div
        class="grid grid-cols-2 auto-rows-min gap-y-4 mx-5 md:mx-auto md:w-1/2"
        v-else
      >
        <MessageUserPending
          :pendingMessage="pendingMessage"
          :pendingImageUrl="pendingImageUrl"
        />
      </div>
    </template>
    <template #textareaContent>
      <TextareaChat @sendMessage="onSendMessage" />
      <div
        class="absolute w-full mb-4 bottom-full grid gap-2 sm:px-6"
        ref="buttonsContainerRef"
        :class="{ 'grid-cols-2': isLargeScreen, 'grid-cols-1': !isLargeScreen }"
        v-if="!isPending"
      >
        <ButtonChatTopicSuggestion
          v-for="(_, index) in buttonTopicTitles"
          :key="index"
          :topicTitle="buttonTopicTitles[index]"
          :topicDescription="buttonTopicDescriptions[index]"
          @click="onSelectTopicSuggestion(index)"
        />
      </div>
    </template>
  </LayoutChat>
</template>
