import { toRaw } from 'vue';
import { AxiosError, HttpStatusCode } from 'axios';
import { useColorMode } from '@vueuse/core';
import { useUserStore } from '@/stores/userStore';
import { useToast } from '@/components/shadcn/toast';
import type { Router } from 'vue-router';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const toggleColorMode = () => {
  const mode = useColorMode();

  mode.value = mode.value === 'dark' ? 'light' : 'dark';
};

export const displaySuccessNotification = (description: string) => {
  const { toast } = useToast();

  toast({
    title: 'Success',
    description
  });
};

export const displayErrorNotification = (description: string) => {
  const { toast } = useToast();

  toast({
    title: 'Error',
    description,
    variant: 'destructive'
  });
};

// TODO: Instead of using the router here, we could use event bus to emit an event and listen for it in the App.vue component or router?
export const handleAxiosError = (err: unknown, router?: Router) => {
  if (!(err instanceof AxiosError)) {
    console.error(err);
    return;
  }

  const userStore = useUserStore();
  const { $reset } = userStore;

  const httpStatusCode = err.response?.status;
  const detail = err.response?.data.detail;

  const errorMessage =
    httpStatusCode === HttpStatusCode.UnprocessableEntity
      ? 'Provided data is invalid. Please check your input and try again.'
      : detail ?? 'An error occurred. Please try again.';

  displayErrorNotification(errorMessage);

  if (httpStatusCode === HttpStatusCode.Unauthorized) {
    // If the user is not authenticated, reset the user store and redirect them to the Home route.
    $reset();
    router?.push({ name: 'Home' });
  }

  return httpStatusCode;
};

export const toRawDeep = <T>(observed: T): T => {
  const val = toRaw(observed);

  if (Array.isArray(val)) {
    return val.map(toRawDeep) as T;
  }

  if (val === null) return null as T;

  if (typeof val === 'object') {
    const entries = Object.entries(val).map(([key, val]) => [key, toRawDeep(val)]);

    return Object.fromEntries(entries);
  }

  return val;
};
