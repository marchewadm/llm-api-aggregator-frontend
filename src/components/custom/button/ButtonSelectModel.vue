<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import IconApiProvider from '@/components/custom/icon/IconApiProvider.vue';
import { Icon } from '@iconify/vue';
import { ComboboxLabel } from 'radix-vue';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/shadcn/command';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

const isPopoverOpen = ref(false);

const chatStore = useChatStore();
const { aiModel, apiProvider, apiProviders } = storeToRefs(chatStore);

const onModelSelect = (selectedModel: string) => {
  const selectedProvider = apiProviders.value.find((apiProvider) =>
    apiProvider.aiModels.includes(selectedModel)
  );

  if (!selectedProvider) return;

  isPopoverOpen.value = false;
  aiModel.value = selectedModel;
  apiProvider.value = selectedProvider;
};

const getDisplayedModel = computed(() => {
  return aiModel.value ? aiModel.value : 'Select model';
});

const getButtonIconName = computed(() => {
  return isPopoverOpen.value ? 'chevron-up' : 'chevron-down';
});
</script>

<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger asChild>
      <ButtonIcon
        role="combobox"
        size="default"
        variant="outline"
        class="w-full justify-between"
        :aria-expanded="isPopoverOpen"
        :iconName="getButtonIconName"
      >
        <template #optionalTextOnLeft>
          <span>{{ getDisplayedModel }}</span>
        </template>
      </ButtonIcon>
    </PopoverTrigger>
    <PopoverContent
      align="center"
      side="bottom"
      class="rounded-lg"
    >
      <Command>
        <CommandInput placeholder="Search models..." />
        <CommandEmpty>No models found.</CommandEmpty>
        <CommandList>
          <CommandGroup
            v-for="apiProvider in apiProviders"
            :key="apiProvider.apiProviderId"
          >
            <ComboboxLabel class="text-sm text-gray-500 pl-2 mb-1 flex gap-1 items-center">
              <IconApiProvider
                :apiProviderId="apiProvider.apiProviderId"
                size="sm"
              />
              <p>
                {{ apiProvider.name }}
              </p>
            </ComboboxLabel>
            <CommandItem
              v-for="(model, index) in apiProvider.aiModels"
              :key="index"
              :value="model"
              @select="onModelSelect(model)"
            >
              {{ model }}
              <Icon
                icon="tabler:check"
                class="w-5 h-5 ml-auto"
                v-if="aiModel === model"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
