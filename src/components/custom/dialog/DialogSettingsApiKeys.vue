<script setup lang="ts">
import FormApiKeys from '@/components/custom/form/FormApiKeys.vue';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { onUnmounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const { resetApiKeys } = userStore;

onUnmounted(() => {
  resetApiKeys();
});
</script>

<template>
  <ScrollArea class="h-full">
    <FormApiKeys />
  </ScrollArea>
</template>
