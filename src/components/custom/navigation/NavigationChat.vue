<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';
import DialogSettingsContainer from '@/components/custom/dialog/DialogSettingsContainer.vue';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useChatSidebarStore } from '@/stores/chatSidebarStore';
import { logoutUserService } from '@/services/authenticationService';

const router = useRouter();
const chatSidebarStore = useChatSidebarStore();

const { toggleChatSidebar, toggleModelSidebar } = chatSidebarStore;
const { isChatSidebarVisible, isModelSidebarVisible } = storeToRefs(chatSidebarStore);

const tooltipSideOffset = 10;
</script>

<template>
  <nav class="p-2 border-r">
    <div class="h-1/2 flex flex-col justify-start gap-y-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonIcon
              iconName="message"
              :class="{ 'bg-secondary': isChatSidebarVisible }"
              @click="toggleChatSidebar"
            />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :sideOffset="tooltipSideOffset"
          >
            Chats
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonIcon
              iconName="adjustments-horizontal"
              :class="{ 'bg-secondary': isModelSidebarVisible }"
              @click="toggleModelSidebar"
            />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :sideOffset="tooltipSideOffset"
          >
            Model settings
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonColorMode />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :sideOffset="tooltipSideOffset"
          >
            Color mode
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div class="h-1/2 flex flex-col justify-end gap-y-1">
      <DialogSettingsContainer />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonIcon iconName="help" />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :sideOffset="10"
          >
            Help
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonIcon
              iconName="power"
              @click="logoutUserService(router)"
            />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            :sideOffset="10"
          >
            Logout
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </nav>
</template>
