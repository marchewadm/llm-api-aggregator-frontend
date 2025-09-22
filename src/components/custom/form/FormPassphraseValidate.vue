<script setup lang="ts">
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { validatePassphraseSchema } from '@/schemas/passphrase.schemas';
import { getApiKeysService } from '@/services/apiKeysService';

const router = useRouter();

const alertDialogStore = useAlertDialogStore();
const { $reset, setPassphraseAlertDialog } = alertDialogStore;

const form = useForm({
  validationSchema: toTypedSchema(validatePassphraseSchema)
});

const onSubmit = form.handleSubmit(async (values) => {
  await getApiKeysService(values, router);
});
</script>

<template>
  <form
    class="flex flex-col gap-2"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="passphrase"
    >
      <FormItem v-auto-animate>
        <FormLabel>Enter your passphrase</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Your passphrase"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex flex-col gap-2 mt-2 sm:ml-auto sm:flex-row">
      <Button
        type="button"
        variant="outline"
        @click="$reset"
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        @click="setPassphraseAlertDialog('create')"
      >
        Reset my passphrase
      </Button>
      <Button type="submit">Continue</Button>
    </div>
  </form>
</template>
