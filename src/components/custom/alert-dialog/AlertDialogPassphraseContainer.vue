<script setup lang="ts">
import AlertDialogPassphraseValidate from '@/components/custom/alert-dialog/AlertDialogPassphraseValidate.vue';
import AlertDialogPassphraseCreate from '@/components/custom/alert-dialog/AlertDialogPassphraseCreate.vue';
import { AlertDialog, AlertDialogContent } from '@/components/shadcn/alert-dialog';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { useAlertDialogStore } from '@/stores/alertDialogStore';

const userStore = useUserStore();
const alertDialogStore = useAlertDialogStore();

const { isPassphrase } = storeToRefs(userStore);
const { passphraseAlertDialog, isPassphraseAlertDialog } = storeToRefs(alertDialogStore);
const { $reset } = alertDialogStore;
</script>

<template>
  <AlertDialog :open="isPassphraseAlertDialog">
    <AlertDialogContent
      @escapeKeyDown="$reset"
      @interactOutside="$reset"
    >
      <AlertDialogPassphraseValidate v-if="passphraseAlertDialog === 'validate' && isPassphrase" />
      <AlertDialogPassphraseCreate
        v-else-if="passphraseAlertDialog === 'create' || !isPassphrase"
      />
    </AlertDialogContent>
  </AlertDialog>
</template>
