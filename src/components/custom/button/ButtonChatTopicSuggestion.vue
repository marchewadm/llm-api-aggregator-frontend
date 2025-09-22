<script setup lang="ts">
import { Button } from '@/components/shadcn/button';
import { useMediaQuery } from '@vueuse/core';

defineProps<{
  topicTitle: string;
  topicDescription: string;
}>();

const isLargeScreen = useMediaQuery('(min-width: 1800px)');
</script>

<template>
  <Button
    variant="outline"
    class="h-fit rounded-2xl dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 flex-col items-start"
    :class="{ 'text-wrap text-left': !isLargeScreen }"
  >
    <span>{{ topicTitle }}</span>
    <span class="text-muted-foreground">{{ topicDescription }}</span>
  </Button>
</template>
