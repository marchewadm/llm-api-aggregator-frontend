<script setup lang="ts">
import ButtonColorMode from '@/components/custom/button/ButtonColorMode.vue';
import { Button } from '@/components/shadcn/button';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthenticationFormStore } from '@/stores/authenticationFormStore';

const authenticationFormStore = useAuthenticationFormStore();
const { authenticationForm } = storeToRefs(authenticationFormStore);
const { toggleAuthenticationForm } = authenticationFormStore;

const buttonText = computed(() => {
  return authenticationForm.value === 'login' ? 'Sign up' : 'Sign in';
});
</script>

<template>
  <nav class="flex justify-between items-center">
    <RouterLink
      to="#"
      class="text-2xl font-medium tracking-tighter"
    >
      LLM Aggregator
    </RouterLink>
    <div class="flex gap-1">
      <Button
        variant="ghost"
        @click="toggleAuthenticationForm"
      >
        {{ buttonText }}
      </Button>
      <ButtonColorMode />
    </div>
  </nav>
</template>
