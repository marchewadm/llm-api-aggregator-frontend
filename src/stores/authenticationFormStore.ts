import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AuthenticationForm } from '@/types/authentication.types';

export const useAuthenticationFormStore = defineStore('authenticationForm', () => {
  const authenticationForm = ref<AuthenticationForm>('login');

  const setAuthenticationForm = (form: AuthenticationForm) => {
    authenticationForm.value = form;
  };

  const toggleAuthenticationForm = () => {
    authenticationForm.value = authenticationForm.value === 'login' ? 'register' : 'login';
  };

  return {
    authenticationForm,
    setAuthenticationForm,
    toggleAuthenticationForm
  };
});
