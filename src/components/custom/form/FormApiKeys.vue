<script setup lang="ts">
import ButtonIcon from '@/components/custom/button/ButtonIcon.vue';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/shadcn/form';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/shadcn/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/shadcn/command';
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTrigger
} from '@/components/shadcn/alert-dialog';
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useChatStore } from '@/stores/chatStore';
import { useUserStore } from '@/stores/userStore';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { apiKeysSchema } from '@/schemas/apiKeys.schemas';
import { updateApiKeysService } from '@/services/apiKeysService';
import { toRawDeep } from '@/utils/utils';
import {
  setApiKeyFormFields,
  onApiProviderSelect,
  onApiKeyAdd,
  onApiKeyUpdate,
  onApiKeyRemove
} from '@/helpers/formApiKeysHelper';
import type { ApiKeyState } from '@/types/apiKeys.types';

const isSubmitSuccessful = ref(false);
const isPassphraseRequired = ref(false);

const isDesktop = useMediaQuery('(min-width: 768px)');
const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

const router = useRouter();

const chatStore = useChatStore();
const userStore = useUserStore();

const { apiKeys } = storeToRefs(userStore);
const { apiProviders } = storeToRefs(chatStore);

const apiKeysCopy = structuredClone(toRawDeep(apiKeys.value));
const apiProvidersCopy = structuredClone(toRawDeep(apiProviders.value));

const { handleSubmit, setFieldValue, setValues, values } = useForm({
  validationSchema: toTypedSchema(apiKeysSchema)
});

const onSubmit = handleSubmit(async (values) => {
  const filteredValues = values.apiKeys.filter((apiKey) => apiKey.key && apiKey.apiProviderId);

  const response = await updateApiKeysService(
    { apiKeys: filteredValues, passphrase: values.passphrase },
    router
  );

  if (response) {
    isPassphraseRequired.value = false;
    isSubmitSuccessful.value = true;
  }
});

const toggleInputRevealed = (apiKey: ApiKeyState) => {
  apiKey.isRevealed = !apiKey.isRevealed;
};

const isLastApiKeyField = (apiKey: ApiKeyState) => {
  return apiKey === apiKeys.value[apiKeys.value.length - 1];
};

const getInputIconName = (isRevealed: boolean) => {
  return isRevealed ? 'eye-off' : 'eye';
};

const getInputType = (isRevealed: boolean) => {
  return isRevealed ? 'text' : 'password';
};

const getApiProviderName = (apiKey: ApiKeyState) => {
  return apiKey.apiProvider ? apiKey.apiProvider.name : '+ Select model';
};

onBeforeMount(async () => {
  await setApiKeyFormFields(setFieldValue);
});

onBeforeUnmount(() => {
  if (!isSubmitSuccessful.value) {
    apiKeys.value = apiKeysCopy;
    apiProviders.value = apiProvidersCopy;
  }
});
</script>

<template>
  <form>
    <div class="flex flex-col gap-2 mb-4 py-1 sm:pl-1 sm:pr-3">
      <div
        class="grid grid-cols-1fr-2auto gap-1 items-center sm:gap-2"
        v-for="(apiKey, index) in apiKeys"
        :key="apiKey.id"
      >
        <FormField :name="`apiKeys.${index}.apiKey`">
          <FormItem>
            <FormControl>
              <div class="relative flex items-center justify-end">
                <Input
                  placeholder="Your API Key"
                  class="pr-10 min-w-32"
                  :type="getInputType(apiKey.isRevealed)"
                  v-model="apiKey.key"
                  @update:model-value="onApiKeyUpdate(apiKey, setFieldValue, values)"
                />
                <ButtonIcon
                  type="button"
                  variant="ghost"
                  class="absolute"
                  :iconName="getInputIconName(apiKey.isRevealed)"
                  @click="toggleInputRevealed(apiKey)"
                />
              </div>
            </FormControl>
          </FormItem>
        </FormField>
        <div>
          <DefineTemplate>
            <Command>
              <CommandInput placeholder="Search providers..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="apiProvider in apiProviders"
                    :key="apiProvider.apiProviderId"
                    :value="apiProvider.lowerCaseName"
                    :disabled="apiProvider.isSelected"
                    @select="onApiProviderSelect(apiProvider, apiKey.id)"
                  >
                    {{ apiProvider.name }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DefineTemplate>
          <FormField name="apiProvider">
            <FormItem>
              <Popover
                v-if="isDesktop"
                v-model:open="apiKey.isOpen"
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      class="w-[150px] justify-start"
                    >
                      {{ getApiProviderName(apiKey) }}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  class="w-[200px] p-0"
                  align="start"
                >
                  <ReuseTemplate />
                </PopoverContent>
              </Popover>
              <Drawer v-else>
                <DrawerTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      class="w-[150px] justify-start"
                    >
                      {{ getApiProviderName(apiKey) }}
                    </Button>
                  </FormControl>
                </DrawerTrigger>
                <DrawerContent>
                  <div class="mt-4 border-t">
                    <ReuseTemplate />
                  </div>
                </DrawerContent>
              </Drawer>
            </FormItem>
          </FormField>
        </div>
        <ButtonIcon
          type="button"
          class="w-8 h-8"
          size="icon"
          iconName="plus"
          v-show="isLastApiKeyField(apiKey)"
          @click="onApiKeyAdd(apiKey, setFieldValue)"
        />
        <ButtonIcon
          type="button"
          class="w-8 h-8"
          size="icon"
          variant="destructive"
          iconName="trash"
          v-show="!isLastApiKeyField(apiKey)"
          @click="onApiKeyRemove(apiKey.id, setValues, values)"
        />
      </div>
    </div>
    <div class="flex justify-end pr-3">
      <AlertDialog v-model:open="isPassphraseRequired">
        <AlertDialogTrigger as-child>
          <Button type="button">Save changes</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Passphrase required</AlertDialogTitle>
            <AlertDialogDescription>
              To protect your API keys, please enter your passphrase before proceeding. This ensures
              that only authorized actions are performed on sensitive data.
            </AlertDialogDescription>
            <Separator />
          </AlertDialogHeader>
          <FormField
            v-slot="{ componentField }"
            name="passphrase"
          >
            <FormItem>
              <FormLabel>Enter your passphrase</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Your passphrase"
                  v-bind="componentField"
                />
              </FormControl>
            </FormItem>
          </FormField>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button @click="onSubmit">Continue</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </form>
</template>
