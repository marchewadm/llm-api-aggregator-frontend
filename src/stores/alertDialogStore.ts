import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { PassphraseAlertDialog } from '@/types/alertDialog.types';

export const useAlertDialogStore = defineStore('alertDialog', () => {
  const passphraseAlertDialog = ref<PassphraseAlertDialog>('validate');
  const isPassphraseAlertDialog = ref(false);

  const $reset = () => {
    passphraseAlertDialog.value = 'validate';
    isPassphraseAlertDialog.value = false;
  };

  const setPassphraseAlertDialog = (alertDialog: PassphraseAlertDialog) => {
    passphraseAlertDialog.value = alertDialog;
  };

  const togglePassphraseAlertDialog = () => {
    isPassphraseAlertDialog.value = !isPassphraseAlertDialog.value;
  };

  return {
    passphraseAlertDialog,
    isPassphraseAlertDialog,
    $reset,
    setPassphraseAlertDialog,
    togglePassphraseAlertDialog
  };
});
