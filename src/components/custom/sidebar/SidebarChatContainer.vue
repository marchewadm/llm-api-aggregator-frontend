<script setup lang="ts">
import NavigationChat from '@/components/custom/navigation/NavigationChat.vue';
import SidebarChatOpen from '@/components/custom/sidebar/SidebarChatOpen.vue';
import SidebarChatCustomizeModel from '@/components/custom/sidebar/SidebarChatCustomizeModel.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';
import { useMediaQuery, onClickOutside } from '@vueuse/core';

const sidebarContainer = ref<HTMLDivElement | null>(null);

const isDesktopNavigation = useMediaQuery('(min-width: 850px)');

const chatSidebarStore = useChatSidebarStore();
const { toggleSidebar } = chatSidebarStore;
const { isSidebarVisible } = storeToRefs(chatSidebarStore);

onClickOutside(sidebarContainer, () => {
  if (isDesktopNavigation.value || !isSidebarVisible.value) return;
  toggleSidebar();
});
</script>

<template>
  <aside
    class="flex h-screen relative"
    ref="sidebarContainer"
  >
    <NavigationChat />
    <div
      class="h-full bg-white dark:bg-gray-950 absolute left-full z-20 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out md:static"
      :class="{
        'w-56 p-2 border-r opacity-100 md:w-60 xl:w-72': isSidebarVisible,
        'w-0 p-0 border-0 opacity-0': !isSidebarVisible
      }"
    >
      <!-- Ensure there is an 18px difference between the width of this wrapper and the container above -->
      <div class="h-full min-w-[206px] md:min-w-[222px] xl:min-w-[270px]">
        <SidebarChatOpen />
        <SidebarChatCustomizeModel />
      </div>
    </div>
  </aside>
</template>
