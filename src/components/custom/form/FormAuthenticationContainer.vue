<script setup lang="ts">
import AnimationTypewriter from '@/components/custom/animation/AnimationTypewriter.vue';
import FormAuthenticationLoginWrapper from '@/components/custom/form/FormAuthenticationLoginWrapper.vue';
import FormAuthenticationRegisterWrapper from '@/components/custom/form/FormAuthenticationRegisterWrapper.vue';
import FormAuthenticationResetPasswordWrapper from '@/components/custom/form/FormAuthenticationResetPasswordWrapper.vue';
import { storeToRefs } from 'pinia';
import { useAuthenticationFormStore } from '@/stores/authenticationFormStore';

const authenticationFormStore = useAuthenticationFormStore();
const { authenticationForm } = storeToRefs(authenticationFormStore);
</script>

<template>
  <section
    class="relative flex-grow grid items-center justify-center md:grid-cols-2 md:justify-normal md:mx-10"
  >
    <AnimationTypewriter />
    <FormAuthenticationLoginWrapper v-if="authenticationForm === 'login'" />
    <FormAuthenticationRegisterWrapper v-else-if="authenticationForm === 'register'" />
    <FormAuthenticationResetPasswordWrapper v-else />
  </section>
</template>
