<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { Input } from '@/components/shadcn/input';
import { Separator } from '@/components/shadcn/separator';
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/shadcn/alert-dialog';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useClipboard } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { displaySuccessNotification } from '@/utils/utils';
import { updateUserPassphraseService } from '@/services/userService';

const router = useRouter();
const userStore = useUserStore();
const alertDialogStore = useAlertDialogStore();

const { copy } = useClipboard();

const { $reset } = alertDialogStore;
const { isPassphrase } = storeToRefs(userStore);

const inputTextValue = ref('');
const isInputRevealed = ref(false);
const isPassphraseGenerated = ref(false);

const getInputIconName = computed(() => {
  return isInputRevealed.value ? 'eye-off' : 'eye';
});

const getInputType = computed(() => {
  return isInputRevealed.value ? 'text' : 'password';
});

const toggleInputRevealed = () => {
  isInputRevealed.value = !isInputRevealed.value;
};

const onCopyToClipboard = () => {
  copy(inputTextValue.value);
  $reset();
  isPassphrase.value = true;
  displaySuccessNotification('Your passphrase has been copied to the clipboard.');
};

const onGeneratePassphrase = async () => {
  const passphrase = await updateUserPassphraseService(router);

  if (!passphrase) {
    return;
  }

  inputTextValue.value = passphrase;
  isPassphraseGenerated.value = true;
};
</script>

<template>
  <AlertDialogHeader>
    <AlertDialogTitle>Passphrase required</AlertDialogTitle>
    <AlertDialogDescription>
      To protect your API keys, you need to generate a secure passphrase to encrypt your data.
      Remember to store this passphrase securely as it will be required to access your data.
    </AlertDialogDescription>
    <Separator />
  </AlertDialogHeader>
  <div class="relative flex items-center justify-end">
    <Input
      placeholder="Your generated passphrase"
      class="pr-10"
      :type="getInputType"
      v-model="inputTextValue"
      readonly
    />
    <div class="absolute">
      <ButtonIcon
        type="button"
        variant="ghost"
        :iconName="getInputIconName"
        @click="toggleInputRevealed"
      />
    </div>
  </div>
  <AlertDialogFooter class="mt-2">
    <AlertDialogCancel @click="$reset">Cancel</AlertDialogCancel>
    <AlertDialogAction
      v-if="!isPassphraseGenerated"
      @click="onGeneratePassphrase"
    >
      Generate passphrase
    </AlertDialogAction>
    <AlertDialogAction
      v-else
      @click="onCopyToClipboard"
    >
      Copy and close
    </AlertDialogAction>
  </AlertDialogFooter>
</template>
