<script setup lang="ts">
import ButtonSelectModel from '@/components/custom/button/ButtonSelectModel.vue';
import { Textarea } from '@/components/shadcn/textarea';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();
const { customInstructions } = storeToRefs(chatStore);
</script>

<template>
  <div class="mb-2">
    <ButtonSelectModel />
  </div>
  <Textarea
    placeholder="You can set custom instructions for your model here."
    class="max-h-[150px]"
    v-model="customInstructions"
  />
</template>
