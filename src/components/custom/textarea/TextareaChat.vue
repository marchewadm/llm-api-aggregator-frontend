<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import ButtonChatTextareaAction from '@/components/custom/button/ButtonChatTextareaAction.vue';
import { Icon } from '@iconify/vue';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Skeleton } from '@/components/shadcn/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import { ref, onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useFocus } from '@vueuse/core';
import { imageSchema } from '@/schemas/chat.schemas';
import { displayErrorNotification } from '@/utils/utils';

const emit = defineEmits<{
  sendMessage: [message: string, imageUrl?: string, imageFile?: File];
}>();

const messageToSend = ref('');
const isImageLoading = ref(false);
const imageUrl = ref<string | undefined>(undefined);
const imageFile = ref<File | undefined>(undefined);
const textareaEl = ref<HTMLTextAreaElement | null>(null);
const fileInputEl = ref<HTMLInputElement | null>(null);

const setFocusOnTextarea = () => useFocus(textareaEl, { initialValue: true });

const handleClickOnInput = () => {
  fileInputEl.value?.click();
};

const handleResetImage = () => {
  imageUrl.value = undefined;
};

const toggleImageLoading = () => {
  isImageLoading.value = !isImageLoading.value;
};

const sendMessage = () => {
  if (!messageToSend.value) return;

  emit('sendMessage', messageToSend.value, imageUrl.value, imageFile.value);

  imageUrl.value = undefined;
  imageFile.value = undefined;
  messageToSend.value = '';
};

const validateFile = (file: File) => {
  const result = imageSchema.safeParse({ image: file });

  if (!result.success) {
    displayErrorNotification(result.error.errors[0].message);
    return false;
  }
  return true;
};

const handleFileChange = () => {
  const file = fileInputEl.value?.files?.[0];

  if (!file || !validateFile(file)) return;

  toggleImageLoading();

  imageFile.value = file;
  imageUrl.value = URL.createObjectURL(file);
};

onMounted(() => {
  setFocusOnTextarea();
});

onBeforeRouteUpdate(() => {
  setFocusOnTextarea();
});
</script>

<template>
  <div
    class="relative rounded-2xl border dark:border-gray-700 flex flex-col focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
    tabindex="0"
  >
    <div
      v-if="imageUrl"
      class="m-4 relative w-fit group focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
      tabindex="0"
    >
      <div v-show="!isImageLoading">
        <img
          class="h-14 w-14 rounded-md cursor-pointer object-cover group-hover:opacity-70 transition-opacity duration-200"
          :src="imageUrl"
          v-viewer
          @load="toggleImageLoading"
        />
      </div>
      <Skeleton
        v-show="isImageLoading"
        class="h-14 w-14 rounded-md"
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ButtonIcon
              class="w-5 h-5 rounded-full absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 opacity-100 group-hover:opacity-100 group-focus-visible:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none transition-all duration-200 md:opacity-0"
              iconName="x"
              variant="default"
              size="icon"
              @click="handleResetImage"
            />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            :sideOffset="10"
          >
            Remove attachment
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div class="relative">
      <Textarea
        placeholder="Type your message here..."
        class="py-4 pr-4 rounded-2xl resize-none border-none focus-visible:ring-0"
        :class="{
          'pl-4': imageUrl,
          'pl-12': !imageUrl
        }"
        ref="textareaEl"
        v-model="messageToSend"
        @keydown.enter.prevent="sendMessage"
      />
      <div
        v-if="!imageUrl"
        class="absolute top-1/2 -translate-y-1/2 ml-2"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Label
                for="file-input"
                role="button"
                tabindex="0"
                class="h-8 w-8 rounded-full inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
                @keydown.enter.prevent="handleClickOnInput"
                @keydown.space.prevent="handleClickOnInput"
              >
                <Icon
                  icon="tabler:paperclip"
                  class="h-5 w-5"
                />
              </Label>
              <input
                id="file-input"
                type="file"
                class="hidden"
                accept="image/*"
                ref="fileInputEl"
                @change="handleFileChange"
              />
            </TooltipTrigger>
            <TooltipContent
              side="left"
              :sideOffset="10"
            >
              Attach file
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div class="hidden absolute top-1/2 left-full -translate-y-1/2 md:flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonChatTextareaAction
                iconName="send-2"
                @click="sendMessage"
              />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              :sideOffset="10"
            >
              Send message
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonChatTextareaAction iconName="microphone" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              :sideOffset="10"
            >
              Send voice message
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>
</template>
