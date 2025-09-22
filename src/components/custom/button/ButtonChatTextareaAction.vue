<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';

defineProps<{
  iconName: string;
}>();
</script>

<template>
  <ButtonIcon
    class="hover:scale-110 active:scale-110 transition-transform duration-200"
    iconClass="h-6 w-6"
    :iconName="iconName"
    :variant="null"
  />
</template>
