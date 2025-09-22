<script setup lang="ts">
import IconApiProvider from '@/components/custom/icon/IconApiProvider.vue';
import { Button } from '@/components/shadcn/button';
import { RouterLink } from 'vue-router';

defineProps<{
  chatTitle: string;
  chatRoomUuid: string;
  apiProviderId: number;
}>();
</script>

<template>
  <Button
    variant="ghost"
    asChild
  >
    <RouterLink
      class="flex gap-2 items-center"
      activeClass="bg-secondary"
      :to="{ name: 'ChatActive', params: { room_uuid: chatRoomUuid } }"
    >
      <IconApiProvider :apiProviderId="apiProviderId" />
      <span class="w-full truncate tracking-tight">
        {{ chatTitle }}
      </span>
    </RouterLink>
  </Button>
</template>
