<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

defineProps<{
  iconName: string;
  text: string;
}>();
</script>

<template>
  <ButtonIcon
    :iconName="iconName"
    variant="outline"
    size="default"
    class="w-full flex gap-2 items-center"
  >
    <template #optionalTextOnRight>
      <span>{{ text }}</span>
    </template>
  </ButtonIcon>
</template>
