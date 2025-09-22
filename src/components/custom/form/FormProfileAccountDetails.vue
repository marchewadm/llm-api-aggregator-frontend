<script setup lang="ts">
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { profileAccountSchema } from '@/schemas/settingsProfile.schemas';
import { updateUserProfileService } from '@/services/userService';

const router = useRouter();

const userStore = useUserStore();
const { name, email, avatar } = storeToRefs(userStore);

const form = useForm({
  validationSchema: toTypedSchema(profileAccountSchema),
  initialValues: {
    name: name.value ?? '',
    email: email.value ?? ''
  }
});

const onSubmit = form.handleSubmit(async (values) => {
  await updateUserProfileService(values, router);
});
</script>

<template>
  <form
    class="flex flex-col gap-2 mt-4"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="avatar"
    >
      <FormItem class="mx-auto">
        <FormControl>
          <Avatar
            class="w-20 h-20 self-center"
            v-bind="componentField"
          >
            <AvatarImage :src="avatar || ''" />
            <AvatarFallback>{{ name?.charAt(0) }}</AvatarFallback>
          </Avatar>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
    <Button
      type="submit"
      class="w-fit ml-auto mt-2"
    >
      Save changes
    </Button>
  </form>
</template>
