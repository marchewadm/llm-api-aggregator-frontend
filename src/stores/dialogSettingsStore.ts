import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import type { DialogSettings } from '@/types/dialogSettings.types';

export const useDialogSettingsStore = defineStore('dialogSettings', () => {
  const dialogSettings = ref<DialogSettings>('general');

  const alertDialogStore = useAlertDialogStore();
  const { togglePassphraseAlertDialog } = alertDialogStore;

  const setDialogSettings = (dialog: DialogSettings) => {
    dialogSettings.value = dialog;
  };

  const onSwitchToApiKeys = () => {
    if (dialogSettings.value !== 'apiKeys') {
      togglePassphraseAlertDialog();
    } else {
      dialogSettings.value = 'apiKeys';
    }
  };

  const onDialogSettingsToggle = (isDialogVisible: boolean) => {
    if (!isDialogVisible && dialogSettings.value === 'apiKeys') {
      dialogSettings.value = 'general';
    }
  };

  return {
    dialogSettings,
    setDialogSettings,
    onSwitchToApiKeys,
    onDialogSettingsToggle
  };
});
