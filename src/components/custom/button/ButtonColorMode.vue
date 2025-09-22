<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { toggleColorMode } from '@/utils/utils';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode();
</script>

<template>
  <ButtonIcon
    :iconName="mode === 'light' ? 'moon' : 'sun'"
    @click="toggleColorMode"
  />
</template>
