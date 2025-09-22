<script setup lang="ts">
import MessageImage from '@/components/custom/message/MessageImage.vue';
import MessageBubble from '@/components/custom/message/MessageBubble.vue';

defineProps<{
  message: string;
  imageUrl?: string;
}>();
</script>

<template>
  <div class="col-start-2 justify-self-end">
    <MessageImage
      v-if="imageUrl"
      :imageUrl="imageUrl"
    />
    <MessageBubble :message="message" />
  </div>
</template>
