<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useColorMode } from '@vueuse/core';
import { Separator } from '@/components/shadcn/separator';
import { Button } from '@/components/shadcn/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/select';
import { displaySuccessNotification } from '@/utils/utils';

const { store } = useColorMode();

const chatStore = useChatStore();
const { apiProviders } = storeToRefs(chatStore);

const onDeleteChats = () => {
  displaySuccessNotification('Your chats have been deleted successfully.');
};
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div class="flex items-center">
      <p class="text-sm">Default theme</p>
      <Select
        :defaultValue="store"
        v-model="store"
      >
        <SelectTrigger class="w-24 ml-auto">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available themes</SelectLabel>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="auto">System</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Separator />
    <div class="flex items-center">
      <p class="text-sm">Default API</p>
      <Select>
        <SelectTrigger class="w-24 ml-auto">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available providers</SelectLabel>
            <SelectItem
              v-for="(apiProvider, index) in apiProviders"
              :key="index"
              :value="apiProvider.lowerCaseName"
            >
              {{ apiProvider.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Separator />
    <div class="flex items-center">
      <p class="text-sm">Delete all chats</p>
      <Button
        variant="destructive"
        class="w-24 ml-auto"
        @click="onDeleteChats"
      >
        Delete
      </Button>
    </div>
  </div>
</template>
