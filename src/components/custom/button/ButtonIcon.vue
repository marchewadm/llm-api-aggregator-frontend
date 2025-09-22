<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@/components/shadcn/button';
import type { ComputedRef } from 'vue';
import type { ButtonVariants } from '@/components/shadcn/button';

interface Props {
  iconName: string | ComputedRef<string>;
  iconClass?: string;
  size?: ButtonVariants['size'];
  variant?: ButtonVariants['variant'];
}

const {
  iconName,
  iconClass = 'h-[1.2rem] w-[1.2rem]',
  size = 'icon',
  variant = 'ghost'
} = defineProps<Props>();

const iconPrefix = 'tabler';
</script>

<template>
  <Button
    :size="size"
    :variant="variant"
  >
    <slot name="optionalTextOnLeft"></slot>
    <Icon
      :icon="`${iconPrefix}:${iconName}`"
      :class="iconClass"
    />
    <slot name="optionalTextOnRight"></slot>
  </Button>
</template>
