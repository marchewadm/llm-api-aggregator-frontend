<script setup lang="ts">
import MessageImage from '@/components/custom/message/MessageImage.vue';
import MessageBubble from '@/components/custom/message/MessageBubble.vue';
import { Icon } from '@iconify/vue';

defineProps<{
  pendingMessage: string;
  pendingImageUrl?: string;
}>();
</script>

<template>
  <div class="relative mb-10 col-start-2 justify-self-end">
    <div
      class="relative group"
      v-if="pendingImageUrl"
    >
      <MessageImage
        class="brightness-75"
        :imageUrl="pendingImageUrl"
      />
      <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Icon
          icon="tabler:loader-2"
          class="w-8 h-8 animate-spin"
        />
      </div>
    </div>
    <MessageBubble :message="pendingMessage" />
    <Icon
      icon="tabler:loader-2"
      class="absolute w-4 h-4 my-2 right-0 animate-spin"
    />
  </div>
</template>
