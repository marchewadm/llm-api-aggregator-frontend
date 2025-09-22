<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';

const iconSize = {
  default: 'w-5 h-5',
  sm: 'w-4 h-4',
  lg: 'w-6 h-6'
};

interface Props {
  apiProviderId: number;
  size?: keyof typeof iconSize;
}

const { apiProviderId, size = 'default' } = defineProps<Props>();

const chatStore = useChatStore();
const { apiProviders } = storeToRefs(chatStore);

const getIconSize = computed(() => {
  return iconSize[size];
});

const getIconName = computed(() => {
  return apiProviders.value.find((provider) => provider.apiProviderId === apiProviderId)
    ?.lowerCaseName;
});
</script>

<template>
  <Icon
    :class="getIconSize"
    :icon="`tabler:brand-${getIconName}`"
    v-if="getIconName"
  />
</template>
