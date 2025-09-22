<script setup lang="ts">
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { profilePasswordSchema } from '@/schemas/settingsProfile.schemas';
import { updateUserPasswordService } from '@/services/userService';

const router = useRouter();

const form = useForm({
  validationSchema: toTypedSchema(profilePasswordSchema)
});

const onSubmit = form.handleSubmit(async (values) => {
  await updateUserPasswordService(values, router);
});
</script>

<template>
  <form
    class="flex flex-col gap-2 mt-4"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="currentPassword"
    >
      <FormItem v-auto-animate>
        <FormLabel>Current password</FormLabel>
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
      name="newPassword"
    >
      <FormItem v-auto-animate>
        <FormLabel>New password</FormLabel>
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
      name="newPassword2"
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
      class="w-fit ml-auto mt-2"
    >
      Save changes
    </Button>
  </form>
</template>
