<script setup lang="ts">
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { registerUserSchema } from '@/schemas/authentication.schemas';
import { registerUserService } from '@/services/authenticationService';

const form = useForm({
  validationSchema: toTypedSchema(registerUserSchema)
});

const onSubmit = form.handleSubmit(async (values) => {
  await registerUserService(values);
});
</script>

<template>
  <form
    class="grid gap-4"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="name"
    >
      <FormItem v-auto-animate>
        <FormLabel>What is your name?</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Jane"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="password2"
    >
      <FormItem v-auto-animate>
        <FormLabel>Confirm password</FormLabel>
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
      Sign up
    </Button>
  </form>
</template>
