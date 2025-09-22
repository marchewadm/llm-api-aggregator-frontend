<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import DialogSettingsGeneral from '@/components/custom/dialog/DialogSettingsGeneral.vue';
import DialogSettingsProfile from '@/components/custom/dialog/DialogSettingsProfile.vue';
import DialogSettingsApiKeys from '@/components/custom/dialog/DialogSettingsApiKeys.vue';
import AlertDialogPassphraseContainer from '@/components/custom/alert-dialog/AlertDialogPassphraseContainer.vue';
import { Separator } from '@/components/shadcn/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDialogSettingsStore } from '@/stores/dialogSettingsStore';
import { usePassphraseValidationBus } from '@/utils/eventBus';

const dialogSettingsStore = useDialogSettingsStore();
const { onSuccess } = usePassphraseValidationBus();

const { setDialogSettings, onSwitchToApiKeys, onDialogSettingsToggle } = dialogSettingsStore;
const { dialogSettings } = storeToRefs(dialogSettingsStore);

onMounted(() => {
  onSuccess();
});
</script>

<template>
  <Dialog @update:open="onDialogSettingsToggle">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <ButtonIcon iconName="settings" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          :sideOffset="10"
        >
          Settings
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <DialogContent
      class="h-full min-w-full pt-6 px-3 grid-rows-2auto-1fr justify-center overflow-y-auto sm:p-6 sm:justify-normal lg:h-fit lg:min-w-[600px]"
    >
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          Customize your profile, set general settings and manage your API Keys
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div class="sm:grid sm:grid-cols-auto-1fr lg:h-[360px]">
        <div
          class="mb-2 flex gap-x-2 justify-center sm:mb-0 sm:mr-6 sm:gap-x-0 sm:gap-y-2 sm:flex-col sm:justify-normal"
        >
          <ButtonIcon
            iconName="settings"
            size="sm"
            class="w-24 justify-start items-center gap-1"
            :class="{ 'bg-secondary': dialogSettings === 'general' }"
            @click="setDialogSettings('general')"
          >
            <template #optionalTextOnRight>
              <span class="font-normal">General</span>
            </template>
          </ButtonIcon>
          <ButtonIcon
            iconName="user"
            size="sm"
            class="w-24 justify-start items-center gap-1"
            :class="{ 'bg-secondary': dialogSettings === 'profile' }"
            @click="setDialogSettings('profile')"
          >
            <template #optionalTextOnRight>
              <span class="font-normal">Profile</span>
            </template>
          </ButtonIcon>
          <ButtonIcon
            iconName="key"
            size="sm"
            class="w-24 justify-start items-center gap-1"
            :class="{ 'bg-secondary': dialogSettings === 'apiKeys' }"
            @click="onSwitchToApiKeys"
          >
            <template #optionalTextOnRight>
              <span class="font-normal">API Keys</span>
            </template>
          </ButtonIcon>
        </div>
        <DialogSettingsGeneral v-show="dialogSettings === 'general'" />
        <DialogSettingsProfile v-show="dialogSettings === 'profile'" />
        <DialogSettingsApiKeys v-if="dialogSettings === 'apiKeys'" />
      </div>
      <AlertDialogPassphraseContainer />
    </DialogContent>
  </Dialog>
</template>
