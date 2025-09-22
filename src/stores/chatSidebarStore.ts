import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useMediaQuery } from '@vueuse/core';

const isHdScreen = useMediaQuery('(min-width: 1280px)');

export const useChatSidebarStore = defineStore('chatSidebar', () => {
  const isChatSidebarVisible = ref(isHdScreen.value ? true : false);
  const isModelSidebarVisible = ref(false);

  const toggleChatSidebar = () => {
    isChatSidebarVisible.value = !isChatSidebarVisible.value;

    if (isChatSidebarVisible.value) {
      isModelSidebarVisible.value = false;
    }
  };

  const toggleModelSidebar = () => {
    isModelSidebarVisible.value = !isModelSidebarVisible.value;

    if (isModelSidebarVisible.value) {
      isChatSidebarVisible.value = false;
    }
  };

  const toggleSidebar = () => {
    if (isChatSidebarVisible.value) {
      toggleChatSidebar();
    } else {
      toggleModelSidebar();
    }
  };

  const isSidebarVisible = computed(
    () => isChatSidebarVisible.value || isModelSidebarVisible.value
  );

  return {
    isChatSidebarVisible,
    isModelSidebarVisible,
    isSidebarVisible,
    toggleChatSidebar,
    toggleModelSidebar,
    toggleSidebar
  };
});
