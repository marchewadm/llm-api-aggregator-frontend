<script setup lang="ts">
import CardModelSettingsContainer from '@/components/custom/card/CardModelSettingsContainer.vue';
import SidebarChatContainer from '@/components/custom/sidebar/SidebarChatContainer.vue';
import AlertDialogPassphraseContainer from '@/components/custom/alert-dialog/AlertDialogPassphraseContainer.vue';
import { ref, onMounted } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';

const chatContainer = ref<HTMLDivElement | null>(null);

const chatSidebarStore = useChatSidebarStore();
const { isSidebarVisible } = storeToRefs(chatSidebarStore);

const resizeObserver = new ResizeObserver(() => scrollChatToBottom());

const scrollChatToBottom = () => {
  if (!chatContainer.value) return;

  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

const handleObserverConnect = () => {
  if (!chatContainer.value) return;

  for (const child of chatContainer.value.children) {
    resizeObserver.observe(child);
  }
};

const handleObserverDisconnect = () => {
  resizeObserver.disconnect();
};

onMounted(() => {
  handleObserverConnect();
});

onBeforeRouteLeave(() => {
  handleObserverDisconnect();
});

onBeforeRouteUpdate(() => {
  handleObserverDisconnect();
  handleObserverConnect();
});
</script>

<template>
  <main class="grid grid-cols-auto-1fr">
    <AlertDialogPassphraseContainer />
    <SidebarChatContainer />
    <div
      class="relative h-screen dark:bg-gray-900 flex flex-col overflow-y-auto"
      :class="{
        'opacity-50 blur-sm pointer-events-none md:opacity-100 md:blur-0 md:pointer-events-auto':
          isSidebarVisible
      }"
      ref="chatContainer"
    >
      <div class="sticky w-full bg-white dark:bg-inherit pt-2 px-2 top-0 z-10">
        <div class="w-fit ml-auto">
          <CardModelSettingsContainer />
        </div>
      </div>
      <div class="w-full flex-grow">
        <slot name="chatContent"></slot>
      </div>
      <div class="sticky w-full bg-white dark:bg-inherit bottom-0 z-10">
        <div class="relative mx-5 py-3 md:mx-auto md:w-1/2">
          <slot name="textareaContent"></slot>
        </div>
      </div>
    </div>
  </main>
</template>
