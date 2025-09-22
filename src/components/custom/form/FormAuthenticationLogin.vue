<script setup lang="ts">
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { useAuthenticationFormStore } from '@/stores/authenticationFormStore';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { loginUserSchema } from '@/schemas/authentication.schemas';
import { loginUserService } from '@/services/authenticationService';

const router = useRouter();

const authenticationFormStore = useAuthenticationFormStore();
const { setAuthenticationForm } = authenticationFormStore;

const form = useForm({
  validationSchema: toTypedSchema(loginUserSchema)
});

const onSubmit = form.handleSubmit(async (values) => {
  await loginUserService(values, router);
});
</script>

<template>
  <form
    class="grid gap-4"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="email"
    >
      <FormItem v-auto-animate>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="jane.doe@example.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="password"
    >
      <FormItem v-auto-animate>
        <div class="flex items-center justify-between">
          <FormLabel>Password</FormLabel>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  class="text-sm underline flex"
                  type="button"
                  @click="setAuthenticationForm('resetPassword')"
                >
                  Forgot your password?
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Don't worry, you can reset it with ease!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button
      type="submit"
      class="w-full"
    >
      Sign in
    </Button>
  </form>
</template>
