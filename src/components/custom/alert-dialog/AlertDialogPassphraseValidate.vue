<script setup lang="ts">
import FormPassphraseValidate from '@/components/custom/form/FormPassphraseValidate.vue';
import { Separator } from '@/components/shadcn/separator';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter
} from '@/components/shadcn/alert-dialog';
import { ref } from 'vue';
import { useAlertDialogStore } from '@/stores/alertDialogStore';

const alertDialogStore = useAlertDialogStore();
const { setPassphraseAlertDialog } = alertDialogStore;

const isResetAlertDialog = ref(false);

const toggleResetAlertDialog = () => {
  isResetAlertDialog.value = !isResetAlertDialog.value;
};
</script>

<template>
  <AlertDialogHeader>
    <AlertDialogTitle>Passphrase required</AlertDialogTitle>
    <AlertDialogDescription>
      To protect your API keys, please enter your passphrase before proceeding. This ensures that
      only authorized actions are performed on sensitive data.
    </AlertDialogDescription>
    <Separator />
  </AlertDialogHeader>
  <FormPassphraseValidate />
  <AlertDialog :open="isResetAlertDialog">
    <AlertDialogContent
      @escapeKeyDown="toggleResetAlertDialog"
      @pointerDownOutside="toggleResetAlertDialog"
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Resetting your passphrase will delete all your API keys from
          our servers and you will need to add them again.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="toggleResetAlertDialog">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="setPassphraseAlertDialog('create')">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
