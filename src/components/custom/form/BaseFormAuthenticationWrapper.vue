<script setup lang="ts">
import DescriptionParagraph from '@/components/custom/description/DescriptionParagraph.vue';
import { useAuthenticationFormStore } from '@/stores/authenticationFormStore';
import type { AuthenticationForm } from '@/types/authentication.types';

const authenticationFormStore = useAuthenticationFormStore();
const { setAuthenticationForm } = authenticationFormStore;

defineProps<{
  authenticationForm: AuthenticationForm;
}>();
</script>

<template>
  <div class="w-4/5 py-10 mx-auto flex items-center justify-center z-50 md:w-full md:p-0">
    <div class="w-[350px] mx-auto grid gap-6">
      <div class="grid gap-2 text-center">
        <h2 class="text-3xl font-bold">
          <slot name="formHeader"></slot>
        </h2>
        <DescriptionParagraph class="text-balance">
          <slot name="formSubHeader"></slot>
        </DescriptionParagraph>
      </div>
      <div class="grid gap-4">
        <slot name="formBody"></slot>
      </div>
      <div class="mt-4 text-sm text-center">
        <p class="inline">
          <slot name="formFooterText"></slot>
        </p>
        <button
          class="underline"
          @click="setAuthenticationForm(authenticationForm)"
        >
          <slot name="formFooterButton"></slot>
        </button>
      </div>
    </div>
  </div>
</template>
