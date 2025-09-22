import { useEventBus } from '@vueuse/core';
import { useAlertDialogStore } from '@/stores/alertDialogStore';
import { useDialogSettingsStore } from '@/stores/dialogSettingsStore';

export function usePassphraseValidationBus() {
  const passphraseValidationBus = useEventBus<string>('passphraseValidationBus');

  const alertDialogStore = useAlertDialogStore();
  const dialogSettingsStore = useDialogSettingsStore();

  const { setDialogSettings } = dialogSettingsStore;
  const { togglePassphraseAlertDialog } = alertDialogStore;

  function emitSuccess() {
    passphraseValidationBus.emit();
  }

  function onSuccess() {
    passphraseValidationBus.on(() => {
      togglePassphraseAlertDialog();
      setDialogSettings('apiKeys');
    });
  }

  return {
    emitSuccess,
    onSuccess
  };
}
